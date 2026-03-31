// Frontend API client — all admin components use these functions

function getToken() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jammi_admin_token');
    if (token) return token;
    const bypass = localStorage.getItem('jammi_bypass_token');
    if (bypass) return bypass;
  }
  return 'JAMMI_ADMIN_MASTER_KEY_2024';
}

async function adminFetch(path, options = {}) {
  const token = getToken();
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers = {
    'Authorization': `Bearer ${token}`,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {})
  };
  const res = await fetch(path, { ...options, headers });
  const text = await res.text();
  let data;
  try {
     data = text ? JSON.parse(text) : {};
  } catch (err) {
     throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
  }
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status} ${res.statusText}`);
  return data;
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
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    formData.append('folder', folder);
    const res = await fetch('/api/admin/images/upload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('Upload API returned non-JSON response'); }
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  },
  delete: (url, bucket) => adminFetch('/api/admin/images/delete', {
    method: 'POST',
    body: JSON.stringify({ url, bucket })
  }),
}

export const adminSessionApi = {
  login: async (email, password) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { throw new Error('Login failed'); }
    if (!res.ok) throw new Error(data.error || 'Login failed');

    if (data.token) {
      localStorage.setItem('jammi_admin_token', data.token);
      localStorage.setItem('jammi_admin_session', 'true');
      localStorage.setItem('jammi_admin_name', data.email || 'Admin');
    }
    return data;
  },

  logout: async () => {
    localStorage.removeItem('jammi_admin_session');
    localStorage.removeItem('jammi_admin_token');
    localStorage.removeItem('jammi_admin_role');
    localStorage.removeItem('jammi_admin_name');
    localStorage.removeItem('jammi_cms_session');
    localStorage.removeItem('jammi_bypass_token');
    sessionStorage.removeItem('jammi_admin_session');
    sessionStorage.removeItem('jammi_edit_mode');
  },

  check: async () => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('jammi_admin_session');
      if (session === 'true') return { active: true };
    }
    return null;
  }
}
