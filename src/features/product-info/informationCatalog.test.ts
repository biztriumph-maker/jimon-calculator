import { describe, expect, it } from 'vitest'
import { productById } from '../../data/catalog'
import {
  getInformationDirectionId,
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

  it('uses the canonical single-18 name throughout the information catalog', () => {
    const catalogProduct = productById.get('single-18')
    const informationProduct = getInformationProducts('digestion').find(
      (product) => product.id === 'single-18',
    )

    expect(catalogProduct?.nameRu).toBe(
      'Напиток для поддержки печени с пептидами и куркумой',
    )
    expect(catalogProduct?.nameZh).toBe('添然萃肝蛋白肽姜黄饮')
    expect(informationProduct).toBe(catalogProduct)
  })

  it('connects the canonical single-09 product to the vision direction', () => {
    const catalogProduct = productById.get('single-09')
    const informationProduct = getInformationProducts('vision')[0]

    expect(informationProductIdsByDirection.vision).toEqual(['single-09'])
    expect(getMissingInformationProductIds('vision')).toEqual([])
    expect(getInformationDirectionId('single-09')).toBe('vision')
    expect(catalogProduct?.nameRu).toBe('Карандаш Сафора')
    expect(catalogProduct?.nameZh).toBe('媛韵牌苦参抑菌液')
    expect(informationProduct).toBe(catalogProduct)
  })

  it('does not duplicate products across information directions', () => {
    const configuredProductIds = Object.values(informationProductIdsByDirection).flat()

    expect(new Set(configuredProductIds).size).toBe(configuredProductIds.length)
  })
})
