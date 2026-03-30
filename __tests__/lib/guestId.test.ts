import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getGuestId } from '../../lib/guestId';

describe('getGuestId', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('generates a UUID on first call', () => {
    const id = getGuestId();
    // UUID v4 pattern
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('returns the same ID on subsequent calls', () => {
    const first = getGuestId();
    const second = getGuestId();
    expect(first).toBe(second);
  });

  it('persists the ID in localStorage', () => {
    const id = getGuestId();
    expect(localStorage.getItem('guest_uid')).toBe(id);
  });

  it('reads an existing guest_uid from localStorage', () => {
    const existing = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
    localStorage.setItem('guest_uid', existing);
    const id = getGuestId();
    expect(id).toBe(existing);
  });

  it('returns empty string on server-side (window undefined)', () => {
    const original = globalThis.window;
    // @ts-expect-error — simulate SSR
    delete globalThis.window;

    const id = getGuestId();
    expect(id).toBe('');

    // Restore window
    globalThis.window = original;
  });
});
