import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

export const listCoupons = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("coupons").collect();
    
    if (args.status) {
      results = results.filter(c => c.status === args.status);
    }
    
    return results;
  },
});

export const getCoupon = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("coupons")
      .filter(q => q.eq("code", args.code))
      .collect();
    return results[0] || null;
  },
});

export const createCoupon = mutation({
  args: {
    code: v.string(),
    discount_type: v.string(),
    discount_value: v.number(),
    min_order_value: v.optional(v.number()),
    max_discount_amount: v.optional(v.number()),
    expiry_date: v.string(),
    usage_limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("coupons", {
      ...args,
      total_used: 0,
      status: "active",
      created_at: new Date().toISOString(),
    });
    return id;
  },
});

export const updateCoupon = mutation({
  args: {
    id: v.string(),
    code: v.optional(v.string()),
    discount_type: v.optional(v.string()),
    discount_value: v.optional(v.number()),
    min_order_value: v.optional(v.number()),
    max_discount_amount: v.optional(v.number()),
    expiry_date: v.optional(v.string()),
    usage_limit: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteCoupon = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

export const redeemCoupon = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const coupon = await ctx.db.get(args.id);
    if (!coupon) throw new Error("Coupon not found");
    
    await ctx.db.patch(args.id, {
      total_used: (coupon.total_used || 0) + 1
    });
    
    return { success: true };
  },
});
