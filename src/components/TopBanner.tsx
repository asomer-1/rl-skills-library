import Link from 'next/link'

export default function TopBanner() {
  return (
    <div style={{ background: '#000', padding: '12px 16px', borderBottom: '1px solid #000' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div
            style={{
              fontFamily: '"Arial Black", "Arial Bold", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: '28px',
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.5px',
            }}
          >
            RL SKILLS LIBRARY
          </div>
          <div
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              color: '#ccc',
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            BROWSE · FORK · SUBMIT YOUR OWN SKILL.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          {/* BUY-A-DELL style sticker — here it's "SUBMIT A SKILL" */}
          <Link
            href="/submit"
            style={{
              background: '#fcc20f',
              color: '#000',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              padding: '4px 10px',
              border: '2px solid #000',
              textDecoration: 'none',
              display: 'inline-block',
              textTransform: 'uppercase',
              boxShadow: '2px 2px 0 #000',
            }}
          >
            SUBMIT A SKILL
          </Link>
          {/* Phone-callout analog — team contact */}
          <div
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              color: '#e91d2a',
            }}
          >
            asomer@rocketlane.com
          </div>
        </div>
      </div>
    </div>
  )
}
