"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import LiveEditable from '../components/admin/LiveEditable';
import { useFederationStore } from '../store/federationStore';
import { useCMSContent } from '../hooks/useCMSContent';

const Federation: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const { 
        posts, submitPost, 
        createDoctorProfile, currentUserProfile, 
        notifications 
    } = useFederationStore();

    const { content, loading } = useCMSContent('federation');

    const [profileData, setProfileData] = useState({
        name: '', specialty: '', bio: '', regNo: '', phone: '', email: '', clinic: ''
    });

    const [newPost, setNewPost] = useState({
        title: '', content: '', category: 'Case Study'
    });

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        await createDoctorProfile({
            name: profileData.name,
            specialty: profileData.specialty,
            bio: `${profileData.bio} | Registry: ${profileData.regNo} | Clinic: ${profileData.clinic}`
        });
        setFormStatus('submitted');
    };

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUserProfile || !currentUserProfile.verified) {
            alert("Only verified doctors can post to the community.");
            return;
        }
        
        await submitPost({
            author: currentUserProfile.name,
            specialty: currentUserProfile.specialty,
            category: newPost.category,
            title: newPost.title,
            content: newPost.content,
            doctorId: currentUserProfile.id
        });
        setNewPost({ title: '', content: '', category: 'Case Study' });
        alert("Your post is under review. When verified, it will be allowed to post.");
    };

    const CMS = ({ section, field, fallback, inputType = 'text', multiline = false, className = '' }: any) => (
        <LiveEditable cmsKey={{ page: 'federation', section, content_key: field }} inputType={inputType} multiline={multiline} className={`inline-block ${className}`}>
            {content?.[section]?.[field] || fallback}
        </LiveEditable>
    );

    if (loading) return <div className="min-h-screen pt-24 bg-forest flex items-center justify-center text-white">
        <CMS section="loading" field="text" fallback="Loading Federation Portal..." />
    </div>;

    return (
        <div className="bg-background-light pt-[5rem]">
            {/* Notification Ticker */}
            {notifications.length > 0 && (
                <div className="bg-white border-b border-cream-dark py-2 overflow-hidden whitespace-nowrap relative z-20">
                    <div className="flex animate-marquee items-center gap-12">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="flex items-center gap-2 px-4 border-r border-slate-100 last:border-0">
                                <span className="size-2 bg-saffron rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-bold text-forest uppercase tracking-widest">{notif.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SECTION 1: Hero */}
            <section className="bg-forest relative overflow-hidden text-center py-24 lg:py-32">
                <div className="absolute inset-0 opacity-10 mix-blend-overlay grain-texture"></div>
                <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
                    <span className="text-forest bg-saffron font-bold uppercase tracking-widest text-[10px] mb-6 inline-block py-1 px-3 rounded-full shadow-sm">
                        <CMS section="hero" field="badge" fallback="JOIN THE MOVEMENT" />
                    </span>
                    <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white tracking-tight">
                        <CMS section="hero" field="title" fallback="Stop Practising Alone." />
                    </h1>
                    <p className="text-white/80 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                        <CMS section="hero" field="subtext" multiline fallback="Join 128 years of Ayurveda credibility. Get patients, products, and a brand that works for you — while you stay independent." />
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="#apply" className="w-full sm:w-auto text-center bg-saffron text-white font-bold px-8 py-4 rounded-sm hover:-translate-y-1 transition-transform uppercase tracking-widest text-sm shadow-xl shadow-saffron/20">
                            <CMS section="hero" field="ctaPrimary" fallback="APPLY NOW — IT'S FREE" />
                        </a>
                        <a href="#benefits" className="w-full sm:w-auto text-center bg-transparent border-2 border-white/20 text-white font-bold px-8 py-4 rounded-sm hover:border-white transition-colors uppercase tracking-widest text-sm">
                            <CMS section="hero" field="ctaSecondary" fallback="SEE WHAT MEMBERS GET" />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 2: The Problem */}
            <section className="py-20 lg:py-28 bg-cream border-b border-cream-dark">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-saffron uppercase tracking-widest mb-4">
                            <CMS section="reality" field="label" fallback="THE REALITY" />
                        </h2>
                        <h3 className="text-3xl lg:text-4xl font-serif font-bold text-forest">
                            <CMS section="reality" field="title" fallback="Authentic Ayurveda is Losing to Marketing." />
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'storefront', title: 'Fighting Big Pharma Alone', desc: 'Independent clinics are outspent by FMCG brands selling diluted "Ayurvedic" cosmetics.', field: 'prob1' },
                            { icon: 'inventory_2', title: 'Supply Chain Headaches', desc: 'Procuring authentic, compliant, and consistently effective medicines takes time away from healing.', field: 'prob2' },
                            { icon: 'trending_down', title: 'Limited Patient Reach', desc: 'Without a massive marketing budget, even the best practitioners struggle to build a steady patient flow.', field: 'prob3' }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl border border-cream-dark text-center shadow-sm">
                                <span className="material-symbols-outlined text-saffron text-4xl mb-6">{card.icon}</span>
                                <h4 className="text-xl font-bold text-forest mb-3">
                                    <CMS section="problems" field={`${card.field}Title`} fallback={card.title} />
                                </h4>
                                <p className="text-forest/70 text-sm leading-relaxed">
                                    <CMS section="problems" field={`${card.field}Desc`} multiline fallback={card.desc} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: The Fix (What JAM Is) */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-forest mb-6">
                                <CMS section="solution" field="title" fallback="The Jammi Ayurveda Movement" />
                            </h2>
                            <p className="text-forest/80 text-lg leading-relaxed mb-8">
                                <CMS section="solution" field="text" multiline fallback="JAM is a cooperative federation of India's finest independent traditional healers. We provide the 128-year credibility, the pan-India patient network, and the clinical formulary. You provide the healing." />
                            </p>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Collective Power', desc: 'Leverage the strength of a national brand while keeping your clinic 100% yours.', field: 'sol1' },
                                        { title: 'Clinical Certainty', desc: 'Access 100+ AYUSH-licensed formulations proven over three generations.', field: 'sol2' },
                                        { title: 'Democratic Voice', desc: 'A movement run for practitioners, guided by clinical results, not just profits.', field: 'sol3' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <span className="material-symbols-outlined text-saffron mt-1">arrow_forward</span>
                                            <div>
                                                <h5 className="font-bold text-forest mb-1">
                                                    <CMS section="solution" field={`${item.field}Title`} fallback={item.title} />
                                                </h5>
                                                <p className="text-forest/70 text-sm">
                                                    <CMS section="solution" field={`${item.field}Desc`} fallback={item.desc} multiline />
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-cream-dark flex items-center justify-center relative z-10 shadow-2xl">
                                <CMS 
                                    section="solution" 
                                    field="videoUrl" 
                                    fallback="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                                    inputType="video"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-full h-full border-2 border-saffron rounded-2xl z-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: What You Get */}
            <section id="benefits" className="py-20 lg:py-28 bg-forest text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6">
                            <CMS section="advantages" field="title" fallback="The Federation Advantage" />
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto">
                            <CMS section="advantages" field="subtext" fallback="Everything you need to scale your practice without compromising your principles." multiline />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: 'payments', title: '25% Wholesale Margins', desc: 'Direct access to the Jammi formulary at exclusive member pricing.', field: 'adv1' },
                            { icon: 'verified', title: 'Clinic Accreditation', desc: '"JAM Authorized" signage and digital badges for your practice.', field: 'adv2' },
                            { icon: 'people', title: 'Patient Referrals', desc: 'Direct routing of local patients from our digital platforms to your clinic.', field: 'adv3' },
                            { icon: 'menu_book', title: 'Clinical Protocols', desc: 'Access 128 years of documented efficacy and dosage guidelines.', field: 'adv4' },
                            { icon: 'forum', title: 'Peer Network', desc: 'Connect with elite practitioners for case discussions and mentorship.', field: 'adv5' },
                            { icon: 'campaign', title: 'Marketing Cover', desc: 'Benefit from JAM\'s national advertising and public trust campaigns.', field: 'adv6' }
                        ].map((benefit, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-saffron text-3xl mb-4">{benefit.icon}</span>
                                <h4 className="font-bold text-lg mb-2">
                                    <CMS section="advantages" field={`${benefit.field}Title`} fallback={benefit.title} />
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    <CMS section="advantages" field={`${benefit.field}Desc`} fallback={benefit.desc} multiline />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: The Amul Model */}
            <section className="py-20 lg:py-28 bg-cream border-b border-cream-dark">
                <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-xs font-bold text-forest uppercase tracking-widest mb-4">
                        <CMS section="amul" field="badge" fallback="THE BLUEPRINT" />
                    </h2>
                    <h3 className="text-3xl lg:text-4xl font-serif font-bold text-forest mb-8">
                        <CMS section="amul" field="title" fallback="Not a Franchise. A Cooperative." />
                    </h3>
                    <p className="text-forest/80 text-lg mb-12 max-w-3xl mx-auto">
                        <CMS section="amul" field="desc" multiline fallback="Like Amul did for dairy farmers, JAM organizes independent Ayurveda practitioners under one trusted national brand. We handle the manufacturing, compliance, and large-scale brand building. You handle the patients. We share the success." />
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white p-8 rounded-2xl border-2 border-red-100 shadow-sm opacity-60">
                            <h4 className="font-bold text-red-800 mb-6 uppercase tracking-widest text-sm mt-2">
                                <CMS section="amul" field="corporateTitle" fallback="The Corporate Model" />
                            </h4>
                            <ul className="space-y-4 text-left text-sm text-forest/70">
                                <li className="flex gap-3"><span className="text-red-500">✕</span> <CMS section="amul" field="corpPoint1" fallback="You pay massive franchise fees." /></li>
                                <li className="flex gap-3"><span className="text-red-500">✕</span> <CMS section="amul" field="corpPoint2" fallback="You lose your clinic's identity." /></li>
                                <li className="flex gap-3"><span className="text-red-500">✕</span> <CMS section="amul" field="corpPoint3" fallback="Aggressive sales targets imposed." /></li>
                                <li className="flex gap-3"><span className="text-red-500">✕</span> <CMS section="amul" field="corpPoint4" fallback="Profits flow upward to investors." /></li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border-2 border-saffron shadow-lg relative transform md:-translate-y-2">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-forest text-saffron text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">The JAM Model</div>
                            <h4 className="font-bold text-forest mb-6 uppercase tracking-widest text-sm mt-2">
                                <CMS section="amul" field="federationTitle" fallback="The Federation Model" />
                            </h4>
                            <ul className="space-y-4 text-left text-sm text-forest font-medium">
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> <CMS section="amul" field="fedPoint1" fallback="Zero joining or franchise fees." /></li>
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> <CMS section="amul" field="fedPoint2" fallback="Your clinic remains 100% yours." /></li>
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> <CMS section="amul" field="fedPoint3" fallback="Prescribe only what patients need." /></li>
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> <CMS section="amul" field="fedPoint4" fallback="Margins and growth stay with the healer." /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: Membership Tiers */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest mb-4">
                            <CMS section="tiers" field="title" fallback="Membership Tiers" />
                        </h2>
                        <p className="text-forest/70">
                            <CMS section="tiers" field="subtext" fallback="Choose your level of engagement with the movement." />
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tier 1 */}
                        <div className="bg-cream p-8 rounded-2xl border border-cream-dark flex flex-col">
                            <div className="mb-6">
                                <h3 className="font-bold text-forest text-xl mb-2">
                                    <CMS section="tiers" field="tier1Title" fallback="Associate Member" />
                                </h3>
                                <div className="text-3xl font-bold text-forest mb-2">
                                    <CMS section="tiers" field="tier1Price" fallback="Free" />
                                </div>
                                <p className="text-forest/60 text-sm">
                                    <CMS section="tiers" field="tier1Sub" multiline fallback="For practitioners testing the waters." />
                                </p>
                            </div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm text-forest/80">
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier1Point1" fallback="Wholesale pricing catalog access" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier1Point2" fallback="Basic clinical protocols" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier1Point3" fallback="Monthly newsletter" />
                                </li>
                            </ul>
                            <a href="#apply" className="w-full block border-2 border-forest text-forest text-center py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-forest hover:text-white transition-colors">
                                <CMS section="tiers" field="tier1Btn" fallback="Select Tier" />
                            </a>
                        </div>

                        {/* Tier 2 */}
                        <div className="bg-forest text-white p-8 rounded-2xl border-2 border-saffron shadow-2xl flex flex-col transform md:-translate-y-4 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-saffron text-forest font-bold uppercase tracking-widest text-[10px] px-4 py-1 rounded-full">RECOMMENDED</div>
                            <div className="mb-6 mt-2">
                                <h3 className="font-bold text-white text-xl mb-2">
                                    <CMS section="tiers" field="tier2Title" fallback="Founding Member" />
                                </h3>
                                <div className="text-3xl font-serif text-saffron mb-2">
                                    <CMS section="tiers" field="tier2Price" fallback="Invite Only" />
                                </div>
                                <p className="text-white/60 text-sm">
                                    <CMS section="tiers" field="tier2Sub" multiline fallback="For committed partners growing with JAM." />
                                </p>
                            </div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm text-white/90 border-t border-white/10 pt-6">
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier2Point1" fallback="Permanent 25% Margin lock" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier2Point2" fallback="Active patient routing from jammi.in" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier2Point3" fallback="Full Clinic Accreditation Kit" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier2Point4" fallback="Peer network access & vote rights" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier2Point5" fallback="Dedicated account manager support" />
                                </li>
                            </ul>
                            <a href="#apply" className="w-full block bg-saffron text-white text-center py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-white hover:text-forest transition-colors">
                                <CMS section="tiers" field="tier2Btn" fallback="Apply For Founding Status" />
                            </a>
                        </div>

                        {/* Tier 3 */}
                        <div className="bg-cream p-8 rounded-2xl border border-cream-dark flex flex-col">
                            <div className="mb-6">
                                <h3 className="font-bold text-forest text-xl mb-2">
                                    <CMS section="tiers" field="tier3Title" fallback="Institution" />
                                </h3>
                                <div className="text-3xl font-bold text-forest mb-2">
                                    <CMS section="tiers" field="tier3Price" fallback="Custom" />
                                </div>
                                <p className="text-forest/60 text-sm">
                                    <CMS section="tiers" field="tier3Sub" multiline fallback="For multi-doctor clinics and hospitals." />
                                </p>
                            </div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm text-forest/80">
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier3Point1" fallback="Bulk supply chain integration" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier3Point2" fallback="White-label prescription options" />
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <CMS section="tiers" field="tier3Point3" fallback="Clinical research partnerships" />
                                </li>
                            </ul>
                            <a href="#apply" className="w-full block border-2 border-forest text-forest text-center py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-forest hover:text-white transition-colors">
                                <CMS section="tiers" field="tier3Btn" fallback="Contact Us" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 10: FAQ */}
            <section className="py-24 bg-white border-t border-cream-dark">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest">
                            <CMS section="faqs" field="title" fallback="Common Questions" />
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Is JAM a franchise model?",
                                a: "No. You remain 100% independent. JAM is a cooperative movement where authentic practitioners share resources, formulations, and credibility. You retain complete ownership of your clinic.",
                                field: 'faq1'
                            },
                            {
                                q: "What is the requirement to join?",
                                a: "You must be a qualified Ayurveda practitioner (BAMS / MD) with a dedicated clinic and a commitment to authentic practice over commercial shortcuts.",
                                field: 'faq2'
                            },
                            {
                                q: "How does the wholesale pricing work?",
                                a: "Members receive access to Jammi's entire 128-year formulary at an exclusive 25% wholesale discount. You dispense directly to your patients at MRP.",
                                field: 'faq3'
                            },
                            {
                                q: "Is there a minimum monthly volume?",
                                a: "No. We believe in prescribing what the patient needs, not meeting sales quotas. Order only what you require.",
                                field: 'faq4'
                            },
                            {
                                q: "Can I be part of other networks?",
                                a: "Yes. We respect your independence. However, members find that the clinical efficacy of Jammi formulations naturally becomes the core of their practice.",
                                field: 'faq5'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-cream border border-cream-dark rounded-xl overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none hover:bg-cream-dark/30 transition-colors"
                                >
                                    <span className="font-bold text-forest pr-4">
                                        <CMS section="faqs" field={`${faq.field}Q`} fallback={faq.q} />
                                    </span>
                                    <span className={`material-symbols-outlined text-saffron transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                        add_circle
                                    </span>
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-forest/80 text-sm leading-relaxed border-t border-cream-dark pt-4">
                                        <CMS section="faqs" field={`${faq.field}A`} multiline fallback={faq.a} />
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

export default Federation;
