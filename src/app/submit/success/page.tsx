import Link from 'next/link'

export default function SubmitSuccessPage() {
  return (
    <div>
      <div style={{ background: '#c0d4a7', borderBottom: '1px solid #000', padding: '10px 16px' }}>
        <span style={{ fontFamily: '"Arial Black", Helvetica, sans-serif', fontWeight: 900, fontSize: '22px', textTransform: 'uppercase' }}>
          SUBMISSION RECEIVED
        </span>
      </div>
      <div style={{ padding: '32px 24px', maxWidth: '600px' }}>
        <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '15px', lineHeight: 1.6, margin: '0 0 16px' }}>
          Your skill has been submitted for review. A team member will review and merge it within 1-2 business days. Once approved, it will appear in the library automatically.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px',
              padding: '7px 18px', background: '#000', color: '#fff',
              textDecoration: 'none', textTransform: 'uppercase', border: '1px solid #000',
            }}
          >
            ← BROWSE LIBRARY
          </Link>
          <Link
            href="/submit"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px',
              padding: '7px 18px', background: '#fff', color: '#000',
              textDecoration: 'none', textTransform: 'uppercase', border: '1px solid #000',
            }}
          >
            SUBMIT ANOTHER
          </Link>
        </div>
      </div>
    </div>
  )
}
