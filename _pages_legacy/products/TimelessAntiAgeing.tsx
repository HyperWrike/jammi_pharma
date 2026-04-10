"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const TimelessAntiAgeing: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FAF6F0] dark:bg-[#221610] font-['Public_Sans',sans-serif] text-slate-900 dark:text-slate-100">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Top Navigation */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-[#D4882E]/20 px-4 md:px-20 py-4 bg-[#FAF6F0] dark:bg-[#221610] sticky top-0 z-50">
                        <div className="flex items-center gap-4">
                            <div className="text-[#2E5339] dark:text-[#D4882E]">
                                <span className="material-symbols-outlined text-3xl">medical_services</span>
                            </div>
                            <h2 className="text-[#2E5339] dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Jammi Pharmaceuticals</h2>
                        </div>
                        <div className="hidden md:flex flex-1 justify-center gap-8">
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Products</a>
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Science</a>
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Heritage</a>
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Contact</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center rounded-xl bg-[#D4882E]/10 px-3 py-1.5 border border-[#D4882E]/20">
                                <span className="material-symbols-outlined text-[#D4882E] text-xl">search</span>
                                <input className="bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-[#D4882E]/60 w-32 lg:w-48" placeholder="Search..." type="text" />
                            </div>
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#2E5339] text-white hover:bg-[#2E5339]/90 transition-all">
                                <span className="material-symbols-outlined">shopping_bag</span>
                            </button>
                            <button className="md:hidden flex items-center justify-center rounded-xl h-10 w-10 bg-[#D4882E]/10 text-[#2E5339]">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </header>

                    <main className="flex-1">
                        {/* Hero Section */}
                        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 lg:py-16">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="order-2 lg:order-1 flex flex-col gap-6">
                                    <div className="flex flex-wrap gap-2 text-[#D4882E] text-sm font-medium">
                                        <a className="hover:underline" href="#">Home</a>
                                        <span>/</span>
                                        <a className="hover:underline" href="#">Skin &amp; Hair Care</a>
                                        <span>/</span>
                                        <span className="text-[#2E5339] font-bold">Anti-Ageing</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black text-[#2E5339] dark:text-slate-100 leading-tight"><LiveEditable collection="products_content" docId="timelessantiageing" field="name">Timeless Anti-Ageing Cream</LiveEditable></h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                                        A restorative Ayurvedic formula crafted with pure Guggul and Ashwagandha. Experience a visible transformation as it targets fine lines and restores your skin's youthful radiance.
                                    </p>

                                    <div className="flex items-center gap-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex gap-1 text-[#D4882E]">
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-500">4.9/5 from 850+ reviews</p>
                                        </div>
                                        <div className="h-10 w-px bg-slate-300"></div>
                                        <div>
                                            <p className="text-3xl font-bold text-[#2E5339] dark:text-[#D4882E]">$85.00</p>
                                            <p className="text-xs text-slate-500">50ml / 1.7 fl. oz</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="flex-1 h-14 bg-[#D4882E] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#D4882E]/20 transition-all flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">add_shopping_cart</span>
                                            Add to Cart
                                        </button>
                                        <button className="h-14 px-8 border-2 border-[#2E5339] text-[#2E5339] font-bold rounded-xl hover:bg-[#2E5339] hover:text-white transition-all">
                                            Subscribe &amp; Save 15%
                                        </button>
                                    </div>

                                    <div className="flex gap-8 border-t border-slate-200 dark:border-slate-800 pt-8 mt-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2E5339]">verified_user</span>
                                            <span className="text-xs font-semibold uppercase tracking-wider">Clinically Tested</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2E5339]">eco</span>
                                            <span className="text-xs font-semibold uppercase tracking-wider">100% Organic</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#2E5339]">cruelty_free</span>
                                            <span className="text-xs font-semibold uppercase tracking-wider">Cruelty Free</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-1 lg:order-2">
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-[#D4882E]/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                                        <img className="relative w-full aspect-square object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800" data-alt="Premium jar of anti-ageing cream on a wooden surface with herbal ingredients" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0u2y3Yd2aIMMO9Wjj1ILe040OyX-3Q8826DPzRaJeWNi5xaqGgjRcOirvD8y8BEZH6v8lYemFvPtXoIUp5swTLbEBMxhk6ruQDGBx4q0lfaEI3y2R_My2jZMGpFKwOzXond5krqb6ZZbYx0nPdIiU1SolZJoFk_Q75VojKGIq27J5XPdA2NhCCrgz1cKmjJymarz6AKajvDyPGbnBPZIFSHes8i16pM-2H3P-CDbHtBCBrvbw1hvUHzc2y1YDCSDbNe7zi2QJJu0" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Benefits Section */}
                        <section className="bg-[#2E5339] text-white py-20">
                            <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                                <h2 className="text-3xl md:text-5xl font-bold mb-16">The Science of Ageless Beauty</h2>
                                <div className="grid md:grid-cols-3 gap-12">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-16 w-16 bg-[#D4882E]/20 rounded-full flex items-center justify-center mb-2">
                                            <span className="material-symbols-outlined text-[#D4882E] text-4xl">auto_fix_high</span>
                                        </div>
                                        <h3 className="text-xl font-bold">Reduces Wrinkles</h3>
                                        <p className="text-slate-300 leading-relaxed">Clinically proven to reduce the depth of fine lines and visible wrinkles within 4 weeks of consistent use.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-16 w-16 bg-[#D4882E]/20 rounded-full flex items-center justify-center mb-2">
                                            <span className="material-symbols-outlined text-[#D4882E] text-4xl">dry_cleaning</span>
                                        </div>
                                        <h3 className="text-xl font-bold">Firms Skin</h3>
                                        <p className="text-slate-300 leading-relaxed">Improves skin elasticity and promotes natural collagen production for a lifted, more contoured appearance.</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-16 w-16 bg-[#D4882E]/20 rounded-full flex items-center justify-center mb-2">
                                            <span className="material-symbols-outlined text-[#D4882E] text-4xl">flare</span>
                                        </div>
                                        <h3 className="text-xl font-bold">Restores Youth</h3>
                                        <p className="text-slate-300 leading-relaxed">Deeply nourishes the dermal layers to restore natural radiance and smooth uneven skin texture.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Ingredients Section */}
                        <section className="py-24 bg-white dark:bg-slate-900">
                            <div className="max-w-7xl mx-auto px-4 md:px-10">
                                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                                    <div className="max-w-2xl">
                                        <span className="text-[#D4882E] font-bold uppercase tracking-widest text-sm">Nature's Finest</span>
                                        <h2 className="text-4xl font-black text-[#2E5339] dark:text-slate-100 mt-2">Potent Ayurvedic Ingredients</h2>
                                    </div>
                                    <a className="text-[#D4882E] font-bold flex items-center gap-2 hover:underline" href="#">
                                        View All Ingredients
                                        <span className="material-symbols-outlined">trending_flat</span>
                                    </a>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="bg-[#FAF6F0] dark:bg-[#221610] p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div className="text-4xl mb-4">🌿</div>
                                        <h4 className="text-xl font-bold text-[#2E5339] dark:text-[#D4882E] mb-3">Pure Guggul</h4>
                                        <p className="text-slate-600 dark:text-slate-400">A potent resin known for its incredible ability to support natural skin regeneration and lipid balance.</p>
                                    </div>
                                    <div className="bg-[#FAF6F0] dark:bg-[#221610] p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div className="text-4xl mb-4">✨</div>
                                        <h4 className="text-xl font-bold text-[#2E5339] dark:text-[#D4882E] mb-3">Ashwagandha</h4>
                                        <p className="text-slate-600 dark:text-slate-400">The "King of Herbs" that provides powerful antioxidant protection against environmental stressors.</p>
                                    </div>
                                    <div className="bg-[#FAF6F0] dark:bg-[#221610] p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div className="text-4xl mb-4">🌹</div>
                                        <h4 className="text-xl font-bold text-[#2E5339] dark:text-[#D4882E] mb-3">Rosehip Oil</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Packed with Vitamin A and C, it brightens the complexion and helps fade dark spots naturally.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How to Use Section */}
                        <section className="py-20 bg-[#FAF6F0] dark:bg-[#221610]">
                            <div className="max-w-7xl mx-auto px-4 md:px-10">
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-3xl overflow-hidden h-64 shadow-lg">
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))" }}>
                                                <img className="w-full h-full object-cover" data-alt="Applying face cream in a morning routine" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChfwjK7q7Q5_1-enac3_55XZl1JcF4WVXfTotCHk2se_Y2Wtjjfx_4HCcddJFIteWbw8nsd5zvvBqCC15Hxs4OWer91XLsTAHyry7ANiPGJwkkh0LZseuW6bcUQUuYgNRjxKZSNfG29SKBHk4JqNnMWvQ0okMYSumDXMcsp-7KTi5QsgwlZHe5KjqJ0xkdhhyPAEvRzE7a0AQygDjsOrZzO48SqB1DXhdsd75p1yGwzXoyk5b-WSAuQW7U_m3_MeBi_yACJb6PiYQ" />
                                            </div>
                                        </div>
                                        <div className="rounded-3xl overflow-hidden h-64 mt-8 shadow-lg">
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))" }}>
                                                <img className="w-full h-full object-cover" data-alt="Peaceful morning ritual with skincare products" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZH728NA98YRmqOF1wn4A-aHRixQ_pfCjJBmrF4MZHM5Jy9JDrgbJcA9SsCs7QbkmL4vg2UgzUSitW3copiPpT6ts-hT15sVG6ms3c7l5WzQLIdmCzeFv-I2sDRo-1SEACXiuG9MBLn3VuT6Q3LNqccppXPwntL-133x7Frs6BDOSoN6kAVbJmsRNUpZKevDDkYci-GJi9xjVA_Qr24RAKbQr-y3_o3hXWOIdYCklP2rs9z-_0Z8_rP9z4aFUk_sTvNlEAZVdmIp0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black text-[#2E5339] dark:text-slate-100 mb-8">How to Incorporate into your Ritual</h2>
                                        <div className="space-y-8">
                                            <div className="flex gap-6">
                                                <div className="flex-shrink-0 h-10 w-10 bg-[#D4882E] text-white rounded-full flex items-center justify-center font-bold">1</div>
                                                <div>
                                                    <h5 className="text-lg font-bold mb-1">Cleanse</h5>
                                                    <p className="text-slate-600 dark:text-slate-400">Start with a clean, dry face. Use a gentle cleanser to remove all impurities.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-6">
                                                <div className="flex-shrink-0 h-10 w-10 bg-[#D4882E] text-white rounded-full flex items-center justify-center font-bold">2</div>
                                                <div>
                                                    <h5 className="text-lg font-bold mb-1">Massage</h5>
                                                    <p className="text-slate-600 dark:text-slate-400">Apply a pea-sized amount to your fingertips and gently massage onto face and neck in upward circular motions.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-6">
                                                <div className="flex-shrink-0 h-10 w-10 bg-[#D4882E] text-white rounded-full flex items-center justify-center font-bold">3</div>
                                                <div>
                                                    <h5 className="text-lg font-bold mb-1">Absorb</h5>
                                                    <p className="text-slate-600 dark:text-slate-400">Allow the cream to fully absorb for 2-3 minutes before applying sunscreen or makeup.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Testimonials */}
                        <section className="py-24 bg-white dark:bg-slate-900">
                            <div className="max-w-7xl mx-auto px-4 md:px-10">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-black text-[#2E5339] dark:text-slate-100 mb-4">Voices of Radiance</h2>
                                    <p className="text-slate-600 dark:text-slate-400">Real stories from our beloved community.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="p-8 rounded-3xl bg-[#FAF6F0] dark:bg-[#221610] border border-slate-100 dark:border-slate-800">
                                        <div className="flex gap-1 text-[#D4882E] mb-4">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </div>
                                        <p className="text-lg font-medium italic mb-6">"My skin hasn't felt this supple in decades. The Guggul extract really makes a difference in firming my jawline."</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Portrait of a satisfied customer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfJkDZlV205dyH3guDD00SNWeQ4frB0gYk9L97yzrXkfdzlKt_fTDSefgso_TQ2yWrjLIAFhy7w6UH1qxr3YqmNr-cSOICpqAhsp3pP1C88G0WVyPWF1-9IX29gsIiALak_iIRquokqNr5RD1Eqo2CaTHvzlVxPUmHN3VGFVkM0xMOl61zYsDEWRTJ6dLA8Vt6rbdDeoWCuJ84j0hz9l46s9TVJMbd2XnjWQ0Qb7--Hv6uo6-_7UTbA9IGdV_ECq__iWGu896NFfE" />
                                            </div>
                                            <div>
                                                <p className="font-bold">Eleanor M.</p>
                                                <p className="text-xs text-slate-500 uppercase">Verified Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-[#FAF6F0] dark:bg-[#221610] border border-slate-100 dark:border-slate-800">
                                        <div className="flex gap-1 text-[#D4882E] mb-4">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </div>
                                        <p className="text-lg font-medium italic mb-6">"Finally an anti-ageing cream that doesn't feel heavy. It absorbs beautifully and the herbal scent is divine."</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Portrait of a satisfied customer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEWk7UOnWrBYETdk38x-pQMKhyF6AvqFJXEPM7XoWZQCrcUWSPkqQg8tcf1-eLnC74mR-CrJN4DsXXplGrYeh1-o2QfkwpaQl9v78C8Cxl7dQLyieUuyNju_hNn0b5o_vsOWYk34bS0WowJgZJciXOfgWeKO1otKgjSNScThbVqTHiaDGk7Aj0mPNsanLW227N90c_66XuFZy6sERzmxGTaUJAZQS3QjUwZWgIRGXMrz_A9a4uPe04W2Jg_liUFwn2PV5GMXp0l-M" />
                                            </div>
                                            <div>
                                                <p className="font-bold">Sarah K.</p>
                                                <p className="text-xs text-slate-500 uppercase">Verified Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-[#FAF6F0] dark:bg-[#221610] border border-slate-100 dark:border-slate-800">
                                        <div className="flex gap-1 text-[#D4882E] mb-4">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </div>
                                        <p className="text-lg font-medium italic mb-6">"Noticeable difference in the fine lines around my eyes after just 3 weeks. Truly a timeless miracle."</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                                                <img className="w-full h-full object-cover" data-alt="Portrait of a satisfied customer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-yf4CwxHUIHQYFHb5Y5EAhvG6AngQVW5qZVTBobllDCgWqCl53K2n39h4Yahc3H49zfRIhZhlRNVCrMWim-wnXs_yS_SxO3b1xCpXXMhKAbeCjE0X4igxcr6d9bZATHg254utr1rLr2T4YaV-UV2d3Lq_EiolE3iuqxvB2WdapfkO3HcEIzoP4T01KNnveEzUPbMPiItX-fr8b7oax02inRzUQ089JJuCqrM_KBAjOqEgMr22NrS0_pEv8nZws0SwhGVNwzcY0Z8" />
                                            </div>
                                            <div>
                                                <p className="font-bold">Julianna R.</p>
                                                <p className="text-xs text-slate-500 uppercase">Verified Purchase</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer */}
                    <footer className="bg-[#2E5339] text-white py-16 border-t border-[#D4882E]/20">
                        <div className="max-w-7xl mx-auto px-4 md:px-10">
                            <div className="grid md:grid-cols-4 gap-12 mb-12">
                                <div className="col-span-1 md:col-span-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-[#D4882E] text-3xl">medical_services</span>
                                        <h2 className="text-xl font-bold tracking-tight">Jammi Pharmaceuticals</h2>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">Dedicated to bringing the ancient wisdom of Ayurveda to modern dermatological science since 1902.</p>
                                    <div className="flex gap-4">
                                        <a className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4882E] transition-all" href="#">
                                            <span className="material-symbols-outlined text-xl">share</span>
                                        </a>
                                        <a className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4882E] transition-all" href="#">
                                            <span className="material-symbols-outlined text-xl">mail</span>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-6">Shop</h4>
                                    <ul className="space-y-4 text-slate-400 text-sm">
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Anti-Ageing Range</a></li>
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Hair Care Rituals</a></li>
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Skin Brightening</a></li>
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Bestsellers</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-6">Heritage</h4>
                                    <ul className="space-y-4 text-slate-400 text-sm">
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Our History</a></li>
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Ayurvedic Principles</a></li>
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Sustainability</a></li>
                                        <li><a className="hover:text-[#D4882E] transition-colors" href="#">Ethics</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                                    <p className="text-slate-400 text-sm mb-4">Join our community for exclusive Ayurvedic wellness tips.</p>
                                    <div className="flex gap-2">
                                        <input className="flex-1 bg-white/10 border-white/20 outline-none rounded-xl px-4 py-2 text-sm focus:ring-[#D4882E] focus:border-[#D4882E]" placeholder="Your email" type="email" />
                                        <button className="bg-[#D4882E] px-4 py-2 rounded-xl text-sm font-bold">Join</button>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-slate-500 text-xs">© 2024 Jammi Pharmaceuticals. All rights reserved.</p>
                                <div className="flex gap-8 text-slate-500 text-xs">
                                    <a className="hover:text-slate-300" href="#">Privacy Policy</a>
                                    <a className="hover:text-slate-300" href="#">Terms of Service</a>
                                    <a className="hover:text-slate-300" href="#">Shipping Policy</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default TimelessAntiAgeing;
