"use client";
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import { MOCK_PRODUCTS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';
import { useAdmin } from '../components/admin/AdminContext';
import { cmsApi, productsApi } from '../lib/adminApi';

const Shop: React.FC = () => {
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
      
      const initialCategories = ['All', 'Skin Care', 'Hair Care', 'Wellness', 'Therapeutics', 'Body Care', 'Oral Care & Wellness', 'Digestive Health', 'Immunity', 'Pain Relief'];
      const fetchedCategoryNames = currentCategories.map((cat: any) => cat.name);
      const dynamicCategoryNames = allProducts.map(p => p.category).filter(Boolean);
      
      const uniqueCategories = new Set([...initialCategories, ...fetchedCategoryNames, ...dynamicCategoryNames]);
      setCategories(Array.from(uniqueCategories));
      setIsLoading(false);
    };

    const fetchShopData = async () => {
      // Fetch Products (limit 20, specific columns)
      // Using 'active' check and 'published' status
      const { data: prodData } = await supabase
        .from('products')
        .select(`
          id, name, description, short_description, price, images, status, active,
          categories(name)
        `)
        .eq('active', true)
        .eq('status', 'published') // Aligning with DB constraint
        .order('created_at', { ascending: false })
        .limit(20);

      if (prodData) {
        currentProducts = prodData.map((prod: any) => ({
          id: prod.id,
          name: prod.name,
          label: prod.categories?.name || 'Wellness',
          shortDesc: prod.short_description || (prod.description ? prod.description.replace(/<[^>]+>/g, '').substring(0, 100) : 'Traditional formulation.'),
          price: prod.price || 0,
          image: prod.images?.[0] || 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop',
          category: prod.categories?.name || 'Wellness',
          status: prod.status
        }));
      }

      // Fetch Categories
      const { data: catData } = await supabase.from('categories').select('name').eq('active', true).order('display_order');
      if (catData) {
        currentCategories = catData;
      }

      updateState();
    };

    fetchShopData();

    // Setup realtime specifically for shop data refresh
    const channel = supabase.channel('shop_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => fetchShopData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => fetchShopData())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      // In a real app, we'd call a dedicated 'products' API
      // For now, we utilize the CMS API to store it or a separate product API if available
      // The user wants it to "just work" in the theme.
      
      const { data: catData } = await supabase.from('categories').select('id').eq('name', newProduct.category).single();
      
      const res = await productsApi.create({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category_id: catData?.id,
        images: [newProduct.image],
        status: 'published',
        active: true
      });
      
      setShowAddModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: 'Wellness',
        image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop'
      });
      
      // Refresh will be handled by realtime subscription
    } catch (err: any) {
      alert(err.message || "Failed to add product");
    } finally {
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
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-forest text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-forest/90 transition-all shadow-lg shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                Add Product
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-forest">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Product Name</label>
                <input 
                  type="text" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Price (₹)</label>
                  <input 
                    type="number" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                <textarea 
                  required rows={3}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Image URL</label>
                <input 
                  type="text" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isAdding}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <><span className="material-symbols-outlined animate-spin">sync</span> Adding...</>
                ) : (
                  <><span className="material-symbols-outlined">add</span> Create Product</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
