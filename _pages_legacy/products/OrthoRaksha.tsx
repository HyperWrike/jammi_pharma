"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const OrthoRaksha: React.FC = () => {
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
                    <span className="text-secondary font-bold">OrthoRaksha Oil</span>
                </nav>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Product Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden border border-primary/10 flex items-center justify-center p-8 shadow-sm relative group">
                            <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary">
                                <span className="material-symbols-outlined">share</span>
                            </div>
                            <img alt="Jammi Pharmaceuticals OrthoRaksha Pain Relief Oil Bottle" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFoJgEqrA362zH-WpQn2E6Lh24kZ5v93fMOf5W04Yh8J48n7Q6qI37mY2rQjS36R8r_S4Z7k8M2C6M71xNqA57c61l7O0s50Z9R45D3sWvM73A25o94rL5d-4n7J-H9I3Q19F0L0Q0E1i8P1v0p4aU4L4A6JmH8F6Jm6Y5nKx5w_02kU1-A-Z60M160S-k7Q5Z9-0" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square bg-orange-50 dark:bg-slate-800 rounded-xl border-2 border-primary overflow-hidden p-2 cursor-pointer">
                                <img alt="OrthoRaksha bottle thumbnail" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal opacity-70 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFoJgEqrA362zH-WpQn2E6Lh24kZ5v93fMOf5W04Yh8J48n7Q6qI37mY2rQjS36R8r_S4Z7k8M2C6M71xNqA57c61l7O0s50Z9R45D3sWvM73A25o94rL5d-4n7J-H9I3Q19F0L0Q0E1i8P1v0p4aU4L4A6JmH8F6Jm6Y5nKx5w_02kU1-A-Z60M160S-k7Q5Z9-0" />
                            </div>
                            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2 cursor-pointer hover:border-primary/50 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400">front_hand</span>
                            </div>
                            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2 cursor-pointer hover:border-primary/50 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400">spa</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-2 mb-4">
                            <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Fast Relief
                            </span>
                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Topical Application</span>
                        </div>

                        <h2 className="text-5xl font-bold text-secondary dark:text-primary mb-3 leading-tight font-display">OrthoRaksha Oil</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 font-body italic">Deep Penetrating Ayurvedic Joint & Muscle Pain Relief</p>

                        {/* Ratings Snippet */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="flex text-primary">
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                                <span className="material-symbols-outlined fill-1">star</span>
                            </div>
                            <span className="font-bold text-sm">4.9</span>
                            <span className="text-xs text-slate-500 underline decoration-dotted cursor-pointer hover:text-primary transition-colors">(215 Reviews)</span>
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-4xl font-black text-slate-900 dark:text-white">₹350</span>
                            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-bold">100ml</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-8 font-body">Inclusive of all taxes</p>

                        <div className="space-y-6 border-t border-b border-secondary/10 py-8 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden h-14 w-32 shrink-0">
                                    <button onClick={() => handleQuantityChange('decrease')} className="px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"><span className="material-symbols-outlined">remove</span></button>
                                    <input className="w-full text-center border-none focus:ring-0 bg-transparent font-bold text-lg p-0" type="number" value={quantity} readOnly />
                                    <button onClick={() => handleQuantityChange('increase')} className="px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"><span className="material-symbols-outlined">add</span></button>
                                </div>
                                <button className="flex-1 bg-primary text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* Quick Features */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-body text-sm">
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-amber-500">check_circle</span>
                                non-greasy formula
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-amber-500">check_circle</span>
                                deep tissue penetration
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-amber-500">check_circle</span>
                                soothing warm sensation
                            </div>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-amber-500">check_circle</span>
                                aromatic herbal scent
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlights Banner */}
                <div className="bg-slate-900 text-white rounded-3xl p-10 mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-secondary/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="pt-4 md:pt-0">
                            <h4 className="font-display font-bold text-3xl text-primary mb-1">10x</h4>
                            <p className="text-sm font-body text-slate-300 uppercase tracking-widest">Faster Absorption</p>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <h4 className="font-display font-bold text-3xl text-primary mb-1">12+</h4>
                            <p className="text-sm font-body text-slate-300 uppercase tracking-widest">Active Herbs</p>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <h4 className="font-display font-bold text-3xl text-primary mb-1">0%</h4>
                            <p className="text-sm font-body text-slate-300 uppercase tracking-widest">Mineral Oil</p>
                        </div>
                        <div className="pt-4 md:pt-0">
                            <h4 className="font-display font-bold text-3xl text-primary mb-1">24hr</h4>
                            <p className="text-sm font-body text-slate-300 uppercase tracking-widest">Lasting Comfort</p>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <section className="mb-24">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h3 className="text-4xl font-bold text-secondary dark:text-white mb-4 font-display">Targeted Relief Areas</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-body">Formulated to address various types of musculoskeletal discomfort using ancient Taila Paka Vidhi (traditional oil preparation method).</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block">
                            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">airline_seat_recline_normal</span>
                            </div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display">Back & Neck</h4>
                            <p className="text-sm text-slate-500 font-body leading-relaxed">Eases stiffness from prolonged sitting, poor posture, or sudden sprains.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block">
                            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">directions_walk</span>
                            </div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display">Knee Joints</h4>
                            <p className="text-sm text-slate-500 font-body leading-relaxed">Lubricates joints and reduces inflammation associated with aging or strain.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block">
                            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">sports_gymnastics</span>
                            </div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display">Muscle Soreness</h4>
                            <p className="text-sm text-slate-500 font-body leading-relaxed">Accelerates recovery post-workout by improving local blood circulation.</p>
                        </div>
                        <div className="group p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block">
                            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-3xl">elderly</span>
                            </div>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2 font-display">Arthritic Pain</h4>
                            <p className="text-sm text-slate-500 font-body leading-relaxed">Provides comforting warmth that deeply soothes chronic Vata-related joint issues.</p>
                        </div>
                    </div>
                </section>

                {/* Ingredients Spotlight */}
                <section className="mb-24 bg-gradient-to-b from-transparent to-orange-50/50 dark:to-slate-900/50 rounded-3xl p-6 md:p-12 border border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-6 font-display">Power of Classic Tailams</h3>
                            <p className="text-slate-700 dark:text-slate-300 font-body mb-6 leading-relaxed text-lg">
                                OrthoRaksha is not just a single oil; it is a synergistic blend of revered Ayurvedic Tailams designed to pacify aggravated Vata dosha, the root cause of pain and stiffness.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 font-body mb-8">
                                The base is pure sesame oil (Tila Taila), known for its penetrative property (Sukshma), carrying the therapeutic qualities of herbs deep into bones, muscles, and ligaments.
                            </p>

                            <ul className="space-y-4 font-body">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-1">check</span>
                                    <div>
                                        <strong className="text-secondary dark:text-white">Mahanarayana Tailam:</strong>
                                        <span className="text-slate-600 dark:text-slate-400 ml-1">Nourishes wasted muscles and strengthens bones.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-1">check</span>
                                    <div>
                                        <strong className="text-secondary dark:text-white">Kottamchukkadi Tailam:</strong>
                                        <span className="text-slate-600 dark:text-slate-400 ml-1">Excellent for reducing severe swelling and inflammation.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-1">check</span>
                                    <div>
                                        <strong className="text-secondary dark:text-white">Dhanwantharam Tailam:</strong>
                                        <span className="text-slate-600 dark:text-slate-400 ml-1">A classic vata remedy, helpful in neuro-muscular conditions.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 relative w-full aspect-square md:aspect-video lg:aspect-square">
                            <div className="absolute inset-0 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFoJgEqrA362zH-WpQn2E6Lh24kZ5v93fMOf5W04Yh8J48n7Q6qI37mY2rQjS36R8r_S4Z7k8M2C6M71xNqA57c61l7O0s50Z9R45D3sWvM73A25o94rL5d-4n7J-H9I3Q19F0L0Q0E1i8P1v0p4aU4L4A6JmH8F6Jm6Y5nKx5w_02kU1-A-Z60M160S-k7Q5Z9-0" alt="Herbs and oil abstraction" className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800" />
                        </div>
                    </div>
                </section>

                {/* Application Guide */}
                <section className="mb-24">
                    <h3 className="text-3xl font-bold text-center text-secondary dark:text-white mb-16 font-display">The Art of Application (Abhyanga)</h3>
                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-900 shadow-xl flex items-center justify-center mb-6 relative">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold font-display">1</div>
                                    <span className="material-symbols-outlined text-5xl text-primary">local_fire_department</span>
                                </div>
                                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Warm the Oil</h4>
                                <p className="text-slate-600 dark:text-slate-400 font-body text-sm px-4">Place the required amount of oil in a small bowl and warm it slightly by placing the bowl in hot water.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-900 shadow-xl flex items-center justify-center mb-6 relative">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold font-display">2</div>
                                    <span className="material-symbols-outlined text-5xl text-primary">front_hand</span>
                                </div>
                                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Gentle Massage</h4>
                                <p className="text-slate-600 dark:text-slate-400 font-body text-sm px-4">Apply generously on the affected area. Massage gently in circular motions until the oil is completely absorbed.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-900 shadow-xl flex items-center justify-center mb-6 relative">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold font-display">3</div>
                                    <span className="material-symbols-outlined text-5xl text-primary">hot_tub</span>
                                </div>
                                <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Fomentation</h4>
                                <p className="text-slate-600 dark:text-slate-400 font-body text-sm px-4">For best results, follow up with hot fomentation (hot water bag or warm towel compress) after 30 minutes.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Elements */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
                    <p className="text-center text-slate-500 font-body text-sm uppercase tracking-widest mb-8">Manufactured under strict guidelines ensuring</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">verified</span>
                            <span className="font-bold text-sm">GMP Certified Lab</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">eco</span>
                            <span className="font-bold text-sm">Vegan Friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">cruelty_free</span>
                            <span className="font-bold text-sm">Not Tested on Animals</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-3xl">science</span>
                            <span className="font-bold text-sm">No Paraben & Sulphates</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default OrthoRaksha;
