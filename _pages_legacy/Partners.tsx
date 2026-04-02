"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useFederationStore } from '../store/federationStore';

import LiveEditable from '../components/admin/LiveEditable';
import { useCMSContent } from '../hooks/useCMSContent';

const Partners: React.FC = () => {
    const { content, loading } = useCMSContent('partners');
    const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const { submitPartnerRequest } = useFederationStore();
    const [partnerForm, setPartnerForm] = useState({
        name: '',
        clinicName: '',
        email: '',
        phone: '',
        location: '',
        patientVolume: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitPartnerRequest({
            name: partnerForm.name,
            clinicName: partnerForm.clinicName,
            email: partnerForm.email,
            phone: partnerForm.phone,
            location: partnerForm.location,
            patientVolume: partnerForm.patientVolume
        });
        setFormStatus('submitted');
    };

    if (loading) return <div className="min-h-screen pt-24 bg-background-light flex items-center justify-center">Loading Partner Portal...</div>;

    const CMS = ({ section, field, fallback, inputType = 'text', multiline = false, className = '' }: any) => (
        <LiveEditable cmsKey={{ page: 'partners', section, content_key: field }} inputType={inputType} multiline={multiline} className={`inline-block ${className}`}>
            {content?.[section]?.[field] || fallback}
        </LiveEditable>
    );

    const faqs = [
        { q: "Is there a joining fee?", a: "No. Partnership is free. You simply buy products at wholesale and sell at MRP. The margin is your earning.", field: 'faq1' },
        { q: "What is the minimum order?", a: "There is no minimum order. Order what you need for your current patients. We deliver pan-India.", field: 'faq2' },
        { q: "How quickly do orders arrive?", a: "Standard delivery within 5–7 business days. Express options available for urgent requirements.", field: 'faq3' },
        { q: "Can I return unsold products?", a: "Yes, unopened products within shelf life can be returned. Details in the partner agreement.", field: 'faq4' },
        { q: "Do I get exclusive territory?", a: "We do not enforce exclusive territories. Multiple practitioners in a city can be partners. Your clinical skill and patient relationships are your competitive advantage, not artificial scarcity.", field: 'faq5' },
        { q: "How is this different from the JAM Federation?", a: "The Jammi Partner Programme is a commercial product partnership. The JAM Federation is a cooperative movement with democratic governance. You can be a product partner without joining the federation, or do both. Many partners choose to join the federation for the additional benefits of community, education, and collective advocacy.", field: 'faq6' }
    ];

    return (
        <div id="partner" className="bg-background-light font-body">

            {/* Section A: Hero */}
            <section className="bg-background-light py-20 lg:py-32 border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
                    <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-6 block border border-secondary/20 py-1.5 px-4 rounded-full w-max mx-auto bg-white/50">
                        <CMS section="hero" field="badge" fallback="JAMMI PHARMA PARTNER PROGRAMME" />
                    </span>
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight mb-8 text-secondary font-bold">
                        <CMS section="hero" field="titleLine1" fallback="Your Clinic. Our Formulations." /> <br className="hidden sm:block" />
                        <span className="text-primary italic">
                            <CMS section="hero" field="titleLine2" fallback="Shared Success." />
                        </span>
                    </h1>
                    <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        <CMS section="hero" field="subtext" multiline fallback="Partner with India’s oldest Ayurvedic pharmaceutical house. Add Jammi’s 128-year, AYUSH-licensed product line to your practice. Earn healthy margins. Give your patients medicine that works." />
                    </p>
                    <a href="#apply" className="inline-flex bg-primary text-white font-bold px-10 py-5 rounded-full hover:bg-secondary transition-colors uppercase tracking-widest shadow-xl shadow-primary/20 leading-none">
                        <CMS section="hero" field="ctaText" fallback="APPLY TO PARTNER" />
                    </a>
                </div>
            </section>

            {/* Section B: How It Works */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-secondary">
                            <CMS section="howItWorks" field="headline" fallback="How It Works" />
                        </h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

                        {[
                            { step: '1', title: 'Apply', desc: 'Fill in a short application. We verify your qualifications and clinic. Approval within 72 hours.', field: 'step1' },
                            { step: '2', title: 'Onboard', desc: 'Receive your wholesale price list, product catalog, and clinic branding kit. Place your first order at partner pricing.', field: 'step2' },
                            { step: '3', title: 'Prescribe & Earn', desc: 'Prescribe Jammi formulations to your patients. Dispense directly from your clinic. The margin is your revenue.', field: 'step3' }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 text-center bg-white p-8 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 mx-auto bg-secondary text-primary text-2xl font-bold rounded-full flex items-center justify-center mb-6 font-display border-4 border-white shadow-sm">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-4">
                                    <CMS section="howItWorks" field={`${item.field}Title`} fallback={item.title} />
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    <CMS section="howItWorks" field={`${item.field}Desc`} multiline fallback={item.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section C & D: The Commercial Proposition & Numbers */}
            <section className="bg-secondary text-white py-24 lg:py-32 border-y-[6px] border-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

                    {/* Section D: Numbers (Moved up for impact) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24 border-b border-white/10 pb-16 text-center">
                        {[
                            { metric: 'Formulations Available', value: '100+', field: 'stat1' },
                            { metric: 'Years of Clinical Use', value: '128', field: 'stat2' },
                            { metric: 'Partner Margin Range', value: '25–30%', field: 'stat3' },
                            { metric: 'Minimum Order', value: 'None', field: 'stat4' },
                            { metric: 'Delivery Coverage', value: 'Pan-India', field: 'stat5' },
                            { metric: 'Licensing', value: 'AYUSH / GMP', field: 'stat6' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2 font-display">
                                    <CMS section="metrics" field={`${stat.field}Value`} fallback={stat.value} />
                                </div>
                                <div className="text-white/60 text-xs uppercase tracking-widest font-bold">
                                    <CMS section="metrics" field={`${stat.field}Label`} fallback={stat.metric} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section C: Proposition */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* What You Get */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-10"><span className="text-primary">What</span> You Get</h2>
                            <div className="space-y-8">
                                {[
                                    { title: 'Wholesale Pricing', desc: '25–30% below MRP on all Jammi products. The full margin stays with you.', field: 'get1' },
                                    { title: '100+ Formulations', desc: 'Liver care, skin & hair, therapeutics, rasayanas, thailams, ghritams, and more. Complete Ayurvedic pharmacopoeia under one brand.', field: 'get2' },
                                    { title: 'Zero Inventory Risk', desc: 'No minimum order. No stocking requirement. Order as you prescribe. We deliver pan-India.', field: 'get3' },
                                    { title: 'AYUSH Compliance', desc: 'Every product fully licensed under AYUSH regulations. GMP-certified manufacturing. You prescribe with complete regulatory confidence.', field: 'get4' },
                                    { title: 'Clinic Branding Kit', desc: '"Jammi Authorised Partner" signage for your clinic. Product display materials. Patient information leaflets. Branded prescription pad templates.', field: 'get5' },
                                    { title: 'Marketing Support', desc: 'Featured on jammi.in as an authorised partner. Social media co-promotion. Local SEO support. Patient referrals from the Jammi platform to your clinic.', field: 'get6' },
                                    { title: 'Clinical Knowledge', desc: 'Access to Jammi’s 128-year formulation knowledge base. Dosage protocols, contraindications, combination guides — all documented by three generations of practitioners.', field: 'get7' },
                                    { title: 'Dedicated Support', desc: 'Partner WhatsApp group with direct access to the Jammi clinical team. Order support. Product queries. Clinical discussions with fellow partner practitioners.', field: 'get8' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="material-symbols-outlined text-primary flex-shrink-0 mt-1">check_circle</span>
                                        <div>
                                            <h4 className="font-bold text-white mb-1 tracking-wide">
                                                <CMS section="benefits" field={`${item.field}Title`} fallback={item.title} />
                                            </h4>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                <CMS section="benefits" field={`${item.field}Desc`} multiline fallback={item.desc} />
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What Jammi Gets */}
                        <div>
                            <div className="bg-white/5 border border-white/10 p-8 lg:p-12 rounded-3xl sticky top-24 backdrop-blur-sm">
                                <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-8"><span className="text-primary">What</span> Jammi Gets</h2>
                                <p className="text-white/80 leading-relaxed mb-10 italic border-l-2 border-primary pl-4">This is not a one-sided relationship. When you succeed, Jammi succeeds. When Jammi’s products heal your patients, your reputation grows. This is the definition of win-win.</p>

                                <div className="space-y-6">
                                    {[
                                        { from: 'You prescribe and dispense Jammi products', to: 'Expanded distribution without retail overhead', field: 'win1' },
                                        { from: 'Your clinical credibility endorses the product', to: 'Doctor-recommended trust that no advertisement can buy', field: 'win2' },
                                        { from: 'You share patient feedback and clinical outcomes', to: 'Real-world efficacy data that strengthens the formulary', field: 'win3' },
                                        { from: 'Your clinic displays Jammi branding', to: 'Brand visibility in locations where patients make decisions', field: 'win4' },
                                        { from: 'You grow your practice using our products', to: 'We grow our reach through your practice', field: 'win5' }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-black/20 p-5 rounded-xl border border-white/5 shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest">FROM YOU</span>
                                            </div>
                                            <p className="font-bold text-sm mb-4 leading-relaxed">
                                                <CMS section="proposition" field={`${item.field}From`} fallback={item.from} />
                                            </p>

                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-primary text-[10px] uppercase font-bold tracking-widest">THE VALUE TO JAMMI</span>
                                            </div>
                                            <p className="text-primary font-bold text-sm leading-relaxed">
                                                <CMS section="proposition" field={`${item.field}To`} fallback={item.to} />
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section E: Product Categories */}
            <section className="py-24 lg:py-32 bg-background-light">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-secondary mb-4">
                            <CMS section="formulary" field="headline" fallback="The Jammi Formulary" />
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">100+ proven formulations. A complete Ayurvedic pharmacopoeia under one trusted brand.</p>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {[
                            { title: 'Liver Care', desc: 'Flagship. The legendary LiverCure and related formulations.', icon: 'medical_services', field: 'cat1' },
                            { title: 'Skin & Hair Care', desc: 'Kumkumadi, Neelibringadi, and traditional beauty therapeutics.', icon: 'face_retouching_natural', field: 'cat2' },
                            { title: 'Rasayanas & Tonics', desc: 'Chyawanprash, Ashwagandha Rasayana, rejuvenation formulations.', icon: 'local_florist', field: 'cat3' },
                            { title: 'Thailams (Oils)', desc: 'Dhanwantharam, Kottamchukkadi, and therapeutic massage oils.', icon: 'water_drop', field: 'cat4' },
                            { title: 'Ghritams (Ghee-based)', desc: 'Brahmi Ghritam, Triphala Ghritam, neurological and digestive formulations.', icon: 'spa', field: 'cat5' },
                            { title: 'General Therapeutics', desc: 'Digestive, respiratory, musculoskeletal, and chronic condition formulations.', icon: 'health_and_safety', field: 'cat6' }
                        ].map((cat, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
                                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors">{cat.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">
                                    <CMS section="formulary" field={`${cat.field}Title`} fallback={cat.title} />
                                </h3>
                                <p className="text-slate-600 text-sm mb-6 min-h-[40px] leading-relaxed">
                                    <CMS section="formulary" field={`${cat.field}Desc`} multiline fallback={cat.desc} />
                                </p>
                                <Link href="/shop" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-secondary transition-colors">
                                    VIEW CATEGORY <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-transparent border-2 border-secondary text-secondary font-bold px-8 py-4 rounded-full hover:bg-secondary hover:text-white transition-colors text-sm uppercase tracking-widest inline-flex items-center gap-2">
                            <span className="material-symbols-outlined">download</span>
                            DOWNLOAD FULL PRODUCT CATALOG
                        </button>
                    </div>
                </div>
            </section>

            {/* Section F: Application Form */}
            <section id="apply" className="py-24 lg:py-32 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-secondary mb-4">
                            <CMS section="apply" field="headline" fallback="Start Prescribing Jammi" />
                        </h2>
                        <p className="text-slate-600 text-lg">Provide your details below to begin the partnership process.</p>
                    </div>

                    {formStatus === 'idle' ? (
                        <form onSubmit={handleSubmit} className="bg-background-light p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 rounded-3xl z-0"></div>
                            <div className="relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-widest">Full Name *</label>
                                        <input 
                                            required 
                                            type="text" 
                                            value={partnerForm.name}
                                            onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-widest">Qualification *</label>
                                        <div className="relative">
                                            <select required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-sm">
                                                <option value="">Select Qualification</option>
                                                <option value="bams">BAMS</option>
                                                <option value="md">MD Ayurveda</option>
                                                <option value="other">Other Recognized Qualification</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-widest">Years of Practice *</label>
                                        <input required type="number" min="0" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-widest">Phone Number *</label>
                                        <input 
                                            required 
                                            type="tel" 
                                            value={partnerForm.phone}
                                            onChange={(e) => setPartnerForm({...partnerForm, phone: e.target.value})}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Email *</label>
                                    <input 
                                        required 
                                        type="email" 
                                        value={partnerForm.email}
                                        onChange={(e) => setPartnerForm({...partnerForm, email: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
                                    />
                                </div>

                                <div className="space-y-2 mb-6">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-widest">Clinic Name & Address *</label>
                                    <textarea 
                                        required 
                                        rows={3} 
                                        value={partnerForm.clinicName}
                                        onChange={(e) => setPartnerForm({...partnerForm, clinicName: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-sm"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-widest">City / State *</label>
                                        <input 
                                            required 
                                            type="text" 
                                            value={partnerForm.location}
                                            onChange={(e) => setPartnerForm({...partnerForm, location: e.target.value})}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-widest text-slate-500">Patient Volume <span className="text-[10px] lowercase normal-case">(Optional)</span></label>
                                        <div className="relative">
                                            <select 
                                                value={partnerForm.patientVolume}
                                                onChange={(e) => setPartnerForm({...partnerForm, patientVolume: e.target.value})}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-sm"
                                            >
                                                <option value="">Monthly Patients</option>
                                                <option value="0-50">0 - 500</option>
                                                <option value="50-200">50 - 200</option>
                                                <option value="200+">200+</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="bg-primary text-white font-bold w-full py-5 rounded-full hover:bg-secondary transition-colors uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                                    APPLY TO PARTNER
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-secondary text-center p-12 sm:p-16 rounded-3xl shadow-2xl animate-fade-in relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}></div>
                            <div className="relative z-10 p-4">
                                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/30">
                                    <span className="material-symbols-outlined text-white text-5xl">done</span>
                                </div>
                                <h3 className="text-4xl font-display font-bold text-white mb-6">Application Received</h3>
                                <p className="text-white/80 leading-relaxed max-w-lg mx-auto mb-10 text-lg">
                                    Thank you for your interest in partnering with Jammi. Our team will review your application and contact you within 48 hours with your wholesale pricing and onboarding details.
                                </p>
                                <Link href="/shop" className="inline-flex bg-white text-secondary font-bold px-10 py-5 rounded-full hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-sm shadow-xl">
                                    EXPLORE THE FORMULARY
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Section G: FAQ */}
            <section className="py-24 bg-background-light border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Got Questions?</span>
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-secondary">
                            <CMS section="faq" field="headline" fallback="Frequently Asked Questions" />
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-bold text-secondary text-lg pr-4">
                                        <CMS section="faq" field={`${faq.field}Q`} fallback={faq.q} />
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 bg-primary/20' : ''}`}>
                                        <span className={`material-symbols-outlined ${activeFaq === index ? 'text-primary' : 'text-slate-500'}`}>
                                            expand_more
                                        </span>
                                    </div>
                                </button>
                                <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                                        <CMS section="faq" field={`${faq.field}A`} multiline fallback={faq.a} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Partners;
