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
      alert('Sign in with GitHub to vote.')
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
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 700,
        fontSize: '12px',
        padding: '6px 16px',
        background: voted ? '#e91d2a' : '#000',
        color: '#fff',
        border: '1px solid #000',
        cursor: loading ? 'not-allowed' : 'pointer',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        opacity: loading ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: '16px', lineHeight: 1 }}>{voted ? '▲' : '△'}</span>
      {count} {count === 1 ? 'VOTE' : 'VOTES'}
    </button>
  )
}
