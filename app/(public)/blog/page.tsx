"use client";

import { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAdmin } from '../../../components/admin/AdminContext';
import { useAdminSave } from '../../../hooks/useAdminSave';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function BlogPage() {
  const { isEditMode } = useAdmin();
  const { uploadImage } = useAdminSave();

  const blogs = useQuery(api["functions/cms"].listBlogs, {}) || [];
  const createBlog = useMutation(api["functions/cms"].createBlog);
  const updateBlog = useMutation(api["functions/cms"].updateBlog);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wellness');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  const publishedBlogs = useMemo(
    () => blogs.filter((b: any) => b.status === 'published'),
    [blogs]
  );

  const visibleBlogs = isEditMode ? blogs : publishedBlogs;

  const onUploadImage = async (file: File | null) => {
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, 'cms-images', 'blogs');
    if (url) {
      setFeaturedImage(url);
      window.dispatchEvent(
        new CustomEvent('jammi_toast', {
          detail: { message: 'Image uploaded', type: 'success' },
        })
      );
    }
    setUploading(false);
  };

  const onAddBlog = async () => {
    if (!title.trim() || !content.trim()) {
      window.dispatchEvent(
        new CustomEvent('jammi_toast', {
          detail: { message: 'Title and content are required', type: 'error' },
        })
      );
      return;
    }

    try {
      setSaving(true);
      const nowIso = new Date().toISOString();
      const postId = await createBlog({
        title: title.trim(),
        slug: `${slugify(title)}-${Date.now().toString().slice(-5)}`,
        content: content.trim(),
        featured_image: featuredImage || undefined,
        category: category.trim() || undefined,
      });

      await updateBlog({
        id: postId,
        status: 'published',
        published_at: nowIso,
      });

      setTitle('');
      setCategory('Wellness');
      setContent('');
      setFeaturedImage('');

      window.dispatchEvent(
        new CustomEvent('jammi_toast', {
          detail: { message: 'Blog published', type: 'success' },
        })
      );
    } catch (e: any) {
      window.dispatchEvent(
        new CustomEvent('jammi_toast', {
          detail: { message: e?.message || 'Failed to publish blog', type: 'error' },
        })
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-background-light pt-[5.5rem] min-h-screen">
      <section className="bg-[var(--purple)] text-white py-14 sm:py-16 lg:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <span className="inline-flex items-center bg-white/10 text-[var(--yellow)] px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase">
            Jammi Blog
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            Ayurveda Knowledge For Modern Living
          </h1>
          <p className="mt-5 text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl">
            Live blog feed powered by Convex. New posts can only be added while live edit mode is enabled.
          </p>
        </div>
      </section>

      {isEditMode && (
        <section className="py-8 border-b border-[var(--purple)]/10 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="rounded-2xl border border-[var(--purple)]/15 bg-[var(--cream)] p-5 sm:p-6 lg:p-7">
              <h2 className="text-2xl font-extrabold text-[var(--purple)]">Add New Blog</h2>
              <p className="mt-1 text-sm text-[var(--purple)]/70">This will create and publish a new blog in Convex.</p>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog title"
                  className="w-full rounded-lg border border-[var(--purple)]/20 px-3 py-2 bg-white text-[var(--purple)]"
                />
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="w-full rounded-lg border border-[var(--purple)]/20 px-3 py-2 bg-white text-[var(--purple)]"
                />
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Blog content / excerpt"
                className="mt-4 w-full rounded-lg border border-[var(--purple)]/20 px-3 py-2 bg-white text-[var(--purple)] min-h-[150px]"
              />

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="inline-flex items-center justify-center rounded-lg border border-[var(--purple)]/20 bg-white px-4 py-2 text-sm font-semibold text-[var(--purple)] cursor-pointer hover:bg-[var(--cream)] transition-colors">
                  {uploading ? 'Uploading...' : 'Upload Featured Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onUploadImage(e.target.files?.[0] || null)}
                    disabled={uploading}
                  />
                </label>
                {featuredImage && <span className="text-xs text-[var(--purple)]/70">Image attached</span>}
              </div>

              {featuredImage && (
                <img src={featuredImage} alt="Uploaded preview" className="mt-4 h-40 w-full sm:w-60 object-cover rounded-lg border border-[var(--purple)]/15" />
              )}

              <div className="mt-5">
                <button
                  onClick={onAddBlog}
                  disabled={saving || uploading}
                  className="bg-[var(--yellow)] text-[var(--purple)] font-bold px-6 py-3 rounded-lg hover:brightness-95 disabled:opacity-60"
                >
                  {saving ? 'Publishing...' : 'Publish Blog'}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--purple)] font-black tracking-tight">
              Latest Articles
            </h3>
            <p className="text-sm text-[var(--purple)]/75 max-w-md">
              {isEditMode ? 'Showing all posts (draft + published) in real-time.' : 'Showing published posts only.'}
            </p>
          </div>

          {visibleBlogs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--purple)]/30 bg-white p-10 text-center">
              <h4 className="text-xl font-bold text-[var(--purple)]">No blogs published yet</h4>
              <p className="mt-2 text-[var(--purple)]/70">
                {isEditMode ? 'Add the first blog from the editor panel above.' : 'Please check back soon for updates.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {visibleBlogs.map((post: any) => (
                <article key={post._id} className="bg-white border border-[var(--purple)]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={post.featured_image || '/images/placeholder.png'}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-widest">
                      <span className="text-[var(--orange)]">{post.category || 'General'}</span>
                      <span className="text-[var(--purple)]/65">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                      </span>
                    </div>

                    <h4 className="mt-3 text-xl font-extrabold text-[var(--purple)] leading-snug min-h-[56px]">
                      {post.title}
                    </h4>

                    <p className="mt-2 text-sm text-[var(--purple)]/80 leading-relaxed line-clamp-4 min-h-[80px]">
                      {post.content}
                    </p>

                    {isEditMode && (
                      <div className="mt-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[var(--purple)]/10 text-[var(--purple)]">
                        {post.status || 'draft'}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
