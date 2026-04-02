"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function FloatingCTA() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Bottom Fixed Bar */}
            <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] flex justify-between items-center px-4 py-2 pb-safe">
                <Link href="/consultation" className="flex flex-col flex-1 items-center justify-center p-1 text-forest hover:text-saffron transition-colors">
                    <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                    <span className="text-[10px] font-bold mt-1">Book</span>
                </Link>
                <div className="w-px h-8 bg-gray-200 mx-2"></div>
                <a href="tel:+919043020764" className="flex flex-col flex-1 items-center justify-center p-1 text-forest hover:text-saffron transition-colors">
                    <span className="material-symbols-outlined text-[24px]">call</span>
                    <span className="text-[10px] font-bold mt-1">Call</span>
                </a>
                <div className="w-px h-8 bg-gray-200 mx-2"></div>
                <a href="https://wa.me/919043020764" target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1 items-center justify-center p-1 text-[#25D366] hover:text-green-600 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    <span className="text-[10px] font-bold mt-1">WhatsApp</span>
                </a>
            </div>

            {/* Desktop Bottom-Left Sticky FAB */}
            <div className="hidden md:flex fixed z-50 flex-col-reverse items-center gap-3 transition-all duration-300 bottom-6 left-6">
                
                {/* Main Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 rounded-full bg-forest text-white shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105 z-50`}
                    aria-label="Contact Options"
                >
                    <span className={`material-symbols-outlined text-[28px] transition-transform duration-300 ${isOpen ? 'rotate-180 scale-0 opacity-0 absolute' : 'rotate-0 scale-100 opacity-100'}`}>
                        support_agent
                    </span>
                    <span className={`material-symbols-outlined text-[28px] transition-transform duration-300 ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0 absolute'}`}>
                        close
                    </span>
                </button>

                {/* Options */}
                <div className={`flex flex-col-reverse gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 mb-2' : 'scale-0 opacity-0 pointer-events-none mb-0 h-0'}`}>
                    {/* Book Appointment */}
                    <Link href="/consultation" className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-saffron text-white shadow-lg hover:scale-110 transition-transform disabled:opacity-50">
                        <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                        <span className="absolute left-14 bg-white text-forest text-xs font-bold py-1 px-3 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Book Appointment
                        </span>
                    </Link>

                    {/* Phone */}
                    <a href="tel:+919043020764" className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white shadow-lg hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        <span className="absolute left-14 bg-white text-forest text-xs font-bold py-1 px-3 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            +91 9043020764
                        </span>
                    </a>

                    {/* WhatsApp */}
                    <a href="https://wa.me/919043020764" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        <span className="absolute left-14 bg-white text-forest text-xs font-bold py-1 px-3 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Chat on WhatsApp
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
}
