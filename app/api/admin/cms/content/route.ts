import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page');
    
    let query = supabaseAdmin.from('cms_content').select('*');
    if (page) query = query.eq('page', page);
    
    // Workaround for multiple orders syntax
    const { data, error } = await query.order('section').order('content_key' as any);
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { updates } = await req.json();
    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({ error: 'updates array required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('cms_content')
      .upsert(
        updates.map((u: any) => ({
          page: u.page,
          section: u.section,
          content_key: u.content_key,
          content_value: u.content_value,
          content_type: u.content_type || 'text',
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'page,section,content_key' }
      );

    if (error) return serverError(error);
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
