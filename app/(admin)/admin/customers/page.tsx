"use client";

import React, { useState, useEffect } from 'react';
import CustomerDetailModal from './CustomerDetailModal';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/customers?search=${search}&status=${statusFilter}`);
      const { data } = await res.json();
      setCustomers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Customer Management</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Manage your site users and relationship history</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#111118] border border-white/5 p-4 rounded-2xl shadow-xl">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
            <input 
              type="text" 
              placeholder="Search Name, Email or User Code..."
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
            <option value="active">ACTIVE</option>
            <option value="blocked">BLOCKED</option>
          </select>
        </div>

        {/* Customers Table */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="py-4 px-6">User Code</th>
                  <th className="py-4 px-4">Profile Info</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Orders</th>
                  <th className="py-4 px-4">Joined</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5 font-medium">
                {loading ? (
                   <tr>
                     <td colSpan={6} className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                           <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                           <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Hydrating Customer Data...</span>
                        </div>
                     </td>
                   </tr>
                ) : customers.length > 0 ? customers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition group">
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-black uppercase text-slate-400 border border-white/5">
                        {c.user_code}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-100">{c.name || 'Anonymous User'}</div>
                      <div className="text-[10px] text-slate-500 font-black uppercase truncate max-w-[150px]">{c.email || 'No Email'}</div>
                    </td>
                    <td className="py-4 px-4">
                       <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                         c.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                       }`}>
                         {c.status}
                       </span>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-slate-500">shopping_bag</span>
                          <span className="font-black text-white">{c.order_count}</span>
                       </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-xs">
                       {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                       <button 
                         onClick={() => setSelectedCustomerId(c.id)}
                         className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5 transition"
                       >
                         View Details
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center text-slate-500 italic">No customers found matching search</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCustomerId && (
          <CustomerDetailModal 
            customerId={selectedCustomerId} 
            onClose={() => setSelectedCustomerId(null)} 
            onUpdate={fetchCustomers}
          />
        )}
      </div>
    
  );
}
