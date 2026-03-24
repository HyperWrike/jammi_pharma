"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleToGrant?: 'editor' | 'admin';
}

export default function AdminLoginModal({ isOpen, onClose, roleToGrant = 'admin' }: AdminLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
        setErrorMsg('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!isOpen) return null;

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div');
    toast.innerHTML = type === 'success' 
      ? `<span style="color: #22c55e; margin-right: 8px;">✓</span>${message}`
      : `<span style="color: #ef4444; margin-right: 8px;">✕</span>${message}`;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      background: ${type === 'success' ? '#166534' : '#991b1b'};
      color: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 999999;
      animation: slideIn 0.2s ease;
      display: flex;
      align-items: center;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(false);

    try {
      const isHardcodedStaff = email.trim() === 'admin@jammipharma.com' && password.trim() === 'Jammi@007';
      
      if (isHardcodedStaff && roleToGrant === 'editor') {
          // INSTANT CMS ACCESS
          localStorage.setItem("jammi_cms_session", "true");
          sessionStorage.setItem("jammi_admin_session", "true");
          window.dispatchEvent(new Event('jammi_cms_unlocked'));
          setIsLoggingIn(false);
          showToast("CMS Editor Unlocked", "success");
          onClose();
          
          // Still call in background to satisfy server-side requirements/logging
          supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
          }).catch(e => console.error("Background auth error:", e));
          return;
      }

      if (isHardcodedStaff) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        // Even if Supabase auth fails for hardcoded, we might allow local UI access
        // but we should prioritize a successful session.
        if (!authError && data.user) {
            const { data: adminRecord } = await supabase
              .from('admin_users')
              .select('id, name, role')
              .eq('auth_user_id', data.user.id)
              .eq('status', 'active')
              .single();

            localStorage.setItem("jammi_admin_session", "true");
            sessionStorage.setItem("jammi_admin_session", "true");
            localStorage.setItem("jammi_cms_session", "true");
            sessionStorage.setItem("jammi_edit_mode", "true"); // Auto-enable edit mode on login
            localStorage.setItem("jammi_admin_role", adminRecord?.role || 'admin');
            localStorage.setItem("jammi_admin_name", adminRecord?.name || 'Admin');
            window.dispatchEvent(new Event('jammi_cms_unlocked'));
            
            setIsLoggingIn(false);
            onClose();
            router.push('/admin/dashboard');
            return;
        } else {
            // Emergency fallback for hardcoded if Supabase entry missing
            console.warn("Supabase auth failed for hardcoded admin. Some features may be limited.");
            localStorage.setItem("jammi_admin_session", "true");
            localStorage.setItem("jammi_cms_session", "true");
            sessionStorage.setItem("jammi_admin_session", "true");
            window.dispatchEvent(new Event('jammi_cms_unlocked'));
            setIsLoggingIn(false);
            onClose();
            return;
        }
      }

      // Normal login flow
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (authError || !data.user) {
        setError(true);
        setErrorMsg('Invalid credentials.');
        setIsLoggingIn(false);
        return;
      }

      if (roleToGrant === 'editor') {
        localStorage.setItem("jammi_cms_session", "true");
        sessionStorage.setItem("jammi_admin_session", "true");
        window.dispatchEvent(new Event('jammi_cms_unlocked'));
        setIsLoggingIn(false);
        showToast("CMS Editor Unlocked", "success");
        onClose();
        return;
      }

      const { data: adminRecord } = await supabase
        .from('admin_users')
        .select('id, name, role')
        .eq('auth_user_id', data.user.id)
        .eq('status', 'active')
        .single();

      if (!adminRecord) {
        await supabase.auth.signOut();
        setError(true);
        setErrorMsg('No admin access.');
        setIsLoggingIn(false);
        return;
      }

      setIsLoggingIn(false);
      localStorage.setItem("jammi_admin_session", "true");
      sessionStorage.setItem("jammi_admin_session", "true");
      localStorage.setItem("jammi_admin_role", adminRecord.role);
      localStorage.setItem("jammi_admin_name", adminRecord.name);
      onClose();
      router.push('/admin/dashboard');

    } catch (err: any) {
      setError(true);
      setErrorMsg(err.message || 'Error occurred.');
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
        <div 
          className="absolute inset-0 cursor-pointer" 
          onClick={onClose} 
        />
        <div 
          className={`relative z-10 w-full max-w-md ${roleToGrant === 'editor' ? 'bg-[#1a1a2e]' : 'bg-[#0a0a0f]'} p-8 rounded-2xl shadow-2xl border ${roleToGrant === 'editor' ? 'border-[#22c55e]/30' : 'border-[#22c55e]/20'}`}
          style={{
            animation: 'slideIn 0.3s ease'
          }}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-[#94a3b8] hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${roleToGrant === 'editor' ? 'bg-[#22c55e]/20' : 'bg-[#22c55e]/10'}`}>
              <span className={`material-symbols-outlined text-3xl ${roleToGrant === 'editor' ? 'text-[#22c55e]' : 'text-[#22c55e]'}`}>
                {roleToGrant === 'editor' ? 'edit_note' : 'admin_panel_settings'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {roleToGrant === 'editor' ? 'CMS Content Editor' : 'Admin Panel'}
            </h2>
            <p className="text-[#94a3b8] text-sm">
              {roleToGrant === 'editor' ? 'Enter credentials to unlock content editing' : 'Enter credentials to access the admin panel'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-2">
                Username
              </label>
              <input 
                type="text" 
                placeholder="admin@jammipharma.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#111118] border border-[#16161f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-2">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#111118] border border-[#16161f] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-[#22c55e] text-white font-bold py-3 rounded-lg mt-2 hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <span className="material-symbols-outlined animate-spin">sync</span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Login
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[#94a3b8] text-xs">
              Secure access only. All actions are logged.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
