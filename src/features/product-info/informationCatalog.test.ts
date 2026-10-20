import { describe, expect, it } from 'vitest'
import { productById } from '../../data/catalog'
import {
  getInformationProducts,
  getMissingInformationProductIds,
  informationProductIdsByDirection,
} from './informationCatalog'

describe('information product catalog', () => {
  it('uses existing catalog products in the configured digestion order', () => {
    expect(informationProductIdsByDirection.digestion).toEqual([
      'single-03',
      'single-06',
      'single-18',
      'single-15',
      'single-19',
      'single-04',
      'single-36',
      'single-22',
    ])
    expect(getInformationProducts('digestion')).toEqual(
      informationProductIdsByDirection.digestion.map((productId) => productById.get(productId)),
    )
  })

  it('has catalog data and a verified image for every digestion product', () => {
    expect(getMissingInformationProductIds('digestion')).toEqual([])
    expect(getInformationProducts('digestion').every((product) => product.image)).toBe(true)
  })
})
