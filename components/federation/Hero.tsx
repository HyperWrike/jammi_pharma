"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LiveEditable from '../admin/LiveEditable';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number, y: number, radius: number, speed: number, alpha: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.2,
                    alpha: Math.random() * 0.5 + 0.1
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`; // gold
                ctx.fill();

                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const headlineText = "UNITING AYURVEDIC HERITAGE WITH GLOBAL SCIENTIFIC EXCELLENCE";
    const words = headlineText.split(" ");

    return (
        <section className="relative w-full min-h-screen bg-[#FAF8F2] flex flex-col items-center justify-center px-6 overflow-hidden pt-24 pb-16">
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 pointer-events-none opacity-15"
            />
            
            <div className="z-10 flex flex-col items-center text-center max-w-5xl">
                {/* SVG Mandala */}
                <motion.svg 
                    width="120" height="120" viewBox="0 0 100 100" 
                    className="mb-8"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.circle 
                        cx="50" cy="50" r="45" 
                        fill="none" stroke="#C9A84C" strokeWidth="1"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } }
                        }}
                    />
                    <motion.path 
                        d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18"
                        fill="none" stroke="#C9A84C" strokeWidth="0.5"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut", delay: 0.5 } }
                        }}
                    />
                </motion.svg>

                <h1 className="text-4xl sm:text-6xl md:text-[90px] leading-none mb-8 text-[#C9A84C] font-[var(--font-cormorant)]">
                    <LiveEditable cmsKey={{ page: 'federation', section: 'hero', content_key: 'headline' }} multiline className="block w-full">
                        {headlineText}
                    </LiveEditable>
                </h1>

                <motion.p 
                    className="text-xl md:text-2xl text-[#9E8E7E] italic font-[var(--font-garamond)] mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <LiveEditable cmsKey={{ page: 'federation', section: 'hero', content_key: 'subtext' }}>A legacy of healing, verified by modern research.</LiveEditable>
                </motion.p>

                <motion.div 
                    className="flex flex-col sm:flex-row gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                >
                    <button className="px-8 py-4 border border-[#C9A84C] text-[#C9A84C] font-['Cinzel'] text-sm tracking-widest hover:bg-[#C9A84C] hover:text-white transition-colors duration-300">
                        EXPLORE THE FEDERATION
                    </button>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('jammi_open_membership_form'))}
                        className="px-8 py-4 bg-[#1C1411] text-[#E8C96D] font-['Cinzel'] text-sm tracking-widest hover:bg-[#0D0907] transition-colors duration-300"
                    >
                        APPLY FOR MEMBERSHIP
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
