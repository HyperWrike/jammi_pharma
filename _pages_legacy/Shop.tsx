"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
    'Immunity', 'Fatty Liver', 'Digestion', 'IBS', 'Pre-Diabetes', 'Obesity',
    'Aches & Pains', 'Heart Health', 'Kidney/Gall Bladder Stones',
    'Male & Female Sexual Wellness', 'Stress', 'Thyroid Related',
  ],
  'Skin & Hair Care': ['Acne/Pimples', 'Skin Complexion', 'Lip and Oral Care', 'Skin Dullness', 'Hair Fall', 'Dandruff'],
  'Therapeutics/Cures': [
    'Liver Diseases', 'Prostate Disorders', 'Viral Fevers', 'Asthma/Wheezing',
    'Anaemia – Ayurin', 'Coughs and Colds', 'Weakened Immunity',
    'Gynaecological Health', 'Gut-health Disorders', 'Psoriasis/Eczema', 'Diabetes',
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
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);

  // Filter state
  const [activeConcernGroup, setActiveConcernGroup] = useState<(typeof CONCERN_GROUP_OPTIONS)[number] | 'All'>('All');
  const [activeConcern, setActiveConcern] = useState<string>('All');
  const [activeFormType, setActiveFormType] = useState<(typeof FORM_TYPES)[number] | 'All'>('All');
  const [activePriceRange, setActivePriceRange] = useState<(typeof PRICE_RANGES)[number]['label'] | 'All'>('All');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const productsGridRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    if (productsGridRef.current) {
      const offset = productsGridRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (activeConcernGroup !== 'All') {
      setActiveConcern(CONCERNS_BY_GROUP[activeConcernGroup][0]);
    } else {
      setActiveConcern('All');
    }
  }, [activeConcernGroup]);

  useEffect(() => {
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
    const intervalId = window.setInterval(fetchShopData, 15000);
    return () => { window.clearInterval(intervalId); };
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

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeConcernGroup !== 'All') {
        const groupCategory = activeConcernGroup === 'Therapeutics/Cures' ? 'Therapeutics' : activeConcernGroup;
        const categoryOk = p.category === groupCategory || p.label === groupCategory;
        if (!categoryOk) return false;
      }

      // Concern filter
      if (activeConcern !== 'All') {
        const concernKeyword = activeConcern.split(/[\\/–-]/)[0].trim().toLowerCase();
        const concernHaystack = `${p.label ?? ''} ${p.shortDesc ?? ''} ${p.name ?? ''}`.toLowerCase();
        if (!concernHaystack.includes(concernKeyword)) return false;
      }

      // Form type filter
      if (activeFormType !== 'All') {
        const type = inferFormType(p);
        if (type !== activeFormType) return false;
      }

      // Price range filter
      if (activePriceRange !== 'All') {
        const priceRange = PRICE_RANGES.find((r) => r.label === activePriceRange);
        if (priceRange && (p.price < priceRange.min || p.price > priceRange.max)) return false;
      }

      return true;
    });
  }, [products, activeConcernGroup, activeConcern, activeFormType, activePriceRange]);

  const activeFilterCount = [
    activeConcernGroup !== 'All',
    activeConcern !== 'All',
    activeFormType !== 'All',
    activePriceRange !== 'All',
  ].filter(Boolean).length;

  const resetFilters = () => {
    setActiveConcernGroup('All');
    setActiveConcern('All');
    setActiveFormType('All');
    setActivePriceRange('All');
  };

  return (
    <div className="bg-background-light min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900">
              <LiveEditable collection="content" docId="shop" field="title">Curated <span className="text-primary italic">Rituals</span></LiveEditable>
            </h2>
            <p className="text-slate-500 font-dm max-w-md">
              <LiveEditable collection="content" docId="shop" field="description">Explore our collection of traditional formulations, crafted with wisdom and pure botanicals.</LiveEditable>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[var(--purple)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
            {isAdmin && (
              <button
                onClick={handleAddProduct}
                disabled={isAdding}
                className="flex items-center gap-2 bg-[var(--purple)] text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide hover:brightness-95 transition-all shadow-md shrink-0 disabled:opacity-50"
              >
                {isAdding ? (
                  <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                )}
                {isAdding ? 'Creating...' : 'Add Product'}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={resetFilters} className="text-xs text-[var(--purple)] font-semibold hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Category</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={activeConcernGroup === 'All'}
                      onChange={() => setActiveConcernGroup('All')}
                      className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                    />
                    <span className={`text-sm ${activeConcernGroup === 'All' ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>All Categories</span>
                  </label>
                  {CONCERN_GROUP_OPTIONS.map((group) => (
                    <label key={group} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={activeConcernGroup === group}
                        onChange={() => setActiveConcernGroup(group)}
                        className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                      />
                      <span className={`text-sm ${activeConcernGroup === group ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{group}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Concern Filter */}
              {activeConcernGroup !== 'All' && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Concern</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="concern"
                        checked={activeConcern === 'All'}
                        onChange={() => setActiveConcern('All')}
                        className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                      />
                      <span className={`text-sm ${activeConcern === 'All' ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>All Concerns</span>
                    </label>
                    {CONCERNS_BY_GROUP[activeConcernGroup].map((concern) => (
                      <label key={concern} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          name="concern"
                          checked={activeConcern === concern}
                          onChange={() => setActiveConcern(concern)}
                          className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                        />
                        <span className={`text-sm ${activeConcern === concern ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Type Filter */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Form Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="formType"
                      checked={activeFormType === 'All'}
                      onChange={() => setActiveFormType('All')}
                      className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                    />
                    <span className={`text-sm ${activeFormType === 'All' ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>All Types</span>
                  </label>
                  {FORM_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="formType"
                        checked={activeFormType === type}
                        onChange={() => setActiveFormType(type)}
                        className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                      />
                      <span className={`text-sm ${activeFormType === type ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={activePriceRange === 'All'}
                      onChange={() => setActivePriceRange('All')}
                      className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                    />
                    <span className={`text-sm ${activePriceRange === 'All' ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>All Prices</span>
                  </label>
                  {PRICE_RANGES.map((range) => (
                    <label key={range.key} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={activePriceRange === range.label}
                        onChange={() => setActivePriceRange(range.label)}
                        className="w-4 h-4 text-[var(--purple)] border-slate-300 focus:ring-[var(--purple)]"
                      />
                      <span className={`text-sm ${activePriceRange === range.label ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white overflow-y-auto">
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded hover:bg-slate-100">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  {activeFilterCount > 0 && (
                    <button onClick={resetFilters} className="text-sm text-[var(--purple)] font-semibold hover:underline">
                      Clear all ({activeFilterCount})
                    </button>
                  )}

                  {/* Mobile Category */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="radio" name="m-category" checked={activeConcernGroup === 'All'} onChange={() => setActiveConcernGroup('All')} className="w-4 h-4 text-[var(--purple)]" />
                        <span className="text-sm text-slate-700">All Categories</span>
                      </label>
                      {CONCERN_GROUP_OPTIONS.map((group) => (
                        <label key={group} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="radio" name="m-category" checked={activeConcernGroup === group} onChange={() => setActiveConcernGroup(group)} className="w-4 h-4 text-[var(--purple)]" />
                          <span className="text-sm text-slate-700">{group}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Concern */}
                  {activeConcernGroup !== 'All' && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Concern</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input type="radio" name="m-concern" checked={activeConcern === 'All'} onChange={() => setActiveConcern('All')} className="w-4 h-4 text-[var(--purple)]" />
                          <span className="text-sm text-slate-700">All Concerns</span>
                        </label>
                        {CONCERNS_BY_GROUP[activeConcernGroup].map((concern) => (
                          <label key={concern} className="flex items-center gap-2.5 cursor-pointer">
                            <input type="radio" name="m-concern" checked={activeConcern === concern} onChange={() => setActiveConcern(concern)} className="w-4 h-4 text-[var(--purple)]" />
                            <span className="text-sm text-slate-700">{concern}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile Form Type */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Form Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="radio" name="m-form" checked={activeFormType === 'All'} onChange={() => setActiveFormType('All')} className="w-4 h-4 text-[var(--purple)]" />
                        <span className="text-sm text-slate-700">All Types</span>
                      </label>
                      {FORM_TYPES.map((type) => (
                        <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="radio" name="m-form" checked={activeFormType === type} onChange={() => setActiveFormType(type)} className="w-4 h-4 text-[var(--purple)]" />
                          <span className="text-sm text-slate-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Price */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Price Range</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="radio" name="m-price" checked={activePriceRange === 'All'} onChange={() => setActivePriceRange('All')} className="w-4 h-4 text-[var(--purple)]" />
                        <span className="text-sm text-slate-700">All Prices</span>
                      </label>
                      {PRICE_RANGES.map((range) => (
                        <label key={range.key} className="flex items-center gap-2.5 cursor-pointer">
                          <input type="radio" name="m-price" checked={activePriceRange === range.label} onChange={() => setActivePriceRange(range.label)} className="w-4 h-4 text-[var(--purple)]" />
                          <span className="text-sm text-slate-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setMobileFiltersOpen(false); scrollToProducts(); }}
                    className="w-full bg-[var(--purple)] text-white py-3 rounded-lg font-semibold hover:brightness-95"
                  >
                    Show {filteredProducts.length} Products
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Active filter pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-slate-500">Active filters:</span>
                {activeConcernGroup !== 'All' && (
                  <button
                    onClick={() => { setActiveConcernGroup('All'); setActiveConcern('All'); }}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--purple)]/10 text-[var(--purple)] rounded-full text-xs font-semibold hover:bg-[var(--purple)]/20"
                  >
                    {activeConcernGroup}
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
                {activeConcern !== 'All' && (
                  <button
                    onClick={() => setActiveConcern('All')}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--yellow)]/30 text-[var(--purple)] rounded-full text-xs font-semibold hover:bg-[var(--yellow)]/50"
                  >
                    {activeConcern}
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
                {activeFormType !== 'All' && (
                  <button
                    onClick={() => setActiveFormType('All')}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--purple)]/10 text-[var(--purple)] rounded-full text-xs font-semibold hover:bg-[var(--purple)]/20"
                  >
                    {activeFormType}
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
                {activePriceRange !== 'All' && (
                  <button
                    onClick={() => setActivePriceRange('All')}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--purple)]/10 text-[var(--purple)] rounded-full text-xs font-semibold hover:bg-[var(--purple)]/20"
                  >
                    {activePriceRange}
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
                <button onClick={resetFilters} className="text-xs text-slate-400 hover:text-slate-600 underline ml-1">
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Product Grid */}
            <div ref={productsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex flex-col gap-4">
                      <div className="w-full aspect-square bg-slate-200 rounded-xl" />
                      <div className="h-5 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                      <div className="h-5 bg-slate-200 rounded w-1/4 mt-1" />
                    </div>
                  ))
                : filteredProducts.length > 0
                  ? filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  : (
                    <div className="col-span-full text-center py-20">
                      <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                      <p className="text-xl text-slate-400 mb-4">No products match your filters</p>
                      <button
                        onClick={resetFilters}
                        className="px-6 py-2.5 bg-[var(--purple)] text-white rounded-lg text-sm font-semibold hover:brightness-95"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
