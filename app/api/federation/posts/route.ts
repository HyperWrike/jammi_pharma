import { NextRequest, NextResponse } from 'next/server';
import { convexMutation } from '@/lib/convexServer';
import { buildLegacyCreateFederationPostArgs } from '@/lib/federationPostPayload';

/** Public: submit a federation discourse post for moderation (no auth). */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = buildLegacyCreateFederationPostArgs(body);
    if (!payload.content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    if (!payload.poster_name) {
      return NextResponse.json({ error: 'Author name is required' }, { status: 400 });
    }

    const id = await convexMutation(
      'functions/federation_posts.js:createFederationPost',
      payload
    );

    return NextResponse.json({ success: true, data: { id } }, { status: 201 });
  } catch (error: any) {
    console.error('[api/federation/posts]', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit post' },
      { status: 500 }
    );
  }
}
