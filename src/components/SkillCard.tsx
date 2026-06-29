import Link from 'next/link'
import type { Skill } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={`/skills/${skill.slug.replace(/\//g, '--')}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        background: '#1a1a1a',
        borderBottom: '1px solid #3c3c3c',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {skill.is_new && (
          <div style={{
            border: '1px solid #ffffff',
            color: '#ffffff',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '10px',
            padding: '2px 7px',
            letterSpacing: '1.5px',
            flexShrink: 0,
          }}>
            NEW
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: '#ffffff',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {skill.name}
          </div>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: '#bbbbbb',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {skill.description}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          {skill.tags?.slice(0, 2).map((tag) => (
            <span key={tag} style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '10px',
              color: '#7e7e7e',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 300,
          fontSize: '13px',
          color: '#7e7e7e',
          flexShrink: 0,
          minWidth: '48px',
          textAlign: 'right',
        }}>
          {skill.vote_count} ▲
        </div>

        <div style={{
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 300,
          flexShrink: 0,
          lineHeight: 1,
        }}>
          →
        </div>
      </div>
    </Link>
  )
}
