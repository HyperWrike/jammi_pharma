import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';

export function cleanArgs(args: any) {
  const cleaned: any = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null && args[key] !== undefined && args[key] !== '') {
      cleaned[key] = args[key];
    }
  });
  return cleaned;
}

export function convexHandler(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, req?: NextRequest, body?: any) {
  if (method === 'GET') {
    return async (req: NextRequest) => {
      try {
        const searchParams = req.nextUrl.searchParams;
        const args: any = {};
        searchParams.forEach((value, key) => {
          args[key] = value;
        });
        const result = await convexQuery(path, cleanArgs(args));
        return NextResponse.json(result);
      } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
      }
    };
  }
  
  return async (req: NextRequest) => {
    try {
      const data = body || await req.json();
      const result = await convexMutation(path, cleanArgs(data));
      return NextResponse.json({ data: result }, { status: method === 'POST' ? 201 : 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
  };
}
