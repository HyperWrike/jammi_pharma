"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import ImageUploader from '../ImageUploader';
import { useAdminSave } from '@/hooks/useAdminSave';
import { useToast } from '@/components/Toast';

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Variant {
  type: string;
  value: string;
  price: string;
  stock: string;
}

interface ProductFormProps {
  initialData?: any;
  productId?: string;
  isEdit?: boolean;
}

export default function ProductForm({ initialData = null, productId = '', isEdit = false }: ProductFormProps) {
  const router = useRouter();
  
  // Left Column
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  // Right Column
  const [status, setStatus] = useState('Draft');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('100');
  const [lowStockAlert, setLowStockAlert] = useState('10');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const { saving: isSaving, saveProduct } = useAdminSave();
  const { addToast } = useToast();
  
  const handleNewImage = (urls: string[]) => {
    setImages(prev => [...prev, ...urls].slice(0, 5)); // Limit to 5
  };

  const handleSingleImage = (url: string) => {
    setImages(prev => [...prev, url].slice(0, 5));
  };

  useEffect(() => {
    // Load existing categories
    const fetchCats = async () => {
      try {
        const res = await fetch('/api/admin/categories');
      } catch (e) {} // Assuming category fetch logic needs generic setup here, mock for now:
      setCategories([
        {id: '1', name: 'Skin Care'},
        {id: '2', name: 'Hair Care'},
        {id: '3', name: 'Wellness'},
        {id: '4', name: 'Therapeutics'},
        {id: '5', name: 'Body Care'},
        {id: '6', name: 'Oral Care & Wellness'},
        {id: '7', name: 'Digestive Health'},
        {id: '8', name: 'Immunity'},
        {id: '9', name: 'Pain Relief'}
      ]);
    };
    fetchCats();

    if (initialData) {
      setName(initialData.name || '');
      setSlug(initialData.slug || '');
      setDescription(initialData.description || '');
      setImages(initialData.images || []);
      setVariants(initialData.variants || []);
      setStatus(initialData.status || 'Draft');
      setCategory(initialData.category || '');
      setPrice(initialData.price || '');
      setDiscountPrice(initialData.discountPrice || '');
      setStock(initialData.stock || '100');
      setLowStockAlert(initialData.lowStockAlert || '10');
      setMetaTitle(initialData.metaTitle || '');
      setMetaDescription(initialData.metaDescription || '');
    }
  }, [initialData]);

  // Auto-generate slug
  useEffect(() => {
    if (!isEdit && name && !slug) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [name, isEdit]);

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addVariant = () => setVariants([...variants, { type: '', value: '', price: '', stock: '' }]);
  const updateVariant = (index: number, field: keyof Variant, val: string) => {
    const newV = [...variants];
    newV[index][field] = val;
    setVariants(newV);
  };
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));

  const handleSave = async (submitStatus: string) => {
    if (!name || !category || !price || !stock) {
      alert("Please fill all required fields (Name, Category, Price, Stock)");
      return;
    }
    
    const payload = {
      ...(isEdit && { id: productId }),
      name, slug, description, images, variants, status: submitStatus,
      category, price: Number(price), discountPrice: discountPrice ? Number(discountPrice) : null,
      stock: Number(stock), lowStockAlert: Number(lowStockAlert), metaTitle, metaDescription
    };

    try {
      const result = await saveProduct(payload, !isEdit);
      if (result) {
        addToast('Product saved successfully!', 'success');
        router.push('/admin/products');
      } else {
        addToast('Error saving product. Check your permissions.', 'error');
      }
    } catch (err) {
      console.error(err);
      addToast('Error saving product.', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push('/admin/products')} 
            className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => handleSave('Draft')} 
            disabled={isSaving}
            className="px-6 py-2 border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-50 rounded shadow-sm disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button 
            onClick={() => handleSave('Published')} 
            disabled={isSaving}
            className="px-6 py-2 bg-forest text-white font-bold rounded shadow-sm hover:bg-forest/90 disabled:opacity-50"
          >
            Publish Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Product Name <span className="text-red-500">*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest" placeholder="e.g. Ashta Choornam" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Slug / URL</label>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-md px-3 py-2 text-slate-500 text-sm">/products/</span>
                <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full border border-slate-300 rounded-r-md px-4 py-2 focus:outline-none focus:border-forest text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
              <div className="h-64 mb-12">
                <ReactQuill theme="snow" value={description} onChange={setDescription} className="h-48" />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Product Images</h3>
            
            <div className="mb-6">
              <ImageUploader
                bucket="product-images"
                folder={`products/${productId || 'new'}`}
                onUpload={handleSingleImage}
                onUploadMultiple={handleNewImage}
                multiple={true}
                label="Add Product Images"
              />
              <p className="text-xs text-slate-400 mt-2">Accepts images (max 5)</p>
            </div>
            {images.length > 0 && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 shrink-0 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-forest/80 text-white text-[10px] uppercase font-bold text-center py-0.5">Main</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variants */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Variants (Optional)</h3>
              <button onClick={addVariant} className="text-sm text-forest font-bold bg-green-50 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors">
                + Add Variant
              </button>
            </div>
            {variants.length > 0 ? (
              <div className="space-y-4">
                {variants.map((v, i) => (
                  <div key={i} className="flex gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200/60">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Type</label>
                      <input type="text" placeholder="e.g. Size" value={v.type} onChange={e => updateVariant(i, 'type', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Value</label>
                      <input type="text" placeholder="e.g. 500g" value={v.value} onChange={e => updateVariant(i, 'value', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none" />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Price (+₹)</label>
                      <input type="number" value={v.price} onChange={e => updateVariant(i, 'price', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none" />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-bold text-slate-600 mb-1">Stock</label>
                      <input type="number" value={v.stock} onChange={e => updateVariant(i, 'stock', e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none" />
                    </div>
                    <button onClick={() => removeVariant(i)} className="h-[38px] w-[38px] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors border border-transparent hover:border-red-100">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No variants active. Product will be sold as a single unit.</p>
            )}
          </div>
          
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          {/* Status & Category */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Visibility Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" value="Draft" checked={status === 'Draft'} onChange={() => setStatus('Draft')} className="w-4 h-4 text-forest" />
                  <span className="text-sm font-medium">Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" value="Published" checked={status === 'Published'} onChange={() => setStatus('Published')} className="w-4 h-4 text-forest" />
                  <span className="text-sm font-medium text-green-700">Published</span>
                </label>
              </div>
            </div>
            <hr className="border-slate-100"/>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Category <span className="text-red-500">*</span></label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest bg-white">
                <option value="">Select Category...</option>
                {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Pricing Config */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Pricing</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Base Price (₹) <span className="text-red-500">*</span></label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Discount Price (₹)</label>
              <input type="number" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} min="0" placeholder="Optional" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest" />
            </div>
          </div>

          {/* Inventory Config */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Inventory</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
              <input type="number" value={stock} onChange={e => setStock(e.target.value)} min="0" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Low Stock Threshold</label>
              <input type="number" value={lowStockAlert} onChange={e => setLowStockAlert(e.target.value)} min="0" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest" />
            </div>
          </div>

          {/* SEO Preview */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">SEO Meta Data</h3>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-bold text-slate-700">Meta Title</label>
                <span className="text-xs text-slate-400">{metaTitle.length}/60</span>
              </div>
              <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} maxLength={60} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-bold text-slate-700">Meta Description</label>
                <span className="text-xs text-slate-400">{metaDescription.length}/160</span>
              </div>
              <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} maxLength={160} rows={3} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:border-forest resize-none" />
            </div>
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Google Preview</p>
              <div className="border border-slate-200 p-4 rounded bg-slate-50">
                <p className="text-blue-700 text-lg sm:text-lg mb-1 truncate font-medium">{metaTitle || name || 'Product Name'}</p>
                <p className="text-green-700 text-[13px] mb-1 truncate">https://jammi.com/product/{slug || 'slug'}</p>
                <p className="text-slate-600 text-sm line-clamp-2">{metaDescription || description.replace(/<[^>]+>/g, '') || 'Product description will appear here...'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
