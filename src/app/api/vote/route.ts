import { NextResponse } from 'next/server'
import { voteForSkill, removeVote } from '@/lib/data'

export async function POST(request: Request) {
  try {
    const { skillId, userGithub, remove } = await request.json()
    if (!skillId || !userGithub) {
      return NextResponse.json({ error: 'skillId and userGithub required' }, { status: 400 })
    }
    if (remove) {
      await removeVote(skillId, userGithub)
    } else {
      await voteForSkill(skillId, userGithub)
    }
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
