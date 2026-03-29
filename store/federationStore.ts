import { create } from 'zustand';
import { FederationStore, ForumPost, DoctorProfile, PartnerRequest, Notification, Product } from '../types/federation';
import { supabase } from '../lib/supabase';

export const useFederationStore = create<FederationStore>((set, get) => {
    
    // Helper to fetch and subscribe
    const setupSubscription = async (table: string, stateKey: string, orderByCol = 'timestamp', ascending = false) => {
        const fetchInitial = async () => {
            const { data, error } = await supabase.from(table).select('*').order(orderByCol, { ascending });
            if (!error && data) {
                set({ [stateKey]: data } as any);
            }
        };
        
        await fetchInitial();
        
        supabase
            .channel(`public:${table}`)
            .on('postgres_changes', { event: '*', schema: 'public', table }, fetchInitial)
            .subscribe();
    };

    if (typeof window !== 'undefined' && supabase) {
        setupSubscription('federation_posts', 'posts');
        setupSubscription('doctor_profiles', 'doctorProfiles');
        setupSubscription('partner_requests', 'partnerRequests');
        setupSubscription('federation_notifications', 'notifications');
        setupSubscription('customers', 'customers');
        setupSubscription('products', 'products', 'category', true);

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const hasLocalSession = sessionStorage.getItem("jammi_admin_session") === "true" || 
                                   localStorage.getItem("jammi_cms_session") === "true";
            
            if (session || hasLocalSession) {
                set({ isAdminLoggedIn: true, sanctumModalOpen: false });
                if (session?.user) set({ userUID: session.user.id });
            } else {
                set({ isAdminLoggedIn: false });
            }
        };

        checkAuth();
        window.addEventListener('jammi_cms_unlocked', checkAuth);
        window.addEventListener('storage', checkAuth);

        // Auth listener
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                set({ userUID: session.user.id });
                if (session.user.email === 'admin@jammipharma.com' || session.user.email === 'admin@jammi.com') {
                    set({ isAdminLoggedIn: true, sanctumModalOpen: false });
                }
                
                const { data } = await supabase.from('doctor_profiles').select('*').eq('id', session.user.id).single();
                if (data) {
                    set({ currentUserProfile: data as DoctorProfile });
                }
            } else if (sessionStorage.getItem("jammi_admin_session") !== "true") {
                set({ userUID: null, currentUserProfile: null });
            }
        });
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
                await supabase.from('federation_posts').update({ status: 'approved' }).eq('id', id);
                
                const post = get().posts.find(p => p.id === id);
                if (post) {
                    await supabase.from('federation_notifications').insert({
                        type: 'new_post',
                        message: `${post?.author || 'Someone'} has posted: ${post?.title || 'A new post'}`,
                        timestamp: new Date().toISOString(),
                        isRead: false,
                        link: '/federation'
                    });
                }
            } catch (error) {
                console.error("Error approving post:", error);
            }
        },
        
        rejectPost: async (id) => {
            try {
                await supabase.from('federation_posts').update({ status: 'rejected' }).eq('id', id);
            } catch (error) {
                console.error("Error rejecting post:", error);
            }
        },

        submitPost: async (postData) => {
            try {
                const newPost = {
                    ...postData,
                    upvotes: 0,
                    comments: 0,
                    commentsList: [],
                    status: 'pending',
                    timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
                };
                await supabase.from('federation_posts').insert(newPost);
            } catch (error) {
                console.error("Error submitting post:", error);
            }
        },

        upvotePost: async (id) => {
            try {
                const post = get().posts.find(p => p.id === id);
                if (post) {
                    await supabase.from('federation_posts').update({ upvotes: (post.upvotes || 0) + 1 }).eq('id', id);
                }
            } catch (error) {
                console.error("Error upvoting post:", error);
            }
        },

        submitComment: async (postId, commentData) => {
            try {
                const post = get().posts.find(p => p.id === postId);
                if (post) {
                    const newComment = {
                        id: crypto.randomUUID(),
                        author: commentData.author,
                        content: commentData.content,
                        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
                    };
                    const updatedCommentsList = post.commentsList ? [...post.commentsList, newComment] : [newComment];
                    await supabase.from('federation_posts').update({ 
                        comments: (post.comments || 0) + 1,
                        commentsList: updatedCommentsList
                    }).eq('id', postId);
                }
            } catch (error) {
                console.error("Error submitting comment:", error);
            }
        },

        // Doctor Actions
        createDoctorProfile: async (profileData) => {
            const { userUID } = get();
            try {
                // Call the API route which inserts into DB AND sends an email notification
                const res = await fetch('/api/doctor-application', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData)
                });
                
                const text = await res.text();
                let data = {} as any;
                try {
                    data = text ? JSON.parse(text) : {};
                } catch (e) {
                    console.error("Non-JSON returned by /api/doctor-application:", text);
                }
                
                if (res.ok) {
                    const newProfileTemplate = {
                        ...profileData,
                        verified: false,
                        timestamp: new Date().toISOString(),
                    };
                    
                    if (userUID) {
                        // If they are logged in, we also upsert locally/link ID
                        await supabase.from('doctor_profiles').upsert({ id: userUID, ...newProfileTemplate });
                        set({ currentUserProfile: { id: userUID, ...newProfileTemplate } as DoctorProfile });
                    } else if (data.id) {
                        set({ currentUserProfile: { id: data.id, ...newProfileTemplate } as DoctorProfile });
                    }
                }
            } catch (error) {
                console.error("Error creating doctor profile:", error);
            }
        },

        verifyDoctor: async (id) => {
            try {
                await supabase.from('doctor_profiles').update({ verified: true }).eq('id', id);
                
                const profile = get().doctorProfiles.find(p => p.id === id);
                if (profile) {
                    await supabase.from('federation_notifications').insert({
                        type: 'doctor_joined',
                        message: `${profile.name} has joined the Federation Community.`,
                        timestamp: new Date().toISOString(),
                        isRead: false,
                        link: '/federation'
                    });
                }
            } catch (error) {
                console.error("Error verifying doctor:", error);
            }
        },

        // Partner Actions
        submitPartnerRequest: async (requestData) => {
            try {
                const newRequest = {
                    ...requestData,
                    status: 'pending',
                    timestamp: new Date().toISOString(),
                };
                await supabase.from('partner_requests').insert(newRequest);
            } catch (error) {
                console.error("Error submitting partner request:", error);
            }
        },

        verifyPartner: async (id) => {
            try {
                await supabase.from('partner_requests').update({ status: 'verified' }).eq('id', id);
            } catch (error) {
                console.error("Error verifying partner:", error);
            }
        },

        markNotificationRead: async (id) => {
            try {
                await supabase.from('federation_notifications').update({ isRead: true }).eq('id', id);
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        },

        // Product Actions
        addProduct: async (productData) => {
            try {
                const newProduct = {
                    ...productData,
                    timestamp: new Date().toISOString(),
                };
                await supabase.from('products').insert(newProduct);
            } catch (error) {
                console.error("Error adding product:", error);
            }
        },

        updateProduct: async (id, productData) => {
            try {
                await supabase.from('products').update({
                    ...productData,
                    updatedAt: new Date().toISOString()
                }).eq('id', id);
            } catch (error) {
                console.error("Error updating product:", error);
            }
        },

        deleteProduct: async (id) => {
            try {
                await supabase.from('products').delete().eq('id', id);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        },

        loginAdmin: async (username, pass) => {
            try {
                // Hardcoded check
                const isHardcoded = username.trim() === 'admin@jammipharma.com' && pass.trim() === 'Jammi@007';
                
                // Handle hardcoded staff login by STILL calling Supabase
                const email = username.includes('@') ? username : `${username}@jammipharma.com`;
                const { data, error } = await supabase.auth.signInWithPassword({ 
                    email: isHardcoded ? 'admin@jammipharma.com' : email, 
                    password: pass 
                });
                
                // If Supabase auth succeeds, set session and return true
                if (!error && data?.session) {
                    await supabase.auth.setSession(data.session);
                    set({ isAdminLoggedIn: true, sanctumModalOpen: false });
                    localStorage.setItem("jammi_admin_session", "true");
                    localStorage.setItem("jammi_cms_session", "true");
                    sessionStorage.setItem("jammi_admin_session", "true");
                    return true;
                }
                
                // Fallback ONLY for emergency if hardcoded credentials are used but Supabase fails
                if (isHardcoded) {
                    console.warn("Supabase auth failed for hardcoded admin. Save operations WILL fail until user is created in Supabase.");
                    localStorage.setItem('jammi_bypass_token', 'JAMMI_ADMIN_MASTER_KEY_2024');
                    set({ isAdminLoggedIn: true, sanctumModalOpen: false });
                    localStorage.setItem("jammi_admin_session", "true");
                    localStorage.setItem("jammi_cms_session", "true");
                    sessionStorage.setItem("jammi_admin_session", "true");
                    return true;
                }

                return false;
            } catch (error) {
                console.error("Error logging in:", error);
                return false;
            }
        },

        logoutAdmin: async () => {
            try {
                await supabase.auth.signOut();
                localStorage.removeItem("jammi_cms_session");
                localStorage.removeItem("jammi_admin_session");
                sessionStorage.removeItem("jammi_admin_session");
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
            try {
                const { data, error } = await supabase
                    .from('customers')
                    .select('id')
                    .order('createdAt', { ascending: false })
                    .limit(1);
                    
                if (data && data.length > 0 && data[0].id) {
                    const lastIdStr = data[0].id.replace('customer-', '');
                    const lastId = parseInt(lastIdStr) || 0;
                    return `customer-${lastId + 1}`;
                }
                return 'customer-1';
            } catch (error) {
                console.error("Error generating customer ID:", error);
                return `customer-${Math.floor(Math.random() * 10000)}`;
            }
        }
    };
});
