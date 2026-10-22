import { describe, expect, it, vi } from 'vitest'
import {
  rememberScrollPosition,
  restoreScrollPosition,
  scrollViewportToTop,
  useManualScrollRestoration,
  type ScrollViewport,
} from './scrollNavigation'

describe('product detail scroll navigation', () => {
  it('opens every product detail at the top of the document', () => {
    const scrollTo = vi.fn()
    const viewport = { scrollY: 640, scrollTo } satisfies ScrollViewport

    scrollViewportToTop(viewport)

    expect(scrollTo).toHaveBeenCalledOnce()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0 })
  })

  it('remembers separate catalog positions and restores the requested one', () => {
    const positions = new Map<string, number>()
    const digestion = { scrollY: 732, scrollTo: vi.fn() } satisfies ScrollViewport
    const heart = { scrollY: 284, scrollTo: vi.fn() } satisfies ScrollViewport
    const target = { scrollY: 0, scrollTo: vi.fn() } satisfies ScrollViewport

    rememberScrollPosition(positions, 'digestion', digestion)
    rememberScrollPosition(positions, 'heart', heart)
    restoreScrollPosition(positions, 'digestion', target)

    expect(positions).toEqual(new Map([['digestion', 732], ['heart', 284]]))
    expect(target.scrollTo).toHaveBeenCalledWith({ top: 732, left: 0 })
  })

  it('restores a catalog without a saved position to the top', () => {
    const scrollTo = vi.fn()
    const viewport = { scrollY: 410, scrollTo } satisfies ScrollViewport

    restoreScrollPosition(new Map(), 'direct-open', viewport)

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0 })
  })

  it('prevents native reload restoration while a product detail is mounted', () => {
    const history = { scrollRestoration: 'auto' as const }

    const restore = useManualScrollRestoration(history)
    expect(history.scrollRestoration).toBe('manual')

    restore()
    expect(history.scrollRestoration).toBe('auto')
  })
})
