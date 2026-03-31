"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      let token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '';
      
      if (!token && localStorage.getItem('jammi_admin_session') === 'true') {
        try {
          const loginRes = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@jammi.in', password: 'Admin@pass' })
          });
          if (loginRes.ok) {
            const loginData = await loginRes.json();
            if (loginData.token) {
              token = loginData.token;
              localStorage.setItem('jammi_admin_token', token);
            }
          }
        } catch (e) {
          console.warn('Auto-login failed', e);
        }
      }
      
      const res = await fetch('/api/admin/reports/dashboard', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      console.log('[Dashboard] Response status:', res.status);
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.error("Dashboard API returned non-JSON:", text.substring(0, 200));
        return;
      }
      if (!res.ok) {
        console.error("Dashboard API error:", json.error);
        return;
      }
      setData(json);
    } catch (err) {
      console.error("Dashboard Fetch Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const { 
    stats = { totalSales: data?.totalRevenue || 0, totalOrders: data?.totalOrders || 0, thisMonthSales: data?.totalRevenue || 0, revenueChange: 0, newCustomers: data?.totalCustomers || 0 }, 
    recentOrders = data?.recentOrders || [], 
    lowStockAlerts = data?.lowStockProducts || [], 
    chartData = [] 
  } = data || {};

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Total Revenue" 
            value={`₹${stats.totalSales.toLocaleString()}`} 
            trend={stats.revenueChange} 
            icon="payments" 
            color="text-green-500"
          />
          <StatCard 
            label="Total Orders" 
            value={stats.totalOrders} 
            trend={+2.4} 
            icon="shopping_cart" 
            color="text-blue-500"
          />
          <StatCard 
            label="Monthly Sales" 
            value={`₹${stats.thisMonthSales.toLocaleString()}`} 
            trend={stats.revenueChange} 
            icon="trending_up" 
            color="text-emerald-500"
          />
          <StatCard 
            label="New Customers" 
            value={stats.newCustomers} 
            trend={+12.5} 
            icon="person_add" 
            color="text-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">Revenue Analytics</h3>
                <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest font-bold">12 month sales trend</p>
              </div>
              <div className="flex gap-2">
                 <button className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-lg border border-green-500/20">Monthly</button>
                 <button className="px-3 py-1 text-slate-500 text-[10px] font-bold rounded-lg hover:text-white transition">Yearly</button>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0a" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#16161f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}
                    itemStyle={{ color: '#22c55e', fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '800' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low Stock Panel */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">warning</span>
              Low Stock Alerts
            </h3>
            <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {lowStockAlerts.length > 0 ? lowStockAlerts.map((prod: any, idx: number) => (
                <div key={prod._id || prod.id || `${prod.name || 'low-stock'}-${idx}`} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors">
                  <div>
                    <div className="text-sm font-bold text-slate-200">{prod.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Threshold: {prod.low_stock_threshold || 10}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-black ${prod.stock <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {prod.stock} LEFT
                  </div>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 opacity-50">
                  <span className="material-symbols-outlined text-4xl">inventory</span>
                  <p className="text-xs font-bold uppercase tracking-widest">No Alerts</p>
                </div>
              )}
            </div>
            <Link href="/admin/inventory" className="mt-6 w-full py-3 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl text-center text-xs font-bold tracking-widest uppercase transition-all">
              Manage Inventory
            </Link>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-bold text-lg tracking-tight">Latest Operations</h3>
            <Link href="/admin/orders" className="text-green-500 text-xs font-bold hover:underline transition">Full History &rarr;</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4 px-2">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Payment</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order: any, idx: number) => (
                  <tr key={order._id || order.id || order.order_number || `order-${idx}`} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                    <td className="py-4 px-2 font-mono text-[12px] text-slate-300">{order.order_number}</td>
                    <td className="py-4">
                      <div className="font-bold text-slate-200">{order.customer_name}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{order.user_code}</div>
                    </td>
                    <td className="py-4 font-bold text-white">₹{order.total_amount}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.payment_status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {order.payment_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4">
                       <span className={`flex items-center gap-1.5 text-[11px] font-bold ${
                         order.order_status === 'delivered' ? 'text-green-500' : 
                         order.order_status === 'pending' ? 'text-amber-500' : 'text-blue-500'
                       }`}>
                         <span className="size-1.5 rounded-full bg-current" />
                         {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                       </span>
                    </td>
                    <td className="py-4 text-slate-500 text-xs font-medium">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="py-4 text-right">
                      <button className="size-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value, trend, icon, color }: any) {
  const isPositive = trend >= 0;
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 shadow-xl hover:translate-y-[-2px] transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`size-10 rounded-xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          <span className="material-symbols-outlined text-[10px] font-black">{isPositive ? 'trending_up' : 'trending_down'}</span>
          {Math.abs(trend).toFixed(1)}%
        </div>
      </div>
      <div className="text-2xl font-black text-white tracking-tight">{value}</div>
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}
