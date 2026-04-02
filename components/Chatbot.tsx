"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useFederationStore } from '../store/federationStore';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    isAction?: boolean;
    product?: {
        name: string;
        image: string;
        link: string;
        price: string;
    };
}

const SUGGESTED_QUESTIONS = [
    "I have a skin issue",
    "What is LiverCure?",
    "Book Consultation",
    "Products for hair fall?"
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome-1',
            sender: 'bot',
            text: 'Namaste. I am pantulu, your Ayurvedic AI guide. How can I assist you with Jammi Pharmaceuticals today?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { products: storeProducts } = useFederationStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setHasUnread(false);
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI response delay
        setTimeout(() => {
            let botResponse = "I'm still learning the intricacies of our 128-year-old pharmacopoeia. Please consult our expert Vaidyas for profound medical advice.";
            let isAction = false;
            let productData: Message['product'] = undefined;
            const lowerText = text.toLowerCase();

            if (lowerText.includes('livercure') || lowerText.includes('liver')) {
                botResponse = "LiverCure is our flagship formulation designed to protect and rejuvenate the liver. It's particularly effective for fatty liver and sluggish digestion.";
            } else if (lowerText.includes('consultation') || lowerText.includes('book')) {
                botResponse = "I can help you with that. You can book an online video consultation or an offline clinic visit with our expert Vaidyas.";
                isAction = true;
            } else {
                const searchKeywords = lowerText.split(' ').filter(w => w.length > 3);

                // Dynamically extract categories from all store products
                const uniqueCategories = Array.from(new Set(storeProducts.map(p => p.category?.toLowerCase() || '')));
                
                // Add category-based dynamic keywords
                uniqueCategories.forEach(cat => {
                    const catWords = cat.split(/[\s-]+/).filter(w => w.length > 3);
                    // If the user's text contains a significant word from a category
                    if (catWords.some(cw => lowerText.includes(cw))) {
                        searchKeywords.push(...catWords);
                        searchKeywords.push(cat); // Boost the exact category name
                    }
                });

                // Additional user-intent mapping for issues
                if (lowerText.includes('issue') || lowerText.includes('problem') || lowerText.includes('care')) {
                    const baseWords = lowerText.split(' ').filter(w => w.length > 2 && !['issue', 'problem', 'care', 'the', 'and', 'for', 'with', 'have'].includes(w));
                    for (const bw of baseWords) {
                         const matchedCat = uniqueCategories.find(c => c.includes(bw));
                         if (matchedCat) {
                             searchKeywords.push(matchedCat);
                         }
                    }
                }

                // Fallback common vernacular mappings
                if (lowerText.includes('hair')) searchKeywords.push('hair');
                if (lowerText.includes('skin') || lowerText.includes('acne') || lowerText.includes('glow')) searchKeywords.push('skin', 'glow', 'acne', 'complexion');
                if (lowerText.includes('joint') || lowerText.includes('pain') || lowerText.includes('knee')) searchKeywords.push('joint', 'ortho', 'pain', 'arthritis');
                if (lowerText.includes('liver') || lowerText.includes('digestion') || lowerText.includes('stomach')) searchKeywords.push('liver', 'digestion', 'stomach', 'hepableen');
                if (lowerText.includes('sugar') || lowerText.includes('diabet')) searchKeywords.push('sugar', 'metabolism');

                let bestMatch: any = null;
                let maxScore = 0;

                for (const prod of storeProducts) {
                    let score = 0;
                    // Heavily weight the exact category matching
                    const searchableText = `${prod.name} ${prod.category} ${prod.category} ${prod.category} ${(prod as any).description || (prod as any).shortDesc || ''} ${prod.label} ${prod.features?.map((f: any) => f.title + f.desc).join(' ')}`.toLowerCase();

                    for (const keyword of searchKeywords) {
                        if (searchableText.includes(keyword)) {
                            // Boost score if the keyword exactly matches the product category
                            score += (prod.category?.toLowerCase() === keyword || prod.category?.toLowerCase().includes(keyword)) ? 3 : 1;
                        }
                    }

                    if (score > maxScore) {
                        maxScore = score;
                        bestMatch = prod;
                    }
                }

                if (bestMatch && maxScore > 0) {
                    botResponse = `Based on what you've mentioned, I highly recommend looking into ${bestMatch.name}. It is specifically crafted for this concern.`;
                    productData = {
                        name: bestMatch.name,
                        image: bestMatch.image,
                        link: `/product/${bestMatch.id}`,
                        price: `₹${bestMatch.price}`
                    };
                }
            }

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse, isAction, product: productData }]);
            setIsTyping(false);
            if (!isOpen) setHasUnread(true);
        }, 1200);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(inputValue);
    };

    return (
        <>
            {/* Overlay to cleanly close chatbot on mobile click-away */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Floating Action Button */}
            <button
                type="button"
                onClick={handleToggle}
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center border-2 border-white transition-transform duration-300 hover:scale-105 ${isOpen ? 'rotate-90 scale-0 opacity-0 pointer-events-none' : 'rotate-0 scale-100 opacity-100'}`}
                aria-label="Open Chat"
            >
                <div className="relative">
                    <span className="material-symbols-outlined text-[28px] sm:text-3xl">forum</span>
                    {hasUnread && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
                    )}
                </div>
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100svh-6rem)] sm:h-[600px] sm:max-h-[75vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="bg-secondary p-4 flex items-center justify-between text-slate-900 shrink-0 border-b border-black/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center border border-black/10 shadow-sm">
                            <span className="material-symbols-outlined text-slate-900 text-xl">self_improvement</span>
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg leading-tight text-slate-900">Pantulu</h3>
                            <p className="text-xs text-slate-800 font-medium tracking-wide">Ayurvedic AI Assistant</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors text-slate-900 ring-1 ring-black/5"
                        aria-label="Close Chat"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-background-light/50 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-br-sm'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.text}</p>

                                {msg.product && (
                                    <Link href={msg.product.link} onClick={() => setIsOpen(false)} className="mt-3 block bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-primary transition-colors group">
                                        <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                                            <img src={msg.product.image} alt={msg.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-bold text-slate-800 text-sm leading-tight">{msg.product.name}</h4>
                                            <p className="text-primary font-bold text-xs mt-1">{msg.product.price}</p>
                                        </div>
                                    </Link>
                                )}

                                {msg.isAction && msg.text.includes('consultation') && (
                                    <Link
                                        href="/consultation"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-3 block text-center bg-secondary text-white text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg hover:bg-black transition-colors"
                                    >
                                        Go to Booking
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1.5 items-center">
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    {/* Suggested Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar hide-scrollbar">
                        {SUGGESTED_QUESTIONS.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(q)}
                                className="shrink-0 bg-background-light border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about Ayurveda..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
