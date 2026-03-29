# Jammi Pharmaceuticals — Project Context

## Overview
127-year-old Ayurvedic pharmaceutical company website. E-commerce, consultation booking, admin CMS, Charak chatbot.
**Live site**: https://jammi.in/

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (no green! Base: `#FDF9F0`)
- **State**: Zustand (cart) + React Context (cart, auth)
- **DB**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Payments**: Razorpay (webhook at `/api/razorpay-webhook`)
- **Email**: Resend (order confirmations)
- **Icons**: Lucide React

## Key Files
| Purpose | Path |
|---|---|
| Supabase client | `lib/supabase.ts` |
| Admin CRUD helpers | `lib/adminDb.ts` |
| Admin API client (browser) | `lib/adminApi.js` |
| Admin auth middleware | `lib/adminAuth.ts` |
| Storage uploads | `lib/storage.ts` |
| Cart (Zustand) | `store/cartStore.ts` |
| Cart (Context) | `context/CartContext.tsx` |
| Mock products | `constants.tsx` |
| DB schema | `supabase_new_schema.sql` |
| Order creation API | `app/api/create-order/route.ts` |
| Razorpay webhook | `app/api/razorpay-webhook/route.ts` |

## Environment Variables (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JAMMI_BYPASS_TOKEN=JAMMI_ADMIN_MASTER_KEY_2024
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RESEND_API_KEY=
```

## Database Tables
`site_users`, `admin_users`, `categories`, `products`, `product_variants`, `carts`, `orders`, `order_items`, `reviews`, `bundles`, `bundle_products`, `coupons`, `cms_content`, `cms_banners`, `cms_blogs`, `cms_static_pages`, `cms_announcement`, `federation_posts`, `federation_comments`, `partner_requests`, `shipping_methods`, `inventory_log`, `payments`, `customers`

## API Routes
- `app/api/_admin/*` — 43 admin routes (products, orders, CMS, etc.)
- `app/api/create-order/` — guest checkout order creation
- `app/api/razorpay-webhook/` — payment capture/failure handling
- `app/api/send-shipping-email/` — shipping notification

## Admin Auth Flow
1. User taps footer logo → login modal
2. Supabase Auth `signInWithPassword()`
3. Lookup in `admin_users` table (must have `status='active'`)
4. Bypass token: `JAMMI_ADMIN_MASTER_KEY_2024` (for offline dev)

## Important Rules
- **NO GREEN** anywhere in UI
- All imagery must be **Indian context**
- Minimum 3-4 product image angles
- Admin panel hidden (footer logo tap only)
- Partner With Us button NOT on Consultation page

## Dev Commands
```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Start production server
```
