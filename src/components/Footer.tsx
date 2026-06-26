import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'BROWSE', icon: '⊞', href: '/' },
  { label: 'SUBMIT', icon: '✎', href: '/submit' },
  { label: 'GITHUB', icon: '⌥', href: 'https://github.com/asomer-1/rl-skills-library' },
  { label: 'SUPPORT', icon: '◎', href: 'mailto:asomer@rocketlane.com' },
]

export default function Footer() {
  return (
    <div style={{ borderTop: '1px solid #000', background: '#fff' }}>
      {/* Icon nav */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          borderBottom: '2px solid #5a8a5a',
          padding: '8px 0',
        }}
      >
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 20px',
              borderLeft: i > 0 ? '1px solid #ccc' : 'none',
              textDecoration: 'none',
              color: '#000',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '10px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Legal row */}
      <div style={{ padding: '8px 16px', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '11px', color: '#000', margin: 0 }}>
          <Link href="https://github.com/asomer-1/rl-skills-library" style={{ color: '#0000ee' }}>
            rl-skills-library
          </Link>{' '}
          — an internal tool for the Rocketlane team. Skills are community-contributed and reviewed before merging.
        </p>
        <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '10px', color: '#666', margin: '4px 0 0' }}>
          This site is best viewed with browser versions 3.0 and higher.
        </p>
      </div>
    </div>
  )
}
