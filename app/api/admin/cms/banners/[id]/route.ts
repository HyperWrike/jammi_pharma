import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('cms_banners')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const { data: banner } = await supabaseAdmin
      .from('cms_banners')
      .select('image_url')
      .eq('id', id)
      .single();
      
    if (banner && banner.image_url) {
      const path = banner.image_url.split('/banner-images/')[1];
      if (path) {
        await supabaseAdmin.storage.from('banner-images').remove([path]);
      }
    }
    
    const { error } = await supabaseAdmin.from('cms_banners').delete().eq('id', id);
    if (error) return serverError(error);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
