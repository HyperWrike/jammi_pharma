import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

export const listBundles = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("bundles").order("desc").collect();
    
    if (args.status) {
      results = results.filter(b => b.status === args.status);
    }
    
    const bundleProducts = await ctx.db.query("bundle_products").collect();
    const products = await ctx.db.query("products").collect();
    const productMap = new Map(products.map((p) => [String(p._id), p]));

    return results.map((bundle) => {
      const rows = bundleProducts
        .filter((bp) => bp.bundle_id === String(bundle._id))
        .map((bp) => ({
          ...bp,
          products: productMap.get(bp.product_id) || null,
        }));
      return {
        ...bundle,
        bundle_products: rows,
      };
    });
  },
});

export const getBundle = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const bundle = await ctx.db.get(args.id);
    if (bundle) {
      const products = await ctx.db.query("bundle_products")
        .filter(q => q.eq("bundle_id", args.id))
        .collect();
      return { ...bundle, products };
    }
    return null;
  },
});

export const createBundle = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    extra_discount_percent: v.optional(v.number()),
    show_in_shop: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("bundles", {
      ...args,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const addProductToBundle = mutation({
  args: {
    bundle_id: v.string(),
    product_id: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("bundle_products")
      .filter((q) => q.eq("bundle_id", args.bundle_id))
      .filter((q) => q.eq("product_id", args.product_id))
      .first();
    if (existing) return existing._id;
    const id = await ctx.db.insert("bundle_products", args);
    return id;
  },
});

export const setBundleProducts = mutation({
  args: {
    bundle_id: v.string(),
    product_ids: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("bundle_products")
      .filter((q) => q.eq("bundle_id", args.bundle_id))
      .collect();

    for (const row of existing) {
      await ctx.db.delete(row._id);
    }

    for (const productId of args.product_ids) {
      await ctx.db.insert("bundle_products", {
        bundle_id: args.bundle_id,
        product_id: productId,
      });
    }

    return { success: true };
  },
});

export const removeProductFromBundle = mutation({
  args: {
    bundle_id: v.string(),
    product_id: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("bundle_products")
      .filter(q => q.eq("bundle_id", args.bundle_id))
      .filter(q => q.eq("product_id", args.product_id))
      .collect();
    
    for (const item of results) {
      await ctx.db.delete(item._id);
    }
    return { success: true };
  },
});

export const updateBundle = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    extra_discount_percent: v.optional(v.number()),
    show_in_shop: v.optional(v.boolean()),
    status: v.optional(v.string()),
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

export const deleteBundle = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("bundle_products")
      .filter((q) => q.eq("bundle_id", args.id))
      .collect();
    for (const row of existing) {
      await ctx.db.delete(row._id);
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
