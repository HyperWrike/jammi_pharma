import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const { id } = await params;
    await convexMutation("functions/doctor_profiles.js:deleteDoctorProfile", { id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();
  try {
    const { id } = await params;
    const body = await req.json();
    let verified = false;
    if (typeof body.verified === 'boolean') {
      verified = body.verified;
    } else if (body.status === 'approved' || body.status === 'verified') {
      verified = true;
    } else if (body.status === 'rejected' || body.status === 'unverified') {
      verified = false;
    }

    const data = await convexMutation("functions/federation_posts.js:updateDoctor", { id, verified });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
