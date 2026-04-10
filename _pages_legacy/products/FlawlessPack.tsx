"use client";
import React from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const FlawlessPack = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 font-body">
            {/* Navigation */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-secondary/10 dark:border-primary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary dark:text-primary text-3xl">spa</span>
                            <span className="text-2xl font-serif font-bold tracking-tight text-secondary dark:text-primary">Flawless</span>
                        </div>
                        <nav className="hidden md:flex space-x-8 text-sm font-medium">
                            <a className="hover:text-primary transition-colors" href="#">Shop All</a>
                            <a className="hover:text-primary transition-colors" href="#">Skincare</a>
                            <a className="hover:text-primary transition-colors" href="#">Haircare</a>
                            <a className="hover:text-primary transition-colors" href="#">Our Story</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-secondary/5 rounded-full transition-colors">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                            <button className="p-2 hover:bg-secondary/5 rounded-full transition-colors relative">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-background-light"></span>
                            </button>
                            <button className="md:hidden p-2">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* Product Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-xl overflow-hidden bg-secondary/5">
                                <img alt="Luxury skin care packaging with botanical elements" className="w-full h-full object-cover" data-alt="Premium skin and hair care product packaging on a minimalist surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4h8YuX-E8GKWiwb7fjmhnNfJADN0IkF-SOOlWQ5SkdgGNMCOOV5GRvDx2z0M3fb_Zf3vW2r2xxZrRAqLpCB-tmaQwX_WoYXRllutfFX-xOz69_qSkx4tE3H1ZswkCXIkisDnavNx7M8SmlBOrGNsOlzcuvkiY7JWYDnhaCdzUFGZroAQszT7c7lsKfvZlBZff1Limd_-sI_tYtfF6DTEXRNvSydRvUDpViNB-4-VqXZSkbvDrMfnWS95U0jgSXP3eev2POiC0YTU" />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary">
                                    <img alt="Product close up" className="w-full h-full object-cover" data-alt="Close up of organic skin care cream texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjqeCa9UlQNFhCxOdx9nk93aAlZ8OaFBieHqDd61rVtggFT4FHmBUzMmYetUPTmxmscVffwmg4118GslWdI8Wr-X2bZJDUQD_bnId3X25mz-sEF_552LGoRxKHb1VQbUpMlx1ymLhdOQS0gcjfWD6TAz5hFk3cRH9AikRjt6nKXtUBGhjBqXz9432yEZA1i7WV1XWwionaCxB6xs8SM108pB-OV8s9mmnEWu6Q9dpuJh03VkdUA8hYvUcPD-HbiDCtdKK-u5z4J2E" />
                                </div>
                                <div className="aspect-square rounded-lg overflow-hidden bg-secondary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary/40 text-3xl">image</span>
                                </div>
                                <div className="aspect-square rounded-lg overflow-hidden bg-secondary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary/40 text-3xl">image</span>
                                </div>
                                <div className="aspect-square rounded-lg overflow-hidden bg-secondary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary/40 text-3xl">play_circle</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 mb-4">
                                <ol className="flex items-center space-x-2">
                                    <li><a className="hover:text-secondary" href="#">Home</a></li>
                                    <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
                                    <li><a className="hover:text-secondary" href="#">Skin & Hair Care</a></li>
                                </ol>
                            </nav>
                            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-secondary dark:text-primary mb-2"><LiveEditable collection="products_content" docId="flawlesspack" field="name">Revitalizing & Firming Pack</LiveEditable></h1>
                            <p className="text-xl italic text-slate-600 dark:text-slate-400 mb-6 font-serif">"Revitalize and Firm"</p>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex text-primary">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star_half</span>
                                </div>
                                <span className="text-sm font-medium text-slate-500 underline">128 Verified Reviews</span>
                            </div>

                            <div className="text-3xl font-serif text-secondary dark:text-white mb-8">$84.00</div>

                            <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                                A potent weekly ritual designed to restore skin elasticity and natural radiance. This dual-action pack combines ancient Ayurvedic wisdom with modern dermatological science to detoxify pores and firm the facial contours.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                        <span className="material-symbols-outlined">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary dark:text-primary">Youthful Glow</h4>
                                        <p className="text-sm text-slate-500">Restores luminosity instantly</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                        <span className="material-symbols-outlined">eco</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary dark:text-primary">Natural Ingredients</h4>
                                        <p className="text-sm text-slate-500">100% Organic & Ethically Sourced</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-secondary text-white py-4 rounded-xl font-bold hover:bg-secondary/90 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Ritual
                                </button>
                                <button className="px-6 py-4 border-2 border-secondary/20 rounded-xl hover:bg-secondary/5 transition-all">
                                    <span className="material-symbols-outlined">favorite</span>
                                </button>
                            </div>

                            <div className="mt-8 flex gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
                                <div className="text-center flex-1">
                                    <span className="material-symbols-outlined text-secondary dark:text-slate-100">cruelty_free</span>
                                    <p className="text-[10px] uppercase tracking-widest mt-1">Cruelty Free</p>
                                </div>
                                <div className="text-center flex-1">
                                    <span className="material-symbols-outlined text-secondary dark:text-slate-100">eco</span>
                                    <p className="text-[10px] uppercase tracking-widest mt-1">Vegan</p>
                                </div>
                                <div className="text-center flex-1">
                                    <span className="material-symbols-outlined text-secondary dark:text-slate-100">recycling</span>
                                    <p className="text-[10px] uppercase tracking-widest mt-1">Sustainable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Benefits Grid */}
                <section className="bg-secondary/5 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-serif text-center mb-16 text-secondary dark:text-primary underline underline-offset-8 decoration-primary/30">Key Benefits</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">dry_cleaning</span>
                                <h3 className="text-xl font-serif font-bold mb-3 text-secondary dark:text-slate-100">Skin Firming</h3>
                                <p className="text-slate-600 dark:text-slate-400">Promotes collagen production and tightens the appearance of sagging skin for a lifted look.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center border-t-4 border-primary">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">cleaning_services</span>
                                <h3 className="text-xl font-serif font-bold mb-3 text-secondary dark:text-slate-100">Deep Cleansing</h3>
                                <p className="text-slate-600 dark:text-slate-400">Draws out impurities and pollutants from deep within the pores without stripping moisture.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4">auto_awesome</span>
                                <h3 className="text-xl font-serif font-bold mb-3 text-secondary dark:text-slate-100">Youthful Glow</h3>
                                <p className="text-slate-600 dark:text-slate-400">Brightens complexion and evens skin tone using traditional Ayurvedic extracts.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Ingredients */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-secondary dark:text-primary mb-6">Masterfully Crafted Ingredients</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">We source only the most potent, ethically harvested botanicals to ensure therapeutic efficacy in every application.</p>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif italic text-xl">M</div>
                                        <div>
                                            <h4 className="font-bold text-secondary dark:text-slate-100 mb-1">Manjistha</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Known as the 'Rubia Cordifolia', it purifies blood and provides a vibrant, healthy complexion.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif italic text-xl">T</div>
                                        <div>
                                            <h4 className="font-bold text-secondary dark:text-slate-100 mb-1">Turmeric (Curcumin)</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">A powerful anti-inflammatory and antioxidant that heals and protects the skin barrier.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif italic text-xl">C</div>
                                        <div>
                                            <h4 className="font-bold text-secondary dark:text-slate-100 mb-1">Therapeutic Clay</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">Fine-milled minerals that gently exfoliate and detoxify for a smooth, refined texture.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform"></div>
                                <div className="relative aspect-[4/5] bg-secondary rounded-3xl overflow-hidden shadow-xl">
                                    <img alt="Ingredients closeup" className="w-full h-full object-cover mix-blend-overlay opacity-60" data-alt="Close-up of raw botanicals like turmeric and clay on a textured surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7tAZa-gtKLYCcejl_ny9yvdC692L4J1aVQMUWPuggXQPP_tHeahj-bungVx_mxpvRnerhjec5w_mzka6O0j_GzGDTAWfAELUBRK3HnqnguC6jkEBkq5Rqte1QG7Ff0tBDwIwEdbV6humY4U-EHAfJuz3NF5FJCbY2qqSQLNw0gUls5urYZ0Tx6AN-Kov68NK7_wyJ5mkC3G9mRzc7eR1QkqNZlhCOfynzkxS3Vh8R53BBJvOFGWK1JriyPjW-W-g2pj7trgnx0x4" />
                                    <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                                        <p className="text-2xl font-serif italic mb-2">"Pure nature, expertly balanced for your skin's health."</p>
                                        <p className="text-sm uppercase tracking-widest opacity-80">— Flawless Philosophy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use */}
                <section className="bg-secondary text-background-light py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-serif font-bold mb-4 text-white">Your Weekly Ritual</h2>
                        <p className="text-background-light/70 mb-12">Maximize results with this intentional application process.</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="relative">
                                <div className="text-5xl font-serif opacity-20 mb-4 text-white">01</div>
                                <h4 className="font-bold mb-2 text-white">Prepare</h4>
                                <p className="text-sm text-background-light/60">Cleanse your skin thoroughly and pat dry. Take a small amount of the pack.</p>
                            </div>
                            <div className="relative">
                                <div className="text-5xl font-serif opacity-20 mb-4 text-white">02</div>
                                <h4 className="font-bold mb-2 text-white">Apply</h4>
                                <p className="text-sm text-background-light/60">Spread an even layer over face and neck, avoiding the eye area. Relax for 15 minutes.</p>
                            </div>
                            <div className="relative">
                                <div className="text-5xl font-serif opacity-20 mb-4 text-white">03</div>
                                <h4 className="font-bold mb-2 text-white">Rinse</h4>
                                <p className="text-sm text-background-light/60">Gently massage with lukewarm water to exfoliate, then rinse off completely.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-background-light dark:bg-background-dark">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-serif font-bold text-center text-secondary dark:text-slate-100 mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm" open>
                                <summary className="list-none flex justify-between items-center p-6 cursor-pointer font-bold text-secondary dark:text-slate-100">
                                    Is this pack suitable for sensitive skin?
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-slate-400">expand_more</span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-700">
                                    Yes, our formula is balanced with soothing botanicals like aloe vera and turmeric, specifically designed to be gentle even on sensitive skin types.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                <summary className="list-none flex justify-between items-center p-6 cursor-pointer font-bold text-secondary dark:text-slate-100">
                                    How often should I use the Revitalizing Pack?
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-slate-400">expand_more</span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-700">
                                    We recommend using it once or twice a week as a treatment ritual for optimal firming results.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                <summary className="list-none flex justify-between items-center p-6 cursor-pointer font-bold text-secondary dark:text-slate-100">
                                    Can this be used on hair?
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform text-slate-400">expand_more</span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-700">
                                    Absolutely! While primarily a face pack, the ingredients are excellent for scalp health. Apply to roots 20 mins before washing for a detoxified scalp.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>

                {/* Reviews / Social Proof */}
                <section className="py-20 border-t border-secondary/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-secondary dark:text-slate-100">The Flawless Experience</h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="text-4xl font-serif font-bold text-primary">4.8</div>
                                    <div className="flex text-primary">
                                        <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                        <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                        <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                        <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                        <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star_half</span>
                                    </div>
                                    <span className="text-slate-500">Based on 128 reviews</span>
                                </div>
                            </div>
                            <button className="px-8 py-3 bg-secondary text-white rounded-full font-bold hover:bg-secondary/90 transition-all">Write a Review</button>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5">
                                <div className="flex text-primary mb-4">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                </div>
                                <p className="italic text-slate-700 dark:text-slate-300 mb-6">"My skin hasn't looked this radiant in years. The firming effect is noticeable after just three uses. Truly therapeutic."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">EH</div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Eleanor H.</h5>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5">
                                <div className="flex text-primary mb-4">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                </div>
                                <p className="italic text-slate-700 dark:text-slate-300 mb-6">"Love the earthy scent and the way it tightens without feeling dry. A staple in my Sunday self-care ritual."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">MK</div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Marcus K.</h5>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5">
                                <div className="flex text-primary mb-4">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                </div>
                                <p className="italic text-slate-700 dark:text-slate-300 mb-6">"Excellent for detoxification. I use it on both my face and scalp. My hair feels lighter and scalp feels refreshed."</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">SL</div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">Sarah L.</h5>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-secondary dark:bg-slate-900 text-background-light pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary text-3xl">spa</span>
                                <span className="text-3xl font-serif font-bold tracking-tight text-primary">Flawless</span>
                            </div>
                            <p className="max-w-sm text-background-light/60 mb-8 leading-relaxed">
                                Ethical, botanical, and transformative. We believe in the power of nature to restore and revitalize your inherent beauty.
                            </p>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full border border-background-light/20 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#"><span className="material-symbols-outlined text-sm">public</span></a>
                                <a className="w-10 h-10 rounded-full border border-background-light/20 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#"><span className="material-symbols-outlined text-sm">video_library</span></a>
                                <a className="w-10 h-10 rounded-full border border-background-light/20 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#"><span className="material-symbols-outlined text-sm">share</span></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-primary">Quick Links</h4>
                            <ul className="space-y-4 text-background-light/60 text-sm">
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Our Philosophy</a></li>
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Ingredient Library</a></li>
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Sustainability</a></li>
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Loyalty Rituals</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-primary">Support</h4>
                            <ul className="space-y-4 text-background-light/60 text-sm">
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Shipping & Returns</a></li>
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Skin Consultation</a></li>
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Track Ritual</a></li>
                                <li><a className="hover:text-primary transition-colors text-white" href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-background-light/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-background-light/40 text-[10px] uppercase tracking-widest text-[#ffffff66]">
                        <p>© 2024 Flawless Skin & Hair Care. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a className="hover:text-primary transition-colors text-white" href="#">Privacy Policy</a>
                            <a className="hover:text-primary transition-colors text-white" href="#">Terms of Ritual</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FlawlessPack;
