import type { Screen } from '../../storage/appStorage'
import digestionImage from '../../assets/ui/product-health/directions/digestion.png'
import energyImage from '../../assets/ui/product-health/directions/energy.png'
import heartImage from '../../assets/ui/product-health/directions/heart.png'
import jointsImage from '../../assets/ui/product-health/directions/joints.png'
import otherPlaceholder from '../../assets/ui/product-health/directions/other-placeholder.svg'
import respiratoryImage from '../../assets/ui/product-health/directions/respiratory.png'
import visionImage from '../../assets/ui/product-health/directions/vision.png'
import weightImage from '../../assets/ui/product-health/directions/weight.png'

export interface HealthDirectionConfig {
  id: string
  title: string
  description: string
  image: string
  imageStatus: 'approved' | 'approved-extract' | 'placeholder'
  order: number
  screen: Screen
  visible: boolean
}

export const healthDirections: readonly HealthDirectionConfig[] = [
  { id: 'vision', title: 'Зрение', description: 'Чёткость взгляда в любом возрасте', image: visionImage, imageStatus: 'approved-extract', order: 1, screen: 'product-health-vision', visible: true },
  { id: 'heart', title: 'Сердце и сосуды', description: 'Забота о главном каждый день', image: heartImage, imageStatus: 'approved-extract', order: 2, screen: 'product-health-heart', visible: true },
  { id: 'joints', title: 'Суставы и кости', description: 'Лёгкость движений и активная жизнь', image: jointsImage, imageStatus: 'approved-extract', order: 3, screen: 'product-health-joints', visible: true },
  { id: 'digestion', title: 'Пищеварение', description: 'Комфорт и баланс каждый день', image: digestionImage, imageStatus: 'approved-extract', order: 4, screen: 'product-health-digestion', visible: true },
  { id: 'weight', title: 'Контроль веса', description: 'Гармоничная фигура и лёгкость', image: weightImage, imageStatus: 'approved-extract', order: 5, screen: 'product-health-weight', visible: true },
  { id: 'energy', title: 'Энергия и тонус', description: 'Больше сил для активной жизни', image: energyImage, imageStatus: 'approved-extract', order: 6, screen: 'product-health-energy', visible: true },
  { id: 'respiratory', title: 'Дыхательные пути', description: 'Поддержка лёгких и дыхательных путей', image: respiratoryImage, imageStatus: 'approved', order: 7, screen: 'product-health-respiratory', visible: true },
  { id: 'other', title: 'Другие продукты', description: 'Остальные направления здоровья JIMON', image: otherPlaceholder, imageStatus: 'placeholder', order: 8, screen: 'product-health-other', visible: true },
]

export function getVisibleHealthDirections(
  source: readonly HealthDirectionConfig[] = healthDirections,
): HealthDirectionConfig[] {
  return source
    .filter((direction) => direction.visible)
    .slice()
    .sort((left, right) => left.order - right.order)
}

export const healthDirectionById = new Map(
  healthDirections.map((direction) => [direction.id, direction] as const),
)

export const healthDirectionByScreen = new Map<Screen, HealthDirectionConfig>(
  healthDirections.map((direction) => [direction.screen, direction]),
)
