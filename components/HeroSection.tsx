"use client";

import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-forest paper-grain text-white overflow-hidden min-h-[750px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 items-center gap-16 w-full py-20 relative z-10">
        <div className="space-y-10">
          <h1 className="text-6xl lg:text-8xl font-serif leading-[1.1]">
            125 Years of Nurturing Wellness
          </h1>
          <p className="text-xl lg:text-2xl opacity-80 max-w-xl font-dm leading-relaxed">
            Where ancient wisdom meets modern science. Discover the gold standard of Ayurvedic healing, perfected through generations.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <Link href="/shop" className="px-10 py-5 bg-saffron text-white font-bold text-lg rounded-full hover:bg-white hover:text-forest transition-all duration-300 shadow-xl shadow-black/20 text-center">
              Shop the Collection
            </Link>
            <button className="px-10 py-5 border border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all">
              Our Heritage
            </button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
            <img alt="Indian Ayurvedic Wellness" className="w-full h-auto object-cover aspect-[4/5] shadow-inner" src="https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?q=80&w=1200&auto=format&fit=crop" />
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
          <div className="absolute -bottom-12 -left-20 z-20 w-72 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transform -rotate-6 border-4 border-white/10">
            <img alt="Jammi Glass Bottle" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1zitHt_v0ndbw8MiOLwFRMMSN4w1fY7IhpTivcaiMDu_oOqJrzmpZCnF58sj6ODckdbHlyiUkOUtfAjgPCqtdavgJlK76_Epmw4XcGqdIE2FnwDeFeC9b38itfAffYTbAEnc1xej--uYAnSGxRZxfgE56cnyKlifitqWMmjKa_2l6yKXDwhx1atcflGGXRqa_w1NituPvdAoqOS0irf4d1yYL2pGxG9TdbfuNSRR-qzZOaJK3mgjlVGxqLrfnY4_LGRxwkhpSqyE" />
          </div>
          <div className="absolute -right-10 top-20 w-64 h-64 bg-black/20 blur-3xl rounded-full -z-10"></div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2 bg-contain bg-no-repeat bg-right opacity-10 pointer-events-none" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcPvlycDHLUDKEXWrzEreG99c7p43KdE5YTSHV2yWdEBFQzii20c5YFj6bgNBUv7HSXafQ5Yh7ypSMDBhptilv-RXKcAwYLkHrb1hLhLZOLhVvGMIF2Q05Pgh8nwmwoVgYMeAW4hot3V8Rm7iQa47atVfCl-3T1vG5FAfmI6d3pgWZ7-2MYbsNmTwVOPkR3KHxQEqRoGi65Vd1p_38ct0bWww5aaXgqre62hRSLA9lU2l9RDONcLHtl7eum_jWLgiy8i4oiYLW10k')` }}></div>
    </section>
  );
};

export default HeroSection;
