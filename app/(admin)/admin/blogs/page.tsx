"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { convexQuery, convexMutation } from '@/lib/adminDb';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featured_image: '',
    content: '',
    category: '',
    status: 'draft',
    tags: []
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await convexQuery("functions/cms:listBlogs", {});
      setBlogs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await convexMutation("functions/cms:deleteBlog", { id });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          if (editingBlog) {
             await convexMutation("functions/cms:updateBlog", {
                 id: editingBlog._id,
                 title: formData.title,
                 content: formData.content,
                 featured_image: formData.featured_image,
                 status: formData.status,
                 ...(formData.status === 'published' && editingBlog.status !== 'published' ? { published_at: new Date().toISOString() } : {})
             });
          } else {
             await convexMutation("functions/cms:createBlog", {
                 title: formData.title,
                 slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                 content: formData.content,
                 featured_image: formData.featured_image,
                 category: formData.category,
                 tags: []
             });
          }
          setShowModal(false);
          fetchBlogs();
      } catch (err) {
          console.error(err);
          alert("Failed to save blog post");
      }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Blog Posts</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Manage articles and Ayurvedic knowledge</p>
          </div>
          <button 
            onClick={() => { 
                setEditingBlog(null); 
                setFormData({ title: '', slug: '', featured_image: '', content: '', category: 'Ayurveda', status: 'draft', tags: [] });
                setShowModal(true); 
            }}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">edit_document</span>
            Create New Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {loading ? (
              Array(3).fill(0).map((_, i) => (
                 <div key={i} className="bg-[#111118] border border-white/5 rounded-3xl p-6 animate-pulse h-64"></div>
              ))
           ) : blogs.length > 0 ? blogs.map((blog, idx) => (
              <div key={blog._id} className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition flex flex-col group overflow-hidden">
                 <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${blog.status === 'published' ? 'bg-green-500/10 text-green-500 border-green-500/10' : 'bg-orange-500/10 text-orange-500 border-orange-500/10'}`}>
                       {blog.status}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                       {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                 </div>

                 {blog.featured_image && (
                     <img src={blog.featured_image} className="w-full h-32 object-cover rounded-xl mb-4 border border-white/10" alt="Cover" />
                 )}

                 <h3 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-green-500 transition-colors">
                    {blog.title}
                 </h3>
                 <p className="text-xs text-slate-500 line-clamp-2 mb-6 font-medium">{blog.content.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>

                 <div className="mt-auto flex items-center gap-2">
                    <button 
                      onClick={() => { 
                          setEditingBlog(blog); 
                          setFormData({ title: blog.title, slug: blog.slug, featured_image: blog.featured_image || '', content: blog.content, category: blog.category || '', status: blog.status, tags: blog.tags || [] });
                          setShowModal(true); 
                      }}
                      className="flex-grow py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                    >
                       Edit Post
                    </button>
                    <button 
                      onClick={() => handleDelete(blog._id)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition border border-red-500/10"
                    >
                       <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                 </div>
              </div>
           )) : (
              <div className="col-span-full py-32 text-center text-slate-600 italic">No blog posts yet. Create the first one!</div>
           )}
        </div>

        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-[#111118] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-8">
                       <h2 className="text-2xl font-black text-white">{editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
                       <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition"><span className="material-symbols-outlined">close</span></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</label>
                               <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition" />
                           </div>
                           <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Featured Image URL</label>
                               <input type="text" value={formData.featured_image} onChange={e => setFormData({...formData, featured_image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition" />
                           </div>
                       </div>
                       
                       <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content (Markdown/HTML)</label>
                           <textarea required rows={12} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-green-500 transition"></textarea>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</label>
                               <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition appearance-none">
                                   <option value="draft" className="bg-[#111118]">Draft</option>
                                   <option value="published" className="bg-[#111118]">Published</option>
                               </select>
                           </div>
                           <div className="space-y-2">
                               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                               <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition" />
                           </div>
                       </div>

                       <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                           <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition">Cancel</button>
                           <button type="submit" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-500/20 active:scale-95 transition">Save Post</button>
                       </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    </AdminLayout>
  );
}
