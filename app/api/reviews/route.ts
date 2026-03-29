import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

// GET public reviews for a product
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    let query = supabaseAdmin.from('reviews').select('*').eq('status', 'Approved').order('createdAt', { ascending: false });
    
    if (productId) {
      query = query.eq('productId', productId);
    }

    const { data: reviews, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(reviews);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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

    const { data: review, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        productId,
        productName,
        customerName,
        rating,
        comment,
        imageUrl,
        status: 'Pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[reviews POST] Database error:', error);
      return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: review.id });
  } catch (err) {
    console.error('[reviews POST] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
