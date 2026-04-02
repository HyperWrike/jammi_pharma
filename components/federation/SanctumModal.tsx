"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFederationStore } from '../../store/federationStore';

export default function SanctumModal() {
    const { sanctumModalOpen, closeSanctumModal, loginAdmin } = useFederationStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await loginAdmin(username, password);
        if (!success) {
            setError(true);
            setTimeout(() => setError(false), 500);
        } else {
            setUsername('');
            setPassword('');
        }
    };

    return (
        <AnimatePresence>
            {sanctumModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0D0907]/95 backdrop-blur-md px-4">
                    <div 
                        className="absolute inset-0 cursor-pointer"
                        onClick={closeSanctumModal}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={error ? { x: [0, -10, 10, -10, 10, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ 
                            duration: error ? 0.4 : 0.5, 
                            ease: error ? "easeInOut" : [0.16, 1, 0.3, 1] 
                        }}
                        className="relative z-10 w-full max-w-md bg-[#1C1411] border-2 border-double border-[#C9A84C] p-10 flex flex-col items-center shadow-2xl"
                    >
                        {/* Corner Flourishes */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[#C9A84C]/50"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#C9A84C]/50"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#C9A84C]/50"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[#C9A84C]/50"></div>

                        {/* SVG Wax Seal */}
                        <svg className="w-16 h-16 text-[#C9A84C] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>

                        <h2 className="text-4xl font-['Cormorant_SC',serif] text-[#C9A84C] mb-2 leading-none">
                            THE SANCTUM
                        </h2>
                        <p className="font-['Cinzel',serif] tracking-[0.2em] text-[#9E8E7E] text-[10px] mb-8 text-center">
                            RESTRICTED ACCESS · FEDERATION ADMINISTRATION
                        </p>

                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                            <div className="relative group w-full">
                                <input 
                                    type="text" 
                                    placeholder="Identity"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#D4B896]/50 pb-2 text-[#F0EBE1] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/50"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group w-full">
                                <input 
                                    type="password" 
                                    placeholder="Passphrase"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#D4B896]/50 pb-2 text-[#F0EBE1] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/50"
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            {error && (
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[#D4B896] text-[11px] font-['DM_Mono',monospace] tracking-widest text-center mt-2"
                                >
                                    IDENTITY UNVERIFIED · ACCESS DENIED
                                </motion.p>
                            )}

                            <button type="submit" className="w-full bg-transparent border border-[#C9A84C] text-[#C9A84C] font-['Cinzel',serif] pt-4 pb-3 tracking-widest text-sm hover:bg-[#C9A84C] hover:text-[#1C1411] transition-all mt-4">
                                ENTER THE SANCTUM
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
