import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { url, bucket } = await req.json();
    if (!url || !bucket) return NextResponse.json({ error: 'url and bucket required' }, { status: 400 });

    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return NextResponse.json({ error: 'Cannot parse path from URL' }, { status: 400 });

    const path = decodeURIComponent(url.slice(idx + marker.length));
    const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Delete Image Error:', error);
    return NextResponse.json({ error: error.message || 'Deletion failed' }, { status: 500 });
  }
}
