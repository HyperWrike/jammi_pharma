import { NextRequest, NextResponse } from "next/server";
import { convexMutation } from "@/lib/convexServer";
import { verifyAdmin, unauthorized } from "@/lib/adminAuth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const { status } = await req.json();
    const data = await convexMutation("functions/coupons.js:updateCoupon", { id, status });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
