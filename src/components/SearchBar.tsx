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
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search skills..."
        style={{
          flex: 1,
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '13px',
          padding: '4px 6px',
          border: '1px solid #000',
          borderRight: 'none',
          background: '#fff',
          color: '#000',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 700,
          fontSize: '11px',
          padding: '4px 10px',
          background: '#000',
          color: '#fff',
          border: '1px solid #000',
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
      >
        FIND
      </button>
    </form>
  )
}
