"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../hooks/useCart';

type Product = { id: string; name: string; shortDesc?: string; price?: number; image?: string; label?: string };

export default function ProductCard({ product, showQuickAdd = false }: { product: Product; showQuickAdd?: boolean }) {
  const { addToCart } = useCart();
  const image = product.image || '/images/placeholder.png';

  const handleQuickAdd = async () => {
    await addToCart({
      id: product.id,
      product_id: product.id,
      name: product.name,
      price: Number(product.price || 0),
      image,
      quantity: 1,
      variant_id: null,
    });
  };

  return (
    <div className="legacy-product-card w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block rounded-xl overflow-hidden bg-slate-50 mb-5">
        <img src={image} alt={product.name} className="w-full aspect-square object-contain" />
      </Link>

      <div className="space-y-3">
        <h3 className="text-lg font-bold leading-tight text-slate-900">
          <Link href={`/product/${product.id}`} className="hover:text-[var(--purple)] transition-colors">{product.name}</Link>
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed min-h-[44px]">{product.shortDesc ?? ''}</p>

        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-black text-[var(--purple)]">₹{Number(product.price || 0)}</div>
          {showQuickAdd ? (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="inline-flex items-center gap-1 rounded-lg bg-[var(--purple)] px-3 py-2 text-xs font-bold text-white hover:brightness-95"
            >
              <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
              Quick Add
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
