'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-primary)',
      fontFamily: '"Inter", sans-serif',
      fontSize: '18px',
      padding: '0 8px',
      lineHeight: 1,
      flexShrink: 0,
    }} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {theme === 'dark' ? '☀︎' : '☽'}
    </button>
  )
}
