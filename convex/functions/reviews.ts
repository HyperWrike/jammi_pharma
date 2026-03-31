import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const listReviews = query({
  args: {
    productId: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("reviews").order("desc").collect();
    
    if (args.productId) {
      results = results.filter(r => r.product_id === args.productId);
    }
    if (args.status) {
      results = results.filter(r => r.status === args.status);
    }

    const products = await ctx.db.query("products").collect();
    const productMap = new Map(products.map((p) => [String(p._id), p]));

    return results.map((r) => ({
      ...r,
      products: productMap.get(r.product_id) || null,
    }));
  },
});

export const getReview = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id as Id<"reviews">);
  },
});

export const createReview = mutation({
  args: {
    product_id: v.string(),
    user_id: v.optional(v.string()),
    reviewer_name: v.string(),
    rating: v.number(),
    review_text: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("reviews", {
      ...args,
      status: "pending",
      created_at: new Date().toISOString(),
    });
    return id;
  },
});

export const updateReviewStatus = mutation({
  args: {
    id: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id as Id<"reviews">, { status: args.status });
    return { success: true };
  },
});

export const updateReview = mutation({
  args: {
    id: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id as Id<"reviews">, { status: args.status });
    return args.id;
  },
});

export const deleteReview = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id as Id<"reviews">);
    return { success: true };
  },
});
