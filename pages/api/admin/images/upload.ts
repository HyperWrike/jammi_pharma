import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin, verifyAdmin, unauthorized } from '../../../../lib/adminAuth';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await verifyAdmin(req, res);
  if (!admin) return; // unauthorizedPages handles the response

  const form = formidable({});
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const bucket = (Array.isArray(fields.bucket) ? fields.bucket[0] : fields.bucket) || 'cms-images';
    const folder = (Array.isArray(fields.folder) ? fields.folder[0] : fields.folder) || '';

    try {
      const fileBuffer = fs.readFileSync(file.filepath);
      const fileExt = file.originalFilename?.split('.').pop() || 'jpg';
      const fileName = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype || 'image/jpeg',
          upsert: false
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return res.status(200).json({ url: publicUrl });
    } catch (uploadErr: any) {
      console.error("Upload Error:", uploadErr);
      return res.status(500).json({ error: uploadErr.message });
    }
  });
}
