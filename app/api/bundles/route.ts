import { NextResponse } from 'next/server';
import { convexQuery } from '@/lib/convexServer';

export async function GET() {
  try {
    const data = await convexQuery('functions/bundles:listBundles', { status: 'active' });
    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
