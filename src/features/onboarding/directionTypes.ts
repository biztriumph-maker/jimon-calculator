import type { Screen } from '../../storage/appStorage'

export type DirectionImageStatus = 'approved' | 'approved-extract' | 'placeholder'
export type DirectionTheme = 'health' | 'beauty'

export interface DirectionConfig {
  id: string
  title: string
  description: string
  image: string
  imageStatus: DirectionImageStatus
  order: number
  screen: Screen
  visible: boolean
}
