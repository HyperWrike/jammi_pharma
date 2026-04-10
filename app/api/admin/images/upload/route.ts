import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';
import { convexMutation } from '@/lib/convexServer';

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploadUrl = await convexMutation<string>('functions/uploads:generateUploadUrl', {});
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      const text = await uploadResponse.text();
      return NextResponse.json({ error: `Convex storage upload failed: ${text}` }, { status: 500 });
    }

    const uploadResult = await uploadResponse.json();
    const storageId = uploadResult.storageId;
    const publicUrl = await convexMutation<string | null>('functions/uploads:getStorageUrl', { storageId });

    if (!publicUrl) {
      return NextResponse.json({ error: 'Failed to resolve uploaded image URL' }, { status: 500 });
    }

    return NextResponse.json({ url: publicUrl, path: storageId }, { status: 200 });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
