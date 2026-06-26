import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import yaml from 'js-yaml'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SKILLS_DIR = join(process.cwd(), 'skills')

function walk(dir) {
  const entries = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      entries.push(...walk(full))
    } else {
      entries.push(full)
    }
  }
  return entries
}

async function upsertTag(name) {
  const { data } = await supabase
    .from('tags')
    .upsert({ name }, { onConflict: 'name' })
    .select('id')
    .single()
  if (data) return data.id
  const { data: existing } = await supabase.from('tags').select('id').eq('name', name).single()
  return existing?.id
}

async function syncSkill(metaPath, contentPath, githubPath) {
  const meta = yaml.load(readFileSync(metaPath, 'utf8'))
  const content = readFileSync(contentPath, 'utf8')

  const slug = meta.slug ?? relative(SKILLS_DIR, metaPath).replace(/\/meta\.yaml$/, '').replace(/\\/g, '/')

  const skillPayload = {
    slug,
    name: meta.name,
    description: meta.description ?? '',
    category: meta.category,
    author: meta.author,
    version: meta.version ?? '1.0.0',
    content,
    github_path: githubPath,
    is_new: meta.is_new ?? true,
  }

  const { data: skill, error } = await supabase
    .from('skills')
    .upsert(skillPayload, { onConflict: 'slug' })
    .select('id')
    .single()

  if (error) {
    console.error(`Failed to upsert skill ${slug}:`, error.message)
    return
  }

  // Sync tags
  const tagNames = (meta.tags ?? []).map((t) => t.trim().toLowerCase()).filter(Boolean)
  const tagIds = await Promise.all(tagNames.map(upsertTag))

  await supabase.from('skill_tags').delete().eq('skill_id', skill.id)
  if (tagIds.length > 0) {
    await supabase.from('skill_tags').insert(tagIds.map((tag_id) => ({ skill_id: skill.id, tag_id })))
  }

  console.log(`✓ Synced: ${slug}`)
}

async function main() {
  const files = walk(SKILLS_DIR)
  const metaFiles = files.filter((f) => f.endsWith('meta.yaml'))

  for (const metaPath of metaFiles) {
    const dir = metaPath.replace(/\/meta\.yaml$/, '')
    const contentPath = join(dir, 'skill.md')
    try {
      statSync(contentPath)
    } catch {
      console.warn(`Skipping ${metaPath} — no skill.md found`)
      continue
    }
    const githubPath = relative(process.cwd(), contentPath)
    await syncSkill(metaPath, contentPath, githubPath)
  }

  console.log(`\nSync complete. ${metaFiles.length} skills processed.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
