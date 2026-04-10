"use client";
import React from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const KeshProOil = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-body">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-3xl">eco</span>
                        <h1 className="text-2xl font-black tracking-tight font-display text-secondary dark:text-primary"><LiveEditable collection="products_content" docId="keshprooil" field="name">Keshpro</LiveEditable></h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a className="hover:text-primary transition-colors" href="#">Shop</a>
                        <a className="hover:text-primary transition-colors" href="#">Heritage</a>
                        <a className="hover:text-primary transition-colors" href="#">Ingredients</a>
                        <a className="hover:text-primary transition-colors" href="#">Journal</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-secondary/5 rounded-full"><span className="material-symbols-outlined">search</span></button>
                        <button className="p-2 hover:bg-secondary/5 rounded-full relative">
                            <span className="material-symbols-outlined">shopping_bag</span>
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">2</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-xl bg-secondary/5">
                            <img className="h-full w-full object-cover" data-alt="Premium Keshpro hair oil glass bottle with herbal elements" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClGilohi9NAYzXQ-JYVXPJOZIyqFsh9Sjr_lQXuJk-J0WqAJHqU5_tuxGxuS4KFXolYbTdFBnDlz9c0yvlGx0reovInoBaewUFmPurK5WFyxU1jMGtwpdRrW5rQup7s3Ch7SYWmaxfgaouuWeqiBLB8cyfRQ3ZGwEdHCIFwi5wCxut_rhA4GQrND3azNCjmZ2MOH8YJnAWSu2bv4xNX8sfXKpSN-Goy0_SRSkr-2lZmwR6POi7vL_jaut6cnB8N_FqmA70U4SKJMc" alt="Keshpro oil" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-lg bg-secondary/10 border-2 border-primary overflow-hidden">
                                <img className="h-full w-full object-cover opacity-80" data-alt="Close up of herbal hair oil texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuQLJUgYK5edwHC0oHIS2uoroe6a7wc87Jx4zFdJz_Ujv2D7l8OD4b4TKRWNOZjbVwDnAj9j55bLJr3Koj3h28AXfh0gt1KyQ5XmugGa5MMi6scJhf5FBC39PJZqRpxTWecSuPxqIgSysdGPPtsXc_sI8eRBS3gnFAgLGeD0hfZGCPcExpiRzj76W-rxH2aNuwBPtSJnFeDjmJLHpkujEyhqQxaFAILnLGStFQJUQ5SIv09xK-CNr07fMlKKrNTESImbdlBtmyFY8" alt="Texture" />
                            </div>
                            <div className="aspect-square rounded-lg bg-secondary/5"></div>
                            <div className="aspect-square rounded-lg bg-secondary/5"></div>
                            <div className="aspect-square rounded-lg bg-secondary/5"></div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 mb-4">
                            <ol className="flex items-center space-x-2">
                                <li><a className="hover:text-secondary" href="#">Home</a></li>
                                <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
                                <li><a className="hover:text-secondary" href="#">Skin & Hair Care</a></li>
                            </ol>
                        </nav>
                        <h2 className="text-4xl font-black font-display leading-tight tracking-tight text-secondary dark:text-primary lg:text-5xl">Keshpro Oil</h2>
                        <p className="mt-2 text-xl italic text-slate-600 dark:text-slate-400">Stronger Roots, Natural Shine</p>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex text-primary">
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star_half</span>
                            </div>
                            <span className="text-sm font-medium text-secondary dark:text-slate-300">4.8 (128 Reviews)</span>
                        </div>

                        <div className="mt-6 flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-secondary dark:text-slate-100">$34.00</span>
                            <span className="text-lg text-slate-400 line-through">$42.00</span>
                            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">SAVE 20%</span>
                        </div>

                        <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                            A premium Ayurvedic blend crafted with ancient heritage and modern precision. Keshpro Oil penetrates deep into the scalp to revitalize hair follicles, ensuring lasting strength and a radiant natural luster.
                        </p>

                        <div className="mt-8 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <button className="flex h-14 flex-1 items-center justify-center rounded-xl bg-secondary text-white font-bold hover:bg-secondary/90 transition-all">
                                    Add to Cart
                                </button>
                                <button className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-secondary/20 hover:border-primary transition-all">
                                    <span className="material-symbols-outlined">favorite</span>
                                </button>
                            </div>
                            <button className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all">
                                Buy Now
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-secondary/10 pt-8">
                            <div className="flex flex-col items-center text-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">100% Organic</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">cruelty_free</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Cruelty Free</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Free Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Benefits Section */}
                <section className="mt-20">
                    <h3 className="text-center font-display text-3xl font-bold text-secondary dark:text-slate-100 mb-12">Transformative Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-secondary/5 hover:shadow-md transition-all text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-4xl">shield</span>
                            </div>
                            <h4 className="font-display text-xl font-bold mb-3 text-secondary dark:text-primary">Prevents Hair Fall</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Strengthens the hair shaft from the root, significantly reducing breakage and daily shedding.</p>
                        </div>
                        <div className="group rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-secondary/5 hover:shadow-md transition-all text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                <span className="material-symbols-outlined text-4xl">spa</span>
                            </div>
                            <h4 className="font-display text-xl font-bold mb-3 text-secondary dark:text-primary">Scalp Nourishment</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Deeply conditions the scalp, relieving dryness and promoting a healthy environment for growth.</p>
                        </div>
                        <div className="group rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm border border-secondary/5 hover:shadow-md transition-all text-center">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
                            </div>
                            <h4 className="font-display text-xl font-bold mb-3 text-secondary dark:text-primary">Natural Luster</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Restores the natural shine and vibrant texture of your hair without leaving it greasy or heavy.</p>
                        </div>
                    </div>
                </section>

                {/* Tabs for Details */}
                <section className="mt-24">
                    <div className="border-b border-secondary/10">
                        <div className="flex gap-8 overflow-x-auto pb-px">
                            <button className="border-b-2 border-primary pb-4 text-sm font-bold tracking-wider text-secondary dark:text-slate-100">DESCRIPTION</button>
                            <button className="border-b-2 border-transparent pb-4 text-sm font-bold tracking-wider text-slate-400 hover:text-secondary">INGREDIENTS</button>
                            <button className="border-b-2 border-transparent pb-4 text-sm font-bold tracking-wider text-slate-400 hover:text-secondary">HOW TO USE</button>
                            <button className="border-b-2 border-transparent pb-4 text-sm font-bold tracking-wider text-slate-400 hover:text-secondary">REVIEWS</button>
                        </div>
                    </div>
                    <div className="py-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div className="space-y-6">
                                <h4 className="font-display text-2xl font-bold text-secondary dark:text-slate-100">The Ayurvedic Heritage</h4>
                                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                                    Our Keshpro Oil is a tribute to centuries of Ayurvedic wisdom. We source our herbs from the foothills of the Himalayas, ensuring that every drop contains the purest botanical extracts. The traditional 'Kshir Pak Vidhi' process infuses these herbs into organic oils over 48 hours of slow heating.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                        <span className="text-sm font-medium">Free from Mineral Oils & Parabens</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                        <span className="text-sm font-medium">Dermatologically Tested</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                        <span className="text-sm font-medium">Suitable for All Hair Types</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-primary/5 rounded-2xl p-8 dark:bg-slate-800/50">
                                <h4 className="font-display text-xl font-bold text-secondary dark:text-slate-100 mb-6">Key Ingredients</h4>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary shadow-sm font-bold">B</div>
                                        <div>
                                            <p className="text-sm font-bold text-secondary dark:text-slate-200">Bhringraj</p>
                                            <p className="text-[10px] text-slate-500 uppercase">Growth King</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary shadow-sm font-bold">A</div>
                                        <div>
                                            <p className="text-sm font-bold text-secondary dark:text-slate-200">Amla</p>
                                            <p className="text-[10px] text-slate-500 uppercase">Vitamin C Boost</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary shadow-sm font-bold">C</div>
                                        <div>
                                            <p className="text-sm font-bold text-secondary dark:text-slate-200">Coconut Oil</p>
                                            <p className="text-[10px] text-slate-500 uppercase">Deep Moisture</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary shadow-sm font-bold">H</div>
                                        <div>
                                            <p className="text-sm font-bold text-secondary dark:text-slate-200">Hibiscus</p>
                                            <p className="text-[10px] text-slate-500 uppercase">Conditioning</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section className="mt-12 rounded-2xl bg-secondary dark:bg-slate-800 py-12 px-8 text-white">
                    <div className="mx-auto max-w-4xl">
                        <h3 className="font-display text-3xl font-bold mb-8 text-center text-white">The Ritual of Care</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="space-y-4">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-xl font-bold">1</div>
                                <h4 className="font-display font-bold">Apply</h4>
                                <p className="text-xs text-white/70 leading-relaxed">Dispense a small amount onto your palms and gently rub together to warm the oil.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-xl font-bold">2</div>
                                <h4 className="font-display font-bold">Massage</h4>
                                <p className="text-xs text-white/70 leading-relaxed">Massage into the scalp using circular motions for 5-10 minutes to improve circulation.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-xl font-bold">3</div>
                                <h4 className="font-display font-bold">Rest</h4>
                                <p className="text-xs text-white/70 leading-relaxed">Leave on for at least 1 hour or overnight for deep nourishment before washing.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-display text-3xl font-bold text-secondary dark:text-slate-100">Complete Your Routine</h3>
                        <a className="text-sm font-bold text-primary underline" href="#">View All</a>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Related Card 1 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-secondary/5 mb-4 overflow-hidden">
                                <div className="h-full w-full bg-slate-200" data-alt="Herbal shampoo bottle" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcNWbswCPUX0bEtKM9Dagzljjk8QS-mK2HHsRFCyMcnCmQLhLrHpR75qkC3JO88ODYMiYTiwLBiSAydg4GA4nL6VanlWsUbhwFyVGGXDkwJOuAOIeMVF8TutYjNRHxcKinqk0l4hZn7Whwf4oZLPrhQDd8u4P0AxhQvqLABQXmiO5kOZrI0wXrOAXKLDjqToTGmPC_RXB__-1bX8CNv4vP8zB_hzEMv8SzB1cRVepH2amp4m3jFKdCRZZL_JuqNu7EKTH-_Yud0yE')", backgroundSize: "cover" }}></div>
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200 text-sm">Keshpro Mild Cleanser</h4>
                            <p className="text-xs text-slate-500">$22.00</p>
                        </div>
                        {/* Related Card 2 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-secondary/5 mb-4 overflow-hidden">
                                <div className="h-full w-full bg-slate-200" data-alt="Wood scalp massage brush" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOPObSIQ3UPir62iVmYFLl7VIEMT769_TCtIbDjLYaMLeYnVApBaBrDRsP9cIzajKOyogS7tEzxQNcSlMh4fInRPxEwvts6tZ5r8rWskMTI7v7K5o6WkFYPyjVowD3IkhK-lLdR-vd3O2q79UAZC3QwVu4Nvv53O8LhrifFXgW6HJuN_Mm4s8Dy_XovKuUmurunzBQlPIluIFtxMcTE9gYJm4W8cOznkCJ1uiOctosIl7GJKNUBrobJypWn9K9R1cTapckY4FIsr0')", backgroundSize: "cover" }}></div>
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200 text-sm">Neem Wood Scalp Brush</h4>
                            <p className="text-xs text-slate-500">$18.00</p>
                        </div>
                        {/* Related Card 3 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-secondary/5 mb-4 overflow-hidden">
                                <div className="h-full w-full bg-slate-200" data-alt="Intensive repair hair mask jar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1m_IkbNtOddgtx5dHCvXscuBtqcIzYfYaQSwIxAvjw17aggbjasWESuJfo4Ngyecu2vx9v3h7Nj5iWVDW2q7PgUmICxJunQCZJBIm5L9PE81b3dsR5oeIrj3uefp-jOQ98P2WCxQzsfy6TvjquhuqzKgIuHLGYtIbA78Xgy-Oid_KfH5MppE0QwI5s06h5d76piai14x2MzNyyomnyNLrdi2wKCkkMoDxGfBFp4FlQ03pdFbfsTY5y2Ujo-vyU2mPeH62LK5VxmY')", backgroundSize: "cover" }}></div>
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200 text-sm">Intensive Repair Mask</h4>
                            <p className="text-xs text-slate-500">$28.00</p>
                        </div>
                        {/* Related Card 4 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-secondary/5 mb-4 overflow-hidden">
                                <div className="h-full w-full bg-slate-200" data-alt="Luxury silk hair wrap" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYA5nxUgY8n_UF8mPG-HhsSq1vYU8XNhTh06RWRCnADDfStC3UZI8Js1AJoiSE-vMMhsdUNtB4SJjipBEH_Cjw3I8oKF9hJHftUn1RexKxpd74q76mjYSd7T-jaLDADrALevb5GcM3N_IUE6Zvf6CmahMwP-bW1yP_aA0L40l8jz_lG3gybycPBmOUP7yK4ZADH9fTtyRk8RQA585FCNaRLqyjRBtisZry1PwwraXrM7HvTy6hBlerWYjeUb0ZcwQNqRK_Lo26pCY')", backgroundSize: "cover" }}></div>
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200 text-sm">Pure Silk Night Wrap</h4>
                            <p className="text-xs text-slate-500">$45.00</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mt-24 border-t border-secondary/10 pt-16 mb-20">
                    <div className="mx-auto max-w-3xl">
                        <h3 className="font-display text-3xl font-bold text-center text-secondary dark:text-slate-100 mb-12">Common Questions</h3>
                        <div className="space-y-4">
                            <div className="rounded-xl border border-secondary/10 p-6 bg-white dark:bg-slate-800">
                                <button className="flex w-full items-center justify-between text-left">
                                    <span className="font-display font-bold text-secondary dark:text-primary">How often should I use Keshpro Oil?</span>
                                    <span className="material-symbols-outlined text-secondary dark:text-slate-300">expand_more</span>
                                </button>
                                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">For best results, we recommend using it 2-3 times a week. If you have extremely dry hair, you can use it every other day.</p>
                            </div>
                            <div className="rounded-xl border border-secondary/10 p-6">
                                <button className="flex w-full items-center justify-between text-left">
                                    <span className="font-display font-bold text-secondary dark:text-primary">Is it suitable for colored hair?</span>
                                    <span className="material-symbols-outlined text-secondary dark:text-slate-300">expand_more</span>
                                </button>
                            </div>
                            <div className="rounded-xl border border-secondary/10 p-6">
                                <button className="flex w-full items-center justify-between text-left">
                                    <span className="font-display font-bold text-secondary dark:text-primary">Does it have a strong herbal scent?</span>
                                    <span className="material-symbols-outlined text-secondary dark:text-slate-300">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-secondary dark:bg-slate-900 text-white/80 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                                <h1 className="font-display text-2xl font-black">Keshpro</h1>
                            </div>
                            <p className="text-sm">Ancient wisdom for modern beauty. Our products are sustainably sourced and ethically made.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Explore</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a className="hover:text-primary" href="#">All Products</a></li>
                                <li><a className="hover:text-primary" href="#">Our Story</a></li>
                                <li><a className="hover:text-primary" href="#">Ayurvedic Quiz</a></li>
                                <li><a className="hover:text-primary" href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a className="hover:text-primary" href="#">Contact Us</a></li>
                                <li><a className="hover:text-primary" href="#">Shipping & Returns</a></li>
                                <li><a className="hover:text-primary" href="#">FAQ</a></li>
                                <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Newsletter</h4>
                            <p className="text-sm mb-4">Subscribe for Ayurvedic tips and exclusive offers.</p>
                            <div className="flex">
                                <input className="w-full rounded-l-lg border-none bg-white/10 px-4 py-2 text-sm focus:ring-1 focus:ring-primary text-white placeholder-white/50" placeholder="Email address" type="email" />
                                <button className="bg-primary px-4 py-2 rounded-r-lg font-bold hover:bg-primary/90 text-white">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs">
                        © 2024 Keshpro Ayurvedic Essentials. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default KeshProOil;
