-- Sample Data for Jammi Pharmaceuticals Admin Panel Testing
-- Run this in your Supabase SQL Editor after running the main schema

-- ============================================
-- 1. ADMIN USERS (for testing admin panel access)
-- ============================================
-- Note: You must first create auth users in Supabase Auth Dashboard, then link them here
-- Example: Create an admin@jammipharma.com user in Auth, then use its UUID below

-- INSERT INTO admin_users (auth_user_id, name, email, role, status)
-- VALUES
--   ('YOUR-AUTH-USER-UUID-HERE', 'Admin User', 'admin@jammipharma.com', 'admin', 'active');

-- Temporary bypass: You can use the bypass token JAMMI_ADMIN_MASTER_KEY_2024
-- (set in .env.local as JAMMI_BYPASS_TOKEN) to access admin panel without DB setup


-- ============================================
-- 2. CATEGORIES
-- ============================================
INSERT INTO categories (id, name, slug, description, display_order, status, seo_title, seo_description)
VALUES
  ('cat-ayurvedic', 'Ayurvedic Medicines', 'ayurvedic-medicines', 'Traditional Ayurvedic formulations for holistic wellness', 1, 'active', 'Ayurvedic Medicines - Jammi Pharma', 'Explore our range of authentic Ayurvedic medicines crafted with 127 years of expertise'),
  ('cat-herbs', 'Herbal Supplements', 'herbal-supplements', 'Natural herbal supplements for everyday health', 2, 'active', 'Herbal Supplements - Jammi Pharma', 'Premium herbal supplements sourced from the finest natural ingredients'),
  ('cat-oils', 'Ayurvedic Oils', 'ayurvedic-oils', 'Therapeutic oils for external application', 3, 'active', 'Ayurvedic Oils - Jammi Pharma', 'Traditional Ayurvedic oils for massage and therapeutic use'),
  ('cat-digestion', 'Digestive Health', 'digestive-health', 'Products for digestive wellness', 4, 'active', 'Digestive Health - Jammi Pharma', 'Ayurvedic solutions for optimal digestive health'),
  ('cat-immunity', 'Immunity Boosters', 'immunity-boosters', 'Strengthen your immune system naturally', 5, 'active', 'Immunity Boosters - Jammi Pharma', 'Natural immunity boosters for strong defense');

-- ============================================
-- 3. PRODUCTS
-- ============================================
INSERT INTO products (id, name, slug, category_id, description, short_description, benefits, ingredients, usage_instructions, status, featured, stock, price, compare_at_price, sku, images, seo_title, seo_description)
VALUES
  (
    'prod-chyawanprash',
    'Jammi Chyawanprash',
    'jammi-chyawanprash',
    'cat-immunity',
    '<h2>Premium Chyawanprash</h2><p>Our signature Chyawanprash is prepared using a traditional recipe passed down through generations. Made with over 40 natural ingredients including Amla, herbs, and spices, this immunity booster is perfect for the whole family.</p><p>Manufactured following strict GMP guidelines in our state-of-the-art facility.</p>',
    'Traditional immunity booster made with 40+ natural herbs',
    ARRAY['Boosts immunity and vitality', 'Improves digestion', 'Enhances energy levels', 'Rich in Vitamin C from Amla', 'Suitable for all age groups'],
    'Amla (Indian Gooseberry), Ashwagandha, Ghee, Honey, Cardamom, Cinnamon, and 35+ other herbs',
    '1-2 teaspoons daily with milk or water. Best consumed in the morning on an empty stomach.',
    'active',
    true,
    150,
    450.00,
    550.00,
    'JAMMI-CHYW-500G',
    ARRAY['https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop'],
    'Jammi Chyawanprash - Premium Immunity Booster',
    'Buy authentic Jammi Chyawanprash online. Traditional Ayurvedic immunity booster made with 40+ natural herbs. 500g pack.'
  ),
  (
    'prod-triphala',
    'Triphala Churna',
    'triphala-churna',
    'cat-digestion',
    '<h2>Pure Triphala Powder</h2><p>Our Triphala Churna is a blend of three fruits - Amalaki, Bibhitaki, and Haritaki. This ancient Ayurvedic formulation supports digestive health and detoxification.</p>',
    'Powerful digestive and detox formula with three fruits',
    ARRAY['Supports healthy digestion', 'Natural detoxifier', 'Promotes regular bowel movements', 'Rich in antioxidants', 'Balances all three doshas'],
    'Amalaki (Emblica officinalis), Bibhitaki (Terminalia bellirica), Haritaki (Terminalia chebula) in equal proportions',
    'Mix 1 teaspoon with warm water and consume before bedtime or as directed by physician.',
    'active',
    true,
    200,
    250.00,
    300.00,
    'JAMMI-TRIP-250G',
    ARRAY['https://images.unsplash.com/photo-1599974742948-62751afe6b25?w=800'],
    'Triphala Churna - Digestive Health Powder',
    'Buy pure Triphala powder online from Jammi Pharma. Natural digestive support and detoxification. 250g pack.'
  ),
  (
    'prod-ashwagandha',
    'Ashwagandha Capsules',
    'ashwagandha-capsules',
    'cat-herbs',
    '<h2>Premium Ashwagandha Extract</h2><p>Standardized Ashwagandha root extract capsules for stress relief and vitality. Each capsule contains 500mg of pure Ashwagandha extract.</p>',
    'Stress relief and vitality enhancer',
    ARRAY['Reduces stress and anxiety', 'Improves energy and stamina', 'Supports mental clarity', 'Enhances sleep quality', 'Clinically tested extract'],
    'Ashwagandha (Withania somnifera) root extract 500mg, Vegetarian capsule shell',
    'Take 1-2 capsules daily after meals or as directed by healthcare professional.',
    'active',
    false,
    300,
    599.00,
    699.00,
    'JAMMI-ASHW-60CAP',
    ARRAY['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800'],
    'Ashwagandha Capsules - Stress Relief Supplement',
    'Premium Ashwagandha extract capsules. Reduce stress naturally. 60 capsules, 500mg each.'
  ),
  (
    'prod-massage-oil',
    'Ayurvedic Massage Oil',
    'ayurvedic-massage-oil',
    'cat-oils',
    '<h2>Traditional Massage Oil</h2><p>Specially formulated massage oil using traditional Ayurvedic herbs and pure sesame oil base. Ideal for daily abhyanga (oil massage) practice.</p>',
    'Therapeutic massage oil for daily use',
    ARRAY['Nourishes skin', 'Promotes relaxation', 'Improves circulation', 'Relieves muscle tension', 'Made with natural ingredients'],
    'Sesame oil, Ashwagandha, Bala, Sandalwood, Turmeric essential oil',
    'Warm oil slightly and massage all over body. Leave for 15-20 minutes before bath.',
    'active',
    false,
    100,
    350.00,
    NULL,
    'JAMMI-MOIL-200ML',
    ARRAY['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800'],
    'Ayurvedic Massage Oil - Therapeutic Body Oil',
    'Traditional Ayurvedic massage oil for relaxation and skin nourishment. 200ml bottle.'
  ),
  (
    'prod-turmeric',
    'Organic Turmeric Powder',
    'organic-turmeric-powder',
    'cat-herbs',
    '<h2>Pure Organic Turmeric</h2><p>100% organic turmeric powder from certified organic farms. High curcumin content for maximum benefits.</p>',
    'Pure organic turmeric with high curcumin content',
    ARRAY['Anti-inflammatory properties', 'Boosts immunity', 'Supports joint health', 'Natural antioxidant', 'Certified organic'],
    '100% Organic Turmeric (Curcuma longa) rhizome powder',
    'Mix 1/2 teaspoon with warm milk or water. Can be used in cooking.',
    'active',
    true,
    250,
    180.00,
    220.00,
    'JAMMI-TURM-200G',
    ARRAY['https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800'],
    'Organic Turmeric Powder - High Curcumin',
    'Buy certified organic turmeric powder online. High curcumin content. 200g pack.'
  );

-- ============================================
-- 4. SHIPPING METHODS
-- ============================================
INSERT INTO shipping_methods (id, name, description, base_rate, free_shipping_threshold, estimated_days_min, estimated_days_max, status)
VALUES
  ('ship-standard', 'Standard Shipping', 'Delivery within 5-7 business days', 60.00, 500.00, 5, 7, 'active'),
  ('ship-express', 'Express Shipping', 'Delivery within 2-3 business days', 120.00, 1000.00, 2, 3, 'active'),
  ('ship-overnight', 'Overnight Shipping', 'Next day delivery', 250.00, 2000.00, 1, 1, 'active');

-- ============================================
-- 5. COUPONS (Sample discount codes)
-- ============================================
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_value, max_discount, usage_limit, valid_from, valid_to, status)
VALUES
  ('WELCOME10', 'Welcome discount for new customers', 'percentage', 10.00, 300.00, 100.00, 1000, NOW(), NOW() + INTERVAL '3 months', 'active'),
  ('FLAT100', 'Flat ₹100 off on orders above ₹500', 'fixed', 100.00, 500.00, 100.00, 500, NOW(), NOW() + INTERVAL '1 month', 'active'),
  ('IMMUNITY20', '20% off on immunity boosters', 'percentage', 20.00, 400.00, 200.00, 200, NOW(), NOW() + INTERVAL '2 months', 'active');

-- ============================================
-- 6. CMS ANNOUNCEMENT
-- ============================================
INSERT INTO cms_announcement (message, bg_color, text_color, link_url, link_text, is_active)
VALUES
  ('🎉 Grand Opening Sale! Get 20% off on all Ayurvedic products. Use code: IMMUNITY20', '#22c55e', '#ffffff', '/shop', 'Shop Now', true)
ON CONFLICT (id) DO UPDATE
SET message = EXCLUDED.message, is_active = EXCLUDED.is_active;

-- ============================================
-- 7. CMS BANNERS
-- ============================================
INSERT INTO cms_banners (title, subtitle, cta_text, cta_link, image_url, position, is_active)
VALUES
  ('127 Years of Ayurvedic Excellence', 'Trusted by generations for authentic wellness solutions', 'Explore Products', '/shop', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920', 1, true),
  ('New: Immunity Booster Range', 'Strengthen your defense naturally with our immunity products', 'Shop Immunity', '/shop?category=immunity-boosters', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920', 2, true),
  ('Free Consultation Available', 'Book a session with our Ayurvedic experts', 'Book Now', '/consultation', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920', 3, true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check categories
-- SELECT * FROM categories;

-- Check products
-- SELECT p.name, c.name as category, p.price, p.stock, p.status
-- FROM products p
-- LEFT JOIN categories c ON p.category_id = c.id;

-- Check shipping methods
-- SELECT * FROM shipping_methods WHERE status = 'active';

-- Check active coupons
-- SELECT code, description, discount_type, discount_value FROM coupons WHERE status = 'active';

-- ============================================
-- NOTES
-- ============================================
-- 1. To create an admin user, first register a user in Supabase Auth Dashboard
-- 2. Then run: INSERT INTO admin_users (auth_user_id, name, email, role, status)
--              VALUES ('paste-auth-uuid-here', 'Admin Name', 'admin@email.com', 'admin', 'active');
-- 3. Or use bypass token: JAMMI_ADMIN_MASTER_KEY_2024 (set in .env.local)
-- 4. Product images use Unsplash placeholders - replace with actual product images
-- 5. All prices are in INR (₹)
