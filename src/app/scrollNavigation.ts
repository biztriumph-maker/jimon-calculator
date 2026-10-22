export interface ScrollViewport {
  readonly scrollY: number
  scrollTo(options: { top: number; left: number }): void
}

export interface ScrollHistory {
  scrollRestoration: 'auto' | 'manual'
}

export function rememberScrollPosition<Key>(
  positions: Map<Key, number>,
  key: Key,
  viewport: ScrollViewport,
): void {
  positions.set(key, viewport.scrollY)
}

export function scrollViewportToTop(viewport: ScrollViewport): void {
  viewport.scrollTo({ top: 0, left: 0 })
}

export function useManualScrollRestoration(history: ScrollHistory): () => void {
  const previousScrollRestoration = history.scrollRestoration
  history.scrollRestoration = 'manual'

  return () => {
    history.scrollRestoration = previousScrollRestoration
  }
}

export function restoreScrollPosition<Key>(
  positions: ReadonlyMap<Key, number>,
  key: Key,
  viewport: ScrollViewport,
): void {
  viewport.scrollTo({ top: positions.get(key) ?? 0, left: 0 })
}
