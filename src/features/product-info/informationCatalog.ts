import { productById } from '../../data/catalog'
import type { Product } from '../../domain/types'

export type InformationDirectionId = 'digestion' | 'heart' | 'joints' | 'vision' | 'energy'

export const informationProductIdsByDirection: Readonly<
  Record<InformationDirectionId, readonly Product['id'][]>
> = {
  heart: ['single-07'],
  joints: ['single-05'],
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
  vision: ['single-09', 'single-16'],
  energy: ['single-16'],
}

export function isInformationDirectionId(
  directionId: string,
): directionId is InformationDirectionId {
  return directionId in informationProductIdsByDirection
}

export function getInformationDirectionId(
  productId: Product['id'],
): InformationDirectionId | undefined {
  return getInformationDirectionIds(productId)[0]
}

export function getInformationDirectionIds(
  productId: Product['id'],
): InformationDirectionId[] {
  return (Object.keys(informationProductIdsByDirection) as InformationDirectionId[]).filter(
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
