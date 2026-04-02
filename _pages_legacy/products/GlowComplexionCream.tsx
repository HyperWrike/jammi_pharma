"use client";
import React from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const GlowComplexionCream = () => {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-body">
            <header className="flex items-center justify-between border-b border-secondary/10 px-6 py-4 lg:px-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-3xl">flare</span>
                    </div>
                    <h2 className="text-secondary dark:text-primary text-2xl font-bold tracking-tight font-display">Glow</h2>
                </div>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-secondary/80 dark:text-slate-300">
                    <a className="hover:text-primary transition-colors" href="#">Shop</a>
                    <a className="hover:text-primary transition-colors" href="#">About</a>
                    <a className="hover:text-primary transition-colors" href="#">Ingredients</a>
                    <a className="hover:text-primary transition-colors" href="#">Reviews</a>
                </nav>
                <div className="flex gap-4">
                    <button className="p-2 rounded-full hover:bg-primary/10 text-secondary dark:text-slate-100 transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-primary/10 text-secondary dark:text-slate-100 transition-colors">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-primary/10 text-secondary dark:text-slate-100 transition-colors">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                </div>
            </header>

            <main className="flex-1">
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-10 lg:px-20 max-w-7xl mx-auto">
                    <div className="space-y-6">
                        <div className="rounded-xl overflow-hidden aspect-square bg-slate-200 dark:bg-slate-800 shadow-xl border border-secondary/5">
                            <img alt="Glow Complexion Cream elegant jar on marble" className="w-full h-full object-cover" data-alt="Premium skin care cream jar on a soft textured background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgjT7AoRNd4aFySXJrQjUiE7EqOAY-HqA-bwX7yJ32hLUEgBGrH0lwI7tU6_jf3X4dvB_8Bjm2L5tW8VL_YpMmGhslFxy9098C8S8KtnkI4cKeAbFOlGOPaO5x0zHonIn3_HxoGEOWTg4xr9oPYusDKdyy3laz-k7l1u3jbcSZeVxs1-gOhtcaPEVKIyzMm5dXfKHtYrJxiz0EJJQ5L4jXMmbA1bWO4cu_HSV0-VpvGzQLZrofJcZ3U1OQkaMXMDhzLulRZfjkdZg" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-lg bg-slate-200 dark:bg-slate-800 cursor-pointer border-2 border-primary overflow-hidden">
                                <img alt="Product Close-up" className="w-full h-full object-cover" data-alt="Close up of luxury cream texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoEXwSr8Bj3tP9wJgJ3eEsLDDkm9AqkZTPaLHbeXIIHlacj5My7mJ8fFJI1mWyCd481PqT-YCtrmcogxdcYUsztSvGnXumzl_58Uwkh8I46ffIPFuhX9sb_f8bflKsibA26DpO0g7EN5YJRu7FScXqGPUQtQy3PWdYb81E8MfjG7BMiWODvaXE6Dc37S8oIHIaahAmc7j7leb3-lVPit1_GwHaDBxIVbaR_xnEMq6axxeNv31UJagFIY9-RC6vBIfiD1u3an0isGI" />
                            </div>
                            <div className="aspect-square rounded-lg bg-secondary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary/40 text-3xl">image</span>
                            </div>
                            <div className="aspect-square rounded-lg bg-secondary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary/40 text-3xl">play_circle</span>
                            </div>
                            <div className="aspect-square rounded-lg bg-secondary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary/40 text-3xl">image</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <nav className="flex gap-2 text-xs uppercase tracking-widest text-secondary/60 dark:text-slate-400">
                            <span>Shop</span> <span>/</span> <span>Skin Care</span> <span>/</span> <span className="text-primary font-bold">Moisturizers</span>
                        </nav>
                        <div>
                            <h1 className="font-display text-5xl font-black leading-tight text-secondary dark:text-slate-100 mb-2"><LiveEditable collection="products_content" docId="glowcomplexioncream" field="name">Glow Complexion Cream</LiveEditable></h1>
                            <p className="font-display text-primary text-xl font-medium italic">Luminous Skin, Naturally</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex text-primary">
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star_half</span>
                            </div>
                            <span className="text-secondary/60 dark:text-slate-400 text-sm">4.8 (124 reviews)</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                            Our signature complexion cream is a lightweight, non-greasy formula that deeply hydrates while brightening the skin tone. Infused with ancient botanicals, it reveals your natural radiance after just one application.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-secondary dark:text-slate-100">$72.00</span>
                                <span className="text-secondary/40 line-through text-lg pb-1">$85.00</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center border border-secondary/20 rounded-xl px-4 py-2">
                                    <button className="text-secondary dark:text-slate-300">-</button>
                                    <span className="px-6 font-bold">1</span>
                                    <button className="text-secondary dark:text-slate-300">+</button>
                                </div>
                                <button className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Bag
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-secondary/10">
                            <div className="flex flex-col items-center text-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">eco</span>
                                <span className="text-xs font-bold text-secondary/70 dark:text-slate-400 uppercase">Vegan</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">cruelty_free</span>
                                <span className="text-xs font-bold text-secondary/70 dark:text-slate-400 uppercase">Cruelty Free</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <span className="material-symbols-outlined text-primary text-3xl">psychiatry</span>
                                <span className="text-xs font-bold text-secondary/70 dark:text-slate-400 uppercase">Paraben Free</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-secondary/5 py-20 px-6 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-display text-3xl text-center mb-16 text-secondary dark:text-slate-100">Why Glow?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm border border-secondary/5 transition-transform hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4">spark</span>
                                <h3 className="font-display text-xl font-bold mb-3 text-secondary dark:text-slate-100">Evens Skin Tone</h3>
                                <p className="text-slate-600 dark:text-slate-400">Targeted saffron extract works to reduce dark spots and hyperpigmentation for a balanced complexion.</p>
                            </div>
                            <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm border border-secondary/5 transition-transform hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4">water_drop</span>
                                <h3 className="font-display text-xl font-bold mb-3 text-secondary dark:text-slate-100">Deep Hydration</h3>
                                <p className="text-slate-600 dark:text-slate-400">Lock in moisture for 24 hours with lotus seed oil that penetrates deep into skin layers.</p>
                            </div>
                            <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm border border-secondary/5 transition-transform hover:-translate-y-1">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4">sunny</span>
                                <h3 className="font-display text-xl font-bold mb-3 text-secondary dark:text-slate-100">Natural Glow</h3>
                                <p className="text-slate-600 dark:text-slate-400">Revitalize dull skin with sandalwood, providing an immediate radiant finish without the shine.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="font-display text-4xl text-secondary dark:text-slate-100">Key Ingredients</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-2xl">nutrition</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-secondary dark:text-slate-100">Pure Kashmiri Saffron</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Harvested by hand, saffron is a powerful antioxidant that clarifies and brightens skin.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-secondary dark:text-slate-100">Lotus Seed Extract</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">A natural skin conditioner that restores elasticity and improves overall texture.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary text-2xl">forest</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-secondary dark:text-slate-100">Mysore Sandalwood</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Known for its cooling properties, it soothes redness and refines pores.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-2xl bg-secondary/10 overflow-hidden">
                                <img alt="Saffron threads" className="w-full h-full object-cover grayscale-[20%]" data-alt="Close up of dried red saffron threads" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh7B5bQZVApJrWjGKx1CUJ0ZsIKdPjQPcFfQxB9qsiKDj-KuhMyMneE06_qBEKTjJrqRzRS5lCqDXd9tkO_LrzBGAhUCIIIxv-WEfBpES-j_vUd7zqd4gFxQq4hyY4uCDediK3Bceb0nyhTZnnRBY-KWRDb4hFtJh8VMaaoq_H_CdEgAvsfwtfoSl8GOqqqQQnzmgRjgc4gldOHQr2ODj4O0E0UameXgaRiWvsWPGxVMl16FnKUuosKyMbMvr2EjDiVenntc78ECY" />
                            </div>
                            <div className="aspect-square rounded-2xl bg-secondary/10 overflow-hidden mt-8">
                                <img alt="Lotus flower" className="w-full h-full object-cover" data-alt="Pink lotus flower in water" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp5a76Eh66Nm_mvJohHNuunUC7nJa2lWXH57x7y5fLqdDYrlWBkUMLbh0xEJ18G6gos0OkvTFp4uMXBZbC21rqcrt1pXEVoQNv-4kQdu-YMzdrnYRBHb9CDDUxYGNVd_Wn_bI3rGOdP_dhZjiNGsIB5xxO1S8GR8NmX1Ci799szkGbdkuPvQ7EsQO2ePa66aOIS4R4XxaeP9NEDh36LduJGLHbxhPpd5Dc7IiYEKnycgSwDhOf8qA-bXQb5MCt65H1EN-m3VglN3o" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-primary/5 py-20 px-6 lg:px-20">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <h2 className="font-display text-4xl text-secondary dark:text-slate-100">How to Use</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <div className="text-4xl font-display text-primary/30">01</div>
                                <h4 className="font-display font-bold">Cleanse</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Wash your face with a gentle cleanser and pat dry.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="text-4xl font-display text-primary/30">02</div>
                                <h4 className="font-display font-bold">Apply</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Take a pea-sized amount and dot across your forehead, cheeks, and chin.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="text-4xl font-display text-primary/30">03</div>
                                <h4 className="font-display font-bold">Massage</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Gently massage in upward circular motions until fully absorbed.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
                    <h2 className="font-display text-3xl text-secondary dark:text-slate-100 mb-12">Customer Reviews</h2>
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/3 space-y-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-secondary dark:text-slate-100 text-6xl font-black leading-tight">4.8</p>
                                <div className="flex gap-1 text-primary">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                </div>
                                <p className="text-slate-500 text-sm">Based on 124 reviews</p>
                            </div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                    <p className="text-xs">5</p>
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="bg-primary h-full" style={{ width: "80%" }}></div></div>
                                    <p className="text-xs text-right">80%</p>
                                </div>
                                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                    <p className="text-xs">4</p>
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="bg-primary h-full" style={{ width: "12%" }}></div></div>
                                    <p className="text-xs text-right">12%</p>
                                </div>
                                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                    <p className="text-xs">3</p>
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="bg-primary h-full" style={{ width: "5%" }}></div></div>
                                    <p className="text-xs text-right">5%</p>
                                </div>
                                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                    <p className="text-xs">2</p>
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="bg-primary h-full" style={{ width: "1%" }}></div></div>
                                    <p className="text-xs text-right">1%</p>
                                </div>
                                <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                    <p className="text-xs">1</p>
                                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className="bg-primary h-full" style={{ width: "2%" }}></div></div>
                                    <p className="text-xs text-right">2%</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 space-y-8">
                            <div className="border-b border-secondary/10 pb-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h5 className="font-display font-bold">Sarah M.</h5>
                                        <div className="flex text-primary text-sm">
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">2 weeks ago</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 italic">"I've tried dozens of creams for my hyperpigmentation, but this is the first one that actually showed results in 10 days. My skin feels so soft and looks much brighter."</p>
                            </div>
                            <div className="border-b border-secondary/10 pb-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h5 className="font-display font-bold">Elena R.</h5>
                                        <div className="flex text-primary text-sm">
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                            <span className="material-symbols-outlined text-sm font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">1 month ago</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 italic">"The texture is amazing! It's not heavy at all but keeps me hydrated all day. Love the subtle sandalwood scent."</p>
                            </div>
                            <button className="text-primary font-bold flex items-center gap-2 hover:underline">View All Reviews <span className="material-symbols-outlined">arrow_forward</span></button>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6 lg:px-20 bg-secondary text-slate-100 dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-display text-3xl mb-12 text-center text-white">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-4">
                            <details className="group bg-background-dark/30 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-display font-bold text-white">Is this suitable for oily skin?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-400">
                                    Yes, our formula is non-comedogenic and lightweight, making it suitable for all skin types, including oily and acne-prone skin.
                                </div>
                            </details>
                            <details className="group bg-background-dark/30 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-display font-bold text-white">Can I use this under makeup?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-400">
                                    Absolutely! It absorbs quickly and leaves a smooth, non-greasy finish that acts as a perfect primer for makeup.
                                </div>
                            </details>
                            <details className="group bg-background-dark/30 rounded-xl overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-display font-bold text-white">How long will one jar last?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-400">
                                    With daily use as recommended, a 50ml jar typically lasts between 2 to 3 months.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
                    <h2 className="font-display text-3xl text-secondary dark:text-slate-100 mb-12">You May Also Like</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4">
                                <img alt="Facial Oil" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Luxury facial oil bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3v70KItpSx2Mjs5OhR7KwEOXG0GYZSXCsW8VQQXtm28OEBcW-QFpOah8cUUMZSK1V6yP7EfgneUwzm5ZjWSEsXfdsF1stwhFFFp44vTSpzYizNMPD6CGxNQ9HmkPoRmTaMXcCxuFjVuVxs9xagCf18qcbaaaJjDjd4Qo3T2BgVQd2N1Fj8B9KcBBpsyP-f8XQTXpcCDjuxLJLi4_BF3c9g23PKTJSLgSy-4LdmmgiFK3ib69J4dEbhUzWkpszH95BjnPRk7DA7OY" />
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200">Glow Serum</h4>
                            <p className="text-primary">$58.00</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4">
                                <img alt="Face Wash" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Gentle foam face wash bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYJK3s6qPzZiVqT4wDCz48bdde5-NNRR45ulND38-1VKWIXk3aXV_bQzine9unZ-_jucSoFg_QsA8xyMmArK93ZhTWuLk7QRPbcp3kfr25kJYsPn9_9WEIrSrvgcexTAOrVI7quQf_dIYID9iBZdb6v0nBMItcHdyBYUsOF43WB0QSPyxBROi5r1NAFX95PiOgJyZuZNrfkST948Gk-RScw-z0LOnd0L6T7s-vJI8E1yK7o7nkIVNmsBtz1IKHLSQOktrJe6gA1BI" />
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200">Lotus Cleanser</h4>
                            <p className="text-primary">$34.00</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4">
                                <img alt="Face Mist" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Refreshing mist spray bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA7uTzw6k-jbzqyQpOrL6vZd4JN5mdQfBt4Oi5NGzuf88YS8KwPGssAkmQEB6w_6oenqAHePFWpCxPCVMYzvNj7YQKvqlz26sA6HE9-2pvLxvnhJJJIzkK5oAtJlr_0tGRuewNfJb8FQhqWiDNwzAsgu6ANwhgdiwyxUtBX0ugjFyF0GGwNFhvMRL9x-D3edLsXxi_yqldq-VRcJ4AJPNQTniR-pqlan5bqUxJrOuX1_RRxr02Fw0Lzg8zx725CxCiF0t07F4jDZA" />
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200">Saffron Mist</h4>
                            <p className="text-primary">$28.00</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4">
                                <img alt="Eye Cream" className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Small eye cream pot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_54x-C7-T3JpU6hXGomlMIy5s2ytfiquHvpiqWqD07uDRN4ri-zYj8eVI06e9lwDBDmYLvKCOHsfVXp-xR69lcqGXjZaVgjpMNYWyu7f_rPCzT3snct1Unhkj79J0A0TN8UDcrlI5SXC1UZn3gFFYtHAidaTFr7Dve8O6TS4e6pPk0Ur4j_IgGhfbaGefHwsJnKwKN7Vu0C-YcLsqiAHSmIl10WeLbjnEPC6ncTb5Iwxwkxw2gcJ5VPbWnWhP9av2L2AJj_3znBw" />
                            </div>
                            <h4 className="font-display font-bold text-secondary dark:text-slate-200">Brighten Eye Gel</h4>
                            <p className="text-primary">$45.00</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-background-light dark:bg-background-dark border-t border-secondary/10 px-6 py-20 lg:px-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="text-primary">
                                <span className="material-symbols-outlined text-3xl">flare</span>
                            </div>
                            <h2 className="text-secondary dark:text-slate-100 text-2xl font-bold font-display">Glow</h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Sustainable, ancient-inspired skin care for the modern individual. Rooted in nature, proven by science.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-display font-bold mb-6 text-secondary dark:text-slate-100 uppercase text-xs tracking-widest">Shop</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary" href="#">Face Moisturizers</a></li>
                            <li><a className="hover:text-primary" href="#">Cleansers</a></li>
                            <li><a className="hover:text-primary" href="#">Serums</a></li>
                            <li><a className="hover:text-primary" href="#">Gift Sets</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold mb-6 text-secondary dark:text-slate-100 uppercase text-xs tracking-widest">About</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><a className="hover:text-primary" href="#">Our Story</a></li>
                            <li><a className="hover:text-primary" href="#">Ingredients</a></li>
                            <li><a className="hover:text-primary" href="#">Sustainability</a></li>
                            <li><a className="hover:text-primary" href="#">Journal</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold mb-6 text-secondary dark:text-slate-100 uppercase text-xs tracking-widest">Newsletter</h4>
                        <p className="text-xs text-slate-500 mb-4">Join our community for exclusive skin care tips and offers.</p>
                        <div className="flex gap-2">
                            <input className="flex-1 bg-white dark:bg-slate-800 border border-secondary/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100 placeholder-slate-400" placeholder="Your email" type="email" />
                            <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest">Join</button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-secondary/10 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-6">
                    <p className="text-xs text-slate-400">© 2024 Glow Skin & Hair Care. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-secondary/60 hover:text-primary dark:text-slate-400" href="#">
                            <span className="material-symbols-outlined text-xl">brand_family</span>
                        </a>
                        <a className="text-secondary/60 hover:text-primary dark:text-slate-400" href="#">
                            <span className="material-symbols-outlined text-xl">brand_family</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GlowComplexionCream;
