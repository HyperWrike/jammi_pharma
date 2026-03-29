// Create Supabase Storage buckets
import { createClient } from '@supabase/supabase-js';

const url = 'https://gcfxeuqjvlmbkwlnjjxk.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZnhldXFqdmxtYmt3bG5qanhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDc5ODAxNiwiZXhwIjoyMDkwMzc0MDE2fQ.cFzvZDkYojtrWvH-6KRxelbsWVRZWGcDSTcFQ-Oi024';

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const buckets = [
  'product-images',
  'category-images',
  'banners',
  'cms-images',
  'bundle-images',
  'site-assets',
  'review-images',
  'reports',
];

async function main() {
  console.log('Creating storage buckets...');
  
  for (const bucket of buckets) {
    const { data, error } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 10485760, // 10MB
    });
    
    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`  ⏭️  ${bucket} already exists`);
      } else {
        console.error(`  ❌ ${bucket}: ${error.message}`);
      }
    } else {
      console.log(`  ✅ ${bucket} created`);
    }
  }
  
  // List buckets to verify
  const { data: allBuckets } = await supabase.storage.listBuckets();
  console.log(`\nTotal buckets: ${allBuckets?.length}`);
  allBuckets?.forEach(b => console.log(`  - ${b.name} (public: ${b.public})`));
}

main().catch(console.error);
