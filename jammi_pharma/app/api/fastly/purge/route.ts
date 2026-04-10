import { NextRequest, NextResponse } from 'next/server'
import { purgePath, purgeAll } from '../../../lib/fastly'

export async function POST(req: NextRequest) {
  try {
    const { path, all } = await req.json()
    if (all) {
      await purgeAll()
      return NextResponse.json({ ok: true, purged: 'all' })
    }
    if (path) {
      await purgePath(path)
      return NextResponse.json({ ok: true, purged: path })
    }
    return NextResponse.json({ ok: false, error: 'no path' }, { status: 400 })
  } catch {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 })
  }
}
