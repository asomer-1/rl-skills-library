import Link from 'next/link'
import { Suspense } from 'react'
import SkillCard from '@/components/SkillCard'
import SectionEyebrow from '@/components/SectionEyebrow'
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

  if (q) {
    skills = await searchSkills(q).catch(() => [])
  } else if (tag) {
    skills = await getSkillsByTag(tag).catch(() => [])
  } else if (category) {
    skills = skills.filter((s) => s.category === category)
  }

  const grouped = CATEGORIES.reduce<Record<Category, typeof skills>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat)
    return acc
  }, {} as Record<Category, typeof skills>)

  const totalSkills = skills.length
  const allTags = Array.from(new Set(skills.flatMap((s) => s.tags ?? []))).sort()
  const isFiltered = !!(q || tag || category)

  return (
    <div style={{ display: 'flex' }}>
      {/* Left rail */}
      <div style={{ width: '220px', minWidth: '220px', borderRight: '1px solid #000', background: '#fff' }}>
        {/* Red CTA panel */}
        <div style={{ background: '#e91d2a', padding: '14px', borderBottom: '1px solid #000' }}>
          <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '13px', color: '#fff', margin: '0 0 10px', lineHeight: 1.4 }}>
            At RL Skills Library, you&apos;ll find ready-to-use Claude Code skills built by the Rocketlane team.
          </p>
          <Link
            href="/submit"
            style={{
              display: 'block', background: '#000', color: '#fff',
              fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px',
              padding: '5px 10px', textDecoration: 'none', textAlign: 'center',
              textTransform: 'uppercase', border: '1px solid #fff',
            }}
          >
            SUBMIT YOUR SKILL →
          </Link>
        </div>

        {/* Search */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #000' }}>
          <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '6px' }}>
            FIND A SKILL
          </div>
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        {/* Category nav */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #000' }}>
          <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>
            BROWSE BY CATEGORY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <Link href="/" style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '13px', color: '#0000ee', padding: '2px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>All Skills</span>
              <span style={{ color: '#666', fontSize: '11px' }}>{totalSkills}</span>
            </Link>
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat]
              const count = grouped[cat].length
              return (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  style={{
                    fontFamily: '"Times New Roman", Times, serif', fontSize: '13px', color: '#0000ee',
                    padding: '2px 0 2px 4px', display: 'flex', justifyContent: 'space-between',
                    borderLeft: category === cat ? `3px solid ${meta.tint}` : '3px solid transparent',
                  }}
                >
                  <span>{meta.label}</span>
                  <span style={{ color: '#666', fontSize: '11px' }}>{count}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div style={{ padding: '10px 12px' }}>
            <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>
              BROWSE BY TAG
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {allTags.slice(0, 20).map((t) => (
                <Link
                  key={t}
                  href={`/?tag=${encodeURIComponent(t)}`}
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '10px', fontWeight: 700,
                    color: tag === t ? '#fff' : '#000',
                    background: tag === t ? '#000' : '#eee',
                    border: '1px solid #999', padding: '1px 5px',
                    textDecoration: 'none', textTransform: 'uppercase',
                  }}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {isFiltered ? (
          <div>
            <div style={{ background: '#000', color: '#fff', padding: '8px 16px', fontFamily: '"Arial Black", Helvetica, sans-serif', fontWeight: 900, fontSize: '16px' }}>
              {q && `RESULTS FOR "${q.toUpperCase()}"`}
              {tag && `TAG: ${tag.toUpperCase()}`}
              {category && CATEGORY_META[category as Category]?.label}
            </div>
            {skills.length === 0 ? (
              <div style={{ padding: '24px 16px', fontFamily: '"Times New Roman", Times, serif', fontSize: '14px' }}>
                No skills found.{' '}
                <Link href="/" style={{ color: '#0000ee' }}>Browse all skills</Link>
                {' '}or{' '}
                <Link href="/submit" style={{ color: '#0000ee' }}>submit one</Link>.
              </div>
            ) : (
              skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
            )}
          </div>
        ) : (
          CATEGORIES.map((cat) => {
            const catSkills = grouped[cat]
            if (catSkills.length === 0) return null
            const meta = CATEGORY_META[cat]
            return (
              <div key={cat}>
                <SectionEyebrow label={meta.label} bg={meta.eyebrowBg} skillCount={catSkills.length} />
                {catSkills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
              </div>
            )
          })
        )}

        {!isFiltered && skills.length === 0 && (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Arial Black", Helvetica, sans-serif', fontWeight: 900, fontSize: '20px', marginBottom: '12px' }}>
              NO SKILLS YET.
            </div>
            <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '14px', marginBottom: '16px' }}>
              Be the first to submit a skill to the library.
            </p>
            <Link
              href="/submit"
              style={{
                display: 'inline-block', background: '#000', color: '#fff',
                fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '12px',
                padding: '8px 20px', textDecoration: 'none', textTransform: 'uppercase',
              }}
            >
              SUBMIT THE FIRST SKILL →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
