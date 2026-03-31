# Jammi Pharmaceuticals - Admin Panel Setup Guide

## Issues Fixed

This PR addresses all admin panel routing and Supabase connection issues:

### 1. Routing Issues Fixed
- ✅ Removed duplicate `/app/_admin/` directory
- ✅ Consolidated all admin routes to `/app/(admin)/admin/`
- ✅ Created proper `layout.tsx` for admin route group
- ✅ Removed double AdminLayout wrapping from all pages
- ✅ Fixed Next.js 16 App Router compliance

### 2. Build Errors Fixed
- ✅ Removed `styled-jsx` syntax (not supported in Next.js 16)
- ✅ Fixed Google Fonts loading to use CDN links
- ✅ Added custom scrollbar CSS to globals.css
- ✅ Build now compiles successfully

### 3. Supabase Connection Verified
- ✅ All admin API routes use correct `supabaseAdmin` client
- ✅ Admin authentication uses proper token verification
- ✅ Bypass token support for development: `JAMMI_ADMIN_MASTER_KEY_2024`

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file with your Supabase credentials:

```bash
cp .env.example .env.local
```

Then update with your actual values:
- Get Supabase URL and keys from https://app.supabase.com/project/_/settings/api
- Set Razorpay keys from your Razorpay dashboard
- Set Resend API key from your Resend account

### 2. Database Setup

Run the main schema in Supabase SQL Editor:
```sql
-- Run supabase_new_schema.sql first (already exists in repo)
```

Then run the sample data:
```sql
-- Run sample_data.sql to populate test data
```

### 3. Create Admin User

**Option A: Use Bypass Token (Quick Testing)**
- Set `JAMMI_BYPASS_TOKEN=JAMMI_ADMIN_MASTER_KEY_2024` in `.env.local`
- Access admin panel at `/admin/dashboard`
- Login will be bypassed automatically

**Option B: Create Proper Admin User**
1. Go to Supabase Auth Dashboard
2. Create a new user (e.g., admin@jammipharma.com)
3. Copy the user's UUID from Auth Users table
4. Run in Supabase SQL Editor:
```sql
INSERT INTO admin_users (auth_user_id, name, email, role, status)
VALUES ('paste-user-uuid-here', 'Admin Name', 'admin@jammipharma.com', 'admin', 'active');
```

### 4. Access Admin Panel

- **URL**: https://jammi.in/admin/dashboard (or http://localhost:3000/admin/dashboard locally)
- **Hidden Access**: Tap footer logo 3 times on any page
- **Direct Login**: Navigate to `/admin/dashboard` and login with your admin credentials

## Testing Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access admin panel
open http://localhost:3000/admin/dashboard
```

## Deployment to Vercel

### Configure Environment Variables in Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JAMMI_BYPASS_TOKEN`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `RAZORPAY_WEBHOOK_SECRET`
   - `RESEND_API_KEY`

### Deploy

```bash
# Using Vercel CLI
vercel --prod

# Or push to main branch and Vercel will auto-deploy
git push origin main
```

## Admin Panel Features

### Available Sections
- ✅ Dashboard - Analytics and overview
- ✅ Products - Product management
- ✅ Categories - Category management
- ✅ Orders - Order processing
- ✅ Customers - Customer management
- ✅ Payments - Payment tracking
- ✅ Inventory - Stock management
- ✅ Coupons - Discount codes
- ✅ Bundles - Product bundles
- ✅ Shipping - Shipping methods
- ✅ Reviews - Review moderation
- ✅ Reports - Sales reports
- ✅ CMS - Content management
- ✅ Federation - Partner network
- ✅ Roles - Admin user management

### Sample Data Included

The `sample_data.sql` file includes:
- 5 sample products (Chyawanprash, Triphala, Ashwagandha, etc.)
- 5 product categories
- 3 shipping methods
- 3 discount coupons
- Homepage banners
- Announcement bar content

## Verification Checklist

- [ ] Environment variables configured
- [ ] Database schema loaded
- [ ] Sample data loaded
- [ ] Admin user created
- [ ] Can login to admin panel
- [ ] All admin sections load correctly
- [ ] API routes respond properly
- [ ] Build completes successfully
- [ ] Deployed to Vercel

## Support

If you encounter any issues:
1. Check Supabase connection in browser console
2. Verify environment variables are set
3. Check Vercel deployment logs
4. Ensure admin user exists in `admin_users` table

---

**Admin Panel URL Structure:**
- Development: `http://localhost:3000/admin/*`
- Production: `https://jammi.in/admin/*`

**Default Bypass Token**: `JAMMI_ADMIN_MASTER_KEY_2024`
