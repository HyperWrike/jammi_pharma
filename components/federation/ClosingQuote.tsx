"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveEditable from '../admin/LiveEditable';

export default function ClosingQuote() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0.8, 1], [0.8, 0.1]);

    return (
        <section className="relative w-full bg-[#FAF8F2] py-32 px-6 flex justify-center items-center text-center overflow-hidden">
            <motion.div 
                style={{ opacity }}
                className="absolute top-8 left-1/2 -translate-x-1/2 text-[#C9A84C] font-['Cormorant_SC',serif] text-[180px] leading-none pointer-events-none select-none"
            >
                "
            </motion.div>
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-5xl font-['Playfair_Display',serif] italic text-[#1C1411] leading-relaxed mb-8">
                    <LiveEditable cmsKey={{ page: 'federation', section: 'closing', content_key: 'quote' }} multiline>"Medicine is not an experiment. It is a legacy. 128 years of proof that authentic healthcare belongs to the practitioners of India."</LiveEditable>
                </h2>
                <div className="flex items-center gap-4 text-[#8B6914] font-['Cinzel',serif] tracking-[0.3em] text-[11px] font-bold">
                    <span className="w-8 h-px bg-[#8B6914]"></span>
                    <LiveEditable cmsKey={{ page: 'federation', section: 'closing', content_key: 'label' }}>THE JAMMI PHILOSOPHY</LiveEditable>
                    <span className="w-8 h-px bg-[#8B6914]"></span>
                </div>
            </div>
        </section>
    );
}
