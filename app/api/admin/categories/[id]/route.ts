import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseAdmin, unauthorized, serverError } from '@/lib/adminAuth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from('categories')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) return serverError(error);
    return NextResponse.json({ data });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const { id } = await params;
    
    // Check if products are assigned
    const { count } = await supabaseAdmin
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id);
      
    if (count && count > 0) {
      return NextResponse.json({
        error: `Cannot delete — ${count} product(s) are assigned to this category. Reassign them first.`
      }, { status: 400 });
    }
    
    const { error } = await supabaseAdmin.from('categories').delete().eq('id', id);
    if (error) return serverError(error);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return serverError(error);
  }
}
