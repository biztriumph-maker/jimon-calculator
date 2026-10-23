import { describe, expect, it } from 'vitest'
import {
  getVisibleHealthDirections,
  healthDirections,
  type HealthDirectionConfig,
} from './healthDirections'

describe('health direction configuration', () => {
  it('applies title, description and image edits from configuration', () => {
    const edited = healthDirections.map((direction) =>
      direction.id === 'vision'
        ? {
            ...direction,
            title: 'Проверочное название',
            description: 'Проверочное описание',
            image: '/edited-image.png',
          }
        : { ...direction },
    )

    const first = getVisibleHealthDirections(edited)[0]

    expect(first.title).toBe('Проверочное название')
    expect(first.description).toBe('Проверочное описание')
    expect(first.image).toBe('/edited-image.png')
  })

  it('supports reordering, adding and hiding cards without component changes', () => {
    const reordered = healthDirections.map((direction) => {
      if (direction.id === 'vision') return { ...direction, order: 3 }
      if (direction.id === 'joints') return { ...direction, order: 1 }
      return { ...direction }
    })
    const temporary: HealthDirectionConfig = {
      ...healthDirections[0],
      id: 'temporary-check',
      title: 'Временная карточка',
      order: 2.5,
    }
    const hidden = [...reordered, temporary].map((direction) =>
      direction.id === 'heart' ? { ...direction, visible: false } : direction,
    )

    const result = getVisibleHealthDirections(hidden)

    expect(result[0].id).toBe('joints')
    expect(result[1].id).toBe('temporary-check')
    expect(result.some((direction) => direction.id === 'heart')).toBe(false)
    expect(healthDirections.map((direction) => direction.id)).toEqual([
      'vision',
      'heart',
      'memory',
      'joints',
      'digestion',
      'weight',
      'energy',
      'men-women',
      'respiratory',
      'other',
    ])
  })
  it('has the final ten-card health order, unique IDs and approved public images', () => {
    const visible = getVisibleHealthDirections()

    expect(visible).toHaveLength(10)
    expect(visible.map((direction) => direction.id)).toEqual([
      'vision',
      'heart',
      'memory',
      'joints',
      'digestion',
      'weight',
      'energy',
      'men-women',
      'respiratory',
      'other',
    ])
    expect(new Set(visible.map((direction) => direction.id)).size).toBe(10)
    expect(visible.find((direction) => direction.id === 'memory')?.image).toBe('/images/health-memory-brain.png')
    expect(visible.find((direction) => direction.id === 'men-women')?.image).toBe('/images/health-men-women.png')
    expect(visible.every((direction) => direction.screen.startsWith('product-health-'))).toBe(true)
  })
})
