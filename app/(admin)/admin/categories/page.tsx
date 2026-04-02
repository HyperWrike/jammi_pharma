"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useCategories, useDeleteCategory } from '@/hooks/useConvex';
import CategoryFormModal from './CategoryFormModal';

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const { data: categories, loading, refetch: refetchCategories } = useCategories();
  const deleteCategory = useDeleteCategory();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? Products in this category will become uncategorized.')) return;
    try {
      await deleteCategory.mutate({ id });
      refetchCategories();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const categoryList = Array.isArray(categories)
    ? categories.map((cat: any) => ({ ...cat, id: cat._id || cat.id }))
    : [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Shop Categories</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Organize your products into collections</p>
          </div>
          <button 
            onClick={() => { setEditingCategory(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
          >
            <span className="material-symbols-outlined">add</span>
            New Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             [1,2,3].map(i => (
               <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
             ))
           ) : categoryList.length > 0 ? categoryList.map((cat) => (
             <div key={cat._id || cat.id} className="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-green-500/30 transition-all duration-300">
              <div className="h-32 bg-white/5 relative bg-cover bg-center" style={{ backgroundImage: cat.image_url ? `url(${cat.image_url})` : 'none' }}>
                 {!cat.image_url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                       <span className="material-symbols-outlined text-4xl">category</span>
                    </div>
                 )}
                 <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#111118] to-transparent">
                    <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                       {cat.products?.[0]?.count || 0} Products
                    </span>
                 </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 min-h-[32px]">{cat.description || 'No description provided.'}</p>
                
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slug: /{cat.slug}</div>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingCategory(cat); setIsModalOpen(true); }}
                        className="size-8 rounded-lg bg-white/5 text-slate-400 hover:text-white flex items-center justify-center transition"
                      >
                         <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="size-8 rounded-lg bg-white/5 text-slate-400 hover:text-red-500 flex items-center justify-center transition"
                      >
                         <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-500 italic">No categories found or error loading data.</div>
          )}
        </div>

        {isModalOpen && (
          <CategoryFormModal 
            category={editingCategory} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={() => { setIsModalOpen(false); refetchCategories(); }} 
          />
        )}
      </div>
    </AdminLayout>
  );
}
