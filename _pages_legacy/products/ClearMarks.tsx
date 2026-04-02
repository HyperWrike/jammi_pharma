"use client";
import React from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const ClearMarks = () => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center bg-primary rounded-lg p-1.5 text-white">
                                <span className="material-symbols-outlined text-2xl">medical_services</span>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Jammi Pharmaceuticals</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <nav className="hidden md:flex items-center gap-8 mr-8">
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Products</a>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Heritage</a>
                                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Research</a>
                            </nav>
                            <button className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </button>
                            <button className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <a className="hover:text-primary" href="#">Home</a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <a className="hover:text-primary" href="#">Skin & Hair Care</a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-slate-100">Clear Marks</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                            <img alt="Clear Marks skin cream packaging" className="w-full h-full object-cover" data-alt="Professional herbal skin cream bottle against a clean medical background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7fKXs2kHNz0SG2k5vQytyMyJUoQwtD34hmnjLo4kdiusjR6AtUV_RdgF2hC6Eh2IP4LzmgpvMJCl7laIsqWCculWcWOyodkY0HYUL9jm8T7mnCLqbf-4orxil-skpi2wO03ADo7DZE7n-6GInHDeLm2Lhey-del0Nz4NnBAM9QkeiDwdDzuljPC_-jKDOdu20RZxIjbcr_e-fyDUY1Pw7feQDo3xLwmyd1PIvKF4S_uOzjX8rzj0VI-FVk2xqRILFG_5MUFLHPEg" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 border border-primary/30">
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">image</span>
                                </div>
                            </div>
                            <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 hover:border-primary/50 cursor-pointer transition-all"></div>
                            <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 hover:border-primary/50 cursor-pointer transition-all"></div>
                            <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 hover:border-primary/50 cursor-pointer transition-all"></div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Heritage Formula</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-2 leading-tight"><LiveEditable collection="products_content" docId="clearmarks" field="name">Clear Marks</LiveEditable></h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">Advanced Ayurvedic formulation for flawless, radiant skin.</p>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-primary">
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined font-variation-settings-[&#39;FILL&#39;_1]">star</span>
                                <span className="material-symbols-outlined">star_half</span>
                            </div>
                            <span className="text-sm font-medium text-slate-500">(128 reviews)</span>
                        </div>

                        {/* Benefits Chips */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-primary text-lg">auto_fix_high</span>
                                <span className="text-sm font-semibold">Reduces blemishes</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-primary text-lg">palette</span>
                                <span className="text-sm font-semibold">Evens skin tone</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-primary text-lg">light_mode</span>
                                <span className="text-sm font-semibold">Natural glow</span>
                            </div>
                        </div>

                        {/* Ingredients Grid */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Key Ingredients</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-primary font-bold mb-1">Saffron</p>
                                    <p className="text-xs text-slate-500">Brightens complexion</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-primary font-bold mb-1">Manjistha</p>
                                    <p className="text-xs text-slate-500">Blood purifier</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <p className="text-primary font-bold mb-1">Turmeric</p>
                                    <p className="text-xs text-slate-500">Anti-inflammatory</p>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Section */}
                        <div className="mt-auto p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Price</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-slate-900 dark:text-slate-100">$34.00</span>
                                        <span className="text-lg text-slate-400 line-through font-medium">$42.00</span>
                                    </div>
                                </div>
                                <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                                    <span className="px-4 font-bold">1</span>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3">
                                <span className="material-symbols-outlined">shopping_basket</span>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Tabs/Section */}
                <section className="mt-20">
                    <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
                        <div className="flex gap-10">
                            <button className="pb-4 border-b-2 border-primary text-primary font-bold">Product Description</button>
                            <button className="pb-4 text-slate-400 font-medium hover:text-slate-600 dark:hover:text-slate-300">How to Use</button>
                            <button className="pb-4 text-slate-400 font-medium hover:text-slate-600 dark:hover:text-slate-300">Safety Information</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-6">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                Jammi’s Clear Marks is a time-tested formulation rooted in a professional pharmaceutical heritage. Our unique blend of Ayurvedic herbs is meticulously processed to address hyperpigmentation, acne scars, and uneven skin tone at their core. Unlike modern cosmetic fixes, Clear Marks works to improve skin health from within, utilizing the therapeutic properties of Saffron and Manjistha.
                            </p>
                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="flex gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary">eco</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">100% Herbal</h4>
                                        <p className="text-sm text-slate-500">No harmful chemicals or synthetic preservatives.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary">science</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Clinically Proven</h4>
                                        <p className="text-sm text-slate-500">Formulated based on decades of pharmaceutical research.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                            <h3 className="text-xl font-bold text-primary mb-4">The Jammi Promise</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 italic">
                                "Since 1901, we have been dedicated to the pursuit of authentic Ayurvedic wellness, bridging the gap between ancient wisdom and modern medical standards."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">GMP Certified Facility</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recommended Products */}
                <section className="mt-24 mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black">Pairs well with</h2>
                        <a className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all" href="#">
                            View all products <span className="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group cursor-pointer">
                            <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Radiance Face Wash</h3>
                            <p className="text-sm text-slate-500">$18.00</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Pure Aloe Gel</h3>
                            <p className="text-sm text-slate-500">$14.00</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Sun Shield SPF 30</h3>
                            <p className="text-sm text-slate-500">$22.00</p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <span className="material-symbols-outlined text-4xl">inventory_2</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Night Recovery Oil</h3>
                            <p className="text-sm text-slate-500">$45.00</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center bg-primary rounded-lg p-1.5 text-white">
                                    <span className="material-symbols-outlined text-xl">medical_services</span>
                                </div>
                                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Jammi Pharmaceuticals</h2>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Redefining skin health through the lens of ancient Ayurvedic wisdom and modern clinical excellence since 1901.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Products</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a className="hover:text-primary transition-colors" href="#">Skin Care</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Hair Care</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Wellness</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">New Arrivals</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">About</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">The Heritage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Manufacturing</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Newsletter</h4>
                            <p className="text-sm text-slate-500 mb-4">Join our community for wellness tips and early access to new releases.</p>
                            <div className="flex gap-2">
                                <input className="flex-1 bg-slate-100 dark:bg-slate-800 border-transparent rounded-xl focus:border-primary focus:ring-0 text-sm" placeholder="Email address" type="email" />
                                <button className="bg-primary p-2 text-white rounded-xl"><span className="material-symbols-outlined">send</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-400">© 2024 Jammi Pharmaceuticals. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">social_leaderboard</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">alternate_email</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">language</span></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClearMarks;
