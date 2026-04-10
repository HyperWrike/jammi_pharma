import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';

/** Public: submit Partner With Us / federation membership application (no auth). */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const full_name = String(body.full_name ?? body.fullName ?? '').trim();
    const organization = String(body.organization ?? body.institution ?? body.clinicName ?? '').trim();
    const specialization = String(body.specialization ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? body.contact ?? '').trim();
    const message = String(body.message ?? body.reason ?? '').trim();
    const city = body.city != null ? String(body.city).trim() : undefined;
    const state = body.state != null ? String(body.state).trim() : undefined;

    if (!full_name || !organization || !specialization || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = await convexMutation('functions/partner_requests:createPartnerRequest', {
      full_name,
      organization,
      specialization,
      email,
      phone,
      city,
      state,
      message,
    });

    return NextResponse.json({ success: true, data: { id } }, { status: 201 });
  } catch (error: any) {
    console.error('[api/partner-requests]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}
