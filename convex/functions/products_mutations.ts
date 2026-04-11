import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const createProduct = mutation({
  args: {
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
    indications: v.optional(v.string()),
    dosage: v.optional(v.string()),
    usage_instructions: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    status: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const duplicateBySlug = await ctx.db
      .query("products")
      .withIndex("slug", (q) => q.eq("slug", args.slug))
      .first();
    if (duplicateBySlug) {
      throw new Error("A product with this slug already exists");
    }

    const id = await ctx.db.insert("products", {
      ...args,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      view_count: 0,
      price: args.price || 0,
      stock: args.stock || 0,
      low_stock_threshold: args.low_stock_threshold || 10,
      status: args.status || "draft",
      is_featured: args.is_featured || false,
      display_order: args.display_order || 0,
      images: args.images || [],
      tags: args.tags || [],
    });
    return id;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    short_description: v.optional(v.string()),
    price: v.optional(v.number()),
    discount_price: v.optional(v.number()),
    stock: v.optional(v.number()),
    low_stock_threshold: v.optional(v.number()),
    sku: v.optional(v.string()),
    category_id: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    ingredients: v.optional(v.string()),
    indications: v.optional(v.string()),
    dosage: v.optional(v.string()),
    usage_instructions: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    status: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as Id<"products">, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const deleteProduct = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id as Id<"products">);
    return { success: true };
  },
});

export const updateStock = mutation({
  args: {
    id: v.string(),
    stockChange: v.number(),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id as Id<"products">);
    if (!product) throw new Error("Product not found");
    
    const newStock = (product.stock || 0) + args.stockChange;
    
    await ctx.db.patch(args.id as Id<"products">, {
      stock: newStock,
      updated_at: new Date().toISOString(),
    });
    
    return { success: true, newStock };
  },
});

export const updateInventory = mutation({
  args: {
    id: v.string(),
    stock: v.optional(v.number()),
    low_stock_threshold: v.optional(v.number()),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id as Id<"products">);
    if (!product) throw new Error("Product not found");

    const previousStock = product.stock || 0;
    const nextStock = args.stock ?? previousStock;

    await ctx.db.patch(args.id as Id<"products">, {
      stock: nextStock,
      low_stock_threshold: args.low_stock_threshold ?? product.low_stock_threshold,
      updated_at: new Date().toISOString(),
    });

    await ctx.db.insert("inventory_log", {
      product_id: args.id,
      previous_stock: previousStock,
      new_stock: nextStock,
      change_amount: nextStock - previousStock,
      reason: args.reason || "Manual update by admin",
      changed_by: "admin",
      created_at: new Date().toISOString(),
    });

    return { success: true, stock: nextStock };
  },
});

export const importProductBatch = mutation({
  args: {
    products: v.array(v.object({
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      short_description: v.optional(v.string()),
      ingredients: v.optional(v.string()),
      indications: v.optional(v.string()),
      dosage: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const imported = [];
    
    for (const product of args.products) {
      // Check if product already exists by slug
      const existing = await ctx.db
        .query("products")
        .withIndex("slug", (q) => q.eq("slug", product.slug))
        .first();

      // Fallback duplicate check by name (case-insensitive)
      const existingByName = existing
        ? existing
        : (await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("name"), product.name))
            .first()) ||
          (await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("name"), product.name.toLowerCase()))
            .first()) ||
          (await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("name"), product.name.toUpperCase()))
            .first());
      
      if (existingByName) {
        // Only sync wellness content sections; keep pricing/inventory/media unchanged.
        await ctx.db.patch(existingByName._id, {
          description: product.description,
          short_description: product.short_description || existingByName.short_description,
          ingredients: product.ingredients,
          indications: product.indications,
          dosage: product.dosage,
          updated_at: new Date().toISOString(),
        });
        imported.push({ status: 'updated', name: product.name });
      } else {
        // Create minimal product only when no match exists.
        const id = await ctx.db.insert("products", {
          name: product.name,
          slug: product.slug,
          price: 0,
          description: product.description,
          short_description: product.short_description,
          images: [],
          ingredients: product.ingredients,
          indications: product.indications,
          dosage: product.dosage,
          status: 'Published',
          category_id: 'Wellness',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          view_count: 0,
          stock: 100,
          low_stock_threshold: 10,
          is_featured: false,
          display_order: 0,
        });
        imported.push({ status: 'created', name: product.name, id });
      }
    }
    
    return { success: true, imported, count: imported.length };
  },
});
