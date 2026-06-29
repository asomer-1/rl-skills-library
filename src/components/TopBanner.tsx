import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'Browse', href: '/' },
  { label: 'How to Install Skills', href: '/how-to-install' },
]

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

export default function TopBanner() {
  return (
    <nav style={{
      background: 'var(--bg-page)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        gap: '48px',
      }}>
        {/* Wordmark */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '20px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            lineHeight: 1,
            marginBottom: '5px',
          }}>
            RL SKILLS
          </div>
          <div style={{ height: '3px', background: M_STRIPE }} />
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.5px',
              textDecoration: 'none',
            }}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/submit" style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          color: 'var(--text-primary)',
          letterSpacing: '1.5px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          border: '1px solid var(--text-primary)',
          padding: '10px 24px',
          display: 'inline-block',
          flexShrink: 0,
        }}>
          SUBMIT SKILL
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  )
}
