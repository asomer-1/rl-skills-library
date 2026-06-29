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
          width: '140px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          padding: '2px 5px',
          border: '1px solid #5a5f8c',
          borderRight: 'none',
          background: '#fff',
          color: '#21242e',
          outline: 'none',
          borderRadius: '2px 0 0 2px',
          height: '22px',
        }}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '11px',
          padding: '0 10px',
          background: '#ecab37',
          color: '#21242e',
          border: '1px solid #5a5f8c',
          cursor: 'pointer',
          letterSpacing: '0.5px',
          borderRadius: '0 2px 2px 0',
          height: '22px',
          borderTop: '1px solid rgba(255,255,255,0.5)',
          borderBottom: '1px solid rgba(0,0,0,0.2)',
        }}
      >
        GO
      </button>
    </form>
  )
}
