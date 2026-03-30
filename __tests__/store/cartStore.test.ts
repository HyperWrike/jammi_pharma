import { describe, it, expect, beforeEach } from 'vitest';
import { act } from 'react';
import { useCartStore } from '../../store/cartStore';

const sampleItem = {
  id: 'prod-1',
  name: 'Ashwagandha Capsules',
  price: 299,
  image: '/images/ashwagandha.jpg',
  quantity: 1,
};

describe('useCartStore', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('starts with an empty cart', () => {
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('addItem adds a new product to the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
    });
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('prod-1');
    expect(items[0].quantity).toBe(1);
  });

  it('addItem increases quantity when the same product is added again', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem({ ...sampleItem, quantity: 2 });
    });
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it('addItem keeps separate entries for different products', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem({ ...sampleItem, id: 'prod-2', name: 'Triphala' });
    });
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it('removeItem removes the correct product', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem({ ...sampleItem, id: 'prod-2', name: 'Triphala' });
      useCartStore.getState().removeItem('prod-1');
    });
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('prod-2');
  });

  it('removeItem is a no-op for unknown product IDs', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().removeItem('non-existent');
    });
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('updateQuantity changes the quantity of an existing item', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().updateQuantity('prod-1', 5);
    });
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('clearCart empties the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem({ ...sampleItem, id: 'prod-2', name: 'Triphala' });
      useCartStore.getState().clearCart();
    });
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
