"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProducts, useCategories, useDeleteProduct } from '@/hooks/useConvex';
import { imagesApi } from '@/lib/adminApi';
import ProductFormModal from './ProductFormModal';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data: productsData, loading: productsLoading, refetch: refetchProducts } = useProducts({
    search: search || undefined,
    category: categoryFilter || undefined,
  });

  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  const deleteProduct = useDeleteProduct();

  const products = (productsData?.data || []).map((p: any) => ({
    ...p,
    id: p._id || p.id
  }));
  const categories = (categoriesData || []).map((c: any) => ({
    id: c._id || c.id,
    name: c.name
  }));
  const loading = productsLoading || categoriesLoading;

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct.mutate({ id });
      refetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Products Catalog</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manage your inventory and shop items</p>
          </div>
          <button 
            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 active:scale-95"
          >
            <span className="material-symbols-outlined font-bold">add</span>
            New Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-[#111118] border border-white/5 p-4 rounded-2xl shadow-xl">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
            <input 
              type="text" 
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-colors"
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50 transition-colors min-w-[200px]"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="py-4 px-6 text-center">Preview</th>
                  <th className="py-4 px-4">Product Details</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Filtering Inventory...</span>
                      </div>
                    </td>
                  </tr>
                ) : products.length > 0 ? products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden flex items-center justify-center border border-white/5">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-slate-700">image</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-100">{product.name}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-0.5">SKU: {product.sku || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {product.categories?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-white">₹{product.price}</td>
                    <td className="py-4 px-4">
                       <div className="flex flex-col gap-1">
                          <span className={`text-[11px] font-black ${product.stock <= 10 ? 'text-amber-500' : 'text-slate-300'}`}>
                            {product.stock} Units
                          </span>
                          <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full ${product.stock <= 10 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${Math.min(product.stock, 100)}%` }} />
                          </div>
                       </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        product.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {product.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                          className="size-9 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="size-9 rounded-xl bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition flex items-center justify-center"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-slate-500 italic">No products found for this criteria</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <ProductFormModal 
            product={editingProduct} 
            categories={categories}
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => { setIsModalOpen(false); refetchProducts(); }} 
          />
        )}
      </div>
    </AdminLayout>
  );
}
