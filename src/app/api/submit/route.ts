import { NextResponse } from 'next/server'
import { createSubmission } from '@/lib/data'
import type { Category } from '@/lib/types'
import { CATEGORIES } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { skill_name, description, category, content, tags, submitter_github } = body

    if (!skill_name || !description || !category || !content || !submitter_github) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!CATEGORIES.includes(category as Category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const submission = await createSubmission({
      skill_name,
      description,
      category: category as Category,
      content,
      tags: Array.isArray(tags) ? tags : [],
      submitter_github,
    })

    return NextResponse.json({ ok: true, id: submission.id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
