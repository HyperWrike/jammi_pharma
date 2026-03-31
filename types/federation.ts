export interface ForumPost {
    id: string;
    author: string;
    specialty: string;
    category: string;
    title: string;
    content: string;
    upvotes: number;
    comments: number;
    commentsList?: { id: string, author: string, content: string, timestamp: string }[];
    status: 'approved' | 'pending' | 'rejected';
    timestamp: string;
    doctorId?: string; // Optional reference to doctor profile
}

export interface DoctorProfile {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    avatar?: string;
    verified: boolean;
    timestamp: string;
}

export interface PartnerRequest {
    id: string;
    clinicName: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    patientVolume: string;
    status: 'pending' | 'verified' | 'rejected';
    timestamp: string;
}

export interface Product {
    id: string;
    name: string;
    label: string;
    shortDescription: string;
    price: number;
    image: string;
    category: string;
    stock: string;
    sku: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    features?: { title: string; desc: string }[];
    timestamp: string;
}

export interface Notification {
    id: string;
    type: 'new_post' | 'doctor_joined';
    message: string;
    link?: string;
    timestamp: string;
    isRead: boolean;
}

export interface FederationStore {
    posts: ForumPost[];
    doctorProfiles: DoctorProfile[];
    partnerRequests: PartnerRequest[];
    customers: any[];
    products: Product[];
    notifications: Notification[];
    isAdminLoggedIn: boolean;
    currentUserProfile: DoctorProfile | null;
    userUID: string | null;
    sanctumModalOpen: boolean;
    footerClickCount: number;

    // Actions
    approvePost: (id: string) => Promise<void>;
    rejectPost: (id: string) => Promise<void>;
    submitPost: (post: { title: string; content: string; author: string; specialty: string; category: string }) => Promise<{ success: boolean; error?: string }>;
    upvotePost: (id: string) => Promise<void>;
    submitComment: (postId: string, commentData: { author: string, content: string }) => Promise<void>;
    
    // Doctor Actions
    createDoctorProfile: (profile: { name: string; specialty: string; bio: string }) => Promise<{ success: boolean; error?: string }>;
    verifyDoctor: (id: string) => Promise<void>;
    
    // Partner Actions
    submitPartnerRequest: (request: Omit<PartnerRequest, 'id' | 'status' | 'timestamp'>) => Promise<void>;
    verifyPartner: (id: string) => Promise<void>;
    
    // Product Actions
    addProduct: (product: Omit<Product, 'id' | 'timestamp'>) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    // Auth & UI
    loginAdmin: (username: string, pass: string) => Promise<boolean>;
    logoutAdmin: () => Promise<void>;
    incrementFooterClick: () => void;
    closeSanctumModal: () => void;
    markNotificationRead: (id: string) => Promise<void>;
    getNextCustomerID: () => Promise<string>;
}

