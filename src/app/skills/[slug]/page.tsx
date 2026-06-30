import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getSkillBySlug, getAllSkills, getSkillVersions } from '@/lib/data'
import { CATEGORY_META } from '@/lib/types'
import SkillActions from '@/components/SkillActions'
import VersionHistory from '@/components/VersionHistory'

export const revalidate = 60

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

export async function generateStaticParams() {
  const skills = await getAllSkills().catch(() => [])
  return skills.map((s) => ({ slug: s.slug.replace(/\//g, '--') }))
}

export default async function SkillDetailPage(props: PageProps<'/skills/[slug]'>) {
  const { slug } = await props.params
  const decodedSlug = slug.replace(/--/g, '/')
  const skill = await getSkillBySlug(decodedSlug).catch(() => null)
  if (!skill) notFound()

  const [meta, versions] = await Promise.all([
    Promise.resolve(CATEGORY_META[skill.category]),
    getSkillVersions(skill.id),
  ])

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 40px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.5px',
          }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Skills Library</Link>
            {' / '}
            <Link href={`/?category=${skill.category}`} style={{ color: 'var(--text-muted)' }}>{meta?.label}</Link>
            {' / '}
            <span style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
          </span>
        </div>
      </div>

      {/* Hero band */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '64px 40px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Category label */}
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {meta?.label ?? skill.category}
          </div>

          {/* Skill name */}
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '56px',
            color: 'var(--text-primary)',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            maxWidth: '900px',
          }}>
            {skill.name}
          </div>

          {/* Description */}
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '640px',
            lineHeight: 1.5,
          }}>
            {skill.description}
          </div>

          {/* Tags */}
          {skill.tags && skill.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
              {skill.tags.map((t) => (
                <Link key={t} href={`/?tag=${encodeURIComponent(t)}`} style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border)',
                  padding: '5px 12px',
                  textDecoration: 'none',
                }}>
                  {t}
                </Link>
              ))}
            </div>
          )}

          {/* Actions */}
          <SkillActions
            content={skill.content}
            filename={`${skill.slug.split('/').pop() ?? skill.slug}.md`}
            skillId={skill.id}
            initialCount={skill.vote_count}
          />
        </div>
      </div>

      {/* M stripe */}
      <div style={{ height: '4px', background: M_STRIPE }} />

      {/* Body */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px', display: 'flex', gap: '64px' }}>
        {/* Skill file content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* README — rendered markdown */}
          {skill.readme && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '20px',
              }}>
                ABOUT THIS SKILL
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '720px',
              }} className="skill-readme">
                <ReactMarkdown>{skill.readme}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Example prompt + output */}
          {(skill.example_prompt || skill.example_output) && (
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '20px',
              }}>
                EXAMPLE
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {skill.example_prompt && (
                  <div>
                    <div style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>
                      PROMPT
                    </div>
                    <pre style={{
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      padding: '16px 20px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      margin: 0,
                      color: 'var(--text-bright)',
                    }}>
                      {skill.example_prompt}
                    </pre>
                  </div>
                )}
                {skill.example_output && (
                  <div>
                    <div style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>
                      OUTPUT
                    </div>
                    <pre style={{
                      fontFamily: '"Courier New", Courier, monospace',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      padding: '16px 20px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      margin: 0,
                      color: 'var(--text-secondary)',
                    }}>
                      {skill.example_output}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '20px',
          }}>
            SKILL FILE
          </div>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              borderBottom: '1px solid var(--border)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                skill.md
              </span>
            </div>
            <pre style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '13px',
              lineHeight: 1.6,
              padding: '24px',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              color: 'var(--text-bright)',
              background: 'transparent',
            }}>
              {skill.content}
            </pre>
          </div>
          <VersionHistory versions={versions} skillName={skill.name} />
        </div>

        {/* Sidebar */}
        <div style={{ width: '280px', minWidth: '280px', flexShrink: 0 }}>
          {/* Spec cells */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ height: '4px', background: M_STRIPE, marginBottom: '20px' }} />
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              SKILL DETAILS
            </div>
            <div style={{ border: '1px solid var(--border)' }}>
              {[
                { label: 'AUTHOR', value: skill.author },
                { label: 'VERSION', value: `v${skill.version}` },
                { label: 'CATEGORY', value: meta?.label ?? skill.category },
                { label: 'ADDED', value: new Date(skill.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                { label: 'VOTES', value: String(skill.vote_count) },
                { label: 'DOWNLOADS', value: String(skill.download_count ?? 0) },
              ].map(({ label, value }, i, arr) => (
                <div key={label} style={{
                  background: 'var(--bg-surface)',
                  padding: '16px',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category link */}
          <Link href={`/?category=${skill.category}`} style={{
            display: 'block',
            border: '1px solid var(--border)',
            padding: '16px',
            background: 'var(--bg-card)',
            textDecoration: 'none',
          }}>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              MORE IN CATEGORY
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--text-primary)',
            }}>
              {meta?.label} →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
