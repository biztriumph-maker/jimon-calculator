import { useState } from 'react'
import { BrandHeader, ProductImage } from '../../components/Common'
import type { Product } from '../../domain/types'
import {
  getInformationProducts,
  type InformationDirectionId,
} from './informationCatalog'

function InformationProductCard({
  product,
  isPreparing,
  onOpenDetails,
}: {
  product: Product
  isPreparing: boolean
  onOpenDetails: () => void
}) {
  return (
    <article className="product-card direction-product-card">
      <ProductImage product={product} />
      <div className="product-card__content direction-product-card__content">
        <h3>{product.nameRu}</h3>
        {product.nameZh && <p lang="zh">{product.nameZh}</p>}
        <div className="direction-product-card__action">
          <button type="button" className="small-button" onClick={onOpenDetails}>
            Подробнее
          </button>
          {isPreparing && (
            <p className="direction-product-card__notice" role="status">
              Карточка продукта готовится
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductDirectionProductsScreen({
  directionId,
  title,
  onBack,
  onOpenProduct,
}: {
  directionId: InformationDirectionId
  title: string
  onBack: () => void
  onOpenProduct?: (product: Product) => boolean
}) {
  const products = getInformationProducts(directionId)
  const [preparingProductId, setPreparingProductId] = useState<Product['id'] | null>(null)

  const openDetails = (product: Product) => {
    if (onOpenProduct?.(product)) return

    setPreparingProductId(product.id)
  }

  return (
    <main className="screen product-direction-products-screen">
      <BrandHeader onBack={onBack} compact approved />
      <header className="direction-products-heading">
        <h1>{title}</h1>
      </header>
      <section className="product-list direction-product-list" aria-label={`Продукты направления «${title}»`}>
        {products.map((product) => (
          <InformationProductCard
            key={product.id}
            product={product}
            isPreparing={preparingProductId === product.id}
            onOpenDetails={() => openDetails(product)}
          />
        ))}
      </section>
    </main>
  )
}
