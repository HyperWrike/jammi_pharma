"use client";
import React from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';
import { useCMSContent } from '../hooks/useCMSContent';

const Home: React.FC = () => {
  // Hero Products
  const heroProducts = MOCK_PRODUCTS.filter(p =>
    ['triphala-churna', 'yummunity', 'trip-caps'].includes(p.id)
  );

  const { content, loading } = useCMSContent('homepage');

  const CMS = ({ section, field, fallback, inputType = 'text', multiline = false, className = '' }: any) => (
    <LiveEditable 
      page="homepage" 
      section={section} 
      contentKey={field} 
      initialContent={(content as any)?.[section]?.[field] || fallback}
      type={inputType} 
      multiline={multiline} 
      className={`inline-block ${className}`} 
    />
  );

  return (
    <div className="bg-background-light pt-[5rem]">

      {/* Section 1: Hero */}
      <section className="relative min-h-[640px] lg:min-h-[750px] mt-1 overflow-hidden bg-[var(--purple)] lg:flex lg:items-stretch">
        {/* Left Column (Solid Purple) */}
        <div className="w-full lg:w-1/2 bg-[var(--purple)] flex items-center">
          <div className="max-w-[560px] px-5 sm:px-10 lg:px-14 py-12 lg:py-16">
            <h1 className="m-0 leading-[0.95]">
              <div className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[var(--yellow)] tracking-tight">
                INDIA&apos;S
              </div>
              <div className="text-[34px] sm:text-[44px] lg:text-[52px] font-normal italic text-white leading-[1.0] mt-2">
                Healthcare
              </div>
              <div className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[var(--orange)] tracking-tight mt-2">
                RENAISSANCE
              </div>
            </h1>

            <p className="text-base sm:text-lg lg:text-[19px] text-white/95 max-w-[520px] leading-relaxed mt-6 sm:mt-8 font-normal">
              We are not &apos;Alternative Medicine.&apos; We are India&apos;s primary healthcare solution since 1897.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-[var(--yellow)] text-[var(--purple)] font-bold text-sm sm:text-base px-7 sm:px-10 py-3 sm:py-4 rounded-xl mt-8 sm:mt-10 hover:brightness-95 transition-colors"
            >
              THE PHARMACY
            </Link>
          </div>
        </div>

        {/* Right Column (Fully Visible Product Image) */}
        <div
          className="w-full lg:w-1/2 relative flex items-center justify-center overflow-visible px-5 pb-10 lg:px-0 lg:pb-0"
          style={{
            background:
              "radial-gradient(circle at 35% 20%, rgba(249,209,57,0.40) 0%, rgba(249,209,57,0.00) 60%), #540C3C",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(249,209,57,0.55) 0%, rgba(249,209,57,0.0) 65%)",
                filter: "blur(8px)",
              }}
            />
          </div>

          <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
            {/* No cropping: keep aspect ratio with contain */}
            <img
              alt="Jammi product"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1zitHt_v0ndbw8MiOLwFRMMSN4w1fY7IhpTivcaiMDu_oOqJrzmpZCnF58sj6ODckdbHlyiUkOUtfAjgPCqtdavgJlK76_Epmw4XcGqdIE2FnwDeFeC9b38itfAffYTbAEnc1xej--uYAnSGxRZxfgE56cnyKlifitqWMmjKa_2l6yKXDwhx1atcflGGXRqa_w1NituPvdAoqOS0irf4d1yYL2pGxG9TdbfuNSRR-qzZOaJK3mgjlVGxqLrfnY4_LGRxwkhpSqyE"
              className="w-full h-auto object-contain rounded-[18px]"
              style={{ boxShadow: "0 18px 45px rgba(0,0,0,0.22)" }}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Stats Scroller */}
      <section className="bg-white py-4 sm:py-6 border-b-2 border-cream-dark overflow-hidden whitespace-nowrap flex group">
        <div className="animate-marquee flex gap-12 items-center min-w-full pl-12">
          {/* Loop items */}
          {[1, 2, 3].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-forest font-extrabold text-xl lg:text-3xl tracking-widest uppercase flex items-center gap-12 font-sans">
                <CMS section="marquee" field="text1" fallback="128 YEARS OF HEALING" /> <span className="text-forest">☆</span>
              </span>
              <span className="text-forest font-extrabold text-xl lg:text-3xl tracking-widest uppercase flex items-center gap-12 font-sans">
                <CMS section="marquee" field="text2" fallback="50,000+ LIVES" /> <span className="text-forest">☆</span>
              </span>
              <span className="text-forest font-extrabold text-xl lg:text-3xl tracking-widest uppercase flex items-center gap-12 font-sans">
                <CMS section="marquee" field="text3" fallback="AUTHENTIC AYURVEDA" /> <span className="text-forest">☆</span>
              </span>
              <span className="text-forest font-extrabold text-xl lg:text-3xl tracking-widest uppercase flex items-center gap-12 font-sans">
                <CMS section="marquee" field="text4" fallback="AYUSH LICENSED" /> <span className="text-forest">☆</span>
              </span>
              <span className="text-forest font-extrabold text-xl lg:text-3xl tracking-widest uppercase flex items-center gap-12 font-sans">
                <CMS section="marquee" field="text5" fallback="PAN-INDIA DELIVERY" /> <span className="text-forest">☆</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Section 3: The Jammi Claim */}
      <section className="bg-cream py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <h2 className="font-serif leading-none">
              <span className="block text-forest font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tight">
                <CMS section="claim" field="claimTitleLine1" fallback="MEDICINE IS" />
              </span>
              <span className="block text-forest font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tight">
                <CMS section="claim" field="claimTitleLine2" fallback="NOT A" />
              </span>
              <span className="block text-saffron italic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight pr-4">
                <CMS section="claim" field="claimTitleLine3" fallback="Marketing Claim." />
              </span>
            </h2>
            <div className="w-16 h-1 bg-saffron"></div>
            <blockquote className="text-[var(--purple)] font-bold text-lg sm:text-[20px] leading-relaxed border-l-4 border-[var(--orange)]/25 pl-5 sm:pl-6">
              "<CMS section="claim" field="claimQuote" multiline fallback="We don't sell hope. We sell 128 years of clinical results. Authentic Ayurveda doesn't ask for belief—it demands respect." />"
            </blockquote>
            <div className="pt-4">
              <Link href="/heritage" className="inline-flex text-forest font-bold uppercase tracking-widest text-sm items-center gap-2 hover:text-saffron transition-colors pb-1 border-b-2 border-forest hover:border-saffron">
                DISCOVER THE 1897 GENESIS
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative mx-auto mt-12 lg:mt-0 w-full max-w-lg lg:max-w-full rotate-2 hover:rotate-0 transition-transform duration-700">
            <div className="absolute inset-0 bg-saffron translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 shadow-2xl"></div>
            <div className="relative z-10 w-full aspect-[4/5] object-cover shadow-2xl overflow-hidden">
              <img
                src={(content as any)?.claim?.imageUrl || "/images/tamil_doctor_lab.png"}
                alt="Jammi Authentic Lab"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Product Curation */}
      <section className="bg-background-light py-16 sm:py-20 lg:py-32 border-b border-cream-dark border-t border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <span className="text-saffron font-bold uppercase tracking-widest text-sm mb-4 block">
                <CMS section="essentials" field="label" fallback="CURATED SELECTION" />
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-forest">
                <CMS section="essentials" field="title" fallback="THE ESSENTIALS" />
              </h2>
            </div>
            <Link href="/shop" className="border-2 border-forest text-forest font-bold uppercase tracking-widest text-xs px-6 sm:px-8 py-3 sm:py-4 hover:bg-forest hover:text-white transition-colors w-full sm:w-auto text-center">
              <CMS section="essentials" field="ctaText" fallback="BROWSE FULL INVENTORY" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {heroProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Prescribe Jammi (Partnership) */}
      <section className="bg-cream-dark py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <div>
            <span className="text-saffron font-bold uppercase tracking-widest text-xs mb-6 block">
              <CMS section="partner" field="badgeText" fallback="FOR AYURVEDA PRACTITIONERS" />
            </span>
            <h2 className="font-serif leading-none mb-8">
              <span className="block text-forest font-bold text-5xl sm:text-6xl uppercase tracking-tight">
                <CMS section="partner" field="titleLine1" fallback="PRESCRIBE" />
              </span>
              <span className="block text-saffron font-bold text-5xl sm:text-6xl uppercase tracking-tight mb-2">
                <CMS section="partner" field="titleLine2" fallback="JAMMI." />
              </span>
              <span className="block text-forest text-2xl sm:text-3xl tracking-tight mt-4 font-normal">
                <CMS section="partner" field="subtitle" fallback="Add 128 Years to Your Practice." />
              </span>
            </h2>
            <p className="text-forest/80 text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 max-w-xl font-medium">
              <CMS section="partner" field="partnerDescription" multiline fallback="You heal the patient. We supply the medicine. Jammi Pharmaceuticals invites qualified Ayurveda practitioners to partner with us commercially. Prescribe and retail our AYUSH-licensed, time-tested formulations through your clinic. Your patients get 128 years of proven results. You get a trusted product line and healthy margins — without the overhead of manufacturing. This is a straightforward business partnership. You focus on healing. We handle formulation, quality, compliance, and supply." />
            </p>

            {/* Benefits Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 pt-6 border-t border-forest/10">
              {[
                { title: '25–30% MARGINS', desc: 'Wholesale pricing on all 100+ formulations. The margin is yours to keep.', icon: 'payments', field: 'benefit1' },
                { title: 'ZERO INVENTORY RISK', desc: 'Order what you need, when you need. No minimum stock. Pan-India delivery.', icon: 'inventory', field: 'benefit2' },
                { title: 'AYUSH LICENSED', desc: 'Every formulation fully licensed and compliant. Prescribe with confidence.', icon: 'verified_user', field: 'benefit3' },
                { title: '128-YEAR FORMULARY', desc: 'Clinically proven across generations. Results, not experiments.', icon: 'auto_stories', field: 'benefit4' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <span className="material-symbols-outlined text-saffron text-3xl flex-shrink-0">{benefit.icon}</span>
                  <div>
                    <h4 className="text-forest font-bold text-sm tracking-wide mb-1">
                      <CMS section="partner" field={`${benefit.field}Title`} fallback={benefit.title} />
                    </h4>
                    <p className="text-forest/70 text-xs leading-relaxed">
                      <CMS section="partner" field={`${benefit.field}Desc`} fallback={benefit.desc} />
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/federation" className="bg-saffron text-white font-bold px-8 py-5 flex justify-between items-center hover:-translate-y-1 transition-transform border border-saffron w-full sm:w-auto text-sm uppercase tracking-widest text-center shadow-lg leading-none">
                <CMS section="partner" field="ctaPrimaryText" fallback="BECOME A PARTNER" />
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </Link>
              <Link href="/shop" className="bg-transparent text-forest border-2 border-forest font-bold px-8 py-5 hover:bg-forest hover:text-white transition-colors w-full sm:w-auto text-sm uppercase tracking-widest flex justify-center items-center text-center leading-none">
                <CMS section="partner" field="ctaSecondaryText" fallback="VIEW FORMULARY" />
              </Link>
            </div>

            {/* Trust Strip */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 items-start sm:items-center text-sm font-bold tracking-wide text-forest/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-saffron">location_on</span>
                <CMS section="partner" field="trustLabel1" fallback="TRUSTED BY 500+ PRACTITIONERS" />
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 bg-saffron rounded-full"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-saffron">trending_up</span>
                <CMS section="partner" field="trustLabel2" fallback="AVG. 15-20% REVENUE UPLIFT" />
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="relative mx-auto mt-12 lg:-mt-10 lg:-mr-10 xl:-mr-20">
            <div className="aspect-[4/5] overflow-hidden -rotate-2 w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-2xl relative z-10 border-8 border-white group">
              <img
                src={(content as any)?.partner?.imageUrl || "/images/tamil_doctor_consultation.png"}
                alt="Ayurveda Practitioner"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-forest p-6 sm:p-8 text-white z-20 shadow-2xl w-[90%] sm:max-w-xs rotate-2">
              <span className="material-symbols-outlined text-saffron text-3xl mb-4">format_quote</span>
              <p className="font-serif italic text-sm sm:text-base md:text-lg leading-relaxed">
                "<CMS section="partner" field="partnerQuote" multiline fallback="Adding Jammi to my clinic was the best decision for my patients and my practice." />"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: The Federation */}
      <section className="bg-forest py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        {/* Subtle background texture/pattern */}
        <div className="absolute inset-0 opacity-5 grain-texture mix-blend-overlay"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-saffron/5 skew-x-12 -translate-x-32 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

          {/* Left Column */}
          <div>
            <span className="text-saffron font-bold uppercase tracking-widest text-xs mb-6 block">
              <CMS section="federation" field="badgeText" fallback="JAMMI AYURVEDA MOVEMENT" />
            </span>
            <h2 className="font-serif leading-none mb-8">
              <span className="block text-white font-bold text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                <CMS section="federation" field="fedHeroTitleLine1" fallback="STOP" />
              </span>
              <span className="block text-saffron font-bold text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight">
                <CMS section="federation" field="fedHeroTitleLine2" fallback="COMPETING." />
              </span>
              <span className="block text-white font-bold text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight mt-2 pb-2">
                <CMS section="federation" field="fedHeroTitleLine3" fallback="START LEADING." />
              </span>
            </h2>
            <p className="text-white/80 text-lg sm:text-xl font-medium leading-relaxed mb-10 sm:mb-12 max-w-md">
              <CMS section="federation" field="fedSubtext" multiline fallback="Join India's most powerful collective of traditional healers. We share our 128-year legacy, you provide the authentic healing. Together, we take back Indian healthcare." />
            </p>

            <ul className="space-y-6 mb-12">
              {[
                { label: 'EXCLUSIVE WHOLESALE PRICING (25% MARGIN)', field: 'fedPoint1' },
                { label: 'DIRECT PATIENT REFERRAL NETWORK', field: 'fedPoint2' },
                { label: 'HERITAGE BRAND SUPPORT SINCE 1897', field: 'fedPoint3' },
                { label: 'CLINICAL EDUCATION & MENTORSHIP', field: 'fedPoint4' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-white font-bold text-xs sm:text-sm tracking-wide">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron/20 border border-saffron flex items-center justify-center text-saffron">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </span>
                  <CMS section="federation" field={item.field} fallback={item.label} />
                </li>
              ))}
            </ul>

            <div className="w-full sm:w-max">
              <Link href="/federation" className="bg-saffron text-white font-bold px-10 py-5 rounded-sm hover:-translate-y-1 transition-transform w-full block sm:inline-block text-center uppercase tracking-widest shadow-xl shadow-saffron/20 leading-none">
                <CMS section="federation" field="ctaText" fallback="APPLY TO THE FEDERATION" />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative mx-auto mt-12 lg:mt-0 w-full max-w-sm sm:max-w-md lg:max-w-full lg:ml-auto perspective-1000">
            <div className="absolute inset-0 bg-transparent border-4 border-saffron translate-x-6 translate-y-6 lg:translate-x-8 lg:translate-y-8 z-0"></div>
            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-[4/5] object-cover shadow-2xl overflow-hidden">
              <img
                src={(content as any)?.federation?.imageUrl || "/images/tamil_doctor_group.png"}
                alt="Confident Practitioner"
                className="w-full h-full object-cover hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
