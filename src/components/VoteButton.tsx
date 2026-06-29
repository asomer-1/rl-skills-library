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
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: '14px',
        padding: '0 32px',
        background: voted ? '#ffffff' : 'transparent',
        color: voted ? '#000000' : '#ffffff',
        border: '1px solid #ffffff',
        borderRadius: '0',
        cursor: loading ? 'not-allowed' : 'pointer',
        letterSpacing: '1.5px',
        height: '48px',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: loading ? 0.5 : 1,
      }}
    >
      <span style={{ fontSize: '16px' }}>{voted ? '▲' : '△'}</span>
      {count} {count === 1 ? 'VOTE' : 'VOTES'}
    </button>
  )
}
