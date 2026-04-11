"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';
import { useAdmin } from '../components/admin/AdminContext';
import { productsApi } from '../lib/adminApi';
import { useRouter, useSearchParams } from 'next/navigation';

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

const CATEGORY_ALIAS_TO_CONCERNS: Record<string, string[]> = {
  'skin-care': ['Skin Complexion', 'Acne/Pimples', 'Skin Dullness'],
  'immunity': ['Immunity', 'Weakened Immunity'],
  'wellness': ['Immunity', 'Digestion', 'Stress'],
  'internal-bleeding': ['Digestion'],
  'geriatric': ['Aches & Pains', 'Heart Health'],
  'pediatric': ['Immunity', 'Digestion'],
  'respiratory': ['Asthma/Wheezing', 'Coughs and Colds'],
  'supportive-therapy': ['Aches & Pains', 'Stress'],
  'migraines': ['Stress'],
  'kidney': ['Kidney/Gall Bladder Stones'],
  'digestion': ['Digestion', 'Gut-health Disorders'],
  'womens-health': ['Gynaecological Health'],
  'pain-management': ['Aches & Pains'],
  'liver': ['Fatty Liver', 'Liver Diseases'],
};

const CONCERN_KEYWORDS: Record<string, string[]> = {
  'Immunity': ['immunity', 'immune'],
  'Fatty Liver': ['liver', 'hepatic', 'fatty liver'],
  'Digestion': ['digestion', 'digestive', 'gut'],
  'IBS': ['ibs', 'bowel'],
  'Pre-Diabetes': ['diabetes', 'sugar', 'metabolism'],
  'Obesity': ['obesity', 'weight'],
  'Aches & Pains': ['pain', 'joint', 'ache', 'inflammation'],
  'Heart Health': ['heart', 'cardio'],
  'Kidney/Gall Bladder Stones': ['kidney', 'gall', 'stones'],
  'Male & Female Sexual Wellness': ['sexual', 'fertility', 'reproductive'],
  'Stress': ['stress', 'anxiety', 'sleep', 'mental'],
  'Thyroid Related': ['thyroid'],
  'Acne/Pimples': ['acne', 'pimple'],
  'Skin Complexion': ['complexion', 'glow', 'skin tone'],
  'Lip and Oral Care': ['lip', 'oral', 'mouth'],
  'Skin Dullness': ['dull', 'radiance', 'brighten'],
  'Hair Fall': ['hair', 'hair fall', 'alopecia'],
  'Dandruff': ['dandruff', 'scalp'],
  'Liver Diseases': ['liver', 'hepatic'],
  'Prostate Disorders': ['prostate'],
  'Viral Fevers': ['fever', 'viral'],
  'Asthma/Wheezing': ['asthma', 'wheezing', 'respiratory'],
  'Anaemia – Ayurin': ['anaemia', 'hemoglobin', 'ayurin'],
  'Coughs and Colds': ['cough', 'cold'],
  'Weakened Immunity': ['immunity', 'immune'],
  'Gynaecological Health': ['gynaec', 'women', 'menstrual'],
  'Gut-health Disorders': ['gut', 'digestion', 'digestive'],
  'Psoriasis/Eczema': ['psoriasis', 'eczema', 'skin'],
  'Diabetes': ['diabetes', 'sugar'],
};

const Shop: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);

  // New Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcerns, setSelectedConcerns] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Wellness': true,
    'Skin & Hair Care': true,
    'Therapeutics/Cures': true
  });
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Read URL parameter
  useEffect(() => {
    const defaultCat = searchParams?.get('category');
    if (defaultCat) {
      const aliasMatches = CATEGORY_ALIAS_TO_CONCERNS[defaultCat.toLowerCase()];
      if (aliasMatches?.length) {
        setSelectedConcerns(new Set(aliasMatches));
        return;
      }

      const formattedSlug = defaultCat.replace(/-/g, ' ');

      if (formattedSlug.toLowerCase() === 'skin care' || formattedSlug.toLowerCase() === 'hair care') {
         setSelectedConcerns(new Set(['Skin Complexion', 'Hair Fall', 'Dandruff', 'Acne/Pimples', 'Skin Dullness']));
         return;
      }
      
      const allConcerns = Object.values(CONCERNS_BY_GROUP).flat();
      let matched = false;
      const initialMatches = new Set<string>();

      for (const concern of allConcerns) {
         if (concern.toLowerCase().includes(formattedSlug.toLowerCase()) || formattedSlug.toLowerCase().includes(concern.toLowerCase().split(/[/\-]/)[0])) {
            initialMatches.add(concern);
            matched = true;
         }
      }

      if (matched) {
         setSelectedConcerns(initialMatches);
      } else {
         setSearchQuery(formattedSlug);
      }
    }
  }, [searchParams]);

  const productsGridRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    if (productsGridRef.current) {
      const offset = productsGridRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let currentProducts: any[] = [];
    let currentCategories: any[] = [];

    const updateState = () => {
      setProducts(currentProducts);
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
          status: prod.status,
          ingredients: prod.ingredients || [],
          tags: Array.isArray(prod.tags) ? prod.tags : [],
          benefits: Array.isArray(prod.benefits) ? prod.benefits : [],
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
      const tempName = `New Formulation ${Math.floor(Math.random() * 10000)}`;
      const res = await productsApi.create({
        name: tempName,
        slug: tempName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: 'Describe the new formulation...',
        short_description: 'A traditional remedy.',
        price: 0,
        category_id: firstCategory?._id || firstCategory?.id || null,
        images: ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop'],
        status: 'published',
        stock: 100
      });
      if (res && res.data && res.data.id && !res.error) {
        router.push(`/product/${res.data.id}`);
      } else if (res.error) {
        throw new Error(res.error);
      }
    } catch (err: any) {
      alert(err.message || "Failed to add product");
      setIsAdding(false);
    }
  };

  const toggleConcern = (concern: string) => {
    const newSet = new Set(selectedConcerns);
    if (newSet.has(concern)) newSet.delete(concern);
    else newSet.add(concern);
    setSelectedConcerns(newSet);
  };
  
  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search matching (name, description, ingredients, category)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const ingredientsText = Array.isArray(p.ingredients)
          ? p.ingredients.join(' ')
          : typeof p.ingredients === 'string'
            ? p.ingredients
            : '';
        const searchHaystack = `${p.name ?? ''} ${p.shortDesc ?? ''} ${p.label ?? ''} ${p.category ?? ''} ${ingredientsText}`.toLowerCase();
        if (!searchHaystack.includes(query)) return false;
      }
      
      // Multi-select Concern filter
      if (selectedConcerns.size > 0) {
        const ingredientsText = Array.isArray(p.ingredients)
          ? p.ingredients.join(' ')
          : typeof p.ingredients === 'string'
            ? p.ingredients
            : '';
        const tagsText = Array.isArray(p.tags) ? p.tags.join(' ') : '';
        const benefitsText = Array.isArray(p.benefits) ? p.benefits.join(' ') : '';
        const concernHaystack = `${p.label ?? ''} ${p.shortDesc ?? ''} ${p.name ?? ''} ${p.category ?? ''} ${ingredientsText} ${tagsText} ${benefitsText}`.toLowerCase();

        const matchesAny = Array.from(selectedConcerns).some((concern) => {
          const fallbackKeyword = concern.split(/[\\/–-]/)[0].trim().toLowerCase();
          const concernKeywords = CONCERN_KEYWORDS[concern] || [fallbackKeyword];
          return concernKeywords.some((keyword) => concernHaystack.includes(keyword.toLowerCase()));
        });

        if (!matchesAny) return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedConcerns]);

  const activeFilterCount = selectedConcerns.size;

  const resetFilters = () => {
    setSelectedConcerns(new Set());
    setSearchQuery('');
  };

  return (
    <div className="bg-background-light min-h-screen pt-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900">
              <LiveEditable collection="content" docId="shop" field="title">Curated <span className="text-primary italic">Rituals</span></LiveEditable>
            </h2>
            <p className="text-slate-500 font-dm max-w-md">
              <LiveEditable collection="content" docId="shop" field="description">Explore our collection of traditional formulations, crafted with wisdom and pure botanicals.</LiveEditable>
            </p>
          </div>
          <div className="flex items-center gap-3">
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

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Search Products</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white focus:border-[var(--purple)] focus:ring-2 focus:ring-[var(--purple)]/10 text-sm transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Collapsible Categories */}
              {CONCERN_GROUP_OPTIONS.map(group => (
                <div key={group} className="border-t border-slate-100 pt-4">
                  <button 
                    className="flex justify-between items-center w-full text-left bg-transparent border-none shadow-none p-0 hover:bg-transparent"
                    onClick={() => toggleGroup(group)}
                  >
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{group}</h4>
                    <span className="material-symbols-outlined text-slate-400">
                      {expandedGroups[group] ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandedGroups[group] && (
                    <div className="mt-3 space-y-2">
                      {CONCERNS_BY_GROUP[group].map((concern) => (
                        <label key={concern} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedConcerns.has(concern)}
                            onChange={() => toggleConcern(concern)}
                            className="w-4 h-4 text-[var(--purple)] rounded border-slate-300 focus:ring-[var(--purple)]"
                          />
                          <span className={`text-sm ${selectedConcerns.has(concern) ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                            {concern}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
                    <button onClick={resetFilters} className="text-sm text-[var(--purple)] font-semibold hover:underline border-b pb-4 w-full text-left">
                      Clear all ({activeFilterCount})
                    </button>
                  )}

                  {CONCERN_GROUP_OPTIONS.map(group => (
                    <div key={group} className="border-b border-slate-100 pb-4">
                      <button 
                        className="flex justify-between items-center w-full text-left mb-2"
                        onClick={() => toggleGroup(group)}
                      >
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{group}</h4>
                        <span className="material-symbols-outlined text-slate-400">
                          {expandedGroups[group] ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                      {expandedGroups[group] && (
                        <div className="space-y-2 pl-1">
                          {CONCERNS_BY_GROUP[group].map((concern) => (
                            <label key={concern} className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedConcerns.has(concern)}
                                onChange={() => toggleConcern(concern)}
                                className="w-4 h-4 rounded text-[var(--purple)] border-slate-300"
                              />
                              <span className="text-sm text-slate-700">{concern}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

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
                {Array.from(selectedConcerns).map(concern => (
                  <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--purple)]/10 text-[var(--purple)] rounded-full text-xs font-semibold hover:bg-[var(--purple)]/20"
                  >
                    {concern}
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                ))}
                <button onClick={resetFilters} className="text-xs text-slate-400 hover:text-slate-600 underline ml-1">
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''} {searchQuery && <span>for "{searchQuery}"</span>}
              </p>
            </div>

            {/* Product Grid */}
            <div ref={productsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
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
                      <ProductCard key={product.id} product={product} showQuickAdd={true} />
                    ))
                  : (
                    <div className="col-span-full text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                      <p className="text-xl text-slate-600 mb-2 font-medium">No products found for your search</p>
                      <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">Try adjusting your filters or searching for something else like "Immunity" or "Ayurin".</p>
                      <button
                        onClick={resetFilters}
                        className="px-6 py-2.5 bg-[var(--purple)] text-white rounded-lg text-sm font-semibold hover:brightness-95 shadow-sm"
                      >
                        Reset Search & Filters
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
