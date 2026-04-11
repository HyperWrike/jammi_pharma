"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import LiveEditable from '../admin/LiveEditable';

const formSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(5, "Contact number required"),
    designation: z.string().min(2, "Designation is required"),
    institution: z.string().min(2, "Institution is required"),
    location: z.string().min(2, "City & Country string is required"),
    specialization: z.string().min(2, "Specialization is required"),
    yearsPractice: z.string().min(1, "Years in practice is required"),
    reason: z.string().min(10, "Please provide a reason for applying")
});

type FormData = z.infer<typeof formSchema>;

export default function Partner() {
    const [toast, setToast] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [visitCount, setVisitCount] = useState(1);
    const [consentMarketing, setConsentMarketing] = useState(false);
    const [allowCookies, setAllowCookies] = useState(false);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

        React.useEffect(() => {
            try {
                const key = 'jammi_federation_membership_visits';
                const previous = Number(localStorage.getItem(key) || 0);
                const next = previous + 1;
                localStorage.setItem(key, String(next));
                setVisitCount(next);
            } catch {
                setVisitCount(1);
            }
        }, []);

        React.useEffect(() => {
            const openHandler = () => setIsFormOpen(true);
            window.addEventListener('jammi_open_membership_form', openHandler);
            return () => window.removeEventListener('jammi_open_membership_form', openHandler);
        }, []);

    const onSubmit = async (data: FormData) => {
        if (!consentMarketing || !allowCookies) {
            setToast('Please accept both consent options to proceed.');
            setTimeout(() => setToast(''), 5000);
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/partner-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: data.fullName,
                    organization: data.institution,
                    specialization: `${data.designation} — ${data.specialization}`,
                    email: data.email,
                    phone: data.phone,
                    city: data.location,
                    message: `${data.reason}\n\nYears in practice: ${data.yearsPractice}\nSource Page: /federation\nVisit Count: ${visitCount}\nConsent (Emails/Promotions): ${consentMarketing ? 'Yes' : 'No'}\nAllow Cookies: ${allowCookies ? 'Yes' : 'No'}`,
                }),
            });
            const json = await res.json().catch(() => ({}));
            if (res.ok && json.success !== false) {
                setToast("Application received. Council reviews within 7 working days.");
                reset();
                setConsentMarketing(false);
                setAllowCookies(false);
                setIsFormOpen(false);
            } else {
                setToast(json.error || "Submission failed. Please try again.");
            }
            setTimeout(() => setToast(''), 5000);
        } catch (error) {
            console.error("Submission failed", error);
            setToast("An error occurred. Please try again later.");
            setTimeout(() => setToast(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-[#1C1411] pt-12 pb-24 px-6 relative overflow-hidden">
            {/* Ornamental Lotus Border placeholder */}
            <div className="absolute top-0 left-0 w-full h-8 opacity-20" 
                 style={{ 
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 0 C40 15, 60 15, 50 20\' stroke=\'%23C9A84C\' fill=\'none\' stroke-width=\'1\'/%3E%3C/svg%3E")',
                     backgroundSize: '100px 20px',
                     backgroundRepeat: 'repeat-x'
                 }}>
            </div>

            <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row gap-16">
                
                {/* Text Block */}
                <div className="flex-1">
                    <p className="font-['Cinzel',serif] text-[#C9A84C] tracking-[0.2em] text-sm mb-4">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'partner', content_key: 'subtitle' }}>AN ELITE ECOSYSTEM</LiveEditable>
                    </p>
                    <h2 className="text-5xl md:text-[80px] font-['Cormorant_SC',serif] text-[#C9A84C] leading-none mb-8">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'partner', content_key: 'title' }}>PARTNER WITH US</LiveEditable>
                    </h2>
                    <p className="text-[#F0EBE1] font-['EB_Garamond',serif] italic text-xl leading-relaxed max-w-lg mb-12 opacity-80">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'partner', content_key: 'description' }} multiline>Join an illustrious circle of physicians, researchers, and holistic practitioners dedicated to bringing empirical rigor to Ayurvedic tradition.</LiveEditable>
                    </p>

                    <button className="flex items-center gap-2 font-['Cinzel',serif] text-[#C9A84C] text-sm hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        DOWNLOAD THE FEDERATION PROSPECTUS
                    </button>
                    
                    {toast && (
                        <div className="mt-8 bg-[#2C2420] border border-[#C9A84C] text-[#C9A84C] py-3 px-6 font-['Cinzel',serif] text-sm tracking-wide transition-opacity">
                            {toast}
                        </div>
                    )}
                </div>

                {/* Form Block */}
                <div className="flex-1">
                    <div className="p-8 border border-[#C9A84C]/30 bg-[#241b17] rounded-xl">
                        <p className="text-[#F0EBE1] font-['EB_Garamond',serif] text-xl leading-relaxed mb-6">
                            Submit your membership request through our secure popup form. We capture page source and visit frequency for better response context.
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(true)}
                            className="w-full bg-[#C9A84C] text-[#1C1411] font-['Cinzel',serif] pt-5 pb-4 tracking-widest text-lg font-bold hover:bg-[#E8C96D] transition-all"
                        >
                            APPLY FOR FEDERATION MEMBERSHIP
                        </button>
                    </div>
                </div>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4" role="dialog" aria-modal="true">
                    <div className="w-full max-w-3xl bg-[#1C1411] border border-[#C9A84C]/40 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#C9A84C]/20 flex items-center justify-between">
                            <h3 className="text-[#C9A84C] text-2xl font-['Cormorant_SC',serif]">Apply For Membership</h3>
                            <button onClick={() => setIsFormOpen(false)} className="text-[#C9A84C] hover:text-white">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Name" name="fullName" register={register} error={errors.fullName} />
                                <Input label="Occupation" name="designation" register={register} error={errors.designation} />
                                <Input label="Contact Number" type="tel" name="phone" register={register} error={errors.phone} />
                                <Input label="Email Address" type="email" name="email" register={register} error={errors.email} />
                                <Input label="Institution" name="institution" register={register} error={errors.institution} />
                                <Input label="City & Country" name="location" register={register} error={errors.location} />
                                <Input label="Specialization" name="specialization" register={register} error={errors.specialization} />
                                <Input label="Years in Practice" type="number" name="yearsPractice" register={register} error={errors.yearsPractice} />
                            </div>

                            <div className="relative group w-full mt-2">
                                <textarea
                                    placeholder="Reason for Applying"
                                    {...register("reason")}
                                    className="w-full bg-transparent border-b border-[#D4B896]/50 pb-2 text-[#F0EBE1] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/50 resize-none h-24"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                                {errors.reason && <p className="text-red-400 text-xs mt-1 absolute -bottom-5 font-['DM_Mono',monospace]">{errors.reason.message as string}</p>}
                            </div>

                            <label className="flex items-start gap-3 text-[#F0EBE1] text-sm">
                                <input type="checkbox" checked={consentMarketing} onChange={(e) => setConsentMarketing(e.target.checked)} className="mt-1" />
                                <span>I consent to receive emails and promotions.</span>
                            </label>
                            <label className="flex items-start gap-3 text-[#F0EBE1] text-sm">
                                <input type="checkbox" checked={allowCookies} onChange={(e) => setAllowCookies(e.target.checked)} className="mt-1" />
                                <span>I allow cookies for better experience and application analytics.</span>
                            </label>

                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-3 border border-[#C9A84C]/40 text-[#C9A84C] rounded-lg">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-[#C9A84C] text-[#1C1411] font-bold rounded-lg disabled:opacity-50">
                                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

function Input({ label, name, type = "text", register, error }: { label: string, name: string, type?: string, register: any, error: any }) {
    return (
        <div className="relative group w-full">
            <input 
                type={type} 
                placeholder={label}
                {...register(name)}
                className="w-full bg-transparent border-b border-[#D4B896]/50 pb-2 text-[#F0EBE1] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/50"
            />
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
            {error && <p className="text-red-400 text-xs mt-1 absolute -bottom-5 font-['DM_Mono',monospace]">{error.message}</p>}
        </div>
    );
}
