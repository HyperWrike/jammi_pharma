"use client";
import React, { useEffect } from 'react';
import LiveEditable from '../../components/admin/LiveEditable';

const Combifore: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f8f6f6] dark:bg-[#221610] font-['Public_Sans',sans-serif] text-slate-900 dark:text-slate-100 transition-colors duration-200">
            {/* Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-[#ec5b13]/10 bg-[#f8f6f6]/80 dark:bg-[#221610]/80 backdrop-blur-md">
                <div className="container mx-auto px-4 lg:px-20 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#ec5b13] p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">medical_services</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"><LiveEditable collection="products_content" docId="combifore" field="name">Jammi Pharmaceuticals</LiveEditable></h1>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input className="w-full bg-[#ec5b13]/5 border-none rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#ec5b13] text-sm outline-none" placeholder="Search medicines..." type="text" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#ec5b13]/10 rounded-xl transition-colors">
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </button>
                        <button className="p-2 hover:bg-[#ec5b13]/10 rounded-xl transition-colors">
                            <span className="material-symbols-outlined">person</span>
                        </button>
                        <button className="md:hidden p-2 hover:bg-[#ec5b13]/10 rounded-xl transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 lg:px-20 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
                    <a className="hover:text-[#ec5b13] transition-colors" href="#">Home</a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <a className="hover:text-[#ec5b13] transition-colors" href="#">Wellness</a>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-[#ec5b13] font-medium">Therapeutics</span>
                </nav>
                {/* Product Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-[#ec5b13]/10 shadow-sm relative group">
                            <img className="w-full h-full object-cover" data-alt="Combifore pharmaceutical product packaging bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoANmldJGN2ei3HxNd-AzSTUKm3xyVLCRDvX_fIRbGMxoe4I7rNsK4h-9azLvGOQycjx1q5YFSATmriZ8LuM-SITFKB85NDXnB96TRZBrUOrBeCfXKaijHV-jmZRtEb1OhN-5q5eOnWfShz_lVblrMQnps_N7Cvio3JSkEW6epKzQ4i37bprMovllgLpIzOSw23Lu3bMQvdJ-7VQLW0gu3ndbHznyCWZF8UJ3zkkJhlYy0yArD54yh7OfUgSbanzltpQkfPppv10M" />
                            <div className="absolute top-4 left-4 bg-[#ec5b13] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Natural Relief</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="aspect-square rounded-lg border-2 border-[#ec5b13] overflow-hidden cursor-pointer bg-white">
                                <img className="w-full h-full object-cover opacity-80" data-alt="Combifore front view product shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYhYMrFX0Vw_q--1O-65kVdt42Oxv0cSS5yzFOF9Yev_sEvM6Emu5TzVtY-AT3wuci2MCVWrrhlUu_aBsXgE0wc1QIJTTEf8rAwzucmEYes9nr4FHsnIJ6GqbhS3AI5Ppyd5vx-6Sb7_HkVRhHLeLD8SCyqlNU8Iy_-0tVhcqW7VMX2e1jLz8GuLW9H9OFn2OZ9eHymoY5VydRr0m4xb3LQnyGspz18zI4QHzeU4ewf4LTMkBrS6ofXf_smONLgT-7CeU8g_Dgreg" />
                            </div>
                            <div className="aspect-square rounded-lg border border-[#ec5b13]/10 overflow-hidden cursor-pointer hover:border-[#ec5b13] transition-colors bg-white">
                                <img className="w-full h-full object-cover" data-alt="Herbal ingredients arrangement" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl1F9mcwLj8PmedEMWwn3u6XW-Zx9MaXzUCr98bFXWpwYJFjNzskxjg5mb_7-hV-mvXK85isqxj_YSih0s-6joksIgAP3EZD7NnXVI5kX1YN-mwszQcF9U19Qnd_Y8aIMN5fPL5Y9VjAdCuXliev1jKS0bqVqr3qvbP1vzNjdx5NiojARSrR7j9PzN_Anm8IsmanffQNHLcEJUnSdDKfHzu6QrW7pV2nFBpd09qOheVwKaxm5rl4wps5V7-5DJyZX57ELKzx5oOVY" />
                            </div>
                            <div className="aspect-square rounded-lg border border-[#ec5b13]/10 overflow-hidden cursor-pointer hover:border-[#ec5b13] transition-colors bg-white">
                                <img className="w-full h-full object-cover" data-alt="Close up of pharmaceutical tablets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2A-Xrbi76Gpnsez2Qixx44GcN-o1ZRwQl_DjOABqq3tkompyT58F5GbM8TE-_EOIlbGo9P_bUkTaWfe_E-lCKM2_lCWTxqDDY4apgNh8SbPSHRmdrsXdAeDevz4aaLXUc9yWE7zkwKjazbuF_D_3OvLlRQXplk81nhDDNsJGfcas5lxpqmfUGV16O1s6iEuZPRaQElqIgOoOOzRKZ_9w7Z4H4JwT5qoQ1ob1Yi5tx4TpMtHRUsMrJheCINK_IcF6pEsVkGHd_nzc" />
                            </div>
                            <div className="aspect-square rounded-lg border border-[#ec5b13]/10 overflow-hidden cursor-pointer hover:border-[#ec5b13] transition-colors bg-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#ec5b13]">play_circle</span>
                            </div>
                        </div>
                    </div>
                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Combifore</h2>
                            <p className="text-[#ec5b13] font-semibold text-lg">Wellness / Therapeutics</p>
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center text-amber-500">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined">star_half</span>
                            </div>
                            <span className="text-slate-500 text-sm font-medium">(124 Customer Reviews)</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                            Combifore is a premium therapeutic solution specifically engineered for anti-arthritic support and effective pain relief. Our proprietary blend of traditional herbs provides systemic relief for joint discomfort and mobility issues.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-[#ec5b13]/5 rounded-xl border border-[#ec5b13]/10">
                                <span className="material-symbols-outlined text-[#ec5b13]">verified</span>
                                <span className="text-sm font-bold">Anti-arthritic</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-[#ec5b13]/5 rounded-xl border border-[#ec5b13]/10">
                                <span className="material-symbols-outlined text-[#ec5b13]">health_metrics</span>
                                <span className="text-sm font-bold">Pain Relief</span>
                            </div>
                        </div>
                        <div className="mb-8">
                            <p className="text-slate-500 text-sm mb-2">Prescription Required</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">$34.99</span>
                                <span className="text-lg text-slate-400 line-through">$45.00</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button className="flex-1 bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#ec5b13]/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">shopping_cart</span>
                                Add to Cart
                            </button>
                            <button className="px-8 py-4 border-2 border-[#ec5b13]/20 hover:border-[#ec5b13] text-[#ec5b13] font-bold rounded-xl transition-colors active:scale-95">
                                Bulk Inquiry
                            </button>
                        </div>
                    </div>
                </div>
                {/* Key Benefits Section */}
                <section className="py-16 border-t border-[#ec5b13]/10">
                    <h3 className="text-2xl font-bold mb-10 text-center">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-[#ec5b13]/5 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#ec5b13]/10 text-[#ec5b13] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">mop</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">Joint Mobility</h4>
                            <p className="text-slate-600 dark:text-slate-400">Significantly reduces stiffness in joints, enhancing overall range of motion and daily functionality.</p>
                        </div>
                        <div className="p-8 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-[#ec5b13]/5 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#ec5b13]/10 text-[#ec5b13] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">bolt</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">Rapid Relief</h4>
                            <p className="text-slate-600 dark:text-slate-400">Quick-acting formula targets localized pain and inflammation for faster comfort when you need it most.</p>
                        </div>
                        <div className="p-8 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-[#ec5b13]/5 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-[#ec5b13]/10 text-[#ec5b13] rounded-full flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">shield</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3">Long-term Care</h4>
                            <p className="text-slate-600 dark:text-slate-400">Supports the maintenance of healthy cartilage and bone density with regular directed use.</p>
                        </div>
                    </div>
                </section>
                {/* Ingredients Section */}
                <section className="py-16 bg-[#ec5b13]/5 rounded-3xl px-8 lg:px-20 mb-20">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h3 className="text-3xl font-bold mb-4">Core Ingredients</h3>
                        <p className="text-slate-600 dark:text-slate-400 italic">Scientifically balanced Ayurvedic formulation</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                    <img className="w-full h-full object-cover" data-alt="Close up of Sallaki herb resin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTF6EMFbzHtuqJAy3fhbqsf_a-VUgMpihN2r2G8RQYa9RfTcM14Gw6IN-86j14R5I536s5EZ--g1iPw5azmxWQSH6kpGUgxzCqQQIIporA-a6ST6mQwoxhlKuxjILPaqmCOcB4zogjjpYy0wT3rUX5mvhqSP4iqnM3SryZCgGZCBK6FkeXF-Mp9rEDHnX4jcDF_JRCPcIWMjEh64wzMvToyX6Cni-pIKzlcF4WEyl_Wv7OWTuGlNuKAEqRx3GWdMFu0d7x9jYASPY" />
                                </div>
                            </div>
                            <h5 className="text-xl font-bold mb-2">Sallaki</h5>
                            <p className="text-sm text-slate-500">(Boswellia Serrata)</p>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Potent anti-inflammatory agent that prevents joint tissue degradation.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                    <img className="w-full h-full object-cover" data-alt="Commiphora mukul guggul resin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANqkW3wogAJal_oMc3ESYrASi570DubP__fRr9p9KQFrn0pYqIFLBhUL2JIoHOiZuamxVwc-AIkj3uBke0vkJZjttlPEreTdgNDGVK5_m8Tl2WsxRFHnuuigtYMxnwlEHLy3yEIqxIYEWUJbzGEQ7h1F1qg96F8k9HG2dclfWOpzkA-mR6N0xNBTVA3fyopICJtBuccZ7QM8CEuHsPKAI9kJpDoTT6GTFYO7S_aHwESYuOejmrhOEh4PVtNeTfWJAjKyHJnNvbEiw" />
                                </div>
                            </div>
                            <h5 className="text-xl font-bold mb-2">Guggul</h5>
                            <p className="text-sm text-slate-500">(Commiphora Mukul)</p>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Clears toxins from joints and reduces swelling through metabolic support.</p>
                        </div>
                        <div className="text-center group">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                    <img className="w-full h-full object-cover" data-alt="Dried ashwagandha roots" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6LwsQ7GgKeQpdceJidTqnxr6v3-H0RGUQHkz-1RtbyFdHQlQP6aWuIiWSBtWqRu6UXl98KQqouj4F9PkPhDPMDesyL-T_ErAx7hmhEWk73LSRqDbB6GXyAGWT3VSa41ISxtQn_iX4Rx0HpJeMpIY3XhecHxw_sF53FaF2u8nKx41QMbH6QWGVCd6U5caIjFl7T8VUvUQhlCVJQSl1ljCIrqAr3c_hJiKJvaAs5ZCZSKDY1wNtFIgdyJCFKxJxhJ5FmmOrOGrUlC0" />
                                </div>
                            </div>
                            <h5 className="text-xl font-bold mb-2">Ashwagandha</h5>
                            <p className="text-sm text-slate-500">(Withania Somnifera)</p>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Adaptonenic properties that strengthen the musculoskeletal system.</p>
                        </div>
                    </div>
                </section>
                {/* Usage Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 bg-[#ec5b13]/10 text-[#ec5b13] px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <span className="material-symbols-outlined text-sm">info</span>
                            Medical Advisory
                        </div>
                        <h3 className="text-3xl font-bold mb-6">How to Use</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ec5b13] text-white flex items-center justify-center font-bold">1</div>
                                <div>
                                    <p className="font-bold mb-1">Dosage</p>
                                    <p className="text-slate-600 dark:text-slate-400">Take as directed by your physician. Typical usage involves one tablet twice daily after meals.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ec5b13] text-white flex items-center justify-center font-bold">2</div>
                                <div>
                                    <p className="font-bold mb-1">Consistency</p>
                                    <p className="text-slate-600 dark:text-slate-400">Maintain a regular schedule for optimum results. It may take 2-4 weeks to observe peak therapeutic benefits.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ec5b13] text-white flex items-center justify-center font-bold">3</div>
                                <div>
                                    <p className="font-bold mb-1">Consultation</p>
                                    <p className="text-slate-600 dark:text-slate-400 italic">Always consult with a healthcare professional before starting any new therapeutic regimen.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl">
                        <img className="w-full h-full object-cover" data-alt="Doctor explaining prescription to a patient" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI_WdYDrY4z6aeZxK8g7W5A-TfeJpPOJFahaU3dIcpKHBGoQAaA7Ip4E6VIlmnReGnM4-xoRYEkfjmT62Tl5ZAkBDYBrmzIOOqkQEv4xHkrmFqtte4YNQJ2EgLJPEAhqgUdj9ULY9JyRQlbVqiFYECsXGz94ncH23PkW5Pu6Lvt1_uAlrDWt_C3L20A0FMieSPNlxtkcVjegXJM7Rv8KSrSYiAGV2OxMcAPbxGVAUr3l83u7OIp1yF4Sz64lq_T0k29ODhIVcW1fw" />
                    </div>
                </section>
                {/* Reviews Section */}
                <section className="border-t border-[#ec5b13]/10 pt-16 mb-20">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-bold">Patient Reviews</h3>
                        <button className="text-[#ec5b13] font-bold hover:underline flex items-center gap-1">
                            See all reviews
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Review 1 */}
                        <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-[#ec5b13]/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#ec5b13]/20 flex items-center justify-center text-[#ec5b13] font-bold">SM</div>
                                <div>
                                    <p className="font-bold">Suresh Menon</p>
                                    <div className="flex text-amber-500 scale-75 -ml-4">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                </div>
                                <span className="ml-auto text-xs text-slate-400">2 days ago</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">Combifore has been a life-changer for my morning stiffness. I feel much more active throughout the day.</p>
                        </div>
                        {/* Review 2 */}
                        <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-[#ec5b13]/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#ec5b13]/20 flex items-center justify-center text-[#ec5b13] font-bold">AR</div>
                                <div>
                                    <p className="font-bold">Anita Rao</p>
                                    <div className="flex text-amber-500 scale-75 -ml-4">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="material-symbols-outlined">star</span>
                                    </div>
                                </div>
                                <span className="ml-auto text-xs text-slate-400">1 week ago</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">Great product for knee pain. Highly recommended for elders who prefer Ayurvedic solutions without side effects.</p>
                        </div>
                    </div>
                </section>
            </main>
            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-16">
                <div className="container mx-auto px-4 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 text-white mb-6">
                                <div className="bg-[#ec5b13] p-1.5 rounded-lg">
                                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                                </div>
                                <h2 className="text-xl font-bold tracking-tight">Jammi Pharmaceuticals</h2>
                            </div>
                            <p className="max-w-md mb-8">
                                Pioneering holistic healthcare since 1900. Combining ancient Ayurvedic wisdom with modern pharmacological excellence.
                            </p>
                            <div className="flex gap-4">
                                <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ec5b13] transition-colors" href="#">
                                    <span className="material-symbols-outlined">public</span>
                                </a>
                                <a className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ec5b13] transition-colors" href="#">
                                    <span className="material-symbols-outlined">mail</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-6">Quick Links</h5>
                            <ul className="space-y-4">
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Our Products</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">About Jammi</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Research Center</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-white font-bold mb-6">Support</h5>
                            <ul className="space-y-4">
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Find a Clinic</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Returns Policy</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">Privacy Policy</a></li>
                                <li><a className="hover:text-[#ec5b13] transition-colors" href="#">FAQs</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-sm flex flex-col md:flex-row justify-between gap-4">
                        <p>© 2024 Jammi Pharmaceuticals. All rights reserved.</p>
                        <p>Manufactured in GMP certified facility.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Combifore;
