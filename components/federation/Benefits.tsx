"use client";
import React from 'react';
import { motion } from 'framer-motion';
import LiveEditable from '../admin/LiveEditable';

const benefits = [
    {
        title: "Clinical Data Access",
        text: "Access to proprietary Ayurvedic clinical data and research archives."
    },
    {
        title: "Standardized Materials",
        text: "Priority supply of standardized, Ayush-certified raw materials."
    },
    {
        title: "Joint Publications",
        text: "Joint participation in international clinical trials and publications."
    },
    {
        title: "Global Summits",
        text: "Invitations to exclusive Jammi Federation global scientific summits."
    },
    {
        title: "Co-Branding",
        text: "Co-branding opportunities for rigorous clinical research projects."
    },
    {
        title: "Supply Ecosystem",
        text: "Direct integration into the legacy Jammi supply chain ecosystem."
    }
];

export default function Benefits() {
    return (
        <section className="relative w-full bg-[#F0EBE1] py-24 px-6 overflow-hidden">
            {/* Parchment Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
                 style={{
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                 }}>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <h2 className="text-center font-['Playfair_Display',serif] italic text-4xl md:text-[52px] text-[#1C1411] mb-16">
                    <LiveEditable cmsKey={{ page: 'federation', section: 'benefits', content_key: 'main_title' }}>What Membership Grants You</LiveEditable>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(201, 168, 76, 0.4)" }}
                            className="bg-[#FAF8F2] border border-[#D4B896] border-l-[3px] border-l-[#C9A84C] p-8 flex flex-col transition-all duration-300"
                        >
                            {/* SVG Wax Seal placeholder */}
                            <div className="w-10 h-10 mb-6 flex items-center justify-center bg-[#1C1411] rounded-full text-[#C9A84C]">
                               <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                            </div>
                            
                            <h3 className="text-xl font-['Playfair_Display',serif] font-bold text-[#1C1411] mb-3">
                                <LiveEditable cmsKey={{ page: 'federation', section: 'benefits', content_key: `benefit_${i}_title` }}>{benefit.title}</LiveEditable>
                            </h3>
                            <p className="text-[#2C2420] font-['EB_Garamond',serif] text-lg leading-snug">
                                <LiveEditable cmsKey={{ page: 'federation', section: 'benefits', content_key: `benefit_${i}_text` }} multiline>{benefit.text}</LiveEditable>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
