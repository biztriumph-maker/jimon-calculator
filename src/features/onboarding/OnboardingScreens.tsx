import { BrandHeader } from '../../components/Common'
import { UiIcon } from '../../components/Icons'

export function HomeScreen({ onNewcomer, onPartner }: { onNewcomer: () => void; onPartner: () => void }) {
  return (
    <main className="screen home-screen">
      <BrandHeader />
      <section className="hero">
        <h1><span>Ваш личный</span><span>калькулятор покупок</span></h1>
        <p>Просто. Понятно. Выгодно.</p>
        <div className="nature-scene" aria-hidden="true">
          <span className="nature-scene__sun" />
          <span className="nature-scene__mountain nature-scene__mountain--back" />
          <span className="nature-scene__mountain nature-scene__mountain--middle" />
          <span className="nature-scene__mountain nature-scene__mountain--front" />
          <span className="nature-scene__mist" />
        </div>
      </section>
      <section className="role-list" aria-label="Выберите режим">
        <button className="role-card" onClick={onNewcomer}>
          <span className="role-card__icon"><UiIcon name="leaf" /></span>
          <span><strong>Я новичок</strong><small>Хочу понять, как правильно сделать первые покупки и получить скидку</small></span>
          <span className="role-card__arrow" aria-hidden="true">›</span>
        </button>
        <button className="role-card" onClick={onPartner}>
          <span className="role-card__icon"><UiIcon name="person" /></span>
          <span><strong>Я партнёр</strong><small>Я уже знаю свою скидку и хочу рассчитать стоимость товаров</small></span>
          <span className="role-card__arrow" aria-hidden="true">›</span>
        </button>
      </section>
      <section className="benefits" aria-label="Преимущества">
        <div><span className="benefit-icon"><UiIcon name="diamond" /></span><small>Актуальные<br />цены</small></div>
        <div><span className="benefit-icon"><UiIcon name="shield" /></span><small>Учитываем правила<br />компании</small></div>
        <div><span className="benefit-icon"><UiIcon name="heart" /></span><small>Удобно<br />на телефоне</small></div>
      </section>
    </main>
  )
}

export function NewcomerScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const steps = [
    { number: '1', icon: 'cart' as const, title: 'Выберите товары', text: 'Изучите каталог и добавьте нужные позиции в план.' },
    { number: '2', icon: 'plan' as const, title: 'Добавьте их в план покупок', text: 'Сформируйте план из отдельных заказов.' },
    { number: '3', icon: 'chart' as const, title: 'Следите, как меняется скидка', text: 'Цена каждого следующего заказа пересчитывается последовательно.' },
  ]
  return (
    <main className="screen onboarding-screen newcomer-screen">
      <BrandHeader onBack={onBack} compact />
      <section className="intro">
        <span className="eyebrow">Для новичка</span><h1>Как это работает</h1>
        <div className="intro-card">
          <span className="intro-card__icon"><UiIcon name="package" /></span>
          <p className="intro__lead">Выбирайте товары, добавляйте их в план покупок и смотрите, как в процессе оформления меняется ваш уровень скидки и цена каждого последующего заказа.</p>
          <div className="starting-point"><span><small>Стартовая скидка</small><strong>0%</strong></span><span><small>Товарооборот</small><strong>0 ¥</strong></span></div>
        </div>
        <ol className="steps">{steps.map((step) => <li key={step.number}><span className="step-number">{step.number}</span><span className="step-icon"><UiIcon name={step.icon} /></span><div><strong>{step.title}</strong><small>{step.text}</small></div></li>)}</ol>
        <p className="notice notice--warm">Скидка может измениться уже между отдельными заказами в текущем плане.</p>
      </section>
      <div className="screen-actions"><button className="primary-button" onClick={onContinue}>Перейти к товарам</button></div>
    </main>
  )
}
