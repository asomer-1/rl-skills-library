import { NextResponse } from 'next/server'
import { updateSkill } from '@/lib/data'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { skillId, content, author, description, tags, name, readme, example_prompt, example_output } = body

    if (!skillId || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const skill = await updateSkill({ skillId, content, author, description, tags, name, readme, example_prompt, example_output })
    return NextResponse.json({ ok: true, slug: skill.slug, version: skill.version })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
