import { supabase } from './supabase';

export async function adminFetch(url: string, options: RequestInit = {}) {
  let token = '';
  
  // Try to get the session from Supabase
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    token = session.access_token;
  } else {
    // Fallback: Check if bypass token is in localStorage (mostly for local dev)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jammi_bypass_token');
      if (stored) token = stored;
    }
  }

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
