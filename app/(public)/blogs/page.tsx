"use client";

import React, { useRef } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BlogsPage() {
  const blogs = useQuery(api.functions.cms.listBlogs, { status: "published" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (blogs === undefined) {
    return (
      <div className="bg-[#FAF8F2] min-h-screen pt-32 pb-24 flex items-center justify-center">
         <div className="w-16 h-16 border-t-2 border-r-2 border-[#540C3C] rounded-full animate-spin"></div>
      </div>
    );
  }

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div ref={containerRef} className="bg-[#FAF8F2] min-h-screen overflow-hidden selection:bg-[#540C3C] selection:text-[#F9D139]">
      {/* Editorial Header */}
      <div className="pt-40 pb-20 px-6 md:px-12 relative border-b border-[#540C3C]/10">
        <div className="absolute inset-0 paper-grain pointer-events-none opacity-40 mix-blend-multiply"></div>
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#E87722] block mb-4">Journal & Insights</span>
                <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] font-serif text-[#540C3C] tracking-tight m-0 mix-blend-darken">
                   Wisdom<br/>Archive.
                </h1>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.3 }}
               className="md:max-w-sm pb-4"
            >
                <p className="text-[#2C2420]/80 text-lg leading-relaxed font-sans font-light">
                   Exploring the intersection of ancient Ayurvedic tradition and modern holistic living. Meticulously curated for the mindful.
                </p>
            </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative z-10">
        {blogs.length === 0 ? (
          <div className="text-center py-32 border border-[#540C3C]/10 rounded-none bg-white/50">
             <span className="text-sm font-bold tracking-[0.2em] text-[#540C3C] uppercase">The archive is currently empty</span>
          </div>
        ) : (
          <div className="flex flex-col gap-32">
             
            {/* Featured Post - Massive Asymmetric Layout */}
            {featuredBlog && (
                <Link href={`/blogs/${featuredBlog.slug}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                            <motion.div 
                               className="absolute inset-0 bg-[#540C3C]"
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ duration: 1.2 }}
                            >
                               {/* Image wrapper for hover effect */}
                               <div className="w-full h-full overflow-hidden">
                                    <img 
                                      src={featuredBlog.featured_image || featuredBlog.image_id || 'https://images.unsplash.com/photo-1611095960682-1ad203875fdf?auto=format&fit=crop&q=80'} 
                                      alt={featuredBlog.title} 
                                      className="w-full h-full object-cover filter grayscale opacity-90 group-hover:filter-none group-hover:scale-105 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    />
                               </div>
                            </motion.div>
                            
                            {/* Floating Metadata */}
                            <div className="absolute top-6 left-6 z-10">
                               <div className="bg-white/90 backdrop-blur-md px-4 py-2 font-mono text-[10px] tracking-widest text-[#540C3C] uppercase">
                                  No. {new Date(featuredBlog.published_at || featuredBlog.created_at || '').getFullYear()}
                               </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 lg:pl-12 lg:-ml-24 z-10 relative mt-8 lg:mt-0">
                            <motion.div 
                               style={{ y: yParallax }} 
                               className="bg-[#FAF8F2] p-8 md:p-16 border border-[#540C3C]/10 shadow-2xl shadow-[#540C3C]/5"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="w-12 h-[1px] bg-[#E87722]"></span>
                                    <span className="text-[#E87722] text-xs font-bold tracking-[0.2em] uppercase">Featured</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif text-[#540C3C] leading-[1.1] mb-8 group-hover:text-[#E87722] transition-colors duration-500">
                                   {featuredBlog.title}
                                </h2>
                                <p className="text-[#2C2420]/70 font-sans leading-relaxed text-lg mb-12 line-clamp-4">
                                   {featuredBlog.content.replace(/<[^>]+>/g, '').slice(0, 200)}...
                                </p>
                                
                                <div className="flex items-center justify-between text-xs font-bold tracking-widest text-[#540C3C] uppercase group-hover:text-[#E87722] transition-colors">
                                   <span>Read Article</span>
                                   <span className="material-symbols-outlined transform group-hover:translate-x-4 transition-transform duration-500">east</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Link>
            )}

            {/* List Array - Grid flow with negative space */}
            {remainingBlogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                   {remainingBlogs.map((blog, idx) => (
                      <motion.div 
                         initial={{ opacity: 0, y: 50 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true, margin: "-100px" }}
                         transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
                         key={blog._id}
                      >
                          <Link href={`/blogs/${blog.slug}`} className="group block h-full flex flex-col">
                              <div className="relative overflow-hidden mb-6" style={{ aspectRatio: idx % 2 === 0 ? '3/4' : '4/3' }}>
                                 <img 
                                    src={blog.featured_image || blog.image_id || 'https://images.unsplash.com/photo-1611095960682-1ad203875fdf?auto=format&fit=crop&q=80'} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover filter grayscale group-hover:filter-none transition-[filter,transform] duration-700 ease-out group-hover:scale-105"
                                 />
                                 {blog.category && (
                                     <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-[#540C3C] uppercase">
                                        {blog.category}
                                     </div>
                                 )}
                              </div>
                              <div className="flex flex-col flex-1">
                                  <div className="flex items-center gap-3 mb-4 text-[#8B6914] text-[10px] font-bold tracking-widest uppercase">
                                     <span>{new Date(blog.published_at || blog.created_at || '').toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                     <span className="w-1 h-1 bg-current rounded-full"></span>
                                     <span>{blog.author_name || 'Jammi'}</span>
                                  </div>
                                  <h3 className="text-2xl font-serif text-[#540C3C] leading-tight mb-4 group-hover:text-[#E87722] transition-colors duration-300 line-clamp-2">
                                     {blog.title}
                                  </h3>
                                  <div className="mt-auto pt-6 border-t border-[#540C3C]/10 flex justify-between items-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                     <span className="text-xs font-bold tracking-widest text-[#540C3C] uppercase">Explore</span>
                                     <span className="material-symbols-outlined text-[#540C3C] text-[18px]">arrow_outward</span>
                                  </div>
                              </div>
                          </Link>
                      </motion.div>
                   ))}
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
