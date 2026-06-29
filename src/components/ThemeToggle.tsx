'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
      <span style={{
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        letterSpacing: '1.5px',
        color: !isLight ? 'var(--text-primary)' : 'var(--text-muted)',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}>
        DARK
      </span>

      {/* Track */}
      <button
        onClick={toggle}
        title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
        style={{
          position: 'relative',
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
      >
        {/* Thumb */}
        <span style={{
          position: 'absolute',
          top: '2px',
          left: isLight ? '20px' : '2px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          lineHeight: 1,
          transition: 'left 0.2s',
        }}>
          {isLight ? '☀' : '☽'}
        </span>
      </button>

      <span style={{
        fontFamily: '"Inter", sans-serif',
        fontWeight: 700,
        fontSize: '11px',
        letterSpacing: '1.5px',
        color: isLight ? 'var(--text-primary)' : 'var(--text-muted)',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}>
        LIGHT
      </span>
    </div>
  )
}
