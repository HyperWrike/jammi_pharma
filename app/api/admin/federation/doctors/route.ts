import { NextRequest, NextResponse } from 'next/server';
import { convexQuery } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await convexQuery("functions/doctor_profiles:listDoctorProfiles", {});
    const list = Array.isArray(result) ? result : [];
    return NextResponse.json({ data: list });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
