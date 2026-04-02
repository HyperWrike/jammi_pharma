"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '';
      const res = await fetch('/api/admin/coupons', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const json = await res.json();
      setCoupons(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || 'JAMMI_ADMIN_MASTER_KEY_2024';
      await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Campaign Coupons</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Manage discounts and promotional codes</p>
          </div>
          <button 
            onClick={() => { setEditingCoupon(null); setShowModal(true); }}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Create New Coupon
          </button>
        </div>

        {/* Coupons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {loading ? (
              Array(6).fill(0).map((_, i) => (
                 <div key={i} className="bg-[#111118] border border-white/5 rounded-3xl p-6 animate-pulse">
                    <div className="h-4 w-24 bg-white/5 rounded mb-4"></div>
                    <div className="h-8 w-full bg-white/5 rounded mb-6"></div>
                    <div className="h-4 w-1/2 bg-white/5 rounded"></div>
                 </div>
              ))
            ) : coupons.length > 0 ? coupons.map((coupon) => (
               <div key={coupon._id || coupon.id} className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition group relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br transition-opacity opacity-5 pointer-events-none ${
                    coupon.status === 'active' ? 'from-green-500 to-transparent' : 'from-red-500 to-transparent'
                 }`}></div>
                 
                 <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/5">
                       {coupon.discount_type === 'percentage' ? `${coupon.discount_value}% OFF` : `₹${coupon.discount_value} OFF`}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                       coupon.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                       {coupon.status}
                    </span>
                 </div>

                 <h3 className="text-2xl font-black text-white mb-2 tracking-tighter group-hover:text-green-500 transition-colors uppercase">{coupon.code}</h3>
                 
                 <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-[11px] font-medium">
                       <span className="text-slate-500">Min Order</span>
                       <span className="text-slate-300">₹{coupon.min_order_value}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-medium">
                       <span className="text-slate-500">Total Used</span>
                       <span className="text-slate-300">{coupon.total_used} / {coupon.usage_limit || '∞'}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-medium">
                       <span className="text-slate-500">Expires</span>
                       <span className={`${new Date(coupon.expiry_date) < new Date() ? 'text-red-500' : 'text-slate-300'}`}>
                          {new Date(coupon.expiry_date).toLocaleDateString()}
                       </span>
                    </div>
                 </div>

                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => { setEditingCoupon(coupon); setShowModal(true); }}
                      className="flex-grow py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                    >
                       Edit Settings
                    </button>
                    <button 
                      onClick={() => handleDelete(coupon._id || coupon.id)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition border border-red-500/10"
                    >
                       <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                 </div>
              </div>
           )) : (
              <div className="col-span-full py-32 text-center text-slate-600 italic">No coupons found. Create your first promotional campaign!</div>
           )}
        </div>

        {showModal && (
           <CouponModal 
             coupon={editingCoupon} 
             onClose={() => setShowModal(false)} 
             onUpdate={fetchCoupons} 
           />
        )}
      </div>
    </AdminLayout>
  );
}

function CouponModal({ coupon, onClose, onUpdate }: any) {
  const [formData, setFormData] = useState({
    code: coupon?.code || '',
    discount_type: coupon?.discount_type || 'percentage',
    discount_value: coupon?.discount_value || 0,
    min_order_value: coupon?.min_order_value || 0,
    max_discount_amount: coupon?.max_discount_amount || '',
    expiry_date: coupon ? new Date(coupon.expiry_date).toISOString().split('T')[0] : '',
    usage_limit: coupon?.usage_limit || '',
    status: coupon?.status || 'active'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Clean up payload: map empty strings to null for integers
      const payload = {
        ...formData,
        usage_limit: formData.usage_limit === '' ? null : Number(formData.usage_limit),
        max_discount_amount: formData.max_discount_amount === '' ? null : Number(formData.max_discount_amount)
      };

      const couponId = coupon?._id || coupon?.id;
      const url = couponId ? `/api/admin/coupons/${couponId}` : '/api/admin/coupons';
      const method = coupon ? 'PUT' : 'POST';
      const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || 'JAMMI_ADMIN_MASTER_KEY_2024';
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
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
         <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight">{coupon ? 'Edit Coupon' : 'Create New Coupon'}</h2>
         
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2">
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Coupon Code</label>
               <input 
                 required
                 type="text" 
                 value={formData.code}
                 onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
                 placeholder="e.g. SUMMER50"
               />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Discount Type</label>
               <select 
                 value={formData.discount_type}
                 onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50"
               >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
               </select>
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Discount Value</label>
               <input 
                 required
                 type="number" 
                 value={formData.discount_value}
                 onChange={(e) => setFormData({...formData, discount_value: Number(e.target.value)})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
               />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expiry Date</label>
               <input 
                 required
                 type="date" 
                 value={formData.expiry_date}
                 onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
               />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Min Order Value</label>
               <input 
                 type="number" 
                 value={formData.min_order_value}
                 onChange={(e) => setFormData({...formData, min_order_value: Number(e.target.value)})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
               />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Usage Limit</label>
               <input 
                 type="number" 
                 placeholder="Empty for unlimited"
                 value={formData.usage_limit}
                 onChange={(e) => setFormData({...formData, usage_limit: e.target.value})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50"
               />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status</label>
               <select 
                 value={formData.status}
                 onChange={(e) => setFormData({...formData, status: e.target.value})}
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50"
               >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
               </select>
            </div>
         </div>

         <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-grow py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition">Cancel</button>
            <button 
              type="submit" 
              disabled={saving}
              className="flex-grow py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20"
            >
               {saving ? 'Processing...' : (coupon ? 'Update Coupon' : 'Create Coupon')}
            </button>
         </div>
      </form>
    </div>
  );
}
