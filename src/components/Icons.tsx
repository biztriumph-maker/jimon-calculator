type IconName =
  | 'leaf'
  | 'person'
  | 'diamond'
  | 'shield'
  | 'heart'
  | 'package'
  | 'cart'
  | 'plan'
  | 'chart'

export function UiIcon({ name, className = '' }: { name: IconName; className?: string }) {
  const common = {
    className: `ui-icon ${className}`,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  if (name === 'leaf') {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M20.8 3.2C12.5 3.3 6.9 6.2 4.5 11c-1.7 3.4-.7 6.7.7 8.8 2.7-5.1 6.9-8.9 12.7-11.4-4.7 3.3-8.1 7.4-10.2 12.4 3.2.6 7-.5 9.4-3.5 2.6-3.4 3.4-8.2 3.7-14.1Z" />
      </svg>
    )
  }

  if (name === 'person') {
    return (
      <svg {...common}>
        <circle cx="12" cy="7.1" r="4.2" fill="currentColor" />
        <path fill="currentColor" d="M4.2 21c.3-5 3-7.7 7.8-7.7s7.5 2.7 7.8 7.7H4.2Z" />
      </svg>
    )
  }

  if (name === 'diamond') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="m4 8 3-4h10l3 4-8 12L4 8Z" />
        <path d="m7 4 2.2 4L12 4l2.8 4L17 4M4 8h16M9.2 8 12 20l2.8-12" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 5.5 5.5v5.7c0 4.1 2.3 7.4 6.5 9.8 4.2-2.4 6.5-5.7 6.5-9.8V5.5L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }

  if (name === 'heart') {
    return (
      <svg {...common}>
        <path fill="currentColor" d="M12 20.5 4.1 13C.9 9.9 2.8 4.5 7.2 4.5c2 0 3.7 1.1 4.8 2.7 1.1-1.6 2.8-2.7 4.8-2.7 4.4 0 6.3 5.4 3.1 8.5L12 20.5Z" />
      </svg>
    )
  }

  if (name === 'package') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.2l8 4.6" />
      </svg>
    )
  }

  if (name === 'cart') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2l1.8 10.2h9.6l2-7H6" />
        <circle cx="9" cy="19" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="17" cy="19" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'plan') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="5" y="3" width="14" height="18" rx="2.4" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    )
  }

  return (
    <svg {...common} fill="currentColor">
      <rect x="3" y="13" width="4" height="8" rx="1" />
      <rect x="10" y="8" width="4" height="13" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  )
}
