"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';
import { useAdmin } from '../components/admin/AdminContext';
import { productsApi } from '../lib/adminApi';
import { useRouter } from 'next/navigation';

const CONVEX_URL = 'https://cheerful-rhinoceros-28.convex.cloud';

const CONCERN_GROUP_OPTIONS = ['Wellness', 'Skin & Hair Care', 'Therapeutics/Cures'] as const;
const CONCERNS_BY_GROUP: Record<(typeof CONCERN_GROUP_OPTIONS)[number], string[]> = {
  'Wellness': [
    'Immunity',
    'Fatty Liver',
    'Digestion',
    'IBS',
    'Pre-Diabetes',
    'Obesity',
    'Aches & Pains',
    'Heart Health',
    'Kidney/Gall Bladder Stones',
    'Male & Female Sexual Wellness',
    'Stress',
    'Thyroid Related',
  ],
  'Skin & Hair Care': ['Acne/Pimples', 'Skin Complexion', 'Lip and Oral Care', 'Skin Dullness', 'Hair Fall', 'Dandruff'],
  'Therapeutics/Cures': [
    'Liver Diseases',
    'Prostate Disorders',
    'Viral Fevers',
    'Asthma/Wheezing',
    'Anaemia – Ayurin',
    'Coughs and Colds',
    'Weakened Immunity',
    'Gynaecological Health',
    'Gut-health Disorders',
    'Psoriasis/Eczema',
    'Diabetes',
  ],
};

const FORM_TYPES = ['Tablet', 'Syrup', 'Powder', 'Oil', 'Cream', 'Capsule'] as const;
const PRICE_RANGES = [
  { key: 'under200', label: 'Under ₹200', min: 0, max: 199.99 },
  { key: '200to500', label: '₹200–₹500', min: 200, max: 500 },
  { key: '500to1000', label: '₹500–₹1000', min: 500.01, max: 1000 },
  { key: 'above1000', label: 'Above ₹1000', min: 1000.01, max: Number.POSITIVE_INFINITY },
] as const;

const Shop: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS); // Initialize with mock products for instant loading
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useAdmin();
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Filter Bar state (Brand Spec)
  const [activeConcernGroup, setActiveConcernGroup] = useState<(typeof CONCERN_GROUP_OPTIONS)[number]>('Wellness');
  const [activeConcern, setActiveConcern] = useState<string>(CONCERNS_BY_GROUP['Wellness'][0]);
  const [activeFormType, setActiveFormType] = useState<(typeof FORM_TYPES)[number]>('Tablet');
  const [activePriceRange, setActivePriceRange] = useState<(typeof PRICE_RANGES)[number]['label']>('Under ₹200');

  useEffect(() => {
    setActiveConcern(CONCERNS_BY_GROUP[activeConcernGroup][0]);
  }, [activeConcernGroup]);
  
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
      const catData = await convexQuery('functions/categories:listCategories', {});
      currentCategories = Array.isArray(catData) ? catData : [];
      const categoryNameById = new Map(
        currentCategories.map((cat: any) => [cat._id || cat.id, cat.name]),
      );

      const prodResult = await convexQuery('functions/products:listProducts', {
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
        body: JSON.stringify({ path: 'functions/categories:listCategories', args: {}, format: 'json' }),
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

  const inferFormType = (product: any): (typeof FORM_TYPES)[number] | null => {
    const haystack = `${product?.name ?? ''} ${product?.label ?? ''} ${product?.shortDesc ?? ''}`.toLowerCase();

    if (haystack.includes('tablet') || haystack.includes('tablets')) return 'Tablet';
    if (haystack.includes('syrup')) return 'Syrup';
    if (haystack.includes('churna') || haystack.includes('powder') || haystack.includes('granules')) return 'Powder';
    if (haystack.includes('oil') || haystack.includes('tailam')) return 'Oil';
    if (haystack.includes('cream')) return 'Cream';
    if (haystack.includes('caps') || haystack.includes('capsule') || haystack.includes('capsules')) return 'Capsule';

    return null;
  };

  return (
    <div className="bg-background-light min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-black text-slate-900">
              <LiveEditable collection="content" docId="shop" field="title">Curated <span className="text-primary italic">Rituals</span></LiveEditable>
            </h2>
            <p className="text-slate-500 font-dm max-w-md">
              <LiveEditable collection="content" docId="shop" field="description">Explore our collection of traditional formulations, crafted with wisdom and pure botanicals.</LiveEditable>
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={handleAddProduct}
              disabled={isAdding}
              className="flex items-center gap-2 bg-[var(--purple)] text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase hover:brightness-95 transition-all shadow-lg shrink-0 disabled:opacity-50"
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

        {/* 3-Filter Bar (Brand Spec) */}
        <div className="jammi-shop-filters -mx-6 px-6 py-4 border-y border-[var(--purple)]/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filter 1 — Category/Concern */}
            <div>
              <div className="text-[var(--purple)] font-semibold mb-3">Category/Concern</div>
              <div className="flex flex-wrap gap-2">
                {CONCERN_GROUP_OPTIONS.map((group) => (
                  <button
                    key={group}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                      activeConcernGroup === group
                        ? 'bg-[var(--purple)] text-white border-[var(--purple)]'
                        : 'bg-transparent text-[var(--purple)] border-[var(--purple)]/20 hover:bg-white/30'
                    }`}
                    onClick={() => setActiveConcernGroup(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONCERNS_BY_GROUP[activeConcernGroup].map((concern) => (
                  <button
                    key={concern}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                      activeConcern === concern
                        ? 'bg-[var(--purple)] text-white border-[var(--purple)]'
                        : 'bg-transparent text-[var(--purple)] border-[var(--purple)]/20 hover:bg-white/30'
                    }`}
                    onClick={() => setActiveConcern(concern)}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2 — Form/Type */}
            <div>
              <div className="text-[var(--purple)] font-semibold mb-3">Form/Type</div>
              <div className="flex flex-wrap gap-2">
                {FORM_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                      activeFormType === type
                        ? 'bg-[var(--purple)] text-white border-[var(--purple)]'
                        : 'bg-transparent text-[var(--purple)] border-[var(--purple)]/20 hover:bg-white/30'
                    }`}
                    onClick={() => setActiveFormType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3 — Price Range */}
            <div>
              <div className="text-[var(--purple)] font-semibold mb-3">Price Range</div>
              <div className="flex flex-wrap gap-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.key}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                      activePriceRange === range.label
                        ? 'bg-[var(--purple)] text-white border-[var(--purple)]'
                        : 'bg-transparent text-[var(--purple)] border-[var(--purple)]/20 hover:bg-white/30'
                    }`}
                    onClick={() => setActivePriceRange(range.label)}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
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
              .filter((p) => {
                const groupCategory = activeConcernGroup === 'Therapeutics/Cures' ? 'Therapeutics' : activeConcernGroup;
                const categoryOk = p.category === groupCategory || p.label === groupCategory;

                const priceRange = PRICE_RANGES.find((r) => r.label === activePriceRange);
                const priceOk = priceRange ? p.price >= priceRange.min && p.price <= priceRange.max : true;

                const type = inferFormType(p);
                const formOk = type === activeFormType;

                const concernKeyword = activeConcern.split(/[\\/–-]/)[0].trim().toLowerCase();
                const concernHaystack = `${p.label ?? ''} ${p.shortDesc ?? ''} ${p.name ?? ''}`.toLowerCase();
                const concernOk = concernHaystack.includes(concernKeyword);

                return categoryOk && priceOk && formOk && concernOk;
              })
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
