import { describe, expect, it } from 'vitest'
import { productById, products } from '../data/catalog'
import {
  calculateCourierFee,
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
  it('новичок получает новый уровень только со второго заказа', () => {
    const result = calculatePlan(
      [order('a', 'single-03', 2), order('b', 'single-03')],
      { mode: 'newcomer', discount: 0, turnover: 0 },
    )

    expect(result.orders[0].appliedDiscount).toBe(0)
    expect(result.orders[0].retailSubtotal).toBe(638)
    expect(result.orders[0].nextDiscount).toBe(10)
    expect(result.orders[1].appliedDiscount).toBe(10)
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
    expect(result.finalTurnover).toBeNull()
  })

  it('после перестановки пересчитывает применяемые скидки и итог', () => {
    const original = [
      order('small', 'single-03'),
      order('large', 'bundle-01'),
    ]
    const moved = moveOrder(original, 1, -1)
    const start = { mode: 'newcomer' as const, discount: 0 as const, turnover: 0 }

    const before = calculatePlan(original, start)
    const after = calculatePlan(moved, start)

    expect(before.orders[1].appliedDiscount).toBe(0)
    expect(after.orders[1].appliedDiscount).toBe(10)
    expect(after.total).not.toBe(before.total)
  })
})

describe('услуги курьера', () => {
  const single = productById.get('single-03')!
  const bundle = productById.get('bundle-01')!

  it('берёт 12 ¥ за заказ одиночного товара при количестве 1–5', () => {
    expect(calculateCourierFee(single, 1)).toBe(12)
    expect(calculateCourierFee(single, 5)).toBe(12)
  })

  it('блокирует количество одиночного товара более 5', () => {
    expect(() => calculateCourierFee(single, 6)).toThrow(
      'Для количества более 5 условия курьера требуют уточнения',
    )
  })

  it('берёт 12 ¥ за каждый комплект', () => {
    expect(calculateCourierFee(bundle, 3)).toBe(36)
  })
})

describe('отсутствующая цена', () => {
  it('помечает заказ недоступным и не придумывает итог', () => {
    const result = calculatePlan([order('a', 'bundle-29')], {
      mode: 'partner',
      discount: 10,
      turnover: 331,
    })

    expect(result.orders[0].unitPrice).toBeNull()
    expect(result.orders[0].priceAvailable).toBe(false)
    expect(result.total).toBeNull()
    expect(result.hasUnavailablePrices).toBe(true)
  })
})

describe('целостность каталога первой версии', () => {
  it('содержит 34 единичных товара и 29 комплектов без акций', () => {
    expect(products.filter((product) => product.type === 'single')).toHaveLength(34)
    expect(products.filter((product) => product.type === 'bundle')).toHaveLength(29)
    expect(products).toHaveLength(63)
    expect(products.some((product) => /5\s*\+\s*1|AI Xiaozhi|BB-кушон/i.test(product.nameRu))).toBe(false)
  })

  it('не содержит придуманных цен 50% и 60%', () => {
    expect(products.every((product) => product.prices[50] === null)).toBe(true)
    expect(products.every((product) => product.prices[60] === null)).toBe(true)
  })
})
