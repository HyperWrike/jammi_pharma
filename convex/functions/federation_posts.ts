import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

export const listFederationPosts = query({
  args: {
    status: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("federation_posts").order("desc").collect();
    
    if (args.status && args.status !== 'all') {
      results = results.filter(p => p.status === args.status);
    }
    
    const page = args.page || 1;
    const limit = args.limit || 20;
    const start = (page - 1) * limit;
    
    return {
      data: results.slice(start, start + limit),
      total: results.length
    };
  },
});

export const getFederationPost = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createFederationPost = mutation({
  args: {
    poster_name: v.string(),
    poster_designation: v.optional(v.string()),
    content: v.string(),
    image_url: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("federation_posts", {
      poster_name: args.poster_name,
      poster_designation: args.poster_designation,
      content: args.content,
      image_url: args.image_url,
      tags: args.tags,
      like_count: 0,
      comment_count: 0,
      status: "pending",
      created_at: new Date().toISOString(),
    });
    return id;
  },
});

export const updateFederationPost = mutation({
  args: {
    id: v.string(),
    status: v.optional(v.string()),
    like_count: v.optional(v.number()),
    comment_count: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteFederationPost = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const listPartners = query({
  args: {
    status: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("partner_requests").order("desc").collect();
    if (args.status && args.status !== "all") {
      results = results.filter((r) => r.status === args.status);
    }
    const page = args.page || 1;
    const limit = args.limit || 20;
    const start = (page - 1) * limit;
    return {
      data: results.slice(start, start + limit),
      total: results.length,
    };
  },
});

export const updatePartner = mutation({
  args: {
    id: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return args.id;
  },
});

export const deletePartner = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const updateDoctor = mutation({
  args: {
    id: v.string(),
    verified: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { verified: args.verified });
    return args.id;
  },
});
