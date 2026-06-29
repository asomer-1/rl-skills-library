import Link from 'next/link'

const NAV_ITEMS = ['SKILLS', 'CATEGORIES', 'SUBMIT', 'GITHUB']
const NAV_HREFS: Record<string, string> = {
  SKILLS: '/',
  CATEGORIES: '/?view=categories',
  SUBMIT: '/submit',
  GITHUB: 'https://github.com/asomer-1/rl-skills-library',
}

const SUBNAV = [
  { label: 'All Skills', href: '/' },
  { label: 'Email', href: '/?category=email' },
  { label: 'Calendar', href: '/?category=calendar' },
  { label: 'Rocketlane', href: '/?category=rocketlane' },
  { label: 'Research', href: '/?category=research' },
  { label: 'Writing', href: '/?category=writing' },
  { label: 'Data', href: '/?category=data' },
  { label: 'Tools', href: '/?category=tools' },
]

export default function TopBanner() {
  return (
    <div>
      {/* Primary nav — carbon slab with halftone */}
      <div style={{
        background: '#21242e',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '0',
        borderBottom: '2px solid #3d4f97',
      }}>
        {/* Logo pill */}
        <div style={{
          background: '#fff',
          borderRadius: '9999px',
          padding: '2px 12px',
          marginRight: '16px',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontWeight: 900,
            fontSize: '13px',
            color: '#e60012',
            letterSpacing: '-0.5px',
          }}>RL SKILLS</span>
        </div>

        {/* Nav words in gold */}
        <div style={{ display: 'flex', gap: '0', flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item} href={NAV_HREFS[item]} style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: '#e48600',
              padding: '0 14px',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            }}>
              {item}
            </Link>
          ))}
        </div>

        {/* Amber utility chips */}
        <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
          <Link href="/submit" style={{
            background: '#ecab37',
            color: '#21242e',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.5px',
            borderTop: '1px solid rgba(255,255,255,0.4)',
            borderBottom: '1px solid rgba(0,0,0,0.2)',
          }}>
            SUBMIT SKILL
          </Link>
          <Link href="/?q=" style={{
            background: '#ecab37',
            color: '#21242e',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.5px',
            borderTop: '1px solid rgba(255,255,255,0.4)',
            borderBottom: '1px solid rgba(0,0,0,0.2)',
          }}>
            SEARCH
          </Link>
        </div>
      </div>

      {/* Subnav strip — pale sky */}
      <div style={{
        background: '#9fbee7',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '0',
        borderBottom: '1px solid #3d4f97',
      }}>
        {SUBNAV.map((item, i) => (
          <Link key={item.label} href={item.href} style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            color: '#21242e',
            padding: '0 10px',
            textDecoration: 'none',
            letterSpacing: '0.5px',
            borderRight: i < SUBNAV.length - 1 ? '1px solid #3d4f97' : 'none',
            textTransform: 'uppercase',
          }}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
