import { productById } from '../data/catalog'
import { DISCOUNT_LEVELS, THRESHOLDS } from './thresholds'
import type {
  CalculatedOrder,
  CalculationStart,
  DiscountLevel,
  PlanCalculation,
  PlanOrder,
  Product,
} from './types'

export const getDiscountForTurnover = (
  turnover: number,
  minimum: DiscountLevel = 0,
): DiscountLevel => {
  const reached = DISCOUNT_LEVELS.reduce<DiscountLevel>(
    (level, candidate) =>
      turnover >= THRESHOLDS[candidate] ? candidate : level,
    0,
  )

  return Math.max(reached, minimum) as DiscountLevel
}

export const getPartnerDiscountMismatch = (
  selectedDiscount: DiscountLevel,
  turnover: number | null,
): DiscountLevel | null => {
  if (turnover === null) return null

  const expectedDiscount = getDiscountForTurnover(turnover)
  return expectedDiscount === selectedDiscount ? null : expectedDiscount
}

export const getActualPrice = (
  product: Product,
  level: DiscountLevel,
): number | null => product.prices[level]

export const calculateCourierFee = (
  quantity: number,
): number => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new RangeError('Количество должно быть целым числом от 1.')
  }

  return 12
}

interface OrderCalculationInput {
  order: PlanOrder
  product: Product
  appliedDiscount: DiscountLevel
  minimumNextDiscount: DiscountLevel
  turnoverBefore: number | null
  automaticUpgrade: boolean
}

export const calculateOrder = ({
  order,
  product,
  appliedDiscount,
  minimumNextDiscount,
  turnoverBefore,
  automaticUpgrade,
}: OrderCalculationInput): CalculatedOrder => {
  const unitPrice = getActualPrice(product, appliedDiscount)
  const retailSubtotal = product.prices[0]! * order.quantity
  const discountedSubtotal =
    unitPrice === null ? null : unitPrice * order.quantity
  const courierFee = calculateCourierFee(order.quantity)
  const total =
    discountedSubtotal === null ? null : discountedSubtotal + courierFee
  const savings =
    discountedSubtotal === null ? null : retailSubtotal - discountedSubtotal
  const turnoverAfter =
    turnoverBefore === null ? null : turnoverBefore + retailSubtotal
  const nextDiscount =
    automaticUpgrade && turnoverAfter !== null
      ? getDiscountForTurnover(turnoverAfter, minimumNextDiscount)
      : appliedDiscount

  return {
    ...order,
    product,
    appliedDiscount,
    unitPrice,
    retailSubtotal,
    discountedSubtotal,
    courierFee,
    total,
    savings,
    turnoverBefore,
    turnoverAfter,
    nextDiscount,
    priceAvailable: unitPrice !== null,
  }
}

export const calculatePlan = (
  orders: PlanOrder[],
  start: CalculationStart,
): PlanCalculation => {
  let currentDiscount = start.discount
  let currentTurnover = start.mode === 'newcomer' ? 0 : start.turnover
  const automaticUpgrade =
    start.mode === 'newcomer' || start.turnover !== null
  const calculated: CalculatedOrder[] = []

  for (const order of orders) {
    const product = productById.get(order.productId)
    if (!product) {
      throw new Error(`Товар ${order.productId} не найден.`)
    }

    const result = calculateOrder({
      order,
      product,
      appliedDiscount: currentDiscount,
      minimumNextDiscount:
        start.mode === 'newcomer' && calculated.length === 0
          ? 10
          : currentDiscount,
      turnoverBefore: currentTurnover,
      automaticUpgrade,
    })

    calculated.push(result)
    currentDiscount = result.nextDiscount
    currentTurnover = result.turnoverAfter
  }

  const hasUnavailablePrices = calculated.some(
    (order) => !order.priceAvailable,
  )

  return {
    orders: calculated,
    total: hasUnavailablePrices
      ? null
      : calculated.reduce((sum, order) => sum + (order.total ?? 0), 0),
    savings: hasUnavailablePrices
      ? null
      : calculated.reduce((sum, order) => sum + (order.savings ?? 0), 0),
    courierTotal: calculated.reduce(
      (sum, order) => sum + order.courierFee,
      0,
    ),
    finalDiscount: currentDiscount,
    finalTurnover: currentTurnover,
    hasUnavailablePrices,
  }
}

export const moveOrder = (
  orders: PlanOrder[],
  index: number,
  direction: -1 | 1,
): PlanOrder[] => {
  const destination = index + direction
  if (
    index < 0 ||
    index >= orders.length ||
    destination < 0 ||
    destination >= orders.length
  ) {
    return orders
  }

  const next = [...orders]
  ;[next[index], next[destination]] = [next[destination], next[index]]
  return next
}
