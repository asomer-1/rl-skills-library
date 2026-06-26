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
  const tint = meta?.tint ?? '#b3bd95'

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ padding: '6px 16px', borderBottom: '1px solid #000', background: '#f5f5f5', fontFamily: '"Times New Roman", Times, serif', fontSize: '12px' }}>
        <Link href="/" style={{ color: '#0000ee' }}>Skills Library</Link>
        {' › '}
        <Link href={`/?category=${skill.category}`} style={{ color: '#0000ee' }}>{meta?.label}</Link>
        {' › '}
        <span>{skill.name}</span>
      </div>

      {/* Section eyebrow */}
      <div style={{ background: tint, borderBottom: '1px solid #000', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Arial Black", Helvetica, sans-serif', fontWeight: 900, fontSize: '22px', textTransform: 'uppercase' }}>
          {skill.name}
        </span>
        <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px', opacity: 0.7 }}>
          v{skill.version}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0' }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Description + meta bar */}
          <div style={{ background: tint, padding: '12px 16px', borderBottom: '1px solid #000', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '14px', margin: '0 0 8px', lineHeight: 1.4 }}>
                {skill.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skill.tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${encodeURIComponent(tag)}`}
                    style={{
                      fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '10px', fontWeight: 700,
                      color: '#000', background: 'rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.3)',
                      padding: '1px 5px', textDecoration: 'none', textTransform: 'uppercase',
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Skill file content */}
          <div style={{ padding: '16px', borderBottom: '1px solid #000' }}>
            <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
              SKILL FILE CONTENT
            </div>
            <pre
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '12px',
                lineHeight: 1.5,
                background: '#f8f8f8',
                border: '1px solid #ccc',
                padding: '12px',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
              }}
            >
              {skill.content}
            </pre>
          </div>

          {/* Actions */}
          <div style={{ padding: '12px 16px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', borderBottom: '1px solid #000' }}>
            <VoteButton skillId={skill.id} initialCount={skill.vote_count} initialVoted={false} />
            <Link
              href={`https://github.com/asomer-1/rl-skills-library/blob/main/${skill.github_path}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px',
                padding: '6px 16px', background: '#fff', color: '#000',
                border: '1px solid #000', textDecoration: 'none', textTransform: 'uppercase',
              }}
            >
              VIEW ON GITHUB
            </Link>
            <Link
              href={`https://github.com/asomer-1/rl-skills-library/fork`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px',
                padding: '6px 16px', background: '#fff', color: '#000',
                border: '1px solid #000', textDecoration: 'none', textTransform: 'uppercase',
              }}
            >
              FORK / REMIX
            </Link>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: '180px', minWidth: '180px', borderLeft: '1px solid #000', background: '#fff' }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #000' }}>
            <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>
              DETAILS
            </div>
            <table style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '12px', width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Author', skill.author],
                  ['Version', `v${skill.version}`],
                  ['Category', meta?.label ?? skill.category],
                  ['Added', new Date(skill.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })],
                  ['Updated', new Date(skill.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ color: '#666', paddingBottom: '4px', paddingRight: '8px', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{k}</td>
                    <td style={{ paddingBottom: '4px', wordBreak: 'break-word' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Award seal analog */}
          <div style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#e91d2a', border: '3px solid #000',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', lineHeight: 1 }}>
                {skill.vote_count}
              </div>
              <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '8px', color: '#fff', textTransform: 'uppercase', lineHeight: 1.2 }}>
                TEAM VOTES
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
