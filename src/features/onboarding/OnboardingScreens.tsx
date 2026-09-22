import { BrandHeader } from '../../components/Common'
import { UiIcon } from '../../components/Icons'
import homeApprovedReference from '../../assets/ui/home/home-approved-reference-cropped-2x.png'
import newcomerFoliageApproved from '../../assets/ui/onboarding/newcomer-foliage-approved-v3.png'

export function HomeScreen({ onNewcomer, onPartner }: { onNewcomer: () => void; onPartner: () => void }) {
  return (
    <main className="screen home-screen">
      <img className="home-approved-reference" src={homeApprovedReference} alt="" aria-hidden="true" />
      <button className="home-hit-area home-hit-area--newcomer" aria-label="Я новичок" onClick={onNewcomer} />
      <button className="home-hit-area home-hit-area--partner" aria-label="Я партнёр" onClick={onPartner} />
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
