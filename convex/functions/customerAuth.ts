import { action, mutation, query } from '../_generated/server';
import { v } from 'convex/values';
import type { Id } from '../_generated/dataModel';
import { Resend } from 'resend';

const MAX_OTP_ATTEMPTS = 5;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL || 'Jammi Pharmaceuticals <frontdesk@jammi.org>';
}

export const createLoginCode = mutation({
  args: {
    email: v.string(),
    code_hash: v.string(),
    expires_at: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const existing = await ctx.db
      .query('customer_auth_codes')
      .withIndex('email', (q) => q.eq('email', args.email))
      .collect();

    for (const row of existing) {
      if (!row.consumed_at) {
        await ctx.db.patch(row._id, { consumed_at: now });
      }
    }

    return await ctx.db.insert('customer_auth_codes', {
      email: args.email,
      code_hash: args.code_hash,
      expires_at: args.expires_at,
      attempts: 0,
      created_at: now,
    });
  },
});

export const upsertCustomerPassword = mutation({
  args: {
    email: v.string(),
    password_hash: v.string(),
    last_set_by_order_number: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const existing = await ctx.db
      .query('customer_passwords')
      .withIndex('email', (q) => q.eq('email', args.email))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        password_hash: args.password_hash,
        updated_at: now,
        last_set_by_order_number: args.last_set_by_order_number,
      });
      return existing._id;
    }

    return await ctx.db.insert('customer_passwords', {
      email: args.email,
      password_hash: args.password_hash,
      created_at: now,
      updated_at: now,
      last_set_by_order_number: args.last_set_by_order_number,
    });
  },
});

export const getCustomerPasswordByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('customer_passwords')
      .withIndex('email', (q) => q.eq('email', args.email))
      .first();
  },
});

export const sendLoginCodeEmail = action({
  args: {
    email: v.string(),
    otp: v.string(),
    expiresInMinutes: v.number(),
  },
  handler: async (_ctx, args) => {
    const resend = getResend();
    if (!resend) {
      throw new Error('Email service is not configured in Convex.');
    }

    try {
      const { error } = await resend.emails.send({
        from: getFromAddress(),
        to: [args.email],
        subject: 'Your Jammi sign-in code',
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;max-width:560px;margin:0 auto;padding:24px;">
            <h2 style="margin:0 0 12px;color:#4c1d95;">Jammi Customer Sign-In</h2>
            <p style="margin:0 0 16px;">Use this one-time code to sign in and view your orders:</p>
            <div style="font-size:32px;font-weight:700;letter-spacing:8px;padding:14px 18px;background:#f3f4f6;border-radius:10px;display:inline-block;">${args.otp}</div>
            <p style="margin:16px 0 0;">This code expires in ${args.expiresInMinutes} minutes.</p>
            <p style="margin:8px 0 0;color:#6b7280;font-size:13px;">If you did not request this code, you can ignore this email.</p>
          </div>
        `,
      });

      if (error) {
        const message =
          typeof error === 'string'
            ? error
            : error instanceof Error
              ? error.message
              : (error as any)?.message || (error as any)?.error || 'Failed to send sign-in code.';

        console.warn('[customerAuth:sendLoginCodeEmail] Resend rejected recipient:', args.email, message);
        return {
          ok: false,
          fallback: true,
          message:
            'This mail setup is still using a Resend sandbox or unverified sender. It can only deliver to verified/test recipients. To send OTPs to any email address, verify a real sender/domain in Resend and update RESEND_FROM_EMAIL, or add the recipient as a verified test address.',
        };
      }

      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error || 'Failed to send sign-in code.');
      console.warn('[customerAuth:sendLoginCodeEmail] Unexpected email failure:', args.email, message);
      return {
        ok: false,
        fallback: true,
        message:
          'This mail setup is still using a Resend sandbox or unverified sender. It can only deliver to verified/test recipients. To send OTPs to any email address, verify a real sender/domain in Resend and update RESEND_FROM_EMAIL, or add the recipient as a verified test address.',
      };
    }
  },
});

export const validateLoginCode = mutation({
  args: {
    email: v.string(),
    code_hash: v.string(),
    now: v.string(),
  },
  handler: async (ctx, args) => {
    const codes = await ctx.db
      .query('customer_auth_codes')
      .withIndex('email', (q) => q.eq('email', args.email))
      .collect();

    const latest = codes
      .sort((a, b) => {
        const aTime = new Date(a.created_at || 0).getTime();
        const bTime = new Date(b.created_at || 0).getTime();
        return bTime - aTime;
      })
      .find((c) => !c.consumed_at);

    if (!latest) {
      return { ok: false, reason: 'not_found' } as const;
    }

    if (new Date(latest.expires_at).getTime() <= new Date(args.now).getTime()) {
      await ctx.db.patch(latest._id, { consumed_at: args.now });
      return { ok: false, reason: 'expired' } as const;
    }

    const attempts = latest.attempts || 0;
    if (attempts >= MAX_OTP_ATTEMPTS) {
      return { ok: false, reason: 'locked' } as const;
    }

    if (latest.code_hash !== args.code_hash) {
      await ctx.db.patch(latest._id, { attempts: attempts + 1 });
      return {
        ok: false,
        reason: 'invalid',
        attemptsRemaining: Math.max(0, MAX_OTP_ATTEMPTS - (attempts + 1)),
      } as const;
    }

    await ctx.db.patch(latest._id, {
      attempts: attempts + 1,
      consumed_at: args.now,
    });

    return { ok: true } as const;
  },
});

export const createCustomerSession = mutation({
  args: {
    email: v.string(),
    token_hash: v.string(),
    expires_at: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    const existing = await ctx.db
      .query('customer_sessions')
      .withIndex('email', (q) => q.eq('email', args.email))
      .collect();

    for (const row of existing) {
      if (!row.revoked_at) {
        await ctx.db.patch(row._id, { revoked_at: now });
      }
    }

    return await ctx.db.insert('customer_sessions', {
      email: args.email,
      token_hash: args.token_hash,
      expires_at: args.expires_at,
      created_at: now,
      last_seen_at: now,
    });
  },
});

export const getCustomerSessionByTokenHash = query({
  args: {
    token_hash: v.string(),
    now: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('customer_sessions')
      .withIndex('token_hash', (q) => q.eq('token_hash', args.token_hash))
      .first();

    if (!session) return null;
    if (session.revoked_at) return null;

    if (new Date(session.expires_at).getTime() <= new Date(args.now).getTime()) {
      return null;
    }

    return session;
  },
});

export const revokeCustomerSession = mutation({
  args: {
    token_hash: v.string(),
    revoked_at: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('customer_sessions')
      .withIndex('token_hash', (q) => q.eq('token_hash', args.token_hash))
      .first();

    if (!session) return null;

    await ctx.db.patch(session._id as Id<'customer_sessions'>, {
      revoked_at: args.revoked_at,
    });

    return session._id;
  },
});
