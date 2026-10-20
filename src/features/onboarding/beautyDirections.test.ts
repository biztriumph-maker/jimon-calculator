import { describe, expect, it } from 'vitest'
import {
  beautyDirections,
  getVisibleBeautyDirections,
  type BeautyDirectionConfig,
} from './beautyDirections'

describe('beauty direction configuration', () => {
  it('keeps the approved six-card order', () => {
    expect(getVisibleBeautyDirections().map((direction) => direction.id)).toEqual([
      'cleansing',
      'hydration',
      'anti-aging',
      'eye-care',
      'inner-beauty',
      'comprehensive-care',
    ])
  })

  it('supports content edits, reordering and visibility without component changes', () => {
    const configured: BeautyDirectionConfig[] = beautyDirections.map((direction) => {
      if (direction.id === 'cleansing') return { ...direction, title: 'Новое название', order: 3 }
      if (direction.id === 'hydration') return { ...direction, order: 1 }
      if (direction.id === 'eye-care') return { ...direction, visible: false }
      return { ...direction }
    })

    const result = getVisibleBeautyDirections(configured)

    expect(result[0].id).toBe('hydration')
    expect(result.find((direction) => direction.id === 'cleansing')?.title).toBe('Новое название')
    expect(result.some((direction) => direction.id === 'eye-care')).toBe(false)
  })

  it('uses an approved image for every direction', () => {
    expect(beautyDirections.every((direction) => direction.imageStatus === 'approved')).toBe(true)
  })
})
