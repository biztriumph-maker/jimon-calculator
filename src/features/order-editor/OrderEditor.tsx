import { useState } from 'react'
import { formatMoney } from '../../app/utils'
import { ProductImage } from '../../components/Common'
import { calculatePlan } from '../../domain/calculator'
import type { CalculationStart, PlanOrder, Product } from '../../domain/types'

function QuantityControl({ quantity, onChange }: { quantity: number; onChange: (value: number) => void }) {
  return (
    <div className='quantity-control'>
      <button disabled={quantity <= 1} onClick={() => onChange(quantity - 1)} aria-label='Уменьшить количество'>−</button>
      <strong>{quantity}</strong>
      <button onClick={() => onChange(quantity + 1)} aria-label='Увеличить количество'>+</button>
    </div>
  )
}

export function OrderEditor({ product, editOrder, orders, start, onSave, onClose }: {
  product: Product
  editOrder: PlanOrder | null
  orders: PlanOrder[]
  start: CalculationStart
  onSave: (order: PlanOrder) => void
  onClose: () => void
}) {
  const [quantity, setQuantity] = useState(editOrder?.quantity ?? 1)
  const draftId = editOrder?.id ?? '__draft__'
  const draft = { id: draftId, productId: product.id, quantity }
  const previewOrders = editOrder
    ? orders.map((order) => order.id === editOrder.id ? draft : order)
    : [...orders, draft]
  const calculated = calculatePlan(previewOrders, start).orders.find((order) => order.id === draftId)!

  return (
    <div className='modal-backdrop modal-backdrop--sheet modal-backdrop--order-edit' role='presentation'>
      <section className='modal order-editor' role='dialog' aria-modal='true' aria-labelledby='order-editor-title'>
        <div className='modal__heading'>
          <div><span className='eyebrow'>{editOrder ? 'Изменение заказа' : 'Добавление товара'}</span><h2 id='order-editor-title'>{product.nameRu}</h2><p lang='zh'>{product.nameZh}</p></div>
          <button className='icon-button' onClick={onClose} aria-label='Закрыть'>×</button>
        </div>
        <div className='order-editor__product'>
          <ProductImage product={product} small />
          <div><span>Цена каталога за 1 шт.</span><strong>{formatMoney(product.prices[0]!)}</strong><small>{product.type === 'single' ? 'Единичный товар' : 'Комплект'}</small></div>
        </div>
        <div className='quantity-row'><strong>Количество</strong><QuantityControl quantity={quantity} onChange={setQuantity} /></div>
        <dl className='calculation-list'>
          <div><dt>Применена скидка</dt><dd>{calculated.appliedDiscount}%</dd></div>
          <div><dt>Цена со скидкой за 1 шт.</dt><dd>{calculated.unitPrice === null ? 'Цена уточняется' : formatMoney(calculated.unitPrice)}</dd></div>
          {quantity > 1 && <div><dt>Товары с учётом количества</dt><dd>{calculated.discountedSubtotal === null ? 'Цена уточняется' : formatMoney(calculated.discountedSubtotal)}</dd></div>}
          <div><dt>Услуги логиста</dt><dd>{formatMoney(calculated.courierFee)}</dd></div>
          <div className='calculation-list__total'><dt>К оплате</dt><dd>{calculated.total === null ? 'Цена уточняется' : formatMoney(calculated.total)}</dd></div>
        </dl>
        <button className='primary-button' disabled={!calculated.priceAvailable} onClick={() => onSave(draft)}>
          {editOrder ? 'Сохранить изменения' : 'Добавить в план'}
        </button>
      </section>
    </div>
  )
}
