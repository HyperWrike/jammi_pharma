import { NextRequest, NextResponse } from "next/server";
import { convexQuery } from "@/lib/convexServer";
import { verifyAdmin, unauthorized } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const dashboard = await convexQuery<any>("functions/orders:getDashboardReport", {});
    return NextResponse.json({
      data: {
        from,
        to,
        totalRevenue: dashboard?.totalRevenue || 0,
        totalOrders: dashboard?.totalOrders || 0,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
