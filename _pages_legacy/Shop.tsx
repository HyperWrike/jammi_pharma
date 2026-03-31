"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';
import { useAdmin } from '../components/admin/AdminContext';
import { productsApi } from '../lib/adminApi';
import { useRouter } from 'next/navigation';

const CONVEX_URL = 'https://cheerful-rhinoceros-28.convex.cloud';

const Shop: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All', 'Skin Care', 'Hair Care', 'Wellness', 'Therapeutics', 'Body Care', 'Oral Care & Wellness', 'Digestive Health', 'Immunity', 'Pain Relief']);
  const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS); // Initialize with mock products for instant loading
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop'
  });

  useEffect(() => {
    // window.scrollTo(0, 0); // Can safely be removed or left, but initialization is synchronous
    // setIsLoading(true); // Don't block UI with loading state since we have mock data


    let currentProducts: any[] = [];
    let currentCategories: any[] = [];

    const updateState = () => {
      const existingIds = new Set(currentProducts.map(prod => prod.id));
      const missingMockProducts = MOCK_PRODUCTS.filter(prod => !existingIds.has(String(prod.id)));
      
      const allProducts = [...currentProducts, ...missingMockProducts];
      setProducts(allProducts);
      
      const initialCategories = ['All'];
      const fetchedCategoryNames = currentCategories.map((cat: any) => cat.name);
      
      const uniqueCategories = new Set([...initialCategories, ...fetchedCategoryNames]);
      setCategories(Array.from(uniqueCategories));
      setIsLoading(false);
    };

    const convexQuery = async (path: string, args: any = {}) => {
      const res = await fetch(`${CONVEX_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, args, format: 'json' }),
      });
      const result = await res.json();
      if (result.status === 'error') {
        throw new Error(result.errorMessage || 'Convex query failed');
      }
      return result.value;
    };

    const fetchShopData = async () => {
      const catData = await convexQuery('functions/categories.js:listCategories', {});
      currentCategories = Array.isArray(catData) ? catData : [];
      const categoryNameById = new Map(
        currentCategories.map((cat: any) => [cat._id || cat.id, cat.name]),
      );

      const prodResult = await convexQuery('functions/products.js:listProducts', {
        status: 'published',
        page: 1,
        limit: 50,
      });
      const prodData = prodResult?.data || [];

      currentProducts = prodData.map((prod: any) => {
        const id = prod._id || prod.id;
        const categoryName = categoryNameById.get(prod.category_id) || 'Wellness';
        return {
          id,
          name: prod.name,
          label: categoryName,
          shortDesc: prod.short_description || (prod.description ? prod.description.replace(/<[^>]+>/g, '').substring(0, 100) : 'Traditional formulation.'),
          price: prod.price || 0,
          image: prod.images?.[0] || 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
          category: categoryName,
          status: prod.status
        };
      });

      updateState();
    };

    fetchShopData();

    // Supabase realtime is removed; poll Convex-backed data periodically.
    const intervalId = window.setInterval(fetchShopData, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handleAddProduct = async () => {
    setIsAdding(true);
    try {
      const catResult = await fetch(`${CONVEX_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: 'functions/categories.js:listCategories', args: {}, format: 'json' }),
      });
      const catJson = await catResult.json();
      const firstCategory = Array.isArray(catJson?.value) ? catJson.value[0] : null;
      
      const res = await productsApi.create({
        name: 'New Formulation',
        description: 'Describe the new formulation...',
        short_description: 'A traditional remedy.',
        price: 0,
        category_id: firstCategory?._id || firstCategory?.id || null,
        images: ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop'],
        status: 'published',
        stock: 100
      });
      
      if (res && res.data && res.data.id) {
         router.push(`/product/${res.data.id}`);
      }
    } catch (err: any) {
      alert(err.message || "Failed to add product");
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-black text-slate-900">
              <LiveEditable collection="content" docId="shop" field="title">Curated <span className="text-primary italic">Rituals</span></LiveEditable>
            </h2>
            <p className="text-slate-500 font-dm max-w-md">
              <LiveEditable collection="content" docId="shop" field="description">Explore our collection of traditional formulations, crafted with wisdom and pure botanicals.</LiveEditable>
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
            <div className="flex gap-4 pb-2">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 hover:text-primary border border-primary/5'}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {isAdmin && (
              <button
                onClick={handleAddProduct}
                disabled={isAdding}
                className="flex items-center gap-2 bg-forest text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-forest/90 transition-all shadow-lg shrink-0 disabled:opacity-50"
              >
                {isAdding ? (
                   <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                ) : (
                   <span className="material-symbols-outlined text-[20px]">add_circle</span>
                )}
                {isAdding ? 'Creating...' : 'Add Product'}
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-6 bg-slate-200 rounded w-1/4 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products
              .filter(p => activeCategory === 'All' || p.category === activeCategory || p.label === activeCategory)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
