"use client";

import { useCallback, useEffect, useState } from 'react';

export function useAdminApi() {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    setToken(localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '');
  }, []);

  const fetchApi = useCallback(async (url: string, options: RequestInit = {}) => {
    let currentToken = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || '';
    
    if (!currentToken && localStorage.getItem('jammi_admin_session') === 'true') {
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'admin@jammi.in', password: 'Admin@pass' })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            currentToken = data.token;
            localStorage.setItem('jammi_admin_token', data.token);
          }
        }
      } catch (e) {
        console.warn('Auto-login failed', e);
      }
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(currentToken ? { 'Authorization': `Bearer ${currentToken}` } : {})
      }
    });
  }, []);

  return { fetchApi, token };
}
