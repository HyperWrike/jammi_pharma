export async function adminLogin(email: string, password: string) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('Login failed'); }

  if (!res.ok) throw new Error(data.error || 'Login failed');

  if (data.token && typeof window !== 'undefined') {
    localStorage.setItem('jammi_admin_token', data.token);
    localStorage.setItem('jammi_admin_session', 'true');
    localStorage.setItem('jammi_admin_name', data.email || 'Admin');
  }

  return data;
}

export async function adminLogout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jammi_admin_session');
    localStorage.removeItem('jammi_admin_token');
    localStorage.removeItem('jammi_admin_role');
    localStorage.removeItem('jammi_admin_name');
    localStorage.removeItem('jammi_cms_session');
    localStorage.removeItem('jammi_bypass_token');
    sessionStorage.removeItem('jammi_admin_session');
    sessionStorage.removeItem('jammi_edit_mode');
  }
}

export async function checkAdminSession() {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('jammi_admin_session');
    if (session === 'true') return { active: true };
  }
  return null;
}
