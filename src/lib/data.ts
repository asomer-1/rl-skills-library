import { supabase, supabaseAdmin } from './supabase'
import type { Skill, SkillVersion, Category } from './types'

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

export async function getSkillVersions(skillId: string): Promise<SkillVersion[]> {
  const { data, error } = await supabase
    .from('skill_versions')
    .select('*')
    .eq('skill_id', skillId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data ?? []
}

function bumpMinorVersion(version: string): string {
  const clean = version.replace(/^v/, '')
  const [major, minor] = clean.split('.').map(Number)
  return `${major ?? 1}.${(minor ?? 0) + 1}`
}

export async function updateSkill(input: {
  skillId: string
  content: string
  author: string
  description?: string
  tags?: string[]
}): Promise<Skill> {
  // Fetch current skill to snapshot
  const { data: current, error: fetchError } = await supabaseAdmin
    .from('skills')
    .select('version, content, author')
    .eq('id', input.skillId)
    .single()

  if (fetchError || !current) throw new Error('Skill not found')

  // Snapshot current version
  const { error: snapError } = await supabaseAdmin
    .from('skill_versions')
    .insert({
      skill_id: input.skillId,
      version: current.version,
      content: current.content,
      author: current.author,
    })

  if (snapError) throw snapError

  // Build update payload
  const nextVersion = bumpMinorVersion(current.version)
  const updatePayload: Record<string, unknown> = {
    content: input.content,
    version: nextVersion,
    author: input.author,
    updated_at: new Date().toISOString(),
  }
  if (input.description) updatePayload.description = input.description

  const { data: updated, error: updateError } = await supabaseAdmin
    .from('skills')
    .update(updatePayload)
    .eq('id', input.skillId)
    .select()
    .single()

  if (updateError) throw updateError

  // Update tags if provided
  if (input.tags) {
    await supabaseAdmin.from('skill_tags').delete().eq('skill_id', input.skillId)
    for (const tagName of input.tags) {
      const { data: tag, error: tagError } = await supabaseAdmin
        .from('tags')
        .upsert({ name: tagName }, { onConflict: 'name' })
        .select()
        .single()
      if (tagError) continue
      await supabaseAdmin
        .from('skill_tags')
        .upsert({ skill_id: input.skillId, tag_id: tag.id }, { onConflict: 'skill_id,tag_id' })
    }
  }

  return { ...updated, tags: input.tags ?? [], vote_count: 0, download_count: updated.download_count ?? 0, is_new: false }
}

export async function incrementDownloadCount(skillId: string): Promise<void> {
  const { data: current } = await supabaseAdmin.from('skills').select('download_count').eq('id', skillId).single()
  const next = (current?.download_count ?? 0) + 1
  const { error } = await supabaseAdmin.from('skills').update({ download_count: next }).eq('id', skillId)
  if (error) throw error
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
}): Promise<{ skill: Skill; conflict?: { skillId: string; slug: string; version: string } }> {
  const baseSlug = `${input.category}/${input.skill_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`

  // Check for exact slug conflict first
  const { data: existing } = await supabaseAdmin
    .from('skills')
    .select('id, slug, version')
    .eq('slug', baseSlug)
    .single()

  if (existing) {
    return { skill: {} as Skill, conflict: { skillId: existing.id, slug: existing.slug, version: existing.version } }
  }

  const { data: skill, error: skillError } = await supabaseAdmin
    .from('skills')
    .insert({
      slug: baseSlug,
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

  return { skill: { ...skill, tags: input.tags, vote_count: 0, download_count: 0, is_new: true } }
}
