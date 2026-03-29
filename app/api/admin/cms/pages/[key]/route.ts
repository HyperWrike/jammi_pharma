import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { key } = await params;
    const { data, error } = await supabaseAdmin
      .from('cms_static_pages')
      .select('*')
      .eq('page_key', key)
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { key } = await params;
    const { content } = await req.json();
    const { data, error } = await supabaseAdmin
      .from('cms_static_pages')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('page_key', key)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}
