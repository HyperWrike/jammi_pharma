
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../hooks/useCart';
import LiveEditable from './admin/LiveEditable';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    label: string;
    shortDesc: string;
    price: number;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (adding || added) return;
    setAdding(true);
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.id,
        quantity: 1,
        variant_id: null,
        variant_label: null
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Failed to add to cart', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="group cursor-pointer" onClick={() => router.push(`/product/${product.id}`)}>
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-6 border border-primary/5 shadow-sm group-hover:shadow-md transition-all duration-500">
        <Image
          alt={product.name}
          src={product.image}
          width={400}
          height={533}
          className="w-full h-full object-contain p-8 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/10">
          {product.label}
        </div>
      </div>
      <h4 className="font-sans font-bold text-2xl mb-2 group-hover:text-primary transition-colors text-slate-900">
        <LiveEditable collection="products" docId={product.id} field="name">
          {product.name}
        </LiveEditable>
      </h4>
      <p className="text-slate-500 text-sm mb-4 font-dm line-clamp-2">
        <LiveEditable collection="products" docId={product.id} field="shortDesc" multiline>
          {product.shortDesc}
        </LiveEditable>
      </p>
      <div className="flex items-center justify-between border-t border-primary/10 pt-4">
        <span className="text-xl font-bold text-slate-900">
          ₹<LiveEditable collection="products" docId={product.id} field="price" inputType="number">
            {product.price}
          </LiveEditable>
        </span>
        <button
          className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-all duration-200 ${
            added
              ? 'text-green-600'
              : adding
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-primary hover:text-primary/70'
          }`}
          onClick={handleQuickAdd}
          disabled={adding}
        >
          {added ? (
            <><span className="material-symbols-outlined text-sm">check</span> Added</>
          ) : adding ? (
            <>Adding...</>
          ) : (
            <>Quick Add <span className="material-symbols-outlined text-sm">add</span></>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
