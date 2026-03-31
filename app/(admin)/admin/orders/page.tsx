"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import OrderDetailModal from './OrderDetailModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '';
      const res = await fetch(`/api/admin/orders?search=${search}&status=${statusFilter}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const json = await res.json();
      setOrders((json.data || []).map((o: any) => ({ ...o, id: o._id || o.id })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchOrders, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-500';
      case 'processing': return 'bg-blue-500/10 text-blue-500';
      case 'shipped': return 'bg-purple-500/10 text-purple-500';
      case 'delivered': return 'bg-green-500/10 text-green-500';
      case 'cancelled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Orders Fulfillment</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Track and process customer purchases</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#111118] border border-white/5 p-4 rounded-2xl shadow-xl">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
            <input 
              type="text" 
              placeholder="Search Order # or Customer Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-colors"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50 transition-colors min-w-[200px]"
          >
            <option value="">All Statuses</option>
            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
               <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Payment</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {loading ? (
                   <tr>
                     <td colSpan={7} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                           <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                           <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Sychronizing Orders...</span>
                        </div>
                     </td>
                   </tr>
                ) : orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-100 italic">#{order.order_number}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-100">{order.customer_name}</div>
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-tight">{order.site_users?.email}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 text-xs">
                       {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 font-black text-white">₹{order.total_amount}</td>
                    <td className="py-4 px-4">
                       <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                         order.payment_status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                       }`}>
                         {order.payment_status}
                       </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                       <button 
                         onClick={() => setSelectedOrderId(order.id)}
                         className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5 transition"
                       >
                         Manage
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-slate-500 italic font-medium">No order found matching criteria</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrderId && (
          <OrderDetailModal 
            orderId={selectedOrderId} 
            onClose={() => setSelectedOrderId(null)} 
            onUpdate={fetchOrders}
          />
        )}
      </div>
    </AdminLayout>
  );
}
