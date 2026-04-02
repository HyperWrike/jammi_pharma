"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const ThyroGard: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

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
        <div className="bg-[#FAF6F0] text-[#1a150f] font-sans antialiased selection:bg-[#2E5339] selection:text-[#FAF6F0]">
            <style dangerouslySetInnerHTML={{
                __html: `
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}} />

            {/* Main Content Layout */}
            <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 pt-24" id="main-content">

                {/* Breadcrumb Path */}
                <nav aria-label="Breadcrumb" className="mb-12">
                    <ol className="flex items-center space-x-3 text-sm font-medium tracking-wider uppercase">
                        <li><Link href="/" className="text-gray-400 hover:text-[#D4882E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4882E] rounded px-1 -ml-1">Home</Link></li>
                        <li><span aria-hidden="true" className="text-gray-300">/</span></li>
                        <li><Link href="/shop" className="text-gray-400 hover:text-[#D4882E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4882E] rounded px-1">Endocrine Health</Link></li>
                        <li><span aria-hidden="true" className="text-gray-300">/</span></li>
                        <li aria-current="page" className="text-[#2E5339] font-bold px-1">ThyroGard</li>
                    </ol>
                </nav>

                {/* Hero Product Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16 mb-32 items-center">

                    {/* Left: Product Imagery Suite */}
                    <div className="relative isolate">
                        {/* Background design element */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2E5339]/5 to-[#D4882E]/10 rounded-[3rem] -z-10 transform -rotate-3 scale-105"></div>

                        {/* Main Image Container */}
                        <div className="bg-white rounded-[3rem] p-16 aspect-square max-h-[700px] flex items-center justify-center border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.03)] relative overflow-hidden group">

                            {/* Product Status Badges */}
                            <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
                                <span className="bg-[#2E5339] text-[#FAF6F0] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-md flex items-center gap-2 max-w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                    Ayush Approved
                                </span>
                                <span className="bg-white text-[#D4882E] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-sm border border-[#D4882E]/20 max-w-fit">
                                    60 Tablets
                                </span>
                            </div>

                            {/* The Product Image */}
                            <img
                                alt="ThyroGard Bottle Presentation"
                                className="w-full max-w-[450px] object-contain drop-shadow-[0_30px_40px_rgba(46,83,57,0.15)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:-translate-y-2 relative z-10"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqT9dMXXW5hL1vjB5rQjV9R8Hk1eS8JqP4QpEaMItTqZfR_mZ4LItSik51A5r5g81g8N2IinXyVq7S16Q2gE4LIfP5kG9PzvFq8A04wzU4L4A2OWeM29_gD9R1L7BvM8X8P6D8T1MvW4M6H4K8JqGqZ6qZ6qZ6qZ6qZ6qZ6qZ6qZ6qZ6qZ"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                                }}
                            />

                            {/* Decorative inner glow */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#FAF6F0]/80 to-transparent z-0"></div>
                        </div>

                        {/* Visual Highlights Floating Elements */}
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-50 flex flex-col items-center gap-1 z-30 animate-float-slow">
                            <span className="text-[#2E5339] font-bold text-lg">100%</span>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center leading-tight">Plant<br />Based</span>
                        </div>
                    </div>

                    {/* Right: Product Details & Cart Actions */}
                    <div className="flex flex-col">

                        {/* Heading & Subheading */}
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 text-[#D4882E] font-bold uppercase tracking-[0.2em] text-xs mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Metabolic Support
                            </div>
                            <h1 className="text-5xl lg:text-6xl xl:text-[4.5rem] font-bold font-serif text-[#1a150f] leading-none mb-6"><LiveEditable collection="products_content" docId="thyrogard" field="name">ThyroGard</LiveEditable></h1>
                            <p className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-xl">
                                Holistic Ayurvedic regulation for optimal thyroid function, energy metabolism, and hormonal harmony.
                            </p>
                        </div>

                        {/* Ratings Summary */}
                        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-gray-200">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-6 h-6 text-[#D4882E] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                ))}
                            </div>
                            <span className="text-lg font-bold text-[#1a150f]">4.9</span>
                            <span className="text-gray-400">|</span>
                            <a href="#reviews" className="text-sm font-medium text-gray-500 hover:text-[#2E5339] border-b border-gray-300 hover:border-[#2E5339] transition-colors pb-0.5">Read 85 Reviews</a>
                        </div>

                        {/* Price Display */}
                        <div className="mb-10 flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl font-bold tracking-tight text-[#2E5339]">₹650</span>
                                <span className="text-2xl text-gray-400 font-light line-through">₹799</span>
                                <span className="bg-red-50 text-red-600 font-bold text-sm px-3 py-1 rounded-md uppercase tracking-wider ml-auto lg:ml-4">Save 18%</span>
                            </div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Inclusive of all taxes</span>
                        </div>

                        {/* Purchase Options Form */}
                        <div className="space-y-8 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">

                            {/* Supply Selection */}
                            <div>
                                <h3 className="text-sm font-bold text-[#1a150f] uppercase tracking-widest mb-4">Select Supply</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* One Month Supply Option */}
                                    <label className="relative cursor-pointer group">
                                        <input type="radio" name="supply" className="peer sr-only" defaultChecked />
                                        <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#2E5339] peer-checked:bg-[#2E5339]/5 transition-all text-center">
                                            <span className="block font-bold text-lg text-[#1a150f] group-hover:text-[#2E5339] transition-colors">1 Month</span>
                                            <span className="block text-sm text-gray-500 mt-1">1 Bottle • ₹650</span>
                                        </div>
                                    </label>

                                    {/* Three Month Supply Option (Best Value) */}
                                    <label className="relative cursor-pointer group">
                                        {/* Best Value Badge */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4882E] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-sm whitespace-nowrap">
                                            Best Value
                                        </div>
                                        <input type="radio" name="supply" className="peer sr-only" />
                                        <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-[#2E5339] peer-checked:bg-[#2E5339]/5 transition-all text-center h-full flex flex-col justify-center relative overflow-hidden">
                                            {/* Discount visual indicator inside selected state */}
                                            <div className="absolute inset-0 bg-amber-500/10 scale-0 peer-checked:scale-100 transition-transform duration-300 rounded-lg -z-10 origin-bottom"></div>

                                            <span className="block font-bold text-lg text-[#1a150f] group-hover:text-[#2E5339] transition-colors">3 Months</span>
                                            <span className="block text-sm text-gray-500 mt-1">3 Bottles • <span className="text-[#2E5339] font-bold">₹1755</span></span>
                                            <span className="block text-xs text-amber-600 font-bold mt-1">Extra 10% Off</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons: Qty + Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-16">

                                {/* Quantity Input */}
                                <div className="flex items-center justify-between bg-[#FAF6F0] rounded-xl border border-gray-200 p-1 sm:w-40 h-16 sm:h-full">
                                    <button
                                        className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#1a150f] hover:bg-white rounded-lg transition-all focus:outline-none"
                                        aria-label="Decrease quantity"
                                        onClick={() => handleQuantityChange('dec')}
                                        disabled={quantity <= 1}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                    </button>
                                    <span className="font-bold text-xl text-[#1a150f] w-10 text-center select-none" aria-live="polite">{quantity}</span>
                                    <button
                                        className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#1a150f] hover:bg-white rounded-lg transition-all focus:outline-none"
                                        aria-label="Increase quantity"
                                        onClick={() => handleQuantityChange('inc')}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    </button>
                                </div>

                                {/* Primary CTA */}
                                <button className="flex-1 bg-[#1a150f] hover:bg-[#2E5339] text-white font-bold h-16 sm:h-full rounded-xl shadow-lg transition-all duration-300 text-lg uppercase tracking-wider flex justify-center items-center gap-3 relative overflow-hidden group">
                                    {/* Shine Effect */}
                                    <span className="absolute top-0 -left-[100%] w-1/2 h-full skew-x-12 bg-white/20 group-hover:left-[200%] transition-all duration-700 ease-in-out"></span>

                                    <span className="relative z-10 flex items-center gap-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                        Add to Cart
                                    </span>
                                </button>
                            </div>

                            {/* Minor Trust Policies */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    GMP Certified
                                </div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                                    Clinically Tested
                                </div>
                            </div>

                        </div>
                    </div>

                </section>

                {/* Detailed Content / Tabbed Area */}
                <section className="mb-32">

                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold font-serif text-[#1a150f] mb-4">Discover the Details</h2>
                        <div className="w-24 h-1 bg-[#D4882E] mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden isolate relative">

                        {/* Background decorative blob for tabs section */}
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FAF6F0] to-white -z-10"></div>

                        {/* Tab Navigation List */}
                        <ul className="flex flex-col sm:flex-row relative z-10 border-b border-gray-100" role="tablist">
                            {[
                                { id: 'description', label: 'The Science' },
                                { id: 'ingredients', label: 'Key Ingredients' },
                                { id: 'benefits', label: 'Core Benefits' },
                                { id: 'usage', label: 'How to Consume' }
                            ].map((tab) => (
                                <li key={tab.id} className="flex-1" role="presentation">
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full py-6 px-4 text-center font-bold tracking-widest uppercase text-sm transition-all outline-none border-b-2
                          ${activeTab === tab.id
                                                ? 'text-[#2E5339] border-[#2E5339] bg-white'
                                                : 'text-gray-400 border-transparent hover:text-gray-900 hover:bg-gray-50/50'
                                            }`}
                                        role="tab"
                                        aria-selected={activeTab === tab.id}
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Tab Content Panels */}
                        <div className="p-8 sm:p-12 lg:p-20 min-h-[500px] relative z-10">

                            {/* Panel 1: The Science */}
                            {activeTab === 'description' && (
                                <article className="animate-fade-in" role="tabpanel">
                                    <h3 className="text-3xl lg:text-4xl font-serif font-bold text-[#1a150f] mb-8 leading-tight max-w-3xl">Restoring the Delicate Balance of Your Endocrine System</h3>

                                    <div className="grid md:grid-cols-2 gap-12 items-start">
                                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                                            <p>
                                                In Ayurveda, thyroid dysfunctions are often mapped to an imbalance in the <em className="text-[#2E5339] font-medium not-italic">Pittavrita Vata</em> and <em className="text-[#2E5339] font-medium not-italic">Kaphavrita Vata</em>. ThyroGard is meticulously formulated to address these root doshic imbalances rather than merely treating the superficial symptoms.
                                            </p>
                                            <p>
                                                Unlike synthetic hormones that replace your body's natural function, this herbal complex acts as an adaptogen and glandular tonic. It nourishes the thyroid gland, gently stimulating or calming its activity as needed, helping your body return to its natural state of homeostasis.
                                            </p>
                                        </div>

                                        <div className="bg-[#FAF6F0] p-8 rounded-3xl border border-[#D4882E]/20 relative overflow-hidden">
                                            <div className="absolute -right-4 -top-4 text-9xl text-white opacity-50 font-serif font-black leading-none pointer-events-none">"</div>
                                            <h4 className="font-bold text-[#1a150f] text-xl mb-4 relative z-10">The Ayurvedic Approach</h4>
                                            <p className="text-gray-700 relative z-10 leading-relaxed">
                                                We focus on clearing the subtle channels (Srotas) of the neck region, ensuring proper nutrient delivery and efficient metabolic waste removal, which is critical for healthy follicular function in the thyroid gland.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            )}

                            {/* Panel 2: Ingredients */}
                            {activeTab === 'ingredients' && (
                                <article className="animate-fade-in" role="tabpanel">

                                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                                        {/* Card 1 */}
                                        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#2E5339]/30 transition-all flex flex-col items-center text-center group">
                                            <div className="w-20 h-20 rounded-full bg-[#FAF6F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <img src="https://img.icons8.com/color/96/000000/leaf.png" alt="Leaf Icon" className="w-10 h-10 opacity-80" />
                                            </div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-2 font-serif">Kanchanara</h4>
                                            <p className="text-xs font-bold text-[#D4882E] uppercase tracking-widest mb-4">Bauhinia variegata</p>
                                            <p className="text-gray-600 font-light text-sm leading-relaxed">The primary herb for glandular swelings. It helps regulate thyroid volume and nodular growths effectively.</p>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#2E5339]/30 transition-all flex flex-col items-center text-center group">
                                            <div className="w-20 h-20 rounded-full bg-[#FAF6F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <img src="https://img.icons8.com/color/96/000000/spa-flower.png" alt="Flower Icon" className="w-10 h-10 opacity-80" />
                                            </div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-2 font-serif">Guggulu</h4>
                                            <p className="text-xs font-bold text-[#D4882E] uppercase tracking-widest mb-4">Commiphora mukul</p>
                                            <p className="text-gray-600 font-light text-sm leading-relaxed">A powerful resin that clears metabolic blockages, supports fat metabolism, and acts synergistically with Kanchanara.</p>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#2E5339]/30 transition-all flex flex-col items-center text-center group md:col-span-2 xl:col-span-1">
                                            <div className="w-20 h-20 rounded-full bg-[#FAF6F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <img src="https://img.icons8.com/color/96/000000/root.png" alt="Root Icon" className="w-10 h-10 opacity-80" />
                                            </div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-2 font-serif">Ashwagandha</h4>
                                            <p className="text-xs font-bold text-[#D4882E] uppercase tracking-widest mb-4">Withania somnifera</p>
                                            <p className="text-gray-600 font-light text-sm leading-relaxed">Reduces cortisol-induced stress on the endocrine system, combating the fatigue common in thyroid disorders.</p>
                                        </div>

                                    </div>
                                </article>
                            )}

                            {/* Panel 3: Benefits */}
                            {activeTab === 'benefits' && (
                                <article className="animate-fade-in" role="tabpanel">

                                    <div className="max-w-4xl mx-auto space-y-4">
                                        {/* Benefit Row 1 */}
                                        <div className="flex bg-[#FAF6F0] rounded-2xl p-6 items-center gap-6 group hover:bg-[#2E5339] transition-colors">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 text-[#D4882E] shadow-sm">
                                                <span className="font-bold text-xl font-serif">01</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#1a150f] group-hover:text-white transition-colors mb-2">Metabolic Regulation</h4>
                                                <p className="text-gray-600 group-hover:text-gray-200 transition-colors font-light">Assists in managing unexplained weight fluctuations by optimizing basal metabolic rate safely.</p>
                                            </div>
                                        </div>

                                        {/* Benefit Row 2 */}
                                        <div className="flex bg-[#FAF6F0] rounded-2xl p-6 items-center gap-6 group hover:bg-[#2E5339] transition-colors">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 text-[#D4882E] shadow-sm">
                                                <span className="font-bold text-xl font-serif">02</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#1a150f] group-hover:text-white transition-colors mb-2">Energy Restoration</h4>
                                                <p className="text-gray-600 group-hover:text-gray-200 transition-colors font-light">Combats chronic fatigue and lethargy, providing sustained, natural energy throughout the day.</p>
                                            </div>
                                        </div>

                                        {/* Benefit Row 3 */}
                                        <div className="flex bg-[#FAF6F0] rounded-2xl p-6 items-center gap-6 group hover:bg-[#2E5339] transition-colors">
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 text-[#D4882E] shadow-sm">
                                                <span className="font-bold text-xl font-serif">03</span>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#1a150f] group-hover:text-white transition-colors mb-2">Hormonal Mood Support</h4>
                                                <p className="text-gray-600 group-hover:text-gray-200 transition-colors font-light">Helps stabilize mood swings and reduces anxiety by promoting overall endocrine balance.</p>
                                            </div>
                                        </div>
                                    </div>

                                </article>
                            )}

                            {/* Panel 4: Usage */}
                            {activeTab === 'usage' && (
                                <article className="animate-fade-in" role="tabpanel">

                                    <div className="flex flex-col md:flex-row shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">

                                        {/* Dosage Info */}
                                        <div className="flex-1 bg-white p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-[#D4882E]/10 rounded-full flex items-center justify-center text-[#D4882E]">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                </div>
                                                <h4 className="text-2xl font-bold font-serif text-[#1a150f]">Dosage Rules</h4>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-lg text-gray-700"><strong className="text-[#2E5339]">Adults:</strong> 2 tablets</p>
                                                <p className="text-lg text-gray-700"><strong className="text-[#2E5339]">Frequency:</strong> Twice daily</p>
                                                <p className="text-lg text-gray-700"><strong className="text-[#2E5339]">Timing:</strong> After meals</p>
                                            </div>
                                        </div>

                                        {/* Instruction Details */}
                                        <div className="flex-1 bg-[#FAF6F0] p-10 flex flex-col justify-center relative overflow-hidden">
                                            {/* Decorative element */}
                                            <svg className="absolute -right-10 -bottom-10 w-40 h-40 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"></path></svg>

                                            <h4 className="text-xl font-bold text-[#1a150f] mb-4 relative z-10">Important Administration Note</h4>
                                            <p className="text-gray-600 leading-relaxed font-light relative z-10 mb-6">
                                                Consume with warm water. If you are currently taking synthetic thyroid medication (like Thyroxine), maintain a gap of at least 2 hours between medications. Do not immediately stop prescribed medications; consult your endocrinologist for gradual tapering.
                                            </p>
                                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D4882E] border-b border-[#D4882E] pb-1 w-max relative z-10 cursor-pointer">Consult our Ayurvedic Doctor</span>
                                        </div>
                                    </div>

                                </article>
                            )}

                        </div>
                    </div>
                </section>

            </main>

            {/* Embedded Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.98) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInScale 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

        </div>
    );
};

export default ThyroGard;
