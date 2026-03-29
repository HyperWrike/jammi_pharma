import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase Client (Service Role for bypass RLS on products updating and bucket uploading)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gcfxeuqjvlmbkwlnjjxk.supabase.co';
// WARNING: To run this script, run it with SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload-images.mjs
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const BUCKET_NAME = 'product-images';

async function uploadAndLinkImages() {
  console.log(`Scanning local images at ${IMAGES_DIR}...`);
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext);
  });
  
  console.log(`Found ${files.length} images to process.`);

  // Load all products to do a fuzzy name match
  const { data: products, error: pError } = await supabase.from('products').select('id, name, images');
  if (pError) {
      console.error("Failed to fetch products:", pError);
      return;
  }

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const fileName = path.basename(file);
    const storagePath = `products/${fileName}`;
    
    console.log(`\n--- Processing [${fileName}] ---`);

    try {
      // 1. Upload to Supabase Storage
      const fileBuffer = fs.readFileSync(filePath);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: 'image/' + path.extname(file).replace('.', ''),
          upsert: true
        });

      if (uploadError) {
        console.error(`❌ Upload failed for ${fileName}:`, uploadError.message);
        continue;
      }

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
      console.log(`✅ Uploaded. Public URL: ${publicUrl}`);

      // 3. Fuzzy Match Product Name
      // Assuming filename like "Hepableen Tablets.png" or "BFF_1.png"
      const cleanFileName = fileName.replace(/\.[^/.]+$/, '').replace(/_|\d/g, ' ').trim().toLowerCase();
      
      let matchedProduct = products.find(p => p.name.toLowerCase().includes(cleanFileName) || cleanFileName.includes(p.name.toLowerCase()));
      
      if (!matchedProduct) {
          // Special fallback matching logic based on directory observation
          if (cleanFileName.includes('hepableen')) matchedProduct = products.find(p => p.name.toLowerCase().includes('hepableen'));
          if (cleanFileName.includes('crushnbrush')) matchedProduct = products.find(p => p.name.toLowerCase().includes('crushnbrush'));
      }

      if (matchedProduct) {
         // Update DB
         const { error: updateErr } = await supabase
           .from('products')
           .update({ 
               images: [publicUrl]
           })
           .eq('id', matchedProduct.id);

         if (updateErr) {
             console.error(`❌ DB Link failed for product ${matchedProduct.name}:`, updateErr.message);
         } else {
             console.log(`🔗 Linked image successfully to Product: ${matchedProduct.name}`);
         }
      } else {
         console.log(`⚠️ No matching product found in DB for '${cleanFileName}'. Uploaded to bucket but unlinked.`);
      }

    } catch (err) {
      console.error(`Unexpected error for ${fileName}:`, err);
    }
  }
  
  console.log("\nDone processing all images.");
}

uploadAndLinkImages().catch(console.error);
