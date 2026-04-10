"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const TripCaps: React.FC = () => {
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
        <div className="antialiased bg-[#FAF6F0] text-[#1A1A1A] font-sans">
            <style dangerouslySetInnerHTML={{
                __html: `
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .btn-primary {
          background-color: #2E5339;
          color: white;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #1e3826;
          transform: translateY(-1px);
        }
        .badge-saffron {
          background-color: rgba(212, 136, 46, 0.1);
          color: #D4882E;
        }
      `}} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* BEGIN: HeroSection */}
                <section className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start" data-purpose="product-hero">
                    {/* Left: Image Gallery (60%) */}
                    <div className="lg:col-span-6 space-y-4">
                        <nav className="text-xs text-gray-500 mb-4" data-purpose="breadcrumbs">
                            <ol className="flex space-x-2">
                                <li><Link className="hover:text-[#2E5339]" href="/">Home</Link></li>
                                <li><span>/</span></li>
                                <li><Link className="hover:text-[#2E5339]" href="/shop">Therapeutics</Link></li>
                                <li><span>/</span></li>
                                <li className="text-[#2E5339] font-medium">Trip Caps</li>
                            </ol>
                        </nav>
                        <div className="bg-white rounded-2xl p-8 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden h-[600px]">
                            <img alt="Trip Caps Packaging" className="max-w-full max-h-full object-contain" src="./jammi/public/images/Tripcaps_1.png" />
                        </div>
                    </div>
                    {/* Right: Product Info (40%) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold font-serif text-[#2E5339] mb-2"><LiveEditable collection="products_content" docId="tripcaps" field="name">Trip Caps</LiveEditable></h1>
                            <p className="text-lg text-gray-600 italic">For Smooth Movement and Constipation Relief</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-[#D4882E]">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">4.7/5 (128 Reviews)</span>
                        </div>
                        <div className="flex gap-2" data-purpose="badges">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full badge-saffron">Non-Habit Forming</span>
                            <span className="px-3 py-1 text-xs font-semibold rounded-full badge-saffron">Fast Acting</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-baseline space-x-2">
                                <span className="text-3xl font-bold text-[#2E5339]">₹180</span>
                                <span className="text-sm text-gray-500">for 30 capsules</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">Select Pack Size</label>
                            <div className="flex gap-4">
                                <button className="flex-1 py-3 px-4 border-2 border-[#2E5339] rounded-lg text-sm font-medium text-[#2E5339] bg-amber-50">10 x 10 Pack</button>
                                <button className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:border-gray-300 transition-colors">30 Pack (Travel)</button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 pt-4">
                            <div className="flex items-center border-2 border-gray-200 rounded-lg">
                                <button className="px-4 py-3 text-gray-600 hover:text-[#2E5339]" onClick={() => handleQuantityChange('decrease')}>-</button>
                                <span className="px-4 py-3 font-semibold w-12 text-center">{quantity}</span>
                                <button className="px-4 py-3 text-gray-600 hover:text-[#2E5339]" onClick={() => handleQuantityChange('increase')}>+</button>
                            </div>
                            <button className="flex-1 btn-primary py-4 rounded-lg font-bold shadow-lg shadow-[#2E5339]/20">ADD TO CART</button>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-3 text-sm" data-purpose="delivery-info">
                            <svg className="h-6 w-6 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            <p className="text-gray-600 font-medium">Free delivery on orders above ₹500. Expected delivery: <span className="text-[#2E5339]">2-3 days</span>.</p>
                        </div>
                    </div>
                </section>
                {/* END: HeroSection */}
                {/* BEGIN: KeyBenefits */}
                <section className="py-20" data-purpose="key-benefits">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-50">
                            <div className="w-16 h-16 bg-[#D4882E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2E5339] mb-3">Relieves Chronic Constipation</h3>
                            <p className="text-gray-600 text-sm">Gentle yet effective formula designed to tackle long-standing digestive issues without harsh chemicals.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-50">
                            <div className="w-16 h-16 bg-[#D4882E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2E5339] mb-3">Eases Bowel Movements</h3>
                            <p className="text-gray-600 text-sm">Softens stool and improves intestinal motility for a smoother, natural-feeling bathroom experience.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-50">
                            <div className="w-16 h-16 bg-[#D4882E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2E5339] mb-3">No Cramping</h3>
                            <p className="text-gray-600 text-sm">Formulated with carminative herbs to prevent the bloating and griping common with other laxatives.</p>
                        </div>
                    </div>
                </section>
                {/* END: KeyBenefits */}
                {/* BEGIN: DescriptionIngredients */}
                <section className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" data-purpose="details-section">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-[#2E5339]">About Trip Caps</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Trip Caps is a time-tested Ayurvedic formulation designed to provide reliable overnight relief from constipation. Unlike synthetic laxatives that can be harsh on the system, Trip Caps leverages a synergistic blend of <strong>Senna, Haritaki, and Nishoth</strong>.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            These traditional herbs work together to stimulate the natural peristaltic movement of the colon while ensuring the body's electrolyte balance is maintained. It’s the perfect companion for those seeking a natural, non-habit forming way to start their morning feeling light and refreshed.
                        </p>
                        <div className="flex items-center space-x-6 pt-4">
                            <img alt="Ayurvedic Certification" className="h-12 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVSl20UjHGjE6GtbvvxM9Pd_GB8zNITRPqWIdPQxCmSSTJKb8Up8L72TlMkx9oj-IrecRjdE43rfbu4odNHjfDeYCtyIiWMzHHMQPqsQ6ZziHBp1eJjedec-CdE0r2XjYQm7Ty1bI13gx86teoBcGjIZoGNBiJMj4mAFLMzKU7GBOLD84PCXvisNJKuriGULtLFsKWgR4V-K5DGzGZqdXO1yoZqr01ibucZEPTc_AyrDIV_WX9IHS9bdp9EK_FiLBHrLFG0Rhbpn0" />
                            <img alt="100% Natural" className="h-12 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL0A0FQXbQ7OlxuGb5f_T3zL_HCkQIh6oAAddZAzqHf8NmvHmuxmNSRXF1kgrUjUFVI-O3Fy7fNFGPhfXXNrsbH1xowH8S6kbLjB_ULKNyZY78OXFrR8eJEGc_FAdORlgU63qasQNE2DBAJqbml23rixplJRamlViKqaUQhE-zAihGeZq2boNFGWX9i8XarV6MeL_hwGccKOQzMc_vXmPbMLCVKV9-IK3Gi_wTA1IbHspmcN3P8oUcnIOBNM2SQT_1S2Td3h6oCL8" />
                        </div>
                    </div>
                    <div className="bg-[#2E5339] rounded-3xl p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold mb-8">Key Ingredients</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start space-x-4">
                                    <span className="bg-[#D4882E] p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg></span>
                                    <div>
                                        <p className="font-bold text-lg">Senna (Cassia angustifolia)</p>
                                        <p className="text-white/70 text-sm">A natural stimulant laxative that helps clear the bowels efficiently.</p>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <span className="bg-[#D4882E] p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg></span>
                                    <div>
                                        <p className="font-bold text-lg">Ajwain (Trachyspermum ammi)</p>
                                        <p className="text-white/70 text-sm">Relieves gas and indigestion, preventing abdominal discomfort.</p>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <span className="bg-[#D4882E] p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg></span>
                                    <div>
                                        <p className="font-bold text-lg">Black Salt (Kala Namak)</p>
                                        <p className="text-white/70 text-sm">Aids digestion and acts as a mild laxative to soften stools.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    </div>
                </section>
                {/* END: DescriptionIngredients */}
                {/* BEGIN: HowToUse */}
                <section className="py-20 bg-white rounded-3xl my-16 p-12 text-center" data-purpose="usage-guide">
                    <h2 className="text-3xl font-serif font-bold text-[#2E5339] mb-12">How To Use</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#2E5339] text-white rounded-full flex items-center justify-center font-bold mx-auto">1</div>
                            <p className="font-medium">Take 1-2 capsules</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#2E5339] text-white rounded-full flex items-center justify-center font-bold mx-auto">2</div>
                            <p className="font-medium">With warm water</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#2E5339] text-white rounded-full flex items-center justify-center font-bold mx-auto">3</div>
                            <p className="font-medium">Before bed</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-[#2E5339] text-white rounded-full flex items-center justify-center font-bold mx-auto">4</div>
                            <p className="font-medium text-red-600">Not for long-term use</p>
                        </div>
                    </div>
                    <p className="mt-12 text-gray-500 italic text-sm">*Consult your physician if symptoms persist for more than 7 days.</p>
                </section>
                {/* END: HowToUse */}
                {/* BEGIN: TrustBadges */}
                <section className="py-12 border-y border-gray-200 flex flex-wrap justify-around gap-8" data-purpose="trust-badges">
                    <div className="flex items-center space-x-3 grayscale hover:grayscale-0 transition-all">
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        </div>
                        <span className="font-bold text-gray-400">Clinically Tested</span>
                    </div>
                    <div className="flex items-center space-x-3 grayscale hover:grayscale-0 transition-all">
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        </div>
                        <span className="font-bold text-gray-400">Natural Laxative</span>
                    </div>
                    <div className="flex items-center space-x-3 grayscale hover:grayscale-0 transition-all">
                        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.316a10 10 0 01-3.136.967l-2.044.255a2 2 0 01-2.247-1.996V4.75a2 2 0 012.247-1.996l2.044.255a10 10 0 003.136.967l.642.316a6 6 0 013.86.517l2.387.477a2 2 0 011.022.547V15.428z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        </div>
                        <span className="font-bold text-gray-400">GMP Certified</span>
                    </div>
                </section>
                {/* END: TrustBadges */}
                {/* BEGIN: ReviewsSection */}
                <section className="py-20" data-purpose="customer-reviews">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-serif font-bold text-[#2E5339]">Verified Relief</h2>
                        <button className="text-[#D4882E] font-bold flex items-center hover:underline">Write a Review <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex text-[#D4882E] mb-4">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <p className="text-gray-700 mb-6 italic">"Highly effective for chronic issues. I've tried many products, but Trip Caps worked overnight without any stomach pain. Highly recommend for natural relief."</p>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div>
                                    <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="tripcaps" field="benefit1Title">Arjun K.</LiveEditable></p>
                                    <p className="text-xs text-gray-500">Verified Buyer</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex text-[#D4882E] mb-4">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <p className="text-gray-700 mb-6 italic">"The only thing that works for me during travel. It's gentle and doesn't cause urgency, just a smooth movement the next morning."</p>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div>
                                    <p className="font-bold text-sm"><LiveEditable collection="products_content" docId="tripcaps" field="benefit2Title">Meera S.</LiveEditable></p>
                                    <p className="text-xs text-gray-500">Verified Buyer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: ReviewsSection */}
                {/* BEGIN: FAQSection */}
                <section className="py-20 max-w-3xl mx-auto" data-purpose="faq">
                    <h2 className="text-3xl font-serif font-bold text-[#2E5339] mb-10 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm cursor-pointer" open>
                            <summary className="flex justify-between items-center font-bold text-[#2E5339] list-none">
                                Is Trip Caps habit-forming?
                                <span className="group-open:rotate-180 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                            </summary>
                            <p className="mt-4 text-gray-600">Trip Caps is designed to be non-habit forming when used as directed. It stimulates natural bowel functions rather than creating a dependency. However, we recommend using it only when needed.</p>
                        </details>
                        <details className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-[#2E5339] list-none">
                                How long does it take to see results?
                                <span className="group-open:rotate-180 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                            </summary>
                            <p className="mt-4 text-gray-600">Most users experience relief within 6 to 12 hours after consumption. We recommend taking it at bedtime for a smooth bowel movement the following morning.</p>
                        </details>
                        <details className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm cursor-pointer">
                            <summary className="flex justify-between items-center font-bold text-[#2E5339] list-none">
                                Are there any side effects?
                                <span className="group-open:rotate-180 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                            </summary>
                            <p className="mt-4 text-gray-600">Trip Caps is generally safe. Some users may notice a slight change in urine color due to Senna, which is normal and harmless. Overuse may lead to dehydration, so ensure you drink plenty of water.</p>
                        </details>
                    </div>
                </section>
                {/* END: FAQSection */}
                {/* BEGIN: RelatedProducts */}
                <section className="py-20 border-t border-gray-200" data-purpose="related-products">
                    <h2 className="text-3xl font-serif font-bold text-[#2E5339] mb-10">You May Also Need</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="group">
                            <div className="bg-white rounded-2xl p-6 mb-4 border border-gray-100 group-hover:shadow-md transition-shadow aspect-square flex items-center justify-center">
                                <img alt="Digestive Syrup" className="max-h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYp0avxAqFOL_612i_n1WIhnuLSCbfw439LVvKCCSz3s23Hzna2iZUDcj0DlafXcEGFrQi3w92wvuns5PT_KdONHl8H8V7KOtszGxDqDN3TjICWrRwDUMsdwW10_BWETft6rYPHJu5J-Rwcm-w4H7Fd6U1eviRzpw0Kq_tCgMQkIAGoeOFNUKPhnceByXvVjNhkC2rD6Nw_WookPOUfsfIdWHKDBCZcBqJmcRhCRb3hf21Y1qJW9mTsSl-Eb_F8ioPAco50h168Lk" />
                            </div>
                            <h4 className="font-bold text-[#2E5339]">Digest-All Syrup</h4>
                            <p className="text-[#D4882E] font-bold">₹220</p>
                        </div>
                        <div className="group">
                            <div className="bg-white rounded-2xl p-6 mb-4 border border-gray-100 group-hover:shadow-md transition-shadow aspect-square flex items-center justify-center">
                                <img alt="Liver Support" className="max-h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCojJ1wI8HMLemETt32r-uVzGdnFQgOezCXUog4UtKghFdYh6rM4xM_d43jr6FSZtjSOWtY9ha9YHrY5awAVI2Yjq_IOoqmTLcK68RDRfuPUtvau3KfWdTTo1nuc4RBqfF7eOdIFtbsRZR_STodUP9G6zWfg8fWyc5PXR654wVyxJHdeKPdmrSLjcZCwtiOJ0y-nrXo54HTdiQwhCfWn07UpxEmMRs9wQt89x-xnEOMJvp5fZ29aQJurTdRBajKapjIj2uR1wi_lGo" />
                            </div>
                            <h4 className="font-bold text-[#2E5339]">Liva-Care Caps</h4>
                            <p className="text-[#D4882E] font-bold">₹250</p>
                        </div>
                        <div className="group">
                            <div className="bg-white rounded-2xl p-6 mb-4 border border-gray-100 group-hover:shadow-md transition-shadow aspect-square flex items-center justify-center">
                                <img alt="Anti-Acidity" className="max-h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0WVxTrwOpOi0fGMkqtIMs0ZJ4kzq2GQs_1ONFRXmMrOneDWwicOpoyvbpqRKS_SXPBd5NS0Rtb8LJWFCYuwsoa5GqOsjsgrCBfgDbSobKk7nWe9YiJGrGj5hptoV_ru3GFGaPfoDcxTz-eyEegWdn5en1bxhaK_loiQL2thR5wRvTIispZUo9ubD5FcJJwOgyGXQY9nCoRksr1CuB4p_hINjpkkGrW1oVAwf9QucO43qXFC706XscPIjPWOjSyXTNWWRmhitV2XU" />
                            </div>
                            <h4 className="font-bold text-[#2E5339]">Acido-Free Powder</h4>
                            <p className="text-[#D4882E] font-bold">₹150</p>
                        </div>
                        <div className="group">
                            <div className="bg-white rounded-2xl p-6 mb-4 border border-gray-100 group-hover:shadow-md transition-shadow aspect-square flex items-center justify-center">
                                <img alt="Immunity Booster" className="max-h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyO_z_Z7E5TbyTlXFt_2ep6NnBxajUHzYmnK0gP-YLKSl8Kwl955GNDF7rcIgU4tpHuwQdAfWL7aWW_Cg81rjPuudhDNS0c6PMEi0dVgNk4w2a9qUaTQI1Z3bbwLKXY8BpveUGaxmDQdGXfIQ3O98rOKjLp8fCtfk-GRmfI5mc9wegBcJEN-mX_RsAcrbN2SxMurFC8Pp13UhgEjbaBVNxi2b1AnXh6MWNJJZ0-Wb2rhQhiNAV0dh7CZzf2WGqINu-TvSLBa1zlLY" />
                            </div>
                            <h4 className="font-bold text-[#2E5339]">Immu-Vital</h4>
                            <p className="text-[#D4882E] font-bold">₹350</p>
                        </div>
                    </div>
                </section>
                {/* END: RelatedProducts */}
            </main>
        </div>
    );
};

export default TripCaps;
