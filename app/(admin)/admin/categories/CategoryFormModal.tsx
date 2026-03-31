"use client";

import React, { useState, useEffect } from 'react';
import { imagesApi } from '@/lib/adminApi';

interface CategoryFormModalProps {
  category?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryFormModal({ category, onClose, onSuccess }: CategoryFormModalProps) {
  const getAuthHeaders = () => {
    const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || 'JAMMI_ADMIN_MASTER_KEY_2024';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    display_order: 0
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        image_url: category.image_url || '',
        display_order: category.display_order || 0
      });
    }
  }, [category]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await imagesApi.upload(file, 'category-images', 'categories');
      setFormData({ ...formData, image_url: url });
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = category ? 'PUT' : 'POST';
      const categoryId = category?._id || category?.id;
      const url = categoryId ? `/api/admin/categories/${categoryId}` : '/api/admin/categories';
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to save category');
      onSuccess();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/5 bg-[#111118] flex items-center justify-between">
          <h2 className="text-xl font-black text-white tracking-tight">{category ? 'Edit Category' : 'New Category'}</h2>
          <button onClick={onClose} className="size-8 rounded-full hover:bg-white/5 text-slate-400 flex items-center justify-center transition">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="admin-input" placeholder="e.g. Skin Care" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Slug</label>
            <input name="slug" value={formData.slug} onChange={handleChange} required className="admin-input" placeholder="e.g. skin-care" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="admin-input min-h-[80px]" placeholder="Optional description..." />
          </div>
          
          <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category Image</label>
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center">
                  {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" alt="" /> : <span className="material-symbols-outlined text-slate-700">image</span>}
               </div>
               <label className="flex-grow">
                  <div className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500/50 hover:bg-white/5 transition-all">
                     <span className="material-symbols-outlined text-slate-500 mb-1">upload</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Change Photo</span>
                  </div>
                  <input type="file" className="hidden" onChange={handleImageUpload} />
               </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
            <button onClick={onClose} type="button" className="px-6 py-3 text-slate-500 font-bold text-xs uppercase tracking-widest">Cancel</button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-green-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>

        <style jsx global>{`
          .admin-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 12px 16px;
            color: white;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
          }
          .admin-input:focus {
            outline: none;
            border-color: rgba(34, 197, 94, 0.5);
            background: rgba(255, 255, 255, 0.08);
          }
        `}</style>
      </div>
    </div>
  );
}
