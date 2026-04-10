"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { convexQuery } from '@/lib/adminDb';
import Markdown from 'react-markdown';

export default function BlogReaderPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await convexQuery("functions/cms:getBlog", { slug });
                if (!data) {
                    notFound();
                    return;
                }
                setBlog(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-background-light min-h-screen pt-24 pb-20 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="bg-background-light text-slate-900 font-body min-h-screen pt-24 pb-24">
            <main className="max-w-4xl mx-auto px-4 md:px-10">
                {/* Back button */}
                <Link href="/blogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--purple)] font-bold text-sm uppercase tracking-widest mb-10 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to All Articles
                </Link>

                {/* Header */}
                <header className="mb-12 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                        {blog.category && (
                            <span className="bg-[var(--purple)]/10 text-[var(--purple)] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-[var(--purple)]/20">
                                {blog.category}
                            </span>
                        )}
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                            {new Date(blog.published_at || blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary dark:text-slate-900 leading-tight font-display mb-6">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                            {blog.author_name ? blog.author_name.charAt(0) : 'J'}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-700">{blog.author_name || 'Jammi Pharmacy Team'}</p>
                            <p className="text-xs text-slate-500">Ayurvedic Experts</p>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                {blog.featured_image && (
                    <div className="mb-16 w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl relative border border-slate-200">
                        <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-lg sm:prose-xl max-w-none prose-headings:font-display prose-headings:text-secondary prose-a:text-primary hover:prose-a:text-[var(--purple)] prose-img:rounded-2xl text-slate-700 font-body leading-loose">
                    <Markdown>{blog.content}</Markdown>
                </article>

                {/* Footer tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mr-4 py-1">Tags:</span>
                        {blog.tags.map((tag: string, i: number) => (
                            <span key={i} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
