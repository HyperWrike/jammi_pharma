"use client";
import React, { useState, useEffect } from 'react';

export default function JammiToast() {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 3000);
    };

    window.addEventListener('jammi_toast', handleToast as EventListener);
    return () => window.removeEventListener('jammi_toast', handleToast as EventListener);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999999] pointer-events-none">
      <div 
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
          toast.type === 'success' 
            ? 'bg-[#166534] border border-[#22c55e]/50 text-white' 
            : 'bg-red-950 border border-red-500/50 text-red-100'
        } backdrop-blur-md animate-slide-up`}
      >
        <span className="material-symbols-outlined text-2xl">
          {toast.type === 'success' ? 'check_circle' : 'error'}
        </span>
        <span className="font-semibold tracking-wide text-sm">{toast.message}</span>
      </div>
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(100px); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(0); opacity: 0; }
        }
        .animate-slide-up {
          animation: slide-up 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
