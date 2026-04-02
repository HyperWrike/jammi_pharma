"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPanelFloatingLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem("jammi_admin_session");
      const role = sessionStorage.getItem("jammi_role");
      if (session === "true" && role !== "editor") {
        setIsAdmin(true);
      }
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <Link 
      href="/admin/dashboard" 
      className="fixed bottom-8 right-8 z-[100] bg-slate-900 text-saffron px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-2 border border-saffron/50"
    >
      <span className="material-symbols-outlined text-sm">shield_person</span>
      Admin Panel
    </Link>
  );
}
