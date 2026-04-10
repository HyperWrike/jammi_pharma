import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const data = await convexQuery("functions/cms:getAnnouncement", {});
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const data = await convexMutation("functions/cms:updateAnnouncement", body);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
