import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { CalculationStart, PlanOrder } from '../../domain/types'
import { PlanScreen } from './PlanScreen'

const noop = () => undefined

const renderSummary = (
  start: CalculationStart,
  orders: PlanOrder[],
): string => {
  const html = renderToStaticMarkup(createElement(PlanScreen, {
    start,
    orders,
    onBack: noop,
    onMove: noop,
    onEdit: noop,
    onDelete: noop,
  }))
  const summaryStart = html.indexOf('Итог плана')

  return html.slice(summaryStart)
}

describe('итог плана', () => {
  it('показывает неизвестную общую экономию как цену, которая уточняется', () => {
    const summary = renderSummary(
      { mode: 'partner', discount: 10, turnover: 331 },
      [{ id: 'missing-price', productId: 'bundle-29', quantity: 1 }],
    )

    expect(summary).toContain(
      '<dt>Экономия благодаря скидке</dt><dd>Цена уточняется</dd>',
    )
  })

  it('не придумывает абсолютный turnover партнёра при неизвестном старте', () => {
    const summary = renderSummary(
      { mode: 'partner', discount: 30, turnover: null },
      [{ id: 'known-price', productId: 'single-03', quantity: 1 }],
    )

    expect(summary).toContain(
      '<dt>Стартовый товарооборот</dt><dd>Не указан</dd>',
    )
    expect(summary).toContain(
      '<dt>Итоговый товарооборот</dt><dd>Не рассчитывается</dd>',
    )
    expect(summary).toContain(
      '<dt>Стартовый уровень скидки</dt><dd>30%</dd>',
    )
  })
})
