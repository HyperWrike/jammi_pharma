"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type OrderRow = {
  _id: string;
  order_number?: string;
  created_at?: string;
  total_amount?: number;
  payment_status?: string;
  order_status?: string;
  payment_method?: string;
};

function formatCurrency(value?: number) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`;
}

function formatDate(value?: string) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AccountOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const hasOrders = useMemo(() => orders.length > 0, [orders]);

  async function loadOrders() {
    setLoading(true);
    setError(null);

    try {
      const sessionRes = await fetch('/api/auth/customer/session', { cache: 'no-store' });
      const sessionData = await sessionRes.json();

      if (!sessionRes.ok || !sessionData?.authenticated) {
        window.location.href = '/account/sign-in?next=/account/orders';
        return;
      }

      setEmail(sessionData.email || '');

      const ordersRes = await fetch('/api/account/orders', { cache: 'no-store' });
      const ordersData = await ordersRes.json();

      if (!ordersRes.ok) {
        throw new Error(ordersData?.error || 'Could not load orders.');
      }

      setOrders(ordersData?.data || []);
    } catch (err: any) {
      setError(err?.message || 'Could not load your order history.');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch('/api/auth/customer/logout', { method: 'POST' });
    window.location.href = '/account/sign-in';
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-white via-slate-50 to-white min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--purple)] font-bold">My Account</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Order History</h1>
            {email && <p className="text-sm text-slate-600 mt-1">Signed in as {email}</p>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadOrders}
              className="rounded-xl border border-slate-300 text-slate-700 px-4 py-2 text-sm font-semibold"
            >
              Refresh
            </button>
            <button
              onClick={logout}
              className="rounded-xl bg-[var(--purple)] text-white px-4 py-2 text-sm font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-600">Loading your orders...</div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-700">{error}</div>
        ) : !hasOrders ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h2 className="text-xl font-black text-slate-900">No orders yet</h2>
            <p className="text-slate-600 mt-2">You have not placed any orders with this email yet.</p>
            <Link
              href="/shop"
              className="inline-flex mt-5 rounded-xl bg-[var(--purple)] text-white px-5 py-3 font-bold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article key={order._id} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-bold">Order Number</p>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                      {order.order_number || order._id}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">Placed on {formatDate(order.created_at)}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-black text-[var(--purple)]">{formatCurrency(order.total_amount)}</p>
                    <p className="text-sm text-slate-600 mt-1">{order.payment_method || 'Online Payment'}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
                    Order: {order.order_status || 'pending'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                    Payment: {order.payment_status || 'pending'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
