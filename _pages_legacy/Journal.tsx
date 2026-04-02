"use client";
import React, { useState, useEffect } from 'react';
import { fetchCollection, updateDocument } from '../lib/adminDb';
import LiveEditable from '../components/admin/LiveEditable';
import EditorImage from '../components/EditorImage';
import { useAdmin } from '../components/admin/AdminContext';
import { useCMSContent } from '../hooks/useCMSContent';
import { cmsApi } from '../lib/adminApi';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  status: 'Draft' | 'Published';
  createdAt: string;
}

export default function Journal() {
  const { content, loading: cmsLoading } = useCMSContent('journal');
  const { isEditMode, isAdmin } = useAdmin();
  const editorActive = isEditMode && isAdmin;

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // CMS Helper
  const CMS = ({ section = 'general', field, fallback, multiline, inputType }: any) => (
    <LiveEditable 
        cmsKey={{ page: 'journal', section, content_key: field }}
        multiline={multiline}
        inputType={inputType}
    >
        {content?.[section]?.[field] || fallback}
    </LiveEditable>
  );

  const CMSImage = ({ section = 'general', field, fallback, className }: any) => (
    <EditorImage
        src={content?.[section]?.[field] || fallback}
        alt={field}
        className={className}
        bucket="cms-images"
        folder="journal"
        editorActive={editorActive}
        onUpdate={async (url) => {
            try {
                await cmsApi.saveContent([{
                    page: 'journal',
                    section,
                    content_key: field,
                    content_value: url
                }]);
            } catch (err) {
                console.error("Failed to save image URL to CMS:", err);
            }
        }}
    />
  );

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchCollection('blogs') as BlogPost[];
        const publishedBlogs = data
          .filter(b => b.status === 'Published')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBlogs(publishedBlogs);
      } catch (err) {
        console.error("Failed to load blogs", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-12 bg-white overflow-hidden border-b border-slate-100">
        {/* Background Decorative Pattern (Subtle) */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-forest">
            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.5,-0.3C89,15.7,85.4,31.4,78.1,45.4C70.8,59.4,59.8,71.7,46.1,78.9C32.4,86.1,16.2,88.2,1.3,85.9C-13.6,83.6,-27.2,76.9,-41.2,69.5C-55.2,62.1,-69.6,54,-78.4,41.9C-87.2,29.8,-90.4,14.9,-88.7,0.9C-87,-13.1,-80.4,-26.2,-72.1,-37.8C-63.8,-49.4,-53.8,-59.5,-42.2,-67.2C-30.6,-74.9,-15.3,-80.1,0.5,-80.9C16.3,-81.7,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-forest/5 text-forest font-bold text-xs uppercase tracking-widest border border-forest/10">
              <CMS section="hero" field="heroBadge" fallback="The Jammi Journal" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              <CMS section="hero" field="heroTitle" multiline fallback={<>Ancient Wisdom for <span className="text-forest relative">Modern Vitality<svg className="absolute w-full h-3 -bottom-1 left-0 text-saffron/40 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent"/></svg></span></>} />
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
              <CMS section="hero" field="heroDesc" multiline fallback="Unlock the centuries-old secrets of Ayurveda. Curated wellness practices to balance your mind, body, and spirit in today's fast-paced world." />
            </p>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-forest/20 to-transparent mix-blend-overlay z-10"></div>
              <CMSImage 
                section="hero"
                field="heroImage" 
                fallback="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Decorative Element */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 z-20 hidden sm:flex">
              <div className="w-12 h-12 rounded-full bg-saffron/20 flex items-center justify-center text-saffron">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  <CMS section="hero" field="floatingBadgeTitle" fallback="100% Natural" />
                </p>
                <p className="text-xs text-slate-500">
                  <CMS section="hero" field="floatingBadgeDesc" fallback="Holistic Healing" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                <CMS section="grid" field="gridTitle" fallback="Latest from the Journal" />
              </h2>
              <p className="text-slate-600 mt-2">
                <CMS section="grid" field="gridDesc" fallback="Explore our most recent articles on health, herbs, and harmony." />
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="w-10 h-10 border-4 border-forest border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-medium animate-pulse">Loading Journal Entries...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-slate-300">import_contacts</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">No Journal Entries Yet</h3>
              <p className="text-slate-500 mt-2">Check back soon for insights on Ayurvedic wellness.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full transform hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                    {blog.imageUrl ? (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                         <span className="material-symbols-outlined text-4xl">psychiatry</span>
                      </div>
                    )}
                    {/* Category Pill (Mocked as Wellness since no category in schema) */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-full text-[10px] font-bold text-saffron uppercase tracking-widest">
                      <CMS section="grid" field="categoryLabel" fallback="Wellness" />
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span>
                        <CMS section="grid" field="readTime" fallback="5 min read" />
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-forest transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-xs">
                          J
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          <CMS section="grid" field="authorLabel" fallback="Jammi Expert" />
                        </span>
                      </div>
                      
                      <button className="flex items-center gap-1 text-sm font-bold text-forest group-hover:text-green-700 transition-colors">
                        <CMS section="grid" field="readMoreBtn" fallback="Read More" />
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-forest py-20 px-6 lg:px-12 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
         <div className="max-w-3xl mx-auto text-center relative z-10">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
             <CMS section="newsletter" field="newsletterTitle" fallback="Join Our Wellness Community" />
           </h2>
           <p className="text-green-50 text-lg mb-8 max-w-xl mx-auto opacity-90">
             <CMS section="newsletter" field="newsletterDesc" multiline fallback="Subscribe to The Jammi Journal for weekly insights, healthy recipes, and exclusive offers straight to your inbox." />
           </p>
           <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
             <input 
                type="email" 
                placeholder="Your email address" 
                required
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron text-slate-900"
             />
             <button type="submit" className="bg-saffron text-white font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-lg">
                <CMS section="newsletter" field="subscribeBtn" fallback="Subscribe" />
             </button>
           </form>
         </div>
      </section>
    </div>
  );
}
