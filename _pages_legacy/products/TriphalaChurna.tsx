"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LiveEditable from '../../components/admin/LiveEditable';

const TriphalaChurna: React.FC = () => {
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('100g');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc') {
            setQuantity(prev => prev + 1);
        } else if (type === 'dec' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const toggleAccordion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const parent = e.currentTarget.parentElement;
        if (parent) {
            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('active');
                    const content = item.querySelector('.accordion-content') as HTMLElement;
                    if (content) content.style.maxHeight = '0';

                    const iconPlus = item.querySelector('.icon-plus') as HTMLElement;
                    const iconMinus = item.querySelector('.icon-minus') as HTMLElement;
                    if (iconPlus) iconPlus.style.display = 'block';
                    if (iconMinus) iconMinus.style.display = 'none';
                }
            });

            parent.classList.toggle('active');
            const content = parent.querySelector('.accordion-content') as HTMLElement;
            const isActive = parent.classList.contains('active');

            if (content) {
                content.style.maxHeight = isActive ? content.scrollHeight + 'px' : '0';
            }

            const iconPlus = parent.querySelector('.icon-plus') as HTMLElement;
            const iconMinus = parent.querySelector('.icon-minus') as HTMLElement;

            if (iconPlus) iconPlus.style.display = isActive ? 'none' : 'block';
            if (iconMinus) iconMinus.style.display = isActive ? 'block' : 'none';
        }
    };

    return (
        <div className="bg-[#FAF6F0] text-[#1A2E20] font-['DM_Sans',_sans-serif] min-h-screen pt-20">
            <style dangerouslySetInnerHTML={{
                __html: `
        .product-zoom:hover img { transform: scale(1.1); }
        .custom-shadow { box-shadow: 0 4px 20px -2px rgba(46, 83, 57, 0.08); }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
        .accordion-item.active .accordion-content { max-height: 200px; }
        .accordion-item .icon-minus { display: none; }
        .accordion-item.active .icon-plus { display: none; }
        .accordion-item.active .icon-minus { display: block; }
      `}} />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* BEGIN: Hero Section */}
                <section className="grid grid-cols-1 md:grid-cols-10 gap-12 mb-20">
                    {/* Left Column: Product Image */}
                    <div className="md:col-span-6 flex flex-col items-center">
                        <div className="bg-white rounded-[14px] overflow-hidden product-zoom transition-all duration-500 custom-shadow w-full flex justify-center p-8">
                            <img
                                alt="Jammi's Triphala Churna"
                                className="w-[500px] h-[500px] object-contain transition-transform duration-500 cursor-crosshair"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Y3jZaJGO387jQIMX-YX1DNONkMvMSBKQCBgdeSEsxNYqsIOVijsdt6tMfOTgHKVsXQ9zsrBnOHnTF60gr6LeQj6lTyLAmAxum_Mc_9PxfgVcr-G6biJic1hemqs_9qcsKChw6aWrnYYHQxMISQE08Y1nQ_WXyZT-VAVNFCuNmynRtu6DPNO0lrZBDc-dFkfUiZiRSwcMXRSFCKRBGpm_o0vWKMOS_KLa5JQONuu1nyWvyrwncpEJsk_iSXC8lfXzyA8fDeVFJiA"
                            />
                        </div>
                        <div className="flex gap-4 mt-6">
                            <div className="w-20 h-20 border-2 border-[#D4882E] rounded-md p-2 bg-white cursor-pointer">
                                <img className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI25C5czQLOXO9Uqed7HRaT9oHaWlr-rHghPNqblqijHgimdnktuznLyLfZkDkc9eOMZt2UM3EHoVH9J6YYkyJDofa96RCVq2b2YkkUbyHX2Ka1hSEAt275CrjXiDfD4-urKidxCDNzMXUgXYgfg9VjIwoPZxfUn-D_EdXLZLZYuUtO5lklp9iM-X3KNBt0Q3VLmqh9338dbCSFcP_gbB4q_US2z17PfsAwmFMReVwxUOyDU5xzmKKqmvjCE4uirLi-1QW8mqCWks" alt="Thumbnail 1" />
                            </div>
                            <div className="w-20 h-20 border border-gray-200 rounded-md p-2 bg-white cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                                <img className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHT8H7NMGndAz7wJ8Rk2TNBH3RtnLmMNoPd7Ek4HWE8QzH-6tO37vPm6MhZlFRteWbWdbYDUQD5j5v29CcZlfK1nSunERNFHCVLP--_arodiwNFpjnZ5STwszVztlcnzZ2kIacsxsuCIIW9McLDXdRS3Ia6jBvWZyzJGwBCizKJGdpEGm0c3wWxQga5y_1lN2pcPAVJ4fPhaeiQMTdMke-33TPF4U29bT_prgInWjKUz9DC42xek8ns56ni14_gXZONAcNB8OCB7A" alt="Thumbnail 2" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="md:col-span-4 flex flex-col">
                        {/* Breadcrumbs */}
                        <nav className="text-xs text-gray-500 mb-4 flex space-x-2 uppercase tracking-widest">
                            <Link href="/" className="hover:text-[#2E5339]">Home</Link>
                            <span>/</span>
                            <Link href="/shop" className="hover:text-[#2E5339]">Wellness</Link>
                            <span>/</span>
                            <span className="text-[#2E5339] font-bold">Triphala Churna</span>
                        </nav>

                        <div className="flex gap-2 mb-4">
                            <span className="bg-[#2E5339] text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-wider uppercase">Best Seller</span>
                            <span className="bg-yellow-100 text-yellow-800 text-[10px] px-3 py-1 rounded-full font-bold tracking-wider uppercase">AYUSH Certified</span>
                        </div>

                        <h1 className="font-['Playfair_Display',_serif] text-4xl text-[#1A2E20] mb-2 font-bold"><LiveEditable collection="products_content" docId="triphalachurna" field="name">Triphala Churna</LiveEditable></h1>
                        <p className="italic text-[#2E5339] text-lg mb-4">Ayurvedic Detoxifier & Rejuvenator</p>

                        <div className="flex items-center space-x-3 mb-6">
                            <div className="flex text-[#D4882E]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-[#1A2E20] underline cursor-pointer">245 Reviews</span>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline space-x-2">
                                <span className="text-3xl font-bold text-[#1A2E20]">₹245</span>
                                <span className="text-gray-500 text-sm">for {selectedSize}</span>
                            </div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Inclusive of all taxes</p>
                        </div>

                        {/* Selectors */}
                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-[#2E5339] uppercase mb-3">Select Size</label>
                                <div className="flex space-x-3">
                                    {['100g', '250g', '500g'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-5 py-2 rounded-[10px] text-sm font-bold transition border-2 ${selectedSize === size
                                                    ? 'border-[#2E5339] bg-[#2E5339] text-white'
                                                    : 'border-gray-200 text-[#1A2E20] hover:border-[#2E5339] bg-transparent font-medium'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center border border-gray-300 rounded-[10px] bg-white">
                                    <button
                                        onClick={() => handleQuantityChange('dec')}
                                        className="px-4 py-2 hover:bg-gray-100 transition rounded-l-[10px]"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 font-bold min-w-[3ch] text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('inc')}
                                        className="px-4 py-2 hover:bg-gray-100 transition rounded-r-[10px]"
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="flex-1 bg-[#D4882E] hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-[10px] transition transform active:scale-95 shadow-lg">
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-8">
                            <button className="flex items-center text-sm font-medium text-[#2E5339] hover:underline">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                                Add to Wishlist
                            </button>
                        </div>

                        <div className="p-4 bg-white border border-[#2E5339] border-opacity-20 rounded-[14px] flex items-start space-x-4">
                            <svg className="w-6 h-6 text-[#2E5339] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                            </svg>
                            <div>
                                <p className="text-sm font-bold text-[#2E5339]">Estimated Delivery</p>
                                <p className="text-xs text-gray-600">3-5 business days across India</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: Hero Section */}

                {/* BEGIN: Trust Badges */}
                <div className="grid grid-cols-3 gap-8 py-12 border-y border-[#2E5339] border-opacity-10 mb-20 bg-white/50 rounded-[14px] px-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mb-4 border border-[#D4882E] border-opacity-20">
                            <svg className="w-8 h-8 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h4 className="font-bold text-[#1A2E20]">100% Ayurvedic</h4>
                        <p className="text-xs text-gray-500">Ancient wisdom in modern packaging</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mb-4 border border-[#D4882E] border-opacity-20">
                            <svg className="w-8 h-8 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                            </svg>
                        </div>
                        <h4 className="font-bold text-[#1A2E20]">GMP Certified</h4>
                        <p className="text-xs text-gray-500">Manufactured in high-tech facilities</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mb-4 border border-[#D4882E] border-opacity-20">
                            <svg className="w-8 h-8 text-[#D4882E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h4 className="font-bold text-[#1A2E20]">125+ Years Legacy</h4>
                        <p className="text-xs text-gray-500">Trusted for five generations</p>
                    </div>
                </div>
                {/* END: Trust Badges */}

                {/* BEGIN: Key Benefits */}
                <section className="mb-20">
                    <h2 className="font-['Playfair_Display',_serif] text-3xl text-center font-bold text-[#1A2E20] mb-12">The Power of Triphala</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-[14px] custom-shadow text-center transform hover:-translate-y-2 transition duration-300">
                            <div className="text-[#2E5339] mb-6 inline-block p-4 bg-[#FAF6F0] rounded-full">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m12-9V4a2 2 0 114 0v5a2 2 0 01-2 2h-3m-6 0H9m12 0a2 2 0 002-2V5a2 2 0 00-2-2h-3a2 2 0 00-2 2v7h4z"></path>
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3">Gentle Detoxification</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Safely flushes out accumulated toxins from the body without causing discomfort or dependency.</p>
                        </div>

                        <div className="bg-white p-8 rounded-[14px] custom-shadow text-center transform hover:-translate-y-2 transition duration-300">
                            <div className="text-[#2E5339] mb-6 inline-block p-4 bg-[#FAF6F0] rounded-full">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3">Improves Digestion</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Strengthens the digestive fire (Agni), promoting better absorption of nutrients and alleviating bloating.</p>
                        </div>

                        <div className="bg-white p-8 rounded-[14px] custom-shadow text-center transform hover:-translate-y-2 transition duration-300">
                            <div className="text-[#2E5339] mb-6 inline-block p-4 bg-[#FAF6F0] rounded-full">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.618.309a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 001.414 3.414h13.414a2 2 0 001.414-3.414l-1.16-1.16z"></path>
                                </svg>
                            </div>
                            <h3 className="font-bold text-xl mb-3">Natural Colon Cleanser</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Supports healthy bowel movements and maintains overall colon health through traditional botanicals.</p>
                        </div>
                    </div>
                </section>
                {/* END: Key Benefits */}

                {/* BEGIN: Description & Ingredients */}
                <section className="grid grid-cols-1 md:grid-cols-10 gap-12 mb-20">
                    <div className="md:col-span-6">
                        <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl text-[#1A2E20] mb-6 border-b border-[#2E5339] border-opacity-20 pb-4">
                            About This Product
                        </h2>
                        <div className="prose max-w-none text-gray-700 space-y-4 font-['DM_Sans',_sans-serif]">
                            <p>Triphala, literal meaning "three fruits," is one of the most respected herbal blends in the Ayurvedic pharmacopoeia. Jammi's Triphala Churna is meticulously prepared using the finest quality of <strong>Amalaki, Bibhitaki, and Haritaki</strong>, balanced according to ancient Shastric texts.</p>
                            <p>This powerful combination acts as a Rasayana, or rejuvenator, that supports all three doshas (Vata, Pitta, and Kapha). It is particularly effective for those seeking a sustainable way to maintain digestive regularity and systemic detoxification.</p>
                            <ul className="list-disc pl-5 space-y-2 text-[#2E5339] font-medium my-4">
                                <li>Ethically sourced forest-grown herbs</li>
                                <li>Micronized powder for maximum absorption</li>
                                <li>Free from additives, preservatives, or artificial colors</li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <div className="bg-white p-8 rounded-[14px] custom-shadow border-t-4 border-[#D4882E]">
                            <h3 className="font-['Playfair_Display',_serif] font-bold text-2xl text-[#1A2E20] mb-8 text-center">Key Ingredients</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center font-bold text-[#D4882E] shrink-0">A</div>
                                    <div>
                                        <p className="font-bold text-[#1A2E20]">Amalaki (Indian Gooseberry)</p>
                                        <p className="text-xs text-gray-500">Rich in Vitamin C, supports liver function</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center font-bold text-[#D4882E] shrink-0">B</div>
                                    <div>
                                        <p className="font-bold text-[#1A2E20]">Bibhitaki (Baheda)</p>
                                        <p className="text-xs text-gray-500">Supports respiratory and colon health</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-[#FAF6F0] rounded-full flex items-center justify-center font-bold text-[#D4882E] shrink-0">H</div>
                                    <div>
                                        <p className="font-bold text-[#1A2E20]">Haritaki (Harad)</p>
                                        <p className="text-xs text-gray-500">The "King of Medicines" for digestion</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: Description & Ingredients */}

                {/* BEGIN: How to Use */}
                <section className="mb-20">
                    <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl text-center text-[#1A2E20] mb-12">How To Consume</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-[14px] border-l-4 border-[#2E5339] custom-shadow">
                            <span className="text-3xl font-['Playfair_Display',_serif] font-bold text-[#2E5339] opacity-30 block mb-2">01</span>
                            <p className="font-bold text-[#1A2E20] mb-1">Measure Dosage</p>
                            <p className="text-sm text-gray-600">Take 3-6g (1-2 teaspoons) of the powder.</p>
                        </div>

                        <div className="bg-white p-6 rounded-[14px] border-l-4 border-[#2E5339] custom-shadow">
                            <span className="text-3xl font-['Playfair_Display',_serif] font-bold text-[#2E5339] opacity-30 block mb-2">02</span>
                            <p className="font-bold text-[#1A2E20] mb-1">Prepare Mix</p>
                            <p className="text-sm text-gray-600">Mix with a glass of lukewarm water or honey.</p>
                        </div>

                        <div className="bg-white p-6 rounded-[14px] border-l-4 border-[#2E5339] custom-shadow">
                            <span className="text-3xl font-['Playfair_Display',_serif] font-bold text-[#2E5339] opacity-30 block mb-2">03</span>
                            <p className="font-bold text-[#1A2E20] mb-1">Best Timing</p>
                            <p className="text-sm text-gray-600">Consume at bedtime for optimal digestive rest.</p>
                        </div>

                        <div className="bg-white p-6 rounded-[14px] border-l-4 border-[#2E5339] custom-shadow">
                            <span className="text-3xl font-['Playfair_Display',_serif] font-bold text-[#2E5339] opacity-30 block mb-2">04</span>
                            <p className="font-bold text-[#1A2E20] mb-1">Consistency</p>
                            <p className="text-sm text-gray-600">Use daily for at least 3 months for best results.</p>
                        </div>
                    </div>
                </section>
                {/* END: How to Use */}

                {/* BEGIN: Reviews */}
                <section className="mb-20">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl text-[#1A2E20] mb-2">What Our Customers Say</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold">4.8</span>
                                <div className="flex text-[#D4882E]">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">(245 verified buyers)</span>
                            </div>
                        </div>
                        <button className="bg-[#2E5339] text-white px-6 py-2 rounded-[10px] font-bold text-sm hover:opacity-90 transition">
                            Write a Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Review 1 */}
                        <div className="bg-white p-6 rounded-[14px] border border-gray-100 shadow-sm">
                            <div className="flex text-[#D4882E] mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-bold text-[#1A2E20] mb-2">Life Changer!</p>
                            <p className="text-sm text-gray-600 italic mb-4">"I've tried many brands, but Jammi's quality is unmatched. My digestion has never been better."</p>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#2E5339] rounded-full flex items-center justify-center text-white text-xs font-bold">AK</div>
                                <span className="text-xs font-bold text-[#1A2E20]">Amit K.</span>
                                <span className="text-[10px] text-gray-400 font-bold ml-auto uppercase tracking-tighter flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                    Verified Buyer
                                </span>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="bg-white p-6 rounded-[14px] border border-gray-100 shadow-sm">
                            <div className="flex text-[#D4882E] mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="font-bold text-[#1A2E20] mb-2">Authentic Flavor</p>
                            <p className="text-sm text-gray-600 italic mb-4">"You can taste the purity of the herbs. It's bitter as it should be, but works wonders."</p>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#2E5339] rounded-full flex items-center justify-center text-white text-xs font-bold">RM</div>
                                <span className="text-xs font-bold text-[#1A2E20]">Rohan M.</span>
                                <span className="text-[10px] text-gray-400 font-bold ml-auto uppercase tracking-tighter flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                    Verified Buyer
                                </span>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div className="bg-white p-6 rounded-[14px] border border-gray-100 shadow-sm">
                            <div className="flex text-[#D4882E] mb-3">
                                {[1, 2, 3, 4].map((star) => (
                                    <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <svg className="w-4 h-4 fill-current text-gray-200" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <p className="font-bold text-[#1A2E20] mb-2">Gentle Detox</p>
                            <p className="text-sm text-gray-600 italic mb-4">"Finally found something that isn't harsh on the stomach. Feels very natural and effective."</p>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-[#2E5339] rounded-full flex items-center justify-center text-white text-xs font-bold">SP</div>
                                <span className="text-xs font-bold text-[#1A2E20]">Sriya P.</span>
                                <span className="text-[10px] text-gray-400 font-bold ml-auto uppercase tracking-tighter flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                    Verified Buyer
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: Reviews */}

                {/* BEGIN: Related Products */}
                <section className="mb-20">
                    <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl text-[#1A2E20] mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Related Item 1 */}
                        <div className="bg-white p-4 rounded-[14px] custom-shadow group cursor-pointer relative block">
                            <Link href="/product/ashwagandha" className="absolute inset-0 z-10 block opacity-0">View Product</Link>
                            <div className="aspect-square bg-[#FAF6F0] rounded-lg mb-4 overflow-hidden p-4">
                                <img
                                    alt="Ashwagandha"
                                    className="w-full h-full object-contain group-hover:scale-110 transition duration-300 opacity-80"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEk6gqNNKzG9ARxROHkNZuXJwnkSfVXSYIx12zZ4v8QehvE8v5fxHve_GsKDaVKVevRm7p6t69qwW6y555YuDKvx5zoxlvpEeF_Twk37VAzucJEc9QQ5tvmLvm4RjsS10stXWXm4TDLc5Vx-22GU_vJdvcW4qvQMFW6uiTf9gaKDkRZMtuaYIzv6T6sDdgYNvulJZ4OrAx3TUG88vPXL3-_UfJtyps2N4qlc5stHVZKrn_2nHzsFKy19N-dCyk7YFqed_LiIAgUQ"
                                />
                            </div>
                            <h4 className="font-bold text-[#1A2E20]">Ashwagandha Lehyam</h4>
                            <p className="text-xs text-gray-500 mb-2">Strength & Vitality</p>
                            <div className="flex justify-between items-center relative z-20">
                                <span className="font-bold text-[#D4882E]">₹350</span>
                                <Link href="/product/ashwagandha" className="text-[#2E5339] text-xs font-bold uppercase tracking-widest border-b-2 border-[#2E5339] hover:text-[#1A2E20] hover:border-[#1A2E20] transition">
                                    View Product
                                </Link>
                            </div>
                        </div>

                        {/* Related Item 2 */}
                        <div className="bg-white p-4 rounded-[14px] custom-shadow group cursor-pointer relative block opacity-70">
                            <Link href="/product/brahmi" className="absolute inset-0 z-10 block opacity-0">View Product</Link>
                            <div className="aspect-square bg-[#FAF6F0] rounded-lg mb-4 overflow-hidden p-4">
                                <img
                                    alt="Brahmi"
                                    className="w-full h-full object-contain group-hover:scale-110 transition duration-300"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUj5mooQ2H0q_oXcIAICMBvAFzGpHUMGCL_tt1tju_YabxV7LMsFwzSpQE5b95p88dzmGVirhE-9De_5QMbzV_tzmQzkfOXqReT3xI1imcZPrbuIzRjM9us4Do9nJGkeA-a1-5ccFM6V3vbgdaq-yRE2m4LWGg6_T-LScULJFdWGR6CKsLUwUn05D57s8T6niO_nobJoBVmYzUor82rXqjdd71-kHFnYGo2ddewRb1GS8o2Yk9KE-9CCSzNufy6IALBnJTns4ZF_c"
                                />
                            </div>
                            <h4 className="font-bold text-[#1A2E20]">Brahmi Ghritam</h4>
                            <p className="text-xs text-gray-500 mb-2">Memory & Focus</p>
                            <div className="flex justify-between items-center relative z-20">
                                <span className="font-bold text-[#D4882E]">₹425</span>
                                <Link href="/product/brahmi" className="text-[#2E5339] text-xs font-bold uppercase tracking-widest border-b-2 border-[#2E5339] hover:text-[#1A2E20] hover:border-[#1A2E20] transition">
                                    View Product
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: Related Products */}

                {/* BEGIN: FAQ */}
                <section className="mb-20 max-w-3xl mx-auto">
                    <h2 className="font-['Playfair_Display',_serif] font-bold text-3xl text-center text-[#1A2E20] mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="accordion-item border border-gray-200 rounded-[14px] bg-white overflow-hidden">
                            <button
                                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#FAF6F0] transition focus:outline-none"
                                onClick={toggleAccordion}
                            >
                                <span className="font-bold text-[#1A2E20] text-sm">Is Triphala Churna safe for daily use?</span>
                                <svg className="w-5 h-5 text-[#D4882E] icon-plus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <svg className="w-5 h-5 text-[#D4882E] icon-minus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            <div className="accordion-content">
                                <div className="px-6 pb-4 text-sm text-gray-600">
                                    Yes, Triphala is traditionally used daily as a gentle cleanser and tonic. Unlike stimulant laxatives, it is non-habit forming when taken in recommended dosages.
                                </div>
                            </div>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="accordion-item border border-gray-200 rounded-[14px] bg-white overflow-hidden">
                            <button
                                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#FAF6F0] transition focus:outline-none"
                                onClick={toggleAccordion}
                            >
                                <span className="font-bold text-[#1A2E20] text-sm">How long does it take to see results?</span>
                                <svg className="w-5 h-5 text-[#D4882E] icon-plus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <svg className="w-5 h-5 text-[#D4882E] icon-minus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            <div className="accordion-content">
                                <div className="px-6 pb-4 text-sm text-gray-600">
                                    While some notice digestive relief within a few days, the rejuvenating systemic benefits typically manifest after 4-6 weeks of consistent use.
                                </div>
                            </div>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="accordion-item border border-gray-200 rounded-[14px] bg-white overflow-hidden">
                            <button
                                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#FAF6F0] transition focus:outline-none"
                                onClick={toggleAccordion}
                            >
                                <span className="font-bold text-[#1A2E20] text-sm">Can I take this during pregnancy?</span>
                                <svg className="w-5 h-5 text-[#D4882E] icon-plus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <svg className="w-5 h-5 text-[#D4882E] icon-minus" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            <div className="accordion-content">
                                <div className="px-6 pb-4 text-sm text-gray-600">
                                    We recommend consulting with your healthcare provider before starting any herbal supplement during pregnancy or while breastfeeding.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: FAQ */}
            </main>
        </div>
    );
};

export default TriphalaChurna;