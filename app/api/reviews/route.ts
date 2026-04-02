import { NextRequest, NextResponse } from 'next/server';
import { convexMutation, convexQuery } from '@/lib/convexServer';

function cleanArgs(args: any) {
  const cleaned: any = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null && args[key] !== undefined && args[key] !== '') {
      cleaned[key] = args[key];
    }
  });
  return cleaned;
}

// GET public reviews for a product
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    const reviews = await convexQuery("functions/reviews:listReviews", cleanArgs({ productId, status: 'approved' }));

    const mapped = (reviews || []).map((r: any) => ({
      id: r._id,
      productId: r.product_id,
      productName: r.product_name,
      customerName: r.reviewer_name,
      rating: r.rating,
      comment: r.review_text,
      imageUrl: r.image_url,
      createdAt: r.created_at
    }));

    return NextResponse.json(mapped);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// POST a new review (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, productName, customerName, rating, comment, imageUrl } = body;

    if (!productId || !customerName || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const reviewId = await convexMutation("functions/reviews:createReview", cleanArgs({
      product_id: productId,
      reviewer_name: customerName,
      rating: parseInt(rating),
      review_text: comment || '',
    }));

    return NextResponse.json({ success: true, id: reviewId });
  } catch (err: any) {
    console.error('[reviews POST] Error:', err);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
