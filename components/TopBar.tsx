'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function TopBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-brand-purple text-brand-yellow px-4 py-2 flex items-center justify-center relative z-[100]">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium tracking-wide">Jammi Pharmaceuticals - Shop Now</span>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
            >
                <span className="material-symbols-outlined text-sm">close</span>
            </button>
        </div>
    );
}
