import Link from 'next/link'

export default function SubmitSuccessPage() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #acace7 0%, #8ba1d4 100%)',
        borderBottom: '2px solid #3d4f97', padding: '14px 16px',
      }}>
        <div style={{
          fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '24px',
          color: '#fff', textShadow: '2px 2px 0 #3d4f97', WebkitTextStroke: '0.5px #3d4f97',
        }}>
          SUBMISSION RECEIVED
        </div>
      </div>
      <div style={{ padding: '24px 16px', maxWidth: '520px' }}>
        <div style={{
          background: '#dedede', borderRadius: '6px', padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.8)', borderBottom: '1px solid #5a5f8c',
          marginBottom: '14px',
        }}>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', lineHeight: 1.5, margin: 0, color: '#21242e' }}>
            Your skill has been submitted for review. A team member will review and merge it within 1–2 business days. Once approved, it will appear in the library automatically.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/" style={{
            background: '#f68d1f', color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700,
            fontSize: '11px', padding: '7px 16px', borderRadius: '2px', textDecoration: 'none', letterSpacing: '0.5px',
            borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(0,0,0,0.2)',
          }}>
            ‹ BROWSE LIBRARY
          </Link>
          <Link href="/submit" style={{
            background: '#21242e',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700,
            fontSize: '11px', padding: '7px 16px', textDecoration: 'none', letterSpacing: '0.5px',
            borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(0,0,0,0.3)',
          }}>
            SUBMIT ANOTHER
          </Link>
        </div>
      </div>
    </div>
  )
}
