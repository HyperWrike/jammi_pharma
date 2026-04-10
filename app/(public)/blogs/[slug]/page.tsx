"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const blog = useQuery(api.functions.cms.getBlog, { slug });
  
  const productsResponse = useQuery(api.functions.products.listProducts, { status: "published" });
  const attachedProduct = productsResponse?.data?.find((p: any) => p._id === blog?.product_id);

  const getStorageUrl = useMutation(api.functions.uploads.getStorageUrl);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityImage = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    if (blog?.image_id) {
      getStorageUrl({ storageId: blog.image_id as any }).then(url => {
        if (url) setCoverImageUrl(url);
      });
    } else if (blog?.featured_image) {
      setCoverImageUrl(blog.featured_image);
    }
  }, [blog]);

  if (blog === undefined) {
    return (
      <div className="bg-[#FAF8F2] min-h-screen flex items-center justify-center">
         <div className="w-16 h-16 border-t-2 border-r-2 border-[#540C3C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog || blog.status !== 'published') {
    return (
      <div className="bg-[#FAF8F2] min-h-screen flex flex-col items-center justify-center">
          <span className="text-xs font-bold tracking-[0.4em] text-[#540C3C] uppercase mb-8">404 - Archive</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#540C3C] mb-12">Entry Not Found</h1>
          <Link href="/blogs" className="text-xs font-bold tracking-widest text-[#E87722] uppercase hover:text-[#540C3C] transition-colors border-b border-current pb-1">
            Return to Index
          </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#FAF8F2] min-h-screen selection:bg-[#540C3C] selection:text-[#F9D139] relative">
      
      {/* Background Texture */}
      <div className="fixed inset-0 paper-grain pointer-events-none opacity-40 mix-blend-multiply z-50"></div>

      {/* Hero Section */}
      <div className="relative pt-40 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[70vh] flex flex-col justify-center">
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
             className="mb-12"
          >
             <Link href="/blogs" className="inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-[#540C3C] uppercase hover:text-[#E87722] transition-colors">
               <span className="w-8 h-[1px] bg-current"></span>
               Directory
             </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
             <div className="lg:col-span-8 flex flex-col justify-end pb-12">
                 {blog.category && (
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-[#E87722] font-bold text-xs tracking-[0.2em] uppercase mb-8 block"
                    >
                      {blog.category}
                    </motion.span>
                 )}
                 <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-serif text-[#540C3C] mix-blend-darken"
                 >
                    {blog.title}
                 </motion.h1>
             </div>
             <div className="lg:col-span-4 flex flex-col justify-end pb-16">
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col gap-8 border-l border-[#540C3C]/20 pl-8"
                 >
                    <div>
                       <span className="block text-[9px] font-bold tracking-[0.3em] uppercase text-[#540C3C]/50 mb-2">Published</span>
                       <span className="text-[#540C3C] text-sm font-semibold tracking-wider">
                         {new Date(blog.published_at || blog.created_at || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                       </span>
                    </div>
                    <div>
                       <span className="block text-[9px] font-bold tracking-[0.3em] uppercase text-[#540C3C]/50 mb-2">Author</span>
                       <span className="text-[#540C3C] text-sm font-semibold tracking-wider">{blog.author_name || 'Jammi Experts'}</span>
                    </div>
                 </motion.div>
             </div>
          </div>
      </div>

      {/* Hero Image Parallax - Full Bleed */}
      {coverImageUrl && (
          <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden border-y border-[#540C3C]/10 bg-[#540C3C]">
             <motion.img 
                style={{ y: yImage, opacity: opacityImage }}
                src={coverImageUrl} 
                alt={blog.title} 
                className="absolute inset-0 w-full h-[130%] object-cover object-center filter grayscale mix-blend-luminosity opacity-80"
             />
             <div className="absolute inset-0 bg-[#540C3C]/20 mix-blend-multiply"></div>
          </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-20">
         <div className={`grid grid-cols-1 ${attachedProduct ? 'lg:grid-cols-12 gap-16 lg:gap-24' : 'max-w-4xl mx-auto'} items-start`}>
            
            {/* The Article */}
            <article className={`${attachedProduct ? 'lg:col-span-7 xl:col-start-2 xl:col-span-6' : 'w-full'} bg-transparent prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:text-[#540C3C] prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-[#2C2420]/90 prose-p:leading-loose prose-p:mb-10 prose-a:text-[#E87722] prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-[#540C3C] prose-blockquote:border-l-[#E87722] prose-blockquote:bg-[#540C3C]/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:my-12 prose-blockquote:font-serif prose-blockquote:text-2xl prose-blockquote:text-[#540C3C] prose-blockquote:not-italic prose-li:text-[#2C2420]/90 prose-ul:my-8 prose-ol:my-8 prose-img:rounded-2xl prose-img:shadow-xl prose-img:w-full prose-img:my-12 first-letter:float-left first-letter:text-6xl first-letter:pr-4 first-letter:font-serif first-letter:text-[#540C3C] first-letter:leading-[0.9] [&_p:empty]:h-8 [&_p:empty]:block`}>
               <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </article>

            {/* Sidebar / Recommended Embed */}
            <div className="lg:col-span-5 xl:col-span-4 relative mt-16 lg:mt-0">
               {attachedProduct && (
                  <div className="sticky top-40 bg-[#FAF8F2] border border-[#540C3C]/20 p-8 md:p-12 shadow-2xl shadow-[#540C3C]/10 group">
                      
                      <div className="flex items-center gap-4 mb-12">
                         <span className="w-12 h-[1px] bg-[#E87722]"></span>
                         <span className="text-[9px] font-bold tracking-[0.3em] text-[#E87722] uppercase">Recommended Protocol</span>
                      </div>

                      <div className="relative aspect-[4/5] bg-white mb-8 border border-[#540C3C]/10 p-8 flex items-center justify-center overflow-hidden">
                         {attachedProduct.images?.[0] ? (
                            <img 
                              src={attachedProduct.images[0]} 
                              alt={attachedProduct.name} 
                              className="object-contain w-full h-full filter sepia-[0.3] group-hover:sepia-0 group-hover:scale-110 transition-all duration-[1s] ease-in-out mix-blend-multiply" 
                            />
                         ) : (
                            <div className="w-full h-full bg-[#540C3C]/5 flex items-center justify-center text-[#540C3C]/20">
                               <span className="material-symbols-outlined text-6xl">spa</span>
                            </div>
                         )}
                      </div>

                      <h3 className="text-3xl font-serif text-[#540C3C] mb-4 leading-tight group-hover:text-[#E87722] transition-colors">{attachedProduct.name}</h3>
                      <p className="text-[#2C2420]/60 font-sans text-sm mb-8 leading-relaxed">
                         {attachedProduct.short_description || attachedProduct.description?.slice(0, 100) + '...'}
                      </p>
                      
                      <div className="flex items-end justify-between border-t border-[#540C3C]/10 pt-6">
                         <div>
                            <span className="block text-[10px] font-bold tracking-widest text-[#540C3C]/50 uppercase mb-1">Investment</span>
                            <span className="text-xl font-serif text-[#540C3C]">₹{attachedProduct.discount_price || attachedProduct.price}</span>
                         </div>
                         
                         <Link href={`/shop/${attachedProduct.slug}`} className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#540C3C] text-[#540C3C] group-hover:bg-[#540C3C] group-hover:text-[#F9D139] transition-all duration-500">
                            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                         </Link>
                      </div>
                  </div>
               )}
            </div>

         </div>
      </div>
      
      {/* Footer minimal breaker */}
      <div className="w-full h-[1px] bg-[#540C3C]/10 max-w-[1400px] mx-auto mt-16 mb-8"></div>
    </div>
  );
}
