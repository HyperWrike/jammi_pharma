"use client";
import React from 'react';
import { useAdmin } from './AdminContext';

export default function EditorBanner() {
  const { isEditMode, setIsEditMode, isAdmin, logout } = useAdmin();

  if (!isAdmin || !isEditMode) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-green-600 text-white px-4 py-2 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2 font-bold text-sm">
        <span className="material-symbols-outlined text-[18px]">edit_note</span>
        Live Editor Mode Active
      </div>
      <div className="flex gap-4">
        <button 
          onClick={() => setIsEditMode(false)} 
          className="text-xs font-bold hover:text-green-200 transition-colors"
        >
          Exit Editor
        </button>
        <button 
          onClick={logout} 
          className="text-xs font-bold hover:text-red-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
