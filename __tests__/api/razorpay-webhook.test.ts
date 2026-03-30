// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHmac } from 'crypto';
import { NextRequest } from 'next/server';

// ── Hoisted mocks (declared before vi.mock is evaluated) ─────────────────
const { mockFrom, mockSendEmail } = vi.hoisted(() => ({
  mockFrom: vi.fn(),
  mockSendEmail: vi.fn().mockResolvedValue({ error: null }),
}));

vi.mock('../../lib/supabase', () => ({
  supabaseAdmin: { from: mockFrom },
}));

vi.mock('../../lib/customers', () => ({
  generateCustomerId: vi.fn().mockResolvedValue('customer-99'),
}));

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSendEmail },
  })),
}));

vi.mock('../../components/emails/OrderConfirmationEmail', () => ({
  OrderConfirmationEmail: () => null,
}));
vi.mock('../../components/emails/OrderConfirmationInternal', () => ({
  OrderConfirmationInternal: () => null,
}));

import { POST } from '../../app/api/razorpay-webhook/route';

// ── Helpers ──────────────────────────────────────────────────────────────
const WEBHOOK_SECRET = 'test-webhook-secret';

function sign(body: string) {
  return createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
}

function makeReq(payload: object, options: { sign?: boolean; badSig?: boolean } = { sign: true }) {
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-forwarded-for': '1.2.3.4',
  };
  if (options.sign) {
    headers['x-razorpay-signature'] = sign(body);
  }
  if (options.badSig) {
    headers['x-razorpay-signature'] = 'bad-signature';
  }
  return new NextRequest('http://localhost/api/razorpay-webhook', {
    method: 'POST',
    headers,
    body,
  });
}

function buildOrderRow(overrides = {}) {
  return {
    id: 'order-db-id',
    order_number: 'JMP-20260330-5001',
    customer_name: 'Rahul Verma',
    customer_email: 'rahul@example.com',
    customer_phone: '9999999999',
    items: [{ name: 'Triphala', quantity: 1, price: 199 }],
    subtotal: 199,
    discount: 0,
    total: 199,
    shipping_address: { address: '5 Park St', city: 'Delhi', pincode: '110001' },
    ...overrides,
  };
}

// Standard from() chain that returns an order
function fromWithOrder(order = buildOrderRow()) {
  return (table: string) => {
    if (table === 'orders') {
      return {
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: order, error: null }) }) }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      };
    }
    if (table === 'payments') {
      return { insert: () => Promise.resolve({ error: null }) };
    }
    if (table === 'customers') {
      return {
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: { id: 'c-1', total_orders: 3, total_spent: 600 }, error: null }),
          }),
        }),
        update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        insert: () => Promise.resolve({ error: null }),
      };
    }
    return {};
  };
}

const capturedEvent = (overrides = {}) => ({
  event: 'payment.captured',
  payload: {
    payment: {
      entity: {
        id: 'pay_abc123',
        order_id: 'order_rzp_001',
        amount: 19900, // paise
        method: 'upi',
        email: 'rahul@example.com',
        contact: '9999999999',
        ...overrides,
      },
    },
  },
});

describe('POST /api/razorpay-webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RAZORPAY_WEBHOOK_SECRET = WEBHOOK_SECRET;
    process.env.RESEND_API_KEY = 'test-key';
    mockFrom.mockImplementation(fromWithOrder());
  });

  // ── Signature verification ──────────────────────────────────────────────
  it('returns 400 for an invalid signature', async () => {
    const req = makeReq(capturedEvent(), { badSig: true });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('Invalid webhook signature');
  });

  it('accepts a valid signature', async () => {
    const req = makeReq(capturedEvent());
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('returns 400 for invalid JSON payload', async () => {
    const body = 'not-json';
    const sig = createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
    const req = new NextRequest('http://localhost/api/razorpay-webhook', {
      method: 'POST',
      headers: { 'x-razorpay-signature': sig, 'x-forwarded-for': '1.2.3.4' },
      body,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  // ── payment.captured ───────────────────────────────────────────────────
  it('returns { received: true, event: "payment.captured" } on success', async () => {
    const req = makeReq(capturedEvent());
    const res = await POST(req);
    const json = await res.json();
    expect(json.received).toBe(true);
    expect(json.event).toBe('payment.captured');
  });

  it('returns 400 when payment entity is missing in captured event', async () => {
    const payload = { event: 'payment.captured', payload: {} };
    const req = makeReq(payload);
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('converts amount from paise to rupees correctly', async () => {
    const insertFn = vi.fn().mockResolvedValue({ error: null });
    mockFrom.mockImplementation((table: string) => {
      const base = fromWithOrder()();
      if (table === 'payments') return { insert: insertFn };
      return fromWithOrder()(table);
    });

    const req = makeReq(capturedEvent());
    await POST(req);
    // insertFn should have been called with amount = 199 (19900 / 100)
    const callArg = insertFn.mock.calls[0]?.[0];
    expect(callArg?.amount).toBe(199);
  });

  // ── payment.failed ─────────────────────────────────────────────────────
  it('returns { received: true, event: "payment.failed" } for failed payment', async () => {
    const failedPayload = {
      event: 'payment.failed',
      payload: {
        payment: {
          entity: {
            id: 'pay_fail99',
            order_id: 'order_rzp_002',
            amount: 59900,
            method: 'card',
          },
        },
      },
    };
    mockFrom.mockImplementation((table: string) => {
      if (table === 'orders') {
        return { update: () => ({ eq: () => Promise.resolve({ error: null }) }) };
      }
      if (table === 'payments') {
        return { insert: () => Promise.resolve({ error: null }) };
      }
      return {};
    });

    const req = makeReq(failedPayload);
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.event).toBe('payment.failed');
  });

  // ── Unknown events ─────────────────────────────────────────────────────
  it('acknowledges unknown events with 200', async () => {
    const unknownPayload = { event: 'refund.created', payload: {} };
    const req = makeReq(unknownPayload);
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.received).toBe(true);
    expect(json.event).toBe('refund.created');
  });

  // ── Rate limiting ──────────────────────────────────────────────────────
  it('returns 429 when the webhook rate limit is exceeded', async () => {
    const ip = `10.20.${Math.floor(Math.random() * 255)}.1`;
    const makeRateReq = () => {
      const body = JSON.stringify(capturedEvent());
      const sig = sign(body);
      return new NextRequest('http://localhost/api/razorpay-webhook', {
        method: 'POST',
        headers: { 'x-razorpay-signature': sig, 'x-forwarded-for': ip },
        body,
      });
    };

    // Exhaust 30 allowed requests
    for (let i = 0; i < 30; i++) {
      await POST(makeRateReq());
    }
    const blocked = await POST(makeRateReq());
    expect(blocked.status).toBe(429);
  });
});
