interface SectionLabelBarProps {
  label: string
  count?: number
}

export default function SectionLabelBar({ label, count }: SectionLabelBarProps) {
  return (
    <div style={{
      background: '#7a8aba',
      borderTop: '1px solid rgba(255,255,255,0.4)',
      borderBottom: '1px solid #3d4f97',
      padding: '4px 10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>≡</span>
        <span style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '11px',
          color: '#21242e',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: 'rgba(33,36,46,0.6)',
          fontWeight: 700,
        }}>
          {count} {count === 1 ? 'SKILL' : 'SKILLS'}
        </span>
      )}
    </div>
  )
}
