import { NextRequest, NextResponse } from 'next/server'
import { incrementDownloadCount } from '@/lib/data'

export async function POST(req: NextRequest) {
  const { skillId } = await req.json()
  if (!skillId) return NextResponse.json({ error: 'skillId required' }, { status: 400 })
  try {
    await incrementDownloadCount(skillId)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 })
  }
}
