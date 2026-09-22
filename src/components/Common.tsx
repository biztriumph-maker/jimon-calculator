import type { Product } from '../domain/types'
import approvedLogo from '../assets/brand/jimon-logo-approved.png'

export function BrandHeader({ onBack, compact = false, approved = false }: { onBack?: () => void; compact?: boolean; approved?: boolean }) {
  return (
    <header className={`brand-header ${compact ? 'brand-header--compact' : ''}`}>
      {onBack && <button className="icon-button brand-header__back" onClick={onBack} aria-label="Назад">←</button>}
      <div className="brand-lockup">
        {approved
          ? <img className="brand-logo-approved" src={approvedLogo} alt="JIMON" />
          : <><span className="brand-mark" aria-hidden="true" /><span className="brand-name">JIMON</span></>}
      </div>
      {!compact && <p>Здоровье. Качество. Возможности.</p>}
    </header>
  )
}

export function ProductImage({ product, small = false }: { product: Product; small?: boolean }) {
  if (product.image) {
    return <img className={`product-image ${small ? 'product-image--small' : ''}`} src={product.image} alt={product.nameRu} />
  }
  return (
    <div className={`product-placeholder ${small ? 'product-placeholder--small' : ''}`} role="img" aria-label={`Фото товара «${product.nameRu}» будет добавлено`}>
      <span aria-hidden="true">▧</span><small>Фото будет добавлено</small>
    </div>
  )
}
