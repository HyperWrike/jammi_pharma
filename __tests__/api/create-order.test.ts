// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// ── Mocks (must be hoisted above all imports) ────────────────────────────
const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockUpdate = vi.fn();
const mockSingle = vi.fn();
const mockEq = vi.fn();
const mockLike = vi.fn();
const mockOrder = vi.fn();
const mockLimit = vi.fn();
const mockSendEmail = vi.fn();

// Chain builder so mockFrom().select().eq()… works
function chainBuilder(terminalFn: () => any) {
  const chain: any = {};
  ['select', 'eq', 'single', 'insert', 'update', 'like', 'order', 'limit'].forEach((m) => {
    chain[m] = () => chain;
  });
  chain.single = terminalFn;
  chain.insert = vi.fn(() => ({ select: () => ({ single: terminalFn }) }));
  chain.update = vi.fn(() => ({ eq: () => Promise.resolve({ error: null }) }));
  return chain;
}

vi.mock('../../lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn((table: string) => {
      if (table === 'customers') {
        return {
          select: () => ({ eq: () => ({ single: mockSingle }) }),
          insert: mockInsert,
          update: () => ({ eq: () => Promise.resolve({ error: null }) }),
        };
      }
      if (table === 'orders') {
        return {
          insert: () => ({
            select: () => ({
              single: () =>
                Promise.resolve({
                  data: { id: 'order-uuid-123', order_number: 'JMP-20260330-1042' },
                  error: null,
                }),
            }),
          }),
        };
      }
      return { insert: vi.fn(() => Promise.resolve({ error: null })) };
    }),
  },
}));

vi.mock('../../lib/customers', () => ({
  generateCustomerId: vi.fn().mockResolvedValue('customer-01'),
}));

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockSendEmail.mockResolvedValue({ error: null }) },
  })),
}));

// Minimal mocks for email components (they return React elements that Resend
// serialises; here we just need them to not throw)
vi.mock('../../components/emails/OrderConfirmationEmail', () => ({
  OrderConfirmationEmail: () => null,
}));
vi.mock('../../components/emails/OrderConfirmationInternal', () => ({
  OrderConfirmationInternal: () => null,
}));

import { POST } from '../../app/api/create-order/route';

// ── Helpers ──────────────────────────────────────────────────────────────
function makeRequest(body: object, ip = '127.0.0.1') {
  return new NextRequest('http://localhost/api/create-order', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  customerName: 'Priya Sharma',
  customerEmail: 'priya@example.com',
  customerPhone: '9876543210',
  shippingAddress: { address: '12 MG Road', city: 'Mumbai', pincode: '400001' },
  items: [{ name: 'Ashwagandha', quantity: 2, price: 299 }],
  subtotal: 598,
  discount: 0,
  total: 598,
};

describe('POST /api/create-order', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: customer not found (new customer flow)
    mockSingle.mockResolvedValue({ data: null, error: { code: 'PGRST116' } });
    mockInsert.mockResolvedValue({ error: null });
    process.env.RESEND_API_KEY = 'test-key';
  });

  it('returns 400 when required fields are missing', async () => {
    const req = makeRequest({ customerName: 'Only Name' });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('Missing required fields');
  });

  it('returns 400 when items array is empty', async () => {
    const req = makeRequest({ ...validPayload, items: [] });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns 200 with orderNumber for a valid new-customer order', async () => {
    const req = makeRequest(validPayload);
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.orderNumber).toMatch(/^JMP-/);
  });

  it('returns 200 and updates existing customer data', async () => {
    mockSingle.mockResolvedValue({ data: { id: 'customer-05' }, error: null });
    const req = makeRequest(validPayload, '10.0.0.5');
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('returns 429 when rate limit is exceeded', async () => {
    // Use a unique IP that we'll exhaust quickly
    const ip = `192.168.99.${Math.floor(Math.random() * 255)}`;
    // Exhaust 10 allowed requests
    for (let i = 0; i < 10; i++) {
      await POST(makeRequest(validPayload, ip));
    }
    const blocked = await POST(makeRequest(validPayload, ip));
    expect(blocked.status).toBe(429);
  });

  it('includes rate-limit headers in the success response', async () => {
    const req = makeRequest(validPayload, `172.20.${Math.floor(Math.random() * 255)}.1`);
    const res = await POST(req);
    expect(res.headers.get('X-RateLimit-Remaining')).not.toBeNull();
    expect(res.headers.get('X-RateLimit-Reset')).not.toBeNull();
  });
});
