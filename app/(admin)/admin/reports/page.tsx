"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '';
      const res = await fetch('/api/admin/reports/dashboard', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.error("Reports API returned non-JSON:", text.substring(0, 200));
        json = {};
      }
      const stats = {
        totalSales: json?.totalRevenue || 0,
        totalOrders: json?.totalOrders || 0,
        thisMonthSales: json?.totalRevenue || 0,
        revenueChange: 0,
        newCustomers: json?.totalCustomers || 0,
      };
      const recentOrders = (json?.recentOrders || []).map((o: any) => ({ ...o, id: o._id || o.id }));
      const lowStockAlerts = (json?.lowStockProducts || []).map((p: any) => ({ ...p, id: p._id || p.id }));
      setData({
        stats,
        recentOrders,
        lowStockAlerts,
        chartData: json?.chartData || [],
      });
    } catch (err) {
      console.error("Reports fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const exportReport = async (format: 'pdf' | 'csv') => {
    if (!data) return;

    if (format === 'pdf') {
      // Dynamic import for client-side only
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('Jammi Pharma - Sales Report', 20, 20);
      
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);
      
      doc.setFontSize(14);
      doc.text('Summary', 20, 45);
      doc.setFontSize(11);
      doc.text(`Total Sales: ₹${(data.stats?.totalSales || 0).toLocaleString()}`, 20, 55);
      doc.text(`Total Orders: ${data.stats?.totalOrders || 0}`, 20, 62);
      doc.text(`This Month: ₹${(data.stats?.thisMonthSales || 0).toLocaleString()}`, 20, 69);
      doc.text(`New Customers: ${data.stats?.newCustomers || 0}`, 20, 76);
      
      doc.setFontSize(14);
      doc.text('Recent Orders', 20, 92);
      doc.setFontSize(10);
      
      let yPos = 100;
      (data.recentOrders || []).slice(0, 10).forEach((order: any, idx: number) => {
        doc.text(`${idx + 1}. ${order.order_number} - ${order.customer_name} - ₹${order.total_amount} (${order.payment_status})`, 20, yPos);
        yPos += 7;
      });
      
      doc.save('jammi-sales-report.pdf');
    } else {
      const lines: string[] = [];
      lines.push('Section,Metric,Value');
      lines.push(`Summary,Total Sales,${data.stats?.totalSales || 0}`);
      lines.push(`Summary,Total Orders,${data.stats?.totalOrders || 0}`);
      lines.push(`Summary,This Month Sales,${data.stats?.thisMonthSales || 0}`);
      lines.push(`Summary,New Customers,${data.stats?.newCustomers || 0}`);
      lines.push('');
      lines.push('Recent Orders,Order Number,Customer,Amount,Payment Status,Order Status,Created At');
      (data.recentOrders || []).forEach((o: any) => {
        lines.push(`Order,${o.order_number || ''},${o.customer_name || ''},${o.total_amount || 0},${o.payment_status || ''},${o.order_status || ''},${o.created_at || ''}`);
      });
      const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'jammi-sales-report.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (loading) return (
    <AdminLayout>
       <div className="py-40 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
          <div className="mt-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Compiling Analytics Ledger...</div>
       </div>
    </AdminLayout>
  );

  if (!data || !data.stats) return (
    <AdminLayout>
       <div className="py-40 flex flex-col items-center justify-center">
          <div className="text-slate-500 text-sm">No data available. Please check database connection.</div>
          <button onClick={fetchReports} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-bold">Retry</button>
       </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic underline decoration-green-500/30 underline-offset-8">Intelligence Dashboard</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-4">Enterprise performance metrics and revenue analytics</p>
          </div>
          <button onClick={() => exportReport('csv')} className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center gap-2">
             <span className="material-symbols-outlined text-[18px]">table_chart</span>
             Export CSV
          </button>
          <button onClick={() => exportReport('pdf')} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-green-500/20">
             <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
             Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Revenue Trend */}
           <div className="bg-[#111118] border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[80px] rounded-full"></div>
              <h3 className="text-lg font-black text-white mb-8 uppercase tracking-tight flex items-center gap-2">
                 <span className="material-symbols-outlined text-green-500">trending_up</span>
                 Annual Revenue Velocity
              </h3>
              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.chartData || []}>
                       <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="label" stroke="#334155" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                       <YAxis stroke="#334155" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                         itemStyle={{ color: '#22c55e', fontWeight: 'bold', fontSize: '12px' }}
                       />
                       <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Performance Snapshot */}
           <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Cumulative Sales', val: `₹${(data.stats?.totalSales || 0).toLocaleString()}`, color: 'green', icon: 'payments' },
                { label: 'Total Volume', val: data.stats?.totalOrders || 0, color: 'blue', icon: 'local_mall' },
                { label: 'Monthly Delta', val: `₹${(data.stats?.thisMonthSales || 0).toLocaleString()}`, color: 'amber', icon: 'calendar_month' },
                { label: 'Client Growth', val: data.stats?.newCustomers || 0, color: 'purple', icon: 'person_add' }
              ].map((stat, i) => (
                 <div key={i} className="bg-[#111118] border border-white/5 rounded-[28px] p-6 hover:border-white/10 transition-all group active:scale-95 cursor-default">
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-4 border border-${stat.color}-500/10 group-hover:bg-${stat.color}-500 transition-colors`}>
                       <span className={`material-symbols-outlined text-${stat.color}-500 group-hover:text-white transition-colors`}>{stat.icon}</span>
                    </div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-2xl font-black text-white tracking-tight">{stat.val}</div>
                 </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-[32px] p-8">
              <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Recent Settlement Queue</h3>
               <div className="space-y-4">
                  {(data.recentOrders || []).slice(0, 5).map((o: any) => (
                    <div key={o.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-[10px] font-black text-green-500">{o.order_number.slice(-2)}</div>
                          <div>
                             <div className="text-sm font-black text-white uppercase tracking-tight">{o.customer_name}</div>
                             <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{o.order_number}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-sm font-black text-white">₹{o.total_amount}</div>
                          <div className={`text-[8px] font-black uppercase tracking-widest ${o.payment_status === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>{o.payment_status}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#111118] border border-white/5 rounded-[32px] p-8">
              <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Inventory Health</h3>
               <div className="space-y-6">
                  {(data.lowStockAlerts || []).length > 0 ? data.lowStockAlerts.map((p: any) => (
                    <div key={p.id}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest truncate max-w-[150px]">{p.name}</span>
                          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest font-mono">{p.stock} Units</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500" 
                            style={{ width: `${Math.min(100, (p.stock / (p.low_stock_threshold || 10)) * 100)}%` }} 
                          />
                       </div>
                    </div>
                 )) : (
                    <div className="py-20 text-center text-slate-600 italic text-sm">Perfect Stock Health (100%)</div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
