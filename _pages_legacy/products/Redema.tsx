"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const Redema: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleQuantityChange = (action: 'increase' | 'decrease') => {
        if (action === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (action === 'increase') {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-body">
            <main className="max-w-7xl mx-auto px-4 md:px-10 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-body">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href="/shop" className="hover:text-primary">Wellness</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-secondary font-bold">Redema</span>
                </nav>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Product Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-secondary/5 flex items-center justify-center p-8 shadow-sm">
                            <img alt="Jammi Pharmaceuticals Redema Tablets Packaging" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4IRP5n7jLbVTHvjNPskbWXLcbHRq-fgM7Y-wk-0McOGNPFQjfRpRGmEoMe4ghMjdUfcxT9QoXrjl3s89Q1Sd4M5MBaPbByYNFSJwRVTaawmzSVIxYiH8jKLgHqKP7AHYMygSoqd1ON7s8P3Ojj-nBP8YnaZlEpIEjMxPWCnQcCC2sRhBlO2EHLgEbHP9E09r__KVC9O5dk_rM2QKlNg68KYCFEr56x2JzRxpkfJa6zAIcWXYY97Wu6Cr0LtPo5FlI88dmKSKwBms" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border-2 border-primary overflow-hidden p-2">
                                <img alt="Redema tablets thumbnail" className="w-full h-full object-contain opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGxuA_zhtwHScYFlEoAo9FXFr0PAn6Ia_0F_QQtNCqGwq52veUW50d7qKFvrjj6zpwNIND6idTSASf9iFI8xe3Ajxb7glz8Y6GaE8R5iNoq97-CZ_7gw4zYy_6kYtaoYaHeFMY14-ccOXl4-Z-h4B4d912lRY2z_8KoVyPLYoXfHSzYD_yOpDaFTIlOcjUFpuXUoX2pmR-WeQnCJZv6iHrSY_sI9SqbJ2rjcU9azr3lXb4j0N9GnZwgUHhk1ZsWZr7xbVL6Ntxh9c" />
                            </div>
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">image</span>
                                </div>
                            </div>
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">image</span>
                                </div>
                            </div>
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">play_circle</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="flex gap-2 mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">New Launch</span>
                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">100% Ayurvedic</span>
                        </div>
                        <h2 className="text-5xl font-bold text-secondary dark:text-primary mb-2 leading-tight">Redema</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 font-body italic">Relief from Edema & Promotes Healthy Weight Loss</p>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">₹320</span>
                            <span className="text-lg text-slate-400 line-through">₹399</span>
                            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm font-bold">20% OFF</span>
                        </div>

                        <div className="space-y-6 border-t border-b border-secondary/10 py-8 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden h-12">
                                    <button onClick={() => handleQuantityChange('decrease')} className="px-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><span className="material-symbols-outlined">remove</span></button>
                                    <input className="w-12 text-center border-none focus:ring-0 bg-transparent font-bold" type="number" value={quantity} readOnly />
                                    <button onClick={() => handleQuantityChange('increase')} className="px-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><span className="material-symbols-outlined">add</span></button>
                                </div>
                                <button className="flex-1 bg-primary text-white font-bold h-12 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                                <span className="material-symbols-outlined text-secondary">local_shipping</span>
                                <div className="text-xs">
                                    <p className="font-bold text-secondary">Fast Delivery</p>
                                    <p className="text-slate-500">Ships in 24 hours</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                                <span className="material-symbols-outlined text-secondary">verified_user</span>
                                <div className="text-xs">
                                    <p className="font-bold text-secondary">Quality Assured</p>
                                    <p className="text-slate-500">GMP Certified</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Strip */}
                <div className="bg-secondary text-white rounded-3xl p-8 mb-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border border-primary/20">
                    <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-4xl mb-2">eco</span>
                        <p className="font-bold text-lg">100% Ayurvedic</p>
                        <p className="text-sm opacity-80 font-body">Time-tested natural formulas</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
                        <span className="material-symbols-outlined text-primary text-4xl mb-2">approval</span>
                        <p className="font-bold text-lg">GMP Certified</p>
                        <p className="text-sm opacity-80 font-body">Highest manufacturing standards</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-4xl mb-2">history_edu</span>
                        <p className="font-bold text-lg">125+ Years Legacy</p>
                        <p className="text-sm opacity-80 font-body">Trusted for generations</p>
                    </div>
                </div>

                {/* Benefits Section */}
                <section className="mb-20">
                    <h3 className="text-3xl font-bold text-center text-secondary dark:text-primary mb-12">Clinical Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/5 shadow-sm text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl">opacity</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-secondary dark:text-white">Reduces Water Retention</h4>
                            <p className="text-slate-600 dark:text-slate-400 font-body">Helps eliminate excess fluid buildup in tissues, reducing swelling and puffiness naturally.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/5 shadow-sm text-center">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary dark:text-primary">
                                <span className="material-symbols-outlined text-3xl">fitness_center</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-secondary dark:text-white">Supports Healthy Weight</h4>
                            <p className="text-slate-600 dark:text-slate-400 font-body">Assists in weight management by optimizing metabolic functions and internal detoxification.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/5 shadow-sm text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl">water_drop</span>
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-secondary dark:text-white">Natural Diuretic</h4>
                            <p className="text-slate-600 dark:text-slate-400 font-body">Gentle yet effective action that supports kidney health and fluid balance without mineral loss.</p>
                        </div>
                    </div>
                </section>

                {/* About & Ingredients */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 -rotate-3 rounded-3xl"></div>
                        <div className="relative bg-white dark:bg-slate-800 p-10 rounded-3xl border border-secondary/5 shadow-lg">
                            <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-6">About Redema</h3>
                            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-body mb-6">
                                Redema is a specialized Ayurvedic formulation designed to address edema and promote healthy detoxification. By focusing on <strong>Srotas (channels) purification</strong>, it helps clear internal blockages that lead to water retention and sluggish metabolism.
                            </p>
                            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-body">
                                Our unique blend doesn't just treat symptoms; it supports the root cause by balancing Kapha and Pitta doshas, leading to sustainable weight management and overall vitality.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-8">Potent Ingredients</h3>
                        <div className="space-y-6">
                            <div className="flex gap-6 items-start">
                                <div className="shrink-0 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold">P</div>
                                <div>
                                    <h5 className="text-lg font-bold text-secondary dark:text-white">Punarnava (Boerhavia Diffusa)</h5>
                                    <p className="text-slate-600 dark:text-slate-400 font-body">Known as the 'renewer', it is excellent for kidney health and reducing edema.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="shrink-0 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold">V</div>
                                <div>
                                    <h5 className="text-lg font-bold text-secondary dark:text-white">Varuna (Crataeva Nurvala)</h5>
                                    <p className="text-slate-600 dark:text-slate-400 font-body">A powerful herb for urinary tract support and clearing system obstructions.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="shrink-0 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold">G</div>
                                <div>
                                    <h5 className="text-lg font-bold text-secondary dark:text-white">Gokshura (Tribulus Terrestris)</h5>
                                    <p className="text-slate-600 dark:text-slate-400 font-body">Natural diuretic that boosts vitality and maintains electrolyte balance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How to Use */}
                <section className="bg-primary/5 rounded-[3rem] p-12 mb-20">
                    <h3 className="text-3xl font-bold text-center text-secondary dark:text-primary mb-12">How to Use</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-primary font-bold text-2xl">1</div>
                            <p className="font-bold text-secondary dark:text-white mb-1">Take 2 tablets</p>
                            <p className="text-sm text-slate-500 font-body">Standard dosage</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-primary font-bold text-2xl">2</div>
                            <p className="font-bold text-secondary dark:text-white mb-1">Twice daily</p>
                            <p className="text-sm text-slate-500 font-body">Morning & Evening</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-primary font-bold text-2xl">3</div>
                            <p className="font-bold text-secondary dark:text-white mb-1">Before meals</p>
                            <p className="text-sm text-slate-500 font-body">30 mins prior</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-primary font-bold text-2xl">4</div>
                            <p className="font-bold text-secondary dark:text-white mb-1">With warm water</p>
                            <p className="text-sm text-slate-500 font-body">For better absorption</p>
                        </div>
                    </div>
                </section>

                {/* Reviews & FAQ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                    {/* Reviews */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-2">Patient Reviews</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-primary">
                                        <span className="material-symbols-outlined fill-1">star</span>
                                        <span className="material-symbols-outlined fill-1">star</span>
                                        <span className="material-symbols-outlined fill-1">star</span>
                                        <span className="material-symbols-outlined fill-1">star</span>
                                        <span className="material-symbols-outlined fill-1">star_half</span>
                                    </div>
                                    <span className="font-bold text-xl">4.6/5</span>
                                    <span className="text-slate-400 font-body">(128 reviews)</span>
                                </div>
                            </div>
                            <button className="text-primary font-bold border-b-2 border-primary hover:text-primary/80 transition-colors">Write Review</button>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-secondary dark:text-white">Ananya S.</span>
                                    <span className="text-xs text-slate-400">Verified Buyer</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-body italic">"I noticed a significant reduction in my leg swelling within the first 10 days. Feel much lighter now."</p>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-secondary dark:text-white">Rajiv K.</span>
                                    <span className="text-xs text-slate-400">Verified Buyer</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-body italic">"Using this along with my weight loss journey. It's gentle and really helps with the morning puffiness."</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-8">Common Questions</h3>
                        <div className="space-y-4">
                            <details className="group bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5 overflow-hidden">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                                    <span className="font-bold text-secondary dark:text-white">How long before I see results?</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 font-body">
                                    Most users notice reduction in swelling within 7-14 days. For weight management benefits, consistent use for 3 months is recommended alongside a balanced diet.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5 overflow-hidden">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                                    <span className="font-bold text-secondary dark:text-white">Can I take this with other medications?</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 font-body">
                                    While Redema is natural, we recommend consulting your physician if you are on blood pressure or kidney-related medications.
                                </div>
                            </details>
                            <details className="group bg-white dark:bg-slate-800 rounded-2xl border border-secondary/5 overflow-hidden">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                                    <span className="font-bold text-secondary dark:text-white">Is exercise necessary with Redema?</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 font-body">
                                    Light activity like walking enhances lymphatic drainage and works synergistically with Redema to provide faster results.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <section className="border-t border-secondary/10 pt-16 mb-20">
                    <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-8">Complete Your Wellness Routine</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Related Item 1 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden mb-4 p-6 border border-secondary/5 group-hover:shadow-md transition-shadow">
                                <div className="w-full h-full bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">medication</span>
                                </div>
                            </div>
                            <h5 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">Jammi Diges-T</h5>
                            <p className="text-sm text-slate-500 font-body">Metabolic Booster</p>
                            <p className="font-bold mt-2">₹280</p>
                        </div>
                        {/* Related Item 2 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden mb-4 p-6 border border-secondary/5 group-hover:shadow-md transition-shadow">
                                <div className="w-full h-full bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">medication</span>
                                </div>
                            </div>
                            <h5 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">Liver-O-Plus</h5>
                            <p className="text-sm text-slate-500 font-body">Liver Detox Formula</p>
                            <p className="font-bold mt-2">₹350</p>
                        </div>
                        {/* Related Item 3 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden mb-4 p-6 border border-secondary/5 group-hover:shadow-md transition-shadow">
                                <div className="w-full h-full bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">medication</span>
                                </div>
                            </div>
                            <h5 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">Immuno-Guard</h5>
                            <p className="text-sm text-slate-500 font-body">Daily Immunity Tablet</p>
                            <p className="font-bold mt-2">₹420</p>
                        </div>
                        {/* Related Item 4 */}
                        <div className="group cursor-pointer">
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden mb-4 p-6 border border-secondary/5 group-hover:shadow-md transition-shadow">
                                <div className="w-full h-full bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">medication</span>
                                </div>
                            </div>
                            <h5 className="font-bold text-secondary dark:text-white group-hover:text-primary transition-colors">Slim-Veda</h5>
                            <p className="text-sm text-slate-500 font-body">Weight Balance</p>
                            <p className="font-bold mt-2">₹450</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Redema;
