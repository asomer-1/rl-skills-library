'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, CATEGORY_META } from '@/lib/types'

export default function SubmitPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    skill_name: '',
    description: '',
    category: 'tools',
    content: '',
    tags: '',
    submitter_github: '',
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
    width: '100%', fontFamily: '"Times New Roman", Times, serif', fontSize: '13px',
    padding: '4px 6px', border: '1px solid #000', background: '#fff', color: '#000', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px',
    textTransform: 'uppercase', display: 'block', marginBottom: '4px',
  }

  return (
    <div>
      {/* Eyebrow */}
      <div style={{ background: '#8c9ae0', borderBottom: '1px solid #000', padding: '10px 16px' }}>
        <span style={{ fontFamily: '"Arial Black", Helvetica, sans-serif', fontWeight: 900, fontSize: '22px', textTransform: 'uppercase' }}>
          SUBMIT A SKILL
        </span>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Form */}
        <div style={{ flex: 1, padding: '16px', borderRight: '1px solid #000' }}>
          <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '14px', margin: '0 0 16px', lineHeight: 1.5 }}>
            Submit a Claude Code skill to the library. All submissions are reviewed by a team member before appearing in the library.
          </p>

          {error && (
            <div style={{ background: '#e91d2a', color: '#fff', padding: '8px 12px', marginBottom: '12px', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '12px' }}>
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Your GitHub Username *</label>
              <input required style={inputStyle} value={form.submitter_github} onChange={(e) => set('submitter_github', e.target.value)} placeholder="e.g. asomer-1" />
            </div>

            <div>
              <label style={labelStyle}>Skill Name *</label>
              <input required style={inputStyle} value={form.skill_name} onChange={(e) => set('skill_name', e.target.value)} placeholder="e.g. Email Drafter" />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>
              <select required style={{ ...inputStyle, cursor: 'pointer' }} value={form.category} onChange={(e) => set('category', e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{CATEGORY_META[cat].label}</option>
                ))}
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
              <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12px', color: '#666', margin: '0 0 4px' }}>
                Paste the full contents of your skill&apos;s .md file (the instructions that go in .claude/skills/).
              </p>
              <textarea
                required
                style={{ ...inputStyle, height: '280px', resize: 'vertical', fontFamily: '"Courier New", Courier, monospace', fontSize: '12px' }}
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
                placeholder="# Skill Name&#10;&#10;## Description&#10;...&#10;&#10;## Usage&#10;..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px',
                padding: '8px 20px', background: submitting ? '#666' : '#000', color: '#fff',
                border: '1px solid #000', cursor: submitting ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase', alignSelf: 'flex-start',
              }}
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT FOR REVIEW →'}
            </button>
          </form>
        </div>

        {/* Right sidebar — tips */}
        <div style={{ width: '200px', minWidth: '200px', padding: '16px' }}>
          <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
            WHAT MAKES A GOOD SKILL?
          </div>
          <ul style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '13px', lineHeight: 1.5, paddingLeft: '16px', margin: 0 }}>
            {[
              'Clear, specific trigger conditions',
              'One job done well',
              'Includes example inputs/outputs',
              'Named with a slash command (e.g. /skill-name)',
              'Tested before submitting',
            ].map((tip) => (
              <li key={tip} style={{ marginBottom: '6px' }}>{tip}</li>
            ))}
          </ul>

          <div style={{ marginTop: '16px', background: '#fcc20f', border: '2px solid #000', padding: '8px', boxShadow: '2px 2px 0 #000' }}>
            <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
              REVIEW PROCESS
            </div>
            <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12px', margin: 0, lineHeight: 1.4 }}>
              A team member reviews and merges your submission within 1-2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
