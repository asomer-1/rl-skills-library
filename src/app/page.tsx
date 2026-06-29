import Link from 'next/link'
import { Suspense } from 'react'
import SkillCard from '@/components/SkillCard'
import SectionLabelBar from '@/components/SectionEyebrow'
import SearchBar from '@/components/SearchBar'
import FeaturedSkill from '@/components/FeaturedSkill'
import { getAllSkills, searchSkills, getSkillsByTag } from '@/lib/data'
import { CATEGORY_META, CATEGORIES, type Category } from '@/lib/types'

export const revalidate = 60

const M_STRIPE = 'linear-gradient(to right, #0066b1 0%, #0066b1 33.33%, #1c69d4 33.33%, #1c69d4 66.66%, #e22718 66.66%, #e22718 100%)'

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
  const topSkills = [...skills].sort((a, b) => b.vote_count - a.vote_count).slice(0, 5)

  return (
    <div>
      {/* Hero band */}
      <div style={{
        background: '#0d0d0d',
        borderBottom: '1px solid #3c3c3c',
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
              color: '#ffffff',
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
              color: '#bbbbbb',
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
                color: '#000000',
                letterSpacing: '1.5px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                background: '#ffffff',
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
        background: '#000000',
        borderBottom: '1px solid #3c3c3c',
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
            color: !isFiltered ? '#ffffff' : '#7e7e7e',
            borderBottom: !isFiltered ? '2px solid #ffffff' : '2px solid transparent',
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
              color: category === cat ? '#ffffff' : '#7e7e7e',
              borderBottom: category === cat ? '2px solid #ffffff' : '2px solid transparent',
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
          {isFiltered ? (
            <div>
              <SectionLabelBar
                label={q ? `RESULTS FOR "${q.toUpperCase()}"` : tag ? `TAG: ${tag.toUpperCase()}` : CATEGORY_META[category as Category]?.label ?? category!}
                count={skills.length}
              />
              {skills.length === 0 ? (
                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #3c3c3c',
                  padding: '40px 24px',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 300,
                  fontSize: '14px',
                  color: '#7e7e7e',
                }}>
                  No skills found.{' '}
                  <Link href="/" style={{ color: '#ffffff' }}>Browse all</Link>
                  {' '}or{' '}
                  <Link href="/submit" style={{ color: '#ffffff' }}>submit one →</Link>
                </div>
              ) : (
                <div style={{ border: '1px solid #3c3c3c' }}>
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
                    <div style={{ border: '1px solid #3c3c3c' }}>
                      {catSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {!isFiltered && skills.length === 0 && (
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #3c3c3c',
              padding: '64px 40px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '32px',
                color: '#ffffff',
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
                color: '#bbbbbb',
                marginBottom: '32px',
              }}>
                Be the first to submit a skill to the library.
              </div>
              <Link href="/submit" style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: '#000000',
                letterSpacing: '1.5px',
                background: '#ffffff',
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
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '16px',
              }}>
                TOP SKILLS
              </div>
              <div style={{ border: '1px solid #3c3c3c' }}>
                {topSkills.map((skill, i) => (
                  <Link key={skill.id} href={`/skills/${skill.slug.replace(/\//g, '--')}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    borderBottom: i < topSkills.length - 1 ? '1px solid #3c3c3c' : 'none',
                    background: '#1a1a1a',
                    textDecoration: 'none',
                  }}>
                    <span style={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: '#7e7e7e',
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
                      color: '#e6e6e6',
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
                      color: '#7e7e7e',
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
                color: '#ffffff',
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
                    color: tag === t ? '#000000' : '#bbbbbb',
                    background: tag === t ? '#ffffff' : 'transparent',
                    border: '1px solid #3c3c3c',
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
        background: '#0d0d0d',
        borderTop: '1px solid #3c3c3c',
        borderBottom: '1px solid #3c3c3c',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            color: '#ffffff',
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
            color: '#ffffff',
            letterSpacing: '1.5px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            border: '1px solid #ffffff',
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
