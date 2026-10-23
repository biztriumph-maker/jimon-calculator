import { BrandHeader } from '../../components/Common'
import { UiIcon } from '../../components/Icons'
import approvedLogo from '../../assets/brand/jimon-logo-approved.png'
import homeNaturalBackground from '../../../JIMON_VISUAL_PREP/JIMON_PREMIUM_BACKGROUND/home-natural-background.png'
import productHeaderOriginal from '../../../JIMON_VISUAL_PREP/product-header-original.png'
import productHealthCard from '../../../JIMON_VISUAL_PREP/product-card-health.png'
import productBeautyCard from '../../../JIMON_VISUAL_PREP/product-card-beauty.png'
import productInfoApproved from '../../assets/ui/product-info/product-info-approved.png'
import newcomerFoliageApproved from '../../assets/ui/onboarding/newcomer-foliage-approved-v3.png'
import { DirectionCard } from './DirectionCard'
import { getVisibleBeautyDirections } from './beautyDirections'
import type { DirectionConfig, DirectionTheme } from './directionTypes'
import { getVisibleHealthDirections } from './healthDirections'

export function HomeScreen({ onProductInfo, onNewcomer, onPartner }: { onProductInfo: () => void; onNewcomer: () => void; onPartner: () => void }) {
  return (
    <main className="screen home-screen">
      <div className="home-premium-background" style={{ backgroundImage: `url(${homeNaturalBackground})` }}>
        <section className="home-hero-content">
          <img className="home-hero-logo" src={approvedLogo} alt="JIMON" />
          <p className="home-hero-tagline">Здоровье. Качество. Возможности.</p>
          <h1>Ваш личный<br />калькулятор покупок</h1>
          <p className="home-hero-subtitle">Просто. Понятно. Выгодно.</p>
        </section>
        <section className="home-card-list" aria-label="Разделы калькулятора">
          <article className="home-card">
            <button className="home-card__hit" aria-label="О продукции JIMON" onClick={onProductInfo}>
              <span className="home-card__icon"><UiIcon name="package" /></span>
              <span className="home-card__copy"><strong>О продукции JIMON</strong><small>Узнайте больше о продукции<br />и её направлениях</small></span><span className="home-card__arrow" aria-hidden="true">›</span>
            </button>
          </article>
          <article className="home-card">
            <button className="home-card__hit" aria-label="Я новичок" onClick={onNewcomer}>
              <span className="home-card__icon"><UiIcon name="leaf" /></span>
              <span className="home-card__copy"><strong>Я новичок</strong><small>Хочу понять, как правильно<br />сделать первые покупки<br />и получить скидку</small></span><span className="home-card__arrow" aria-hidden="true">›</span>
            </button>
          </article>
          <article className="home-card">
            <button className="home-card__hit" aria-label="Я партнёр" onClick={onPartner}>
              <span className="home-card__icon"><UiIcon name="person" /></span>
              <span className="home-card__copy"><strong>Я партнёр</strong><small>Я уже знаю свою скидку<br />и хочу рассчитать стоимость<br />товаров</small></span><span className="home-card__arrow" aria-hidden="true">›</span>
            </button>
          </article>
        </section>
        <section className="home-benefits" aria-label="Преимущества">
          <div><UiIcon name="diamond" /><span>Актуальные<br />цены</span></div><i aria-hidden="true" />
          <div><UiIcon name="shield" /><span>Учитываем<br />правила компании</span></div><i aria-hidden="true" />
          <div><UiIcon name="heart" /><span>Удобно<br />на телефоне</span></div>
        </section>
      </div>
    </main>
  )
}

export function ProductInfoScreen({
  onBack,
  onHealth,
  onBeauty,
}: {
  onBack: () => void
  onHealth: () => void
  onBeauty: () => void
}) {
  return (
    <main className="screen product-info-screen">
      <div className="product-info-artwork">
        <div className="product-info-header-fragment">
          <img src={productHeaderOriginal} alt="" aria-hidden="true" />
          <button className="product-info-hit-area product-info-hit-area--back" aria-label="Назад на главную" onClick={onBack} />
        </div>
        <div className="product-info-card-list">
          <div className="product-info-card-fragment">
            <img src={productHealthCard} alt="" aria-hidden="true" />
            <button className="product-info-hit-area" aria-label="Здоровье" onClick={onHealth} />
          </div>
          <div className="product-info-card-fragment">
            <img src={productBeautyCard} alt="" aria-hidden="true" />
            <button className="product-info-hit-area" aria-label="Красота" onClick={onBeauty} />
          </div>
        </div>
      </div>
    </main>
  )
}

export function ProductHealthScreen({
  onBack,
  onSelectDirection,
}: {
  onBack: () => void
  onSelectDirection: (directionId: string) => void
}) {
  return (
    <DirectionSelectionScreen
      title="Здоровье"
      directions={getVisibleHealthDirections()}
      theme="health"
      onBack={onBack}
      onSelectDirection={onSelectDirection}
    />
  )
}

export function ProductBeautyScreen({
  onBack,
  onSelectDirection,
}: {
  onBack: () => void
  onSelectDirection: (directionId: string) => void
}) {
  return (
    <DirectionSelectionScreen
      title="Красота"
      directions={getVisibleBeautyDirections()}
      theme="beauty"
      onBack={onBack}
      onSelectDirection={onSelectDirection}
    />
  )
}

function DirectionSelectionScreen({
  title,
  directions,
  theme,
  onBack,
  onSelectDirection,
}: {
  title: string
  directions: readonly DirectionConfig[]
  theme: DirectionTheme
  onBack: () => void
  onSelectDirection: (directionId: string) => void
}) {
  const themeClass = theme === 'beauty' ? ' product-beauty-screen' : ''

  return (
    <main className={`screen product-health-screen${themeClass}`}>
      <BrandHeader onBack={onBack} compact approved />
      <section className="product-health-content">
        <header className="product-health-heading">
          <h1>{title}</h1>
          <p>Выберите интересующее направление</p>
        </header>
        <div className="health-direction-list">
          {directions.map((direction) => (
            <div className="health-direction-list__item" key={direction.id}>
              <DirectionCard direction={direction} onSelect={onSelectDirection} theme={theme} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export function ProductDirectionScreen({
  title,
  onBack,
}: {
  title: string
  onBack: () => void
}) {
  return (
    <main className="screen product-direction-screen">
      <BrandHeader onBack={onBack} compact approved />
      <section className="intro">
        <span className="eyebrow">О продукции JIMON</span>
        <h1>{title}</h1>
        <p className="intro__lead">Раздел подготовлен для следующего этапа разработки.</p>
      </section>
    </main>
  )
}

export function NewcomerScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const steps = [
    { number: '1', icon: 'cart' as const, title: 'Выберите товары', text: 'Изучите каталог и добавьте нужные позиции в план покупок.' },
    { number: '2', icon: 'plan' as const, title: 'Добавьте их в план покупок', text: 'Сформируйте план покупок из отдельных заказов.' },
    { number: '3', icon: 'chart' as const, title: 'Следите, как меняется скидка', text: 'Цена каждого следующего заказа пересчитывается последовательно.' },
  ]
  return (
    <main className="screen onboarding-screen newcomer-screen">
      <img className="newcomer-foliage" src={newcomerFoliageApproved} alt="" aria-hidden="true" />
      <BrandHeader onBack={onBack} compact approved />
      <section className="intro">
        <span className="eyebrow">Для новичка</span><h1>Как это работает</h1>
        <div className="intro-card">
          <span className="intro-card__icon"><UiIcon name="package" /></span>
          <p className="intro__lead">Выбирайте товары, добавляйте их в план покупок и смотрите, как в процессе оформления меняется ваш уровень скидки и цена каждого последующего заказа.</p>
          <div className="starting-point"><span><small>Стартовая скидка</small><strong>0%</strong></span><span><small>Товарооборот</small><strong>0 ¥</strong></span></div>
        </div>
        <ol className="steps">{steps.map((step) => <li key={step.number}><span className="step-number">{step.number}</span><span className="step-icon"><UiIcon name={step.icon} /></span><div><strong>{step.title}</strong><small>{step.text}</small></div></li>)}</ol>
        <p className="notice notice--warm"><span className="notice__warning-icon" aria-hidden="true">!</span><span>Скидка может измениться уже между отдельными заказами в текущем плане покупок.</span></p>
      </section>
      <div className="screen-actions"><button className="primary-button" onClick={onContinue}>Перейти к товарам</button></div>
    </main>
  )
}
