import type { Metadata } from 'next';
import React from 'react';
import { Plus_Jakarta_Sans, Cormorant_SC, Playfair_Display, EB_Garamond, Cinzel, DM_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
});

const cormorantSC = Cormorant_SC({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-cormorant',
});

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
});

const ebGaramond = EB_Garamond({
    subsets: ['latin'],
    variable: '--font-garamond',
});

const cinzel = Cinzel({
    subsets: ['latin'],
    variable: '--font-cinzel',
});

const dmMono = DM_Mono({
    weight: ['400', '500'],
    subsets: ['latin'],
    variable: '--font-dm-mono',
});

import { AdminProvider } from '../components/admin/AdminContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/Toast';
import EditModeToggle from '../components/admin/EditModeToggle';
import JammiToast from '../components/ui/JammiToast';
import { ConvexClientProvider } from '../components/ConvexClientProvider';

export const metadata: Metadata = {
    title: 'Jammi Pharmaceuticals',
    description: '127-year-old Ayurvedic pharmaceutical company blending traditional Indian medicine with modern molecular science',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning className={`${plusJakarta.variable} ${cormorantSC.variable} ${playfairDisplay.variable} ${ebGaramond.variable} ${cinzel.variable} ${dmMono.variable} font-sans antialiased min-h-screen flex flex-col bg-background-light text-[#1a150f]`}>
                <ConvexClientProvider>
                    <JammiToast />
                    <ToastProvider>
                        <CartProvider>
                            <AdminProvider>
                                <main className="flex-grow">
                                    {children}
                                </main>
                                <EditModeToggle />
                            </AdminProvider>
                        </CartProvider>
                    </ToastProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
