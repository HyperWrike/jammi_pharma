import { NextRequest, NextResponse } from "next/server";
import { convexMutation } from "@/lib/convexServer";
import { verifyAdmin, unauthorized } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids)) {
      return NextResponse.json({ error: "ids array is required" }, { status: 400 });
    }

    for (let i = 0; i < ids.length; i += 1) {
      await convexMutation("functions/cms.js:updateBanner", { id: ids[i], display_order: i });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
