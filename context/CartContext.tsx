"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>({
  cartItems: [],
  items: [],
  totalItems: 0,
  cartCount: 0,
  subtotal: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  clearCart: () => {}
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jammi_cart');
      if (stored) setCartItems(JSON.parse(stored));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('jammi_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const idx = prev.findIndex(
        i => i.id === product.id && i.variant_id === product.variant_id
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + (product.quantity || 1) };
        return updated;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string, variant_id: string | null = null) =>
    setCartItems(prev => prev.filter(i => !(i.id === id && i.variant_id === variant_id)));

  const updateQuantity = (id: string, variant_id: string | null = null, qty: number) => {
    if (qty < 1) { removeFromCart(id, variant_id); return; }
    setCartItems(prev =>
      prev.map(i => i.id === id && i.variant_id === variant_id ? { ...i, quantity: qty } : i)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('jammi_cart');
  };

  const increaseQty = (id: string, variant_id: string | null = null) => {
    const item = cartItems.find(i => (i.product_id || i.id) === id && i.variant_id === variant_id);
    if (item) updateQuantity(id, variant_id, item.quantity + 1);
  };

  const decreaseQty = (id: string, variant_id: string | null = null) => {
    const item = cartItems.find(i => (i.product_id || i.id) === id && i.variant_id === variant_id);
    if (item && item.quantity > 1) updateQuantity(id, variant_id, item.quantity - 1);
    else if (item) removeFromCart(id, variant_id);
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + (i.price || i.product?.price || 0) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items: cartItems, 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      increaseQty, 
      decreaseQty, 
      clearCart, 
      totalItems: cartCount, 
      cartCount, 
      subtotal: cartTotal, 
      cartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
