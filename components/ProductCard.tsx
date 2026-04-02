"use client";
import React from 'react';
import Link from 'next/link';

type Product = { id: string; name: string; shortDesc?: string; price?: number; image?: string; label?: string };

export default function ProductCard({ product }: { product: Product }) {
  const image = product.image || '/images/placeholder.png';
  return (
    <div className="legacy-product-card w-full" style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
      <Link href={`/product/${product.id}`}>
        <img src={image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
      </Link>
      <h3 style={{ fontSize: 18, margin: '8px 0 4px' }}>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <p style={{ color: '#6b7280', fontSize: 14, minHeight: 40 }}>{product.shortDesc ?? ''}</p>
      {typeof product.price !== 'undefined' && <div style={{ fontWeight: 700 }}>₹{product.price}</div>}
    </div>
  );
}
