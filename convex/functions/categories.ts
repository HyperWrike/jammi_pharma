import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    const results = await ctx.db.query("categories").collect();
    return results.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  },
});

export const getCategory = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id as Id<"categories">);
  },
});

export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("categories")
      .withIndex("slug", q => q.eq("slug", args.slug))
      .first();
    return results || null;
  },
});

export const createCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    parent_id: v.optional(v.string()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("categories", {
      ...args,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      display_order: args.display_order || 0,
    });
    return id;
  },
});

export const updateCategory = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as Id<"categories">, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const deleteCategory = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id as Id<"categories">);
    return { success: true };
  },
});
