import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { data, error } = await supabaseAdmin
      .from('cms_banners')
      .select('*')
      .order('display_order', { ascending: true });
      
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
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('cms_banners')
      .insert(body)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
