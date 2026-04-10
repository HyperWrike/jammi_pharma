import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  // No-op for now since we're using data URLs
  return NextResponse.json({ success: true }, { status: 200 });
}
