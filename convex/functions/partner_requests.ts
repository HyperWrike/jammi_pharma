import { mutation } from "../_generated/server";
import { v } from "convex/values";

/** Public partner / federation membership applications (standalone module for reliable deploy). */
export const createPartnerRequest = mutation({
  args: {
    full_name: v.string(),
    organization: v.string(),
    specialization: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("partner_requests", {
      ...args,
      status: "pending",
      created_at: new Date().toISOString(),
    });
  },
});
