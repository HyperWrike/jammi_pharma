import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import type { Id } from "../_generated/dataModel";

export const listOrders = query({
  args: {
    status: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("orders").order("desc").collect();
    
    if (args.status) {
      results = results.filter(o => o.order_status === args.status);
    }
    
    const page = args.page || 1;
    const limit = args.limit || 20;
    const start = (page - 1) * limit;
    
    return {
      data: results.slice(start, start + limit),
      total: results.length
    };
  },
});

export const getOrder = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id as Id<"orders">);
    if (order) {
      const items = await ctx.db.query("order_items")
        .withIndex("order_id", q => q.eq("order_id", args.id))
        .collect();
      return { ...order, items };
    }
    return null;
  },
});

export const getOrderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("orders")
      .withIndex("order_number", q => q.eq("order_number", args.orderNumber))
      .collect();
    return results[0] || null;
  },
});

export const listOrdersByCustomerEmail = query({
  args: {
    email: v.string(),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.trim().toLowerCase();
    let orders = await ctx.db
      .query("orders")
      .withIndex("customer_email", (q) => q.eq("customer_email", normalizedEmail))
      .collect();

    orders = orders.sort((a, b) => {
      const aTime = new Date(a.created_at || 0).getTime();
      const bTime = new Date(b.created_at || 0).getTime();
      return bTime - aTime;
    });

    if (args.status && args.status !== "all") {
      orders = orders.filter((o) => o.order_status === args.status);
    }

    const page = args.page || 1;
    const limit = args.limit || 20;
    const start = (page - 1) * limit;

    return {
      data: orders.slice(start, start + limit),
      total: orders.length,
      page,
      limit,
    };
  },
});

export const createOrder = mutation({
  args: {
    order_number: v.string(),
    user_id: v.optional(v.string()),
    user_code: v.optional(v.string()),
    customer_name: v.string(),
    customer_email: v.string(),
    customer_phone: v.optional(v.string()),
    shipping_address: v.any(),
    items: v.optional(v.any()),
    subtotal: v.number(),
    shipping_cost: v.optional(v.number()),
    discount_amount: v.optional(v.number()),
    tax_amount: v.optional(v.number()),
    total_amount: v.number(),
    coupon_code: v.optional(v.string()),
    order_status: v.optional(v.string()),
    payment_status: v.optional(v.string()),
    payment_method: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("orders", {
      ...args,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      order_status: args.order_status || "pending",
      payment_status: args.payment_status || "unpaid",
    });
    return id;
  },
});

export const createOrderItem = mutation({
  args: {
    order_id: v.string(),
    product_id: v.optional(v.string()),
    product_name: v.string(),
    product_image: v.optional(v.string()),
    variant_label: v.optional(v.string()),
    quantity: v.number(),
    unit_price: v.number(),
    line_total: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("order_items", {
      ...args,
      created_at: new Date().toISOString(),
    });
    return id;
  },
});

export const updateOrderStatus = mutation({
  args: {
    id: v.string(),
    order_status: v.optional(v.string()),
    payment_status: v.optional(v.string()),
    tracking_number: v.optional(v.string()),
    courier_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as Id<"orders">, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
    return id;
  },
});

export const getDashboardReport = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").order("desc").collect();
    const products = await ctx.db.query("products").collect();
    const customers = await ctx.db.query("customers").collect();
    const reviews = await ctx.db.query("reviews").collect();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalCustomers = customers.length;
    
    const pendingOrders = orders.filter(o => o.order_status === "pending").length;
    const completedOrders = orders.filter(o => o.order_status === "delivered" || o.order_status === "completed").length;
    
    const recentOrders = orders.slice(0, 5);
    
    const lowStockProducts = products.filter(p => (p.stock || 0) <= (p.low_stock_threshold || 10));

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      pendingOrders,
      completedOrders,
      recentOrders,
      lowStockProducts,
      reviews: reviews.length,
    };
  },
});

export const getOrderByRazorpayOrderId = query({
  args: { razorpay_order_id: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db.query("orders")
      .withIndex("razorpay_order_id", q => q.eq("razorpay_order_id", args.razorpay_order_id))
      .collect();
    return results[0] || null;
  },
});

export const updateOrderById = mutation({
  args: {
    id: v.string(),
    updates: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id as Id<"orders">, {
      ...args.updates,
      updated_at: new Date().toISOString(),
    });
    return args.id;
  },
});

export const createPayment = mutation({
  args: {
    transaction_id: v.string(),
    razorpay_order_id: v.optional(v.string()),
    customer_name: v.optional(v.string()),
    order_id: v.optional(v.string()),
    amount: v.number(),
    method: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("payments", {
      ...args,
      created_at: new Date().toISOString(),
    });
    return id;
  },
});

export const listCustomers = query({
  args: {
    search: v.optional(v.string()),
    status: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("customers").collect();

    // Fallback for migrated data: derive customers from orders when customers table is empty.
    if (results.length === 0) {
      const orders = await ctx.db.query("orders").order("desc").collect();
      const customerMap = new Map<string, any>();

      orders.forEach((o) => {
        const key = (o.customer_email || `${o.customer_name || "guest"}:${o.customer_phone || ""}`).toLowerCase();
        const existing = customerMap.get(key);
        if (existing) {
          existing.total_orders += 1;
          existing.total_spent += o.total_amount || 0;
          if (!existing.phone && o.customer_phone) existing.phone = o.customer_phone;
          if (!existing.name && o.customer_name) existing.name = o.customer_name;
        } else {
          customerMap.set(key, {
            _id: o.user_id || key,
            user_code: o.user_code || `customer-${key.replace(/[^a-z0-9]/g, "-").slice(0, 20)}`,
            name: o.customer_name || "Guest",
            email: o.customer_email || "",
            phone: o.customer_phone || "",
            status: "active",
            total_orders: 1,
            total_spent: o.total_amount || 0,
            created_at: o.created_at || new Date().toISOString(),
          });
        }
      });

      results = Array.from(customerMap.values());
    }

    if (args.search) {
      const q = args.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.phone?.toLowerCase().includes(q),
      );
    }

    // Support admin filter with default status fallback.
    if (args.status && args.status !== "all") {
      results = results.filter((c: any) => (c.status || "active") === args.status);
    }

    const page = args.page || 1;
    const limit = args.limit || 20;
    const start = (page - 1) * limit;
    return {
      data: results.slice(start, start + limit),
      total: results.length,
    };
  },
});

export const getCustomer = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id as Id<"customers">);
  },
});

export const updateCustomer = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    pincode: v.optional(v.string()),
    status: v.optional(v.string()),
    admin_notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id as Id<"customers">, updates);
    return id;
  },
});

export const listPayments = query({
  args: {
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("payments").order("desc").collect();

    // Fallback for migrated data: derive payment rows from orders when payments table is empty.
    if (results.length === 0) {
      const orders = await ctx.db.query("orders").order("desc").collect();
      results = orders.map((o) => ({
        _id: o._id,
        transaction_id: o.razorpay_payment_id || o.order_number || String(o._id),
        razorpay_order_id: o.razorpay_order_id,
        customer_name: o.customer_name,
        order_id: String(o._id),
        order_number: o.order_number,
        amount: o.total_amount || 0,
        method: o.payment_method || "N/A",
        status: o.payment_status || "pending",
        created_at: o.created_at || new Date().toISOString(),
      }));
    }
    if (args.status && args.status !== "all") {
      results = results.filter((p) => p.status === args.status);
    }
    if (args.search) {
      const q = args.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.transaction_id?.toLowerCase().includes(q) ||
          p.customer_name?.toLowerCase().includes(q) ||
          p.razorpay_order_id?.toLowerCase().includes(q),
      );
    }
    return results;
  },
});

export const upsertCustomer = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    pincode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("customers")
      .withIndex("email", q => q.eq("email", args.email))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        phone: args.phone || existing.phone,
        address: args.address || existing.address,
        city: args.city || existing.city,
        pincode: args.pincode || existing.pincode,
        status: existing.status || "active",
        total_orders: (existing.total_orders || 0) + 1,
      });
      return existing._id;
    }

    const userCode = `customer-${Date.now().toString(36)}-${Math.floor(Math.random() * 100000)}`;
    const id = await ctx.db.insert("customers", {
      user_code: userCode,
      name: args.name,
      email: args.email,
      phone: args.phone || "",
      address: args.address || "",
      city: args.city || "",
      pincode: args.pincode || "",
      status: "active",
      total_orders: 1,
      total_spent: 0,
      created_at: new Date().toISOString(),
    });
    return id;
  },
});
