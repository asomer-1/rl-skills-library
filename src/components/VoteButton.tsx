'use client'

import { useState } from 'react'

interface VoteButtonProps {
  skillId: string
  initialCount: number
  initialVoted: boolean
  userGithub?: string
}

export default function VoteButton({ skillId, initialCount, initialVoted, userGithub }: VoteButtonProps) {
  const [count, setCount] = useState(initialCount)
  const [voted, setVoted] = useState(initialVoted)
  const [loading, setLoading] = useState(false)

  async function handleVote() {
    if (!userGithub) {
      alert('Enter your GitHub username to vote.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId, userGithub, remove: voted }),
      })
      if (res.ok) {
        setVoted(!voted)
        setCount((c) => (voted ? c - 1 : c + 1))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={loading}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        padding: '5px 14px',
        background: voted ? '#e60012' : '#f68d1f',
        color: '#fff',
        border: 'none',
        borderRadius: '2px',
        cursor: loading ? 'not-allowed' : 'pointer',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        opacity: loading ? 0.6 : 1,
        borderTop: '1px solid rgba(255,255,255,0.4)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
      }}
    >
      <span style={{
        width: '22px',
        height: '22px',
        borderRadius: '9999px',
        background: 'rgba(0,0,0,0.2)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
      }}>
        {voted ? '▲' : '△'}
      </span>
      {count} {count === 1 ? 'VOTE' : 'VOTES'}
    </button>
  )
}
