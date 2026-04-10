"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const Mahanarayana: React.FC = () => {
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
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <Link href="/shop" className="hover:text-primary transition-colors">Wellness Collection</Link>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-secondary font-bold">Mahanarayana Tailam</span>
                </nav>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Visual & Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-6">
                        {/* Thumbnails (Vertical) */}
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar shrink-0">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary/5 dark:bg-slate-800 rounded-2xl border-2 border-primary overflow-hidden p-2 cursor-pointer shadow-sm">
                                <img alt="Mahanarayana bottle thumbnail" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-90 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ5lJb_N5lO0m119mO99S0pZ62t_tO1nZ6p9b4R846r4246p_4n72kZ6PqS0k6tH8pA-p0Q5Q0pA_xX1Kzj1-2wNnK2Y_0P9_T4m65-v6R_7TqR3t2Y9o5_8p_41p5B6qE2t0V94O148Z9g0S5lK_8K9H1R5b4V-u8W82K-1sP7l3_Y8f-M_827pT6Z0-N" />
                            </div>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/10 overflow-hidden p-3 cursor-pointer hover:border-primary/40 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600">image</span>
                            </div>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-2xl border border-secondary/10 overflow-hidden p-3 cursor-pointer hover:border-primary/40 transition-colors flex items-center justify-center relative group">
                                <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">play_circle</span>
                            </div>
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 aspect-[4/5] bg-gradient-to-t from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 rounded-[2rem] border border-secondary/5 flex items-center justify-center p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
                            <div className="absolute top-6 left-6 flex gap-2 z-10">
                                <span className="bg-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Classic</span>
                            </div>
                            <img alt="Jammi Pharmaceuticals Mahanarayana Tailam Bottle" className="w-[85%] h-[85%] object-contain mix-blend-multiply dark:mix-blend-normal relative z-10 drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ5lJb_N5lO0m119mO99S0pZ62t_tO1nZ6p9b4R846r4246p_4n72kZ6PqS0k6tH8pA-p0Q5Q0pA_xX1Kzj1-2wNnK2Y_0P9_T4m65-v6R_7TqR3t2Y9o5_8p_41p5B6qE2t0V94O148Z9g0S5lK_8K9H1R5b4V-u8W82K-1sP7l3_Y8f-M_827pT6Z0-N" />
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col pt-4">
                        <div className="mb-2">
                            <h2 className="text-5xl lg:text-[3.5rem] font-bold text-secondary dark:text-primary mb-3 leading-none font-display">
                                <LiveEditable collection="products_content" docId="mahanarayana" field="name">Mahanarayana</LiveEditable>
                            </h2>
                            <h3 className="text-2xl font-light text-slate-500 dark:text-slate-400 tracking-wide">
                                <LiveEditable collection="products_content" docId="mahanarayana" field="titleSuffix">Tailam</LiveEditable>
                            </h3>
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-body leading-relaxed">
                            <LiveEditable collection="products_content" docId="mahanarayana" field="description" multiline>
                                The king of Ayurvedic oils. A profound, nourishing blend of over 40 herbs designed to deeply restore neuromuscular vitalty, soothe severe Vata imbalances, and rebuild physical strength.
                            </LiveEditable>
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <div className="flex items-center gap-2 border border-secondary/20 rounded-full px-4 py-1.5 bg-white dark:bg-slate-800">
                                <span className="material-symbols-outlined text-[1rem] text-primary">psychology</span>
                                <span className="text-xs font-bold text-secondary dark:text-white uppercase tracking-wider">Neuromuscular</span>
                            </div>
                            <div className="flex items-center gap-2 border border-secondary/20 rounded-full px-4 py-1.5 bg-white dark:bg-slate-800">
                                <span className="material-symbols-outlined text-[1rem] text-primary">fitness_center</span>
                                <span className="text-xs font-bold text-secondary dark:text-white uppercase tracking-wider">Restorative</span>
                            </div>
                            <div className="flex items-center gap-2 border border-secondary/20 rounded-full px-4 py-1.5 bg-white dark:bg-slate-800">
                                <span className="material-symbols-outlined text-[1rem] text-primary">spa</span>
                                <span className="text-xs font-bold text-secondary dark:text-white uppercase tracking-wider">Vata Pacifying</span>
                            </div>
                        </div>

                        {/* Price & Cart Actions */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-sm text-slate-500 font-bold mb-1">Price</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">₹350</span>
                                        <span className="text-sm font-medium text-slate-500">/ 100ml</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 text-sm font-bold bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-lg">
                                        <span className="material-symbols-outlined text-[14px]">bolt</span> In Stock
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 rounded-xl overflow-hidden h-14 w-full sm:w-36 shrink-0">
                                    <button onClick={() => handleQuantityChange('decrease')} className="flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">remove</span>
                                    </button>
                                    <div className="flex-1 flex items-center justify-center font-bold text-lg select-none">
                                        {quantity}
                                    </div>
                                    <button onClick={() => handleQuantityChange('increase')} className="flex-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                                <button className="flex-1 bg-secondary text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-secondary/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined">shopping_basket</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legacy Banner */}
                <div className="w-full bg-cover bg-center rounded-3xl overflow-hidden mb-24 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2670&auto=format&fit=crop')" }}>
                    <div className="absolute inset-0 bg-secondary/90 backdrop-blur-sm mix-blend-multiply"></div>
                    <div className="relative z-10 p-12 md:p-20 text-center max-w-4xl mx-auto flex flex-col items-center">
                        <span className="material-symbols-outlined text-primary text-5xl mb-6 opacity-80">auto_stories</span>
                        <h3 className="text-3xl md:text-5xl font-display font-medium text-white mb-6 leading-tight">A Formulation Mentioned in the Bhaishajya Ratnavali</h3>
                        <p className="text-lg text-slate-300 font-body leading-relaxed md:px-12">
                            The name 'Mahanarayana' translates to 'Great God'. True to its name, this majestic oil has been revered for centuries as the ultimate panacea for severe bodily wear and tear, promoting longevity and vigor.
                        </p>
                    </div>
                </div>

                {/* Key Indications */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-xl">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Clinical Efficacy</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white font-display">Primary Indications</h3>
                        </div>
                        <p className="text-slate-500 font-body mt-4 md:mt-0 text-right md:w-1/3">Highly recommended by Vaidyas for profound structural support and recovery.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {/* Indication 1 */}
                        <div className="relative group">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-secondary dark:text-primary mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">accessibility_new</span>
                            </div>
                            <div className="absolute top-7 left-7 w-14 h-14 bg-primary/10 rounded-2xl -z-0"></div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display"><LiveEditable collection="products_content" docId="mahanarayana" field="ind1Title">Paralysis & Paresis</LiveEditable></h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-body leading-relaxed"><LiveEditable collection="products_content" docId="mahanarayana" field="ind1Desc" multiline>Aids in rehabilitating nerve function and stimulating muscle activity in paralytic conditions.</LiveEditable></p>
                        </div>
                        {/* Indication 2 */}
                        <div className="relative group">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-secondary dark:text-primary mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">airline_seat_recline_normal</span>
                            </div>
                            <div className="absolute top-7 left-7 w-14 h-14 bg-primary/10 rounded-2xl -z-0"></div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display"><LiveEditable collection="products_content" docId="mahanarayana" field="ind2Title">Severe Osteoarthritis</LiveEditable></h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-body leading-relaxed"><LiveEditable collection="products_content" docId="mahanarayana" field="ind2Desc" multiline>Rebuilds synovial fluid, reduces painful friction, and increases joint mobility.</LiveEditable></p>
                        </div>
                        {/* Indication 3 */}
                        <div className="relative group">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-secondary dark:text-primary mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">sports_gymnastics</span>
                            </div>
                            <div className="absolute top-7 left-7 w-14 h-14 bg-primary/10 rounded-2xl -z-0"></div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display"><LiveEditable collection="products_content" docId="mahanarayana" field="ind3Title">Muscle Wasting</LiveEditable></h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-body leading-relaxed"><LiveEditable collection="products_content" docId="mahanarayana" field="ind3Desc" multiline>Provides intense nourishment to emaciated tissues, aiding in gaining healthy mass.</LiveEditable></p>
                        </div>
                        {/* Indication 4 */}
                        <div className="relative group">
                            <div className="w-14 h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center text-secondary dark:text-primary mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">blind</span>
                            </div>
                            <div className="absolute top-7 left-7 w-14 h-14 bg-primary/10 rounded-2xl -z-0"></div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display"><LiveEditable collection="products_content" docId="mahanarayana" field="ind4Title">Geriatric Care</LiveEditable></h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-body leading-relaxed"><LiveEditable collection="products_content" docId="mahanarayana" field="ind4Desc" multiline>Combats age-related degeneration, tremors, and generalized weakness.</LiveEditable></p>
                        </div>
                    </div>
                </section>

                {/* Elaborate Ingredients Section */}
                <section className="mb-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-2 bg-slate-50 dark:bg-slate-800 p-10 lg:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                            <h3 className="text-3xl font-bold text-secondary dark:text-white mb-6 font-display">A Symphony of 40+ Botanicals</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-body mb-8 leading-relaxed">
                                Preparing Mahanarayana Tailam is a complex, multi-day process involving decoctions (Kashaya), pastes (Kalka), and oil (Sneha), meticulously boiled to standard 'Paka' consistencies.
                            </p>
                            <button className="text-primary font-bold self-start border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase tracking-wider text-sm flex items-center gap-1">
                                View Full List <span className="material-symbols-outlined text-sm">arrow_outward</span>
                            </button>
                        </div>

                        <div className="md:col-span-3 p-10 lg:p-16">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Lead Ingredients</h4>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <h5 className="text-4xl font-display font-light text-slate-300 dark:text-slate-600 w-12 shrink-0">01</h5>
                                    <div>
                                        <h6 className="text-xl font-bold text-secondary dark:text-white mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ashwagandha (Withania somnifera)</h6>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">Provides immense strength ('Bala'), reduces inflammation, and acts as a powerful adaptogen for the nervous system.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <h5 className="text-4xl font-display font-light text-slate-300 dark:text-slate-600 w-12 shrink-0">02</h5>
                                    <div>
                                        <h6 className="text-xl font-bold text-secondary dark:text-white mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Shatavari (Asparagus racemosus)</h6>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">A supreme cooling and nourishing herb that counteracts the drying, degenerative effects of aggravated Vata.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <h5 className="text-4xl font-display font-light text-slate-300 dark:text-slate-600 w-12 shrink-0">03</h5>
                                    <div>
                                        <h6 className="text-xl font-bold text-secondary dark:text-white mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bala (Sida cordifolia)</h6>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">Literally meaning 'strength', it is essential for rebuilding muscle tissue and relieving nerve pain.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <h5 className="text-4xl font-display font-light text-slate-300 dark:text-slate-600 w-12 shrink-0">04</h5>
                                    <div>
                                        <h6 className="text-xl font-bold text-secondary dark:text-white mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dashamoola (Ten Roots)</h6>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">A standard Ayurvedic combination of 10 roots specifically utilized for severe pain and systemic reduction of Vata.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Methods */}
                <section className="mb-24">
                    <h3 className="text-3xl font-bold text-center text-secondary dark:text-white mb-4 font-display">Specialized Applications</h3>
                    <p className="text-center text-slate-500 font-body mb-12 max-w-2xl mx-auto">Used in profound Ayurvedic therapies (Panchakarma) and daily home rituals.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                            <h4 className="text-lg font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">spa</span> Abhyanga (Massage)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">Warm the oil slightly and perform a firm, downward massage over limbs and circular motions over joints. Regular full-body application prevents aging.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                            <h4 className="text-lg font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">bloodtype</span> Janu/Kati Basti
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">Commonly preferred by clinics where warm Mahanarayana Tailam is pooled over the knee (Janu) or lower back (Kati) using a dough ring for intense localized relief.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                            <h4 className="text-lg font-bold text-secondary dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">medication_liquid</span> Oral Intake (Pana)
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed"><strong>*Strictly under medical supervision*</strong>. Small doses are sometimes prescribed orally or via enema (Basti) for severe, systemic neuromuscular disorders.</p>
                        </div>
                    </div>
                </section>

                {/* Note */}
                <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-primary p-6 rounded-r-2xl mb-24">
                    <div className="flex gap-4">
                        <span className="material-symbols-outlined text-primary flex-shrink-0">info</span>
                        <div>
                            <h5 className="font-bold text-secondary dark:text-white mb-1">Authenticity Marker</h5>
                            <p className="text-sm text-slate-700 dark:text-slate-400 font-body leading-relaxed">
                                Genuine Mahanarayana Tailam has a rich, dark amber color and a strong, complex herbal aroma. It may solidify slightly in cold climates; simply place the bottle in warm water to liquefy.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Mahanarayana;
