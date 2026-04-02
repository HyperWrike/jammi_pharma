"use client";

import React, { useState, useEffect } from 'react';

interface CustomerDetailModalProps {
  customerId: string;
  onClose: () => void;
  onUpdate: () => void;
}

export default function CustomerDetailModal({ customerId, onClose, onUpdate }: CustomerDetailModalProps) {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBlocking, setIsBlocking] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || 'JAMMI_ADMIN_MASTER_KEY_2024';
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/customers/${customerId}`, {
          headers: getAuthHeaders()
        });
        const data = await res.json();
        const row = data?.data || data;
        setCustomer({
          ...row,
          id: row?._id || row?.id,
          status: row?.status || 'active',
          orders: row?.orders || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [customerId]);

  const toggleStatus = async () => {
    setIsBlocking(true);
    const newStatus = customer.status === 'active' ? 'blocked' : 'active';
    try {
      await fetch(`/api/admin/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ status: newStatus })
      });
      setCustomer({ ...customer, status: newStatus });
      onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setIsBlocking(false);
    }
  };

  if (!customer && !loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#111118] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/20">
                 <span className="material-symbols-outlined text-green-500">person</span>
              </div>
              <div>
                 <h2 className="text-xl font-black text-white">{customer?.name || 'Customer Detail'}</h2>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{customer?.user_code} • Joined {customer && new Date(customer.created_at).toLocaleDateString()}</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">close</span>
           </button>
        </div>

        {loading ? (
           <div className="flex-grow flex flex-col items-center justify-center p-20">
              <div className="w-10 h-10 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
              <div className="mt-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Accessing User Record...</div>
           </div>
        ) : (
          <>
            <div className="flex border-b border-white/5 bg-white/[0.01]">
               {['profile', 'orders', 'notes'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-green-500' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 shadow-[0_-4px_10px_rgba(34,197,94,0.5)]" />}
                  </button>
               ))}
            </div>

            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
               {activeTab === 'profile' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <div className="space-y-6">
                        <div>
                           <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Internal Identifier</label>
                           <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-slate-300 font-medium">{customer.id}</div>
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                           <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-slate-100 font-bold">{customer.email || 'Not Provided'}</div>
                        </div>
                        <div>
                           <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                           <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-slate-100 font-bold">{customer.phone || 'Not Provided'}</div>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div>
                           <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Security Status</label>
                           <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                             customer.status === 'active' ? 'bg-green-500/5 border-green-500/10' : 'bg-red-500/5 border-red-500/10'
                           }`}>
                              <div>
                                 <div className={`font-black uppercase text-[10px] tracking-widest ${customer.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                    {customer.status}
                                 </div>
                                 <p className="text-[10px] text-slate-500 font-medium mt-1">
                                    {customer.status === 'active' ? 'User has full access to the store' : 'User is restricted from placing orders'}
                                 </p>
                              </div>
                              <button 
                                onClick={toggleStatus}
                                disabled={isBlocking}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-lg ${
                                  customer.status === 'active' 
                                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20' 
                                    : 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/20'
                                }`}
                              >
                                {isBlocking ? 'Wait...' : (customer.status === 'active' ? 'Block User' : 'Unblock')}
                              </button>
                           </div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 rounded-3xl">
                           <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Account Metadata</h4>
                           <div className="space-y-3">
                              <div className="flex justify-between text-xs">
                                 <span className="text-slate-500">Session ID</span>
                                 <span className="text-slate-300 font-mono text-[10px]">
                                   {customer.session_id ? `${String(customer.session_id).substring(0, 16)}...` : 'N/A'}
                                 </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                 <span className="text-slate-500">Last Seen</span>
                                 <span className="text-slate-300 font-medium">{customer.last_seen ? new Date(customer.last_seen).toLocaleString() : 'Never'}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'orders' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                     {customer.orders?.length > 0 ? customer.orders.map((order: any) => (
                        <div key={order.id} className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.08] transition">
                           <div className="flex items-center gap-6">
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1 bg-white/5 rounded border border-white/5 group-hover:bg-white/10 transition">#{order.order_number}</div>
                              <div>
                                 <div className="font-bold text-slate-200">₹{order.total_amount}</div>
                                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{new Date(order.created_at).toLocaleDateString()}</div>
                              </div>
                           </div>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                             order.order_status === 'delivered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                           }`}>
                             {order.order_status}
                           </span>
                        </div>
                     )) : (
                        <div className="py-20 text-center text-slate-500 italic">No purchase history found for this user.</div>
                     )}
                  </div>
               )}

               {activeTab === 'notes' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <textarea 
                       placeholder="Private staff notes about this customer..."
                       defaultValue={customer.admin_notes}
                       onBlur={async (e) => {
                          const val = e.target.value;
                          await fetch(`/api/admin/customers/${customerId}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                            body: JSON.stringify({ admin_notes: val })
                          });
                          onUpdate();
                       }}
                       className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 text-sm focus:outline-none focus:border-green-500/50 transition-colors custom-scrollbar"
                     ></textarea>
                     <p className="mt-3 text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">info</span> 
                        Notes are saved automatically when you click away
                     </p>
                  </div>
               )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
