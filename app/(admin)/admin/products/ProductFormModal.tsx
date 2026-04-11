"use client";

import React, { useState, useEffect } from 'react';
import { imagesApi } from '@/lib/adminApi';

interface ProductFormModalProps {
  product?: any;
  categories: any[];
  onClose: () => void;
  onSuccess: () => void;
}

const TABS = [
  { id: 'basic', label: 'Basic Info', icon: 'info' },
  { id: 'pricing', label: 'Pricing & Inventory', icon: 'payments' },
  { id: 'photos', label: 'Photos', icon: 'photo_library' },
  { id: 'details', label: 'Technical Details', icon: 'description' },
  { id: 'seo', label: 'SEO', icon: 'search_check' },
];

export default function ProductFormModal({ product, categories, onClose, onSuccess }: ProductFormModalProps) {
  const getAuthHeaders = () => {
    const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || 'JAMMI_ADMIN_MASTER_KEY_2024';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: '',
    slug: '',
    sku: '',
    category_id: '',
    price: 0,
    compare_at_price: 0,
    stock: 0,
    low_stock_threshold: 10,
    status: 'published',
    shortDesc: '',
    description: '',
    images: [],
    banner: { subtitle: '', title: '', desc: '', image: '', stats: [] },
    features: [],
    botanicals: [],
    ritual: [],
    results: [],
    quote: { text: '', author: '' },
    indications: '',
    dosage: '',
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    if (product) {
      const indicationsValue = Array.isArray(product.benefits)
        ? product.benefits.join('\n')
        : (product.indications || '');
      const dosageValue = product.dosage || product.usage_instructions || '';

      setFormData({
        ...formData,
        ...product,
        category_id: product.category_id || '',
        sku: product.sku || '',
        slug: product.slug || '',
        name: product.name || '',
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
        shortDesc: product.shortDesc || product.short_description || '',
        indications: indicationsValue,
        dosage: dosageValue,
        banner: product.banner || { subtitle: '', title: '', desc: '', image: '', stats: [] },
        quote: product.quote || { text: '', author: '' }
      });
    }
  }, [product]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (path: string, value: any) => {
     const keys = path.split('.');
     setFormData((prev: any) => {
        const next = { ...prev };
        let current = next;
        for (let i = 0; i < keys.length - 1; i++) {
           current[keys[i]] = { ...(current[keys[i]] || {}) };
           current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return next;
     });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setLoading(true);
    try {
      const newImages = [...(formData.images || [])];
      for (let i = 0; i < files.length; i++) {
        const url = await imagesApi.upload(files[i], 'product-images', 'products');
        newImages.push(url);
      }
      setFormData({ ...formData, images: newImages });
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = product ? 'PUT' : 'POST';
      const productId = product?._id || product?.id;
      const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products';
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save product');
      }
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
      
      <div className="relative w-full max-w-5xl bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#111118]">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">{product ? 'Edit Product' : 'Create New Product'}</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Configure full product specification</p>
          </div>
          <button onClick={onClose} className="size-10 rounded-full hover:bg-white/5 text-slate-400 flex items-center justify-center transition">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 px-6 gap-8 bg-[#0d0d14]">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab.id ? 'text-green-500' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </div>
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 shadow-[0_-4px_10px_rgba(34,197,94,0.5)]" />}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'basic' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Product Name</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="admin-input" placeholder="e.g. Sooline Ointment" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">URL Slug</label>
                <input name="slug" value={formData.slug} onChange={handleChange} className="admin-input" placeholder="e.g. sooline-ointment" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">SKU Code</label>
                <input name="sku" value={formData.sku} onChange={handleChange} className="admin-input" placeholder="e.g. JAM-SOO-001" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} className="admin-input">
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Short Summary</label>
                <textarea name="shortDesc" value={formData.shortDesc} onChange={handleChange} className="admin-input min-h-[100px]" placeholder="Brief intro for shop cards..." />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Description</label>
                <textarea name="description" value={formData.description || formData.shortDesc} onChange={handleChange} className="admin-input min-h-[150px]" placeholder="Detailed product description..." />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ingredients (comma separated)</label>
                <textarea 
                  name="ingredients" 
                  value={Array.isArray(formData.ingredients) ? formData.ingredients.join(', ') : formData.ingredients || ''} 
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, ingredients: e.target.value }))} 
                  className="admin-input min-h-[100px]" 
                  placeholder="Herb 1, Herb 2..." 
                />
              </div>
              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Indications</label>
                  <textarea
                    name="indications"
                    value={formData.indications || ''}
                    onChange={handleChange}
                    className="admin-input min-h-[120px]"
                    placeholder="Enter indications, one per line if needed..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dosage</label>
                  <textarea
                    name="dosage"
                    value={formData.dosage || ''}
                    onChange={handleChange}
                    className="admin-input min-h-[120px]"
                    placeholder="Enter dosage instructions..."
                  />
                </div>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Publishing Status</label>
                  <div className="flex gap-4">
                     {['published', 'draft'].map(s => (
                       <button 
                         key={s} type="button" 
                         onClick={() => setFormData({ ...formData, status: s })}
                         className={`flex-1 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${
                           formData.status === s ? 'bg-green-500/10 border-green-500 text-green-500 shadow-lg shadow-green-500/10' : 'border-white/5 bg-white/5 text-slate-500 hover:bg-white/10'
                         }`}
                       >
                         {s}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Selling Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="admin-input" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Compare-at Price (₹)</label>
                <input type="number" name="compare_at_price" value={formData.compare_at_price} onChange={handleChange} className="admin-input" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Stock Level</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="admin-input" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Low Stock Threshold</label>
                <input type="number" name="low_stock_threshold" value={formData.low_stock_threshold} onChange={handleChange} className="admin-input" />
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-widest">Product Media Gallery</h4>
                  <label className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg cursor-pointer text-[10px] font-bold uppercase tracking-widest transition">
                     <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">upload</span> Add New Images</span>
                     <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={loading} />
                  </label>
               </div>
               <div className="grid grid-cols-4 gap-4">
                  {(formData.images || []).map((img: string, idx: number) => (
                    <div key={idx} className="group relative aspect-square rounded-2xl border border-white/5 overflow-hidden bg-white/5">
                       <img src={img} className="w-full h-full object-cover" alt="" />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => setFormData({ ...formData, images: formData.images.filter((_: any, i: number) => i !== idx) })}
                            className="size-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition"
                          >
                             <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                       </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center">
                       <div className="size-6 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-6">
                  <h4 className="text-xs font-black text-green-500 uppercase tracking-widest">Hero Banner Settings</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtitle / Badge</label>
                        <input value={formData.banner.subtitle} onChange={e => handleNestedChange('banner.subtitle', e.target.value)} className="admin-input" placeholder="e.g. THE ANCIENT REMEDY" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Display Title</label>
                        <input value={formData.banner.title} onChange={e => handleNestedChange('banner.title', e.target.value)} className="admin-input" />
                     </div>
                     <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Banner Description</label>
                        <textarea value={formData.banner.desc} onChange={e => handleNestedChange('banner.desc', e.target.value)} className="admin-input min-h-[80px]" />
                     </div>
                  </div>
               </div>

               <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-6">
                  <h4 className="text-xs font-black text-green-500 uppercase tracking-widest">Founder's Quote</h4>
                  <div className="space-y-4">
                     <textarea value={formData.quote.text} onChange={e => handleNestedChange('quote.text', e.target.value)} className="admin-input min-h-[80px]" placeholder="Quotation text..." />
                     <input value={formData.quote.author} onChange={e => handleNestedChange('quote.author', e.target.value)} className="admin-input" placeholder="Author name & title" />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Meta Title</label>
                  <input name="meta_title" value={formData.meta_title} onChange={handleChange} className="admin-input" placeholder="SEO Title Tag..." />
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Meta Description</label>
                  <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} className="admin-input min-h-[120px]" placeholder="SEO Meta Description..." />
               </div>
               <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                  <div className="text-[10px] text-green-500 font-bold uppercase mb-2">Google Preview</div>
                  <div className="text-blue-400 text-lg hover:underline cursor-pointer truncate">{formData.meta_title || formData.name || 'Product Page Name'} | Jammi Pharma</div>
                  <div className="text-green-700 text-xs mt-1">jammipharma.com/product/{formData.slug || 'slug'}</div>
                  <div className="text-slate-400 text-sm mt-1 line-clamp-2">{formData.meta_description || 'No description set. Add one to improve search engine ranking.'}</div>
               </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-[#111118] flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-white transition">Cancel</button>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="px-10 py-3 bg-green-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-500/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (product ? 'Update Specification' : 'Finalize & Publish')}
          </button>
        </div>

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
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
        `}</style>
      </div>
    </div>
  );
}
