import type { HealthDirectionConfig } from './healthDirections'

interface HealthDirectionCardProps {
  direction: HealthDirectionConfig
  onSelect: (id: string) => void
}

export function HealthDirectionCard({ direction, onSelect }: HealthDirectionCardProps) {
  return (
    <button
      className="health-direction-card"
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
