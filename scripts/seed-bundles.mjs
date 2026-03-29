import { createClient } from '@supabase/supabase-js';
import XLSX from 'xlsx';

const url = 'https://gcfxeuqjvlmbkwlnjjxk.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZnhldXFqdmxtYmt3bG5qanhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDc5ODAxNiwiZXhwIjoyMDkwMzc0MDE2fQ.cFzvZDkYojtrWvH-6KRxelbsWVRZWGcDSTcFQ-Oi024';

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function main() {
  console.log('Reading Bundles.xlsx...');
  const wb = XLSX.readFile('Bundles.xlsx');
  const sheetName = wb.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
  
  // Skip header row
  const rows = data.slice(1);
  console.log(`Found ${rows.length} bundles.`);

  // 1. Gather all unique product names mentioned
  const allProductNames = new Set();
  
  const parsedBundles = rows.map(row => {
    // Columns: S. No. | Bundle name | Job-to-be-done | Hero SKU | Supporting SKUs
    const bundleName = row[1];
    const desc = row[2];
    const heroSku = row[3];
    const supportingStr = row[4];
    
    if (!bundleName) return null;
    
    const supporting = supportingStr ? supportingStr.split(',').map(s => s.trim()) : [];
    const products = [heroSku.trim(), ...supporting].filter(Boolean);
    
    products.forEach(p => allProductNames.add(p));
    
    return { name: bundleName, description: desc, products };
  }).filter(Boolean);

  console.log(`Extracted ${allProductNames.size} unique products from bundles.`);

  // 2. Fetch existing products from DB
  const { data: existingProducts, error: prodErr } = await supabase
    .from('products')
    .select('id, name, slug');
    
  if (prodErr) throw prodErr;
  
  // Fuzzy match function: if name is a substring or vice/versa
  const findProduct = (name) => {
    const lName = name.toLowerCase();
    return existingProducts.find(p => {
      const pName = p.name.toLowerCase();
      return pName === lName || pName.includes(lName) || lName.includes(pName);
    });
  };

  const missingNames = [...allProductNames].filter(name => !findProduct(name));
  
  console.log(`Missing products to create: ${missingNames.length}`);
  console.log('Missing items:', missingNames);
  
  // 3. Create missing products
  if (missingNames.length > 0) {
    const { data: catData } = await supabase.from('categories').select('id').limit(1).single();
    const catId = catData ? catData.id : null;
    
    for (const name of missingNames) {
      const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      
      const { error: insErr } = await supabase.from('products').insert({
        name,
        slug: uniqueSlug,
        description: `Ayurvedic formulation: ${name}`,
        short_description: `Therapeutic formulation`,
        price: 250, // default placeholder
        stock: 100,
        status: 'published',
        category_id: catId
      });
      
      if (insErr) {
          console.error(`Error inserting product ${name}:`, insErr.message);
      } else {
          console.log(`  Inserted missing product: ${name}`);
      }
    }
  }

  // 4. Reload all products to get their IDs for relation mapping
  const { data: allProducts } = await supabase.from('products').select('id, name');
  
  const findProductId = (name) => {
    const lName = name.toLowerCase();
    const match = allProducts.find(p => {
      const pName = p.name.toLowerCase();
      return pName === lName || pName.includes(lName) || lName.includes(pName);
    });
    return match ? match.id : null;
  };
  
  // Clear existing bundles first to avoid duplicates
  console.log('Clearing existing bundles to recreate from Excel...');
  await supabase.from('bundle_products').delete().neq('bundle_id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('bundles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  // 5. Create bundles and bundle_products relations
  console.log('Inserting bundles...');
  let insertedBundlesCount = 0;
  
  for (const bundle of parsedBundles) {
    // Insert bundle
    const { data: bData, error: bErr } = await supabase
      .from('bundles')
      .insert({
        name: bundle.name,
        description: bundle.description,
        extra_discount_percent: 15, // Default 15% discount
        status: 'active'
      })
      .select('id')
      .single();
      
    if (bErr) {
      console.error(`  ❌ Error inserting bundle ${bundle.name}:`, bErr.message);
      continue;
    }
    
    insertedBundlesCount++;
    
    // Insert relations
    const relationsToInsert = bundle.products.map(pName => {
      const pid = findProductId(pName);
      if (!pid) console.warn(`  ⚠️ Warning: product ID not found for ${pName} in bundle ${bundle.name}`);
      return pid ? { bundle_id: bData.id, product_id: pid } : null;
    }).filter(Boolean);
    
    if (relationsToInsert.length > 0) {
      const { error: relErr } = await supabase.from('bundle_products').insert(relationsToInsert);
      if (relErr) console.error(`  ❌ Error inserting relations for ${bundle.name}:`, relErr.message);
    }
  }
  
  console.log(`✅ Completed! Inserted ${insertedBundlesCount} bundles.`);
}

main().catch(console.error);
