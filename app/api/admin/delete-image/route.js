import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  const { data: { user } } = await supabaseAdmin.auth.getUser(token)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { url, bucket } = await request.json()
  if (!url || !bucket) return NextResponse.json({ error: 'url and bucket required' }, { status: 400 })

  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })

  const path = url.slice(idx + marker.length)
  const { error } = await supabaseAdmin.storage.from(bucket).remove([path])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
