# Jammi Pharmaceuticals 🌿

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-Database-FF0080)](https://convex.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)

An enterprise-grade, full-stack E-Commerce and Academic Discourse platform tailored for Jammi Pharmaceuticals. Built with **Next.js (App Router)** and natively powered by **Convex**.

## 🚀 Features

### 🛍️ E-Commerce & Checkout
- **Dynamic Catalog:** Real-time synchronization of Categories, Bundles, and Products directly from the database.
- **Persistent Data:** Secure saving of Customer Shipping Addresses directly to their profiles upon checkout.
- **Email Triggers:** Automated transactional emails (Resend API) routing out on Order Placement and Fulfillment operations.

### 🏛️ The Federation Discourse (Quora-style Forum)
- **Peer-Reviewed Posting:** A dedicated, elegant Discourse layer for Academic Ayurvedic discussions.
- **Doctor Applications:** Specialized onboarding `/api/doctor-application` route verifying practitioners and triggering admin notifications.
- **Upvotes & Threaded Comments:** Complete Discourse engine with real-time UI components querying Convex database.

### 🛡️ Admin Security & Access Control
- **Role-Based Permissions:** Granular control matrix dictating View/Add/Edit/Delete access for Staff, Managers, and Super Admins.
- **User Management Dash:** Create new staff, delete accounts, and manage admin user permissions.
- **Zero-Downtime Resilience:** Global API fetch wrappers designed to intercept Next.js 500 boundaries, suppressing UI-breaking `JSON.parse` crashes.

### 📸 Content Management
- **Dynamic CMS:** Content management system powered by Convex for real-time updates.
- **CMS Builder:** Edit Hero Banners, Shop copy, Blog Posts, and global Announcements from a graphical interface.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TailwindCSS, Framer Motion
- **Backend Environment:** Vercel / Node Edge runtime
- **Database:** Convex (Real-time database with type-safe queries)
- **Email Delivery:** Resend
- **State Management:** Zustand (`federationStore`, `cmsStore`)

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or above
- A Convex account and project (sign up at https://convex.dev)
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
   Create a `.env.local` file with:
   ```env
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   RESEND_API_KEY=your_resend_api_key
   JAMMI_BYPASS_TOKEN=your_admin_bypass_token
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Launch the Development Server**
   ```bash
   npm run dev
   ```
   *Navigate to [http://localhost:3000](http://localhost:3000) to view the client application, and `/admin` for the Admin Dashboard.*

## 📂 Architecture

The application uses **Convex** as the primary database with:
- Real-time data synchronization
- Type-safe queries and mutations
- Server-side functions in `/convex/functions`
- Automatic schema management

---

*(Built internally by HyperWrike Engineering)*
