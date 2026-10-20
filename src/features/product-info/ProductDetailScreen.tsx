import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { productById } from '../../data/catalog'
import { BrandHeader, ProductImage } from '../../components/Common'
import type { ProductDetailConfig, ProductDetailSection } from './productDetails'

interface ProductDetailScreenProps {
  config: ProductDetailConfig
  onBack: () => void
}

interface ProductDetailModalProps {
  section: ProductDetailSection
  returnFocusTo: HTMLButtonElement | null
  onClose: () => void
}

function ProductDetailModal({ section, returnFocusTo, onClose }: ProductDetailModalProps) {
  const titleId = useId()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const historyEntryActiveRef = useRef(false)
  const historyMarker = `jimon-product-detail:${section.id}`

  const requestClose = useCallback(() => {
    if (
      historyEntryActiveRef.current &&
      window.history.state?.jimonProductDetailModal === historyMarker
    ) {
      window.history.back()
      return
    }

    onClose()
  }, [historyMarker, onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousScrollY = window.scrollY
    const previousScrollRestoration = window.history.scrollRestoration
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null

    document.body.style.overflow = 'hidden'
    window.history.scrollRestoration = 'manual'

    if (window.history.state?.jimonProductDetailModal !== historyMarker) {
      window.history.pushState(
        { ...window.history.state, jimonProductDetailModal: historyMarker },
        '',
      )
    }
    historyEntryActiveRef.current = true

    const handlePopState = () => {
      if (!historyEntryActiveRef.current) return
      historyEntryActiveRef.current = false
      onClose()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: previousScrollY })
        const focusTarget = returnFocusTo ?? previouslyFocused
        focusTarget?.focus({ preventScroll: true })
        window.history.scrollRestoration = previousScrollRestoration
      })
    }
  }, [historyMarker, onClose, requestClose, returnFocusTo])

  return (
    <div
      className="modal-backdrop product-detail-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
    >
      <section
        className="modal product-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal__heading">
          <h2 id={titleId}>{section.title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button"
            aria-label={`Закрыть раздел «${section.title}»`}
            onClick={requestClose}
          >
            ×
          </button>
        </div>

        <div className="product-detail-modal__content">
          {section.facts && (
            <dl className="product-detail-facts">
              {section.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {section.items && (
            <ul className="product-detail-composition">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {section.sourceBlock && (
            <section className="product-detail-source-card" lang="ru">
              <p className="product-detail-source-card__text">{section.sourceBlock.text}</p>
            </section>
          )}

          {section.note && <p className="notice product-detail-modal__note">{section.note}</p>}
        </div>
      </section>
    </div>
  )
}

export function ProductDetailScreen({ config, onBack }: ProductDetailScreenProps) {
  const [activeSection, setActiveSection] = useState<ProductDetailSection | null>(null)
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null)
  const closeModal = useCallback(() => setActiveSection(null), [])
  const product = productById.get(config.productId)

  if (!product) {
    return (
      <main className="screen product-detail-screen">
        <BrandHeader compact approved onBack={onBack} />
        <section className="empty-state">
          <h1>Продукт не найден</h1>
          <button type="button" className="secondary-button" onClick={onBack}>
            Назад
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="screen product-detail-screen">
      <BrandHeader compact approved onBack={onBack} />

      <article className="product-detail-content">
        <div className={`product-detail-photo product-detail-photo--${config.productId}`}>
          {config.heroImage ? (
            <img
              className="product-detail-photo__hero"
              src={config.heroImage.src}
              alt={config.heroImage.alt}
              width={config.heroImage.width}
              height={config.heroImage.height}
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <ProductImage product={product} />
          )}
        </div>

        <header className="product-detail-heading">
          <h1>{product.nameRu}</h1>
          {product.nameZh && <p lang="zh-CN">{product.nameZh}</p>}
        </header>

        <section className="product-detail-summary" lang="ru">
          <p className="product-detail-summary__intro">{config.summary.intro}</p>
          <h2>{config.summary.propertiesTitle}</h2>
          <ol>
            {config.summary.properties.map((property) => (
              <li key={property.text} data-verification-status={property.verificationStatus}>
                {property.text}
              </li>
            ))}
          </ol>
        </section>

        <div className="product-detail-actions" aria-label="Информация о продукте">
          {config.sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="secondary-button product-detail-action"
              aria-haspopup="dialog"
              onClick={(event) => {
                activeTriggerRef.current = event.currentTarget
                setActiveSection(section)
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </article>

      {activeSection && (
        <ProductDetailModal
          section={activeSection}
          returnFocusTo={activeTriggerRef.current}
          onClose={closeModal}
        />
      )}
    </main>
  )
}
