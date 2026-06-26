interface SectionEyebrowProps {
  label: string
  bg: string
  skillCount?: number
}

export default function SectionEyebrow({ label, bg, skillCount }: SectionEyebrowProps) {
  return (
    <div
      style={{
        background: bg,
        borderBottom: '1px solid #000',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          fontFamily: '"Arial Black", "Arial Bold", Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: '22px',
          color: '#000',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      {skillCount !== undefined && (
        <span
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            color: '#000',
            opacity: 0.6,
            textTransform: 'uppercase',
          }}
        >
          {skillCount} {skillCount === 1 ? 'SKILL' : 'SKILLS'}
        </span>
      )}
    </div>
  )
}
