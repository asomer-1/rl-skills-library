export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#888', minHeight: '100vh', padding: '8px' }}>
      <div
        style={{
          border: '8px solid #000',
          background: '#fff',
          maxWidth: '960px',
          margin: '0 auto',
          minHeight: 'calc(100vh - 16px)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
