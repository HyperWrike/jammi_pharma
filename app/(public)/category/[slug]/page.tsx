"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../../../../components/ProductCard';

const CONVEX_URL = 'https://cheerful-rhinoceros-28.convex.cloud';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    
    const fetchCategoryProducts = async () => {
      try {
        const formattedSlug = slug.replace(/-/g, ' ');

        // Fetch categories first to possibly get the right ID
        const catRes = await fetch(`${CONVEX_URL}/api/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: 'functions/categories:listCategories', args: {}, format: 'json' }),
        });
        const catData = await catRes.json();
        const categories = Array.isArray(catData?.value) ? catData.value : [];
        const categoryNameById = new Map(categories.map((c: any) => [c._id || c.id, c.name]));

        // Fetch all products
        const prodRes = await fetch(`${CONVEX_URL}/api/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: 'functions/products:listProducts', args: { status: 'published', page: 1, limit: 100 }, format: 'json' }),
        });
        const prodResult = await prodRes.json();
        const allProducts = prodResult?.value?.data || [];
        
        let initialMatches = new Set<string>();
        if (formattedSlug.toLowerCase() === 'skin care' || formattedSlug.toLowerCase() === 'hair care') {
           initialMatches = new Set(['Skin Complexion', 'Hair Fall', 'Dandruff', 'Acne/Pimples', 'Skin Dullness']);
        } else {
           initialMatches.add(formattedSlug.toLowerCase());
        }

        // Map and Filter products
        const mappedProducts = allProducts.map((prod: any) => {
          const categoryName = categoryNameById.get(prod.category_id) || 'Wellness';
          return {
            id: prod._id || prod.id,
            name: prod.name,
            label: categoryName,
            shortDesc: prod.short_description || (prod.description ? prod.description.replace(/<[^>]+>/g, '').substring(0, 100) : ''),
            price: prod.price || 0,
            image: prod.images?.[0] || 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
            category: categoryName,
            status: prod.status,
            ingredients: prod.ingredients || []
          };
        });

        // Simplified filtering
        const filtered = mappedProducts.filter((p: any) => {
          let found = false;
          const searchHaystack = `${p.name ?? ''} ${p.shortDesc ?? ''} ${p.label ?? ''} ${p.category ?? ''}`.toLowerCase();
          initialMatches.forEach(match => {
            if (searchHaystack.includes(match)) {
              found = true;
            }
          });
          return found;
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch products for category", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  return (
    <div className="bg-[#FDF9F0] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="text-sm font-medium text-slate-500 flex gap-2 items-center mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-[var(--yellow)] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/treatments" className="hover:text-[var(--yellow)] transition-colors">Treatments</Link>
            <span>›</span>
            <span className="text-[var(--yellow)]">{slug.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--purple)] capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl text-lg">
            Explore our traditional formulations and remedies selected for {slug.replace(/-/g, ' ')}.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8 pb-4 border-b border-black/10">
           <span className="text-slate-600 font-bold uppercase tracking-widest text-sm">
             {products.length} Products Found
           </span>
           <Link href="/shop" className="text-sm font-bold bg-[var(--purple)] text-white px-5 py-2.5 rounded hover:bg-[var(--yellow)] hover:text-[var(--purple)] transition-colors uppercase tracking-widest">
             View Full Shop
           </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="w-full aspect-square bg-slate-200 rounded-xl" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} showQuickAdd={true} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">inventory_2</span>
              <p className="text-xl text-slate-600 mb-2 font-medium">No particular products found in this specific category.</p>
              <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">Please check our full shop for all available remedies.</p>
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-[var(--purple)] text-white rounded-lg text-sm font-semibold hover:brightness-95 shadow-sm"
              >
                Go to Shop
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
