import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSkillBySlug, getAllSkills } from '@/lib/data'
import { CATEGORY_META } from '@/lib/types'
import SkillActions from '@/components/SkillActions'

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

  const meta = CATEGORY_META[skill.category]

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{
        background: '#000000',
        borderBottom: '1px solid #3c3c3c',
        padding: '12px 40px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <span style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: '#7e7e7e',
            letterSpacing: '0.5px',
          }}>
            <Link href="/" style={{ color: '#7e7e7e' }}>Skills Library</Link>
            {' / '}
            <Link href={`/?category=${skill.category}`} style={{ color: '#7e7e7e' }}>{meta?.label}</Link>
            {' / '}
            <span style={{ color: '#bbbbbb' }}>{skill.name}</span>
          </span>
        </div>
      </div>

      {/* Hero band */}
      <div style={{
        background: '#0d0d0d',
        borderBottom: '1px solid #3c3c3c',
        padding: '64px 40px',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Category label */}
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            color: '#7e7e7e',
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
            color: '#ffffff',
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
            color: '#bbbbbb',
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
                  color: '#bbbbbb',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: '1px solid #3c3c3c',
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
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '20px',
          }}>
            SKILL FILE
          </div>
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #3c3c3c',
          }}>
            <div style={{
              borderBottom: '1px solid #3c3c3c',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                color: '#7e7e7e',
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
              color: '#e6e6e6',
              background: 'transparent',
            }}>
              {skill.content}
            </pre>
          </div>
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
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
            }}>
              SKILL DETAILS
            </div>
            <div style={{ border: '1px solid #3c3c3c' }}>
              {[
                { label: 'AUTHOR', value: skill.author },
                { label: 'VERSION', value: `v${skill.version}` },
                { label: 'CATEGORY', value: meta?.label ?? skill.category },
                { label: 'ADDED', value: new Date(skill.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                { label: 'VOTES', value: String(skill.vote_count) },
                { label: 'DOWNLOADS', value: String(skill.download_count ?? 0) },
              ].map(({ label, value }, i, arr) => (
                <div key={label} style={{
                  background: '#0d0d0d',
                  padding: '16px',
                  borderBottom: i < arr.length - 1 ? '1px solid #3c3c3c' : 'none',
                }}>
                  <div style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: '#7e7e7e',
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
                    color: '#ffffff',
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
            border: '1px solid #3c3c3c',
            padding: '16px',
            background: '#1a1a1a',
            textDecoration: 'none',
          }}>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              color: '#7e7e7e',
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
              color: '#ffffff',
            }}>
              {meta?.label} →
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
