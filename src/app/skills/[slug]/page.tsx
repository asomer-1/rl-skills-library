import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSkillBySlug, getAllSkills } from '@/lib/data'
import { CATEGORY_META } from '@/lib/types'
import VoteButton from '@/components/VoteButton'

export const revalidate = 60

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
        background: '#9fbee7', padding: '4px 12px', borderBottom: '1px solid #3d4f97',
        fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#21242e',
      }}>
        <Link href="/" style={{ color: '#3d4f97', fontWeight: 700 }}>Skills Library</Link>
        {' › '}
        <Link href={`/?category=${skill.category}`} style={{ color: '#3d4f97', fontWeight: 700 }}>{meta?.label}</Link>
        {' › '}
        <span>{skill.name}</span>
      </div>

      {/* Hero panel */}
      <div style={{
        background: 'linear-gradient(135deg, #acace7 0%, #8ba1d4 100%)',
        borderBottom: '2px solid #3d4f97',
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(0deg, #3d4f97 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #3d4f97 0px, transparent 1px, transparent 20px)',
          backgroundSize: '20px 20px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{
              fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '28px',
              color: '#fff', textShadow: '2px 2px 0 #3d4f97', WebkitTextStroke: '0.5px #3d4f97', lineHeight: 1, marginBottom: '6px',
            }}>
              {skill.name}
            </div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '13px', color: '#21242e', marginBottom: '8px' }}>
              {skill.description}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skill.tags?.map((t) => (
                <Link key={t} href={`/?tag=${encodeURIComponent(t)}`} style={{
                  background: '#ecab37', color: '#21242e', fontFamily: 'Arial, sans-serif',
                  fontWeight: 700, fontSize: '10px', padding: '2px 7px', borderRadius: '2px',
                  textDecoration: 'none', letterSpacing: '0.3px',
                }}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
          {/* Vote circle */}
          <div style={{
            width: '72px', height: '72px', borderRadius: '9999px',
            background: '#f68d1f', border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '22px', color: '#fff', lineHeight: 1 }}>{skill.vote_count}</div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '9px', color: '#fff', letterSpacing: '0.5px' }}>VOTES</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, padding: '12px' }}>
          {/* Skill content */}
          <div style={{
            background: '#fff',
            borderRadius: '4px',
            borderTop: '1px solid rgba(255,255,255,0.9)',
            borderBottom: '1px solid #5a5f8c',
            marginBottom: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#7a8aba', borderBottom: '1px solid #3d4f97',
              padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>≡</span>
              <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '11px', color: '#21242e', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                SKILL FILE CONTENT
              </span>
            </div>
            <pre style={{
              fontFamily: '"Courier New", Courier, monospace', fontSize: '12px', lineHeight: 1.5,
              padding: '12px', overflowX: 'auto', whiteSpace: 'pre-wrap',
              wordBreak: 'break-word', margin: 0, color: '#21242e', background: '#f8f9fc',
            }}>
              {skill.content}
            </pre>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <VoteButton skillId={skill.id} initialCount={skill.vote_count} initialVoted={false} />
            {[
              { label: '⌥  VIEW ON GITHUB', href: `https://github.com/asomer-1/rl-skills-library/blob/main/${skill.github_path}` },
              { label: '⊞  FORK / REMIX', href: 'https://github.com/asomer-1/rl-skills-library/fork' },
            ].map((btn) => (
              <Link key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer" style={{
                background: '#21242e',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '4px 4px',
                color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '11px',
                padding: '5px 12px', textDecoration: 'none', letterSpacing: '0.5px',
                borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(0,0,0,0.3)',
              }}>
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{
          width: '180px', minWidth: '180px', borderLeft: '2px solid #3d4f97',
          background: '#7a8aba', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '10px',
        }}>
          {/* Details info box */}
          <div style={{
            background: '#fff', borderRadius: '4px',
            borderTop: '1px solid rgba(255,255,255,0.8)', borderBottom: '1px solid #5a5f8c', overflow: 'hidden',
          }}>
            <div style={{
              background: '#ecab37', padding: '3px 8px',
              fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '10px', color: '#21242e', letterSpacing: '0.5px',
            }}>
              SKILL DETAILS
            </div>
            <div style={{ padding: '8px' }}>
              {[
                ['Author', skill.author],
                ['Version', `v${skill.version}`],
                ['Category', meta?.label ?? skill.category],
                ['Added', new Date(skill.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', borderBottom: '1px dotted #60619c', paddingBottom: '4px' }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 700, color: '#3d4f97' }}>{k}</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#21242e' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related category link */}
          <Link href={`/?category=${skill.category}`} style={{
            background: '#8ba1d4', borderRadius: '4px', padding: '8px',
            borderTop: '1px solid rgba(255,255,255,0.4)', borderBottom: '1px solid #3d4f97',
            textDecoration: 'none', display: 'block',
          }}>
            <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '10px', color: '#21242e', letterSpacing: '0.5px', marginBottom: '4px', textTransform: 'uppercase' }}>
              MORE IN CATEGORY
            </div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#3d4f97', fontWeight: 700 }}>
              {meta?.label} ›
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
