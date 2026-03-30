// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Hoisted mocks (declared before vi.mock is evaluated) ─────────────────
const { mockGetUser, mockFrom } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock('../../lib/supabase', () => ({
  supabase: {},
  supabaseAdmin: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
  },
}));

import { verifyAdmin, unauthorized, serverError } from '../../lib/adminAuth';
import { NextResponse } from 'next/server';

// Helper to build a minimal Next.js-like request
function makeReq(token: string) {
  return { headers: new Headers({ authorization: `Bearer ${token}` }) };
}

function makeChainFor(adminRecord: any) {
  return {
    select: () => ({
      eq: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: adminRecord, error: adminRecord ? null : { message: 'not found' } }),
        }),
      }),
    }),
  };
}

describe('verifyAdmin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when no authorization header is present', async () => {
    const req = { headers: new Headers() };
    const result = await verifyAdmin(req);
    expect(result).toBeNull();
  });

  it('accepts the hardcoded bypass token', async () => {
    const req = makeReq('JAMMI_ADMIN_MASTER_KEY_2024');
    const result = await verifyAdmin(req);
    expect(result).not.toBeNull();
    expect(result.user.id).toBe('jammi-bypass');
    expect(result.adminRecord.role).toBe('admin');
  });

  it('accepts the JAMMI_BYPASS_TOKEN env variable', async () => {
    const original = process.env.JAMMI_BYPASS_TOKEN;
    process.env.JAMMI_BYPASS_TOKEN = 'MY_SECRET_TOKEN';
    const req = makeReq('MY_SECRET_TOKEN');
    const result = await verifyAdmin(req);
    expect(result?.user.id).toBe('jammi-bypass');
    process.env.JAMMI_BYPASS_TOKEN = original;
  });

  it('returns null when Supabase getUser fails', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: { message: 'invalid token' } });
    const req = makeReq('invalid-jwt');
    const result = await verifyAdmin(req);
    expect(result).toBeNull();
  });

  it('returns null when the user is not in admin_users', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: 'user-123', email: 'test@example.com' } }, error: null });
    mockFrom.mockReturnValue(makeChainFor(null));
    const req = makeReq('valid-jwt-non-admin');
    const result = await verifyAdmin(req);
    expect(result).toBeNull();
  });

  it('returns user and adminRecord for a valid active admin', async () => {
    const fakeUser = { id: 'user-abc', email: 'admin@jammi.in' };
    const fakeAdmin = { id: 'adm-1', role: 'admin', name: 'Test Admin', status: 'active' };
    mockGetUser.mockResolvedValue({ data: { user: fakeUser }, error: null });
    mockFrom.mockReturnValue(makeChainFor(fakeAdmin));

    const req = makeReq('valid-jwt-admin');
    const result = await verifyAdmin(req);
    expect(result?.user).toEqual(fakeUser);
    expect(result?.adminRecord).toEqual(fakeAdmin);
  });
});

describe('unauthorized', () => {
  it('returns a 401 NextResponse', () => {
    const res = unauthorized() as NextResponse;
    expect(res.status).toBe(401);
  });
});

describe('serverError', () => {
  it('returns a 500 NextResponse', () => {
    const res = serverError(new Error('boom')) as NextResponse;
    expect(res.status).toBe(500);
  });
});
