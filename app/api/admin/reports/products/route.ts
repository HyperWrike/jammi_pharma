import { NextRequest, NextResponse } from "next/server";
import { convexQuery } from "@/lib/convexServer";
import { verifyAdmin, unauthorized } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search") || undefined;

    const result = await convexQuery<any>("functions/products.js:listProducts", {
      page,
      limit,
      search,
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
