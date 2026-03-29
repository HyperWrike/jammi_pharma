import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();

    const { data: userRecord } = await supabaseAdmin
      .from('admin_users')
      .select('auth_user_id')
      .eq('id', id)
      .single();

    if (body.password && userRecord?.auth_user_id) {
       await supabaseAdmin.auth.admin.updateUserById(
         userRecord.auth_user_id,
         { password: body.password }
       );
    }
    
    // remove password from body before db update
    delete body.password;

    const { data, error } = await supabaseAdmin
      .from('admin_users')
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
    
    // Prevent self-deletion
    if (admin.adminRecord.id === id) {
      return NextResponse.json({ error: 'Cannot delete your own admin account' }, { status: 400 });
    }

    // You could also delete the auth user here using supabaseAdmin.auth.admin.deleteUser
    // First, find the auth_user_id
    const { data: userRecord } = await supabaseAdmin
      .from('admin_users')
      .select('auth_user_id')
      .eq('id', id)
      .single();

    if (userRecord?.auth_user_id) {
      await supabaseAdmin.auth.admin.deleteUser(userRecord.auth_user_id);
    }

    const { error } = await supabaseAdmin.from('admin_users').delete().eq('id', id);
    if (error) return serverError(error);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
