import Link from 'next/link'

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

const FOOTER_LINKS = [
  { label: 'Browse All Skills', href: '/' },
  { label: 'Submit a Skill', href: '/submit' },
  { label: 'Email', href: '/?category=email' },
  { label: 'Calendar', href: '/?category=calendar' },
  { label: 'Rocketlane', href: '/?category=rocketlane' },
  { label: 'Research', href: '/?category=research' },
  { label: 'Writing', href: '/?category=writing' },
  { label: 'Tools', href: '/?category=tools' },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#000000',
      borderTop: '1px solid #3c3c3c',
      padding: '64px 40px',
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* M stripe */}
        <div style={{ height: '4px', background: M_STRIPE, marginBottom: '48px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '48px' }}>
          {/* Wordmark */}
          <div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '20px',
              color: '#ffffff',
              letterSpacing: '-0.5px',
              marginBottom: '8px',
            }}>
              RL SKILLS
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              color: '#7e7e7e',
              maxWidth: '240px',
              lineHeight: 1.5,
            }}>
              An internal library of Claude Code skills for the Rocketlane team.
            </div>
          </div>

          {/* Link grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
            {FOOTER_LINKS.map((link) => (
              <Link key={link.label} href={link.href} style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#7e7e7e',
                letterSpacing: '0.5px',
                textDecoration: 'none',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #3c3c3c',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: '#7e7e7e',
            letterSpacing: '0.5px',
          }}>
            ©2026 Rocketlane — Internal Tool
          </span>
          <Link href="https://github.com/asomer-1/rl-skills-library" style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            color: '#7e7e7e',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            GitHub →
          </Link>
        </div>
      </div>
    </footer>
  )
}
