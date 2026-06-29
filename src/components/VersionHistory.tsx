'use client'

import type { SkillVersion } from '@/lib/types'

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

interface VersionHistoryProps {
  versions: SkillVersion[]
  skillName: string
}

export default function VersionHistory({ versions, skillName }: VersionHistoryProps) {
  if (versions.length === 0) return null

  function handleDownload(version: SkillVersion) {
    const blob = new Blob([version.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const filename = skillName.replace(/^\//, '').replace(/\//g, '-')
    a.href = url
    a.download = `${filename}-v${version.version}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ marginTop: '48px' }}>
      <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
      <div style={{
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: '14px',
        color: 'var(--text-primary)',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        marginBottom: '16px',
      }}>
        VERSION HISTORY
      </div>

      <div style={{ border: '1px solid var(--border)' }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 1fr auto',
          gap: '16px',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)',
        }}>
          {['VERSION', 'RELEASED', 'AUTHOR', ''].map((h) => (
            <div key={h} style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>
              {h}
            </div>
          ))}
        </div>

        {versions.map((v, i) => (
          <div
            key={v.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr auto',
              gap: '16px',
              padding: '14px 16px',
              borderBottom: i < versions.length - 1 ? '1px solid var(--border)' : 'none',
              background: 'var(--bg-card)',
              alignItems: 'center',
            }}
          >
            <div style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontWeight: 700,
              fontSize: '13px',
              color: 'var(--text-primary)',
            }}>
              v{v.version}
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--text-secondary)',
            }}>
              {new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--text-secondary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {v.author}
            </div>
            <button
              onClick={() => handleDownload(v)}
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '1px',
                color: 'var(--text-muted)',
                background: 'none',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                padding: '5px 10px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              ↓ v{v.version}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
