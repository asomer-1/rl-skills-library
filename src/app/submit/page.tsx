'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, CATEGORY_META } from '@/lib/types'

export default function SubmitPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    skill_name: '', description: '', category: 'tools',
    content: '', tags: '', submitter_github: '',
  })

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) {
        const { error: msg } = await res.json()
        throw new Error(msg ?? 'Submission failed')
      }
      router.push('/submit/success')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', fontFamily: 'Arial, sans-serif', fontSize: '12px',
    padding: '3px 6px', border: '1px solid #5a5f8c', background: '#fff',
    color: '#21242e', outline: 'none', borderRadius: '2px', height: '24px',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '12px',
    color: '#21242e', display: 'block', marginBottom: '3px',
  }

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #acace7 0%, #8ba1d4 100%)',
        borderBottom: '2px solid #3d4f97', padding: '14px 16px',
      }}>
        <div style={{
          fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '24px',
          color: '#fff', textShadow: '2px 2px 0 #3d4f97', WebkitTextStroke: '0.5px #3d4f97',
        }}>
          SUBMIT A SKILL
        </div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '13px', color: '#21242e', marginTop: '4px' }}>
          All submissions are reviewed before appearing in the library.
        </div>
      </div>

      <div style={{ display: 'flex', padding: '12px', gap: '12px' }}>
        {/* Form panel */}
        <div style={{
          flex: 1,
          background: '#dedede',
          borderRadius: '6px',
          borderTop: '1px solid rgba(255,255,255,0.8)',
          borderBottom: '1px solid #5a5f8c',
          padding: '14px',
        }}>
          {error && (
            <div style={{
              background: '#e60012', color: '#fff', padding: '6px 10px', marginBottom: '10px',
              borderRadius: '2px', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 700,
            }}>
              ERROR: {error}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle}>GitHub Username *</label>
              <input required style={inputStyle} value={form.submitter_github} onChange={(e) => set('submitter_github', e.target.value)} placeholder="e.g. asomer-1" />
            </div>
            <div>
              <label style={labelStyle}>Skill Name *</label>
              <input required style={inputStyle} value={form.skill_name} onChange={(e) => set('skill_name', e.target.value)} placeholder="e.g. Email Drafter" />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select required style={{ ...inputStyle, cursor: 'pointer', height: '26px' }} value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{CATEGORY_META[cat].label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Short Description *</label>
              <input required style={inputStyle} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="One sentence describing what this skill does" />
            </div>
            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input style={inputStyle} value={form.tags} onChange={(e) => set('tags', e.target.value)} placeholder="e.g. email, gmail, drafting" />
            </div>
            <div>
              <label style={labelStyle}>Skill File Content *</label>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#60619c', margin: '0 0 4px' }}>
                Paste the full contents of your skill .md file.
              </p>
              <textarea
                required
                style={{ ...inputStyle, height: '240px', resize: 'vertical', fontFamily: '"Courier New", monospace', fontSize: '11px', lineHeight: 1.5 }}
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
                placeholder="# Skill Name&#10;&#10;## Description&#10;..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              style={{
                fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '11px',
                padding: '7px 18px', background: submitting ? '#aaa' : '#f68d1f',
                color: '#fff', border: 'none', borderRadius: '2px',
                cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.5px',
                alignSelf: 'flex-start',
                borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT FOR REVIEW ›'}
            </button>
          </form>
        </div>

        {/* Tips sidebar */}
        <div style={{ width: '180px', minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{
            background: '#fff', borderRadius: '4px',
            borderTop: '1px solid rgba(255,255,255,0.8)', borderBottom: '1px solid #5a5f8c', overflow: 'hidden',
          }}>
            <div style={{
              background: '#ecab37', padding: '3px 8px',
              fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '10px', color: '#21242e', letterSpacing: '0.5px',
            }}>
              WHAT MAKES A GOOD SKILL?
            </div>
            <ul style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: 1.5, paddingLeft: '16px', margin: '8px 8px' }}>
              {['Clear trigger conditions', 'One job done well', 'Example inputs/outputs', 'Named with /slash-command', 'Tested before submitting'].map((tip) => (
                <li key={tip} style={{ marginBottom: '5px', color: '#21242e' }}>{tip}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#8ba1d4', borderRadius: '4px',
            borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid #3d4f97', padding: '10px',
          }}>
            <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '10px', color: '#21242e', letterSpacing: '0.5px', marginBottom: '5px' }}>
              REVIEW PROCESS
            </div>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#21242e', margin: 0, lineHeight: 1.4 }}>
              A team member reviews and merges your submission within 1–2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
