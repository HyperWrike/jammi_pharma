import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitContactRequest = mutation({
  args: {
    first_name: v.string(),
    last_name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contact_requests", {
      first_name: args.first_name,
      last_name: args.last_name,
      email: args.email,
      phone: args.phone,
      message: args.message,
      status: "new",
      created_at: new Date().toISOString(),
    });
  },
});

export const getContactRequests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contact_requests").order("desc").collect();
  },
});

export const updateContactRequestStatus = mutation({
  args: {
    id: v.id("contact_requests"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});
