"use client";
import React from 'react';
import { useAdmin } from '../admin/AdminContext';
import { useFederationStore } from '../../store/federationStore';

export default function AdminBar() {
    const { isAdmin, isEditMode, setIsEditMode } = useAdmin();
    // Use federation logout safely, it already handles the event dispatch
    const logoutAdmin = useFederationStore(state => state.logoutAdmin);

    if (!isAdmin) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-[99999] bg-[#166534] border-b-4 border-[#22c55e] py-2 px-6 shadow-[0_4px_20px_rgba(34,197,94,0.3)] flex justify-between items-center transition-all">
            <div className="flex items-center gap-6">
               <p className="font-sans text-white text-xs tracking-widest font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#22c55e] text-lg">admin_panel_settings</span>
                  JAMMI CMS ACTIVE
               </p>
               
               <div className="h-4 w-px bg-white/30" />
               
               <label className="flex items-center cursor-pointer gap-2 group">
                  <div className="relative">
                     <input type="checkbox" className="sr-only" checked={isEditMode} onChange={(e) => setIsEditMode(e.target.checked)} />
                     <div className={`block w-10 h-6 rounded-full transition-colors ${isEditMode ? 'bg-[#22c55e]' : 'bg-black/50'}`}></div>
                     <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isEditMode ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <div className={`text-xs font-bold tracking-wider uppercase transition-colors ${isEditMode ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                     Edit Mode {isEditMode ? 'ON' : 'OFF'}
                  </div>
               </label>
            </div>

            <button 
                onClick={logoutAdmin}
                className="font-sans text-white/70 text-xs tracking-wider font-bold hover:text-white transition-colors flex items-center gap-1"
            >
                <span className="material-symbols-outlined text-sm">logout</span>
                EXIT
            </button>
        </div>
    );
}
