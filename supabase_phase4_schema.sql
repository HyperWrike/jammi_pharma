-- Phase 4: Federation, Reviews, and Customer Extensions

-- 1. Extend Customers table for Checkout Address
ALTER TABLE customers ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS pincode TEXT;

-- 2. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "productId" UUID REFERENCES products(id) ON DELETE CASCADE,
    "productName" TEXT,
    "customerName" TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    "imageUrl" TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reviews are viewable by everyone" ON reviews FOR SELECT USING (status = 'Approved');
CREATE POLICY "Anyone can submit reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update reviews" ON reviews FOR UPDATE TO service_role USING (true);
CREATE POLICY "Admins can delete reviews" ON reviews FOR DELETE TO service_role USING (true);

-- 3. Doctor Profiles
CREATE TABLE IF NOT EXISTS doctor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    specialty TEXT,
    bio TEXT,
    verified BOOLEAN DEFAULT false,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE doctor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public doctor profiles are viewable by everyone" ON doctor_profiles FOR SELECT USING (true);
CREATE POLICY "Anyone can submit doctor profiles" ON doctor_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update doctor profiles" ON doctor_profiles FOR UPDATE TO service_role USING (true);

-- 4. Federation Posts
CREATE TABLE IF NOT EXISTS federation_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    specialty TEXT,
    category TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    "commentsList" JSONB DEFAULT '[]'::jsonb,
    upvotes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    timestamp TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE federation_posts ENABLE ROW LEVEL SECURITY;
-- For now, public selects can view all (the frontend filters out pending if not admin)
CREATE POLICY "Public posts are viewable by everyone" ON federation_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can submit federation posts" ON federation_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update federation posts (upvotes/comments)" ON federation_posts FOR UPDATE USING (true);

-- 5. Partner Requests
CREATE TABLE IF NOT EXISTS partner_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    organization TEXT,
    email TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE partner_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit partner requests" ON partner_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can View partner requests" ON partner_requests FOR SELECT TO service_role USING (true);
CREATE POLICY "Admins can update partner requests" ON partner_requests FOR UPDATE TO service_role USING (true);

-- 6. Federation Notifications
CREATE TABLE IF NOT EXISTS federation_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT,
    message TEXT NOT NULL,
    link TEXT,
    "isRead" BOOLEAN DEFAULT false,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE federation_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public notifications are viewable" ON federation_notifications FOR SELECT USING (true);
CREATE POLICY "Anyone can create notifications (triggers)" ON federation_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update notifications (mark read)" ON federation_notifications FOR UPDATE USING (true);
