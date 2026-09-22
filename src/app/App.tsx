import { useEffect, useMemo, useState } from 'react'
import { createOrderId } from './utils'
import { products } from '../data/catalog'
import { moveOrder } from '../domain/calculator'
import type { CalculationStart, PlanOrder, Product } from '../domain/types'
import { CatalogScreen } from '../features/catalog/CatalogScreen'
import { NewcomerScreen, HomeScreen } from '../features/onboarding/OnboardingScreens'
import { OrderEditor } from '../features/order-editor/OrderEditor'
import { PartnerModal } from '../features/partner/PartnerModal'
import { PlanScreen } from '../features/purchase-plan/PlanScreen'
import { loadAppState, saveAppState, type Screen } from '../storage/appStorage'

export default function App() {
  const initial = useMemo(loadAppState, [])
  const [screen, setScreen] = useState<Screen>(initial.screen)
  const [start, setStart] = useState<CalculationStart | null>(initial.start)
  const [orders, setOrders] = useState<PlanOrder[]>(initial.orders)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const [editor, setEditor] = useState<{ product: Product; order: PlanOrder | null } | null>(null)

  useEffect(() => saveAppState({ screen, start, orders }), [screen, start, orders])

  const goHome = () => {
    setScreen('home')
    setPartnerModalOpen(false)
    setEditor(null)
  }
  const chooseNewcomer = () => {
    setOrders([])
    setStart(null)
    setScreen('newcomer')
  }
  const choosePartner = () => {
    setOrders([])
    setStart(null)
    setScreen('catalog')
    setPartnerModalOpen(true)
  }
  const saveOrder = (nextOrder: PlanOrder) => {
    setOrders((current) => {
      const exists = current.some((order) => order.id === nextOrder.id)
      return exists
        ? current.map((order) => order.id === nextOrder.id ? nextOrder : order)
        : [...current, { ...nextOrder, id: createOrderId() }]
    })
    setEditor(null)
  }

  return (
    <div className="app-shell">
      {screen === 'home' && <HomeScreen onNewcomer={chooseNewcomer} onPartner={choosePartner} />}
      {screen === 'newcomer' && (
        <NewcomerScreen onBack={goHome} onContinue={() => {
          setStart({ mode: 'newcomer', discount: 0, turnover: 0 })
          setScreen('catalog')
        }} />
      )}
      {screen === 'catalog' && (
        <CatalogScreen
          start={start}
          orders={orders}
          onHome={goHome}
          onEditPartner={() => setPartnerModalOpen(true)}
          onAddProduct={(product) => setEditor({ product, order: null })}
          onOpenPlan={() => start && setScreen('plan')}
        />
      )}
      {screen === 'plan' && start && (
        <PlanScreen
          start={start}
          orders={orders}
          onBack={() => setScreen('catalog')}
          onMove={(index, direction) => setOrders((current) => moveOrder(current, index, direction))}
          onEdit={(order) => {
            const product = products.find((item) => item.id === order.productId)
            if (product) setEditor({ product, order })
          }}
          onDelete={(id) => setOrders((current) => current.filter((order) => order.id !== id))}
        />
      )}
      {partnerModalOpen && (
        <PartnerModal
          initial={start}
          onApply={(nextStart) => { setStart(nextStart); setPartnerModalOpen(false) }}
          onCancel={goHome}
        />
      )}
      {editor && start && (
        <OrderEditor
          product={editor.product}
          editOrder={editor.order}
          orders={orders}
          start={start}
          onSave={saveOrder}
          onClose={() => setEditor(null)}
        />
      )}
    </div>
  )
}
