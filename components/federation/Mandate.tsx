"use client";
import React from 'react';
import { motion } from 'framer-motion';
import LiveEditable from '../admin/LiveEditable';

export default function Mandate() {
    return (
        <section className="w-full bg-[#FAF8F2] py-24 relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
                {/* Scientific Research */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center md:px-12 md:border-r border-[#C9A84C]/30"
                >
                    <svg className="w-16 h-16 text-[#8B6914] mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <h3 className="text-2xl font-[var(--font-playfair)] text-[#1C1411] mb-4">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'mandate', content_key: 'sci_title' }}>Scientific Research</LiveEditable>
                    </h3>
                    <p className="text-[#2C2420] font-[var(--font-garamond)] text-lg leading-relaxed">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'mandate', content_key: 'sci_value' }} multiline>Pioneering collaborations with IIT Delhi, ACTREC, and premium global laboratories to validate ancient formulations with modern metrics.</LiveEditable>
                    </p>
                </motion.div>

                {/* Clinical Alliances */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center text-center md:px-12 md:border-r border-[#C9A84C]/30"
                >
                    <svg className="w-16 h-16 text-[#8B6914] mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <h3 className="text-2xl font-[var(--font-playfair)] text-[#1C1411] mb-4">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'mandate', content_key: 'clin_title' }}>Clinical Alliances</LiveEditable>
                    </h3>
                    <p className="text-[#2C2420] font-[var(--font-garamond)] text-lg leading-relaxed">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'mandate', content_key: 'clin_value' }} multiline>Strategic partnerships with leading hospitals and governing medical bodies worldwide, ensuring safe, effective patient integration.</LiveEditable>
                    </p>
                </motion.div>

                {/* Supply Chain Integrity */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col items-center text-center md:px-12"
                >
                    <svg className="w-16 h-16 text-[#8B6914] mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <h3 className="text-2xl font-[var(--font-playfair)] text-[#1C1411] mb-4">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'mandate', content_key: 'sup_title' }}>Supply Chain Integrity</LiveEditable>
                    </h3>
                    <p className="text-[#2C2420] font-[var(--font-garamond)] text-lg leading-relaxed">
                        <LiveEditable cmsKey={{ page: 'federation', section: 'mandate', content_key: 'sup_value' }} multiline>Exclusive wild sourcing partners empowering local farmers, ensuring unprecedented herb purity and strict ethical standards.</LiveEditable>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
