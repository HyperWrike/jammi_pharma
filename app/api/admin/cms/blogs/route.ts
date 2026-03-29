import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { data, error } = await supabaseAdmin
      .from('cms_blogs')
      .select('*')
      .order('created_at', { ascending: false });
      
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
      .from('cms_blogs')
      .insert(body)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
