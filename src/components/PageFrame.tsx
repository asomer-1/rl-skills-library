export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#5a6a9a', minHeight: '100vh', padding: '12px 0' }}>
      <div style={{
        width: '830px',
        margin: '0 auto',
        background: '#7a8aba',
        borderTop: '2px solid rgba(255,255,255,0.5)',
        borderLeft: '2px solid rgba(255,255,255,0.3)',
        borderRight: '2px solid #3d4f97',
        borderBottom: '2px solid #3d4f97',
      }}>
        {children}
      </div>
    </div>
  )
}
