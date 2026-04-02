"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const PyrilDS: React.FC = () => {
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
                    <span className="text-secondary font-bold">Pyril-DS</span>
                </nav>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Product Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-secondary/5 flex items-center justify-center p-8 shadow-sm relative">
                            <div className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 animate-pulse">Fast Acting</div>
                            <img alt="Jammi Pharmaceuticals Pyril-DS Tablets Packaging" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrd58mP3oJof89JnsJ6w9Qk3e9W6f7r7_L5s2n-G7Tlkx_T_V4Btvf5x_X9G4hJz1v2i-r5f8z7l0b1k8sA3b2d1_qZ_vT4p5wK6j3y3g2s0-F-4x8w_z5qY-5hX7jM-oZ2v9OZh2a8Y7z3Q1n1oW3o_6vG7qF-X1p1_2R1sH4c3wWxzG7wOq-d-y7aQZ12gM4p-F5pX_8oGqL2Z1Y8bN3c4E1s8oX8nZ1m3K2o9s-G7p4Y" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border-2 border-primary overflow-hidden p-2 cursor-pointer">
                                <img alt="Pyril-DS tablets thumbnail" className="w-full h-full object-contain opacity-50 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGxuA_zhtwHScYFlEoAo9FXFr0PAn6Ia_0F_QQtNCqGwq52veUW50d7qKFvrjj6zpwNIND6idTSASf9iFI8xe3Ajxb7glz8Y6GaE8R5iNoq97-CZ_7gw4zYy_6kYtaoYaHeFMY14-ccOXl4-Z-h4B4d912lRY2z_8KoVyPLYoXfHSzYD_yOpDaFTIlOcjUFpuXUoX2pmR-WeQnCJZv6iHrSY_sI9SqbJ2rjcU9azr3lXb4j0N9GnZwgUHhk1ZsWZr7xbVL6Ntxh9c" />
                            </div>
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2 cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">image</span>
                                </div>
                            </div>
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2 cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">image</span>
                                </div>
                            </div>
                            <div className="aspect-square bg-white dark:bg-slate-800 rounded-xl border border-secondary/5 overflow-hidden p-2 cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center relative group">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-3xl">play_circle</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="flex gap-2 mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">High Potency</span>
                            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Antipyretic</span>
                        </div>
                        <h2 className="text-5xl font-bold text-secondary dark:text-primary mb-2 leading-tight">Pyril-DS</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 font-body italic">Advanced Relief from Fever & Viral Infections</p>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">₹145</span>
                            <p className="text-sm text-slate-500 font-body">per strip (10 tablets)</p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-4 rounded-r-lg mb-8">
                            <p className="text-sm text-red-700 dark:text-red-400 font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-500">warning</span>
                                Double Strength Formula
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 ml-6">For severe instances. Please consult dosage before use.</p>
                        </div>

                        <div className="space-y-6 border-t border-b border-secondary/10 py-8 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden h-12">
                                    <button onClick={() => handleQuantityChange('decrease')} className="px-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><span className="material-symbols-outlined">remove</span></button>
                                    <input className="w-12 text-center border-none focus:ring-0 bg-transparent font-bold" type="number" value={quantity} readOnly />
                                    <button onClick={() => handleQuantityChange('increase')} className="px-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"><span className="material-symbols-outlined">add</span></button>
                                </div>
                                <button className="flex-1 bg-primary text-white font-bold h-12 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                                <span className="material-symbols-outlined text-secondary">shield</span>
                                <div className="text-xs">
                                    <p className="font-bold text-secondary">Immunity Boost</p>
                                    <p className="text-slate-500">Strengthens defense</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10">
                                <span className="material-symbols-outlined text-secondary">thermometer_minus</span>
                                <div className="text-xs">
                                    <p className="font-bold text-secondary">Temp Control</p>
                                    <p className="text-slate-500">Fast action</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Efficacy Strip */}
                <div className="bg-gradient-to-r from-secondary to-primary text-white rounded-3xl p-8 mb-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center shadow-xl shadow-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-4xl mb-2 drop-shadow-md">coronavirus</span>
                        <p className="font-bold text-lg">Anti-Viral</p>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
                        <span className="material-symbols-outlined text-4xl mb-2 drop-shadow-md">local_fire_department</span>
                        <p className="font-bold text-lg">Anti-Pyretic</p>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
                        <span className="material-symbols-outlined text-4xl mb-2 drop-shadow-md">healing</span>
                        <p className="font-bold text-lg">Analgesic</p>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0">
                        <span className="material-symbols-outlined text-4xl mb-2 drop-shadow-md">health_and_safety</span>
                        <p className="font-bold text-lg">Safe Profile</p>
                    </div>
                </div>

                {/* Benefits Section */}
                <section className="mb-20">
                    <h3 className="text-3xl font-bold text-center text-secondary dark:text-primary mb-4">Why Choose Pyril-DS?</h3>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">A comprehensive approach to managing fevers, body aches, and viral loads without compromising your stomach lining or liver health.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/5 hover:border-primary/30 transition-colors group">
                            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-6 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">device_thermostat</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-secondary dark:text-white">Rapid Fever Reduction</h4>
                            <p className="text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed">Swiftly brings down high body temperatures by inducing healthy perspiration and regulating internal thermostats.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/5 hover:border-primary/30 transition-colors group">
                            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">accessibility_new</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-secondary dark:text-white">Alleviates Body Ache</h4>
                            <p className="text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed">Potent analgesic properties help soothe severe muscle and joint pains commonly associated with viral infections.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/5 hover:border-primary/30 transition-colors group">
                            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">sanitizer</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-secondary dark:text-white">Combats Viral Load</h4>
                            <p className="text-slate-600 dark:text-slate-400 font-body text-sm leading-relaxed">Contains herbs with scientifically proven anti-viral properties that help the body fight off the root cause of the infection.</p>
                        </div>
                    </div>
                </section>

                {/* Deep Dive & Ingredients */}
                <div className="mb-20">
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] p-8 md:p-16 border border-secondary/5">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <div className="lg:w-1/2">
                                <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-6">The Science Behind Pyril-DS</h3>
                                <p className="text-slate-700 dark:text-slate-300 font-body mb-6 leading-relaxed">
                                    Fever (Jwara) in Ayurveda is not just a symptom but a complex systemic disorder involving the Rasa dhatu (plasma) and internal fire (Agni). Pyril-DS does not merely suppress the temperature; it works on <strong>Amachana</strong> (digesting toxins).
                                </p>
                                <p className="text-slate-700 dark:text-slate-300 font-body leading-relaxed">
                                    By clearing the micro-channels (Srotas) and promoting sweating, it allows the trapped heat to escape naturally, ensuring the fever does not easily relapse. The "DS" (Double Strength) profile ensures it tackles even stubborn, high-grade fevers effectively.
                                </p>
                            </div>
                            <div className="lg:w-1/2">
                                <h3 className="text-2xl font-bold text-secondary dark:text-primary mb-6">Key Active Ingredients</h3>
                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-secondary/5 flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">G</div>
                                        <div>
                                            <h5 className="font-bold text-secondary dark:text-white">Guduchi (Tinospora Cordifolia)</h5>
                                            <p className="text-sm text-slate-500 font-body">Powerful immunomodulator and anti-pyretic. Reduces fever and stops recurring infections.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-secondary/5 flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">T</div>
                                        <div>
                                            <h5 className="font-bold text-secondary dark:text-white">Tulsi (Ocimum Sanctum)</h5>
                                            <p className="text-sm text-slate-500 font-body">Rich in essential oils, acts as a diaphoretic (promotes sweating) forcing out the fever.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-secondary/5 flex items-center gap-4 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">K</div>
                                        <div>
                                            <h5 className="font-bold text-secondary dark:text-white">Kalmegh (Andrographis Paniculata)</h5>
                                            <p className="text-sm text-slate-500 font-body">Known as the 'king of bitters', it possesses potent anti-viral and liver-protecting properties.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dosage Instructions */}
                <section className="mb-20 text-center">
                    <h3 className="text-3xl font-bold text-secondary dark:text-primary mb-12">Recommended Dosage</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="w-full sm:w-64 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-primary/20 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">man</span>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Adults</h4>
                            <p className="text-2xl font-black text-slate-900 dark:text-white mb-4">1-2 Tablets</p>
                            <p className="text-sm text-slate-500 font-body mb-2">Thrice a day</p>
                            <p className="text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4 mt-4">Or as directed by physician</p>
                        </div>
                        <div className="w-full sm:w-64 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-secondary/10 relative overflow-hidden opacity-90">
                            <span className="material-symbols-outlined text-4xl text-secondary mb-4">child_care</span>
                            <h4 className="text-xl font-bold text-secondary dark:text-white mb-2">Children (above 12)</h4>
                            <p className="text-2xl font-black text-slate-900 dark:text-white mb-4">1 Tablet</p>
                            <p className="text-sm text-slate-500 font-body mb-2">Twice a day</p>
                            <p className="text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4 mt-4">Consult doctor first</p>
                        </div>
                    </div>
                </section>

                {/* Supportive Care */}
                <section className="bg-secondary/5 rounded-3xl p-8 lg:p-12 mb-20 border border-secondary/10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                            <span className="material-symbols-outlined text-5xl text-secondary">local_library</span>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-secondary dark:text-primary mb-2">Jammi's Doctor Tip</h4>
                            <p className="text-slate-700 dark:text-slate-300 font-body leading-relaxed">
                                "When battling a fever, digestion is strictly compromised. Take Pyril-DS strictly with warm water. Avoid heavy, oily, or cold foods. Stick to light gruel (kanji) or warm soups until the temperature normalizes. Do not suppress natural urges or expose yourself to cold drafts."
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PyrilDS;
