import Link from 'next/link'
import { Suspense } from 'react'
import SkillCard from '@/components/SkillCard'
import SectionLabelBar from '@/components/SectionEyebrow'
import SearchBar from '@/components/SearchBar'
import FeaturedSkill from '@/components/FeaturedSkill'
import SortBar from '@/components/SortBar'
import { getAllSkills, searchSkills, getSkillsByTag } from '@/lib/data'
import { CATEGORY_META, CATEGORIES, type Category, type Skill } from '@/lib/types'

export const revalidate = 60

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

interface HomeProps {
  searchParams: Promise<{ q?: string; tag?: string; category?: string; sort?: string; dir?: string }>
}

function applySortDir(arr: Skill[], sort: string, dir: string): Skill[] {
  return [...arr].sort((a, b) => {
    let av: string | number
    let bv: string | number
    if (sort === 'downloads') { av = a.download_count ?? 0; bv = b.download_count ?? 0 }
    else if (sort === 'votes') { av = a.vote_count; bv = b.vote_count }
    else if (sort === 'alpha') { av = a.name.toLowerCase(); bv = b.name.toLowerCase() }
    else { av = a.created_at; bv = b.created_at }
    if (av < bv) return dir === 'asc' ? -1 : 1
    if (av > bv) return dir === 'asc' ? 1 : -1
    return 0
  })
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { q, tag, category, sort: sortParam, dir: dirParam } = await searchParams
  const sort = sortParam ?? 'date'
  const dir = dirParam ?? (sort === 'alpha' ? 'asc' : 'desc')

  let skills = await getAllSkills().catch(() => [])

  if (q) skills = await searchSkills(q).catch(() => [])
  else if (tag) skills = await getSkillsByTag(tag).catch(() => [])
  else if (category) skills = skills.filter((s) => s.category === category)

  skills = applySortDir(skills, sort, dir)

  const grouped = CATEGORIES.reduce<Record<Category, typeof skills>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat)
    return acc
  }, {} as Record<Category, typeof skills>)

  const allTags = Array.from(new Set(skills.flatMap((s) => s.tags ?? []))).sort()
  const isFiltered = !!(q || tag || category)
  const topSkills = [...skills].sort((a, b) => b.vote_count - a.vote_count).slice(0, 5)

  return (
    <div>
      {/* Hero band */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        padding: '96px 40px',
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          gap: '80px',
          alignItems: 'stretch',
        }}>
          {/* Left: wordmark + search */}
          <div style={{ flex: '0 0 auto' }}>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '72px',
              color: 'var(--text-primary)',
              lineHeight: 1,
              letterSpacing: '-1px',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}>
              RL SKILLS<br />LIBRARY.
            </div>
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: '18px',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              maxWidth: '480px',
              lineHeight: 1.5,
            }}>
              Ready-to-use Claude Code skills built by the Rocketlane team. Browse, vote, and contribute.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Suspense fallback={null}>
                <SearchBar />
              </Suspense>
              <Link href="/submit" style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--bg-page)',
                letterSpacing: '1.5px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                background: 'var(--text-primary)',
                padding: '0 32px',
                height: '48px',
                display: 'inline-flex',
                alignItems: 'center',
              }}>
                SUBMIT SKILL →
              </Link>
            </div>
          </div>

          {/* Right: featured skill */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <FeaturedSkill skills={skills} />
          </div>
        </div>
      </div>

      {/* M stripe divider */}
      <div style={{ height: '4px', background: M_STRIPE }} />

      {/* Category tabs */}
      <div style={{
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border)',
        padding: '0 40px',
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          gap: '32px',
          overflowX: 'auto',
        }}>
          <Link href="/" style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '16px 0',
            color: !isFiltered ? 'var(--text-primary)' : 'var(--text-muted)',
            borderBottom: !isFiltered ? '2px solid var(--text-primary)' : '2px solid transparent',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}>
            ALL
          </Link>
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/?category=${cat}`} style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 0',
              color: category === cat ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: category === cat ? '2px solid var(--text-primary)' : '2px solid transparent',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}>
              {CATEGORY_META[cat].label}
            </Link>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', padding: '40px', gap: '64px' }}>
        {/* Main column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Suspense fallback={null}>
            <SortBar />
          </Suspense>

          {isFiltered ? (
            <div>
              <SectionLabelBar
                label={q ? `RESULTS FOR "${q.toUpperCase()}"` : tag ? `TAG: ${tag.toUpperCase()}` : CATEGORY_META[category as Category]?.label ?? category!}
                count={skills.length}
              />
              {skills.length === 0 ? (
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  padding: '40px 24px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                }}>
                  No skills found.{' '}
                  <Link href="/" style={{ color: 'var(--text-primary)' }}>Browse all</Link>
                  {' '}or{' '}
                  <Link href="/submit" style={{ color: 'var(--text-primary)' }}>submit one →</Link>
                </div>
              ) : (
                <div style={{ border: '1px solid var(--border)' }}>
                  {skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
                </div>
              )}
            </div>
          ) : (
            <div>
              {CATEGORIES.map((cat) => {
                const catSkills = grouped[cat]
                if (catSkills.length === 0) return null
                return (
                  <div key={cat} style={{ marginBottom: '48px' }}>
                    <SectionLabelBar label={CATEGORY_META[cat].label} count={catSkills.length} />
                    <div style={{ border: '1px solid var(--border)' }}>
                      {catSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {!isFiltered && skills.length === 0 && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              padding: '64px 40px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '32px',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '-0.5px',
                marginBottom: '16px',
              }}>
                NO SKILLS YET.
              </div>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 300,
                fontSize: '16px',
                color: 'var(--text-secondary)',
                marginBottom: '32px',
              }}>
                Be the first to submit a skill to the library.
              </div>
              <Link href="/submit" style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--bg-page)',
                letterSpacing: '1.5px',
                background: 'var(--text-primary)',
                padding: '14px 32px',
                display: 'inline-block',
                textTransform: 'uppercase',
              }}>
                SUBMIT THE FIRST SKILL →
              </Link>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: '280px', minWidth: '280px', flexShrink: 0 }}>
          {/* Top skills */}
          {topSkills.length > 0 && (
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
                TOP SKILLS
              </div>
              <div style={{ border: '1px solid var(--border)' }}>
                {topSkills.map((skill, i) => (
                  <Link key={skill.id} href={`/skills/${skill.slug.replace(/\//g, '--')}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderBottom: i < topSkills.length - 1 ? '1px solid var(--border)' : 'none',
                    background: 'var(--bg-card)',
                    textDecoration: 'none',
                  }}>
                    <span style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.5px',
                      width: '20px',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: 'var(--text-bright)',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {skill.name}
                    </span>
                    <span style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 300,
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      flexShrink: 0,
                    }}>
                      {skill.vote_count} ▲
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tag browser */}
          {allTags.length > 0 && (
            <div>
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
                BROWSE BY TAG
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allTags.slice(0, 20).map((t) => (
                  <Link key={t} href={`/?tag=${encodeURIComponent(t)}`} style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    color: tag === t ? 'var(--bg-page)' : 'var(--text-secondary)',
                    background: tag === t ? 'var(--text-primary)' : 'transparent',
                    border: '1px solid var(--border)',
                    padding: '5px 10px',
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}>
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA band */}
      <div style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '-0.5px',
            marginBottom: '24px',
          }}>
            HAVE A SKILL TO SHARE?
          </div>
          <Link href="/submit" style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--text-primary)',
            letterSpacing: '1.5px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            border: '1px solid var(--text-primary)',
            padding: '14px 40px',
            display: 'inline-block',
          }}>
            SUBMIT FOR REVIEW →
          </Link>
        </div>
      </div>
    </div>
  )
}
