export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
