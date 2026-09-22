import type { DiscountLevel } from './types'

export const DISCOUNT_LEVELS: DiscountLevel[] = [0, 10, 20, 30, 40, 50, 60]
export const PARTNER_LEVELS: DiscountLevel[] = [10, 20, 30, 40, 50, 60]
export const SELECTABLE_PARTNER_LEVELS: DiscountLevel[] = [10, 20, 30, 40]

export const THRESHOLDS: Record<DiscountLevel, number> = {
  0: 0,
  10: 331,
  20: 1503,
  30: 5800,
  40: 22000,
  50: 220000,
  60: 660000,
}
