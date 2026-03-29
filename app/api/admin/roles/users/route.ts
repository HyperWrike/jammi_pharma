import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
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
    
    // 1. Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true
    });
    
    if (authError) return serverError(authError);
    if (!authUser?.user) return serverError(new Error('Auth user creation failed'));

    // 2. Create admin record linking to auth user
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert({
        auth_user_id: authUser.user.id,
        name: body.name,
        email: body.email,
        role: body.role
      })
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
