import type { Screen } from '../../storage/appStorage'
import cleansingImage from '../../../DESIGN_APPROVED/BEAUTY_DIRECTIONS/beauty-cleansing-approved.png'
import hydrationImage from '../../../DESIGN_APPROVED/BEAUTY_DIRECTIONS/beauty-hydration-approved.png'
import antiAgingImage from '../../../DESIGN_APPROVED/BEAUTY_DIRECTIONS/beauty-antiage-approved.png'
import eyeCareImage from '../../../DESIGN_APPROVED/BEAUTY_DIRECTIONS/beauty-eye-care-approved.png'
import innerBeautyImage from '../../../DESIGN_APPROVED/BEAUTY_DIRECTIONS/beauty-inner-approved.png'
import comprehensiveCareImage from '../../../DESIGN_APPROVED/BEAUTY_DIRECTIONS/beauty-complex-approved.png'
import type { DirectionConfig } from './directionTypes'

export type BeautyDirectionConfig = DirectionConfig

export const beautyDirections: readonly BeautyDirectionConfig[] = [
  { id: 'cleansing', title: 'Очищение кожи', description: 'Мягкое очищение и ощущение свежести', image: cleansingImage, imageStatus: 'approved', order: 1, screen: 'product-beauty-cleansing', visible: true },
  { id: 'hydration', title: 'Увлажнение и свежесть', description: 'Комфорт, увлажнение и тонус кожи', image: hydrationImage, imageStatus: 'approved', order: 2, screen: 'product-beauty-hydration', visible: true },
  { id: 'anti-aging', title: 'Питание и антивозрастной уход', description: 'Забота о красоте и ухоженности кожи', image: antiAgingImage, imageStatus: 'approved', order: 3, screen: 'product-beauty-anti-aging', visible: true },
  { id: 'eye-care', title: 'Уход вокруг глаз', description: 'Деликатный уход за зоной вокруг глаз', image: eyeCareImage, imageStatus: 'approved', order: 4, screen: 'product-beauty-eye-care', visible: true },
  { id: 'inner-beauty', title: 'Красота изнутри', description: 'Поддержка красоты и питания кожи изнутри', image: innerBeautyImage, imageStatus: 'approved', order: 5, screen: 'product-beauty-inner-beauty', visible: true },
  { id: 'comprehensive-care', title: 'Комплексный уход', description: 'Готовые решения для полноценного ухода', image: comprehensiveCareImage, imageStatus: 'approved', order: 6, screen: 'product-beauty-comprehensive-care', visible: true },
]

export function getVisibleBeautyDirections(source: readonly BeautyDirectionConfig[] = beautyDirections): BeautyDirectionConfig[] {
  return source.filter((direction) => direction.visible).slice().sort((left, right) => left.order - right.order)
}

export const beautyDirectionById = new Map(beautyDirections.map((direction) => [direction.id, direction] as const))
export const beautyDirectionByScreen = new Map<Screen, BeautyDirectionConfig>(
  beautyDirections.map((direction) => [direction.screen, direction]),
)
