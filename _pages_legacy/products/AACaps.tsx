"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const AACaps: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8f6f6] dark:bg-[#221610] font-['Public_Sans',sans-serif] text-slate-900 dark:text-slate-100 transition-colors duration-200 relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 md:px-20 lg:px-40 bg-[#f8f6f6] dark:bg-[#221610] sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-[#ec5b13]">
                        <div className="size-8 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">medical_services</span>
                        </div>
                        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Jammi</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <nav className="hidden md:flex gap-6 mr-6">
                            <a className="text-sm font-medium hover:text-[#ec5b13] transition-colors" href="#">Products</a>
                            <a className="text-sm font-medium hover:text-[#ec5b13] transition-colors" href="#">About Us</a>
                            <a className="text-sm font-medium hover:text-[#ec5b13] transition-colors" href="#">Science</a>
                        </nav>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/20 transition-all">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#ec5b13]/10 text-[#ec5b13] hover:bg-[#ec5b13]/20 transition-all">
                                <span className="material-symbols-outlined">share</span>
                            </button>
                        </div>
                        <div className="bg-[#ec5b13]/20 rounded-full size-10 flex items-center justify-center overflow-hidden border border-[#ec5b13]/30">
                            <span className="material-symbols-outlined text-[#ec5b13]">person</span>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    <div className="max-w-[1200px] mx-auto px-4 py-8 md:px-10">
                        {/* Hero Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <div className="w-full">
                                <div className="relative group aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <img className="w-full h-full object-contain p-4" data-alt="Jammi's AA Caps product box and blister pack" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoANmldJGN2ei3HxNd-AzSTUKm3xyVLCRDvX_fIRbGMxoe4I7rNsK4h-9azLvGOQycjx1q5YFSATmriZ8LuM-SITFKB85NDXnB96TRZBrUOrBeCfXKaijHV-jmZRtEb1OhN-5q5eOnWfShz_lVblrMQnps_N7Cvio3JSkEW6epKzQ4i37bprMovllgLpIzOSw23Lu3bMQvdJ-7VQLW0gu3ndbHznyCWZF8UJ3zkkJhlYy0yArD54yh7OfUgSbanzltpQkfPppv10M" />
                                    <div className="absolute top-4 left-4 bg-[#ec5b13] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Top Rated</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-[#ec5b13]">
                                        <img className="w-full h-full object-cover" data-alt="Close up of AA Caps capsules" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYhYMrFX0Vw_q--1O-65kVdt42Oxv0cSS5yzFOF9Yev_sEvM6Emu5TzVtY-AT3wuci2MCVWrrhlUu_aBsXgE0wc1QIJTTEf8rAwzucmEYes9nr4FHsnIJ6GqbhS3AI5Ppyd5vx-6Sb7_HkVRhHLeLD8SCyqlNU8Iy_-0tVhcqW7VMX2e1jLz8GuLW9H9OFn2OZ9eHymoY5VydRr0m4xb3LQnyGspz18zI4QHzeU4ewf4LTMkBrS6ofXf_smONLgT-7CeU8g_Dgreg" />
                                    </div>
                                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                                        <div className="w-full h-full bg-gradient-to-br from-[#ec5b13]/10 to-[#ec5b13]/30 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[#ec5b13]">medication</span>
                                        </div>
                                    </div>
                                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                                        <div className="w-full h-full bg-gradient-to-br from-[#ec5b13]/10 to-[#ec5b13]/30 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[#ec5b13]">eco</span>
                                        </div>
                                    </div>
                                    <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700">
                                        <div className="w-full h-full bg-gradient-to-br from-[#ec5b13]/10 to-[#ec5b13]/30 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[#ec5b13]">science</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product Info */}
                            <div className="flex flex-col gap-6">
                                <div>
                                    <span className="text-[#ec5b13] font-semibold tracking-wide text-sm uppercase">Wellness / Therapeutics</span>
                                    <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black leading-tight tracking-tight mt-2"><LiveEditable collection="products_content" docId="aacaps" field="name">AA Caps (Breathe Easy)</LiveEditable></h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-lg mt-2">By Jammi Pharmaceuticals</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1 text-[#ec5b13]">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined">star_half</span>
                                            <span className="text-slate-900 dark:text-slate-100 font-bold ml-2">4.8</span>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Based on 128 verified reviews</p>
                                    </div>
                                    <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">$24.99</p>
                                        <p className="text-xs text-amber-600 font-medium">In Stock &amp; Ready to Ship</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg"><LiveEditable collection="products_content" docId="aacaps" field="description" multiline>AA Caps is a scientifically formulated therapeutic supplement designed to relieve respiratory tract disorders. Crafted with potent Ayurvedic herbs, it helps clear congestion and promotes effortless breathing.</LiveEditable></p>
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 justify-between">
                                            <button className="text-[#ec5b13] hover:bg-[#ec5b13]/10 rounded-lg p-1 transition-colors"><span className="material-symbols-outlined">remove</span></button>
                                            <span className="font-bold">1</span>
                                            <button className="text-[#ec5b13] hover:bg-[#ec5b13]/10 rounded-lg p-1 transition-colors"><span className="material-symbols-outlined">add</span></button>
                                        </div>
                                        <button className="flex-2 bg-[#ec5b13] text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined">shopping_bag</span>
                                            Add to Cart
                                        </button>
                                    </div>
                                    <button className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
                                        Buy it now
                                    </button>
                                </div>
                                {/* Key Benefits */}
                                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
                                    <h3 className="text-xl font-bold mb-4">Key Benefits</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#ec5b13] bg-[#ec5b13]/10 p-2 rounded-lg">air</span>
                                            <div>
                                                <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="aacaps" field="benefit1Title">Respiratory Relief</LiveEditable></p>
                                                <p className="text-xs text-slate-500"><LiveEditable collection="products_content" docId="aacaps" field="benefit1Desc" multiline>Helps in clearing the respiratory tract.</LiveEditable></p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#ec5b13] bg-[#ec5b13]/10 p-2 rounded-lg">shield</span>
                                            <div>
                                                <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="aacaps" field="benefit2Title">Immune Support</LiveEditable></p>
                                                <p className="text-xs text-slate-500"><LiveEditable collection="products_content" docId="aacaps" field="benefit2Desc" multiline>Strengthens natural defense mechanisms.</LiveEditable></p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#ec5b13] bg-[#ec5b13]/10 p-2 rounded-lg">spa</span>
                                            <div>
                                                <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="aacaps" field="benefit3Title">100% Herbal</LiveEditable></p>
                                                <p className="text-xs text-slate-500"><LiveEditable collection="products_content" docId="aacaps" field="benefit3Desc" multiline>No synthetic additives or chemicals.</LiveEditable></p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-[#ec5b13] bg-[#ec5b13]/10 p-2 rounded-lg">verified</span>
                                            <div>
                                                <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="aacaps" field="benefit4Title">Fast Acting</LiveEditable></p>
                                                <p className="text-xs text-slate-500"><LiveEditable collection="products_content" docId="aacaps" field="benefit4Desc" multiline>Quick absorption for faster relief.</LiveEditable></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Details Tabs Style Sections */}
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Ingredients */}
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#ec5b13]">eco</span> Ingredients
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex flex-col pb-4 border-b border-slate-100 dark:border-slate-700">
                                        <span className="font-bold text-lg text-[#ec5b13]">Vasa</span>
                                        <span className="text-slate-500 text-sm italic">Adhatoda vasica</span>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Known for its potent anti-inflammatory and bronchodilatory properties.</p>
                                    </li>
                                    <li className="flex flex-col pb-4 border-b border-slate-100 dark:border-slate-700">
                                        <span className="font-bold text-lg text-[#ec5b13]">Tulsi</span>
                                        <span className="text-slate-500 text-sm italic">Ocimum sanctum</span>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Holy Basil, an adaptogen that boosts immunity and clears mucus.</p>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="font-bold text-lg text-[#ec5b13]">Yashtimadhu</span>
                                        <span className="text-slate-500 text-sm italic">Glycyrrhiza glabra</span>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Licorice root that soothes the throat and eases irritation.</p>
                                    </li>
                                </ul>
                            </div>
                            {/* How to Use */}
                            <div className="bg-[#ec5b13] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined">schedule</span> How to Use
                                    </h3>
                                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30">
                                        <div className="text-5xl font-black mb-2">1 <span className="text-xl">Capsule</span></div>
                                        <p className="text-lg font-medium">Twice Daily</p>
                                        <p className="mt-4 text-white/80 text-sm leading-relaxed">
                                            For best results, take one capsule in the morning and one in the evening after meals with lukewarm water.
                                        </p>
                                    </div>
                                    <div className="mt-8 flex items-start gap-3 text-sm bg-black/10 p-4 rounded-lg">
                                        <span className="material-symbols-outlined text-white">info</span>
                                        <p>Consult your healthcare provider if you are pregnant, nursing, or taking other medications.</p>
                                    </div>
                                </div>
                                <div className="absolute -right-10 -bottom-10 opacity-10">
                                    <span className="material-symbols-outlined text-[200px]">medication</span>
                                </div>
                            </div>
                            {/* Reviews Summary */}
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#ec5b13]">reviews</span> Reviews
                                </h3>
                                <div className="flex items-center gap-4 mb-8">
                                    <p className="text-5xl font-black text-slate-900 dark:text-slate-100">4.8</p>
                                    <div>
                                        <div className="flex text-[#ec5b13]">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        </div>
                                        <p className="text-slate-500 text-xs">Based on 128 reviews</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                        <p className="text-sm font-bold">5</p>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div className="h-full bg-[#ec5b13] rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                        <p className="text-slate-500 text-xs text-right">80%</p>
                                    </div>
                                    <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                        <p className="text-sm font-bold">4</p>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div className="h-full bg-[#ec5b13] rounded-full" style={{ width: '12%' }}></div>
                                        </div>
                                        <p className="text-slate-500 text-xs text-right">12%</p>
                                    </div>
                                    <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                        <p className="text-sm font-bold">3</p>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div className="h-full bg-[#ec5b13] rounded-full" style={{ width: '5%' }}></div>
                                        </div>
                                        <p className="text-slate-500 text-xs text-right">5%</p>
                                    </div>
                                    <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                        <p className="text-sm font-bold">2</p>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div className="h-full bg-[#ec5b13] rounded-full" style={{ width: '2%' }}></div>
                                        </div>
                                        <p className="text-slate-500 text-xs text-right">2%</p>
                                    </div>
                                    <div className="grid grid-cols-[20px_1fr_40px] items-center gap-3">
                                        <p className="text-sm font-bold">1</p>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                                            <div className="h-full bg-[#ec5b13] rounded-full" style={{ width: '1%' }}></div>
                                        </div>
                                        <p className="text-slate-500 text-xs text-right">1%</p>
                                    </div>
                                </div>
                                <button className="w-full mt-8 border border-slate-200 dark:border-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    Read all reviews
                                </button>
                            </div>
                        </div>
                        {/* Individual Review Snippet */}
                        <div className="mt-12 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-[#ec5b13]/20 flex items-center justify-center font-bold text-[#ec5b13]">JD</div>
                                    <div>
                                        <p className="font-bold">John Doe</p>
                                        <p className="text-xs text-slate-500"><LiveEditable collection="products_content" docId="aacaps" field="benefit5Desc" multiline>Verified Buyer • 2 weeks ago</LiveEditable></p>
                                    </div>
                                </div>
                                <div className="flex text-[#ec5b13]">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400">"I've been using AA Caps for my seasonal allergies and persistent cough. Within a week, I noticed a significant difference in my breathing clarity. It's much easier to breathe during my morning runs now!"</p>
                        </div>
                    </div>
                </main>
                {/* Footer */}
                <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-20 lg:px-40 mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1200px] mx-auto">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 text-white mb-6">
                                <span className="material-symbols-outlined text-[#ec5b13]">medical_services</span>
                                <span className="text-xl font-bold">Jammi Pharmaceuticals</span>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Trusted traditional healing backed by modern science. Providing effective therapeutic solutions since 1901.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Shop All</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Store Locator</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Our History</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Quality Standards</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Shipping Policy</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Returns &amp; Refunds</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Contact Support</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">FAQs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Subscribe</h4>
                            <p className="text-sm mb-4">Join our wellness community for tips and updates.</p>
                            <div className="flex gap-2">
                                <input className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm flex-1 focus:ring-2 focus:ring-[#ec5b13]" placeholder="Email address" type="email" />
                                <button className="bg-[#ec5b13] text-white p-2 rounded-lg"><span className="material-symbols-outlined">send</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row justify-between gap-4">
                        <p>© 2024 Jammi Pharmaceuticals. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AACaps;
