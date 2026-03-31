"use client";

import React, { useState, useEffect } from 'react';
import BundleFormModal from '@/app/(admin)/admin/bundles/BundleFormModal';

export default function BundlesPage() {
  const [bundles, setBundles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBundle, setEditingBundle] = useState<any>(null);

  const fetchBundles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bundles');
      const data = await res.json();
      setBundles(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product bundle?')) return;
    try {
      await fetch(`/api/admin/bundles/${id}`, { method: 'DELETE' });
      fetchBundles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Product Bundles</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Create high-value product combinations and discounts</p>
          </div>
          <button 
            onClick={() => { setEditingBundle(null); setShowModal(true); }}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">package_2</span>
            Create New Bundle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {loading ? (
              Array(3).fill(0).map((_, i) => (
                 <div key={i} className="bg-[#111118] border border-white/5 rounded-3xl p-6 animate-pulse h-64"></div>
              ))
           ) : bundles.length > 0 ? bundles.map((bundle) => (
              <div key={bundle.id} className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition flex flex-col group overflow-hidden">
                 <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-500/10">
                       {bundle.status}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       {bundle.extra_discount_percent}% Extra Discount
                    </span>
                 </div>

                 <h3 className="text-xl font-black text-white mb-2 leading-tight uppercase group-hover:text-green-500 transition-colors italic italic">
                    {bundle.name}
                 </h3>
                 <p className="text-xs text-slate-500 line-clamp-2 mb-6 font-medium">{bundle.description}</p>

                 <div className="flex -space-x-3 mb-6">
                    {bundle.bundle_products?.map((bp: any, idx: number) => (
                       <div key={idx} className="w-10 h-10 rounded-xl border-2 border-[#111118] bg-white/5 overflow-hidden shadow-lg transform hover:translate-y-[-2px] transition" title={bp.products?.name}>
                          <img src={bp.products?.images?.[0] || '/placeholder.png'} className="w-full h-full object-cover" />
                       </div>
                    ))}
                    {bundle.bundle_products?.length > 4 && (
                       <div className="w-10 h-10 rounded-xl border-2 border-[#111118] bg-white/10 flex items-center justify-center text-[10px] font-black text-slate-400">
                          +{bundle.bundle_products.length - 4}
                       </div>
                    )}
                 </div>

                 <div className="mt-auto flex items-center gap-2">
                    <button 
                      onClick={() => { setEditingBundle(bundle); setShowModal(true); }}
                      className="flex-grow py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                    >
                       Edit Bundle
                    </button>
                    <button 
                      onClick={() => handleDelete(bundle.id)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition border border-red-500/10"
                    >
                       <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                 </div>
              </div>
           )) : (
              <div className="col-span-full py-32 text-center text-slate-600 italic">No bundles currently active.</div>
           )}
        </div>

        {showModal && (
           <BundleFormModal 
             bundle={editingBundle} 
             onClose={() => setShowModal(false)} 
             onUpdate={fetchBundles} 
           />
        )}
      </div>
    
  );
}
