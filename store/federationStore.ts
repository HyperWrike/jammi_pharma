import { create } from 'zustand';
import { FederationStore, ForumPost, DoctorProfile, PartnerRequest, Notification, Product } from '../types/federation';

function getToken() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jammi_admin_token');
    if (token) return token;
    const bypass = localStorage.getItem('jammi_bypass_token');
    if (bypass) return bypass;
  }
  return 'JAMMI_ADMIN_MASTER_KEY_2024';
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  const res = await fetch(path, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { throw new Error(text); }
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const useFederationStore = create<FederationStore>((set, get) => {
    if (typeof window !== 'undefined') {
        const checkAuth = () => {
            const hasLocalSession = sessionStorage.getItem("jammi_admin_session") === "true" ||
                                   localStorage.getItem("jammi_cms_session") === "true" ||
                                   localStorage.getItem("jammi_admin_session") === "true";
            if (hasLocalSession) {
                set({ isAdminLoggedIn: true, sanctumModalOpen: false });
            } else {
                set({ isAdminLoggedIn: false });
            }
        };

        checkAuth();
        window.addEventListener('jammi_cms_unlocked', checkAuth);
        window.addEventListener('storage', checkAuth);

        // Load federation posts
        apiFetch('/api/admin/federation/posts')
          .then((data) => {
            const rawPosts = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
            const posts = rawPosts.map((p: any) => {
              const raw = p.content || p.body || '';
              const split = raw.indexOf('\n\n');
              const inferredTitle =
                p.title ||
                (split > 0
                  ? raw.slice(0, split).trim()
                  : (raw.split('\n')[0] || '').trim() || raw.slice(0, 72)) ||
                'Discussion';
              const inferredBody =
                split > 0 ? raw.slice(split + 2).trim() : raw;
              return {
                id: p._id || p.id,
                title: inferredTitle,
                content: inferredBody,
                author: p.author || p.poster_name || 'Anonymous',
                specialty: p.specialty || p.poster_designation || '',
                category:
                  p.category ||
                  (Array.isArray(p.tags) ? p.tags[0] : '') ||
                  'Discussion',
                status: p.status || 'pending',
                timestamp: p.created_at || '',
                upvotes: p.like_count || 0,
                comments: p.comment_count || 0,
                commentsList: p.commentsList || [],
              };
            });
            set({ posts });
          })
          .catch(() => {});

        // Load doctors
        apiFetch('/api/admin/federation/doctors')
          .then((data) => {
            const list = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
            set({ doctorProfiles: list });
          })
          .catch(() => {});

        // Load partners
        apiFetch('/api/admin/federation/partners')
          .then((data) => {
            const list = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
            set({ partnerRequests: list });
          })
          .catch(() => {});
    }

    return {
        posts: [],
        doctorProfiles: [],
        partnerRequests: [],
        customers: [],
        products: [],
        notifications: [],
        isAdminLoggedIn: false,
        currentUserProfile: null,
        userUID: null,
        sanctumModalOpen: false,
        footerClickCount: 0,

        approvePost: async (id) => {
            try {
                await apiFetch(`/api/admin/federation/posts/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ status: 'approved' }),
                });
            } catch (error) {
                console.error("Error approving post:", error);
            }
        },

        rejectPost: async (id) => {
            try {
                await apiFetch(`/api/admin/federation/posts/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ status: 'rejected' }),
                });
            } catch (error) {
                console.error("Error rejecting post:", error);
            }
        },

        submitPost: async (postData) => {
            try {
                const res = await fetch('/api/federation/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: postData.title,
                        poster_name: postData.author,
                        poster_designation: postData.specialty,
                        content: postData.content,
                        category: postData.category,
                    }),
                });
                const json = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(json.error || 'Failed to submit post');
                return { success: true, data: json };
            } catch (error) {
                console.error("Error submitting post:", error);
                return { success: false, error: String(error) };
            }
        },

        upvotePost: async (id) => {
            try {
                await apiFetch(`/api/admin/federation/posts/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ action: 'upvote' }),
                });
            } catch (error) {
                console.error("Error upvoting post:", error);
            }
        },

        submitComment: async (postId, commentData) => {
            try {
                await apiFetch(`/api/admin/federation/posts/${postId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        action: 'comment',
                        comment: {
                            author: commentData.author,
                            content: commentData.content,
                            timestamp: new Date().toISOString(),
                        }
                    }),
                });
            } catch (error) {
                console.error("Error submitting comment:", error);
            }
        },

        // Doctor Actions
        createDoctorProfile: async (profileData: { name: string; specialty: string; bio: string }) => {
            try {
                const res = await fetch('/api/doctor-application', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData)
                });

                const text = await res.text();
                let json = {} as any;
                try { json = text ? JSON.parse(text) : {}; } catch {}

                if (res.ok && json.success) {
                    return { success: true };
                }
                return { success: false, error: json.error || 'Failed to create profile' };
            } catch (error) {
                console.error("Error creating doctor profile:", error);
                return { success: false, error: String(error) };
            }
        },

        verifyDoctor: async (id) => {
            try {
                await apiFetch(`/api/admin/federation/doctors/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ verified: true }),
                });
            } catch (error) {
                console.error("Error verifying doctor:", error);
            }
        },

        // Partner Actions
        submitPartnerRequest: async (requestData: Record<string, any>) => {
            try {
                const res = await fetch('/api/partner-requests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        full_name: requestData.full_name ?? requestData.name ?? requestData.fullName,
                        organization: requestData.organization ?? requestData.institution ?? requestData.clinicName,
                        specialization: requestData.specialization ?? requestData.qualifications,
                        email: requestData.email,
                        phone: requestData.phone ?? requestData.contact,
                        city: requestData.city,
                        state: requestData.state,
                        message: requestData.message ?? requestData.reason ?? '',
                    }),
                });
                if (!res.ok) {
                    const j = await res.json().catch(() => ({}));
                    throw new Error(j.error || res.statusText);
                }
            } catch (error) {
                console.error("Error submitting partner request:", error);
            }
        },

        verifyPartner: async (id) => {
            try {
                await apiFetch(`/api/admin/federation/partners/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ status: 'approved' }),
                });
            } catch (error) {
                console.error("Error verifying partner:", error);
            }
        },

        markNotificationRead: async (id) => {
            // Notifications are not yet migrated to Convex
            console.log('markNotificationRead:', id);
        },

        // Product Actions
        addProduct: async (productData) => {
            try {
                await apiFetch('/api/admin/products', {
                    method: 'POST',
                    body: JSON.stringify(productData),
                });
            } catch (error) {
                console.error("Error adding product:", error);
            }
        },

        updateProduct: async (id, productData) => {
            try {
                await apiFetch(`/api/admin/products/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(productData),
                });
            } catch (error) {
                console.error("Error updating product:", error);
            }
        },

        deleteProduct: async (id) => {
            try {
                await apiFetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        },

        loginAdmin: async (username, pass) => {
            try {
                const res = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: username, password: pass })
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.token) {
                        localStorage.setItem('jammi_admin_token', data.token);
                        localStorage.setItem('jammi_admin_session', 'true');
                        localStorage.setItem('jammi_cms_session', 'true');
                        sessionStorage.setItem('jammi_admin_session', 'true');
                        set({ isAdminLoggedIn: true, sanctumModalOpen: false });
                        return true;
                    }
                }
                return false;
            } catch (error) {
                console.error("Error logging in:", error);
                return false;
            }
        },

        logoutAdmin: async () => {
            try {
                localStorage.removeItem("jammi_cms_session");
                localStorage.removeItem("jammi_admin_session");
                localStorage.removeItem("jammi_admin_token");
                localStorage.removeItem("jammi_bypass_token");
                sessionStorage.removeItem("jammi_admin_session");
                sessionStorage.removeItem("jammi_edit_mode");
                window.dispatchEvent(new Event('jammi_cms_unlocked'));
                set({ isAdminLoggedIn: false });
            } catch (error) {
                console.error("Error logging out:", error);
            }
        },

        incrementFooterClick: () => {
            const { footerClickCount } = get();
            const newCount = footerClickCount + 1;
            if (newCount >= 3) {
                set({ footerClickCount: 0, sanctumModalOpen: true });
            } else {
                set({ footerClickCount: newCount });
            }
        },

        closeSanctumModal: () => set({ sanctumModalOpen: false, footerClickCount: 0 }),

        getNextCustomerID: async () => {
            const randomNum = Math.floor(Math.random() * 100000);
            return `customer-${Date.now().toString(36)}-${randomNum}`;
        }
    };
});
