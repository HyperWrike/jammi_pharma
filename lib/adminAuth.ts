import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { supabaseAdmin as sharedAdmin } from './supabase'

// Re-export the centralized admin client
export const supabaseAdmin: SupabaseClient = sharedAdmin;

export async function verifyAdmin(req: any, res?: any) {
  try {
    // 1. Get token from headers
    let token = '';
    if (req.headers instanceof Headers) {
      token = req.headers.get('authorization')?.replace('Bearer ', '') || '';
    } else {
      token = (req.headers['authorization'] as string)?.replace('Bearer ', '') || '';
    }

    if (!token) {
      if (res) return unauthorized(res);
      return null;
    }

    // 2. Verify with Supabase
    const { data: { user }, error } = await sharedAdmin.auth.getUser(token);
    if (error || !user) {
      if (res) return unauthorized(res);
      return null;
    }

    // 3. Verify Admin Role in DB
    const { data: adminRecord, error: dbError } = await sharedAdmin
      .from('admin_users')
      .select('*')
      .eq('auth_user_id', user.id)
      .eq('status', 'active')
      .single();

    if (dbError || !adminRecord) {
      console.warn('[verifyAdmin] User is not an active admin:', user.email);
      if (res) return unauthorized(res);
      return null;
    }

    return { user, adminRecord };
  } catch (err) {
    console.error('[verifyAdmin] critical error:', err);
    if (res) return serverError(res, err);
    return null;
  }
}

export function unauthorized(res?: any) {
  const message = { error: 'Unauthorized. Admin session required.' };
  if (res && res.status) {
    res.status(401).json(message);
    return null;
  }
  return NextResponse.json(message, { status: 401 });
}

export function serverError(res: any, error: any) {
  console.error('[Admin API Error]', error);
  const message = { error: error?.message || 'Internal server error' };
  if (res && res.status) {
    res.status(500).json(message);
    return null;
  }
  return NextResponse.json(message, { status: 500 });
}
