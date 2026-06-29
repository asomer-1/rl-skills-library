import { supabase, supabaseAdmin } from './supabase'
import type { Skill, Submission, Category } from './types'

export async function getAllSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills_with_tags')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getSkillsByCategory(category: Category): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills_with_tags')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const { data, error } = await supabase
    .from('skills_with_tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function searchSkills(query: string): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills_with_tags')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('vote_count', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getSkillsByTag(tag: string): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills_with_tags')
    .select('*')
    .contains('tags', [tag])
    .order('vote_count', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function voteForSkill(skillId: string, userGithub: string): Promise<void> {
  const { error } = await supabase
    .from('votes')
    .upsert({ skill_id: skillId, user_github: userGithub }, { onConflict: 'skill_id,user_github' })

  if (error) throw error
}

export async function removeVote(skillId: string, userGithub: string): Promise<void> {
  const { error } = await supabase
    .from('votes')
    .delete()
    .eq('skill_id', skillId)
    .eq('user_github', userGithub)

  if (error) throw error
}

export async function hasVoted(skillId: string, userGithub: string): Promise<boolean> {
  const { data } = await supabase
    .from('votes')
    .select('id')
    .eq('skill_id', skillId)
    .eq('user_github', userGithub)
    .single()

  return !!data
}

export async function publishSkill(input: {
  skill_name: string
  description: string
  category: Category
  content: string
  tags: string[]
  submitter_github: string
}): Promise<Skill> {
  const baseSlug = `${input.category}/${input.skill_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

  // Resolve slug conflicts by appending a counter
  let slug = baseSlug
  let attempt = 0
  while (attempt < 10) {
    const { data: existing } = await supabaseAdmin.from('skills').select('id').eq('slug', slug).single()
    if (!existing) break
    attempt++
    slug = `${baseSlug}-${attempt}`
  }

  const { data: skill, error: skillError } = await supabaseAdmin
    .from('skills')
    .insert({
      slug,
      name: input.skill_name,
      description: input.description,
      category: input.category,
      content: input.content,
      author: input.submitter_github,
      version: '1.0',
      github_path: '',
    })
    .select()
    .single()

  if (skillError) throw skillError

  // Upsert tags and link them
  for (const tagName of input.tags) {
    const { data: tag, error: tagError } = await supabaseAdmin
      .from('tags')
      .upsert({ name: tagName }, { onConflict: 'name' })
      .select()
      .single()

    if (tagError) continue

    await supabaseAdmin
      .from('skill_tags')
      .upsert({ skill_id: skill.id, tag_id: tag.id }, { onConflict: 'skill_id,tag_id' })
  }

  return { ...skill, tags: input.tags, vote_count: 0, is_new: true }
}
