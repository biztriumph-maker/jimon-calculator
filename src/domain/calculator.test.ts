import { describe, expect, it } from 'vitest'
import { productById, products } from '../data/catalog'
import {
  calculatePlan,
  getDiscountForTurnover,
  getPartnerDiscountMismatch,
  moveOrder,
} from './calculator'
import type { PlanOrder } from './types'

const order = (
  id: string,
  productId: string,
  quantity = 1,
): PlanOrder => ({ id, productId, quantity })

describe('уровни скидок', () => {
  it('определяет уровни по порогам', () => {
    expect(getDiscountForTurnover(330)).toBe(0)
    expect(getDiscountForTurnover(331)).toBe(10)
    expect(getDiscountForTurnover(1502)).toBe(10)
    expect(getDiscountForTurnover(1503)).toBe(20)
    expect(getDiscountForTurnover(5799)).toBe(20)
    expect(getDiscountForTurnover(5800)).toBe(30)
    expect(getDiscountForTurnover(21999)).toBe(30)
    expect(getDiscountForTurnover(22000)).toBe(40)
    expect(getDiscountForTurnover(219999)).toBe(40)
    expect(getDiscountForTurnover(220000)).toBe(50)
    expect(getDiscountForTurnover(659999)).toBe(50)
    expect(getDiscountForTurnover(660000)).toBe(60)
  })

  it('никогда не понижает авторитетную стартовую скидку', () => {
    expect(getDiscountForTurnover(100, 30)).toBe(30)
  })

  it('возвращает ожидаемый уровень при несовпадении', () => {
    expect(getPartnerDiscountMismatch(20, 20000)).toBe(30)
  })

  it('не проверяет соответствие при неизвестном товарообороте', () => {
    expect(getPartnerDiscountMismatch(20, null)).toBeNull()
  })

  it('принимает согласованные скидку и товарооборот', () => {
    expect(getPartnerDiscountMismatch(30, 20000)).toBeNull()
  })
})

describe('последовательный план', () => {
  it('сохраняет стартовые 0 ¥ и 0% новичка и считает итоговый товарооборот', () => {
    const result = calculatePlan(
      [order('first', 'single-03', 2)],
      { mode: 'newcomer', discount: 0, turnover: 0 },
    )

    expect(result.orders[0].turnoverBefore).toBe(0)
    expect(result.orders[0].appliedDiscount).toBe(0)
    expect(result.finalTurnover).toBe(638)
  })

  it('сохраняет стартовые данные партнёра и добавляет retail turnover заказов', () => {
    const result = calculatePlan(
      [order('first', 'single-03', 2)],
      { mode: 'partner', discount: 30, turnover: 10000 },
    )

    expect(result.orders[0].turnoverBefore).toBe(10000)
    expect(result.orders[0].appliedDiscount).toBe(30)
    expect(result.finalTurnover).toBe(10638)
  })

  it('после первого заказа 319 ¥ второй заказ новичка получает минимум 10%', () => {
    const result = calculatePlan(
      [
        order('first', 'single-03'),
        order('second', 'single-03', 2),
        order('third', 'single-03'),
      ],
      { mode: 'newcomer', discount: 0, turnover: 0 },
    )
    const [first, second, third] = result.orders

    expect(first.appliedDiscount).toBe(0)
    expect(first.discountedSubtotal).toBe(319)
    expect(first.courierFee).toBe(12)
    expect(first.total).toBe(331)
    expect(first.turnoverAfter).toBe(319)
    expect(second.appliedDiscount).toBe(10)
    expect(second.discountedSubtotal).toBe(558)
    expect(second.courierFee).toBe(12)
    expect(second.total).toBe(570)
    expect(second.turnoverAfter).toBe(957)
    expect(third.appliedDiscount).toBe(10)
  })

  it.each([
    ['1503 ¥', 1, 20],
    ['5800 ¥', 4, 30],
  ])('большой первый заказ от %s сразу даёт следующему заказу %i%%', (_, quantity, expectedDiscount) => {
    const result = calculatePlan(
      [order('first', 'single-01', quantity), order('second', 'single-03')],
      { mode: 'newcomer', discount: 0, turnover: 0 },
    )

    expect(result.orders[0].appliedDiscount).toBe(0)
    expect(result.orders[1].appliedDiscount).toBe(expectedDiscount)
  })

  it('даёт последовательность 0% → 10% → 20% для 319 → 1787 → 319', () => {
    const result = calculatePlan(
      [
        order('small-first', 'single-03'),
        order('large', 'single-01'),
        order('small-last', 'single-03'),
      ],
      { mode: 'newcomer', discount: 0, turnover: 0 },
    )

    expect(result.orders.map((item) => item.appliedDiscount)).toEqual([0, 10, 20])
    expect(result.orders.map((item) => item.turnoverAfter)).toEqual([319, 2106, 2425])
  })

  it('партнёр переходит с 30% на 40% только после порогового заказа', () => {
    const result = calculatePlan(
      [order('a', 'single-17'), order('b', 'single-03')],
      { mode: 'partner', discount: 30, turnover: 21500 },
    )

    expect(result.orders[0].appliedDiscount).toBe(30)
    expect(result.orders[0].turnoverAfter).toBe(22099)
    expect(result.orders[1].appliedDiscount).toBe(40)
  })

  it('при неизвестном обороте сохраняет выбранную скидку', () => {
    const result = calculatePlan(
      [order('a', 'bundle-21', 3), order('b', 'bundle-21', 3)],
      { mode: 'partner', discount: 30, turnover: null },
    )

    expect(result.orders.every((item) => item.appliedDiscount === 30)).toBe(
      true,
    )
    expect(result.orders[0].turnoverBefore).toBeNull()
    expect(result.finalTurnover).toBeNull()
  })

  it('после перестановки пересчитывает применяемые скидки и итог', () => {
    const original = [
      order('small-first', 'single-03'),
      order('large', 'single-01'),
      order('small-last', 'single-03'),
    ]
    const moved = moveOrder(original, 1, -1)
    const start = { mode: 'newcomer' as const, discount: 0 as const, turnover: 0 }

    const before = calculatePlan(original, start)
    const after = calculatePlan(moved, start)

    expect(before.orders.map((item) => item.appliedDiscount)).toEqual([0, 10, 20])
    expect(after.orders.map((item) => item.productId)).toEqual(['single-01', 'single-03', 'single-03'])
    expect(after.orders.map((item) => item.appliedDiscount)).toEqual([0, 20, 20])
    expect(after.total).not.toBe(before.total)
  })
})

describe('экономия плана', () => {
  it('суммирует только разницу retail и фактической цены без логистики', () => {
    const result = calculatePlan(
      [order('discounted', 'single-03', 2)],
      { mode: 'partner', discount: 30, turnover: 10000 },
    )

    expect(result.savings).toBe((319 - 225) * 2)
  })
})

describe('услуги логиста', () => {
  it.each([
    ['single quantity 1', 'single-03', 1],
    ['single quantity 6', 'single-03', 6],
    ['single quantity 10', 'single-03', 10],
    ['bundle quantity 1', 'bundle-01', 1],
    ['bundle quantity 5', 'bundle-01', 5],
    ['bundle quantity 6', 'bundle-01', 6],
  ])('%s: фиксированные 12 ¥ за весь заказ', (_, productId, quantity) => {
    const product = productById.get(productId)!
    const result = calculatePlan([order('logistics', productId, quantity)], {
      mode: 'newcomer',
      discount: 0,
      turnover: 0,
    })
    const calculated = result.orders[0]
    const merchandiseTotal = product.prices[0]! * quantity

    expect(calculated.courierFee).toBe(12)
    expect(calculated.total).toBe(merchandiseTotal + 12)
    expect(calculated.retailSubtotal).toBe(merchandiseTotal)
    expect(calculated.turnoverAfter).toBe(merchandiseTotal)
  })
})

describe('отсутствующая цена', () => {
  it('помечает заказ недоступным и не придумывает итог', () => {
    const result = calculatePlan([order('a', 'single-03')], {
      mode: 'partner',
      discount: 50,
      turnover: 220000,
    })

    expect(result.orders[0].unitPrice).toBeNull()
    expect(result.orders[0].priceAvailable).toBe(false)
    expect(result.total).toBeNull()
    expect(result.savings).toBeNull()
    expect(result.hasUnavailablePrices).toBe(true)
  })
})

describe('целостность каталога первой версии', () => {
  it('содержит 33 единичных товара и 28 комплектов без акций', () => {
    expect(products.filter((product) => product.type === 'single')).toHaveLength(33)
    expect(products.filter((product) => product.type === 'bundle')).toHaveLength(28)
    expect(products).toHaveLength(61)
    expect(products.some((product) => product.id === 'single-37')).toBe(false)
    expect(products.some((product) => product.id === 'bundle-29')).toBe(false)
    expect(products.some((product) => /5\s*\+\s*1|AI Xiaozhi|BB-кушон/i.test(product.nameRu))).toBe(false)
  })

  it('не содержит придуманных цен 50% и 60%', () => {
    expect(products.every((product) => product.prices[50] === null)).toBe(true)
    expect(products.every((product) => product.prices[60] === null)).toBe(true)
  })
})
