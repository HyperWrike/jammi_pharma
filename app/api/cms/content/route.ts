import { NextRequest, NextResponse } from 'next/server';
import { convexQuery } from '@/lib/convexServer';

function cleanArgs(args: any) {
  const cleaned: any = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== null && args[key] !== undefined && args[key] !== '') {
      cleaned[key] = args[key];
    }
  });
  return cleaned;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page');
    const section = searchParams.get('section');

    const data = await convexQuery('functions/cms:getCmsContent', cleanArgs({ page, section }));
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error', data: [] },
      { status: 500 }
    );
  }
}
