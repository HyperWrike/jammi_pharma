import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    let bucket = formData.get('bucket') as string | null || 'cms-images';
    let folder = formData.get('folder') as string | null || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const ext = file.name ? file.name.split('.').pop()?.toLowerCase() || 'jpg' : 'jpg';
    const safeName = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(safeName, buffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path);
    return NextResponse.json({ url: publicUrl, path: data.path }, { status: 200 });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
