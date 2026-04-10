"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const MadhuchariChurna: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FAF6F0] dark:bg-[#221610] text-slate-900 dark:text-slate-100 font-['DM_Sans',sans-serif]">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full bg-[#FAF6F0]/80 dark:bg-[#221610]/80 backdrop-blur-md border-b border-[#D4882E]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2 text-[#2E5339] dark:text-[#D4882E]">
                                <span className="material-symbols-outlined text-3xl">spa</span>
                                <h2 className="text-2xl font-['Playfair_Display',serif] font-bold leading-tight tracking-tight">Veda Aura</h2>
                            </div>
                            <nav className="hidden md:flex items-center gap-8">
                                <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Shop</a>
                                <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Heritage</a>
                                <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">About</a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center bg-[#D4882E]/10 rounded-xl px-3 py-1.5 border border-[#D4882E]/20">
                                <span className="material-symbols-outlined text-[#D4882E] text-xl">search</span>
                                <input className="bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-[#2E5339]/50 w-32 lg:w-48" placeholder="Search heritage care..." />
                            </div>
                            <button className="p-2 hover:bg-[#D4882E]/10 rounded-full transition-colors relative">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                <span className="absolute top-1 right-1 bg-[#D4882E] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
                            </button>
                            <button className="p-2 hover:bg-[#D4882E]/10 rounded-full transition-colors">
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-[#2E5339]/5 border border-[#D4882E]/10 relative">
                            <div className="w-full h-full bg-slate-200 object-cover flex items-center justify-center">
                                <span className="material-symbols-outlined text-6xl text-slate-400">image</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <nav className="flex text-sm text-[#2E5339]/60 mb-4 items-center gap-2">
                            <a className="hover:text-[#D4882E]" href="#">Home</a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <a className="hover:text-[#D4882E]" href="#">Wellness</a>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-[#2E5339] font-medium">Madhuchari Churna</span>
                        </nav>
                        <h1 className="text-4xl lg:text-5xl font-['Playfair_Display',serif] font-bold text-[#2E5339] dark:text-[#D4882E] mb-2"><LiveEditable collection="products_content" docId="madhucharichurna" field="name">Madhuchari Churna</LiveEditable></h1>
                        <p className="text-lg text-[#2E5339]/80 italic mb-6">Premium Ayurvedic Care</p>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold text-[#2E5339] dark:text-white">$36.00</span>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="flex flex-col items-center p-3 bg-[#2E5339]/5 rounded-xl text-center">
                                <span className="material-symbols-outlined text-[#D4882E] mb-1">eco</span>
                                <span className="text-xs font-bold uppercase tracking-tighter"><LiveEditable collection="products_content" docId="madhucharichurna" field="benefit1">Natural</LiveEditable></span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-[#2E5339]/5 rounded-xl text-center">
                                <span className="material-symbols-outlined text-[#D4882E] mb-1">shield</span>
                                <span className="text-xs font-bold uppercase tracking-tighter"><LiveEditable collection="products_content" docId="madhucharichurna" field="benefit2">Safe</LiveEditable></span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-[#2E5339]/5 rounded-xl text-center">
                                <span className="material-symbols-outlined text-[#D4882E] mb-1">health_and_safety</span>
                                <span className="text-xs font-bold uppercase tracking-tighter"><LiveEditable collection="products_content" docId="madhucharichurna" field="benefit3">Effective</LiveEditable></span>
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <p className="text-[#2E5339]/70 leading-relaxed"><LiveEditable collection="products_content" docId="madhucharichurna" field="description" multiline>A classic Ayurvedic preparation known for its comprehensive wellness benefits. Madhuchari Churna incorporates time-tested ingredients to support equilibrium.</LiveEditable></p>
                            <div className="flex items-center gap-4">
                                <button className="flex-1 bg-[#D4882E] hover:bg-[#D4882E]/90 text-white py-4 rounded-full font-bold shadow-lg shadow-[#D4882E]/20 transition-all transform hover:-translate-y-1">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MadhuchariChurna;
