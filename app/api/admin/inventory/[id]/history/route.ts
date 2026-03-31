import { NextRequest, NextResponse } from "next/server";
import { convexQuery } from "@/lib/convexServer";
import { verifyAdmin, unauthorized } from "@/lib/adminAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const data = await convexQuery("functions/products.js:getInventoryLog", { id });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
