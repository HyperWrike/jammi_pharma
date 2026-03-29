// Frontend API client — all admin components use these functions
// Never call supabase directly from admin panel components for writes

import { supabase } from './supabase'

async function getToken() {
  if (typeof window !== 'undefined') {
    const bypass = localStorage.getItem('jammi_bypass_token');
    if (bypass) return bypass;
  }
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) throw new Error('No admin session. Please log in again.')
  return session.access_token
}

async function adminFetch(path, options = {}) {
  const token = await getToken()
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const headers = {
    'Authorization': `Bearer ${token}`,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {})
  }
  const res = await fetch(path, { ...options, headers })
  const text = await res.text();
  let data;
  try {
     data = text ? JSON.parse(text) : {};
  } catch (err) {
     throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
  }
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status} ${res.statusText}`)
  return data
}

export const productsApi = {
  list:   (p = {}) => adminFetch(`/api/admin/products?${new URLSearchParams(p)}`),
  get:    (id)     => adminFetch(`/api/admin/products/${id}`),
  create: (d)      => adminFetch('/api/admin/products', { method: 'POST', body: JSON.stringify(d) }),
  update: (id, d)  => adminFetch(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  delete: (id)     => adminFetch(`/api/admin/products/${id}`, { method: 'DELETE' }),
}

export const categoriesApi = {
  list:   ()       => adminFetch('/api/admin/categories'),
  create: (d)      => adminFetch('/api/admin/categories', { method: 'POST', body: JSON.stringify(d) }),
  update: (id, d)  => adminFetch(`/api/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  delete: (id)     => adminFetch(`/api/admin/categories/${id}`, { method: 'DELETE' }),
}

export const ordersApi = {
  list:         (p = {}) => adminFetch(`/api/admin/orders?${new URLSearchParams(p)}`),
  get:          (id)     => adminFetch(`/api/admin/orders/${id}`),
  updateStatus: (id, d)  => adminFetch(`/api/admin/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify(d) }),
}

export const customersApi = {
  list:         (p = {}) => adminFetch(`/api/admin/customers?${new URLSearchParams(p)}`),
  get:          (id)     => adminFetch(`/api/admin/customers/${id}`),
  updateStatus: (id, d)  => adminFetch(`/api/admin/customers/${id}`, { method: 'PATCH', body: JSON.stringify(d) }),
}

export const reviewsApi = {
  list:     (p = {}) => adminFetch(`/api/admin/reviews?${new URLSearchParams(p)}`),
  moderate: (id, s)  => adminFetch(`/api/admin/reviews/${id}`, { method: 'PATCH', body: JSON.stringify({ status: s }) }),
  delete:   (id)     => adminFetch(`/api/admin/reviews/${id}`, { method: 'DELETE' }),
}

export const inventoryApi = {
  list:        ()       => adminFetch('/api/admin/inventory'),
  updateStock: (id, d)  => adminFetch(`/api/admin/inventory/${id}`, { method: 'PATCH', body: JSON.stringify(d) }),
  history:     (id)     => adminFetch(`/api/admin/inventory/${id}/history`),
}

export const couponsApi = {
  list:   ()       => adminFetch('/api/admin/coupons'),
  create: (d)      => adminFetch('/api/admin/coupons', { method: 'POST', body: JSON.stringify(d) }),
  update: (id, d)  => adminFetch(`/api/admin/coupons/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  delete: (id)     => adminFetch(`/api/admin/coupons/${id}`, { method: 'DELETE' }),
  toggle: (id, s)  => adminFetch(`/api/admin/coupons/${id}/toggle`, { method: 'PATCH', body: JSON.stringify({ status: s }) }),
}

export const bundlesApi = {
  list:   ()       => adminFetch('/api/admin/bundles'),
  create: (d)      => adminFetch('/api/admin/bundles', { method: 'POST', body: JSON.stringify(d) }),
  update: (id, d)  => adminFetch(`/api/admin/bundles/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  delete: (id)     => adminFetch(`/api/admin/bundles/${id}`, { method: 'DELETE' }),
}

export const shippingApi = {
  list:   ()       => adminFetch('/api/admin/shipping'),
  create: (d)      => adminFetch('/api/admin/shipping', { method: 'POST', body: JSON.stringify(d) }),
  update: (id, d)  => adminFetch(`/api/admin/shipping/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  delete: (id)     => adminFetch(`/api/admin/shipping/${id}`, { method: 'DELETE' }),
}

export const cmsApi = {
  getContent:      (page)    => adminFetch(`/api/admin/cms/content?page=${page}`),
  saveContent:     (updates) => adminFetch('/api/admin/cms/content', { method: 'POST', body: JSON.stringify({ updates }) }),
  getBanners:      ()        => adminFetch('/api/admin/cms/banners'),
  saveBanner:      (d)       => adminFetch('/api/admin/cms/banners', { method: d.id ? 'PUT' : 'POST', body: JSON.stringify(d) }),
  deleteBanner:    (id)      => adminFetch(`/api/admin/cms/banners/${id}`, { method: 'DELETE' }),
  reorderBanners:  (ids)     => adminFetch('/api/admin/cms/banners/reorder', { method: 'POST', body: JSON.stringify({ ids }) }),
  getBlogs:        ()        => adminFetch('/api/admin/cms/blogs'),
  saveBlog:        (d)       => adminFetch('/api/admin/cms/blogs', { method: d.id ? 'PUT' : 'POST', body: JSON.stringify(d) }),
  deleteBlog:      (id)      => adminFetch(`/api/admin/cms/blogs/${id}`, { method: 'DELETE' }),
  getPage:         (key)     => adminFetch(`/api/admin/cms/pages/${key}`),
  savePage:        (key, c)  => adminFetch(`/api/admin/cms/pages/${key}`, { method: 'PUT', body: JSON.stringify({ content: c }) }),
  getAnnouncement: ()        => adminFetch('/api/admin/cms/announcement'),
  saveAnnouncement:(d)       => adminFetch('/api/admin/cms/announcement', { method: 'PUT', body: JSON.stringify(d) }),
}

export const federationApi = {
  listPosts:       (p = {}) => adminFetch(`/api/admin/federation/posts?${new URLSearchParams(p)}`),
  moderatePost:    (id, s)  => adminFetch(`/api/admin/federation/posts/${id}`, { method: 'PATCH', body: JSON.stringify({ status: s }) }),
  deletePost:      (id)     => adminFetch(`/api/admin/federation/posts/${id}`, { method: 'DELETE' }),
  listPartners:    (p = {}) => adminFetch(`/api/admin/federation/partners?${new URLSearchParams(p)}`),
  moderatePartner: (id, s)  => adminFetch(`/api/admin/federation/partners/${id}`, { method: 'PATCH', body: JSON.stringify({ status: s }) }),
}

export const rolesApi = {
  listAdmins:      ()      => adminFetch('/api/admin/roles/users'),
  createAdmin:     (d)     => adminFetch('/api/admin/roles/users', { method: 'POST', body: JSON.stringify(d) }),
  updateAdmin:     (id, d) => adminFetch(`/api/admin/roles/users/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  deleteAdmin:     (id)    => adminFetch(`/api/admin/roles/users/${id}`, { method: 'DELETE' }),
  getPermissions:  ()      => adminFetch('/api/admin/roles/permissions'),
  savePermissions: (d)     => adminFetch('/api/admin/roles/permissions', { method: 'POST', body: JSON.stringify(d) }),
}

export const reportsApi = {
  dashboard: ()  => adminFetch('/api/admin/reports/dashboard'),
  sales:     (p) => adminFetch(`/api/admin/reports/sales?${new URLSearchParams(p)}`),
  customers: (p) => adminFetch(`/api/admin/reports/customers?${new URLSearchParams(p)}`),
  products:  (p) => adminFetch(`/api/admin/reports/products?${new URLSearchParams(p)}`),
}

export const imagesApi = {
  upload: async (file, bucket = 'cms-images', folder = '') => {
    const token = await getToken()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', bucket)
    formData.append('folder', folder)
    const res = await fetch('/api/admin/images/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    })
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('Upload API returned non-JSON response'); }
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data.url
  },
  delete: (url, bucket) => adminFetch('/api/admin/images/delete', {
    method: 'POST',
    body: JSON.stringify({ url, bucket })
  }),
}

export const adminSessionApi = {
  login: async (email, password) => {
    const { supabase } = await import('./supabase')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message)

    const { data: adminRecord } = await supabase
      .from('admin_users')
      .select('id, name, role')
      .eq('auth_user_id', data.user.id)
      .eq('status', 'active')
      .single()

    if (!adminRecord) {
      await supabase.auth.signOut()
      throw new Error('This account does not have admin access.')
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('jammi_admin_session', 'true')
      localStorage.setItem('jammi_admin_role', adminRecord.role)
      localStorage.setItem('jammi_admin_name', adminRecord.name)
    }
    return { session: data.session, adminRecord }
  },

  logout: async () => {
    const { supabase } = await import('./supabase')
    await supabase.auth.signOut()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jammi_admin_session')
      localStorage.removeItem('jammi_admin_role')
      localStorage.removeItem('jammi_admin_name')
    }
  },

  check: async () => {
    const { supabase } = await import('./supabase')
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return null
    const { data } = await supabase
      .from('admin_users')
      .select('id, name, role, email')
      .eq('auth_user_id', session.user.id)
      .eq('status', 'active')
      .single()
    return data || null
  }
}
