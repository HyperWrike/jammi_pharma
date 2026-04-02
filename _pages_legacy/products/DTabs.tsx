"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const DTabs: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8f6f6] dark:bg-[#221610] font-['Public_Sans',sans-serif] text-slate-800 dark:text-slate-200 transition-colors duration-200 relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {/* Modern Navigation */}
                <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-[#221610]/70 border-b border-slate-200 dark:border-slate-800 transition-all">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="bg-gradient-to-br from-[#ec5b13] to-orange-400 p-2 rounded-xl text-white shadow-lg shadow-[#ec5b13]/20 group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-2xl">medical_services</span>
                            </div>
                            <h2 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Jammi</h2>
                        </div>
                        <nav className="hidden md:flex gap-8">
                            <a className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#ec5b13] hover:after:scale-x-100 after:transition-transform after:origin-bottom-right hover:after:origin-bottom-left pt-2 pb-1" href="#benefits">Benefits</a>
                            <a className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#ec5b13] hover:after:scale-x-100 after:transition-transform after:origin-bottom-right hover:after:origin-bottom-left pt-2 pb-1" href="#ingredients">Ingredients</a>
                            <a className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors relative after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#ec5b13] hover:after:scale-x-100 after:transition-transform after:origin-bottom-right hover:after:origin-bottom-left pt-2 pb-1" href="#reviews">Reviews</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="hidden sm:flex text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] transition-colors">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                            <button className="relative bg-[#ec5b13]/10 hover:bg-[#ec5b13]/20 text-[#ec5b13] p-2 rounded-full transition-colors">
                                <span className="material-symbols-outlined">shopping_bag</span>
                                <span className="absolute -top-1 -right-1 bg-[#ec5b13] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                            </button>
                            <button className="md:hidden text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    {/* Hero Section with Custom Clip Path */}
                    <div className="bg-[#ec5b13]/5 dark:bg-[#221610] pb-32 pt-16 relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)' }}>
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ec5b13]/10 to-transparent opacity-50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                {/* Text Content */}
                                <div className="order-2 lg:order-1 flex flex-col items-start gap-6 relative">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5b13]/10 border border-[#ec5b13]/20 text-[#ec5b13] text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
                                        <span className="w-2 h-2 rounded-full bg-[#ec5b13] animate-pulse"></span>
                                        Therapeutics / D-Tabs
                                    </div>
                                    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight"><LiveEditable collection="products_content" docId="dtabs" field="name">Empower Your<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec5b13] to-amber-500">Metabolism.</span></LiveEditable></h1>
                                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl left-border pl-4 border-l-4 border-[#ec5b13]/30">
                                        D-Tabs is an advanced Ayurvedic formulation scientifically designed by Jammi to manage non-insulin dependent diabetes naturally and effectively.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                                        <button className="bg-[#ec5b13] hover:bg-orange-600 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-[#ec5b13]/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 active:scale-95">
                                            <span>Add to Cart - $34.99</span>
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                        <button className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-[#ec5b13] dark:hover:border-[#ec5b13] font-bold text-lg py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
                                            Read the Science
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4 mt-6">
                                        <div className="flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden"><img className="w-full h-full object-cover" data-alt="Customer avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTF6EMFbzHtuqJAy3fhbqsf_a-VUgMpihN2r2G8RQYa9RfTcM14Gw6IN-86j14R5I536s5EZ--g1iPw5azmxWQSH6kpGUgxzCqQQIIporA-a6ST6mQwoxhlKuxjILPaqmCOcB4zogjjpYy0wT3rUX5mvhqSP4iqnM3SryZCgGZCBK6FkeXF-Mp9rEDHnX4jcDF_JRCPcIWMjEh64wzMvToyX6Cni-pIKzlcF4WEyl_Wv7OWTuGlNuKAEqRx3GWdMFu0d7x9jYASPY" /></div>
                                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden"><img className="w-full h-full object-cover" data-alt="Customer avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANqkW3wogAJal_oMc3ESYrASi570DubP__fRr9p9KQFrn0pYqIFLBhUL2JIoHOiZuamxVwc-AIkj3uBke0vkJZjttlPEreTdgNDGVK5_m8Tl2WsxRFHnuuigtYMxnwlEHLy3yEIqxIYEWUJbzGEQ7h1F1qg96F8k9HG2dclfWOpzkA-mR6N0xNBTVA3fyopICJtBuccZ7QM8CEuHsPKAI9kJpDoTT6GTFYO7S_aHwESYuOejmrhOEh4PVtNeTfWJAjKyHJnNvbEiw" /></div>
                                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden"><img className="w-full h-full object-cover" data-alt="Customer avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6LwsQ7GgKeQpdceJidTqnxr6v3-H0RGUQHkz-1RtbyFdHQlQP6aWuIiWSBtWqRu6UXl98KQqouj4F9PkPhDPMDesyL-T_ErAx7hmhEWk73LSRqDbB6GXyAGWT3VSa41ISxtQn_iX4Rx0HpJeMpIY3XhecHxw_sF53FaF2u8nKx41QMbH6QWGVCd6U5caIjFl7T8VUvUQhlCVJQSl1ljCIrqAr3c_hJiKJvaAs5ZCZSKDY1wNtFIgdyJCFKxJxhJ5FmmOrOGrUlC0" /></div>
                                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-[#ec5b13] flex items-center justify-center text-white text-xs font-bold tracking-tighter">+5k</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex text-amber-400 text-sm">
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                            </div>
                                            <span className="text-xs font-medium text-slate-500">4.8/5 from verified doctors</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Product Image */}
                                <div className="order-1 lg:order-2 relative flex justify-center perspective-[1000px]">
                                    <div className="relative w-[300px] h-[400px] lg:w-[400px] lg:h-[500px] z-10 transition-transform duration-700 hover:rotate-y-12 hover:scale-105 drop-shadow-2xl">
                                        <img className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(236,91,19,0.3)]" data-alt="D-Tabs Product Packaging, Premium Quality Bottle" src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&amp;w=2030&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                    </div>
                                    {/* Floating specific badges */}
                                    <div className="absolute top-1/4 -left-8 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                                        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2 rounded-lg">
                                            <span className="material-symbols-outlined">health_metrics</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold leading-tight">Blood Sugar</span>
                                            <span className="text-xs text-slate-500">Regulated Naturally</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1/4 -right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                                        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                                            <span className="material-symbols-outlined">vital_signs</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold leading-tight">Energy</span>
                                            <span className="text-xs text-slate-500">Sustained Release</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Benefits Section */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="benefits">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-[#ec5b13] font-bold tracking-widest uppercase text-sm mb-2">Why D-Tabs?</h2>
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">A holistic approach to metabolic wellness.</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Benefit 1 */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all group cursor-default">
                                <div className="w-14 h-14 bg-orange-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-[#ec5b13] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">psychology</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Improves Insulin Sensitivity</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Actively works at the cellular level to enhance your body's natural response to insulin, promoting better glucose uptake.</p>
                            </div>
                            {/* Benefit 2 */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all group cursor-default">
                                <div className="w-14 h-14 bg-orange-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-[#ec5b13] mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">local_pharmacy</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Tones The Pancreas</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Provides deep nourishment to pancreatic cells, aiding in their rejuvenation and supporting optimal beta-cell function over time.</p>
                            </div>
                            {/* Benefit 3 */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all group cursor-default">
                                <div className="w-14 h-14 bg-orange-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-[#ec5b13] mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">monitor_weight</span>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Alleviates Complications</h4>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">Proactively helps reduce common secondary complaints like extreme fatigue, frequent urination, and excessive thirst.</p>
                            </div>
                        </div>
                    </section>
                    {/* Key Ingredients Split Section */}
                    <section className="bg-slate-900 text-white py-24 overflow-hidden relative" id="ingredients">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ec5b13]/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-[#ec5b13] font-bold tracking-widest uppercase text-sm mb-2">The Formulation</h2>
                                    <h3 className="text-4xl font-black mb-6">Nature's Most Potent Glycemic Regulators.</h3>
                                    <p className="text-slate-400 leading-relaxed mb-10 text-lg">Every tablet is a precisely calibrated dose of ancient wisdom, standardized for modern efficacy.</p>
                                    <div className="space-y-6">
                                        <div className="flex gap-4 group">
                                            <div className="mt-1">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[#ec5b13] transition-colors">
                                                    <span className="w-2 h-2 rounded-full bg-[#ec5b13]"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-200">Gudmar (Gymnema sylvestre)</h4>
                                                <p className="text-slate-500 text-sm mt-1">Known as the "sugar destroyer," it temporarily suppresses sweet cravings and aids in pancreatic cell regeneration.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 group">
                                            <div className="mt-1">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[#ec5b13] transition-colors">
                                                    <span className="w-2 h-2 rounded-full bg-[#ec5b13]"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-200">Karela (Momordica charantia)</h4>
                                                <p className="text-slate-500 text-sm mt-1">Rich in charantin, it mimics insulin and facilitates faster cellular glucose metabolism.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 group">
                                            <div className="mt-1">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[#ec5b13] transition-colors">
                                                    <span className="w-2 h-2 rounded-full bg-[#ec5b13]"></span>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-slate-200">Jamun Seed (Syzygium cumini)</h4>
                                                <p className="text-slate-500 text-sm mt-1">Contains jamboline, which physically prevents the conversion of starch into sugar within the digestive tract.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square rounded-full border border-slate-800 relative animate-[spin_60s_linear_infinite]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 overflow-hidden">
                                            <img className="w-full h-full object-cover" data-alt="Gymnema sylvestre leaves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8F2hB5g7eTj7yvJq1d5843nQ2Gj1729EcFz02zK2f-_1eGg6x034S3hHl2gI6E3I64I5wVnDz-91hF6rG5q49YjB1jLh55B3L51l3-1-3B_G5I_tV4g0Gk8h2O4sYVwHkU4aT0m0oBzNlz1Ecwz01_Z5lO_2j1k4iR_O_9x2Gz8tBIf6kIqM2c4zIQwMvC2g" />
                                        </div>
                                        <div className="absolute bottom-1/4 -right-4 w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 overflow-hidden">
                                            <img className="w-full h-full object-cover" data-alt="Bitter melon pieces" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBTnEDHyB9yQwgED_IPe-OJCRz5hqBedDCGTtvsAoFX_vxzN7DGSxh8DuwJsg-Ajo8no8jdnLDUq6NXYDw3W2JrUh_q531tJgMae8ccD5rsVbl6vNgXrg-4g9hDNUw0qSmWjzQq3R6PWXaXSVPMbNbLWlLqGmAfWtfNFAu7ZJf3gz3x2mecWDWq_g7ykpgqQfwQNVs_ZzYpOfs3AKgeveOiTDcgF271FDjODEUq89xxqxSsi7429v7KaseutiQfkjD_Nhnipp9jKs" />
                                        </div>
                                        <div className="absolute bottom-1/4 -left-4 w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 overflow-hidden">
                                            <img className="w-full h-full object-cover" data-alt="Jamun seeds clustered" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_sQ2H-Fk2sO_mGk-5T4fX4P2C1B8V9yZ_2RzN3B_Xj2yS2l1X3R_J-F40E9T6Q4P63HkR_kH2dY4v3E1F5L-E_E6F5tV-L1aG-_yO0oO1mP5b3L_w_n_xK4U_T_g9I_d9W7sY_m_z8m-9L_v1E0Z_m_B8N_a8m_p3h9Jd3M4C5c4F5d1w7t8H7g-1A2c8P_n_S_pE9H9V7yK1u_E-6m2i5G4u_w1_eA4oM0I1_3pA4r3gN7N-P7V_B_oP_P_I9O_P" />
                                        </div>
                                    </div>
                                    {/* Center Image */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#ec5b13]/20 flex items-center justify-center backdrop-blur-sm border border-[#ec5b13]/50 shadow-[0_0_50px_rgba(236,91,19,0.3)]">
                                        <span className="font-black text-3xl text-white tracking-widest uppercase">100%<br /><span className="text-lg">Natural</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="bg-[#f8f6f6] dark:bg-[#221610] pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                        <div className="bg-[#ec5b13] text-white p-3 rounded-2xl mb-6 inline-block">
                            <span className="material-symbols-outlined text-3xl">medical_services</span>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Jammi Pharmaceuticals</h4>
                        <p className="text-slate-500 text-sm max-w-sm text-center mb-8">Committed to revolutionizing natural healthcare through rigorous scientific research since 1901.</p>
                        <ul className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Products</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Clinical Trials</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Contact</a></li>
                            <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Disclaimer</a></li>
                        </ul>
                        <div className="mt-12 text-slate-400 text-xs gap-2 flex flex-col items-center">
                            <p>© 2024 Jammi Pharmaceuticals Ltd. All Rights Reserved.</p>
                            <p className="italic">These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default DTabs;
