'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type SortKey = 'date' | 'downloads' | 'votes' | 'alpha'

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'date', label: 'UPLOAD DATE' },
  { key: 'downloads', label: 'DOWNLOADS' },
  { key: 'votes', label: 'VOTES' },
  { key: 'alpha', label: 'A–Z' },
]

export default function SortBar() {
  const router = useRouter()
  const params = useSearchParams()

  const currentSort = (params.get('sort') ?? 'date') as SortKey
  const currentDir = params.get('dir') ?? (currentSort === 'alpha' ? 'asc' : 'desc')

  function setSort(key: SortKey) {
    const next = new URLSearchParams(params.toString())
    next.set('sort', key)
    const defaultDir = key === 'alpha' ? 'asc' : 'desc'
    next.set('dir', defaultDir)
    router.push(`?${next.toString()}`)
  }

  function toggleDir() {
    const next = new URLSearchParams(params.toString())
    next.set('dir', currentDir === 'asc' ? 'desc' : 'asc')
    router.push(`?${next.toString()}`)
  }

  const BASE: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    fontSize: '11px',
    letterSpacing: '1.5px',
    padding: '6px 14px',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    background: 'transparent',
    textTransform: 'uppercase',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        color: 'var(--text-muted)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        marginRight: '4px',
      }}>
        SORT:
      </span>
      {OPTIONS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSort(key)}
          style={{
            ...BASE,
            color: currentSort === key ? 'var(--bg-page)' : 'var(--text-muted)',
            background: currentSort === key ? 'var(--text-primary)' : 'transparent',
            borderColor: currentSort === key ? 'var(--text-primary)' : 'var(--border)',
          }}
        >
          {label}
        </button>
      ))}
      <button
        onClick={toggleDir}
        style={{
          ...BASE,
          color: 'var(--text-secondary)',
          borderColor: 'var(--border)',
          padding: '6px 10px',
        }}
        title={currentDir === 'asc' ? 'Ascending' : 'Descending'}
      >
        {currentDir === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  )
}
