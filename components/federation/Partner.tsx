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
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data: FormData) => {
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
                    message: `${data.reason}\n\nYears in practice: ${data.yearsPractice}`,
                }),
            });
            const json = await res.json().catch(() => ({}));
            if (res.ok && json.success !== false) {
                setToast("Application received. Council reviews within 7 working days.");
                reset();
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
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Full Name" name="fullName" register={register} error={errors.fullName} />
                            <Input label="Email Address" type="email" name="email" register={register} error={errors.email} />
                            <Input label="Contact Number" type="tel" name="phone" register={register} error={errors.phone} />
                            <Input label="Designation" name="designation" register={register} error={errors.designation} />
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

                        {/* Drag Drop Zone */}
                        <div className="w-full border-2 border-dashed border-[#C9A84C]/40 p-12 flex flex-col items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors cursor-pointer mt-4">
                            <span className="material-symbols-outlined text-4xl mb-2">cloud_upload</span>
                            <span className="font-['Cinzel',serif] text-sm tracking-widest text-[#F0EBE1] opacity-80">DROP CREDENTIALS HERE · PDF ONLY</span>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#C9A84C] text-[#1C1411] font-['Cinzel',serif] pt-5 pb-4 tracking-widest text-lg font-bold hover:bg-[#E8C96D] disabled:opacity-50 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all">
                            {isSubmitting ? 'SUBMITTING...' : 'APPLY FOR FEDERATION MEMBERSHIP'}
                        </button>
                    </form>
                </div>
            </div>
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
