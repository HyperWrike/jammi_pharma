# Jammi Pharmaceuticals 🌿

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)

An enterprise-grade, full-stack E-Commerce and Academic Discourse platform tailored for Jammi Pharmaceuticals. Built with **Next.js (App Router)** and natively powered by **Supabase**.

## 🚀 Features

### 🛍️ E-Commerce & Checkout
- **Dynamic Catalog:** Real-time synchronization of Categories, Bundles, and Products directly from the database.
- **Persistent Data:** Secure saving of Customer Shipping Addresses directly to their profiles upon checkout.
- **Email Triggers:** Automated transactional emails (Resend API) routing out on Order Placement and Fulfillment operations.

### 🏛️ The Federation Discourse (Quora-style Forum)
- **Peer-Reviewed Posting:** A dedicated, elegant Discourse layer for Academic Ayurvedic discussions.
- **Doctor Applications:** Specialized onboarding `/api/doctor-application` route verifying practitioners and triggering admin notifications. 
- **Upvotes & Threaded Comments:** Complete Discourse engine with real-time UI components natively querying Supabase DB.

### 🛡️ Admin Security & Access Control
- **Role-Based Permissions:** Granular control matrix dictating View/Add/Edit/Delete access for Staff, Managers, and Super Admins.
- **User Management Dash:** Create new staff, delete accounts, and securely force **Password Resets** straight via Supabase Auth server SDKs.
- **Zero-Downtime Resilience:** Global API fetch wrappers designed to intercept Next.js 500 boundaries, suppressing UI-breaking `JSON.parse` crashes.

### 📸 Content Management
- **Automated Media Migrations:** Included Node Scripts capable of dynamically sweeping local `/public` assets, porting them to Supabase Storage CDNs, and seamlessly fuzzy-matching SQL linking.
- **CMS Builder:** Edit Hero Banners, Shop copy, Blog Posts, and global Announcements from a graphical interface.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TailwindCSS, Framer Motion
- **Backend Environment:** Vercel / Node Edge runtime
- **Database & Auth:** Supabase (PostgreSQL), Next.js Route Handlers
- **Email Delivery:** Resend
- **State Management:** Zustand (`federationStore`, `cmsStore`)

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or above
- A Supabase Project (populated via the included `supabase_*.sql` schemas)
- A Resend API Key for Email pipelines

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HyperWrike/jammi_pharma.git
   cd jammi_pharma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file referencing the `.env.example`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Launch the Development Server**
   ```bash
   npm run dev
   ```
   *Navigate to [http://localhost:3000](http://localhost:3000) to view the client application, and `/admin` for the Admin Dashboard.*

## 📂 Architecture Scripts
The `/scripts` directory houses several production utility scripts used during initial setup:
- `upload-images.mjs` - Bulk transfers local directory images up to Supabase cloud buckets.
- `seed-database.mjs` - Initial hydration of categories, products, and default administrative parameters.

---

*(Built internally by HyperWrike Engineering)*
