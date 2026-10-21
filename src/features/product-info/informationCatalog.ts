import { productById } from '../../data/catalog'
import type { Product } from '../../domain/types'

export type InformationDirectionId = 'digestion' | 'vision'

export const informationProductIdsByDirection: Readonly<
  Record<InformationDirectionId, readonly Product['id'][]>
> = {
  digestion: [
    'single-03',
    'single-06',
    'single-18',
    'single-15',
    'single-19',
    'single-04',
    'single-36',
    'single-22',
  ],
  vision: ['single-09'],
}

export function isInformationDirectionId(
  directionId: string,
): directionId is InformationDirectionId {
  return directionId in informationProductIdsByDirection
}

export function getInformationDirectionId(
  productId: Product['id'],
): InformationDirectionId | undefined {
  return (Object.keys(informationProductIdsByDirection) as InformationDirectionId[]).find(
    (directionId) => informationProductIdsByDirection[directionId].includes(productId),
  )
}

export function getInformationProducts(directionId: InformationDirectionId): Product[] {
  return informationProductIdsByDirection[directionId].flatMap((productId) => {
    const product = productById.get(productId)
    return product ? [product] : []
  })
}

export function getMissingInformationProductIds(
  directionId: InformationDirectionId,
): Product['id'][] {
  return informationProductIdsByDirection[directionId].filter(
    (productId) => !productById.has(productId),
  )
}
