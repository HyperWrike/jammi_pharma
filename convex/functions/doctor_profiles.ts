import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const listDoctorProfiles = query({
  args: {
    specialty: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("doctor_profiles").order("desc").collect();
    if (args.specialty) {
      results = results.filter(d => d.specialty === args.specialty);
    }
    return results;
  },
});

export const createDoctorProfile = mutation({
  args: {
    name: v.string(),
    specialty: v.optional(v.string()),
    bio: v.optional(v.string()),
    verified: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("doctor_profiles", {
      ...args,
      timestamp: new Date().toISOString(),
      verified: args.verified || false,
    });
    return id;
  },
});

export const updateDoctorProfile = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    specialty: v.optional(v.string()),
    bio: v.optional(v.string()),
    verified: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as Id<"doctor_profiles">, updates);
    return id;
  },
});

export const deleteDoctorProfile = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id as Id<"doctor_profiles">);
    return { success: true };
  },
});
