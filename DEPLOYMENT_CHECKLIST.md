# Vercel Deployment Checklist for Jammi Pharmaceuticals

## Pre-Deployment

### 1. Supabase Setup
- [ ] Run `supabase_new_schema.sql` in Supabase SQL Editor
- [ ] Run `sample_data.sql` in Supabase SQL Editor
- [ ] Create admin user in Supabase Auth Dashboard
- [ ] Link admin user to `admin_users` table with INSERT query
- [ ] Verify all tables are created correctly

### 2. Environment Variables Collection

Gather these values before deploying:

#### Supabase (from https://app.supabase.com/project/_/settings/api)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`: https://xxxxx.supabase.co
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`: eyJxxx...
- [ ] `SUPABASE_SERVICE_ROLE_KEY`: eyJxxx... (⚠️ Keep secret!)

#### Razorpay (from https://dashboard.razorpay.com)
- [ ] `RAZORPAY_KEY_ID`: rzp_xxx
- [ ] `RAZORPAY_KEY_SECRET`: xxx (⚠️ Keep secret!)
- [ ] `RAZORPAY_WEBHOOK_SECRET`: xxx (⚠️ Keep secret!)

#### Resend (from https://resend.com/api-keys)
- [ ] `RESEND_API_KEY`: re_xxx

#### Admin Bypass Token (for testing)
- [ ] `JAMMI_BYPASS_TOKEN`: JAMMI_ADMIN_MASTER_KEY_2024

## Vercel Deployment Steps

### Option 1: Using Vercel Dashboard

1. **Connect Repository**
   - [ ] Go to https://vercel.com/new
   - [ ] Import `HyperWrike/jammi_pharma` repository
   - [ ] Select `claude/fix-admin-panel-supabase-connection` branch (or merge to main first)

2. **Configure Project**
   - [ ] Framework Preset: Next.js
   - [ ] Root Directory: `./`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `.next`

3. **Add Environment Variables**
   - [ ] Click "Environment Variables"
   - [ ] Add all variables from checklist above
   - [ ] Set for: Production, Preview, Development
   - [ ] Click "Deploy"

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add RAZORPAY_KEY_ID production
vercel env add RAZORPAY_KEY_SECRET production
vercel env add RAZORPAY_WEBHOOK_SECRET production
vercel env add RESEND_API_KEY production
vercel env add JAMMI_BYPASS_TOKEN production

# Deploy
vercel --prod
```

## Post-Deployment Testing

### 1. Basic Functionality
- [ ] Site loads correctly at production URL
- [ ] Homepage renders without errors
- [ ] Shop page displays products
- [ ] No console errors

### 2. Admin Panel Access
- [ ] Navigate to `/admin/dashboard`
- [ ] Login page appears (if not using bypass token)
- [ ] Can login with admin credentials
- [ ] Dashboard loads with stats

### 3. Admin Panel Features
- [ ] **Dashboard**: Stats and charts display
- [ ] **Products**: Can view product list
- [ ] **Products**: Can create new product
- [ ] **Products**: Can edit existing product
- [ ] **Products**: Can delete product
- [ ] **Categories**: Can view categories
- [ ] **Categories**: Can create/edit category
- [ ] **Orders**: Orders list displays
- [ ] **Customers**: Customer list displays
- [ ] **Inventory**: Stock levels show
- [ ] **Coupons**: Coupon list displays
- [ ] **CMS**: Content sections load
- [ ] **API Routes**: All admin API routes respond (check network tab)

### 4. Supabase Connection
- [ ] Check browser console for Supabase errors
- [ ] Verify data loads from database
- [ ] Test create/update/delete operations
- [ ] Check Supabase logs for API calls

### 5. Performance
- [ ] Lighthouse score > 80
- [ ] First Contentful Paint < 2s
- [ ] No layout shifts
- [ ] Images load correctly

## Rollback Plan

If deployment fails:

```bash
# Revert to previous deployment
vercel rollback

# Or redeploy previous commit
git revert HEAD
git push origin main
```

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify Supabase credentials are correct
- Check Vercel build logs

### Admin Panel Won't Load
1. Check browser console for errors
2. Verify Supabase connection
3. Check admin user exists in database
4. Try using bypass token: `JAMMI_BYPASS_TOKEN=JAMMI_ADMIN_MASTER_KEY_2024`

### Database Errors
1. Verify schema was run successfully
2. Check RLS policies are correct
3. Verify service role key has admin access
4. Check Supabase logs

### API Route Errors
1. Check environment variables in Vercel
2. Verify Supabase admin client initialization
3. Check admin authentication middleware
4. Review Vercel function logs

## Environment Variable Reference

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Yes | Supabase admin key |
| `JAMMI_BYPASS_TOKEN` | Secret | No | Admin bypass for testing |
| `RAZORPAY_KEY_ID` | Public | Yes | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Secret | Yes | Razorpay secret key |
| `RAZORPAY_WEBHOOK_SECRET` | Secret | Yes | Razorpay webhook secret |
| `RESEND_API_KEY` | Secret | Yes | Resend email API key |

## Monitoring

After deployment:
- [ ] Set up Vercel Analytics
- [ ] Enable Supabase monitoring
- [ ] Configure error tracking (Sentry recommended)
- [ ] Set up uptime monitoring

## Success Criteria

✅ Deployment successful when:
- Build completes without errors
- Site loads at production URL
- Admin panel accessible and functional
- All CRUD operations work
- No console errors
- Database connections stable

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Production URL**: ___________
**Status**: ⬜ Success / ⬜ Failed / ⬜ Partial
