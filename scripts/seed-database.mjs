// Create admin user in Supabase Auth and admin_users table
// Then seed all products from constants.tsx
import { createClient } from '@supabase/supabase-js';

const url = 'https://gcfxeuqjvlmbkwlnjjxk.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZnhldXFqdmxtYmt3bG5qanhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDc5ODAxNiwiZXhwIjoyMDkwMzc0MDE2fQ.cFzvZDkYojtrWvH-6KRxelbsWVRZWGcDSTcFQ-Oi024';

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// ── Step 1: Create Admin Auth User ────────────────────────────────
async function createAdminUser() {
  console.log('Creating admin auth user...');
  
  // First delete any existing user with this email 
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existing = existingUsers?.users?.find(u => u.email === 'admin@jammi.in');
  if (existing) {
    console.log('  Deleting existing admin auth user...');
    await supabase.auth.admin.deleteUser(existing.id);
  }

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@jammi.in',
    password: 'Admin@pass',
    email_confirm: true,
  });

  if (authError) {
    console.error('❌ Failed to create admin auth user:', authError.message);
    return null;
  }

  console.log('✅ Admin auth user created:', authData.user.id);

  // Insert into admin_users table (bypass RLS with service_role)
  const { error: insertError } = await supabase
    .from('admin_users')
    .insert({
      auth_user_id: authData.user.id,
      name: 'Jammi Admin',
      email: 'admin@jammi.in',
      role: 'super_admin',
      status: 'active',
    });

  if (insertError) {
    console.error('❌ Failed to insert admin_users record:', insertError.message);
    return null;
  }

  console.log('✅ Admin record inserted into admin_users table');
  return authData.user.id;
}

// ── Step 2: Seed Categories ────────────────────────────────────────
async function seedCategories() {
  console.log('\nSeeding categories...');
  const categories = [
    { name: 'Wellness', slug: 'wellness', description: 'Ayurvedic wellness products for daily health' },
    { name: 'Therapeutics', slug: 'therapeutics', description: 'Therapeutic Ayurvedic formulations' },
    { name: 'Skin & Hair Care', slug: 'skin-hair-care', description: 'Natural skin and hair care products' },
    { name: 'Body Care', slug: 'body-care', description: 'Ayurvedic body care products' },
  ];

  const { data, error } = await supabase
    .from('categories')
    .insert(categories)
    .select('id, name, slug');

  if (error) {
    console.error('❌ Category insert error:', error.message);
    return {};
  }

  const categoryMap = {};
  data.forEach(c => { categoryMap[c.name] = c.id; });
  console.log('✅ Categories seeded:', Object.keys(categoryMap).join(', '));
  return categoryMap;
}

// ── Step 3: Seed Products ──────────────────────────────────────────
async function seedProducts(categoryMap) {
  console.log('\nSeeding products...');

  const products = [
    { name: 'Triphala Churna', slug: 'triphala-churna', short_description: 'Classic Ayurvedic powder for digestion, systemic cleansing and vitality. 100 gms.', description: 'Triphala Churna is one of the most well-known Ayurvedic formulations, combining three fruits (Amla, Haritaki, Vibhitaki) for digestive health, detox, and rejuvenation.', price: 150, category: 'Wellness', images: ['/images/TriphalaChurna_2.png'], tags: ['digestion', 'detox', 'immunity'], stock: 100 },
    { name: 'Yummunity Kids', slug: 'yummunity', short_description: 'A delicious immunity-boosting syrup formulated specifically for children.', description: 'Yummunity is designed for children to naturally boost their immunity with Tulsi and Guduchi.', price: 250, category: 'Wellness', images: ['/images/Yummunity Bottle.png'], tags: ['kids', 'immunity'], stock: 80 },
    { name: 'Trip Caps', slug: 'trip-caps', short_description: 'Smooth movement and relief from constipation in a convenient capsule.', description: 'Trip Caps provide effective overnight relief from constipation. Non-habit forming and gentle.', price: 220, category: 'Wellness', images: ['/images/Tripcaps_1.png'], tags: ['constipation', 'digestion'], stock: 120 },
    { name: 'Zeer Alka Syrup', slug: 'zeer-alka', short_description: 'Natural Urinary Alkaliser and Kidney Support. 200ml bottle.', description: 'Zeer Alka normalizes urinary pH, flushes toxins, and soothes the urinary tract.', price: 220, category: 'Therapeutics', images: ['/images/ZeerAlka_1.png'], tags: ['kidney', 'urinary'], stock: 60 },
    { name: 'Widari Forte Granules', slug: 'widari-forte', short_description: 'Ayurvedic formulation designed to address the modern Male Infertility Crisis and sexual insufficiencies.', description: 'Widari Forte enhances vitality, supports reproductive health, and reduces stress with Ashwagandha and Safed Musli.', price: 750, category: 'Therapeutics', images: ['/images/WidariForte_2.png'], tags: ['male health', 'vitality'], stock: 50 },
    { name: 'ThyroGard', slug: 'thyrogard', short_description: 'A potent Ayurvedic blend formulated to boost thyroid function and balance metabolism naturally.', description: 'ThyroGard optimizes metabolic rate, combats fatigue, and supports energy levels.', price: 450, category: 'Wellness', images: ['/images/Thyro_1.png'], tags: ['thyroid', 'metabolism'], stock: 70 },
    { name: 'Suventris', slug: 'suventris', short_description: 'Ayurvedic formulation designed to support female reproductive health and balance hormones.', description: 'Suventris regulates menstrual cycles, reduces discomfort, and nourishes the reproductive system.', price: 280, category: 'Wellness', images: ['/images/Suventris_1.png'], tags: ['women health', 'hormones'], stock: 90 },
    { name: 'Redema', slug: 'redema', short_description: 'Relief from Edema & Promotes Healthy Weight Loss', description: 'Redema helps eliminate excess fluid buildup, assists in weight management, and supports kidney health.', price: 320, category: 'Wellness', images: ['/images/Redema_2.png'], tags: ['edema', 'weight loss'], stock: 60 },
    { name: 'Pyril-DS', slug: 'pyril-ds', short_description: 'Advanced Ayurvedic formulation providing fast relief from high temperature and body aches.', description: 'Pyril-DS quickly reduces temperature and is safe for long-term use. 100% herbal.', price: 150, category: 'Wellness', images: ['/images/PyrilDS_2.png'], tags: ['fever', 'pain relief'], stock: 150 },
    { name: 'OrthoRaksha Oil', slug: 'orthoraksha', short_description: 'Formulated to address various types of musculoskeletal discomfort using ancient Taila Paka Vidhi.', description: 'OrthoRaksha provides 10x faster absorption with 12+ botanical extracts for 24hr joint support.', price: 350, category: 'Wellness', images: ['/images/OrthoRaksha_2.png'], tags: ['joint pain', 'muscle pain'], stock: 80 },
    { name: 'Mahanarayana Tailam', slug: 'mahanarayana', short_description: 'A profound, nourishing blend of over 40 herbs designed to deeply restore neuromuscular vitality.', description: 'Mahanarayana Tailam rehabilitates nerve function, rebuilds physical strength, and relieves Vata imbalances.', price: 350, category: 'Wellness', images: ['/images/MahanarayanaTaila_1.png'], tags: ['neuromuscular', 'vata'], stock: 40 },
    { name: 'Nilomit Tablets', slug: 'nilomit', short_description: 'Fast acting Ayurvedic relief from nausea, vomiting, and acid indigestion without drowsiness.', description: 'Nilomit provides non-sedative motion sickness relief, morning sickness relief, and calms gastric mucosa.', price: 120, category: 'Wellness', images: ['/images/Nilomit_2..png'], tags: ['nausea', 'digestion'], stock: 200 },
    { name: 'Daily Dew Moisturizer', slug: 'daily-dew', short_description: 'Experience the golden glow of Ayurveda. Daily Dew is a light, deeply nourishing moisturizer infused with Kashmiri Saffron and Kumkumadi Oil.', description: 'Daily Dew provides 24-hour hydration without any greasy residue with a heritage-rich Ayurvedic formula.', price: 1499, category: 'Skin & Hair Care', images: ['/images/Daily Dew.png'], tags: ['moisturizer', 'skin care'], stock: 30 },
    { name: 'Madhuchari Churna', slug: 'madhuchari-churna', short_description: 'Regulates blood sugar and boosts metabolism. 100g.', description: 'Madhuchari Churna balances blood glucose naturally, aids in weight management, and rejuvenates pancreatic beta cells.', price: 350, category: 'Wellness', images: ['/images/MadhumehariChurna_2.png'], tags: ['diabetes', 'blood sugar'], stock: 70 },
    { name: 'Laksha Capsules', slug: 'laksha-capsules', short_description: 'Natural formula for accelerating bone healing and improving bone mineral density.', description: 'Laksha Capsules accelerate bone recovery, strengthen bones, and provide vital minerals.', price: 450, category: 'Therapeutics', images: ['/images/Laksha_1.png'], tags: ['bone health', 'fracture'], stock: 50 },
    { name: 'Hepableen Syrup', slug: 'hepableen-syrup', short_description: 'A 100% Ayurvedic Liver Tonic that protects from toxins and enhances liver function.', description: 'Hepableen Syrup stimulates appetite, promotes liver detoxification, and is 100% Ayurvedic.', price: 425, category: 'Wellness', images: ['/images/HAPABLEEN 3.jpg'], tags: ['liver', 'digestion'], stock: 60 },
    { name: 'Hepableen Tablets', slug: 'hepableen-tablets', short_description: 'A non-hormonal liver tonic designed for complete liver protection and cellular detoxification.', description: 'Hepableen Tablets regenerate liver cells, protect from toxins, and optimize bile secretion.', price: 499, category: 'Therapeutics', images: ['/images/Hepableen Tablets.png'], tags: ['liver', 'detox'], stock: 45 },
    { name: 'Livercure Complex Forte', slug: 'livercure', short_description: 'Complete liver protective supplement formulated for chronic liver conditions and detoxification.', description: 'Livercure provides comprehensive liver protection, aids regeneration, and detoxifies the system.', price: 899, category: 'Therapeutics', images: ['/images/Livercure_2.png'], tags: ['liver', 'chronic'], stock: 35 },
    { name: 'Combifore', slug: 'combifore', short_description: 'Combifore is a premium therapeutic solution specifically engineered for anti-arthritic support and effective pain relief.', description: 'Combifore significantly reduces joint stiffness, provides rapid pain relief, and supports long-term cartilage health.', price: 35, category: 'Therapeutics', images: ['/images/Combifore_2.png'], tags: ['arthritis', 'pain relief'], stock: 200 },
    { name: 'GTP Mental Fitness', slug: 'gtp-mental-fitness', short_description: 'A specialized Ayurvedic formulation designed to harmonize neural pathways and enhance cognitive clarity.', description: 'GTP restores natural neurotransmitter equilibrium, enhances cognitive speed, and regulates cortisol.', price: 35, category: 'Therapeutics', images: ['/images/GTP_1.png'], tags: ['mental health', 'cognition'], stock: 150 },
    { name: 'AA Caps', slug: 'aa-caps', short_description: 'A scientifically formulated therapeutic supplement designed to relieve respiratory tract disorders.', description: 'AA Caps help clear the respiratory tract, strengthen immune defense, and provide fast-acting relief.', price: 25, category: 'Therapeutics', images: ['/images/AAcaps_1.png'], tags: ['respiratory', 'immunity'], stock: 180 },
    { name: 'D-Tabs', slug: 'd-tabs', short_description: 'Advanced Ayurvedic formulation scientifically designed by Jammi to manage non-insulin dependent diabetes.', description: 'D-Tabs improve insulin sensitivity, tone the pancreas, and alleviate diabetes complications.', price: 35, category: 'Therapeutics', images: ['/images/Dtabs_2.png'], tags: ['diabetes', 'metabolism'], stock: 160 },
    { name: 'Cyst Evit', slug: 'cyst-evit', short_description: 'A specialized phyto-therapeutic formulation to help manage PCOS/PCOD naturally.', description: 'Cyst Evit restores hormonal balance, promotes regular cycles, and aids in weight management for PCOS/PCOD.', price: 35, category: 'Therapeutics', images: ['/images/Cyst_1.png'], tags: ['PCOS', 'women health'], stock: 100 },
    { name: 'BFF - Best Foot Forward', slug: 'bff-balm', short_description: 'Our rich, buttery balm penetrates thick skin to deeply moisturize dry, cracked heels.', description: 'BFF repairs cracked heels, calms fatigued feet, and deeply moisturizes with Kokum Butter.', price: 22, category: 'Body Care', images: ['/images/BFF_1.png'], tags: ['foot care', 'moisturizer'], stock: 120 },
    { name: 'UVSafe Ayurvedic Protection SPF 50', slug: 'uvsafe-sunscreen', short_description: 'A century-old Ayurvedic recipe refined for the modern world with Aloe Vera and Saffron.', description: 'UVSafe provides triple-shield protection against UVA, UVB, and Blue Light with a non-greasy formula.', price: 845, discount_price: 845, category: 'Skin & Hair Care', images: ['/images/UVSafe.png'], tags: ['sunscreen', 'skin protection'], stock: 40 },
    { name: 'Timeless Anti-Ageing Cream', slug: 'timeless-anti-ageing', short_description: 'A restorative Ayurvedic formula crafted with pure Guggul and Ashwagandha for youthful radiance.', description: 'Timeless reduces wrinkles, firms skin, and restores youth with deep nourishment.', price: 85, category: 'Skin & Hair Care', images: ['/images/Timeless.png'], tags: ['anti-aging', 'skin care'], stock: 55 },
    { name: 'SoftLips', slug: 'soft-lips', short_description: 'A luxurious lip butter enriched with natural emollients for soft, supple lips. 15g.', description: 'SoftLips provides intense hydration, natural plumpness, and authentic Ayurvedic care.', price: 180, category: 'Skin & Hair Care', images: ['/images/SoftLips_1.png'], tags: ['lip care', 'moisturizer'], stock: 70 },
    { name: 'Kumkumadi Serum', slug: 'kumkumadi-serum', short_description: 'A powerful blend of saffron and 25 precious herbs for radiance and anti-aging.', description: 'Kumkumadi Serum lightens pigmentation, reduces fine lines, and imparts a natural golden glow.', price: 95, discount_price: 95, category: 'Skin & Hair Care', images: ['/images/Kumkumadi Serum.jpeg'], tags: ['serum', 'anti-aging'], stock: 45 },
    { name: 'KeshPro Oil', slug: 'keshpro-oil', short_description: 'A traditional Ayurvedic hair oil infused with Bhringraj and Amla for hair health.', description: 'KeshPro stops hair fall, prevents premature greying, and stimulates new hair growth.', price: 34, discount_price: 34, category: 'Skin & Hair Care', images: ['/images/KeshPro.png'], tags: ['hair oil', 'hair fall'], stock: 90 },
    { name: 'Glow Complexion Cream', slug: 'glow-complexion-cream', short_description: 'A lightweight formula that deeply hydrates while brightening skin tone with ancient botanicals.', description: 'Glow Complexion Cream evens skin tone, provides deep hydration, and reveals natural radiance.', price: 72, discount_price: 72, category: 'Skin & Hair Care', images: ['/images/Glow.png'], tags: ['complexion', 'brightening'], stock: 60 },
    { name: 'Flawless Pack', slug: 'flawless-pack', short_description: 'A potent weekly ritual to restore skin elasticity and natural radiance.', description: 'Flawless Pack promotes skin firming, deep cleansing, and youthful glow with Manjistha and Turmeric.', price: 84, category: 'Skin & Hair Care', images: ['/images/Flawless.png'], tags: ['face pack', 'skin firming'], stock: 50 },
  ];

  // Map category names to IDs
  const productsToInsert = products.map(p => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
    short_description: p.short_description,
    price: p.price,
    discount_price: p.discount_price || null,
    stock: p.stock,
    category_id: categoryMap[p.category] || null,
    images: p.images,
    tags: p.tags,
    status: 'published',
    is_featured: ['triphala-churna', 'daily-dew', 'uvsafe-sunscreen', 'widari-forte', 'thyrogard'].includes(p.slug),
  }));

  const { data, error } = await supabase
    .from('products')
    .insert(productsToInsert)
    .select('id, name');

  if (error) {
    console.error('❌ Product insert error:', error.message);
    return;
  }

  console.log(`✅ ${data.length} products seeded successfully`);
}

// ── Run All ────────────────────────────────────────────────────────
async function main() {
  try {
    const adminId = await createAdminUser();
    const categoryMap = await seedCategories();
    await seedProducts(categoryMap);
    
    // Verify
    console.log('\n── Verification ──');
    const { count: prodCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    const { count: adminCount } = await supabase.from('admin_users').select('*', { count: 'exact', head: true });
    console.log(`Products: ${prodCount}, Categories: ${catCount}, Admin users: ${adminCount}`);
    console.log('\n🎉 Database setup complete!');
  } catch (err) {
    console.error('Fatal error:', err);
  }
}

main();
