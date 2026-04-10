"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { convexQuery, convexMutation } from '@/lib/adminDb';
import { useAdmin } from '@/components/admin/AdminContext';

export default function BlogsFrontendPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAdmin();

    // Blog management state
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        featured_image: '',
        content: '',
        category: 'Ayurveda',
        status: 'draft',
    });
    const [saving, setSaving] = useState(false);

    const fetchBlogs = async () => {
        try {
            const data = await convexQuery("functions/cms:listBlogs", {});
            // Admin sees all, public sees only published
            if (isAdmin) {
                setBlogs(data || []);
            } else {
                setBlogs((data || []).filter((b: any) => b.status === 'published'));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [isAdmin]);

    const openCreateModal = () => {
        setEditingBlog(null);
        setFormData({ title: '', featured_image: '', content: '', category: 'Ayurveda', status: 'draft' });
        setShowModal(true);
    };

    const openEditModal = (blog: any) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title || '',
            featured_image: blog.featured_image || '',
            content: blog.content || '',
            category: blog.category || '',
            status: blog.status || 'draft',
        });
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
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
                    slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
                    content: formData.content,
                    featured_image: formData.featured_image || undefined,
                    category: formData.category,
                    tags: [],
                    status: formData.status,
                });
            }
            setShowModal(false);
            fetchBlogs();
        } catch (err) {
            console.error(err);
            alert("Failed to save blog post.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (blogId: string) => {
        if (!confirm('Delete this blog post?')) return;
        try {
            await convexMutation("functions/cms:deleteBlog", { id: blogId });
            fetchBlogs();
        } catch (err) {
            alert('Failed to delete blog');
        }
    };

    return (
        <div className="bg-background-light text-slate-900 font-body min-h-screen pt-24 pb-20">
            <main className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary dark:text-primary mb-4 leading-tight font-display">
                        Ayurvedic Insights
                    </h1>
                    <p className="text-slate-700 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
                        Explore our latest research, traditional wisdom, and updates.
                    </p>

                    {isAdmin && (
                        <button
                            onClick={openCreateModal}
                            className="mt-8 inline-flex items-center gap-2 bg-[var(--purple)] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:brightness-95 transition-all shadow-lg"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            Create Blog Post
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 animate-pulse h-80"></div>
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map(blog => (
                            <div key={blog._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative">

                                {/* Admin Controls */}
                                {isAdmin && (
                                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                                        <button
                                            onClick={(e) => { e.preventDefault(); openEditModal(blog); }}
                                            className="w-9 h-9 bg-white/90 backdrop-blur-sm text-[var(--purple)] rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all border border-slate-200"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">edit</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.preventDefault(); handleDelete(blog._id); }}
                                            className="w-9 h-9 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-all border border-slate-200"
                                            title="Delete"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">delete</span>
                                        </button>
                                    </div>
                                )}

                                <Link href={`/blogs/${blog.slug}`} className="flex flex-col flex-1">
                                    <div className="h-48 overflow-hidden bg-slate-100 relative">
                                        {blog.featured_image ? (
                                            <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <span className="material-symbols-outlined text-4xl">article</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {blog.category && (
                                                <div className="bg-primary text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                    {blog.category}
                                                </div>
                                            )}
                                            {isAdmin && blog.status !== 'published' && (
                                                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                    {blog.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                                            {new Date(blog.published_at || blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-secondary dark:text-slate-900 mb-3 leading-tight group-hover:text-[var(--purple)] transition-colors line-clamp-2 title-font">
                                            {blog.title}
                                        </h3>
                                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {blog.content.replace(/<[^>]+>/g, '')}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[var(--purple)] font-bold text-sm">
                                            <span>Read Article</span>
                                            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-200 shadow-sm">
                        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4 block">draft_orders</span>
                        <h3 className="text-2xl font-bold text-slate-500">No Articles Yet</h3>
                        <p className="text-slate-600 mt-2">Check back soon for the latest updates.</p>
                        {isAdmin && (
                            <button
                                onClick={openCreateModal}
                                className="mt-6 inline-flex items-center gap-2 bg-[var(--purple)] text-white px-6 py-3 rounded-full font-bold text-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                Create First Post
                            </button>
                        )}
                    </div>
                )}

                {/* Blog Create/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 border border-slate-200">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-secondary">{editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 transition p-1">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={e => setFormData({...formData, title: e.target.value})}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[var(--purple)] transition bg-slate-50"
                                            placeholder="Blog post title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Featured Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.featured_image}
                                            onChange={e => setFormData({...formData, featured_image: e.target.value})}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[var(--purple)] transition bg-slate-50"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Content (Markdown) *</label>
                                    <textarea
                                        required
                                        rows={14}
                                        value={formData.content}
                                        onChange={e => setFormData({...formData, content: e.target.value})}
                                        className="w-full border-2 border-slate-200 rounded-xl p-4 text-slate-800 font-mono text-sm focus:outline-none focus:border-[var(--purple)] transition bg-slate-50 resize-y"
                                        placeholder="Write your blog post content in Markdown..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={e => setFormData({...formData, status: e.target.value})}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[var(--purple)] transition bg-slate-50 appearance-none"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">Category</label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={e => setFormData({...formData, category: e.target.value})}
                                            className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-[var(--purple)] transition bg-slate-50"
                                            placeholder="e.g. Ayurveda, Wellness"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-800 transition bg-transparent border-none">Cancel</button>
                                    <button type="submit" disabled={saving} className="px-8 py-3 bg-[var(--purple)] hover:brightness-95 text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg transition disabled:opacity-60">
                                        {saving ? 'Saving...' : 'Save Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
