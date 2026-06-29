'use client'

import { useState } from 'react'

interface SkillActionsProps {
  content: string
  filename: string
  skillId: string
  initialCount: number
}

const BTN: React.CSSProperties = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '1.5px',
  height: '48px',
  padding: '0 24px',
  border: '1px solid #3c3c3c',
  background: 'transparent',
  color: '#ffffff',
  cursor: 'pointer',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
}

export default function SkillActions({ content, filename, skillId, initialCount }: SkillActionsProps) {
  const [copied, setCopied] = useState(false)
  const [voteCount, setVoteCount] = useState(initialCount)
  const [voted, setVoted] = useState(false)
  const [voting, setVoting] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDownload() {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function handleVote() {
    // Store anonymous voter ID in localStorage
    let voterId = localStorage.getItem('rl-skills-voter-id')
    if (!voterId) {
      voterId = `anon-${Math.random().toString(36).slice(2)}`
      localStorage.setItem('rl-skills-voter-id', voterId)
    }
    setVoting(true)
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId, userGithub: voterId, remove: voted }),
      })
      if (res.ok) {
        setVoted(!voted)
        setVoteCount((c) => (voted ? c - 1 : c + 1))
      }
    } finally {
      setVoting(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Download — primary action */}
      <button onClick={handleDownload} style={{ ...BTN, background: '#ffffff', color: '#000000', border: 'none' }}>
        DOWNLOAD .MD ↓
      </button>

      {/* Copy */}
      <button onClick={handleCopy} style={BTN}>
        {copied ? 'COPIED ✓' : 'COPY FILE'}
      </button>

      {/* Vote */}
      <button
        onClick={handleVote}
        disabled={voting}
        style={{
          ...BTN,
          background: voted ? '#ffffff' : 'transparent',
          color: voted ? '#000000' : '#ffffff',
          opacity: voting ? 0.5 : 1,
        }}
      >
        {voted ? '▲' : '△'} {voteCount} {voteCount === 1 ? 'VOTE' : 'VOTES'}
      </button>
    </div>
  )
}
