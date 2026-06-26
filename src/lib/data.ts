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

export async function createSubmission(
  submission: Omit<Submission, 'id' | 'pr_number' | 'pr_url' | 'status' | 'created_at' | 'updated_at'>
): Promise<Submission> {
  const { data, error } = await supabaseAdmin
    .from('submissions')
    .insert(submission)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getAllSubmissions(): Promise<Submission[]> {
  const { data, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}
