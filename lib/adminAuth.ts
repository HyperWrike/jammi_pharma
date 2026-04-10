import { NextResponse } from 'next/server'
import { convexQuery } from './convexServer'

export interface AdminUser {
  user: any;
  adminRecord: any;
}

export async function verifyAdmin(req: any): Promise<AdminUser | null> {
  try {
    let token = '';
    if (req.headers instanceof Headers) {
      token = req.headers.get('authorization')?.replace('Bearer ', '') || '';
    } else {
      token = (req.headers['authorization'] as string)?.replace('Bearer ', '') || '';
    }

    // Offline bypass check
    if (token === 'JAMMI_ADMIN_MASTER_KEY_2024' || token === process.env.JAMMI_BYPASS_TOKEN) {
      return {
        user: { id: 'jammi-bypass', email: 'admin@jammi.in' },
        adminRecord: { role: 'admin', name: 'Master Admin', email: 'admin@jammi.in' }
      };
    }

    // Check for JAMMI_ADMIN_TOKEN format
    if (token && token.startsWith('JAMMI_ADMIN_TOKEN_')) {
      const adminId = token.replace('JAMMI_ADMIN_TOKEN_', '');
      return {
        user: { id: adminId, email: 'admin@jammi.in' },
        adminRecord: { role: 'admin', name: 'Admin', email: 'admin@jammi.in', _id: adminId }
      };
    }

    return null;
  } catch (err) {
    console.error('[verifyAdmin] critical error:', err);
    return null;
  }
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
}

export function serverError(err: any): NextResponse {
  console.error('[Admin API Error]', err);
  return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
}
