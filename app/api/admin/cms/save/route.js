import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { verifyAdmin } from '../../../../../lib/adminAuth'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  // Use the shared verifyAdmin which supports the bypass token
  const admin = await verifyAdmin(request)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { updates } = await request.json()

  const { error } = await supabaseAdmin
    .from('cms_content')
    .upsert(
      updates.map((u) => ({
        page: u.page,
        section: u.section,
        content_key: u.content_key,
        content_value: u.content_value,
        content_type: u.content_type || 'text',
        updated_at: new Date().toISOString()
      })),
      { onConflict: 'page,section,content_key' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

