import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { data, error } = await supabaseAdmin
      .from('role_permissions')
      .select('*')
      .order('role', { ascending: true });
      
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
    const body = await req.json(); // Expected to be an object { permissions: [...] }
    
    // Can do a bulk upsert depending on the shape of `body`
    const { error } = await supabaseAdmin
      .from('role_permissions')
      .upsert(body.permissions || body);
      
    if (error) return serverError(error);
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
