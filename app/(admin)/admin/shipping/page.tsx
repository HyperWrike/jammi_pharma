"use client";

import React, { useState, useEffect } from 'react';

export default function ShippingPage() {
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<any>(null);

  const fetchMethods = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/shipping');
      const data = await res.json();
      setMethods(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this shipping method?')) return;
    try {
      await fetch(`/api/admin/shipping/${id}`, { method: 'DELETE' });
      fetchMethods();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Shipping Methods</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Configure delivery carriers and rate structures</p>
          </div>
          <button 
            onClick={() => { setEditingMethod(null); setShowModal(true); }}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            Add Shipping Method
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {loading ? (
              Array(3).fill(0).map((_, i) => (
                 <div key={i} className="bg-[#111118] border border-white/5 rounded-3xl p-6 animate-pulse h-48"></div>
              ))
           ) : methods.length > 0 ? methods.map((method) => (
              <div key={method.id} className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition group relative">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-green-500/30 transition-colors">
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-green-500 transition-colors">local_shipping</span>
                       </div>
                       <div>
                          <h3 className="font-black text-white uppercase tracking-tight leading-none">{method.name}</h3>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{method.carrier}</p>
                       </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                       method.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                       {method.status}
                    </span>
                 </div>

                 <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rate Type</span>
                       <span className="text-[10px] font-black text-white uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded">{method.rate_type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cost</span>
                       <span className="text-sm font-black text-white">₹{method.base_cost}</span>
                    </div>
                    {method.rate_type === 'free_above' && (
                       <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-[9px]">Threshold</span>
                          <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">₹{method.free_above_amount}</span>
                       </div>
                    )}
                 </div>

                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setEditingMethod(method); setShowModal(true); }}
                      className="flex-grow py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                    >
                       Configure
                    </button>
                    <button 
                      onClick={() => handleDelete(method.id)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition border border-red-500/10"
                    >
                       <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                 </div>
              </div>
           )) : (
              <div className="col-span-full py-32 text-center text-slate-600 italic">No shipping methods configured.</div>
           )}
        </div>

        {showModal && (
           <ShippingModal 
             method={editingMethod} 
             onClose={() => setShowModal(false)} 
             onUpdate={fetchMethods} 
           />
        )}
      </div>
    
  );
}

function ShippingModal({ method, onClose, onUpdate }: any) {
  const [formData, setFormData] = useState({
    name: method?.name || '',
    carrier: method?.carrier || '',
    rate_type: method?.rate_type || 'flat',
    base_cost: method?.base_cost || 0,
    free_above_amount: method?.free_above_amount || '',
    estimated_delivery: method?.estimated_delivery || '',
    status: method?.status || 'active'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Map empty strings to null for numeric database fields
      const payload = {
        ...formData,
        free_above_amount: formData.free_above_amount === '' ? null : Number(formData.free_above_amount)
      };

      const url = method ? `/api/admin/shipping/${method.id}` : '/api/admin/shipping';
      const verb = method ? 'PUT' : 'POST';
      await fetch(url, {
        method: verb,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg bg-[#111118] border border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
         <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{method ? 'Configure Method' : 'Add Shipping Method'}</h2>
         
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2">
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Display Name</label>
               <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50" placeholder="e.g. Standard Delivery" />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Carrier</label>
               <input required type="text" value={formData.carrier} onChange={(e) => setFormData({...formData, carrier: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50" placeholder="e.g. BlueDart" />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Estimated Days</label>
               <input type="text" value={formData.estimated_delivery} onChange={(e) => setFormData({...formData, estimated_delivery: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50" placeholder="e.g. 3-5 Days" />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Rate Type</label>
               <select value={formData.rate_type} onChange={(e) => setFormData({...formData, rate_type: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50">
                  <option value="flat">Flat Rate</option>
                  <option value="weight_based">Weight Based</option>
                  <option value="free_above">Free Above Amount</option>
               </select>
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Base Cost (₹)</label>
               <input required type="number" value={formData.base_cost} onChange={(e) => setFormData({...formData, base_cost: Number(e.target.value)})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50" />
            </div>
            {formData.rate_type === 'free_above' && (
               <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Free Delivery Above (₹)</label>
                  <input type="number" value={formData.free_above_amount} onChange={(e) => setFormData({...formData, free_above_amount: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50" />
               </div>
            )}
            <div className="col-span-2">
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status</label>
               <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
               </select>
            </div>
         </div>

         <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-grow py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition">Cancel</button>
            <button type="submit" disabled={saving} className="flex-grow py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20">
               {saving ? 'Processing...' : (method ? 'Save Changes' : 'Create Method')}
            </button>
         </div>
      </form>
    </div>
  );
}
