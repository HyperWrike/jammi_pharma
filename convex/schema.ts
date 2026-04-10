import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  site_users: defineTable({
    user_code: v.string(),
    session_id: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    status: v.optional(v.string()),
    admin_notes: v.optional(v.string()),
    created_at: v.optional(v.string()),
    last_seen: v.optional(v.string()),
  }).index("session_id", ["session_id"])
    .index("user_code", ["user_code"]),

  admin_users: defineTable({
    auth_user_id: v.optional(v.string()),
    name: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    status: v.optional(v.string()),
    last_login: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("email", ["email"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    parent_id: v.optional(v.string()),
    display_order: v.optional(v.number()),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    short_description: v.optional(v.string()),
    price: v.number(),
    discount_price: v.optional(v.number()),
    stock: v.optional(v.number()),
    low_stock_threshold: v.optional(v.number()),
    sku: v.optional(v.string()),
    category_id: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    main_image_index: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
    ingredients: v.optional(v.string()),
    usage_instructions: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    status: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
    display_order: v.optional(v.number()),
    view_count: v.optional(v.number()),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("slug", ["slug"])
    .index("status", ["status"])
    .index("category_id", ["category_id"]),

  product_variants: defineTable({
    product_id: v.string(),
    variant_type: v.string(),
    variant_value: v.string(),
    additional_price: v.optional(v.number()),
    stock: v.optional(v.number()),
    created_at: v.optional(v.string()),
  }).index("product_id", ["product_id"]),

  carts: defineTable({
    user_id: v.string(),
    product_id: v.string(),
    variant_id: v.optional(v.string()),
    quantity: v.number(),
    added_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("user_id", ["user_id"])
    .index("product_id", ["product_id"]),

  orders: defineTable({
    order_number: v.string(),
    user_id: v.optional(v.string()),
    user_code: v.optional(v.string()),
    customer_name: v.string(),
    customer_email: v.string(),
    customer_phone: v.optional(v.string()),
    shipping_address: v.any(),
    items: v.optional(v.any()),
    subtotal: v.number(),
    shipping_cost: v.optional(v.number()),
    discount_amount: v.optional(v.number()),
    tax_amount: v.optional(v.number()),
    total_amount: v.number(),
    coupon_code: v.optional(v.string()),
    order_status: v.optional(v.string()),
    payment_status: v.optional(v.string()),
    payment_method: v.optional(v.string()),
    razorpay_order_id: v.optional(v.string()),
    razorpay_payment_id: v.optional(v.string()),
    tracking_number: v.optional(v.string()),
    courier_name: v.optional(v.string()),
    admin_notes: v.optional(v.string()),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("order_number", ["order_number"])
    .index("user_id", ["user_id"])
    .index("customer_email", ["customer_email"])
    .index("created_at", ["created_at"])
    .index("razorpay_order_id", ["razorpay_order_id"]),

  order_items: defineTable({
    order_id: v.string(),
    product_id: v.optional(v.string()),
    product_name: v.string(),
    product_image: v.optional(v.string()),
    variant_label: v.optional(v.string()),
    quantity: v.number(),
    unit_price: v.number(),
    line_total: v.number(),
    created_at: v.optional(v.string()),
  }).index("order_id", ["order_id"]),

  reviews: defineTable({
    product_id: v.string(),
    user_id: v.optional(v.string()),
    reviewer_name: v.string(),
    rating: v.number(),
    review_text: v.string(),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("product_id", ["product_id"])
    .index("status", ["status"]),

  bundles: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    extra_discount_percent: v.optional(v.number()),
    show_in_shop: v.optional(v.boolean()),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("status", ["status"]),

  bundle_products: defineTable({
    bundle_id: v.string(),
    product_id: v.string(),
  }).index("bundle_id", ["bundle_id"])
    .index("product_id", ["product_id"]),

  coupons: defineTable({
    code: v.string(),
    discount_type: v.string(),
    discount_value: v.number(),
    min_order_value: v.optional(v.number()),
    max_discount_amount: v.optional(v.number()),
    expiry_date: v.string(),
    usage_limit: v.optional(v.number()),
    total_used: v.optional(v.number()),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("code", ["code"])
    .index("status", ["status"]),

  cms_content: defineTable({
    page: v.string(),
    section: v.string(),
    content_key: v.string(),
    content_value: v.optional(v.string()),
    content_type: v.optional(v.string()),
    updated_at: v.optional(v.string()),
    updated_by: v.optional(v.string()),
  }).index("page", ["page"])
    .index("page_section", ["page", "section"]),

  cms_banners: defineTable({
    image_url: v.string(),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    cta_text: v.optional(v.string()),
    cta_link: v.optional(v.string()),
    text_color: v.optional(v.string()),
    display_order: v.optional(v.number()),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("status", ["status"])
    .index("display_order", ["display_order"]),

  cms_blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    featured_image: v.optional(v.string()),
    image_id: v.optional(v.id("_storage")),
    content: v.string(),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    author_name: v.optional(v.string()),
    product_id: v.optional(v.id("products")),
    status: v.optional(v.string()),
    published_at: v.optional(v.string()),
    view_count: v.optional(v.number()),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }).index("slug", ["slug"])
    .index("status", ["status"]),

  cms_static_pages: defineTable({
    page_key: v.string(),
    title: v.string(),
    content: v.string(),
    updated_at: v.optional(v.string()),
  }).index("page_key", ["page_key"]),

  cms_announcement: defineTable({
    is_enabled: v.optional(v.boolean()),
    message: v.optional(v.string()),
    bg_color: v.optional(v.string()),
    text_color: v.optional(v.string()),
    link_url: v.optional(v.string()),
    updated_at: v.optional(v.string()),
  }),

  federation_posts: defineTable({
    title: v.optional(v.string()),
    poster_name: v.string(),
    poster_designation: v.optional(v.string()),
    content: v.string(),
    category: v.optional(v.string()),
    image_url: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    like_count: v.optional(v.number()),
    comment_count: v.optional(v.number()),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("status", ["status"])
    .index("created_at", ["created_at"]),

  federation_comments: defineTable({
    post_id: v.string(),
    commenter_name: v.string(),
    comment_text: v.string(),
    created_at: v.optional(v.string()),
  }).index("post_id", ["post_id"]),

  partner_requests: defineTable({
    full_name: v.string(),
    organization: v.string(),
    specialization: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    message: v.string(),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("status", ["status"])
    .index("email", ["email"]),

  contact_requests: defineTable({
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    status: v.optional(v.string()), // e.g. "new", "read", "replied"
    created_at: v.optional(v.string()),
  }).index("status", ["status"])
    .index("email", ["email"]),

  shipping_methods: defineTable({
    name: v.string(),
    carrier: v.string(),
    rate_type: v.string(),
    base_cost: v.optional(v.number()),
    free_above_amount: v.optional(v.number()),
    estimated_delivery: v.optional(v.string()),
    status: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("status", ["status"]),

  inventory_log: defineTable({
    product_id: v.string(),
    previous_stock: v.number(),
    new_stock: v.number(),
    change_amount: v.number(),
    reason: v.string(),
    changed_by: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("product_id", ["product_id"]),

  customers: defineTable({
    user_code: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    pincode: v.optional(v.string()),
    total_orders: v.optional(v.number()),
    total_spent: v.optional(v.number()),
    status: v.optional(v.string()),
    admin_notes: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("email", ["email"])
    .index("user_code", ["user_code"]),

  customer_auth_codes: defineTable({
    email: v.string(),
    code_hash: v.string(),
    expires_at: v.string(),
    attempts: v.optional(v.number()),
    consumed_at: v.optional(v.string()),
    created_at: v.optional(v.string()),
  }).index("email", ["email"]),

  customer_sessions: defineTable({
    email: v.string(),
    token_hash: v.string(),
    expires_at: v.string(),
    revoked_at: v.optional(v.string()),
    created_at: v.optional(v.string()),
    last_seen_at: v.optional(v.string()),
  }).index("email", ["email"])
    .index("token_hash", ["token_hash"]),

  customer_passwords: defineTable({
    email: v.string(),
    password_hash: v.string(),
    created_at: v.optional(v.string()),
    updated_at: v.optional(v.string()),
    last_set_by_order_number: v.optional(v.string()),
  }).index("email", ["email"]),

  payments: defineTable({
    transaction_id: v.string(),
    razorpay_order_id: v.optional(v.string()),
    customer_name: v.optional(v.string()),
    order_id: v.optional(v.string()),
    amount: v.number(),
    method: v.optional(v.string()),
    status: v.string(),
    created_at: v.optional(v.string()),
  }).index("transaction_id", ["transaction_id"]),

  doctor_profiles: defineTable({
    name: v.string(),
    specialty: v.optional(v.string()),
    bio: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    timestamp: v.optional(v.string()),
  }).index("specialty", ["specialty"]),
});
