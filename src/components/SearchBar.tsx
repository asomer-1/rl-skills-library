'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search skills..."
        style={{
          width: '300px',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 300,
          fontSize: '14px',
          padding: '0 16px',
          border: '1px solid #3c3c3c',
          borderRight: 'none',
          background: '#1a1a1a',
          color: '#ffffff',
          outline: 'none',
          borderRadius: '0',
          height: '48px',
        }}
      />
      <button
        type="submit"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          padding: '0 24px',
          background: '#ffffff',
          color: '#000000',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '1.5px',
          borderRadius: '0',
          height: '48px',
          textTransform: 'uppercase',
        }}
      >
        SEARCH
      </button>
    </form>
  )
}
