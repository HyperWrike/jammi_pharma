"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <div className="h-64 bg-[#1e293b] animate-pulse rounded-lg flex items-center justify-center text-white/50">Loading Editor...</div> });

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const isNew = slug === 'new';

  const blog = useQuery(api.functions.cms.getBlog, isNew ? "skip" : { slug: slug });
  const productsResponse = useQuery(api.functions.products.listProducts, { status: "published" });
  const products = productsResponse?.data || [];
  
  const createBlog = useMutation(api.functions.cms.createBlog);
  const updateBlog = useMutation(api.functions.cms.updateBlog);
  const generateUploadUrl = useMutation(api.functions.uploads.generateUploadUrl);
  const getStorageUrl = useMutation(api.functions.uploads.getStorageUrl);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    categoryId: 'insights',
    tags: '',
    productId: '',
    status: 'draft',
    imageId: '',
    imageUrl: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isNew && blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        categoryId: blog.category || 'insights',
        tags: blog.tags?.join(', ') || '',
        productId: blog.product_id || '',
        status: blog.status || 'draft',
        imageId: blog.image_id || '',
        imageUrl: blog.featured_image || '' // Legacy fallback
      });

      if (blog.image_id) {
        // Resolve storage url
        getStorageUrl({ storageId: blog.image_id as any }).then(url => {
          if (url) setImagePreview(url);
        });
      } else if (blog.featured_image) {
        setImagePreview(blog.featured_image);
      }
    }
  }, [blog, isNew]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();

      const url = await getStorageUrl({ storageId });
      setFormData(prev => ({ ...prev, imageId: storageId, imageUrl: url || '' }));
      if (url) setImagePreview(url);
      
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (forceStatus?: string) => {
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      const finalStatus = forceStatus || (formData.status === 'published' ? 'pending' : formData.status);
      
      if (isNew) {
        await createBlog({
          title: formData.title,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          content: formData.content,
          featured_image: formData.imageUrl || undefined,
          image_id: formData.imageId as any || undefined,
          product_id: formData.productId as any || undefined,
          category: formData.categoryId,
          tags: tagsArray,
          status: finalStatus,
        });
        toast.success("Blog post created!");
        router.push('/admin/blogs');
      } else {
        if (!blog) return;
        await updateBlog({
          id: blog._id,
          title: formData.title,
          content: formData.content,
          featured_image: formData.imageUrl || undefined,
          image_id: formData.imageId as any || undefined,
          product_id: formData.productId as any || undefined,
          status: finalStatus,
        });
        toast.success("Blog post updated!");
        if (finalStatus !== blog.status || finalStatus === 'published') {
          router.push('/admin/blogs');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save blog post");
    }
  };

  if (!isNew && blog === undefined) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="p-8 pb-32 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
        <div>
          <button onClick={() => router.back()} className="text-[#94a3b8] hover:text-white flex items-center gap-1 text-sm font-semibold mb-4 transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Blogs
          </button>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {isNew ? 'Create New Post' : 'Edit Post'}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <button 
            onClick={() => handleSave('draft')}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#1e293b] text-white hover:bg-[#334155] border border-white/10 transition-all w-full md:w-auto"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave('published')}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#E87722] text-white hover:bg-[#E87722]/80 border border-[#E87722]/30 transition-all w-full md:w-auto"
          >
            Publish Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Editor */}
          <div className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-6 shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#94a3b8] mb-2 uppercase tracking-wider">Post Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData(prev => ({ 
                      ...prev, 
                      title, 
                      slug: isNew ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug 
                    }));
                  }}
                  className="w-full bg-[#1e293b] border-none text-white px-5 py-3.5 rounded-xl font-medium focus:ring-2 focus:ring-[#22c55e] transition-all outline-none"
                  placeholder="Enter a captivating title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#94a3b8] mb-2 uppercase tracking-wider">Content</label>
                <div className="rounded-xl overflow-hidden [&_.ql-container]:bg-[#1e293b] [&_.ql-container]:text-white [&_.ql-container]:border-none [&_.ql-container]:font-sans [&_.ql-container]:text-base [&_.ql-editor]:min-h-[400px] [&_.ql-toolbar]:bg-[#0a0a0f] [&_.ql-toolbar]:border-none [&_.ql-toolbar_.ql-stroke]:stroke-[#94a3b8] [&_.ql-toolbar_.ql-fill]:fill-[#94a3b8] [&_.ql-toolbar_.ql-picker]:text-[#94a3b8]">
                  <ReactQuill 
                    theme="snow"
                    value={formData.content}
                    onChange={(val) => setFormData(p => ({...p, content: val}))}
                    placeholder="Write your amazing post here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Meta Information */}
          <div className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-4">Post Settings</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-2 uppercase tracking-wider">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(p => ({...p, slug: e.target.value}))}
                  disabled={!isNew}
                  className="w-full bg-[#1e293b] border-none text-white px-4 py-3 rounded-xl text-sm opacity-80"
                />
                {!isNew && <p className="text-[10px] text-[#94a3b8] mt-1">Slug cannot be changed once created.</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-2 uppercase tracking-wider">Attach Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData(p => ({...p, productId: e.target.value}))}
                  className="w-full bg-[#1e293b] border-none text-white px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#22c55e] outline-none"
                >
                  <option value="">No Product Attached</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
                <p className="text-[10px] text-[#94a3b8] mt-2">This product will be highlighted inside the blog article.</p>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-2 uppercase tracking-wider">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(p => ({...p, tags: e.target.value}))}
                  placeholder="health, ayurveda, lifestyle"
                  className="w-full bg-[#1e293b] border-none text-white px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#22c55e] outline-none"
                />
              </div>

            </div>
          </div>

          <div className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-6 shadow-xl">
             <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-4">Cover Image</h3>
             
             {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden mb-4 group h-48 bg-[#0a0a0f]">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-black/60 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                       <span className="material-symbols-outlined text-[18px]">upload</span> Change
                       <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
             ) : (
                <label className={`block w-full border-2 border-dashed border-[#22c55e]/30 rounded-xl p-8 text-center cursor-pointer hover:bg-[#22c55e]/5 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <span className="material-symbols-outlined text-4xl text-[#22c55e] mb-2 block">
                    {isUploading ? 'cloud_sync' : 'add_photo_alternate'}
                  </span>
                  <span className="text-sm font-semibold text-[#94a3b8]">
                    {isUploading ? 'Uploading...' : 'Click to Upload Cover Image'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
