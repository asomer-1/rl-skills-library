'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, CATEGORY_META } from '@/lib/types'

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

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
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Submission failed')
      const { slug } = json
      router.push(`/skills/${slug.replace(/\//g, '--')}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    fontSize: '14px',
    padding: '0 16px',
    border: '1px solid #3c3c3c',
    background: '#1a1a1a',
    color: '#ffffff',
    outline: 'none',
    borderRadius: '0',
    height: '48px',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    fontSize: '11px',
    color: '#7e7e7e',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: '#0d0d0d',
        borderBottom: '1px solid #3c3c3c',
        padding: '64px 40px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '56px',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            SUBMIT A SKILL.
          </div>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '18px',
            color: '#bbbbbb',
            maxWidth: '480px',
            lineHeight: 1.5,
          }}>
            All submissions are reviewed by a team member before appearing in the library.
          </div>
        </div>
      </div>

      {/* M stripe */}
      <div style={{ height: '4px', background: M_STRIPE }} />

      {/* Body */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px', display: 'flex', gap: '64px' }}>
        {/* Form */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {error && (
            <div style={{
              background: '#e22718',
              color: '#ffffff',
              padding: '14px 16px',
              marginBottom: '24px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.5px',
            }}>
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Submitter Name *</label>
              <input required style={inputStyle} value={form.submitter_github} onChange={(e) => set('submitter_github', e.target.value)} placeholder="e.g. asomer-1" />
            </div>
            <div>
              <label style={labelStyle}>Skill Name *</label>
              <input required style={inputStyle} value={form.skill_name} onChange={(e) => set('skill_name', e.target.value)} placeholder="e.g. Email Drafter" />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select
                required
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
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
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 300,
                fontSize: '13px',
                color: '#7e7e7e',
                marginBottom: '8px',
              }}>
                Paste the full contents of your skill .md file.
              </div>
              <textarea
                required
                style={{
                  ...inputStyle,
                  height: '320px',
                  resize: 'vertical',
                  fontFamily: '"Courier New", Courier, monospace',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  padding: '16px',
                }}
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
                placeholder="# Skill Name&#10;&#10;## Description&#10;..."
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '0 40px',
                  background: submitting ? '#3c3c3c' : '#ffffff',
                  color: submitting ? '#7e7e7e' : '#000000',
                  border: 'none',
                  borderRadius: '0',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '1.5px',
                  height: '48px',
                  textTransform: 'uppercase',
                }}
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT FOR REVIEW →'}
              </button>
            </div>
          </form>
        </div>

        {/* Tips sidebar */}
        <div style={{ width: '280px', minWidth: '280px', flexShrink: 0 }}>
          {/* What makes a good skill */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              WHAT MAKES A GOOD SKILL?
            </div>
            <div style={{ border: '1px solid #3c3c3c' }}>
              {[
                'Clear trigger conditions',
                'One job done well',
                'Example inputs / outputs',
                'Named with /slash-command',
                'Tested before submitting',
              ].map((tip, i, arr) => (
                <div key={tip} style={{
                  background: '#0d0d0d',
                  padding: '14px 16px',
                  borderBottom: i < arr.length - 1 ? '1px solid #3c3c3c' : 'none',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: '#bbbbbb',
                  lineHeight: 1.4,
                }}>
                  — {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Review process */}
          <div>
            <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              PUBLISHING
            </div>
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #3c3c3c',
              padding: '20px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              color: '#bbbbbb',
              lineHeight: 1.6,
            }}>
              Skills publish immediately and are live in the library as soon as you submit. Anyone on the team can download or copy the file.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
