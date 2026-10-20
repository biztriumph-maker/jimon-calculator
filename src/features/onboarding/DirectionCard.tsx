import type { DirectionConfig, DirectionTheme } from './directionTypes'

interface DirectionCardProps {
  direction: DirectionConfig
  onSelect: (id: string) => void
  theme?: DirectionTheme
}

export function DirectionCard({ direction, onSelect, theme = 'health' }: DirectionCardProps) {
  return (
    <button
      className={`health-direction-card health-direction-card--${theme}`}
      data-direction-id={direction.id}
      data-image-status={direction.imageStatus}
      type="button"
      onClick={() => onSelect(direction.id)}
    >
      <span className="health-direction-card__copy">
        <strong>{direction.title}</strong>
        <small>{direction.description}</small>
      </span>
      <span className="health-direction-card__media" aria-hidden="true">
        <img src={direction.image} alt="" />
      </span>
      <span className="health-direction-card__arrow" aria-hidden="true">›</span>
    </button>
  )
}
