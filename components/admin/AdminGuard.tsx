"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const sessionFlag = localStorage.getItem("jammi_admin_session");
      const adminToken = localStorage.getItem('jammi_admin_token');
      
      if (sessionFlag === 'true' && adminToken) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    }

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('jammi_admin_token', data.token);
          localStorage.setItem('jammi_admin_session', 'true');
          setAuthorized(true);
        }
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Jammi Pharma</h1>
            <p className="text-slate-400">Admin Login</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                defaultValue="admin@jammi.in"
                placeholder="Email"
                className="w-full bg-[#1a1a1a] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                defaultValue="Admin@pass"
                placeholder="Password"
                className="w-full bg-[#1a1a1a] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
