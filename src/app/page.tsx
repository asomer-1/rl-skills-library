import Link from 'next/link'
import { Suspense } from 'react'
import SkillCard from '@/components/SkillCard'
import SectionLabelBar from '@/components/SectionEyebrow'
import SearchBar from '@/components/SearchBar'
import { getAllSkills, searchSkills, getSkillsByTag } from '@/lib/data'
import { CATEGORY_META, CATEGORIES, type Category } from '@/lib/types'

export const revalidate = 60

interface HomeProps {
  searchParams: Promise<{ q?: string; tag?: string; category?: string }>
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { q, tag, category } = await searchParams

  let skills = await getAllSkills().catch(() => [])

  if (q) skills = await searchSkills(q).catch(() => [])
  else if (tag) skills = await getSkillsByTag(tag).catch(() => [])
  else if (category) skills = skills.filter((s) => s.category === category)

  const grouped = CATEGORIES.reduce<Record<Category, typeof skills>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat)
    return acc
  }, {} as Record<Category, typeof skills>)

  const allTags = Array.from(new Set(skills.flatMap((s) => s.tags ?? []))).sort()
  const isFiltered = !!(q || tag || category)

  return (
    <div>
      {/* Hero panel */}
      <div style={{
        background: 'linear-gradient(135deg, #acace7 0%, #8ba1d4 100%)',
        borderBottom: '2px solid #3d4f97',
        padding: '20px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Circuit-board texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(0deg, #3d4f97 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #3d4f97 0px, transparent 1px, transparent 20px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontWeight: 900,
            fontSize: '36px',
            color: '#fff',
            textShadow: '2px 2px 0 #3d4f97, -1px -1px 0 #3d4f97',
            WebkitTextStroke: '1px #3d4f97',
            lineHeight: 1,
            marginBottom: '8px',
          }}>
            RL SKILLS LIBRARY
          </div>
          <div style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#21242e',
            marginBottom: '14px',
          }}>
            Ready-to-use Claude Code skills built by the Rocketlane team.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
            <Link href="/submit" style={{
              background: '#f68d1f',
              color: '#fff',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              padding: '5px 14px',
              borderRadius: '2px',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              borderTop: '1px solid rgba(255,255,255,0.4)',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}>
              SUBMIT A SKILL ›
            </Link>
          </div>
        </div>
      </div>

      {/* Body — two-column */}
      <div style={{ display: 'flex' }}>
        {/* Main content column */}
        <div style={{ flex: 1, minWidth: 0, padding: '10px 10px 10px 12px', background: '#7a8aba' }}>
          {isFiltered ? (
            <div>
              <SectionLabelBar
                label={q ? `RESULTS FOR "${q.toUpperCase()}"` : tag ? `TAG: ${tag.toUpperCase()}` : CATEGORY_META[category as Category]?.label ?? category!}
                count={skills.length}
              />
              <div style={{ marginTop: '4px' }}>
                {skills.length === 0 ? (
                  <div style={{
                    background: '#dedede', borderRadius: '4px', padding: '16px',
                    fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#21242e',
                    borderTop: '1px solid rgba(255,255,255,0.8)', borderBottom: '1px solid #5a5f8c',
                  }}>
                    No skills found. <Link href="/" style={{ color: '#3d4f97', fontWeight: 700 }}>Browse all</Link> or <Link href="/submit" style={{ color: '#f68d1f', fontWeight: 700 }}>submit one ›</Link>
                  </div>
                ) : (
                  skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
                )}
              </div>
            </div>
          ) : (
            CATEGORIES.map((cat) => {
              const catSkills = grouped[cat]
              if (catSkills.length === 0) return null
              return (
                <div key={cat} style={{ marginBottom: '12px' }}>
                  <SectionLabelBar label={CATEGORY_META[cat].label} count={catSkills.length} />
                  <div style={{ marginTop: '4px' }}>
                    {catSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
                  </div>
                </div>
              )
            })
          )}

          {!isFiltered && skills.length === 0 && (
            <div style={{
              background: '#acace7', borderRadius: '6px', padding: '32px 24px', textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.5)', borderBottom: '1px solid #3d4f97',
            }}>
              <div style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontWeight: 900, fontSize: '18px', color: '#21242e', marginBottom: '8px' }}>
                NO SKILLS YET
              </div>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#21242e', marginBottom: '14px' }}>
                Be the first to submit a skill to the library.
              </p>
              <Link href="/submit" style={{
                background: '#f68d1f', color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700,
                fontSize: '11px', padding: '7px 18px', borderRadius: '2px', textDecoration: 'none', letterSpacing: '0.5px',
              }}>
                SUBMIT THE FIRST SKILL ›
              </Link>
            </div>
          )}
        </div>

        {/* Right action rail */}
        <div style={{
          width: '190px',
          minWidth: '190px',
          borderLeft: '2px solid #3d4f97',
          background: '#7a8aba',
          padding: '10px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {/* Player's Poll analog — top skills */}
          <div style={{
            background: '#8ba1d4',
            borderRadius: '6px',
            borderTop: '1px solid rgba(255,255,255,0.4)',
            borderBottom: '1px solid #3d4f97',
            overflow: 'hidden',
          }}>
            <div style={{
              background: '#7a8aba',
              borderBottom: '1px solid #3d4f97',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>≡</span>
              <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '11px', color: '#21242e', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                TOP SKILLS
              </span>
            </div>
            <div style={{ padding: '8px' }}>
              {skills.slice(0, 5).map((skill, i) => (
                <Link key={skill.id} href={`/skills/${skill.slug.replace(/\//g, '--')}`} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '4px 0', borderBottom: i < 4 ? '1px dotted #60619c' : 'none',
                  textDecoration: 'none',
                }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '10px', color: '#e48600', width: '14px', flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#3d4f97', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{skill.name}</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#21242e', opacity: 0.6, flexShrink: 0 }}>{skill.vote_count}▲</span>
                </Link>
              ))}
              {skills.length === 0 && (
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#21242e', margin: 0 }}>No skills yet.</p>
              )}
            </div>
          </div>

          {/* Action buttons — carbon slab style */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: '▶  SUBMIT SKILL', href: '/submit', primary: true },
              { label: '⊞  BROWSE ALL', href: '/' },
              { label: '⌥  GITHUB REPO', href: 'https://github.com/asomer-1/rl-skills-library' },
              { label: '✉  CONTACT', href: 'mailto:asomer@rocketlane.com' },
            ].map((btn) => (
              <Link key={btn.label} href={btn.href} style={{
                background: btn.primary ? '#f68d1f' : '#21242e',
                backgroundImage: btn.primary ? 'none' : 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '4px 4px',
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 700,
                fontSize: '11px',
                padding: '7px 10px',
                borderRadius: btn.primary ? '2px' : '0',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                display: 'block',
                borderTop: btn.primary ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
              }}>
                {btn.label}
              </Link>
            ))}
          </div>

          {/* Info box — tag browser */}
          {allTags.length > 0 && (
            <div style={{
              background: '#fff',
              borderRadius: '4px',
              borderTop: '1px solid rgba(255,255,255,0.8)',
              borderBottom: '1px solid #5a5f8c',
              overflow: 'hidden',
            }}>
              <div style={{
                background: '#ecab37',
                padding: '3px 8px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 700,
                fontSize: '10px',
                color: '#21242e',
                letterSpacing: '0.5px',
              }}>
                BROWSE BY TAG
              </div>
              <div style={{ padding: '8px', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {allTags.slice(0, 16).map((t) => (
                  <Link key={t} href={`/?tag=${encodeURIComponent(t)}`} style={{
                    fontFamily: 'Arial, sans-serif', fontSize: '10px', fontWeight: 700,
                    color: tag === t ? '#fff' : '#3d4f97',
                    background: tag === t ? '#3d4f97' : '#e8ecf8',
                    border: '1px solid #5a5f8c',
                    padding: '1px 5px', borderRadius: '2px', textDecoration: 'none',
                  }}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
