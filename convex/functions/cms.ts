import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

export const getCmsContent = query({
  args: {
    page: v.optional(v.string()),
    section: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results;
    if (args.page && args.section) {
      results = await ctx.db.query("cms_content")
        .filter(q => q.eq("page", args.page!))
        .filter(q => q.eq("section", args.section!))
        .collect();
    } else if (args.page) {
      results = await ctx.db.query("cms_content")
        .filter(q => q.eq("page", args.page!))
        .collect();
    } else {
      results = await ctx.db.query("cms_content").collect();
    }
    return results;
  },
});

export const setCmsContent = mutation({
  args: {
    page: v.string(),
    section: v.string(),
    content_key: v.string(),
    content_value: v.optional(v.string()),
    content_type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("cms_content")
      .filter(q => q.eq("page", args.page))
      .filter(q => q.eq("section", args.section))
      .filter(q => q.eq("content_key", args.content_key))
      .collect();
    
    if (existing.length > 0) {
      await ctx.db.patch(existing[0]._id, {
        content_value: args.content_value,
        content_type: args.content_type,
        updated_at: new Date().toISOString(),
      });
      return existing[0]._id;
    } else {
      return await ctx.db.insert("cms_content", {
        ...args,
        updated_at: new Date().toISOString(),
      });
    }
  },
});

export const listBanners = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("cms_banners").order("asc").collect();
    
    if (args.status) {
      results = results.filter(b => b.status === args.status);
    }
    
    return results;
  },
});

export const createBanner = mutation({
  args: {
    image_url: v.string(),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    cta_text: v.optional(v.string()),
    cta_link: v.optional(v.string()),
    text_color: v.optional(v.string()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("cms_banners", {
      ...args,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const updateBanner = mutation({
  args: {
    id: v.string(),
    image_url: v.optional(v.string()),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    cta_text: v.optional(v.string()),
    cta_link: v.optional(v.string()),
    status: v.optional(v.string()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const deleteBanner = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const listBlogs = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("cms_blogs").order("desc").collect();
    
    if (args.status) {
      results = results.filter(b => b.status === args.status);
    }
    
    return results;
  },
});

export const getBlog = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("cms_blogs")
      .filter(q => q.eq("slug", args.slug))
      .collect();
    return results[0] || null;
  },
});

export const createBlog = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    featured_image: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("cms_blogs", {
      ...args,
      author_name: "Jammi Pharma Team",
      status: "draft",
      view_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const updateBlog = mutation({
  args: {
    id: v.string(),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    status: v.optional(v.string()),
    published_at: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const deleteBlog = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const getAnnouncement = query({
  args: {},
  handler: async (ctx, args) => {
    const results = await ctx.db.query("cms_announcement").collect();
    return results[0] || null;
  },
});

export const updateAnnouncement = mutation({
  args: {
    is_enabled: v.optional(v.boolean()),
    message: v.optional(v.string()),
    bg_color: v.optional(v.string()),
    text_color: v.optional(v.string()),
    link_url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("cms_announcement").collect();
    
    if (existing.length > 0) {
      await ctx.db.patch(existing[0]._id, {
        ...args,
        updated_at: new Date().toISOString(),
      });
      return existing[0]._id;
    } else {
      return await ctx.db.insert("cms_announcement", {
        ...args,
        updated_at: new Date().toISOString(),
      });
    }
  },
});

export const getPage = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cms_static_pages")
      .withIndex("page_key", (q) => q.eq("page_key", args.key))
      .first();
  },
});

export const updatePage = mutation({
  args: {
    key: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cms_static_pages")
      .withIndex("page_key", (q) => q.eq("page_key", args.key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        content: args.content,
        updated_at: new Date().toISOString(),
      });
      return existing._id;
    }
    return await ctx.db.insert("cms_static_pages", {
      page_key: args.key,
      title: args.key,
      content: args.content,
      updated_at: new Date().toISOString(),
    });
  },
});

export const listRolePermissions = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("cms_content")
      .filter((q) => q.eq("page", "admin"))
      .filter((q) => q.eq("section", "roles"))
      .filter((q) => q.eq("content_key", "permissions"))
      .first();
    return doc?.content_value ? JSON.parse(doc.content_value) : {};
  },
});

export const updateRolePermissions = mutation({
  args: { permissions: v.any() },
  handler: async (ctx, args) => {
    const payload = JSON.stringify(args.permissions || {});
    const existing = await ctx.db
      .query("cms_content")
      .filter((q) => q.eq("page", "admin"))
      .filter((q) => q.eq("section", "roles"))
      .filter((q) => q.eq("content_key", "permissions"))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        content_value: payload,
        content_type: "json",
        updated_at: new Date().toISOString(),
      });
      return existing._id;
    }
    return await ctx.db.insert("cms_content", {
      page: "admin",
      section: "roles",
      content_key: "permissions",
      content_value: payload,
      content_type: "json",
      updated_at: new Date().toISOString(),
    });
  },
});

export const listAdminUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("admin_users").order("desc").collect();
  },
});

export const createAdminUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("admin_users", {
      name: args.name,
      email: args.email,
      role: args.role || "editor",
      status: args.status || "active",
      auth_user_id: "manual_" + args.email,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    });
  },
});

export const updateAdminUser = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteAdminUser = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const listShippingMethods = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("shipping_methods").order("desc").collect();
  },
});

export const createShippingMethod = mutation({
  args: {
    name: v.string(),
    carrier: v.string(),
    rate_type: v.string(),
    base_cost: v.optional(v.number()),
    free_above_amount: v.optional(v.number()),
    estimated_delivery: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("shipping_methods", {
      ...args,
      status: args.status || "active",
      created_at: new Date().toISOString(),
    });
  },
});

export const updateShippingMethod = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    carrier: v.optional(v.string()),
    rate_type: v.optional(v.string()),
    base_cost: v.optional(v.number()),
    free_above_amount: v.optional(v.number()),
    estimated_delivery: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteShippingMethod = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
