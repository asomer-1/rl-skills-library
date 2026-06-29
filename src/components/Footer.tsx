export default function Footer() {
  return (
    <div style={{
      background: '#21242e',
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
      backgroundSize: '4px 4px',
      borderTop: '2px solid #3d4f97',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
    }}>
      <p style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '10px',
        color: '#9fbee7',
        margin: 0,
      }}>
        ©2026 Rocketlane — RL Skills Library. An internal tool for the team.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* ESRB-style badge */}
        <div style={{
          background: '#ecab37',
          color: '#21242e',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '9px',
          padding: '2px 6px',
          borderRadius: '2px',
          letterSpacing: '0.3px',
        }}>
          COMMUNITY REVIEWED
        </div>
        <p style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: '#9fbee7',
          margin: 0,
          opacity: 0.7,
        }}>
          This site is best viewed with browser versions 3.0 and higher.
        </p>
      </div>
    </div>
  )
}
