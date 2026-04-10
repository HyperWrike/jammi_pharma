"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const BFFBalm: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FFFDF9] dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-[#E86A33]/20 bg-[#FFFDF9]/90 dark:bg-slate-900/90 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-[#E86A33] dark:text-[#F3B664]">
                        <span className="material-symbols-outlined text-3xl">spa</span>
                    </div>
                    <h2 className="text-[#41644A] dark:text-slate-100 text-xl font-bold tracking-tight">Jammi Pharmaceuticals</h2>
                </div>
                <nav className="hidden md:flex gap-8 items-center text-sm font-semibold uppercase tracking-wider text-[#41644A] dark:text-[#E86A33]">
                    <a className="hover:text-[#E86A33] transition-colors" href="#">Shop</a>
                    <a className="hover:text-[#E86A33] transition-colors" href="#">Heritage</a>
                    <a className="hover:text-[#E86A33] transition-colors" href="#">About Us</a>
                    <a className="hover:text-[#E86A33] transition-colors" href="#">Journal</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-[#E86A33]/10 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="relative p-2 rounded-full hover:bg-[#E86A33]/10 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                    {/* Product Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-[#F1F3EB] dark:bg-slate-800 rounded-3xl overflow-hidden flex items-center justify-center p-8 relative group">
                            <div className="absolute top-4 left-4 bg-[#E86A33] text-white text-xs font-bold uppercase py-1 px-3 rounded-full z-10 w-fit">Best Seller</div>
                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="BFF Best Foot Forward Balm Product Shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAToV4S62c90NfRk2w4yA_R-VqWw1oN1tZ64l-V4r11D4-hA476-qQYFv5W0-nOclpS88oO9m55xM2rXkOaG_c4iZg6z3i1K09B4E8Uu-xHwKjM21P4aL1i2ZkW-_y04V5-1v5zQf7gG-eXm57X56Kz-eS183O8hH4U2S8W42E6p-_nVY8gA21uVl9iE2V1sN1A8E2v_s7X6r0" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-[#E86A33]">
                                <img className="w-full h-full object-cover" data-alt="Cracked heel before and after texture hint" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ4yYJ332h50kXFj3n94XWbb6b8_8L13f5Bv6E62q3c4lR3i-D8u4x54z9-3O2fV4B9O1j6Q51475L3I028K1x2-Hq2Dk2G7P1Z5uT4x1N8Z4b3D9L7Mv_W1x2Z760-q6A8s74zM3S1D5e-P8g7cE0oD5y2r0V3uM-V9Zp8xU2O9A1V0aN9D0L4E3t-A9V5X6K9E2Lw0" />
                            </div>
                            <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                <img className="w-full h-full object-cover" data-alt="Natural beeswax and herbs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw8Z5-K3nQ3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0-V8rT9u7c1S2w3B0" />
                            </div>
                            <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                <img className="w-full h-full object-cover" data-alt="Model applying balm to heel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3V1z4G9P2xX3M5J4k6W9N1O8L2Z5V3A4I7T9U6C0D2-h9R1q7Y8w4F5o0-t1L5U8E2R3a9Y6G-4v7S1A0z9X4-j8N1D3V7E2V-6Q4P0O9-1c8P3W2aN1M5V9J4I7R0D2v6B8y1U6S5T2u3C0D2-4Y7A9G5O1q6B2L3C4y1P8Q9a2L0R7O6s4E9y2U0V4f8X0W5s7n1Q6p2M9" />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col h-full justify-between py-4">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-black text-[#41644A] dark:text-slate-100 mb-2"><LiveEditable collection="products_content" docId="bffbalm" field="name">BFF Balm</LiveEditable></h1>
                                <p className="text-xl text-[#E86A33] font-semibold italic">Best Foot Forward</p>
                            </div>

                            <div className="flex items-center gap-2 pb-4 border-b border-[#E86A33]/20">
                                <div className="flex text-[#F3B664]">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star_half</span>
                                </div>
                                <span className="text-sm font-medium text-slate-500">(214 Reviews)</span>
                            </div>

                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Keep your best foot forward all year round. A highly concentrated, Ayurvedic formulation designed specifically to heal cracked heels, soften rough skin, and provide deep hydration.
                            </p>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#F1F3EB] dark:bg-slate-800 p-2 rounded-lg text-[#41644A] dark:text-[#F3B664]">
                                        <span className="material-symbols-outlined">health_and_beauty</span>
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-wider">Heals Cracks</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#F1F3EB] dark:bg-slate-800 p-2 rounded-lg text-[#41644A] dark:text-[#F3B664]">
                                        <span className="material-symbols-outlined">water_drop</span>
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-wider">Deep Moisture</span>
                                </div>
                            </div>

                            <div className="space-y-2 pt-6">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Pricing</p>
                                <div className="flex items-end gap-4">
                                    <span className="text-4xl font-black text-[#E86A33] dark:text-[#F3B664]">₹699</span>
                                    <span className="text-xl text-slate-400 line-through mb-1">₹899</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-10 space-y-4">
                            <div className="flex gap-4">
                                <div className="flex items-center justify-between border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-2 w-32 py-1">
                                    <button className="p-2 hover:text-[#E86A33] transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                                    <span className="font-bold text-xl">1</span>
                                    <button className="p-2 hover:text-[#E86A33] transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                                </div>
                                <button className="flex-1 bg-[#41644A] hover:bg-[#263A2B] dark:bg-[#E86A33] dark:hover:bg-[#C55A2B] text-white font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                                    Add to Cart
                                    <span className="material-symbols-outlined outline-none">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features & Ingredients */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 lg:order-1 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#41644A] dark:text-slate-100 mb-4">Why it works wonders?</h2>
                            <p className="text-slate-600 dark:text-slate-400">Our feet endure the most stress but receive the least care. BFF Balm is crafted with potent Ayurvedic extracts that penetrate the tough skin of the heel to repair it from within.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="bg-[#F1F3EB] dark:bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center text-[#E86A33] flex-shrink-0">
                                    <span className="material-symbols-outlined">hive</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Natural Beeswax</h4>
                                    <p className="text-sm text-slate-500">Creates a protective barrier on the skin to lock in moisture and prevent further cracking.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="bg-[#F1F3EB] dark:bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center text-[#E86A33] flex-shrink-0">
                                    <span className="material-symbols-outlined">psychiatry</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Sarja Ras (Vateria Indica)</h4>
                                    <p className="text-sm text-slate-500">An ancient Ayurvedic resin known for its incredible wound-healing and skin-repairing properties.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="bg-[#F1F3EB] dark:bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center text-[#E86A33] flex-shrink-0">
                                    <span className="material-symbols-outlined">local_florist</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Nimba (Neem) Oil</h4>
                                    <p className="text-sm text-slate-500">Provides antibacterial and antifungal protection, keeping feet healthy and odor-free.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="aspect-square bg-gradient-to-tr from-[#E86A33]/20 to-[#41644A]/20 rounded-[3rem] p-8 -rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img className="w-full h-full object-cover rounded-3xl shadow-2xl" data-alt="Ingredients flatlay with beeswax and herbs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1g4Z6Q2i4W1x9I8f2T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0M4k7K3-y1T6B0" />
                        </div>
                    </div>
                </div>

                {/* Steps to use */}
                <div className="bg-[#41644A] text-white rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86A33] rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F3B664] rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

                    <h2 className="text-3xl lg:text-5xl font-black mb-12 relative z-10">The Bedtime Routine</h2>
                    <div className="grid md:grid-cols-3 gap-8 relative z-10 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full border-2 border-[#F3B664] text-[#F3B664] flex items-center justify-center text-2xl font-bold mb-4">1</div>
                            <h4 className="font-bold text-xl mb-2">Wash</h4>
                            <p className="text-white/70 text-sm">Cleanse your feet thoroughly with warm water and pat them dry.</p>
                        </div>
                        <div className="flex flex-col items-center relative">
                            <div className="hidden md:block absolute top-8 -left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F3B664]/50 to-transparent"></div>
                            <div className="w-16 h-16 rounded-full border-2 border-[#F3B664] text-[#F3B664] flex items-center justify-center text-2xl font-bold mb-4 bg-[#41644A]">2</div>
                            <h4 className="font-bold text-xl mb-2">Apply</h4>
                            <p className="text-white/70 text-sm">Take a small amount of BFF Balm and apply to cracked or rough areas.</p>
                        </div>
                        <div className="flex flex-col items-center relative">
                            <div className="hidden md:block absolute top-8 -left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F3B664]/50 to-transparent"></div>
                            <div className="w-16 h-16 rounded-full border-2 border-[#F3B664] bg-[#F3B664] text-[#41644A] flex items-center justify-center text-2xl font-bold mb-4">3</div>
                            <h4 className="font-bold text-xl mb-2">Protect</h4>
                            <p className="text-white/70 text-sm">Massage well. For best results, wear cotton socks overnight.</p>
                        </div>
                    </div>
                </div>

            </main>

            <footer className="bg-[#F1F3EB] dark:bg-slate-950 py-10 mt-10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[#41644A] font-bold tracking-widest uppercase mb-4 text-sm">Jammi Pharmaceuticals - Since 1900</p>
                    <p className="text-slate-500 max-w-md mx-auto text-xs">Authentic Ayurvedic formulations passed down through generations. Cruelty-free and rigorously tested.</p>
                </div>
            </footer>
        </div>
    );
};

export default BFFBalm;
