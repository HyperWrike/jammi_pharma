import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const listAdmins = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("admin_users").collect();
  },
});

export const getAdminByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("admin_users")
      .withIndex("email", q => q.eq("email", args.email))
      .first();
    return results || null;
  },
});

export const createAdmin = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("admin_users", {
      name: args.name,
      email: args.email,
      role: args.role || "admin",
      status: "active",
      auth_user_id: "manual_" + args.email,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    });
    return id;
  },
});

export const verifyAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@pass";
    if (args.password !== adminPassword) {
      throw new Error("Invalid password");
    }
    
    const admin = await ctx.db.query("admin_users")
      .withIndex("email", q => q.eq("email", args.email))
      .first();
    
    if (!admin) {
      // Create admin if doesn't exist
      const id = await ctx.db.insert("admin_users", {
        name: "Admin",
        email: args.email,
        role: "admin",
        status: "active",
        auth_user_id: "manual_" + args.email,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      });
      return { success: true, adminId: id };
    }
    
    if (admin.status !== "active") {
      throw new Error("Admin account is not active");
    }
    
    // Update last login
    await ctx.db.patch(admin._id, {
      last_login: new Date().toISOString(),
    });
    
    return { success: true, adminId: admin._id };
  },
});

export const updateAdminLastLogin = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id as Id<"admin_users">, {
      last_login: new Date().toISOString(),
    });
    return { success: true };
  },
});
