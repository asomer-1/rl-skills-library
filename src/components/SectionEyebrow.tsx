const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

interface SectionLabelBarProps {
  label: string
  count?: number
}

export default function SectionLabelBar({ label, count }: SectionLabelBarProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
        }}>
          {label}
        </span>
        {count !== undefined && (
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.5px',
          }}>
            {count} {count === 1 ? 'SKILL' : 'SKILLS'}
          </span>
        )}
      </div>
    </div>
  )
}
