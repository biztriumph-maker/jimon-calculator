export type DiscountLevel = 0 | 10 | 20 | 30 | 40 | 50 | 60
export type ProductType = 'single' | 'bundle'
export type ProductDirection = 'beauty' | 'health'
export type UserMode = 'newcomer' | 'partner'

export type PriceMap = Record<DiscountLevel, number | null>

export interface Product {
  id: string
  type: ProductType
  direction: ProductDirection
  nameRu: string
  nameZh: string
  image: string | null
  prices: PriceMap
}

export interface PlanOrder {
  id: string
  productId: string
  quantity: number
}

export interface CalculationStart {
  mode: UserMode
  discount: DiscountLevel
  turnover: number | null
}

export interface CalculatedOrder extends PlanOrder {
  product: Product
  appliedDiscount: DiscountLevel
  unitPrice: number | null
  retailSubtotal: number
  discountedSubtotal: number | null
  courierFee: number
  total: number | null
  savings: number | null
  turnoverBefore: number | null
  turnoverAfter: number | null
  nextDiscount: DiscountLevel
  priceAvailable: boolean
}

export interface PlanCalculation {
  orders: CalculatedOrder[]
  total: number | null
  savings: number | null
  courierTotal: number
  finalDiscount: DiscountLevel
  finalTurnover: number | null
  hasUnavailablePrices: boolean
}
