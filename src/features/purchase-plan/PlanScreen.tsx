import { formatMoney } from '../../app/utils'
import { BrandHeader, ProductImage } from '../../components/Common'
import { calculatePlan } from '../../domain/calculator'
import type { CalculatedOrder, CalculationStart, PlanOrder } from '../../domain/types'

function OrderCard({ order, index, count, onMove, onEdit, onDelete }: {
  order: CalculatedOrder
  index: number
  count: number
  onMove: (direction: -1 | 1) => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <article className="order-card">
      <div className="order-card__heading">
        <span>Заказ №{index + 1}</span>
        <div className="order-card__move" aria-label="Изменить порядок">
          {index > 0 && <button onClick={() => onMove(-1)} aria-label="Переместить заказ вверх">↑</button>}
          {index < count - 1 && <button onClick={() => onMove(1)} aria-label="Переместить заказ вниз">↓</button>}
        </div>
      </div>
      <div className="order-card__product"><ProductImage product={order.product} small /><div><h3>{order.product.nameRu}</h3><p lang="zh">{order.product.nameZh}</p></div></div>
      <dl className="calculation-list calculation-list--compact">
        <div><dt>Цена каталога, 1 шт.</dt><dd>{formatMoney(order.product.prices[0]!)}</dd></div>
        <div><dt>Количество</dt><dd>{order.quantity}</dd></div>
        <div><dt>Применена скидка</dt><dd>{order.appliedDiscount}%</dd></div>
        <div><dt>Цена со скидкой, 1 шт.</dt><dd>{order.unitPrice === null ? 'Цена уточняется' : formatMoney(order.unitPrice)}</dd></div>
        <div><dt>Услуги курьера</dt><dd>{formatMoney(order.courierFee)}</dd></div>
        <div className="calculation-list__total"><dt>К оплате</dt><dd>{order.total === null ? 'Цена уточняется' : formatMoney(order.total)}</dd></div>
      </dl>
      {order.nextDiscount > order.appliedDiscount && <p className="notice notice--success">Для следующего заказа доступен уровень скидки — {order.nextDiscount}%.</p>}
      <div className="order-card__actions"><button className="secondary-button" onClick={onEdit}>Изменить</button><button className="text-button text-button--danger" onClick={onDelete}>Удалить</button></div>
    </article>
  )
}

export function PlanScreen({ start, orders, onBack, onMove, onEdit, onDelete }: {
  start: CalculationStart
  orders: PlanOrder[]
  onBack: () => void
  onMove: (index: number, direction: -1 | 1) => void
  onEdit: (order: PlanOrder) => void
  onDelete: (id: string) => void
}) {
  const plan = calculatePlan(orders, start)
  const orderWord = orders.length === 1 ? 'отдельный заказ' : 'отдельных заказа'
  return (
    <main className="screen plan-screen">
      <BrandHeader onBack={onBack} compact />
      <section className="plan-heading"><span className="eyebrow">Последовательный расчёт</span><h1>План покупок</h1><p>{orders.length} {orderWord}</p></section>
      {orders.length ? (
        <section className="order-list">
          {plan.orders.map((order, index) => <OrderCard key={order.id} order={order} index={index} count={plan.orders.length} onMove={(direction) => onMove(index, direction)} onEdit={() => onEdit(orders[index])} onDelete={() => onDelete(order.id)} />)}
        </section>
      ) : (
        <section className="empty-state empty-state--plan"><strong>План пока пуст</strong><p>Вернитесь в каталог и добавьте товары.</p><button className="primary-button" onClick={onBack}>Перейти в каталог</button></section>
      )}
      {orders.length > 0 && (
        <section className="plan-summary">
          <h2>Итог плана</h2>
          <dl>
            <div><dt>Итого к оплате</dt><dd>{plan.total === null ? 'Цена уточняется' : formatMoney(plan.total)}</dd></div>
            <div><dt>Экономия благодаря скидке</dt><dd>{formatMoney(plan.savings)}</dd></div>
          </dl>
          <p>Ваш уровень для следующих покупок:<strong>{plan.finalDiscount}%</strong></p>
        </section>
      )}
    </main>
  )
}
