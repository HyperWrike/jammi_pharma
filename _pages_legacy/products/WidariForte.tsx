"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const WidariForte: React.FC = () => {
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
        <div className="bg-[#FAF6F0] text-[#1a150f] font-sans antialiased">
            <style dangerouslySetInnerHTML={{
                __html: `
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24" id="main-content">

                {/* Breadcrumb Navigation */}
                <nav aria-label="Breadcrumb" className="mb-8 text-sm font-medium tracking-wide">
                    <ol className="flex items-center space-x-2 text-gray-500">
                        <li><Link href="/" className="hover:text-[#D4882E] transition-colors">Home</Link></li>
                        <li><span aria-hidden="true" className="text-[#D4882E] mx-1">/</span></li>
                        <li><Link href="/shop" className="hover:text-[#D4882E] transition-colors">Women's Wellness</Link></li>
                        <li><span aria-hidden="true" className="text-[#D4882E] mx-1">/</span></li>
                        <li aria-current="page" className="text-[#2E5339] font-bold">Widari Forte</li>
                    </ol>
                </nav>

                {/* Product Hero Section */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">

                    {/* Left Column: Product Image Gallery */}
                    <div className="lg:col-span-6 relative">
                        <div className="bg-white rounded-3xl p-10 flex items-center justify-center min-h-[500px] border border-gray-100 shadow-sm relative overflow-hidden group">
                            {/* Badge */}
                            <div className="absolute top-6 left-6 z-10 bg-[#2E5339] text-[#FAF6F0] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                                Ayurvedic Supplement
                            </div>

                            {/* Main Image */}
                            <img
                                alt="Widari Forte Bottle Container"
                                className="w-full max-w-[400px] max-h-[500px] object-contain drop-shadow-2xl transition-transform duration-700 ease-in-out group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqT9dMXXW5hL1vjB5rQjV9R8Hk1eS8JqP4QpEaMItTqZfR_mZ4LItSik51A5r5g81g8N2IinXyVq7S16Q2gE4LIfP5kG9PzvFq8A04wzU4L4A2OWeM29_gD9R1L7BvM8X8P6D8T1MvW4M6H4K8JqGqZ6qZ6qZ6qZ6qZ6qZ6qZ6qZ6qZ6qZ"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                                }}
                            />

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4882E]/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#2E5339]/5 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* Thumbnail Navigation Placeholder */}
                        {/* <div className="mt-6 flex gap-4 hidden overflow-x-auto pb-2">
               [Thumbnails would go here]
            </div> */}
                    </div>

                    {/* Right Column: Product Information & Purchase */}
                    <div className="lg:col-span-6 flex flex-col justify-center">

                        {/* Header Info */}
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-serif text-[#2E5339] leading-tight mb-4"><LiveEditable collection="products_content" docId="widariforte" field="name">Widari Forte</LiveEditable></h1>
                            <p className="text-xl text-gray-600 font-light leading-relaxed">
                                Comprehensive nutritional support specifically formulated for pregnant and nursing mothers, promoting holistic maternal health and child development.
                            </p>
                        </div>

                        {/* Ratings & Reviews */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-[#D4882E]" aria-label="4.8 out of 5 stars">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg className="w-5 h-5 text-[#D4882E]/30 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                            <span className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-[#2E5339] transition-colors cursor-pointer">4.8 (120+ Reviews)</span>
                        </div>

                        {/* Pricing Section */}
                        <div className="border-t border-b border-gray-200 py-6 mb-8">
                            <div className="flex items-end gap-3 mb-2">
                                <span className="text-4xl lg:text-5xl font-bold tracking-tight text-[#1a150f]">₹599</span>
                                <span className="text-xl text-gray-400 line-through mb-1">₹750</span>
                            </div>
                            <p className="text-sm font-bold text-[#D4882E] uppercase tracking-wider">Inclusive of all taxes</p>
                        </div>

                        {/* Key Benefits Tags */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2E5339]/20 text-[#2E5339] text-sm font-semibold shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Lactation Support
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2E5339]/20 text-[#2E5339] text-sm font-semibold shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Maternal Immunity
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2E5339]/20 text-[#2E5339] text-sm font-semibold shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 100% Herbal
                            </span>
                        </div>

                        {/* Purchase Controls */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">

                                {/* Quantity Stepper */}
                                <div className="flex items-center bg-white border border-gray-300 rounded-xl h-14 w-32 shadow-sm">
                                    <button
                                        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#D4882E] transition-colors focus:outline-none disabled:opacity-50"
                                        aria-label="Decrease quantity"
                                        onClick={() => handleQuantityChange('dec')}
                                        disabled={quantity <= 1}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                    </button>
                                    <input
                                        className="w-full text-center font-bold text-lg border-none bg-transparent focus:ring-0 p-0"
                                        type="number"
                                        value={quantity}
                                        readOnly
                                        aria-label="Quantity"
                                    />
                                    <button
                                        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-[#D4882E] transition-colors focus:outline-none"
                                        aria-label="Increase quantity"
                                        onClick={() => handleQuantityChange('inc')}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="flex-1 bg-[#2E5339] hover:bg-[#203a28] text-white font-bold h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-lg tracking-wide uppercase flex justify-center items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    Add to Cart
                                </button>
                            </div>

                            {/* Trust Subtext */}
                            <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2 pt-2">
                                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Secure Checkout &amp; Free Shipping on orders over ₹999
                            </p>
                        </div>

                    </div>
                </section>

                {/* Tabbed Content Section */}
                <section className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-24">

                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100 uppercase tracking-widest text-sm font-bold overflow-x-auto hide-scrollbar">
                        {['description', 'ingredients', 'benefits', 'usage'].map(tabId => (
                            <button
                                key={tabId}
                                onClick={() => setActiveTab(tabId)}
                                className={`flex-1 py-6 px-4 whitespace-nowrap outline-none transition-colors border-b-2
                  ${activeTab === tabId
                                        ? 'text-[#D4882E] border-[#D4882E] bg-orange-50/30'
                                        : 'text-gray-400 border-transparent hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tabId.charAt(0).toUpperCase() + tabId.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content Areas */}
                    <div className="p-8 lg:p-16 min-h-[400px]">

                        {/* Description Tab */}
                        {activeTab === 'description' && (
                            <div className="animate-fade-in">
                                <h3 className="text-3xl font-serif font-bold text-[#2E5339] mb-6">Nurturing the Mother to Nurture the Child</h3>
                                <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light max-w-4xl">
                                    <p>Widari Forte is an Ayurvedic restorative tonic conceptualized specifically for the delicate phases of pregnancy and postpartum recovery. Grounded in the ancient text of charaka samhita, this formulation acts as a Rasayana (rejuvenator).</p>
                                    <p>Pregnancy and lactation place immense demands on a mother's body, often depleting essential nutrient reserves. Widari Forte is designed to replenish these vital tissues (Dhatus), combat fatigue, and provide a rich source of natural iron and calcium that is easily assimilated by the body without causing gastrointestinal distress.</p>
                                    <div className="bg-[#FAF6F0] p-6 rounded-xl border border-[#D4882E]/20 mt-8 text-[#1a150f] font-medium flex gap-4 items-start">
                                        <svg className="w-6 h-6 text-[#D4882E] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <p>Unlike synthetic prenatals, Ayurvedic formulations are 'bio-available'—meaning your body recognizes the natural plant structure, resulting in higher absorption rates and zero side-effects like constipation.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ingredients Tab */}
                        {activeTab === 'ingredients' && (
                            <div className="animate-fade-in">
                                <h3 className="text-3xl font-serif font-bold text-[#2E5339] mb-10">Pure Botanical Ingredients</h3>
                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">

                                    {/* Ingredient 1 */}
                                    <div className="flex gap-5">
                                        <div className="w-16 h-16 rounded-full bg-[#2E5339]/5 flex items-center justify-center shrink-0 border border-[#2E5339]/20">
                                            <span className="font-serif font-bold text-2xl text-[#2E5339]">W</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-1">Widari (Pueraria tuberosa)</h4>
                                            <p className="text-sm font-bold text-[#D4882E] mb-2 uppercase tracking-wide">The Primary Herb</p>
                                            <p className="text-gray-600 leading-relaxed">A renowned galactagogue that significantly increases breast milk production while strengthening the immune system.</p>
                                        </div>
                                    </div>

                                    {/* Ingredient 2 */}
                                    <div className="flex gap-5">
                                        <div className="w-16 h-16 rounded-full bg-[#2E5339]/5 flex items-center justify-center shrink-0 border border-[#2E5339]/20">
                                            <span className="font-serif font-bold text-2xl text-[#2E5339]">S</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-1">Shatavari (Asparagus racemosus)</h4>
                                            <p className="text-sm font-bold text-[#D4882E] mb-2 uppercase tracking-wide">The Women's Tonic</p>
                                            <p className="text-gray-600 leading-relaxed">Balances female reproductive hormones, reduces inflammation, and acts as a powerful adaptogen against stress.</p>
                                        </div>
                                    </div>

                                    {/* Ingredient 3 */}
                                    <div className="flex gap-5">
                                        <div className="w-16 h-16 rounded-full bg-[#2E5339]/5 flex items-center justify-center shrink-0 border border-[#2E5339]/20">
                                            <span className="font-serif font-bold text-2xl text-[#2E5339]">A</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-1">Ashwagandha (Withania somnifera)</h4>
                                            <p className="text-sm font-bold text-[#D4882E] mb-2 uppercase tracking-wide">The Stress Reliever</p>
                                            <p className="text-gray-600 leading-relaxed">Combats postpartum fatigue and weakness, promoting better sleep quality and mental well-being.</p>
                                        </div>
                                    </div>

                                    {/* Ingredient 4 */}
                                    <div className="flex gap-5">
                                        <div className="w-16 h-16 rounded-full bg-[#2E5339]/5 flex items-center justify-center shrink-0 border border-[#2E5339]/20">
                                            <span className="font-serif font-bold text-2xl text-[#2E5339]">G</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-[#1a150f] mb-1">Guduchi (Tinospora cordifolia)</h4>
                                            <p className="text-sm font-bold text-[#D4882E] mb-2 uppercase tracking-wide">The Immunity Builder</p>
                                            <p className="text-gray-600 leading-relaxed">Enhances macrophage activity, protecting both mother and child from recurrent infections.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Benefits Tab */}
                        {activeTab === 'benefits' && (
                            <div className="animate-fade-in">
                                <h3 className="text-3xl font-serif font-bold text-[#2E5339] mb-8">Comprehensive Benefits</h3>
                                <div className="bg-[#FAF6F0] rounded-2xl p-8 lg:p-10 border border-[#D4882E]/20">
                                    <ul className="grid md:grid-cols-2 gap-6">
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 bg-white p-1 rounded-full text-[#D4882E] shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-lg text-[#1a150f] font-medium leading-relaxed">Enhances quality and quantity of breast milk naturally.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 bg-white p-1 rounded-full text-[#D4882E] shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-lg text-[#1a150f] font-medium leading-relaxed">Accelerates postpartum physical recovery and tissue repair.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 bg-white p-1 rounded-full text-[#D4882E] shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-lg text-[#1a150f] font-medium leading-relaxed">Alleviates pregnancy-induced weakness, fatigue, and lethargy.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 bg-white p-1 rounded-full text-[#D4882E] shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-lg text-[#1a150f] font-medium leading-relaxed">Improves maternal immunity, safeguarding the infant via lactation.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="mt-1 bg-white p-1 rounded-full text-[#D4882E] shadow-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <span className="text-lg text-[#1a150f] font-medium leading-relaxed">Nourishes the developing fetus throughout the gestational period.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* How to Use Tab */}
                        {activeTab === 'usage' && (
                            <div className="animate-fade-in flex flex-col md:flex-row gap-12 items-center justify-center py-8">
                                <div className="w-full md:w-1/3 text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-[#FAF6F0] rounded-full flex items-center justify-center border-4 border-[#D4882E]">
                                        <svg className="w-10 h-10 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                                    </div>
                                    <h4 className="text-2xl font-bold font-serif text-[#2E5339]">Dosage</h4>
                                    <p className="text-gray-600 text-lg">Take <strong className="text-[#1a150f]">1-2 teaspoons</strong> (5-10 ml).</p>
                                </div>

                                <div className="hidden md:block w-px h-32 bg-gray-200"></div>

                                <div className="w-full md:w-1/3 text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-[#FAF6F0] rounded-full flex items-center justify-center border-4 border-[#D4882E]">
                                        <svg className="w-10 h-10 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h4 className="text-2xl font-bold font-serif text-[#2E5339]">Frequency</h4>
                                    <p className="text-gray-600 text-lg"><strong className="text-[#1a150f]">Twice daily</strong>, preferably after meals.</p>
                                </div>

                                <div className="hidden md:block w-px h-32 bg-gray-200"></div>

                                <div className="w-full md:w-1/3 text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-[#FAF6F0] rounded-full flex items-center justify-center border-4 border-[#D4882E]">
                                        <svg className="w-10 h-10 text-[#2E5339]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                    </div>
                                    <h4 className="text-2xl font-bold font-serif text-[#2E5339]">With</h4>
                                    <p className="text-gray-600 text-lg">Consume with warm water or milk.</p>
                                </div>
                            </div>
                        )}

                    </div>
                </section>

            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </div>
    );
};

export default WidariForte;
