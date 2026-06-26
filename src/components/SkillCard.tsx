import Link from 'next/link'
import NewBurst from './NewBurst'
import type { Skill } from '@/lib/types'
import { CATEGORY_META } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const meta = CATEGORY_META[skill.category]
  const tint = meta?.tint ?? '#b3bd95'

  return (
    <div style={{ position: 'relative', borderBottom: '1px solid #000' }}>
      {skill.is_new && <NewBurst />}

      {/* Title bar */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #000',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href={`/skills/${skill.slug}`}
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            color: '#000',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
        >
          {skill.name}
        </Link>
        <span
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '11px',
            color: '#666',
            fontWeight: 400,
          }}
        >
          v{skill.version}
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          background: tint,
          padding: '10px 12px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: '13px',
              color: '#000',
              margin: '0 0 6px 0',
              lineHeight: 1.4,
            }}
          >
            {skill.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
            {skill.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/?tag=${encodeURIComponent(tag)}`}
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#000',
                  background: 'rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.3)',
                  padding: '1px 5px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </Link>
            ))}
          </div>

          <div
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: '11px',
              color: '#000',
              opacity: 0.7,
            }}
          >
            by {skill.author}
          </div>
        </div>

        {/* Right notch — vote count + link */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            minWidth: '56px',
            borderLeft: '1px solid rgba(0,0,0,0.2)',
            paddingLeft: '10px',
          }}
        >
          <div
            style={{
              fontFamily: '"Arial Black", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: '20px',
              color: '#000',
              lineHeight: 1,
            }}
          >
            {skill.vote_count}
          </div>
          <div
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: '9px',
              color: '#000',
              opacity: 0.6,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            VOTES
          </div>
          <Link
            href={`/skills/${skill.slug}`}
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '10px',
              color: '#000',
              background: '#fff',
              border: '1px solid #000',
              padding: '2px 6px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              marginTop: '4px',
              display: 'block',
              textAlign: 'center',
            }}
          >
            VIEW
          </Link>
        </div>
      </div>
    </div>
  )
}
