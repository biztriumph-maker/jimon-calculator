import type { CalculationStart, PlanOrder } from '../domain/types'

export type Screen =
  | 'home'
  | 'product-info'
  | 'product-health'
  | 'product-health-vision'
  | 'product-health-heart'
  | 'product-health-joints'
  | 'product-health-digestion'
  | 'product-health-digestion-birunkan'
  | 'product-health-weight'
  | 'product-health-energy'
  | 'product-health-respiratory'
  | 'product-health-other'
  | 'product-beauty'
  | 'product-beauty-cleansing'
  | 'product-beauty-hydration'
  | 'product-beauty-anti-aging'
  | 'product-beauty-eye-care'
  | 'product-beauty-inner-beauty'
  | 'product-beauty-comprehensive-care'
  | 'newcomer'
  | 'catalog'
  | 'plan'

export interface StoredAppState {
  screen: Screen
  start: CalculationStart | null
  orders: PlanOrder[]
}

const STORAGE_KEY = 'jimon-calculator:v1'
const fallback: StoredAppState = { screen: 'home', start: null, orders: [] }

export const loadAppState = (): StoredAppState => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as Partial<StoredAppState>
    const allowed: Screen[] = [
      'home',
      'product-info',
      'product-health',
      'product-health-vision',
      'product-health-heart',
      'product-health-joints',
      'product-health-digestion',
      'product-health-digestion-birunkan',
      'product-health-weight',
      'product-health-energy',
      'product-health-respiratory',
      'product-health-other',
      'product-beauty',
      'product-beauty-cleansing',
      'product-beauty-hydration',
      'product-beauty-anti-aging',
      'product-beauty-eye-care',
      'product-beauty-inner-beauty',
      'product-beauty-comprehensive-care',
      'newcomer',
      'catalog',
      'plan',
    ]
    if (!parsed.screen || !allowed.includes(parsed.screen) || !Array.isArray(parsed.orders)) return fallback
    if ((parsed.screen === 'catalog' || parsed.screen === 'plan') && !parsed.start) return fallback
    return { screen: parsed.screen, start: parsed.start ?? null, orders: parsed.orders }
  } catch {
    return fallback
  }
}

export const saveAppState = (state: StoredAppState): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}
