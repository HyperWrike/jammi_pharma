"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const DailyDew: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-forest/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-forest dark:text-brand-saffron">
                        <span className="material-symbols-outlined text-3xl">fluid</span>
                    </div>
                    <h2 className="text-forest dark:text-slate-100 text-xl font-bold tracking-tight">Jammi Pharmaceuticals</h2>
                </div>
                <nav className="hidden md:flex gap-8 items-center text-sm font-semibold uppercase tracking-wider text-forest/80 dark:text-slate-300">
                    <a className="hover:text-primary" href="#">Shop</a>
                    <a className="hover:text-primary" href="#">Heritage</a>
                    <a className="hover:text-primary" href="#">About Us</a>
                    <a className="hover:text-primary" href="#">Journal</a>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-forest/5 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-forest/5 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">favorite</span>
                    </button>
                    <button className="relative p-2 rounded-full bg-forest text-white dark:bg-brand-saffron">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10 lg:py-16">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Product Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-brand-cream dark:bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center border border-forest/5">
                            <img className="w-full h-full object-cover" data-alt="Premium Daily Dew moisturizer jar in a luxury setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB9ISZAC15grh-S6r6fbeHc04chO9l442GaakYej_WOUphwXuuWiB5rPZ6K1cZivwuRi8dpqDVRx4cNj_KgeHtSRIYNBpoZfu1PgUF0J9Zv6sk5aLa1eIgRjzuJtqLwu0GRwlaMgg7Y_-a34lDZiRvpUwUt09gJXXhc82tiCRqoZJoIOxkriPZpGLPTnX82WP4Vp0gvdw5vQTMwPl2nBB12KVqPXDL45aPv9lhnv_KU1uFYUiCETDiogv4PW_vuJzfQIrM8VU1VKg" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-xl overflow-hidden border-2 border-primary">
                                <img className="w-full h-full object-cover" data-alt="Close up texture of cream moisturizer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk0hZxhOXHK4NEdsp1pTG3Um4sJhA9XXokLoqIJScMohZRH1bEoD-EEheepyG8UXZY5CwNJoUNfe4Vl32yT0NJhiJ81jX-EEKAEOp3MUw_1wnMfcsU-8nKdngsFZ7w7U1P4Uno5kQaicFsmG8bMpYaVWRE231z3boeM0GoCgdF0wNAxdpcxeHY25EwNauUi8IV8iwKPGAoKpP32YdVImX6CaM5mp7YavURhWsxoZFHBWce7Cqt8vwxYHOTkqKFyL6-UKOg5YqHfPY" />
                            </div>
                            <div className="aspect-square rounded-xl overflow-hidden bg-brand-cream">
                                <img className="w-full h-full object-cover" data-alt="Natural ingredients saffron and flowers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzyydnsG1tadQgcff6UWbjqG2UroFqSOKUXcFC8MmEjCXiiiHfOgBOnTHdigRCAG4IZmIoB2YCZbUcyrnRlu3ERUMUSrk64eQzU-FttBnNkmBELdglzxp3QWVNpY2dItTBmKXl8ixWMAX2NaoeGhydFu-_-a9A2uUJd-U8ZcDbdhqhL_izXqW-dHR_sN9MWROiv8PwzUp17UOJ_xLUxTgoVVw8W2CW4sqRONWyRyTrBFgGTcOAneeu2XLX2WLirlmfQ-R3UgRy0Ws" />
                            </div>
                            <div className="aspect-square rounded-xl overflow-hidden bg-brand-cream">
                                <img className="w-full h-full object-cover" data-alt="Model applying moisturizer to face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUJ-w-oY-YstO6dHsXUXs0MeRl3bbvgDpMB00npl5PtdCXX8-kSMpyCd-XPiyf9_NLvD2qQldQfJc-PWnrRM6VcjDPcSBCB0eQtKSA15RiV0L4-LyGiJY5z7hcotiL2Wi3l0LdKR_yq78C4XINgCqGjYob9hxoYbKkf64c1oKCViHW8eMvE3e70wmAHMgrTj-ZYuVimNH5JYlKIf1nDk6D-yRXP9lq4Lfs2zbTr9shg3WboMzbjkZieqZ3ILtjuJLqeCy6RUszMyA" />
                            </div>
                            <div className="aspect-square rounded-xl overflow-hidden bg-brand-cream flex items-center justify-center">
                                <span className="material-symbols-outlined text-forest/40">play_circle</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-brand-saffron/10 text-brand-saffron text-xs font-bold rounded-full uppercase tracking-widest">Skin &amp; Hair Care</span>
                                <div className="flex items-center text-brand-saffron">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-xs font-semibold ml-1 text-slate-500">(128 reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black text-forest dark:text-slate-100 leading-tight"><LiveEditable collection="products_content" docId="dailydew" field="name">Daily Dew Moisturizer</LiveEditable></h1>
                            <p className="text-lg text-forest/70 dark:text-slate-400 mt-2 italic font-medium">Heritage-Rich Ayurvedic Formula for Golden Glow</p>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">₹1,499</span>
                            <span className="text-lg text-slate-400 line-through">₹1,999</span>
                            <span className="text-sm font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">25% OFF</span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Experience the golden glow of Ayurveda. Daily Dew is a light, deeply nourishing moisturizer infused with Kashmiri Saffron and Kumkumadi Oil, designed to provide 24-hour hydration without any greasy residue.
                        </p>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-3 gap-4 py-4 border-y border-forest/10">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-forest">
                                    <span className="material-symbols-outlined">water_drop</span>
                                </div>
                                <p className="text-xs font-bold uppercase tracking-tighter">Deep Hydration</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-forest">
                                    <span className="material-symbols-outlined">flare</span>
                                </div>
                                <p className="text-xs font-bold uppercase tracking-tighter">Non-Greasy</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center text-forest">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <p className="text-xs font-bold uppercase tracking-tighter">24h Moisture</p>
                            </div>
                        </div>

                        {/* Selection & Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                    <button className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <span className="material-symbols-outlined text-sm">remove</span>
                                    </button>
                                    <span className="px-4 py-3 font-bold">1</span>
                                    <button className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                                <button className="flex-1 bg-forest dark:bg-primary text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Bag
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-6 py-2">
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                    <span className="material-symbols-outlined text-forest">verified_user</span> 100% Authentic
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                    <span className="material-symbols-outlined text-forest">local_shipping</span> Free Shipping
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                    <span className="material-symbols-outlined text-forest">psychology</span> Dermatologist Tested
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Content Tabs/Sections */}
                <div className="mt-20 space-y-20">
                    {/* Ingredients Section */}
                    <section className="bg-brand-cream/50 dark:bg-slate-900/50 rounded-3xl p-8 lg:p-16 border border-forest/5">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-forest dark:text-brand-saffron">Ancient Wisdom, Modern Science</h2>
                            <p className="text-slate-600 dark:text-slate-400 mt-4">We combine traditional Ayurvedic herbs with clinically proven actives for unparalleled nourishment.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-forest/5 hover:border-brand-saffron transition-colors">
                                <div className="text-brand-saffron mb-4"><span className="material-symbols-outlined text-4xl">energy_savings_leaf</span></div>
                                <h3 className="font-bold text-lg mb-2">Kumkumadi Oil</h3>
                                <p className="text-sm text-slate-500">Known as 'Miraculous Elixir' for skin brightening and anti-aging.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-forest/5 hover:border-brand-saffron transition-colors">
                                <div className="text-brand-saffron mb-4"><span className="material-symbols-outlined text-4xl">spa</span></div>
                                <h3 className="font-bold text-lg mb-2">Rose Water</h3>
                                <p className="text-sm text-slate-500">Steam-distilled petals to balance pH and soothe inflammation.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-forest/5 hover:border-brand-saffron transition-colors">
                                <div className="text-brand-saffron mb-4"><span className="material-symbols-outlined text-4xl">grain</span></div>
                                <h3 className="font-bold text-lg mb-2">Almond Oil</h3>
                                <p className="text-sm text-slate-500">Rich in Vitamin E to deeply moisturize and repair skin barrier.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-forest/5 hover:border-brand-saffron transition-colors">
                                <div className="text-brand-saffron mb-4"><span className="material-symbols-outlined text-4xl">science</span></div>
                                <h3 className="font-bold text-lg mb-2">Vitamin E</h3>
                                <p className="text-sm text-slate-500">Powerful antioxidant to protect against daily pollutants.</p>
                            </div>
                        </div>
                    </section>

                    {/* How to Use Section */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 space-y-8">
                            <h2 className="text-4xl font-bold text-forest dark:text-slate-100">Ritual for Radiance</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">1</span>
                                    <div>
                                        <h4 className="font-bold text-lg">Cleanse</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Wash your face with a mild cleanser and pat dry gently with a soft towel.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">2</span>
                                    <div>
                                        <h4 className="font-bold text-lg">Apply</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Take a pea-sized amount and dot it all over your face and neck.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">3</span>
                                    <div>
                                        <h4 className="font-bold text-lg">Massage</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Massage in upward circular motions until fully absorbed for better blood circulation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 rounded-3xl overflow-hidden aspect-[4/5] relative">
                            <img className="w-full h-full object-cover" data-alt="Zen setting with water and stones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLv97-76P6gKF9nedZmmmzNOVTizrffDGp_BBlZlbfGKAu50S0Zypr1jvai_ejzM5ygMQK23a3PTF7BAODk5fsJQaYrX0XyekL12K4c4F6nbkhMeZDi9Jx9tuPy7Xpl1_97NnhVv80X7jDjH-aaKYpNGeLk-MuVBr4PuoQGFNLCRkmTkQp9m44FfphN4FOwHRrRidh0L6S_HfHB7hpfwb4STf2ZeMLNZWcSJOY9K0A9uOqvkP9vXofp8gyN9Id31mjyqLNe3GofbU" />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent"></div>
                        </div>
                    </section>

                    {/* FAQ & Reviews */}
                    <section className="grid lg:grid-cols-2 gap-16">
                        {/* FAQs */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold">Common Questions</h3>
                            <div className="space-y-4">
                                <details className="group border-b border-slate-200 dark:border-slate-800 pb-4" open>
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <span className="font-bold text-forest dark:text-slate-200">Is it suitable for oily skin?</span>
                                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Yes, its non-greasy, lightweight formula is designed to hydrate without clogging pores, making it excellent for all skin types, including oily and combination skin.</p>
                                </details>
                                <details className="group border-b border-slate-200 dark:border-slate-800 pb-4">
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <span className="font-bold text-forest dark:text-slate-200">Can I use it under makeup?</span>
                                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Absolutely! Daily Dew acts as a perfect hydrating primer, smoothing the skin surface for flawless makeup application.</p>
                                </details>
                                <details className="group border-b border-slate-200 dark:border-slate-800 pb-4">
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <span className="font-bold text-forest dark:text-slate-200">Are there any synthetic fragrances?</span>
                                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">No, the gentle floral aroma comes entirely from natural steam-distilled rose water and cold-pressed essential oils.</p>
                                </details>
                            </div>
                        </div>
                        {/* Reviews Summary */}
                        <div className="bg-forest/5 dark:bg-white/5 p-8 rounded-3xl">
                            <h3 className="text-2xl font-bold mb-6">Real Results</h3>
                            <div className="space-y-6">
                                <div className="pb-6 border-b border-forest/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex text-brand-saffron">
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                        </div>
                                        <span className="text-xs font-bold uppercase">Aditi S.</span>
                                    </div>
                                    <p className="text-sm italic">"Finally found a moisturizer that gives me a glow without making my face look like a frying pan. The saffron scent is divine."</p>
                                </div>
                                <div className="pb-6 border-b border-forest/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex text-brand-saffron">
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star_half</span>
                                        </div>
                                        <span className="text-xs font-bold uppercase">Rahul K.</span>
                                    </div>
                                    <p className="text-sm italic">"Using this on my beard and face. Keeps skin underneath hydrated and soft. Highly recommend for daily use."</p>
                                </div>
                                <button className="w-full text-center text-sm font-bold text-forest underline tracking-widest uppercase">View All 128 Reviews</button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Trust Badges Footer Area */}
            <footer className="bg-forest dark:bg-slate-950 text-white py-16 px-6 mt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-white/10 pb-12 mb-12">
                    <div>
                        <span className="material-symbols-outlined text-4xl mb-4 text-brand-saffron">eco</span>
                        <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="dailydew" field="benefit1Title">Cruelty Free</LiveEditable></p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined text-4xl mb-4 text-brand-saffron">nature</span>
                        <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="dailydew" field="benefit2Title">100% Vegan</LiveEditable></p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined text-4xl mb-4 text-brand-saffron">biotech</span>
                        <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="dailydew" field="benefit3Title">Paraben Free</LiveEditable></p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined text-4xl mb-4 text-brand-saffron">history_edu</span>
                        <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="dailydew" field="benefit4Title">Heritage Formula</LiveEditable></p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl">fluid</span>
                        <h2 className="text-xl font-bold tracking-tight">Jammi Pharmaceuticals</h2>
                    </div>
                    <p className="text-brand-cream/60 text-xs">© 2024 Jammi Pharmaceuticals. Ayurveda since 1900. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-brand-saffron transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
                        <a className="hover:text-brand-saffron transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                        <a className="hover:text-brand-saffron transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DailyDew;
