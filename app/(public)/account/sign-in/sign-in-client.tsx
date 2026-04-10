"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function CustomerSignInClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'setup'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signInWithPassword(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirmPassword && mode === 'setup') {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/customer/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Could not sign in with password.');
      }

      router.push(nextPath);
    } catch (err: any) {
      setError(err?.message || 'Could not sign in with password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-[70vh]">
      <div className="max-w-xl mx-auto px-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xl">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--purple)]">Customer Access</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Sign In to View Orders</h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Use your email and password to sign in. If this is your first time, set a password and continue.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-xl py-2.5 text-sm font-bold transition-colors ${mode === 'login' ? 'bg-white text-[var(--purple)] shadow-sm' : 'text-slate-600'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('setup')}
              className={`rounded-xl py-2.5 text-sm font-bold transition-colors ${mode === 'setup' ? 'bg-white text-[var(--purple)] shadow-sm' : 'text-slate-600'}`}
            >
              Set Password
            </button>
          </div>

          {message && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm font-medium">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={signInWithPassword}>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-[var(--purple)]/30"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-[var(--purple)]/30"
                placeholder="Enter your password"
              />
            </div>

            {mode === 'setup' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-[var(--purple)]/30"
                  placeholder="Confirm password"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--purple)] text-white py-3.5 font-bold tracking-wide disabled:opacity-60"
            >
              {loading ? (mode === 'setup' ? 'Saving Password...' : 'Signing In...') : (mode === 'setup' ? 'Set Password & Continue' : 'Sign In')}
            </button>
          </form>

          <div className="mt-7 text-sm text-slate-600">
            Need to place an order first? <Link href="/shop" className="font-bold text-[var(--purple)] hover:underline">Go to Store</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
