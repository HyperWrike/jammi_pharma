"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const CystEvit: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8f6f6] dark:bg-[#221610] font-['Public_Sans',sans-serif] text-slate-800 dark:text-slate-200 transition-colors duration-200 relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                {/* Top Navigation */}
                <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#221610]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="bg-[#ec5b13] p-1.5 rounded-lg text-white group-hover:bg-orange-600 transition-colors">
                                <span className="material-symbols-outlined text-xl">medical_services</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Jammi</h2>
                        </div>
                        <nav className="hidden md:flex gap-8">
                            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors" href="#">Products</a>
                            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors" href="#">Women's Health</a>
                            <a className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors" href="#">About Us</a>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="text-slate-500 hover:text-[#ec5b13] transition-colors"><span className="material-symbols-outlined">search</span></button>
                            <button className="text-slate-500 hover:text-[#ec5b13] transition-colors relative">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <span className="absolute -top-1 -right-1 bg-[#ec5b13] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                            </button>
                            <button className="text-slate-500 hover:text-[#ec5b13] transition-colors"><span className="material-symbols-outlined">person</span></button>
                            <button className="md:hidden text-slate-500 hover:text-[#ec5b13] transition-colors"><span className="material-symbols-outlined">menu</span></button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                        {/* Breadcrumbs */}
                        <nav className="flex text-xs text-slate-500 dark:text-slate-400 font-medium mb-8" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                <li className="inline-flex items-center">
                                    <a className="hover:text-[#ec5b13] transition-colors" href="#">Home</a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
                                        <a className="hover:text-[#ec5b13] transition-colors" href="#">Wellness</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
                                        <a className="hover:text-[#ec5b13] transition-colors" href="#">Therapeutics</a>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
                                        <span className="text-[#ec5b13]">Cyst Evit</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Product Images (Left side on Desktop) */}
                            <div className="lg:col-span-5 flex flex-col gap-4">
                                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border items-center justify-center p-8 border-slate-200 dark:border-slate-700 shadow-sm relative group">
                                    <img className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" data-alt="Cyst Evit herbal syrup bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQeL29I0YhQjK14I6F9JkQ614LzF8LqO4oWw1m3R8m-Q6Gq4Y8K1v41Lq5F7sQ4GZtJ5F3A15bX-dJtB_C-FkVn1JvFwC7Xw14v5X-f_mS8LpTqB2Y1c9wMhN1L9Rj19aCgNq8Zk39d48IqP-_G0_Z4X_TmA8JzU_1J-Xy0KjZ9q0T79mN7ZcKpA_2g5bH0vP6VpQ" />
                                    <div className="absolute top-4 right-4 bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Women's Health</div>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <button className="aspect-square rounded-xl bg-white dark:bg-slate-800 border-2 border-[#ec5b13] p-2 overflow-hidden items-center justify-center">
                                        <img className="w-full h-full object-contain" data-alt="Product Thumbnail 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyj2I2P1dM_T_40h618b7YjK3T3K4fP9Q44bY6U568-1Vd6wA3Y5Q8T4P8V1Uq11Jd8L_x_1Q7zLcFj5X91K3T6qB9-Y147I4bA68T0jV9aZ56w1Q7H7P_W5145n-L4N4P9T09_D2k2Q5T9Q4Uu39QdI_K315Hq07LcC49P8P5X9T86OqP8vQvO8Q" />
                                    </button>
                                    <button className="aspect-square rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#ec5b13] p-2 overflow-hidden transition-colors items-center justify-center">
                                        <img className="w-full h-full object-cover rounded-lg" data-alt="Ayurvedic Ingredients" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz4NqYJc7K6ZkC5rX-H8P9M4q47B1J6R1wL0Y7M0T7X0M9B4N9T9X7L8c6N1H8K9N7_P0Y0Z5P9T4b6QvF4c0T0jN7C8N4c0X1B1K5wE0yM9T9vH9aX8_M7r8m9T7J9R46C9v-J_E91Q2L4v0zN1_J5-4E1lW5mK9k2t8-qO7V7MvD9K1uM_Z3hA" />
                                    </button>
                                    <button className="aspect-square rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#ec5b13] p-2 overflow-hidden transition-colors items-center justify-center">
                                        <div className="w-full h-full bg-[#ec5b13]/10 rounded-lg flex items-center justify-center text-[#ec5b13]">
                                            <span className="material-symbols-outlined text-3xl">spa</span>
                                        </div>
                                    </button>
                                    <button className="aspect-square rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#ec5b13] overflow-hidden transition-colors flex items-center justify-center group relative">
                                        <img className="w-full h-full object-cover opacity-60" data-alt="Video Thumbnail" src="https://images.unsplash.com/photo-1542841791-1925b02a2d4b?q=80&amp;w=512&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                        <span className="material-symbols-outlined absolute text-3xl text-slate-800 dark:text-white group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                                    </button>
                                </div>
                            </div>
                            {/* Product Details (Right side on Desktop) */}
                            <div className="lg:col-span-7 flex flex-col pt-2">
                                <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                                    <div className="flex items-center gap-2 text-[#ec5b13] font-bold text-sm tracking-widest uppercase mb-3">
                                        <span>Therapeutics</span>
                                        <span>•</span>
                                        <span>Syrup</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4"><LiveEditable collection="products_content" docId="cystevit" field="name">Cyst Evit</LiveEditable></h1>
                                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-light mb-6">
                                        A specialized phyto-therapeutic formulation to help manage PCOS/PCOD naturally, restoring hormonal harmony and ovulatory health.
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center text-amber-500">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">4.7 (86 Reviews)</span>
                                    </div>
                                </div>
                                {/* Key Highlights */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center gap-2">
                                        <span className="material-symbols-outlined text-[#ec5b13] text-3xl">balance</span>
                                        <span className="text-xs font-bold leading-tight">Hormonal<br />Balance</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center gap-2">
                                        <span className="material-symbols-outlined text-[#ec5b13] text-3xl">water_drop</span>
                                        <span className="text-xs font-bold leading-tight">Regulates<br />Cycles</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center gap-2">
                                        <span className="material-symbols-outlined text-[#ec5b13] text-3xl">monitor_weight</span>
                                        <span className="text-xs font-bold leading-tight">Weight<br />Management</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center gap-2">
                                        <span className="material-symbols-outlined text-[#ec5b13] text-3xl">psychology</span>
                                        <span className="text-xs font-bold leading-tight">Reduces<br />Stress</span>
                                    </div>
                                </div>
                                <div className="flex items-end gap-6 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-500 font-medium line-through">$45.00</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-slate-900 dark:text-white">$34.99</span>
                                            <span className="text-sm font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">Save 22%</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Actions Component Structure */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-1 h-[60px]">
                                        <button className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-[#ec5b13] hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"><span className="material-symbols-outlined">remove</span></button>
                                        <span className="w-12 text-center font-bold text-lg">1</span>
                                        <button className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-[#ec5b13] hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"><span className="material-symbols-outlined">add</span></button>
                                    </div>
                                    <button className="flex-1 bg-[#ec5b13] hover:bg-orange-600 text-white font-bold text-lg rounded-2xl h-[60px] flex items-center justify-center shadow-lg shadow-[#ec5b13]/30 transition-all hover:-translate-y-1 active:scale-95">
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="bg-[#ec5b13]/10 border border-[#ec5b13]/20 rounded-2xl p-5 mb-8">
                                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-[#ec5b13]" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                                        Why Choose Cyst Evit?
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        Unlike conventional hormonal therapies, Cyst Evit works at the root cause by improving insulin resistance, a primary driver of PCOS, thereby facilitating natural follicular maturation and release.
                                    </p>
                                </div>
                                {/* Accordion Information */}
                                <div className="flex flex-col border-t border-slate-200 dark:border-slate-800">
                                    {/* Ingredient Accordion Item */}
                                    <details className="group" open>
                                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none py-6 border-b border-slate-200 dark:border-slate-800 text-lg">
                                            <span>Primary Ingredients</span>
                                            <span className="transition-transform group-open:rotate-180">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </span>
                                        </summary>
                                        <div className="text-slate-600 dark:text-slate-400 mt-4 mb-6 leading-relaxed text-sm space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden border-2 border-white dark:border-slate-800">
                                                    <img className="w-full h-full object-cover" data-alt="Ashoka bark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6c4H2V0YhQjK14I6F9JkQ614LzF8LqO4oWw1m3R8m-Q6Gq4Y8K1v41Lq5F7sQ4GZtJ5F3A15bX-dJtB_C-FkVn1JvFwC7Xw14v5X-f_mS8LpTqB2Y1c9wMhN1L9Rj19aCgNq8Zk39d48IqP-_G0_Z4X_TmA8JzU_1J-Xy0KjZ9q0T79mN7ZcKpA_2g5bH0vP6VpQ" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">Ashoka (Saraca asoca)</p>
                                                    <p>A renowned uterine tonic that helps regulate menstrual cycles and reduces heavy bleeding.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden border-2 border-white dark:border-slate-800">
                                                    <img className="w-full h-full object-cover" data-alt="Shatavari root" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwJtK7T1M9T_40h618b7YjK3T3K4fP9Q44bY6U568-1Vd6wA3Y5Q8T4P8V1Uq11Jd8L_x_1Q7zLcFj5X91K3T6qB9-Y147I4bA68T0jV9aZ56w1Q7H7P_W5145n-L4N4P9T09_D2k2Q5T9Q4Uu39QdI_K315Hq07LcC49P8P5X9T86OqP8vQvO8Q" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white">Shatavari (Asparagus racemosus)</p>
                                                    <p>Supports follicular growth, nourishes the reproductive system, and regulates estrogen levels.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                    {/* Dosage Accordion Item */}
                                    <details className="group">
                                        <summary className="flex justify-between items-center font-bold cursor-pointer list-none py-6 border-b border-slate-200 dark:border-slate-800 text-lg">
                                            <span>Dosage &amp; Usage</span>
                                            <span className="transition-transform group-open:rotate-180">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </span>
                                        </summary>
                                        <div className="text-slate-600 dark:text-slate-400 mt-4 mb-6 leading-relaxed text-sm">
                                            <p className="mb-2"><strong>Standard Dose:</strong> 10-15 ml twice daily.</p>
                                            <p className="mb-2"><strong>Timing:</strong> Preferably after meals with an equal quantity of water.</p>
                                            <p className="text-xs italic mt-4 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg block">Recommendation: For optimal results in managing PCOD/PCOS symptoms, clinical studies suggest a continuous usage period of 3 to 6 months along with lifestyle modifications.</p>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* Simplified Footer */}
                <footer className="bg-white dark:bg-[#221610] py-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
                    <p>© 2024 Jammi Pharmaceuticals. Empowering Women's Health Naturally.</p>
                </footer>
            </div>
        </div>
    );
};

export default CystEvit;
