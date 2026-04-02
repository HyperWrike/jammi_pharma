"use client";
import React from 'react';
import { useAdmin } from './AdminContext';

const EditModeToggle: React.FC = () => {
  const { isAdmin, isEditMode, setIsEditMode, logout } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3 pointer-events-none">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-2xl border border-forest/20 pointer-events-auto">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase transition-all ${
            isEditMode 
              ? 'bg-saffron text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
              : 'bg-forest text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isEditMode ? 'edit_off' : 'edit_note'}
          </span>
          {isEditMode ? 'Live Edit: ON' : 'Live Edit: OFF'}
        </button>
        
        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Logout Admin"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
      
      {isEditMode && (
        <div className="bg-saffron text-white px-4 py-1 rounded text-[10px] font-bold uppercase tracking-tighter animate-pulse shadow-lg">
          Click on any text to edit
        </div>
      )}
    </div>
  );
};

export default EditModeToggle;
