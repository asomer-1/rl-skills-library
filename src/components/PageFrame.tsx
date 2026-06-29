export default function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
