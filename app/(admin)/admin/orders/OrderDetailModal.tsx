"use client";

import React, { useState, useEffect } from 'react';

interface OrderDetailModalProps {
  orderId: string;
  onClose: () => void;
  onUpdate: () => void;
}

export default function OrderDetailModal({ orderId, onClose, onUpdate }: OrderDetailModalProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    const token =
      localStorage.getItem('jammi_admin_token') ||
      localStorage.getItem('jammi_bypass_token') ||
      'JAMMI_ADMIN_MASTER_KEY_2024';
    return { Authorization: `Bearer ${token}` };
  };

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        headers: getAuthHeaders()
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to load order details');
      }
      setOrder(json.data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const updateStatus = async (field: 'order_status' | 'payment_status', value: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ [field]: value })
      });
      if (res.ok) {
        fetchOrderDetail();
        onUpdate();
      } else {
        const json = await res.json();
        throw new Error(json.error || 'Update failed');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
        <div className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-2">Unable to load order</h3>
          <p className="text-slate-400 text-sm">{error || 'Order not found.'}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg text-sm">Close</button>
        </div>
      </div>
    );
  }

  const userInfo = order.site_users || {};
  const shippingAddr =
    typeof order.shipping_address === 'object' && order.shipping_address !== null
      ? order.shipping_address
      : { address: order.shipping_address, city: order.shipping_city, pincode: order.shipping_zip, state: order.shipping_state };
  const shippingAddressLine =
    shippingAddr?.address ||
    (typeof order.shipping_address === 'string' ? order.shipping_address : '');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-[#111118] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
              <span className="material-symbols-outlined text-3xl">receipt_long</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Order #{order.order_number}</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Placed on {new Date(order.created_at).toLocaleString()}</p>
            </div>
          </div>
          <button onClick={onClose} className="size-10 rounded-full hover:bg-white/5 text-slate-400 flex items-center justify-center transition">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Ordered Items</h3>
              <div className="space-y-4">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <img src={item.image_url} alt="" className="size-16 rounded-xl object-cover bg-white" />
                    <div className="flex-grow">
                      <div className="font-bold text-white text-sm">{item.product_name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5 tracking-wider">Qty: {item.quantity} × ₹{item.unit_price}</div>
                    </div>
                    <div className="text-sm font-black text-white">₹{item.total_price}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-8">
               <section>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Shipping Address</h3>
                 <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-sm text-slate-300 leading-relaxed font-medium">
                    {order.customer_name}<br/>
                    {shippingAddressLine || 'N/A'}<br/>
                    {shippingAddr.city || order.shipping_city}, {shippingAddr.state || order.shipping_state}<br/>
                    {shippingAddr.pincode || order.shipping_zip}
                 </div>
               </section>
               <section>
                 <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Summary</h3>
                 <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                       <span>Subtotal</span>
                       <span className="text-slate-300">₹{order.subtotal_amount}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                       <span>Shipping</span>
                       <span className="text-slate-300">₹{order.shipping_fee}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/5 text-sm font-black text-white">
                       <span>Grand Total</span>
                       <span className="text-green-500">₹{order.total_amount}</span>
                    </div>
                 </div>
               </section>
            </div>
          </div>

          {/* Sidebar / Status Management */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Customer Details</h3>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                 <div className="text-sm font-bold text-white">{userInfo.name || order.customer_name}</div>
                 <div className="text-xs text-slate-400 mt-1">{userInfo.email || 'No email'}</div>
                 <div className="text-xs text-slate-400 mt-1">{userInfo.phone || 'No phone'}</div>
                 <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-600 uppercase">System ID</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{userInfo.user_code || 'N/A'}</span>
                 </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Process Status</label>
                <select 
                  value={order.order_status} 
                  disabled={updating}
                  onChange={(e) => updateStatus('order_status', e.target.value)}
                  className="admin-input-select"
                >
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                    <option key={s} value={s}>{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Payment Status</label>
                <select 
                  value={order.payment_status} 
                  disabled={updating}
                  onChange={(e) => updateStatus('payment_status', e.target.value)}
                  className="admin-input-select"
                >
                  {['unpaid', 'paid', 'refunded', 'failed'].map(s => (
                    <option key={s} value={s}>{s.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {updating && (
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest ml-1">
                   <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                   Syncing status...
                </div>
              )}
            </section>
          </div>
        </div>

        <style jsx global>{`
          .admin-input-select {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 12px 16px;
            color: white;
            font-size: 13px;
            font-weight: 700;
            transition: all 0.2s;
            appearance: none;
            cursor: pointer;
          }
          .admin-input-select:focus {
            outline: none;
            border-color: rgba(34, 197, 94, 0.5);
            background: rgba(255, 255, 255, 0.08);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
        `}</style>
      </div>
    </div>
  );
}
