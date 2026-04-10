"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
  { name: 'Categories', path: '/admin/categories', icon: 'category' },
  { name: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
  { name: 'Customers', path: '/admin/customers', icon: 'group' },
  { name: 'Payments', path: '/admin/payments', icon: 'payments' },
  { name: 'Inventory', path: '/admin/inventory', icon: 'storefront' },
  { name: 'Coupons', path: '/admin/coupons', icon: 'local_offer' },
  { name: 'Bundles', path: '/admin/bundles', icon: 'inventory' },
  { name: 'Shipping', path: '/admin/shipping', icon: 'local_shipping' },
  { name: 'Reviews', path: '/admin/reviews', icon: 'reviews' },
  { name: 'Reports', path: '/admin/reports', icon: 'analytics' },
  { name: 'Federation', path: '/admin/federation', icon: 'forum' },
  { name: 'Partners', path: '/admin/partners', icon: 'handshake' },
  { name: 'Blogs', path: '/admin/blogs', icon: 'article' },
  { name: 'Contact Requests', path: '/admin/contact-requests', icon: 'contact_mail' },
  { name: 'Roles', path: '/admin/roles', icon: 'manage_accounts' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const name = localStorage.getItem('jammi_admin_name');
    if (name) setAdminName(name);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("jammi_admin_session");
    localStorage.removeItem("jammi_admin_role");
    localStorage.removeItem("jammi_admin_name");
    localStorage.removeItem("jammi_admin_token");
    localStorage.removeItem("jammi_cms_session");
    localStorage.removeItem("jammi_bypass_token");
    sessionStorage.removeItem("jammi_admin_session");
    sessionStorage.removeItem("jammi_edit_mode");

    window.dispatchEvent(new Event('jammi_cms_unlocked'));

    router.push('/');
  };

  return (
    <aside className="w-60 bg-[#0a0a0f] h-full flex flex-col shadow-2xl flex-shrink-0 z-50 border-r border-[#22c55e]/20">
      <div className="p-6 border-b border-[#22c55e]/10 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#22c55e] tracking-wider select-none" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>JAMMI ADMIN</h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#22c55e]/20 scrollbar-track-transparent">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname ? (pathname === item.path || pathname.startsWith(item.path + '/')) : false;
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center gap-3 px-5 py-2.5 transition-all duration-200 outline-none ${isActive ? 'bg-[#22c55e]/10 text-[#22c55e] border-l-4 border-[#22c55e] font-semibold' : 'text-[#94a3b8] hover:bg-[#16161f] hover:text-[#f1f5f9]'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-[#22c55e]/10">
        <div className="mb-3 px-2">
          <p className="text-[#94a3b8] text-xs font-medium">Logged in as</p>
          <p className="text-[#f1f5f9] text-sm font-semibold truncate">{adminName}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-[#111118] text-[#94a3b8] hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-lg transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
