"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../hooks/useCart';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    products?: Array<{
        id?: string;
        name: string;
        image: string;
        link: string;
        price: string;
        reason?: string;
    }>;
}

const SUGGESTED_QUESTIONS = [
    "I have a skin issue",
    "What is LiverCure?",
    "Book Consultation",
    "Products for hair fall?"
];

export default function Chatbot() {
    const pathname = usePathname();
    const { cartCount, cartItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome-1',
            sender: 'bot',
            text: 'Namaste. I am Pantulu, your Ayurvedic AI guide. How can I assist you with Jammi Pharmaceuticals today?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);
    const [cartAssistShown, setCartAssistShown] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    useEffect(() => {
        const shouldSuggest = (pathname === '/checkout' || pathname?.startsWith('/checkout/')) && cartCount > 0;
        if (!shouldSuggest || cartAssistShown) return;

        const suggestBundles = async () => {
            try {
                const res = await fetch('/api/bundles');
                const json = await res.json();
                const bundles = Array.isArray(json?.data) ? json.data : [];

                const cartProductIds = new Set(
                    (cartItems || []).map((item: any) => String(item.product_id || item.id || ''))
                );

                const prioritizedBundles = bundles
                    .map((bundle: any) => {
                        const bundleProductIds = (bundle.bundle_products || []).map((bp: any) => String(bp?.product_id || ''));
                        const overlapCount = bundleProductIds.filter((id: string) => cartProductIds.has(id)).length;
                        return { bundle, overlapCount };
                    })
                    .sort((a: any, b: any) => {
                        if (b.overlapCount !== a.overlapCount) return b.overlapCount - a.overlapCount;
                        const aDiscount = Number(a.bundle?.extra_discount_percent || 0);
                        const bDiscount = Number(b.bundle?.extra_discount_percent || 0);
                        return bDiscount - aDiscount;
                    })
                    .map((x: any) => x.bundle)
                    .slice(0, 2);

                const recommendations = prioritizedBundles.map((b: any) => {
                    const overlapProduct = b.bundle_products?.find((bp: any) => cartProductIds.has(String(bp?.product_id || '')))?.products;
                    const firstProduct = overlapProduct || b.bundle_products?.find((bp: any) => bp?.products)?.products;
                    const link = firstProduct?.slug
                        ? `/product/${firstProduct.slug}`
                        : firstProduct?._id
                            ? `/product/${firstProduct._id}`
                            : '/shop';

                    return {
                        id: b._id,
                        name: b.name || 'Jammi Bundle Offer',
                        image: b.image_url || firstProduct?.images?.[0] || '/images/placeholder.png',
                        link,
                        price: b.extra_discount_percent ? `${b.extra_discount_percent}% extra off` : 'Special offer',
                        reason: overlapProduct
                            ? 'Matched with items already in your cart for better value.'
                            : 'Recommended bundle offer for better savings.',
                    };
                });

                setMessages(prev => [
                    ...prev,
                    {
                        id: `cart-assist-${Date.now()}`,
                        sender: 'bot',
                        text: 'Great choice. Before checkout, consider these bundle offers to save more.',
                        products: recommendations,
                    }
                ]);
            } catch {
                setMessages(prev => [
                    ...prev,
                    {
                        id: `cart-assist-${Date.now()}`,
                        sender: 'bot',
                        text: 'Great choice. Before checkout, check our latest bundle offers in the shop for extra savings.',
                        products: [{
                            name: 'Explore Bundle Offers',
                            image: '/images/placeholder.png',
                            link: '/shop',
                            price: 'Special offers',
                            reason: 'Bundle and offer options available in the shop.',
                        }],
                    }
                ]);
            } finally {
                setCartAssistShown(true);
                setHasUnread(true);
            }
        };

        suggestBundles();
    }, [pathname, cartCount, cartItems, cartAssistShown]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setHasUnread(false);
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const history = messages
                .slice(-8)
                .map((m) => ({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    text: m.text,
                }));

            const res = await fetch('/api/chat/pantulu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history })
            });

            const data = await res.json();
            const botResponse = data?.reply || 'Pantulu is unable to respond at the moment.';
            const productData = Array.isArray(data?.recommendations) ? data.recommendations.slice(0, 3) : undefined;

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: botResponse,
                products: productData
            }]);
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: 'Pantulu could not reach the recommendation service right now. Please try again.'
            }]);
        } finally {
            setIsTyping(false);
            if (!isOpen) setHasUnread(true);
        }
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
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--yellow)] text-[var(--purple)] shadow-2xl flex items-center justify-center border-2 border-white transition-transform duration-300 hover:scale-105 ${isOpen ? 'rotate-90 scale-0 opacity-0 pointer-events-none' : 'rotate-0 scale-100 opacity-100'}`}
                aria-label="Open Chat"
            >
                <div className="relative">
                    <span className="material-symbols-outlined text-[28px] sm:text-3xl">forum</span>
                    {hasUnread && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[var(--yellow)] animate-pulse"></span>
                    )}
                </div>
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[calc(100svh-6rem)] sm:h-[600px] sm:max-h-[75vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'}`}
            >
                {/* Header */}
                <div className="bg-[var(--yellow)] p-4 flex items-center justify-between text-[var(--purple)] shrink-0 border-b border-black/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center border border-black/10 shadow-sm">
                            <span className="material-symbols-outlined text-[var(--purple)] text-xl">self_improvement</span>
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg leading-tight text-[var(--purple)]">Pantulu</h3>
                            <p className="text-xs text-[var(--purple)] font-medium tracking-wide opacity-80">Ayurvedic AI Assistant</p>
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

                                {msg.products?.map((product, idx) => (
                                    <Link
                                        key={`${msg.id}-${idx}`}
                                        href={product.link}
                                        onClick={() => setIsOpen(false)}
                                        className="mt-3 block bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-primary transition-colors group"
                                    >
                                        <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-bold text-slate-800 text-sm leading-tight">{product.name}</h4>
                                            <p className="text-primary font-bold text-xs mt-1">{product.price}</p>
                                            {product.reason && <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{product.reason}</p>}
                                        </div>
                                    </Link>
                                ))}
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
