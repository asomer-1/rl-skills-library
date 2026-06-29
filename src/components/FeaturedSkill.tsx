'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Skill } from '@/lib/types'

export default function FeaturedSkill({ skills }: { skills: Skill[] }) {
  const [skill, setSkill] = useState<Skill | null>(null)
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (skills.length === 0) return
    setSkill(skills[Math.floor(Math.random() * skills.length)])
  }, [skills])

  if (!skill) return null

  const skillUrl = `/skills/${skill.slug.replace(/\//g, '--')}`

  function handleCopy() {
    navigator.clipboard.writeText(skill!.content).then(() => {
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDownload() {
    const blob = new Blob([skill!.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const filename = skill!.slug.split('/').pop() ?? skill!.name.toLowerCase().replace(/\s+/g, '-')
    a.href = url
    a.download = `${filename}.md`
    a.click()
    URL.revokeObjectURL(url)
    fetch('/api/download', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ skillId: skill!.id }) }).catch(() => {})
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '12px',
        gap: '12px',
      }}>
        <span style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          color: '#ffffff',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {skill.name}
        </span>
        <div style={{ display: 'flex', gap: '16px', flexShrink: 0 }}>
          <button
            onClick={handleDownload}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: '#7e7e7e',
              letterSpacing: '0.5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            DOWNLOAD
          </button>
          <Link href={skillUrl} style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: '#7e7e7e',
            letterSpacing: '0.5px',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}>
            VIEW →
          </Link>
        </div>
      </div>

      {/* Content box */}
      <div
        onClick={handleCopy}
        style={{
          position: 'relative',
          border: '1px solid #3c3c3c',
          background: '#0d0d0d',
          overflow: 'hidden',
          cursor: 'copy',
          height: '280px',
        }}
      >
        <pre style={{
          margin: 0,
          padding: '20px',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '11px',
          lineHeight: 1.6,
          color: '#bbbbbb',
          overflowY: 'auto',
          height: '100%',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          boxSizing: 'border-box',
        }}>
          {skill.content}
        </pre>

        {/* Copy feedback overlay */}
        {copied && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: '#ffffff',
              letterSpacing: '2px',
            }}>
              COPIED
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
