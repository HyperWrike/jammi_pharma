import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const listProducts = query({
  args: {
    search: v.optional(v.string()),
    category: v.optional(v.string()),
    status: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("products").order("desc").collect();
    
    if (args.search) {
      results = results.filter(p => p.name?.toLowerCase().includes(args.search!.toLowerCase()));
    }
    if (args.category) {
      results = results.filter(p => p.category_id === args.category);
    }
    if (args.status) {
      results = results.filter(p => p.status === args.status);
    }
    
    const page = args.page || 1;
    const limit = args.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      data: results.slice(start, end),
      total: results.length
    };
  },
});

export const getProduct = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id as Id<"products">);
  },
});

export const getProductsBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("products")
      .withIndex("slug", q => q.eq("slug", args.slug))
      .first();
    return results || null;
  },
});

export const getFeaturedProducts = query({
  args: {},
  handler: async (ctx) => {
    const results = await ctx.db.query("products")
      .withIndex("status", q => q.eq("status", "published"))
      .order("desc")
      .take(100);
    return results.filter(p => p.is_featured === true).slice(0, 10);
  },
});

export const getProductsByCategory = query({
  args: { categoryId: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("products")
      .withIndex("category_id", q => q.eq("category_id", args.categoryId))
      .order("desc")
      .collect();
    return results.filter(p => p.status === "published");
  },
});

export const listInventory = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").order("desc").collect();
    return products.map((p) => ({
      _id: p._id,
      name: p.name,
      sku: p.sku,
      stock: p.stock || 0,
      low_stock_threshold: p.low_stock_threshold || 10,
      status: p.status,
      updated_at: p.updated_at,
    }));
  },
});

export const getInventoryLog = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("inventory_log")
      .withIndex("product_id", (q) => q.eq("product_id", args.id))
      .order("desc")
      .collect();
  },
});
