"use client";

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'jammi_cookie_preference';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setVisible(!saved);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice: 'allow' | 'deny') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[120] md:left-auto md:right-6 md:max-w-md">
      <div className="rounded-2xl border border-[var(--yellow)]/40 bg-[var(--purple)] text-white p-5 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--yellow)] font-bold mb-2">Cookie Consent</p>
        <p className="text-sm leading-relaxed text-white/90">
          We use cookies to improve your experience and analytics. You can allow or decline non-essential cookies.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => choose('deny')}
            className="flex-1 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => choose('allow')}
            className="flex-1 rounded-full bg-[var(--yellow)] text-[var(--purple)] px-4 py-2 text-sm font-black hover:brightness-95 transition-colors"
          >
            Allow Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
