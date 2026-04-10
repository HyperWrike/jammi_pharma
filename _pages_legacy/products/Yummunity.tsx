"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const Yummunity: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('200ml');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc') {
            setQuantity(prev => (prev < 99 ? prev + 1 : prev));
        } else if (type === 'dec' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="bg-[#FAF6F0] text-[#333] font-sans antialiased min-h-screen">
            <style dangerouslySetInnerHTML={{
                __html: `
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">

                {/* BEGIN: HeroSection */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20" data-purpose="product-hero" id="hero">
                    {/* Left: Image (60%) */}
                    <div className="lg:col-span-7 flex justify-center items-start bg-white rounded-3xl p-8 shadow-sm">
                        <img
                            alt="Yummunity Kids Immunity Booster Syrup"
                            className="w-[500px] h-[500px] object-contain hover:scale-105 transition-transform duration-500"
                            data-purpose="main-product-image"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV9QrMuN8Vqm-s4vRJ2n7vXTMxvX3G_vhOthF0fOTOjxd0Nqr5RrLWhsMwoRE0Qp5hPt7cqk8vCeVHoTGAc-h2PH3W6TG1qTl9LHn3Tjbf830wHBTiJzmLKyZXDg7bCH_dhbLAseQU7KGs2NRNmhtj_OAHaNnpiLL_Ixq-QfGjRIDe1Ri_o-ljr9J7zLbhG1bOZdjRK3Yb-c6OdQOIsf-AiJ42xwRKXfUT9i3j-uG_BrXzOMjTNQG_d6ysTjf6lg9glW1N86nkzYE"
                        />
                    </div>

                    {/* Right: Product Info (40%) */}
                    <div className="lg:col-span-5 flex flex-col gap-6" data-purpose="product-details">
                        {/* Breadcrumbs */}
                        <nav className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            <Link href="/" className="hover:text-[#D4882E] transition-colors">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href="/shop" className="hover:text-[#D4882E] transition-colors">Wellness</Link>
                            <span className="mx-2 text-[#D4882E]">/</span>
                            Yummunity
                        </nav>

                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-5xl font-bold font-serif text-[#2E5339] leading-tight flex flex-col"><LiveEditable collection="products_content" docId="yummunity" field="name"><span>Yummunity Kids</span>
                                <span>Immunity Booster</span></LiveEditable></h1>
                            <p className="text-xl text-gray-600 font-light">The tastiest way to boost your child’s health</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex text-[#D4882E]">
                                {/* Stars */}
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm font-semibold">4.9/5</span>
                            <span className="text-sm text-gray-400 font-medium underline cursor-pointer hover:text-gray-600 transition-colors">312 reviews</span>
                        </div>

                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-[#2E5339]/10 text-[#2E5339] text-xs font-bold rounded-full uppercase tracking-tight italic">Kid Friendly</span>
                            <span className="px-3 py-1 bg-[#2E5339]/10 text-[#2E5339] text-xs font-bold rounded-full uppercase tracking-tight italic">No Added Sugar</span>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-gray-900">₹299</span>
                            <span className="text-lg text-gray-400 line-through">₹350</span>
                            <span className="text-sm font-bold text-amber-600">15% OFF</span>
                        </div>

                        <div className="space-y-4">
                            <div data-purpose="size-selector">
                                <span className="text-sm font-bold block mb-2 text-gray-700">Size Selection</span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setSelectedSize('200ml')}
                                        className={`px-6 py-2 border-2 rounded-lg font-bold text-sm transition-colors ${selectedSize === '200ml'
                                                ? 'border-[#D4882E] bg-[#D4882E]/5 text-[#D4882E]'
                                                : 'border-gray-200 text-gray-400 hover:border-[#D4882E]/50'
                                            }`}
                                    >
                                        200ml
                                    </button>
                                    <button
                                        onClick={() => setSelectedSize('500ml')}
                                        className={`px-6 py-2 border-2 rounded-lg font-bold text-sm transition-colors ${selectedSize === '500ml'
                                                ? 'border-[#D4882E] bg-[#D4882E]/5 text-[#D4882E]'
                                                : 'border-gray-200 text-gray-400 hover:border-[#D4882E]/50'
                                            }`}
                                    >
                                        500ml
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-2 bg-white" data-purpose="quantity-stepper">
                                    <button
                                        onClick={() => handleQuantityChange('dec')}
                                        className="text-xl font-bold px-2 text-gray-500 hover:text-[#D4882E] transition-colors disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <input
                                        className="w-12 text-center border-none focus:ring-0 font-bold text-lg bg-transparent"
                                        readOnly
                                        type="text"
                                        value={quantity}
                                    />
                                    <button
                                        onClick={() => handleQuantityChange('inc')}
                                        className="text-xl font-bold px-2 text-gray-500 hover:text-[#D4882E] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="flex-1 bg-[#D4882E] text-white font-bold rounded-xl py-4 hover:bg-opacity-90 transition-all shadow-lg shadow-[#D4882E]/20 text-lg active:scale-[0.98]">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100">
                            <svg className="w-6 h-6 text-[#2E5339] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                            </svg>
                            <div className="text-sm">
                                <span className="block font-bold">Delivery by Tomorrow</span>
                                <span className="text-gray-500">Free delivery on orders above ₹499</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: HeroSection */}

                {/* BEGIN: KeyBenefits */}
                <section className="mb-20" data-purpose="benefits-grid" id="benefits">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#FAF6F0] hover:border-[#D4882E] transition-colors group">
                            <div className="w-16 h-16 bg-[#2E5339]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-serif mb-3 text-[#2E5339]">Boosts Immunity</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Formulated to strengthen your child's natural defense mechanism against environmental stressors.</p>
                        </div>

                        <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#FAF6F0] hover:border-[#D4882E] transition-colors group">
                            <div className="w-16 h-16 bg-[#2E5339]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.286a1 1 0 00.961.725H15"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-serif mb-3 text-[#2E5339]">Delicious Fruit Flavor</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">No more tantrums! A taste children actually love, making health routines stress-free for parents.</p>
                        </div>

                        <div className="p-8 bg-white rounded-3xl shadow-sm border border-[#FAF6F0] hover:border-[#D4882E] transition-colors group">
                            <div className="w-16 h-16 bg-[#2E5339]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold font-serif mb-3 text-[#2E5339]">Packed with Vitamin C</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Natural sources of Vitamin C through Amla to provide all-day energy and vitality.</p>
                        </div>
                    </div>
                </section>
                {/* END: KeyBenefits */}

                {/* BEGIN: DescriptionIngredients */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20" data-purpose="product-description-ingredients" id="details">
                    {/* Left: Description (65%) */}
                    <div className="lg:col-span-8 space-y-6">
                        <h2 className="text-3xl font-bold font-serif text-[#2E5339] border-b-2 border-[#D4882E] pb-4 inline-block">Product Overview</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>Yummunity is a pediatric-focused Ayurvedic syrup crafted with ancient wisdom and modern precision. Specifically designed to protect children from seasonal infections, it builds a resilient immune system from within.</p>
                            <p>We understand that giving medicine to children can be a challenge. That's why Yummunity features a natural, kid-approved flavor profile without the use of harsh synthetic chemicals or excessive sugar. It's the perfect daily companion for school-going children.</p>
                            <ul className="list-disc pl-6 space-y-2 text-[#2E5339] font-medium">
                                <li>Protects against cold, cough, and flu</li>
                                <li>Improves appetite and digestive health</li>
                                <li>Enhances cognitive growth and physical vitality</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Ingredients (35%) */}
                    <div className="lg:col-span-4 bg-[#2E5339] text-white p-8 rounded-3xl shadow-xl">
                        <h3 className="text-2xl font-bold font-serif mb-8 italic">Key Ingredients</h3>
                        <ul className="space-y-8">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#E9C46A] shrink-0">01</div>
                                <div>
                                    <span className="block font-bold font-serif text-lg mb-1">Amla (Indian Gooseberry)</span>
                                    <span className="text-sm text-gray-300">Richest source of natural Vitamin C and antioxidants.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#E9C46A] shrink-0">02</div>
                                <div>
                                    <span className="block font-bold font-serif text-lg mb-1">Ashwagandha</span>
                                    <span className="text-sm text-gray-300">Helps in stress management and improves physical strength.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[#E9C46A] shrink-0">03</div>
                                <div>
                                    <span className="block font-bold font-serif text-lg mb-1">Giloy (Guduchi)</span>
                                    <span className="text-sm text-gray-300">Known as 'Amrita' for its powerful immune-modulating properties.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                {/* END: DescriptionIngredients */}

                {/* BEGIN: HowToUse */}
                <section className="mb-20 py-16 bg-white rounded-[3rem] shadow-sm text-center px-8" id="usage">
                    <h2 className="text-4xl font-bold font-serif text-[#2E5339] mb-12">How to Use</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
                        <div className="space-y-4 group">
                            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#D4882E] flex items-center justify-center mx-auto text-[#D4882E] text-2xl font-black group-hover:bg-[#D4882E] group-hover:text-white transition-all cursor-default">1</div>
                            <p className="font-bold text-[#2E5339]">Give 5-10ml</p>
                            <span className="text-xs text-gray-400 block">Standard serving size</span>
                        </div>

                        <div className="space-y-4 group">
                            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#D4882E] flex items-center justify-center mx-auto text-[#D4882E] text-2xl font-black group-hover:bg-[#D4882E] group-hover:text-white transition-all cursor-default">2</div>
                            <p className="font-bold text-[#2E5339]">Twice daily</p>
                            <span className="text-xs text-gray-400 block">Regular consistency is key</span>
                        </div>

                        <div className="space-y-4 group">
                            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#D4882E] flex items-center justify-center mx-auto text-[#D4882E] text-2xl font-black group-hover:bg-[#D4882E] group-hover:text-white transition-all cursor-default">3</div>
                            <p className="font-bold text-[#2E5339]">After meals</p>
                            <span className="text-xs text-gray-400 block">For optimal absorption</span>
                        </div>

                        <div className="space-y-4 group">
                            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#D4882E] flex items-center justify-center mx-auto text-[#D4882E] text-2xl font-black group-hover:bg-[#D4882E] group-hover:text-white transition-all cursor-default">4</div>
                            <p className="font-bold text-[#2E5339]">Shake well before use</p>
                            <span className="text-xs text-gray-400 block">To mix herbal extracts</span>
                        </div>
                    </div>
                </section>
                {/* END: HowToUse */}

                {/* BEGIN: TrustBadges */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20" id="trust">
                    <div className="flex items-center gap-6 p-6 bg-[#2E5339] text-white rounded-2xl hover:bg-[#25422D] transition-colors">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold font-serif text-lg">100% Safe for Kids</h4>
                            <p className="text-xs text-gray-300">Pediatrician recommended formulations.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-[#2E5339] text-white rounded-2xl hover:bg-[#25422D] transition-colors">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold font-serif text-lg">No Side Effects</h4>
                            <p className="text-xs text-gray-300">Made with pure botanical extracts.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-[#2E5339] text-white rounded-2xl hover:bg-[#25422D] transition-colors">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold font-serif text-lg">AYUSH Licensed</h4>
                            <p className="text-xs text-gray-300">Certified Ayurvedic medicine.</p>
                        </div>
                    </div>
                </section>
                {/* END: TrustBadges */}

                {/* BEGIN: ReviewsSection */}
                <section className="mb-20" id="reviews">
                    <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
                        <div>
                            <h2 className="text-3xl font-bold font-serif text-[#2E5339]">What Parents Say</h2>
                            <p className="text-gray-500 mt-1">Real stories from our community of parents.</p>
                        </div>
                        <button className="text-[#D4882E] font-bold hover:underline transition-all">Write a Review</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex text-[#D4882E] mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"Finally an immunity syrup that my kids don't run away from! The taste is excellent and I've noticed they've been much more active and fall ill less often."</p>
                            <span className="font-bold text-[#2E5339]">— Ananya S., Mother of 2</span>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex text-[#D4882E] mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"Great product from a brand we trust. It has definitely helped my son recover faster from common colds. Highly recommended for school-going kids."</p>
                            <span className="font-bold text-[#2E5339]">— Dr. Rahul M., Pediatrician &amp; Father</span>
                        </div>
                    </div>
                </section>
                {/* END: ReviewsSection */}

                {/* BEGIN: RelatedProducts */}
                <section className="mb-20" id="related">
                    <h2 className="text-3xl font-bold font-serif text-[#2E5339] mb-8 border-b border-gray-200 pb-4">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        {/* Related Product 1 */}
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-[#D4882E]/30 transition-all text-center group cursor-pointer">
                            <Link href="/product/kids-brain-tonic" className="absolute inset-0 z-10 hidden">View</Link>
                            <div className="bg-[#FAF6F0] rounded-2xl p-4 mb-4 h-48 flex items-center justify-center overflow-hidden">
                                <img
                                    alt="Brain Tonic"
                                    className="h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0yzOLX-L89thcZAvm799GxuZ7MdkNVSkDaiggo5W3qZjRSBZp-8G2sCM3h5ar6wuPc1hxqGpBqEEvMgYXH-3SxdRyf5X8vLriCMPRe9Nor0ok7c4n9Q5IuUVlHAhHI4sMtm2RFNDzD_X_xUM6UQuW4tWXVOicM5ZlGXV7EwrsivSFCJ4rRkXqD2W1MdRdz0b_9sVEywOEfpM2dH6cwNFG_ObTriKbxABfvyOvQmvQlLOduhNi8RLUHt4Rietr-kbx-CG8UGjxfs4"
                                />
                            </div>
                            <h4 className="font-bold font-serif text-[#2E5339]">Kids Brain Tonic</h4>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-1">Enhance focus &amp; memory</p>
                            <p className="font-bold text-[#D4882E]">₹450</p>
                        </div>

                        {/* Related Product 2 */}
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-[#D4882E]/30 transition-all text-center group cursor-pointer">
                            <Link href="/product/nutri-growth-oil" className="absolute inset-0 z-10 hidden">View</Link>
                            <div className="bg-[#FAF6F0] rounded-2xl p-4 mb-4 h-48 flex items-center justify-center overflow-hidden">
                                <img
                                    alt="Growth Oil"
                                    className="h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvs0Mwpneyke1icyZaDSxlPJ_0iW8y4crFb5aexJ2AwRwmlyrJSnktoLn110nDpMlZMuzRtBjc8nkCb-uI9YCvObf3gVCgUgg1AaxMmzTfLxgP9B_ejg_SDG67wXtTDKFzYnLWWQGI1i0qN0Kxh50jry6D0BTRLeMIfIUtLsw49tC4MVpKaH1dh2YfB11ROyl4V6cfrcFAUBgTeqnGpuoezqgdoA5HlEesJO6WVD-0LLvkJ6lrFqqjz887juTfuh3JRjM24HVXB6w"
                                />
                            </div>
                            <h4 className="font-bold font-serif text-[#2E5339]">Nutri-Growth Oil</h4>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-1">Stronger bones &amp; muscles</p>
                            <p className="font-bold text-[#D4882E]">₹325</p>
                        </div>

                        {/* Related Product 3 */}
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-[#D4882E]/30 transition-all text-center group cursor-pointer">
                            <Link href="/product/calm-sleep-syrup" className="absolute inset-0 z-10 hidden">View</Link>
                            <div className="bg-[#FAF6F0] rounded-2xl p-4 mb-4 h-48 flex items-center justify-center overflow-hidden">
                                <img
                                    alt="Sleep Syrup"
                                    className="h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBlTWUNrDEPnnoRQKGibzVRtlY8w9WfrtHESqR5nfy8vuqnqAqUshX2shz_bIiI0gZ-lnRpm8tVBCziVgkmZVk3P-nfFlHVPz-3jfusNN-PlkJ9IKFRaxc0qIFOZuPHTikftlTC1DUTaVBlAkcMjZVaqKNCfq_scJPAiHWrqr9OQHdeQaxtYApz6ZNUJyRo8AKP9E3ronx7oUZY2aotJrVM397q7wQMh7FCW4auFPHvIRu8CxsSdMOVv70hNcEz_i4QHABmrb2iJE"
                                />
                            </div>
                            <h4 className="font-bold font-serif text-[#2E5339]">Calm Sleep Syrup</h4>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-1">Natural soothing formula</p>
                            <p className="font-bold text-[#D4882E]">₹380</p>
                        </div>

                        {/* Related Product 4 */}
                        <div className="bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-lg hover:border-[#D4882E]/30 transition-all text-center group cursor-pointer">
                            <Link href="/product/easy-digest-churna" className="absolute inset-0 z-10 hidden">View</Link>
                            <div className="bg-[#FAF6F0] rounded-2xl p-4 mb-4 h-48 flex items-center justify-center overflow-hidden">
                                <img
                                    alt="Digestive Churna"
                                    className="h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnfz2NE7o6od1vsbpzUtyXDxANkKuWCfcTgPzzIfX_hynbEGLqyZZQcglrZLdAigYcP0U-3Ix6hRk4Z0yLJTP68KCtW_9e6Y6BnWfm5S5U9LAp8RCCTBM0qs4JUDnK7PycNYK3jSabWzSDLQHmcpv8O4-yyA0qaKPvkreXgl7ofyyiXp-zMoZnhjQ0OAJlp5mMCYF44TqjRQUpjRShaAlPa0AjvOQvf7DWKzsJ5NDtI2KoV0gPT4XI5iloa58uRlZUOhEMIq6xDXQ"
                                />
                            </div>
                            <h4 className="font-bold font-serif text-[#2E5339]">Easy Digest Churna</h4>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-1">Gentle tummy support</p>
                            <p className="font-bold text-[#D4882E]">₹199</p>
                        </div>
                    </div>
                </section>
                {/* END: RelatedProducts */}

                {/* BEGIN: FAQSection */}
                <section className="mb-20" id="faq">
                    <h2 className="text-3xl font-bold font-serif text-[#2E5339] mb-8 text-center border-b border-gray-200 pb-4 inline-block translate-x-1/2 right-[50%] relative">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-4">

                        <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm" open>
                            <summary className="flex justify-between items-center p-6 cursor-pointer font-bold font-serif text-[#2E5339] list-none select-none hover:bg-gray-50 transition-colors">
                                What is the recommended age for Yummunity?
                                <span className="group-open:rotate-180 transition-transform text-[#D4882E]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-white">
                                Yummunity is formulated specifically for children aged 1 to 12 years. For infants under 1 year, we recommend consulting your pediatrician before use.
                            </div>
                        </details>

                        <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <summary className="flex justify-between items-center p-6 cursor-pointer font-bold font-serif text-[#2E5339] list-none select-none hover:bg-gray-50 transition-colors">
                                Are there any artificial sweeteners in the syrup?
                                <span className="group-open:rotate-180 transition-transform text-[#D4882E]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-white">
                                No, Yummunity uses natural fruit-based flavors and minimal raw honey for sweetness. It contains no artificial colors or synthetic sweeteners.
                            </div>
                        </details>

                        <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <summary className="flex justify-between items-center p-6 cursor-pointer font-bold font-serif text-[#2E5339] list-none select-none hover:bg-gray-50 transition-colors">
                                How long should I give this to my child?
                                <span className="group-open:rotate-180 transition-transform text-[#D4882E]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-white">
                                For best results, we recommend a continuous course of 3 months, especially during seasonal transitions or when starting school.
                            </div>
                        </details>

                    </div>
                </section>
                {/* END: FAQSection */}

            </main>
        </div>
    );
};

export default Yummunity;