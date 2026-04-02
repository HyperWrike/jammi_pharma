"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';

const ProductDetail: React.FC = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    router.push('/checkout');
  };

  return (
    <div className="bg-background-light min-h-screen pt-20">
      <main className="relative overflow-hidden">
        {/* Banner / Hero Section */}
        {product.banner ? (
          <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-forest text-white">
            <div className="absolute inset-0 opacity-20">
              <img src={product.banner.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent"></div>
            </div>
            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-bold tracking-widest uppercase border border-primary/30">
                    <LiveEditable collection="products" docId={product.id} field="banner.subtitle">
                      {product.banner.subtitle}
                    </LiveEditable>
                  </span>
                  <h1 className="text-6xl lg:text-8xl font-serif font-black leading-tight">
                    <LiveEditable collection="products" docId={product.id} field="banner.title">
                      {product.banner.title.split(' ').slice(0, -1).join(' ')} <span className="text-primary italic">{product.banner.title.split(' ').slice(-1)}</span>
                    </LiveEditable>
                  </h1>
                  <p className="text-xl text-slate-300 max-w-xl font-dm leading-relaxed">
                    <LiveEditable collection="products" docId={product.id} field="banner.desc" multiline>
                      {product.banner.desc}
                    </LiveEditable>
                  </p>
                </div>
                <div className="flex flex-wrap gap-8">
                  {product.banner.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                      <span className="material-symbols-outlined text-primary text-3xl">{stat.icon}</span>
                      <span className="font-bold text-sm uppercase tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                  >
                    <LiveEditable collection="content" docId="productTemplate" field="heroBtnLabel">Experience the Ritual</LiveEditable>
                  </button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
                <img src={product.image} alt={product.name} className="relative z-10 w-full max-w-md mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
          </section>
        ) : (
          <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Product Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-xl -rotate-2 group-hover:rotate-0 transition-transform"></div>
                <div className="relative rounded-xl shadow-2xl w-full aspect-[4/5] bg-white flex items-center justify-center p-12 overflow-hidden">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700" 
                    src={product.image}
                  />
                </div>
              </div>
              {/* Product Content */}
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase">
                    {product.label || <LiveEditable collection="content" docId="productTemplate" field="defaultBadgeLabel">Ancient Ayurvedic Wisdom</LiveEditable>}
                  </span>
                  <h2 className="text-5xl lg:text-7xl font-serif font-black text-slate-900 leading-[1.1]">
                    <LiveEditable collection="products" docId={product.id} field="name">
                      {product.name.split(' ').slice(0, -1).join(' ')} <span className="text-primary">{product.name.split(' ').slice(-1)}</span>
                    </LiveEditable>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-dm">
                    <LiveEditable collection="products" docId={product.id} field="shortDesc" multiline>
                      {product.shortDesc}
                    </LiveEditable>
                  </p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">
                    ₹<LiveEditable collection="products" docId={product.id} field="price" inputType="number">
                      {product.price}
                    </LiveEditable>
                  </span>
                  {product.originalPrice && (
                    <span className="text-slate-400 line-through text-xl">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-primary/20 rounded-xl overflow-hidden h-14 bg-white">
                    <button 
                      className="px-6 hover:bg-primary/5 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button 
                      className="px-6 hover:bg-primary/5 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <button 
                    className="flex-1 bg-primary text-white py-4 px-8 rounded-xl font-bold text-lg hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                  >
                    <span className="material-symbols-outlined">shopping_bag</span>
                    <LiveEditable collection="content" docId="productTemplate" field="addToCartTitle">Add to Cart Ritual</LiveEditable>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {product.features && (
          <section className="py-24 bg-white border-y border-primary/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                    <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
                    </div>
                    <h4 className="text-2xl font-serif font-bold">
                       <LiveEditable collection="products" docId={product.id} field={`features[${idx}].title`}>
                         {feature.title}
                       </LiveEditable>
                    </h4>
                    <p className="text-slate-500 font-dm leading-relaxed">
                       <LiveEditable collection="products" docId={product.id} field={`features[${idx}].desc`} multiline>
                         {feature.desc}
                       </LiveEditable>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Key Botanicals Section */}
        {product.botanicals && (
          <section className="bg-primary/5 py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none paper-grain"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h3 className="text-4xl font-serif font-bold"><LiveEditable collection="content" docId="productTemplate" field="botanicalsTitle">Key Botanicals</LiveEditable></h3>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                <p className="text-slate-600 font-dm"><LiveEditable collection="content" docId="productTemplate" field="botanicalsSubtitle">Pure ingredients sourced from the heart of tradition.</LiveEditable></p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {product.botanicals.map((botanical, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center border border-primary/10 hover:shadow-xl transition-shadow">
                    <img 
                      alt={botanical.name} 
                      className="w-40 h-40 rounded-full object-cover border-4 border-primary/20" 
                      src={botanical.image}
                    />
                    <div className="space-y-3">
                      <h4 className="text-2xl font-serif font-bold text-primary italic">
                        <LiveEditable collection="products" docId={product.id} field={`botanicals[${idx}].name`}>
                          {botanical.name}
                        </LiveEditable>
                      </h4>
                      <p className="text-slate-600 leading-relaxed font-dm">
                        <LiveEditable collection="products" docId={product.id} field={`botanicals[${idx}].desc`} multiline>
                          {botanical.desc}
                        </LiveEditable>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The Ritual Section */}
        {product.ritual && (
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-4xl font-serif font-bold leading-tight">The {product.name.split(' ').slice(-1)} Ritual</h3>
                <p className="text-lg text-slate-600 font-dm"><LiveEditable collection="content" docId="productTemplate" multiline field="ritualDesc">Elevate your daily care into a moment of transcendence. Follow our Vedic process for maximum efficacy.</LiveEditable></p>
                <div className="space-y-8 mt-12">
                  {product.ritual.map((step, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-xl font-bold mb-1">
                          <LiveEditable collection="products" docId={product.id} field={`ritual[${idx}].title`}>
                            {step.title}
                          </LiveEditable>
                        </h5>
                        <p className="text-slate-600 italic font-dm">
                          <LiveEditable collection="products" docId={product.id} field={`ritual[${idx}].desc`} multiline>
                            {step.desc}
                          </LiveEditable>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <img 
                  alt="Ayurvedic Ritual" 
                  className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1njQ56OJ3R470cdYh9lsppqPaZRZdRei0a-6zKR6jDN9HNOEiZiG6EDjkPQR_NP21Wr3ybdexn0JzsaikgwHe-6eyBIwhARLvGgL9M8SiVqRzFb9ow0oV_5DTexeH2-AZIAtApnzq-cA30Poh3jnrz3Kyl4O8j8wPxxWtKiPXKu0i1FrhngzCj1W7LLucNPACGL1w3kQujYrq_MfIMm80RQotz6WVW2BwMkzRynzkMCe5LF6wyPHeWg8UO6_HMqi4FgcZn_UurPE"
                />
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {product.results && (
          <section className="bg-forest text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none paper-grain"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid md:grid-cols-3 gap-12 text-center">
                {product.results.map((result, idx) => (
                  <div key={idx} className="space-y-4 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <div className="text-5xl font-serif font-black text-primary italic">
                      <LiveEditable collection="products" docId={product.id} field={`results[${idx}].percentage`}>
                        {result.percentage}
                      </LiveEditable>
                    </div>
                    <p className="text-xl font-medium font-dm">
                      <LiveEditable collection="products" docId={product.id} field={`results[${idx}].text`}>
                        {result.text}
                      </LiveEditable>
                    </p>
                  </div>
                ))}
              </div>
              {product.quote && (
                <div className="mt-20 max-w-3xl mx-auto text-center italic text-2xl font-serif font-light leading-relaxed text-slate-300">
                  "<LiveEditable collection="products" docId={product.id} field="quote.text" multiline>
                    {product.quote.text}
                  </LiveEditable>"
                  <div className="mt-6 not-italic text-sm font-bold uppercase tracking-widest text-primary">— 
                    <LiveEditable collection="products" docId={product.id} field="quote.author">
                      {product.quote.author}
                    </LiveEditable>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;

