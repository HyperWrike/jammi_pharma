"use client";
import React from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const CrushNBrush = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <div className="layout-container flex h-full grow flex-col">
                {/* Header/Navigation */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 lg:px-20 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">eco</span>
                            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Jammi Pharmaceuticals</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Shop</a>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Ayurveda</a>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Our Story</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
                        <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-xl h-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                                <div className="text-slate-400 flex items-center justify-center pl-4">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 placeholder:text-slate-400 text-base font-normal px-2 text-slate-900 dark:text-white" placeholder="Search" value="" />
                            </div>
                        </label>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary transition-all">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary transition-all">
                                <span className="material-symbols-outlined">account_circle</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border dark:border-slate-700">
                                <img alt="Jammi Crush N Brush Ayurvedic Pellets sustainable packaging" className="w-full h-full object-cover" data-alt="Eco-friendly packaging for Ayurvedic dental pellets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Hvl9I4wTJeb2KAMMGbycsJtSjIDDQuDb9bQG4keN1hUnk4hP2wsXeRbL_9-LGPhH0Bc2VhhTwJCH3HGZ0L0rOQk9bkQ12GZUlVTYfjpLMygiiiSg4oPdb1kktiOQd2SWfqpx8XC8RVJGfq8leeS6xNU5bxTXkPGTqcSTatYn7JdjWK6i_3PnajOE2L07-6Q0ek49ap2KGipuNV1Q6bjVzWgM5TCWYLLmmIf0sOxJCdmp1E8MTjVSVXpocOsSH-sTnBXsMt5HzRI" />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary bg-slate-100">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800" data-alt="Close up of white dental pellets"></div>
                                </div>
                                <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800" data-alt="Herbal ingredients used in product"></div>
                                </div>
                                <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800" data-alt="Model using the dental pellets"></div>
                                </div>
                                <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800" data-alt="Sustainable travel tin packaging details"></div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-2">
                                <span className="text-primary text-sm font-bold tracking-widest uppercase">Oral Care / Wellness</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 mb-4 leading-tight"><LiveEditable collection="products_content" docId="crushnbrush" field="name">Crush N' Brush Ayurvedic Pellets</LiveEditable></h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">Sustainable Oral Care | Ancient Wisdom meets Modern Convenience. Experience a plastic-free smile crafted from centuries-old Ayurvedic botanicals.</p>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 text-primary">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                    <span className="material-symbols-outlined">star</span>
                                </div>
                                <span className="text-slate-500 dark:text-slate-400 font-medium">4.9 (128 reviews)</span>
                            </div>

                            <div className="flex gap-3 mb-8 flex-wrap">
                                <div className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-primary/10 px-4">
                                    <span className="material-symbols-outlined text-primary text-sm">shield</span>
                                    <p className="text-primary text-sm font-bold">Enamel Protection</p>
                                </div>
                                <div className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-primary/10 px-4">
                                    <span className="material-symbols-outlined text-primary text-sm">air</span>
                                    <p className="text-primary text-sm font-bold">Fresh Breath</p>
                                </div>
                                <div className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-primary/10 px-4">
                                    <span className="material-symbols-outlined text-primary text-sm">luggage</span>
                                    <p className="text-primary text-sm font-bold">Travel-friendly</p>
                                </div>
                            </div>

                            <div className="mb-10 p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-sm">
                                <div className="flex items-end justify-between mb-6">
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                                        <p className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-none">$14.99</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-amber-600 dark:text-amber-400 text-xs font-bold mb-1">In Stock</p>
                                        <p className="text-slate-500 text-xs">Ships in compostable mailers</p>
                                    </div>
                                </div>
                                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                    Add to Cart
                                </button>
                            </div>

                            {/* 3-Step Guide */}
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">How to Use: The 3-Step Ritual</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/30">
                                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">1</div>
                                        <p className="font-bold text-sm mb-1 uppercase">Crush</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Place one pellet in mouth and crush lightly with your molars.</p>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/30">
                                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">2</div>
                                        <p className="font-bold text-sm mb-1 uppercase">Brush</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Wet your toothbrush and brush normally. Watch it foam naturally.</p>
                                    </div>
                                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/30">
                                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-3">3</div>
                                        <p className="font-bold text-sm mb-1 uppercase">Rinse</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Rinse and enjoy that long-lasting Ayurvedic freshness.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Reviews & Stats Section */}
                    <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-wrap gap-x-16 gap-y-10">
                            <div className="flex flex-col gap-4 min-w-[200px]">
                                <h3 className="text-2xl font-bold dark:text-white">Customer Love</h3>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight">4.9</p>
                                    <p className="text-slate-400 font-medium">/ 5</p>
                                </div>
                                <div className="flex gap-1 text-primary">
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-2xl">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-2xl">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-2xl">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-2xl">star</span>
                                    <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1] text-2xl">star</span>
                                </div>
                                <p className="text-slate-500 font-medium">Based on 128 reviews</p>
                            </div>
                            <div className="grid min-w-[300px] max-w-[500px] flex-1 grid-cols-[30px_1fr_50px] items-center gap-y-4">
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">5</p>
                                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="rounded-full bg-primary" style={{ width: "90%" }}></div>
                                </div>
                                <p className="text-slate-500 text-sm font-bold text-right">90%</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">4</p>
                                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="rounded-full bg-primary" style={{ width: "7%" }}></div>
                                </div>
                                <p className="text-slate-500 text-sm font-bold text-right">7%</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">3</p>
                                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="rounded-full bg-primary" style={{ width: "2%" }}></div>
                                </div>
                                <p className="text-slate-500 text-sm font-bold text-right">2%</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">2</p>
                                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="rounded-full bg-primary" style={{ width: "0%" }}></div>
                                </div>
                                <p className="text-slate-500 text-sm font-bold text-right">0%</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-bold">1</p>
                                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div className="rounded-full bg-primary" style={{ width: "1%" }}></div>
                                </div>
                                <p className="text-slate-500 text-sm font-bold text-right">1%</p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 text-primary mb-6">
                                <span className="material-symbols-outlined text-2xl font-bold">eco</span>
                                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Jammi</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">Merging traditional Ayurvedic healing with modern sustainable practices since 1901.</p>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined text-sm">public</span></div>
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"><span className="material-symbols-outlined text-sm">mail</span></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6">Products</h4>
                            <ul className="space-y-4 text-slate-500 text-sm">
                                <li><a className="hover:text-primary transition-colors" href="#">Oral Care</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Digestive Wellness</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Immunity Boosters</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">New Arrivals</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6">Company</h4>
                            <ul className="space-y-4 text-slate-500 text-sm">
                                <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Sustainability</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Wholesale</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6">Newsletter</h4>
                            <p className="text-slate-500 text-sm mb-4">Join our community for wellness tips and eco-friendly news.</p>
                            <div className="flex gap-2">
                                <input className="form-input bg-slate-100 dark:bg-slate-800 border-none rounded-lg flex-1 text-sm text-slate-900 dark:text-slate-100" placeholder="Email" type="email" />
                                <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"><span className="material-symbols-outlined">arrow_forward</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-xs">© 2024 Jammi Pharmaceuticals. All rights reserved.</p>
                        <div className="flex gap-6 text-slate-400 text-xs font-medium">
                            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">Terms of Service</a>
                            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200">Shipping Policy</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CrushNBrush;
