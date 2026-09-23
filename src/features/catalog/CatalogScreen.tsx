import { useEffect, useState } from 'react'
import { formatMoney } from '../../app/utils'
import { BrandHeader, ProductImage } from '../../components/Common'
import { products } from '../../data/catalog'
import { calculatePlan } from '../../domain/calculator'
import type { CalculationStart, DiscountLevel, PlanOrder, Product, ProductDirection, ProductType } from '../../domain/types'

function FilterRow<T extends string>({ label, values, active, onChange }: {
  label: string
  values: Array<{ value: T; label: string }>
  active: T
  onChange: (value: T) => void
}) {
  return (
    <div className="filter-group">
      <strong>{label}</strong>
      <div className="segmented">
        {values.map((item) => <button key={item.value} className={active === item.value ? 'selected' : ''} onClick={() => onChange(item.value)}>{item.label}</button>)}
      </div>
    </div>
  )
}

function ProductCard({ product, level, onAdd, onOpenImage }: { product: Product; level: DiscountLevel; onAdd: () => void; onOpenImage: () => void }) {
  const price = product.prices[level]
  return (
    <article className="product-card">
      <ProductImage product={product} onClick={product.image ? onOpenImage : undefined} />
      <div className="product-card__content">
        <span className="type-badge">{product.type === 'single' ? 'Единичный товар' : 'Комплект'}</span>
        <h3>{product.nameRu}</h3><p lang="zh">{product.nameZh}</p>
        <div className="product-card__footer">
          <div className={price === null ? 'price price--missing' : 'price'}>
            {price === null ? 'Цена уточняется' : formatMoney(price)}
            {price !== null && <small>цена уровня {level}%</small>}
          </div>
          <button className="small-button" disabled={price === null} onClick={onAdd}>Добавить в план</button>
        </div>
      </div>
    </article>
  )
}

function ProductImageModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={'product-image-modal-backdrop'} role={'presentation'}>
      <section className={'product-image-modal'} role={'dialog'} aria-modal={'true'} aria-labelledby={'product-image-modal-title'}>
        <button type={'button'} className={'product-image-modal__close'} onClick={onClose} aria-label={'Закрыть'}>×</button>
        <img className={'product-image-modal__image'} src={product.image!} alt={product.nameRu} />
        <p id={'product-image-modal-title'}>{product.nameRu}</p>
      </section>
    </div>
  )
}

function PartnerStatus({ start, onEdit }: { start: CalculationStart; onEdit: () => void }) {
  return (
    <button className="partner-status" onClick={onEdit}>
      <span>Товарооборот: <strong>{start.turnover === null ? 'не указан' : formatMoney(start.turnover)}</strong>{' · '}Скидка: <strong>{start.discount}%</strong></span>
      <span>Изменить</span>
    </button>
  )
}

export function CatalogScreen({ start, orders, onHome, onEditPartner, onAddProduct, onOpenPlan }: {
  start: CalculationStart | null
  orders: PlanOrder[]
  onHome: () => void
  onEditPartner: () => void
  onAddProduct: (product: Product) => void
  onOpenPlan: () => void
}) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'all' | ProductType>('all')
  const [direction, setDirection] = useState<'all' | ProductDirection>('all')
  const [imageModalProduct, setImageModalProduct] = useState<Product | null>(null)
  const plan = start ? calculatePlan(orders, start) : null
  const level = plan?.finalDiscount ?? start?.discount ?? 0
  const query = search.trim().toLocaleLowerCase('ru')
  const filtered = products.filter((product) =>
    (!query || product.nameRu.toLocaleLowerCase('ru').includes(query) || product.nameZh.toLocaleLowerCase().includes(query)) &&
    (type === 'all' || product.type === type) &&
    (direction === 'all' || product.direction === direction),
  )

  return (
    <main className="screen catalog-screen">
      <BrandHeader onBack={onHome} compact approved />
      {start?.mode === 'partner' && <PartnerStatus start={start} onEdit={onEditPartner} />}
      {start?.mode === 'newcomer' && <div className="level-status"><span>Товарооборот: <strong>{formatMoney(plan?.finalTurnover ?? 0)}</strong></span><span>Следующий заказ: <strong>{level}%</strong></span></div>}
      <section className="catalog-controls">
        <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск по названию товара" aria-label="Поиск по названию товара" /></label>
        <FilterRow label="Тип товара" values={[{ value: 'all', label: 'Все' }, { value: 'single', label: 'Единичные' }, { value: 'bundle', label: 'Комплекты' }]} active={type} onChange={setType} />
        <FilterRow label="Направление" values={[{ value: 'all', label: 'Все' }, { value: 'beauty', label: 'Красота' }, { value: 'health', label: 'Здоровье' }]} active={direction} onChange={setDirection} />
      </section>
      <div className="catalog-meta"><span>Доступно позиций: {filtered.length}</span><span>Цена следующего заказа: {level}%</span></div>
      <section className="product-list" aria-live="polite">
        {filtered.length
          ? filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              level={level}
              onAdd={() => onAddProduct(product)}
              onOpenImage={() => setImageModalProduct(product)}
            />
          ))
          : <div className="empty-state"><strong>Ничего не найдено</strong><p>Измените поиск или фильтры.</p></div>}
      </section>
      <div className="sticky-plan"><button className="primary-button" onClick={onOpenPlan}>План покупок · {orders.length} <span aria-hidden="true">→</span></button></div>
      {imageModalProduct && <ProductImageModal product={imageModalProduct} onClose={() => setImageModalProduct(null)} />}
    </main>
  )
}
