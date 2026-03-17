import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { getGuestId } from '../lib/guestId';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    original_price: number;
    images: string[];
    stock_status: string;
    stock: number;
  };
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const guestId = useRef<string>('');

  useEffect(() => {
    guestId.current = getGuestId();
  }, []);

  const fetchCart = useCallback(async (gid: string) => {
    if (!supabase) return;
    const { data } = await supabase
      .from('guest_carts')
      .select(`
        id,
        product_id,
        quantity,
        product:products (
          id, name, price, original_price, images, stock_status, stock
        )
      `)
      .eq('guest_id', gid);
    setItems((data as unknown as CartItem[]) || []);
  }, []);

  // Load cart + realtime subscription
  useEffect(() => {
    const gid = getGuestId();
    guestId.current = gid;
    if (!gid || !supabase) { setLoading(false); return; }

    fetchCart(gid).finally(() => setLoading(false));

    const channel = supabase
      .channel(`cart-${gid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guest_carts',
          filter: `guest_id=eq.${gid}`,
        },
        () => { fetchCart(gid); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchCart]);

  // Add product — upserts so duplicates just update quantity
  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    const gid = getGuestId();
    if (!gid) return;

    // Check if already in cart — add to existing quantity
    const existing = items.find(i => i.product_id === productId);
    if (existing) {
      await supabase
        .from('guest_carts')
        .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
        .eq('guest_id', gid)
        .eq('product_id', productId);
    } else {
      await supabase
        .from('guest_carts')
        .insert({
          guest_id: gid,
          product_id: productId,
          quantity,
          updated_at: new Date().toISOString(),
        });
    }
    // Realtime subscription triggers re-fetch automatically
  }, [items]);

  // Increase qty by 1
  const increaseQty = useCallback(async (productId: string) => {
    const gid = getGuestId();
    if (!gid) return;
    const item = items.find(i => i.product_id === productId);
    if (!item) return;
    await supabase
      .from('guest_carts')
      .update({ quantity: item.quantity + 1, updated_at: new Date().toISOString() })
      .eq('guest_id', gid)
      .eq('product_id', productId);
  }, [items]);

  // Decrease qty — remove if reaches 0
  const decreaseQty = useCallback(async (productId: string) => {
    const gid = getGuestId();
    if (!gid) return;
    const item = items.find(i => i.product_id === productId);
    if (!item) return;
    if (item.quantity <= 1) {
      await supabase.from('guest_carts').delete().eq('guest_id', gid).eq('product_id', productId);
    } else {
      await supabase
        .from('guest_carts')
        .update({ quantity: item.quantity - 1, updated_at: new Date().toISOString() })
        .eq('guest_id', gid)
        .eq('product_id', productId);
    }
  }, [items]);

  // Remove one product
  const removeFromCart = useCallback(async (productId: string) => {
    const gid = getGuestId();
    if (!gid) return;
    await supabase.from('guest_carts').delete().eq('guest_id', gid).eq('product_id', productId);
  }, []);

  // Clear entire cart (after order placed)
  const clearCart = useCallback(async () => {
    const gid = getGuestId();
    if (!gid) return;
    await supabase.from('guest_carts').delete().eq('guest_id', gid);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.quantity, 0);

  return {
    items,
    loading,
    totalItems,
    subtotal,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    guestId: guestId.current,
  };
}
