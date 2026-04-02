"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminPanelFloatingLink from '../../../components/admin/AdminPanelFloatingLink';
import { subscribeToDocument, updateDocument } from '../../../lib/adminDb';
import LiveEditable from '../../../components/admin/LiveEditable';
import EditorImage from '../../../components/EditorImage';
import { useAdmin } from '../../../components/admin/AdminContext';

export default function FoundersPage() {
    const [content, setContent] = useState<any>({});
    const { isEditMode, isAdmin } = useAdmin();
    const editorActive = isEditMode && isAdmin;

    useEffect(() => {
        const unsubscribe = subscribeToDocument('content', 'founders', (data) => {
            if (data) setContent(data);
        });
        return () => unsubscribe();
    }, []);

    const CMS = ({ section, field, fallback, inputType = 'text', multiline = false, className = '', children }: any) => (
        <LiveEditable collection="content" docId="founders" field={field} inputType={inputType} multiline={multiline} className={className}>
            {content?.[field] || children || fallback}
        </LiveEditable>
    );

    return (
        <div className="bg-background-light text-slate-900 font-body min-h-screen">

            {/* Header Section */}
            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                    <CMS field="headerLabel" fallback="The Guardians of Tradition" />
                </span>
                <h1 className="font-display text-5xl md:text-7xl text-secondary font-bold leading-tight mb-8">
                    <CMS field="title" fallback="Meet Our Founders" />
                </h1>
                <div className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed border-b border-primary/20 pb-12">
                    <CMS field="heroDesc" multiline fallback="Carrying forward a 128-year legacy, Dr. Narasimham Jammi and Dr. Anitha Balachander merge the ancient wisdom of Ayurveda with the rigor of modern molecular science to heal humanity." />
                </div>
            </section>

            {/* Dr. Narasimham Jammi */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="relative group order-2 lg:order-1">
                        <div className="absolute inset-0 bg-primary/20 rounded-[2rem] transform -translate-x-4 translate-y-4 -z-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
                        <div className="team-photo rounded-[2rem] w-full aspect-[4/5] object-cover shadow-2xl overflow-hidden relative">
                            <EditorImage
                                src={content.founder1Image || "/images/founder_1.png"}
                                alt="Dr. Narasimham Jammi"
                                className="w-full h-full object-cover object-top"
                                bucket="site-assets"
                                folder="founders"
                                editorActive={editorActive}
                                onUpdate={(url) => {
                                    updateDocument('content', 'founders', { founder1Image: url });
                                    setContent((prev: any) => ({ ...prev, founder1Image: url }));
                                }}
                            />
                        </div>
                        <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/50 shadow-lg">
                            <span className="material-symbols-outlined text-3xl text-primary">auto_stories</span>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-display font-bold text-secondary mb-2">
                                <CMS field="narasimhamName" fallback="Dr. Narasimham Jammi" />
                            </h2>
                            <p className="text-primary font-bold uppercase tracking-widest text-sm">
                                <CMS field="narasimhamRole" fallback="Visionary & Co-Founder" />
                            </p>
                        </div>

                        <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-body">
                            <p>
                                <CMS field="narasimhamBio1" multiline fallback="As a direct descendant of the legendary Dr. Jammi Venkataramanayya, Dr. Narasimham Jammi bears the mantle of a 128-year-old healing legacy. His life’s work is dedicated to standardizing ancient Ayurvedic formulations while preserving their intrinsic holistic potency." />
                            </p>
                            <p>
                                <CMS field="narasimhamBio2" multiline fallback="Trained deeply in classical texts and modern analytical techniques, he has spearheaded the company's transition from an apothecary model into a modern, compliance-driven pharmaceutical powerhouse without ever compromising the core tenets of Ayurveda." />
                            </p>
                            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-secondary font-serif">
                                <CMS field="narasimhamQuote" multiline fallback="&quot;Our ancestors mapped the human body through the lens of nature. It is our duty to validate this map for the modern world.&quot;" />
                            </blockquote>
                        </div>

                        <a
                            href="https://www.linkedin.com/in/narasimham-jammi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white border border-slate-200 hover:border-primary text-secondary px-8 py-4 rounded-full font-bold transition-all shadow-sm hover:shadow-md group"
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5 transition-colors" />
                            <CMS collection="content" docId="founders" field="linkedInText">Connect on LinkedIn</CMS>
                            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>

            {/* Dr. Anitha Balachander */}
            <section className="py-16 px-6 max-w-7xl mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-display font-bold text-secondary mb-2">
                                <CMS field="anithaName" fallback="Dr. Anitha Balachander" />
                            </h2>
                            <p className="text-primary font-bold uppercase tracking-widest text-sm">
                                <CMS field="anithaRole" fallback="Co-Founder & Chief Medical Officer" />
                            </p>
                        </div>

                        <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-body">
                            <p>
                                <CMS field="anithaBio1" multiline fallback="Dr. Anitha Balachander is the clinical mind driving the efficacy and patient-centric approach of Jammi Pharmaceuticals. With decades of clinical experience, she bridges the gap between classical Ayurvedic diagnosis and contemporary patient care." />
                            </p>
                            <p>
                                <CMS field="anithaBio2" multiline fallback="She oversees the profound clinical protocols at our fortitudes, ensuring that whether a patient comes for pediatric care (like our famous Livercure) or geriatric neuromuscular rehabilitation, they receive the highest standard of personalized Ayurvedic medicine." />
                            </p>
                            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-secondary font-serif">
                                <CMS field="anithaQuote" multiline fallback="&quot;Ayurveda is not an alternative medicine; for centuries, it has been the primary science of life, health, and profound healing.&quot;" />
                            </blockquote>
                        </div>

                        <a
                            href="https://www.linkedin.com/in/anitha-balachander-2ab7132/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white border border-slate-200 hover:border-primary text-secondary px-8 py-4 rounded-full font-bold transition-all shadow-sm hover:shadow-md group"
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-colors" />
                            <CMS collection="content" docId="founders" field="linkedInText">Connect on LinkedIn</CMS>
                            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </a>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-secondary/10 rounded-[2rem] transform translate-x-4 -translate-y-4 -z-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500"></div>
                        <div className="team-photo rounded-[2rem] w-full aspect-[4/5] object-cover shadow-2xl overflow-hidden relative">
                            <EditorImage
                                src={content.founder2Image || "/images/founder_2.jpg"}
                                alt="Dr. Anitha Balachander"
                                className="w-full h-full object-cover object-top"
                                bucket="site-assets"
                                folder="founders"
                                editorActive={editorActive}
                                onUpdate={(url) => {
                                    updateDocument('content', 'founders', { founder2Image: url });
                                    setContent((prev: any) => ({ ...prev, founder2Image: url }));
                                }}
                            />
                        </div>
                        <div className="absolute bottom-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/50 shadow-lg">
                            <span className="material-symbols-outlined text-3xl text-primary">healing</span>
                        </div>
                    </div>

                </div>
            </section>
            <AdminPanelFloatingLink />
        </div>
    );
}
