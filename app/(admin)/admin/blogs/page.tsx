"use client";

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminBlogsPage() {
  const blogs = useQuery(api.functions.cms.listBlogs, {}) || undefined;
  const updateStatus = useMutation(api.functions.cms.updateBlog);
  const deleteBlog = useMutation(api.functions.cms.deleteBlog);
  const [filter, setFilter] = useState('all');

  if (blogs === undefined) {
    return (
      <div className="p-8 pb-32 animate-pulse">
        <div className="h-10 bg-[#22c55e]/10 w-64 rounded-xl mb-8"></div>
        <div className="space-y-4">
          <div className="h-24 bg-[#1e293b]/50 rounded-2xl w-full"></div>
          <div className="h-24 bg-[#1e293b]/50 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const handleStatusChange = async (targetId: any, newStatus: string) => {
    try {
      await updateStatus({ id: targetId, status: newStatus });
      toast.success(`Post marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog({ id });
        toast.success("Blog post deleted");
      } catch (e) {
        toast.error("Failed to delete blog post");
      }
    }
  }

  return (
    <div className="p-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Blog Management
          </h1>
          <p className="text-[#94a3b8] mt-2 text-sm max-w-2xl">
            Create, edit, and manage blog posts.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1e293b] p-1 rounded-xl">
            {['all', 'draft', 'pending', 'published'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  filter === s 
                    ? 'bg-[#22c55e] text-[#0a0a0f] shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'text-white hover:bg-[#334155]'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <Link href="/admin/blogs/new" className="bg-[#22c55e] text-[#0a0a0f] hover:bg-[#16a34a] px-5 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredBlogs.length === 0 ? (
          <div className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-[#94a3b8]/30 mb-4 block">article</span>
            <h3 className="text-xl font-bold text-white mb-2">No Blog Posts Found</h3>
            <p className="text-[#94a3b8]">Create your first blog post to get started!</p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center">
              {blog.image_id || blog.featured_image ? (
                <div className="w-full md:w-48 h-32 bg-[#0a0a0f] rounded-xl overflow-hidden shrink-0 border border-white/5 relative">
                  {/* For simpler implementation without waiting for image_id resolving if it's already a string URL from legacy. If it's a storage id we might need a separate component to resolve, or we use a helper query if it's featured_image */}
                  {/* For now, just show a placeholder icon or image if it's a URL */}
                  <div className="absolute inset-0 flex items-center justify-center text-[#94a3b8]">
                    <span className="material-symbols-outlined text-4xl">image</span>
                  </div>
                </div>
              ) : (
                <div className="w-full md:w-48 h-32 bg-[#1e293b] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                   <span className="material-symbols-outlined text-[#94a3b8] text-4xl">image_not_supported</span>
                </div>
              )}
              
              <div className="flex-1 space-y-3 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                    <p className="text-[#94a3b8] text-sm mt-1">/{blog.slug}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    blog.status === 'draft' ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' :
                    blog.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30'
                  }`}>
                    {blog.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm mt-4">
                  <p className="text-[#94a3b8]">Last updated: {new Date(blog.updated_at || '').toLocaleDateString()}</p>
                  <p className="text-[#94a3b8]">Views: {blog.view_count || 0}</p>
                </div>
              </div>

              <div className="w-full md:w-48 flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 shrink-0">
                <Link href={`/admin/blogs/${blog.slug}`} className="w-full py-2 px-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all border border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e] hover:text-[#0a0a0f] text-center">
                  Edit Post
                </Link>
                {['draft', 'pending', 'published'].filter(s => s !== blog.status).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(blog._id, s)}
                    className="w-full py-2 px-4 rounded-lg text-xs font-semibold tracking-wider transition-all border border-transparent bg-white/5 text-[#94a3b8] hover:bg-white/10"
                  >
                    Set {s}
                  </button>
                ))}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="w-full py-2 px-4 rounded-lg text-xs font-semibold tracking-wider transition-all border border-red-500/30 text-red-500 hover:bg-red-500/10 mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
