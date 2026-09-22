import { useState } from 'react'
import { PARTNER_LEVELS, SELECTABLE_PARTNER_LEVELS } from '../../domain/thresholds'
import type { CalculationStart, DiscountLevel } from '../../domain/types'

export function PartnerModal({ initial, onApply, onCancel }: {
  initial: CalculationStart | null
  onApply: (start: CalculationStart) => void
  onCancel: () => void
}) {
  const initialLevel = initial?.mode === 'partner' && initial.discount !== 0 ? initial.discount : 10
  const [discount, setDiscount] = useState<DiscountLevel>(initialLevel)
  const [turnover, setTurnover] = useState(
    initial?.turnover === null || initial?.turnover === undefined ? '' : String(initial.turnover),
  )
  const [unknown, setUnknown] = useState(initial?.turnover === null)
  const numericTurnover = Number(turnover)
  const turnoverValid = unknown || (turnover.trim() !== '' && Number.isFinite(numericTurnover) && numericTurnover >= 0)

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal partner-modal" role="dialog" aria-modal="true" aria-labelledby="partner-title">
        <div className="modal__heading">
          <div><h2 id="partner-title">Ваш текущий уровень</h2><p>Укажите данные перед выбором товаров</p></div>
          <button className="icon-button" onClick={onCancel} aria-label="Отмена и возврат на главный экран">×</button>
        </div>
        <fieldset>
          <legend>Ваша текущая скидка</legend>
          <div className="discount-grid">
            {PARTNER_LEVELS.map((level) => {
              const available = SELECTABLE_PARTNER_LEVELS.includes(level)
              return (
                <button type="button" key={level} className={discount === level && available ? 'selected' : ''} disabled={!available} onClick={() => setDiscount(level)}>
                  <strong>{level}%</strong>{!available && <small>Цены уточняются</small>}
                </button>
              )
            })}
          </div>
        </fieldset>
        <label className="field-label" htmlFor="turnover">Текущий накопленный товарооборот, ¥</label>
        <input id="turnover" className="text-input" type="number" min="0" step="1" inputMode="numeric" disabled={unknown} value={unknown ? '' : turnover} onChange={(event) => setTurnover(event.target.value)} placeholder="Например, 18 500" />
        <label className="checkbox-row">
          <input type="checkbox" checked={unknown} onChange={(event) => setUnknown(event.target.checked)} />
          <span>Не помню товарооборот</span>
        </label>
        <p className="notice">
          {unknown
            ? 'Расчёт будет выполняться по выбранному вами уровню скидки. Переход на следующий уровень автоматически рассчитываться не будет.'
            : 'Выбранная скидка остаётся стартовой. Товарооборот используется только для будущего повышения в плане.'}
        </p>
        <div className="modal__actions">
          <button className="secondary-button" onClick={onCancel}>Отмена</button>
          <button className="primary-button" disabled={!turnoverValid} onClick={() => onApply({ mode: 'partner', discount, turnover: unknown ? null : numericTurnover })}>Применить</button>
        </div>
      </section>
    </div>
  )
}
