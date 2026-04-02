import { NextResponse } from 'next/server';
import { convexQuery } from '@/lib/convexServer';

export async function GET() {
  try {
    const allCoupons = await convexQuery('functions/coupons.js:listCoupons', {});
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const data = (allCoupons || []).filter((coupon: any) => {
      if (coupon?.status !== 'active') return false;
      if (!coupon?.expiry_date) return true;
      const expiryRaw = String(coupon.expiry_date);
      const expiryDate = expiryRaw.includes('T')
        ? new Date(expiryRaw)
        : new Date(`${expiryRaw}T23:59:59.999`);
      if (Number.isNaN(expiryDate.getTime())) return false;
      return expiryDate >= today;
    });
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
