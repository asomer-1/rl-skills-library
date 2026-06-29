import Link from 'next/link'
import type { Skill } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const isNew = skill.is_new

  return (
    <div style={{
      background: '#dedede',
      borderRadius: '4px',
      borderTop: '1px solid rgba(255,255,255,0.8)',
      borderBottom: '1px solid #5a5f8c',
      marginBottom: '3px',
      display: 'flex',
      alignItems: 'center',
      padding: '6px 8px',
      gap: '8px',
      position: 'relative',
    }}>
      {/* NEW badge */}
      {isNew && (
        <div style={{
          background: '#e60012',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '9px',
          padding: '1px 4px',
          borderRadius: '2px',
          letterSpacing: '0.5px',
          flexShrink: 0,
        }}>
          NEW
        </div>
      )}

      {/* Category dot */}
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '9999px',
        background: '#f68d1f',
        flexShrink: 0,
        border: '1px solid rgba(0,0,0,0.2)',
      }} />

      {/* Title + description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link href={`/skills/${skill.slug.replace(/\//g, '--')}`} style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          color: '#3d4f97',
          display: 'block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {skill.name}
        </Link>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          color: '#21242e',
          opacity: 0.7,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {skill.description}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
        {skill.tags?.slice(0, 2).map((tag) => (
          <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`} style={{
            background: '#ecab37',
            color: '#21242e',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: '9px',
            padding: '1px 5px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.3px',
            borderTop: '1px solid rgba(255,255,255,0.5)',
          }}>
            {tag}
          </Link>
        ))}
      </div>

      {/* Author + votes */}
      <div style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '10px',
        color: '#3d4f97',
        flexShrink: 0,
        textAlign: 'right',
      }}>
        <div style={{ fontWeight: 700 }}>{skill.vote_count} ▲</div>
        <div style={{ opacity: 0.7 }}>{skill.author}</div>
      </div>

      {/* Arrow chip */}
      <Link href={`/skills/${skill.slug.replace(/\//g, '--')}`} style={{
        background: '#f68d1f',
        color: '#fff',
        width: '18px',
        height: '18px',
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        fontWeight: 700,
        textDecoration: 'none',
        flexShrink: 0,
        borderTop: '1px solid rgba(255,255,255,0.4)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
      }}>
        ›
      </Link>
    </div>
  )
}
