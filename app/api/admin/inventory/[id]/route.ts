import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { stock, low_stock_threshold, reason } = body;

    const data = await convexMutation("functions/products_mutations:updateInventory", {
      id,
      stock,
      low_stock_threshold,
      reason: reason || 'Manual update by admin'
    });

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const data = await convexQuery("functions/products:getInventoryLog", { id });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
