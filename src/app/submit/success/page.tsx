import Link from 'next/link'

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

export default function SubmitSuccessPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: '#0d0d0d',
        borderBottom: '1px solid #3c3c3c',
        padding: '96px 40px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ height: '4px', background: M_STRIPE, marginBottom: '40px', maxWidth: '120px' }} />
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '56px',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            SUBMISSION<br />RECEIVED.
          </div>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '18px',
            color: '#bbbbbb',
            maxWidth: '480px',
            lineHeight: 1.6,
            marginBottom: '40px',
          }}>
            Your skill is now live in the library. Download it or copy the file to your <code style={{ fontFamily: '"Courier New", monospace', background: '#1a1a1a', padding: '1px 5px' }}>.claude/skills/</code> directory to start using it.
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#000000',
              letterSpacing: '1.5px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              background: '#ffffff',
              padding: '0 32px',
              height: '48px',
              display: 'inline-flex',
              alignItems: 'center',
            }}>
              ← BROWSE LIBRARY
            </Link>
            <Link href="/submit" style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              letterSpacing: '1.5px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              border: '1px solid #3c3c3c',
              padding: '0 32px',
              height: '48px',
              display: 'inline-flex',
              alignItems: 'center',
            }}>
              SUBMIT ANOTHER →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
