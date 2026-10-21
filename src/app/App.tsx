import { useEffect, useMemo, useState } from 'react'
import { createOrderId } from './utils'
import { products } from '../data/catalog'
import { moveOrder } from '../domain/calculator'
import type { CalculationStart, PlanOrder, Product } from '../domain/types'
import { CatalogScreen } from '../features/catalog/CatalogScreen'
import {
  HomeScreen,
  NewcomerScreen,
  ProductBeautyScreen,
  ProductDirectionScreen,
  ProductHealthScreen,
  ProductInfoScreen,
} from '../features/onboarding/OnboardingScreens'
import { healthDirectionById, healthDirectionByScreen } from '../features/onboarding/healthDirections'
import { beautyDirectionById, beautyDirectionByScreen } from '../features/onboarding/beautyDirections'
import { OrderEditor } from '../features/order-editor/OrderEditor'
import { PartnerModal } from '../features/partner/PartnerModal'
import { PlanScreen } from '../features/purchase-plan/PlanScreen'
import { ProductDirectionProductsScreen } from '../features/product-info/ProductDirectionProductsScreen'
import { ProductDetailScreen } from '../features/product-info/ProductDetailScreen'
import {
  getInformationDirectionId,
  isInformationDirectionId,
} from '../features/product-info/informationCatalog'
import { informationProductDetailById, informationProductDetailByScreen } from '../features/product-info/productDetails'
import { loadAppState, saveAppState, type Screen } from '../storage/appStorage'

export default function App() {
  const initial = useMemo(loadAppState, [])
  const [screen, setScreen] = useState<Screen>(initial.screen)
  const [start, setStart] = useState<CalculationStart | null>(initial.start)
  const [orders, setOrders] = useState<PlanOrder[]>(initial.orders)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const [editor, setEditor] = useState<{ product: Product; order: PlanOrder | null } | null>(null)
  const healthDirection = healthDirectionByScreen.get(screen)
  const beautyDirection = beautyDirectionByScreen.get(screen)
  const informationProductDetail = informationProductDetailByScreen.get(screen)

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
  const chooseProductInfo = () => {
    setScreen('product-info')
    setPartnerModalOpen(false)
    setEditor(null)
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
      {screen === 'home' && <HomeScreen onProductInfo={chooseProductInfo} onNewcomer={chooseNewcomer} onPartner={choosePartner} />}
      {screen === 'product-info' && (
        <ProductInfoScreen
          onBack={goHome}
          onHealth={() => setScreen('product-health')}
          onBeauty={() => setScreen('product-beauty')}
        />
      )}
      {screen === 'product-health' && (
        <ProductHealthScreen
          onBack={() => setScreen('product-info')}
          onSelectDirection={(directionId) => {
            const direction = healthDirectionById.get(directionId)
            if (direction) setScreen(direction.screen)
          }}
        />
      )}
      {screen === 'product-beauty' && (
        <ProductBeautyScreen
          onBack={() => setScreen('product-info')}
          onSelectDirection={(directionId) => {
            const direction = beautyDirectionById.get(directionId)
            if (direction) setScreen(direction.screen)
          }}
        />
      )}
      {healthDirection && isInformationDirectionId(healthDirection.id) && (
        <ProductDirectionProductsScreen
          directionId={healthDirection.id}
          title={healthDirection.title}
          onBack={() => setScreen('product-health')}
          onOpenProduct={(product) => {
            const detail = informationProductDetailById.get(product.id)
            if (!detail) return false
            setScreen(detail.screen)
            return true
          }}
        />
      )}
      {informationProductDetail && (
        <ProductDetailScreen
          config={informationProductDetail}
          onBack={() => {
            const directionId = getInformationDirectionId(informationProductDetail.productId)
            const direction = directionId ? healthDirectionById.get(directionId) : undefined
            setScreen(direction?.screen ?? 'product-health')
          }}
        />
      )}
      {healthDirection && !isInformationDirectionId(healthDirection.id) && (
        <ProductDirectionScreen
          title={healthDirection.title}
          onBack={() => setScreen('product-health')}
        />
      )}
      {beautyDirection && (
        <ProductDirectionScreen
          title={beautyDirection.title}
          onBack={() => setScreen('product-beauty')}
        />
      )}
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
