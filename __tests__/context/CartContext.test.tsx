import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CartProvider, useCart } from '../../context/CartContext';

// ── Helper component that exercises the cart via the hook ────────────────
function TestCart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="subtotal">{subtotal}</span>
      <ul>
        {cartItems.map((i: any) => (
          <li key={`${i.id}-${i.variant_id}`} data-testid={`item-${i.id}`}>
            {i.name} × {i.quantity}
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart({ id: 'p1', name: 'Ashwagandha', price: 100, quantity: 1, variant_id: null })}>
        add-p1
      </button>
      <button onClick={() => addToCart({ id: 'p1', name: 'Ashwagandha', price: 100, quantity: 2, variant_id: null })}>
        add-p1-again
      </button>
      <button onClick={() => addToCart({ id: 'p2', name: 'Triphala', price: 200, quantity: 1, variant_id: null })}>
        add-p2
      </button>
      <button onClick={() => removeFromCart('p1', null)}>remove-p1</button>
      <button onClick={() => updateQuantity('p2', null, 4)}>update-p2-to-4</button>
      <button onClick={() => updateQuantity('p2', null, 0)}>update-p2-to-0</button>
      <button onClick={() => increaseQty('p1', null)}>inc-p1</button>
      <button onClick={() => decreaseQty('p1', null)}>dec-p1</button>
      <button onClick={clearCart}>clear</button>
    </div>
  );
}

function renderCart() {
  return render(
    <CartProvider>
      <TestCart />
    </CartProvider>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty cart', () => {
    renderCart();
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('addToCart adds a new item', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('item-p1')).toBeDefined();
  });

  it('addToCart accumulates quantity for the same item', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    await userEvent.click(screen.getByText('add-p1-again'));
    expect(screen.getByTestId('count').textContent).toBe('3');
  });

  it('cartCount reflects total quantity across all items', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    await userEvent.click(screen.getByText('add-p2'));
    expect(screen.getByTestId('count').textContent).toBe('2');
  });

  it('subtotal sums price × quantity', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1')); // 100 × 1
    await userEvent.click(screen.getByText('add-p2')); // 200 × 1
    expect(screen.getByTestId('subtotal').textContent).toBe('300');
  });

  it('removeFromCart removes only the target item', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    await userEvent.click(screen.getByText('add-p2'));
    await userEvent.click(screen.getByText('remove-p1'));
    expect(screen.queryByTestId('item-p1')).toBeNull();
    expect(screen.getByTestId('item-p2')).toBeDefined();
  });

  it('updateQuantity changes the item quantity', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p2'));
    await userEvent.click(screen.getByText('update-p2-to-4'));
    expect(screen.getByTestId('item-p2').textContent).toContain('4');
  });

  it('updateQuantity with qty 0 removes the item', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p2'));
    await userEvent.click(screen.getByText('update-p2-to-0'));
    expect(screen.queryByTestId('item-p2')).toBeNull();
  });

  it('increaseQty increments the item quantity by 1', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    await userEvent.click(screen.getByText('inc-p1'));
    expect(screen.getByTestId('item-p1').textContent).toContain('2');
  });

  it('decreaseQty removes the item when quantity reaches 1', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    await userEvent.click(screen.getByText('dec-p1'));
    expect(screen.queryByTestId('item-p1')).toBeNull();
  });

  it('clearCart empties the cart', async () => {
    renderCart();
    await userEvent.click(screen.getByText('add-p1'));
    await userEvent.click(screen.getByText('add-p2'));
    await userEvent.click(screen.getByText('clear'));
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
