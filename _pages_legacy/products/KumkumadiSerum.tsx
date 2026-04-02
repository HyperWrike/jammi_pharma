"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const KumkumadiSerum: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 md:px-20 py-4 bg-white dark:bg-slate-900 sticky top-0 z-50">
                        <div className="flex items-center gap-4 text-secondary dark:text-primary">
                            <div className="size-6">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <h2 className="text-xl font-display font-bold leading-tight tracking-tight">Veda Aura</h2>
                        </div>
                        <nav className="hidden md:flex gap-8 text-sm font-medium">
                            <a className="hover:text-primary transition-colors" href="#">Shop</a>
                            <a className="hover:text-primary transition-colors" href="#">Legacy</a>
                            <a className="hover:text-primary transition-colors" href="#">Rituals</a>
                            <a className="hover:text-primary transition-colors" href="#">About</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-accent dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </button>
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-accent dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                            </button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700" data-alt="User profile avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAw1XKRlAkeo586M1-SrIMzUfVM2ofvU6bBVMEtkYLk2FDIrT07rQJc4Sywfh4j3BHyFyOEZI0IEm2tseJYb04_0LoSly0kaHQmSwObhyuU7gpPjJdjhgxHX1lGSZHJzkoRZWEYs-r-rwgztw_BNi7DxtQG5D_7v3fyDa5hKOcTx9h2ZVONYBiqWTh_qTDsWzd-QnG3IC-jp2d4GPgq9Y8xTctgyFGcd-eKmVx23MryJFYgAd7NMi32yEmh7DoSytLz43mLZ8wOARI")' }}></div>
                        </div>
                    </header>
                    <main className="flex-1">
                        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                <div className="space-y-6">
                                    <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-accent relative group">
                                        <img alt="Kumkumadi Serum" className="w-full h-full object-cover" data-alt="Amber dropper bottle of Kumkumadi Serum against a soft neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARLMgtAz2wXvh3U2ZI8jX-hY9Bj7QNtG-jx2Fx2F0Rrnvol_XZvtmDnamK9kusn6DZOd0E8cIya17KQMNa5Qwml331oQ86M370hDt4sbkccn_PLbae8dCFOmE_W9pbhZ9ijoG-mFqVbrZ6mQBdaBa7aq63Y4KFQTWnXcgTDDa9SzgobP4h9TPSC4j3xffqwlh57GtPld51s9z34iFQDsBU4mMsxHFrrN8HOpNqLW0iEO7VPLBAbfBCDq41p_T_wWgseKYpTmmNeWs" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6">
                                            <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">Ayurvedic Classic</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        <div className="size-24 rounded-lg bg-accent flex-shrink-0 border-2 border-primary overflow-hidden">
                                            <img className="w-full h-full object-cover" data-alt="Close up of Kumkumadi Serum bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPZpDwHm7oW1qiozGkJq4w7AsVoYzWgKP81oZCd74ea8DbEOb48ajjSUKjGBKQaKLFgVN0gJ1vQh_AalmRMkPRHl_PNEiNW6x-NtZfJFKyh4PpeSYm99Rv_Pk55tngf8rbO77DWL3yzlhJQcnf3aEJliO9LD-5LxB_V9G7kiFDrtLF9Dk4CQ63mT7GPn6QTPJQ1dOMkV4yHO00uXlPDzLNJO63Hc9DLP3Z90kTsYCgAVIDpeHJzSx6IflRceJMIuuXr8ZMnp9Ff68" />
                                        </div>
                                        <div className="size-24 rounded-lg bg-accent flex-shrink-0 border border-slate-200 overflow-hidden">
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center" data-alt="Texture of serum on skin">
                                                <span className="material-symbols-outlined text-slate-400">texture</span>
                                            </div>
                                        </div>
                                        <div className="size-24 rounded-lg bg-accent flex-shrink-0 border border-slate-200 overflow-hidden">
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center" data-alt="Ingredient illustration saffron">
                                                <span className="material-symbols-outlined text-slate-400">spa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <nav className="flex text-xs uppercase tracking-widest text-slate-500 font-bold gap-2">
                                        <a href="#">Home</a> <span>/</span> <a href="#">Skin Care</a> <span>/</span> <span className="text-primary">Serums</span>
                                    </nav>
                                    <div className="space-y-2">
                                        <h1 className="text-4xl md:text-5xl font-black text-secondary dark:text-primary leading-tight"><LiveEditable collection="products_content" docId="kumkumadiserum" field="name">Kumkumadi Serum</LiveEditable></h1>
                                        <p className="text-xl font-display italic text-slate-600 dark:text-slate-400">Radiant Beauty from Ancient Wisdom</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex text-primary">
                                            <span className="material-symbols-outlined fill-1">star</span>
                                            <span className="material-symbols-outlined fill-1">star</span>
                                            <span className="material-symbols-outlined fill-1">star</span>
                                            <span className="material-symbols-outlined fill-1">star</span>
                                            <span className="material-symbols-outlined">star_half</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-500">(128 Reviews)</span>
                                    </div>
                                    <div className="flex items-baseline gap-4">
                                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">₹899</p>
                                        <p className="text-lg text-slate-400 line-through">₹1,250</p>
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">28% OFF</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 py-4">
                                        <div className="flex h-10 items-center justify-center gap-2 rounded-full bg-secondary/5 border border-secondary/20 px-4">
                                            <span className="material-symbols-outlined text-secondary text-sm">wb_sunny</span>
                                            <p className="text-secondary text-sm font-bold">Brightening</p>
                                        </div>
                                        <div className="flex h-10 items-center justify-center gap-2 rounded-full bg-secondary/5 border border-secondary/20 px-4">
                                            <span className="material-symbols-outlined text-secondary text-sm">history_toggle_off</span>
                                            <p className="text-secondary text-sm font-bold">Anti-aging</p>
                                        </div>
                                        <div className="flex h-10 items-center justify-center gap-2 rounded-full bg-secondary/5 border border-secondary/20 px-4">
                                            <span className="material-symbols-outlined text-secondary text-sm">auto_fix_high</span>
                                            <p className="text-secondary text-sm font-bold">Reduces Blemishes</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                                        Our legendary Kumkumadi Serum is a 125-year legacy formulation, passed down through generations. Crafted with pure Kashmiri Saffron and 24 essential herbs, it works overnight to illuminate your complexion and restore youthful vitality.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">shopping_cart</span>
                                            Add to Cart
                                        </button>
                                        <button className="flex-1 border-2 border-secondary text-secondary font-bold py-4 rounded-xl hover:bg-secondary hover:text-white transition-all">
                                            Buy Now
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-primary text-3xl mb-1">verified</span>
                                            <p className="text-[10px] font-bold uppercase tracking-widest">100% Organic</p>
                                        </div>
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-primary text-3xl mb-1">cruelty_free</span>
                                            <p className="text-[10px] font-bold uppercase tracking-widest">Cruelty Free</p>
                                        </div>
                                        <div className="text-center">
                                            <span className="material-symbols-outlined text-primary text-3xl mb-1">science</span>
                                            <p className="text-[10px] font-bold uppercase tracking-widest">Derm-Tested</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="bg-secondary text-white py-16 mt-12">
                            <div className="max-w-7xl mx-auto px-6">
                                <h2 className="text-3xl md:text-4xl font-display text-center mb-12">Sacred Ingredients</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                    <div className="text-center group">
                                        <div className="size-24 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center border-2 border-primary/30 group-hover:bg-primary/40 transition-all">
                                            <span className="material-symbols-outlined text-4xl text-primary">psychiatry</span>
                                        </div>
                                        <h3 className="text-xl font-display mb-3">Kashmiri Saffron</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed font-body">The world's finest saffron, known for its incredible skin-brightening and antioxidant properties.</p>
                                    </div>
                                    <div className="text-center group">
                                        <div className="size-24 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center border-2 border-primary/30 group-hover:bg-primary/40 transition-all">
                                            <span className="material-symbols-outlined text-4xl text-primary">water_drop</span>
                                        </div>
                                        <h3 className="text-xl font-display mb-3">Pure Goat Milk</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed font-body">Rich in Alpha Hydroxy Acids (AHAs) that gently exfoliate and deeply hydrate the skin.</p>
                                    </div>
                                    <div className="text-center group">
                                        <div className="size-24 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center border-2 border-primary/30 group-hover:bg-primary/40 transition-all">
                                            <span className="material-symbols-outlined text-4xl text-primary">forest</span>
                                        </div>
                                        <h3 className="text-xl font-display mb-3">Sandalwood</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed font-body">Reduces inflammation, cools the skin, and fades scars for an even-toned complexion.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-16 bg-accent/50 dark:bg-slate-900/50">
                            <div className="max-w-4xl mx-auto px-6">
                                <h2 className="text-3xl font-display text-center mb-12 text-secondary dark:text-primary">How to Use</h2>
                                <div className="space-y-8">
                                    <div className="flex gap-6 items-start">
                                        <div className="size-10 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center font-bold">1</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Cleanse</h4>
                                            <p className="text-slate-600 dark:text-slate-400">Wash your face with a mild Ayurvedic cleanser and pat dry.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <div className="size-10 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center font-bold">2</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Dampen</h4>
                                            <p className="text-slate-600 dark:text-slate-400">Lightly mist your face with rose water to keep it damp for better absorption.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <div className="size-10 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center font-bold">3</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Apply</h4>
                                            <p className="text-slate-600 dark:text-slate-400">Take 2-3 drops of serum and massage gently in upward circular motions.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <div className="size-10 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center font-bold">4</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Absorb</h4>
                                            <p className="text-slate-600 dark:text-slate-400">Leave it on overnight for maximum benefits. Use consistently for 21 days.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-16 max-w-7xl mx-auto px-6">
                            <div className="flex justify-between items-end mb-10">
                                <h2 className="text-3xl font-display text-secondary dark:text-primary">Complete the Ritual</h2>
                                <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">View All <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="group cursor-pointer">
                                    <div className="aspect-square bg-accent rounded-xl mb-4 overflow-hidden">
                                        <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" data-alt="Niacinamide Face Wash bottle"></div>
                                    </div>
                                    <h4 className="font-bold text-secondary dark:text-primary">Saffron Face Wash</h4>
                                    <p className="text-sm text-slate-500">Deep Cleansing</p>
                                    <p className="font-bold mt-1">₹450</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="aspect-square bg-accent rounded-xl mb-4 overflow-hidden">
                                        <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" data-alt="Rose Water Toner spray"></div>
                                    </div>
                                    <h4 className="font-bold text-secondary dark:text-primary">Pure Rose Water</h4>
                                    <p className="text-sm text-slate-500">Hydrating Mist</p>
                                    <p className="font-bold mt-1">₹299</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="aspect-square bg-accent rounded-xl mb-4 overflow-hidden">
                                        <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" data-alt="Sandalwood Night Cream jar"></div>
                                    </div>
                                    <h4 className="font-bold text-secondary dark:text-primary">Night Recovery Cream</h4>
                                    <p className="text-sm text-slate-500">Intensive Care</p>
                                    <p className="font-bold mt-1">₹650</p>
                                </div>
                                <div className="group cursor-pointer">
                                    <div className="aspect-square bg-accent rounded-xl mb-4 overflow-hidden">
                                        <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" data-alt="Sunscreen Gel tube"></div>
                                    </div>
                                    <h4 className="font-bold text-secondary dark:text-primary">Ayurvedic Sunscreen</h4>
                                    <p className="text-sm text-slate-500">SPF 50 PA+++</p>
                                    <p className="font-bold mt-1">₹550</p>
                                </div>
                            </div>
                        </section>
                        <section className="py-16 bg-slate-50 dark:bg-slate-900">
                            <div className="max-w-3xl mx-auto px-6">
                                <h2 className="text-3xl font-display text-center mb-10 text-secondary dark:text-primary">Common Inquiries</h2>
                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <button className="w-full flex justify-between items-center text-left">
                                            <span className="font-bold text-secondary dark:text-primary">Is it suitable for oily skin?</span>
                                            <span className="material-symbols-outlined text-slate-400">add</span>
                                        </button>
                                        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                                            Yes, our Kumkumadi Serum is a light, oil-based serum that mimics the skin's natural sebum, making it suitable for all skin types, including oily and acne-prone skin.
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <button className="w-full flex justify-between items-center text-left">
                                            <span className="font-bold text-secondary dark:text-primary">How long before I see results?</span>
                                            <span className="material-symbols-outlined text-slate-400">add</span>
                                        </button>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <button className="w-full flex justify-between items-center text-left">
                                            <span className="font-bold text-secondary dark:text-primary">Can it be used during the day?</span>
                                            <span className="material-symbols-outlined text-slate-400">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <footer className="bg-secondary text-white py-12">
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="material-symbols-outlined text-2xl">eco</span>
                                    <h2 className="text-xl font-display font-bold">Veda Aura</h2>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed font-body">Crafting authentic Ayurvedic experiences for the modern world since 1899.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-6 text-primary uppercase tracking-widest text-xs">Explore</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li><a className="hover:text-white" href="#">Shop All</a></li>
                                    <li><a className="hover:text-white" href="#">New Arrivals</a></li>
                                    <li><a className="hover:text-white" href="#">Gift Sets</a></li>
                                    <li><a className="hover:text-white" href="#">Subscription</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-6 text-primary uppercase tracking-widest text-xs">Support</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li><a className="hover:text-white" href="#">Shipping Policy</a></li>
                                    <li><a className="hover:text-white" href="#">Returns &amp; Exchanges</a></li>
                                    <li><a className="hover:text-white" href="#">Track Order</a></li>
                                    <li><a className="hover:text-white" href="#">Contact Us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-6 text-primary uppercase tracking-widest text-xs">Connect</h4>
                                <div className="flex gap-4 mb-6">
                                    <a className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                        <span className="material-symbols-outlined text-lg">share</span>
                                    </a>
                                    <a className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                                        <span className="material-symbols-outlined text-lg">mail</span>
                                    </a>
                                </div>
                                <p className="text-xs text-slate-500">Subscribe for Ayurvedic wisdom and exclusive offers.</p>
                            </div>
                        </div>
                        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
                            © 2024 Veda Aura Skin &amp; Hair Care. All rights reserved.
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default KumkumadiSerum;
