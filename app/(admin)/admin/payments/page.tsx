"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '';
      const res = await fetch(`/api/admin/payments?status=${statusFilter}&search=${search}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const json = await res.json();
      const mapped = (json.data || []).map((p: any) => ({
        ...p,
        id: p._id || p.id,
        order_number: p.order_number || p.razorpay_order_id || p.order_id || p.transaction_id || 'N/A',
        customer_name: p.customer_name || 'N/A',
        payment_method: p.payment_method || p.method || 'N/A',
        total_amount: p.total_amount ?? p.amount ?? 0,
        payment_status: p.payment_status || p.status || 'pending',
      }));
      setPayments(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchPayments, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, search]);

  return (
    <AdminLayout>
      <div className="space-y-6 font-medium">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase italic underline decoration-green-500/30 underline-offset-8">Financial Operations</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-3">Track all transaction data and payment settlements</p>
          </div>
          <div className="flex bg-[#111118] border border-white/5 rounded-xl p-1 shadow-lg">
             {['all', 'paid', 'unpaid', 'refunded'].map(s => (
                <button 
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    statusFilter === s ? 'bg-green-500/10 text-green-500 shadow-inner' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s}
                </button>
             ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 bg-[#111118] border border-white/5 p-4 rounded-2xl shadow-xl">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xl">search</span>
            <input 
              type="text" 
              placeholder="Search Transaction ID or Order #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all font-mono"
            />
          </div>
        </div>

        <div className="bg-[#111118] border border-white/5 rounded-3xl shadow-2xl overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                <tr>
                  <th className="py-5 px-8">Order REF</th>
                  <th className="py-5 px-4 font-black">Customer</th>
                  <th className="py-5 px-4 text-center">Gateway</th>
                  <th className="py-5 px-4 text-center text-white">Amount</th>
                  <th className="py-5 px-4 text-center">Status</th>
                  <th className="py-5 px-8 text-right">Settlement Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {loading ? (
                   <tr>
                     <td colSpan={6} className="py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                           <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                           <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic tracking-[0.2em]">Sychronizing GL Ledger...</span>
                        </div>
                     </td>
                   </tr>
                ) : payments.length > 0 ? payments.map((p) => (
                  <tr key={p.id} className="hover:bg-green-500/[0.02] transition-colors group">
                    <td className="py-5 px-8">
                       <span className="px-3 py-1 bg-white/5 rounded border border-white/5 text-[10px] font-black text-slate-400 group-hover:text-green-500 group-hover:border-green-500/30 transition-all">
                          #{p.order_number}
                       </span>
                    </td>
                    <td className="py-5 px-4 font-black text-slate-100 uppercase tracking-tight">{p.customer_name}</td>
                    <td className="py-5 px-4 text-center">
                       <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                          <span className="material-symbols-outlined text-[14px] text-slate-500 font-black">account_balance_wallet</span>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{p.payment_method || 'COD'}</span>
                       </div>
                    </td>
                    <td className="py-5 px-4 text-center font-black text-white text-base">₹{p.total_amount}</td>
                    <td className="py-5 px-4 text-center">
                       <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${
                         p.payment_status === 'paid' ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 
                         p.payment_status === 'refunded' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 
                         'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                       }`}>
                         {p.payment_status}
                       </span>
                    </td>
                    <td className="py-5 px-8 text-right text-slate-500 text-xs font-bold uppercase tracking-widest italic">
                       {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="py-32 text-center text-slate-600 italic tracking-tighter">Zero matching transactions detected in current fiscal period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
