"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const UVSafeSunscreen: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FAF6F0] text-slate-900 dark:bg-[#221610] dark:text-slate-100 font-['DM_Sans',sans-serif]">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#2E5339]/10 dark:bg-[#221610]/90 dark:border-[#D4882E]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-2">
                            <div className="text-[#2E5339] dark:text-[#D4882E]">
                                <span className="material-symbols-outlined text-3xl">spa</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold leading-none tracking-tight text-[#2E5339] dark:text-[#D4882E]"><LiveEditable collection="products_content" docId="uvsafesunscreen" field="name">JAMMI</LiveEditable></h1>
                                <span className="text-[10px] uppercase tracking-widest text-[#2E5339]/60 dark:text-[#D4882E]/60">PHARMACEUTICALS • EST. 1899</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Ailments</a>
                            <a className="text-sm font-medium text-[#D4882E] underline underline-offset-4" href="#">Wellness</a>
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Legacy</a>
                            <a className="text-sm font-medium hover:text-[#D4882E] transition-colors" href="#">Consult</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center bg-[#2E5339]/5 dark:bg-[#D4882E]/10 rounded-full px-4 py-2">
                                <span className="material-symbols-outlined text-[#2E5339]/60 dark:text-[#D4882E]/60 text-sm">search</span>
                                <input className="bg-transparent border-none outline-none focus:ring-0 text-sm placeholder:text-[#2E5339]/40 w-32 lg:w-48" placeholder="Search remedy..." type="text" />
                            </div>
                            <button className="p-2 hover:bg-[#2E5339]/5 rounded-full transition-colors relative">
                                <span className="material-symbols-outlined text-[#2E5339] dark:text-[#D4882E]">shopping_bag</span>
                                <span className="absolute top-1 right-1 bg-[#D4882E] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">2</span>
                            </button>
                            <button className="md:hidden p-2">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="flex text-xs uppercase tracking-widest text-slate-500 mb-8 gap-2">
                    <a className="hover:text-[#D4882E]" href="#">Home</a>
                    <span>/</span>
                    <a className="hover:text-[#D4882E]" href="#">Skin &amp; Hair Care</a>
                    <span>/</span>
                    <span className="text-[#2E5339] font-bold">UVSafe Sunscreen</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Hero Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-white rounded-xl overflow-hidden border border-[#2E5339]/5 shadow-sm group">
                            <img alt="UVSafe Sunscreen elegant packaging" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Jammi Pharmaceuticals UVSafe Sunscreen premium bottle on stone pedestal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm508BgjDHuNGWt_cPbUkhQswp9cjvrurYR13TBYGw2sDMR87twhpwAFqZWMBX3iSXXl1yfhcY3MXb_REPbmv-ysmY6oEyxw10vmzqA7K4YGyt5yloTDtsu6N_Zgc50oHO3jETacSwnAi6Z3QP_vcFfV5rZ1Zlb-CyXaRq_x0h86x5FknFX13B7Rxrvr7NyF2PJn3JIzwk0FHqIJebDNSlCmLJgZ0Kz4YAuRvupop_P0ZVkMP0pcmV75VXeJW0BZZtURUCCeF70gA" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square bg-white rounded-lg border-2 border-[#D4882E] overflow-hidden">
                                <img alt="Sunscreen texture" className="w-full h-full object-cover" data-alt="Creamy sunscreen texture being applied to skin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF368r9U90aGIDQ2m53N5s1XVKLlXD-tvnMUWmCd_rFaoqR_EC1bMxY8Xt7EzD4YH1ZGlKcogs4ddP44tSTvCGUT6tSlj_F72vjmCLEKmjWeqNTj0J_OFb8l9NFNJxu5g-sQwsHT4Zwt2TQNFY9vL_4ftRi9FINz9rCZ_rZX48gvstr4p_8e_go-R9dzTv-4WGpCmBjRV8Y7Nehq-CWruIm6Gts_XSzgWYyJWuKAOpOyfHUnZp6DLlhUOkCywtBCcFwLlOaWjrTrY" />
                            </div>
                            <div className="aspect-square bg-white rounded-lg border border-[#2E5339]/5 overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                                <img alt="Saffron ingredients" className="w-full h-full object-cover" data-alt="Kashmiri saffron threads in a wooden bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeJYlPvYZXzgO2YyYDNugG1wAMz_4QIO1C14jnIUWAUh0zltrkg0RlBVDJGafM-dchJGOdAoX5-Qq6pcOO7MC9tEt9QsYxTDH_rvDvZYRz0YMwfP3uYCEmOpn_8O8LN3FD7cj1GN7MABLVTaiAb8ND3yP1shc7pBN1YE_Jhst-WS_24twFQa9ADmYOLmBNlxpEmFq2bLasMnpGNwabnnedG1SNV7wWUIJ5NXLilYiz6hqXjhuUfRUtE0NCj_rolEAYtpM894Tw2wY" />
                            </div>
                            <div className="aspect-square bg-white rounded-lg border border-[#2E5339]/5 overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                                <img alt="Aloe vera extract" className="w-full h-full object-cover" data-alt="Fresh aloe vera plant slices with gel dripping" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMS-AZKFWSJjUKB9OOXL4mYpPqhVGUlA5F7xIe7hVvyZw0HDbj9VzmvxR9dhGN82T9a5oL08UIlZUA1zoNIEX45G3GNZOoq1MOH6L__xP4ggkTWwxoDcnlLbuUunjd7PEHwTr-pQP7hrO1rg6e9LiBzU5RbBnVJQ2fPU9H2ygIjbDDmtgycWQjbiBGYVwONQJ9BsgojRavxn3ud8ONb_YGeuNT7eQL_86bVxXo76hv5ICGLK7_7XWzc1Wahks2dC6M6f3ZoTIS2xE" />
                            </div>
                            <div className="aspect-square bg-white rounded-lg border border-[#2E5339]/5 overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                                <img alt="Legacy factory" className="w-full h-full object-cover" data-alt="Vintage black and white photo of an Ayurvedic pharmacy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1_RgKaoN5sxyuii42QizizvTLNGo0_7Wcy_pL0unERlzdQF4Ys2YY8-HBSATzSmJuuiNwxDvUdHP-XK5LiWQRmi0X6BrNrvjMnODwOxWsv9vN9xLm9nBTZSCz6Nn1vCKAa7Pk6gEFPTN1LVVP07kkAFjG0DHkPg3AC-sD-BoKWpFpS6vE_0M2Ks-ggz_i4Rjjb2VJswr34TFJ9EXDOKLJbPRV8ftCFpYXRZfDw4VN3Aa5sw2Lk7qT1PFimk5shMfWBcQbXvK8F48" />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-[#2E5339] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">125-Year Heritage</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] text-[#2E5339] mb-4 leading-tight">UVSafe Ayurvedic Protection SPF 50</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-[#D4882E]">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined">star_half</span>
                            </div>
                            <span className="text-sm font-medium text-slate-600">4.8 (1,250 Reviews)</span>
                        </div>

                        <div className="mb-8">
                            <p className="text-3xl font-['DM_Sans',sans-serif] font-bold text-[#2E5339]">₹845.00 <span className="text-lg font-normal text-slate-400 line-through ml-2">₹1,150.00</span></p>
                            <p className="text-sm text-[#D4882E] font-medium mt-1">Inclusive of all taxes</p>
                        </div>

                        <div className="p-6 bg-white rounded-xl border border-[#2E5339]/5 mb-8">
                            <h3 className="font-['Playfair_Display',serif] text-xl text-[#2E5339] mb-4">Key Benefits</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#D4882E] text-xl">shield_moon</span>
                                    <div>
                                        <p className="font-bold text-[#2E5339] text-sm">Triple-Shield Protection</p>
                                        <p className="text-sm text-slate-600">Broad spectrum defense against UVA, UVB, and Blue Light.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#D4882E] text-xl">auto_awesome</span>
                                    <div>
                                        <p className="font-bold text-[#2E5339] text-sm">Natural Golden Glow</p>
                                        <p className="text-sm text-slate-600">Infused with Kashmiri Saffron for instant skin brightening.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-[#D4882E] text-xl">water_drop</span>
                                    <div>
                                        <p className="font-bold text-[#2E5339] text-sm">Non-Greasy Formula</p>
                                        <p className="text-sm text-slate-600">Ayurvedic oils that absorb instantly without a white cast.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <div className="flex items-center border border-[#2E5339]/20 rounded-lg overflow-hidden h-14 w-full sm:w-32 bg-white">
                                <button className="flex-1 hover:bg-[#2E5339]/5 transition-colors h-full flex items-center justify-center"><span className="material-symbols-outlined text-sm">remove</span></button>
                                <span className="flex-1 text-center font-bold">1</span>
                                <button className="flex-1 hover:bg-[#2E5339]/5 transition-colors h-full flex items-center justify-center"><span className="material-symbols-outlined text-sm">add</span></button>
                            </div>
                            <button className="flex-[2] bg-[#D4882E] hover:bg-[#D4882E]/90 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4882E]/20">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                Add to Cart
                            </button>
                            <button className="flex-1 border-2 border-[#2E5339] text-[#2E5339] hover:bg-[#2E5339] hover:text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center">
                                Buy Now
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-[#2E5339]/10 pt-8">
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-[#2E5339]">verified_user</span>
                                CLINICALLY TESTED
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-[#2E5339]">psychology_alt</span>
                                AYUSH CERTIFIED
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-[#2E5339]">cruelty_free</span>
                                CRUELTY FREE
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                <span className="material-symbols-outlined text-[#2E5339]">eco</span>
                                PARABEN FREE
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <section className="mt-24 space-y-16">
                    {/* Description */}
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2E5339] mb-6">The Jammi Legacy</h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-['DM_Sans',sans-serif]">
                            UVSafe is not just a sunscreen; it's a century-old Ayurvedic recipe refined for the modern world. Developed by the master pharmacists at Jammi, our formula uses the cooling properties of Aloe Vera and the restorative power of Saffron to protect your skin from the harshest sun while treating underlying pigmentation.
                        </p>
                    </div>

                    {/* Ingredients */}
                    <div className="bg-[#2E5339] text-white rounded-3xl p-12 overflow-hidden relative">
                        <div className="absolute -right-20 -top-20 opacity-10">
                            <span className="material-symbols-outlined text-[300px]">spa</span>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-['Playfair_Display',serif] mb-8 text-[#D4882E]">Natural Potency</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                            <span className="material-symbols-outlined text-[#D4882E] text-3xl">flare</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Pure Saffron</h4>
                                            <p className="text-sm text-white/70">Handpicked Kashmiri Saffron threads known for skin brightening.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                            <span className="material-symbols-outlined text-[#D4882E] text-3xl">water_drop</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Aloe Vera</h4>
                                            <p className="text-sm text-white/70">Premium organic pulp to cool and hydrate sun-exposed skin.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                            <span className="material-symbols-outlined text-[#D4882E] text-3xl">grass</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Manjistha</h4>
                                            <p className="text-sm text-white/70">Potent herb to detoxify skin and prevent sun spots.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                                            <span className="material-symbols-outlined text-[#D4882E] text-3xl">waves</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Zinc Oxide</h4>
                                            <p className="text-sm text-white/70">Natural mineral filter for immediate UVA/UVB protection.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <img alt="Natural ingredients layout" className="rounded-2xl shadow-2xl" data-alt="Artistic flatlay of saffron threads, aloe leaves, and Ayurvedic herbs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0990vxKhTWjn0aLD0RmVCaWuSmT9alB606Bd8Iv9vNForz_1FuzyzMv-LrOVZcIWHdDHIql0DpJ6Zs6s6rt6M2v6pVZzbjBcHaXEJQSnSgbgA9T4-EylUcbAv0Y8sfx8eLF65qDtx7JS7b2Ub2TRAyY5XdUtEPZB1FvxcFLbnRGfzCKiilXBUazw_MCPFZ37R6x-9xYTElxXOB7r0E4SncO0Mfbo-GYiSYK5AAr_mT46YHUnZ7aanioukznn0MHcAP42VZzKPL70" />
                            </div>
                        </div>
                    </div>

                    {/* How to Use */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white rounded-xl border border-[#2E5339]/5 shadow-sm">
                            <div className="w-12 h-12 bg-[#D4882E]/10 text-[#D4882E] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
                            <h3 className="font-['Playfair_Display',serif] text-xl text-[#2E5339] mb-2">Cleanse</h3>
                            <p className="text-slate-600 text-sm">Wash your face with a mild herbal cleanser and pat dry.</p>
                        </div>
                        <div className="text-center p-8 bg-white rounded-xl border border-[#2E5339]/5 shadow-sm">
                            <div className="w-12 h-12 bg-[#D4882E]/10 text-[#D4882E] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
                            <h3 className="font-['Playfair_Display',serif] text-xl text-[#2E5339] mb-2">Apply</h3>
                            <p className="text-slate-600 text-sm">Apply a pea-sized amount evenly across face and neck.</p>
                        </div>
                        <div className="text-center p-8 bg-white rounded-xl border border-[#2E5339]/5 shadow-sm">
                            <div className="w-12 h-12 bg-[#D4882E]/10 text-[#D4882E] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
                            <h3 className="font-['Playfair_Display',serif] text-xl text-[#2E5339] mb-2">Wait</h3>
                            <p className="text-slate-600 text-sm">Allow 15 minutes for absorption before sun exposure.</p>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2E5339] mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="group bg-white rounded-xl border border-[#2E5339]/5 overflow-hidden" open>
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-[#2E5339]">Does it leave a white cast on darker skin tones?</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-600 border-t border-[#2E5339]/5">
                                    Our unique micronized Zinc Oxide combined with Saffron oil ensures a transparent, glowing finish on all skin tones without any chalky residue.
                                </div>
                            </details>
                            <details className="group bg-white rounded-xl border border-[#2E5339]/5 overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-[#2E5339]">Is it suitable for acne-prone skin?</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-600 border-t border-[#2E5339]/5">
                                    Yes, the non-comedogenic formula contains Neem and Aloe Vera which help soothe active inflammation while providing sun protection.
                                </div>
                            </details>
                            <details className="group bg-white rounded-xl border border-[#2E5339]/5 overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-[#2E5339]">How often should I reapply?</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="p-6 pt-0 text-slate-600 border-t border-[#2E5339]/5">
                                    For continuous protection, we recommend reapplying every 3-4 hours if you are outdoors or after swimming and sweating.
                                </div>
                            </details>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="border-t border-[#2E5339]/10 pt-16">
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="w-full md:w-1/3">
                                <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2E5339] mb-6">Real Experiences</h2>
                                <div className="bg-white p-8 rounded-2xl border border-[#2E5339]/5 shadow-sm text-center">
                                    <p className="text-6xl font-bold text-[#2E5339] mb-2">4.8</p>
                                    <div className="flex justify-center text-[#D4882E] mb-2">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                    <p className="text-slate-500 text-sm">Based on 1,250 verified purchasers</p>

                                    <div className="mt-8 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-4">5</span>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D4882E]" style={{ width: '85%' }}></div>
                                            </div>
                                            <span className="text-xs text-slate-400 w-8">85%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-4">4</span>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D4882E]" style={{ width: '10%' }}></div>
                                            </div>
                                            <span className="text-xs text-slate-400 w-8">10%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-4">3</span>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D4882E]" style={{ width: '3%' }}></div>
                                            </div>
                                            <span className="text-xs text-slate-400 w-8">3%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-4">2</span>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D4882E]" style={{ width: '1%' }}></div>
                                            </div>
                                            <span className="text-xs text-slate-400 w-8">1%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-4">1</span>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#D4882E]" style={{ width: '1%' }}></div>
                                            </div>
                                            <span className="text-xs text-slate-400 w-8">1%</span>
                                        </div>
                                    </div>

                                    <button className="w-full mt-8 py-3 bg-[#2E5339] text-white rounded-lg font-bold hover:bg-[#2E5339]/90 transition-colors">Write a Review</button>
                                </div>
                            </div>

                            <div className="w-full md:w-2/3 space-y-8">
                                <div className="border-b border-[#2E5339]/5 pb-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#2E5339]/10 flex items-center justify-center font-bold text-[#2E5339]">AK</div>
                                            <div>
                                                <p className="font-bold text-[#2E5339]">Ananya K.</p>
                                                <p className="text-xs text-slate-400">Verified Buyer • 2 weeks ago</p>
                                            </div>
                                        </div>
                                        <div className="flex text-[#D4882E] text-sm">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 font-['DM_Sans',sans-serif]">Finally a physical sunscreen that doesn't make me look like a ghost! The saffron gives a really lovely warmth to the skin. Love the legacy behind this brand.</p>
                                </div>
                                <div className="border-b border-[#2E5339]/5 pb-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#2E5339]/10 flex items-center justify-center font-bold text-[#2E5339]">RV</div>
                                            <div>
                                                <p className="font-bold text-[#2E5339]">Rohan V.</p>
                                                <p className="text-xs text-slate-400">Verified Buyer • 1 month ago</p>
                                            </div>
                                        </div>
                                        <div className="flex text-[#D4882E] text-sm">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined">star</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 font-['DM_Sans',sans-serif]">Very cooling on the skin. I live in a humid city and this doesn't feel sticky at all. It's become a staple in my daily routine.</p>
                                </div>
                                <button className="w-full py-4 text-[#2E5339] font-bold flex items-center justify-center gap-2 hover:bg-[#2E5339]/5 rounded-xl transition-colors">
                                    Load More Reviews
                                    <span className="material-symbols-outlined">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#2E5339] text-white mt-24 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-[#D4882E] text-4xl">spa</span>
                                <h2 className="text-2xl font-bold tracking-tight">JAMMI</h2>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed mb-6">
                                Bridging the wisdom of 125 years of Ayurvedic practice with modern scientific precision. Healing generations since 1899.
                            </p>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4882E] transition-colors" href="#">
                                    <span className="material-symbols-outlined">public</span>
                                </a>
                                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4882E] transition-colors" href="#">
                                    <span className="material-symbols-outlined">share</span>
                                </a>
                                <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4882E] transition-colors" href="#">
                                    <span className="material-symbols-outlined">chat</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-['Playfair_Display',serif] text-lg text-[#D4882E] mb-6">Shop</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Skin Care</a></li>
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Hair Care</a></li>
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Digestive Health</a></li>
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Immunity Boosters</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-['Playfair_Display',serif] text-lg text-[#D4882E] mb-6">Information</h4>
                            <ul className="space-y-4 text-white/60 text-sm">
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Our 125-Year Story</a></li>
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Ayurvedic Principles</a></li>
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Clinicals &amp; Research</a></li>
                                <li><a className="hover:text-[#D4882E] transition-colors" href="#">Track Order</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-['Playfair_Display',serif] text-lg text-[#D4882E] mb-6">Experience Jammi</h4>
                            <p className="text-sm text-white/60 mb-4">Join our community for traditional wellness wisdom and exclusive offers.</p>
                            <div className="flex">
                                <input className="col-span-2 bg-white/10 border-none outline-none focus:ring-1 focus:ring-[#D4882E] rounded-l-lg text-sm w-full py-3 px-4" placeholder="Email address" type="email" />
                                <button className="bg-[#D4882E] px-6 rounded-r-lg font-bold hover:bg-[#D4882E]/90 transition-colors">Join</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                        <p>© 2024 Jammi Pharmaceuticals. All Rights Reserved.</p>
                        <div className="flex gap-6">
                            <a className="hover:text-white" href="#">Privacy Policy</a>
                            <a className="hover:text-white" href="#">Terms of Service</a>
                            <a className="hover:text-white" href="#">Refund Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UVSafeSunscreen;
