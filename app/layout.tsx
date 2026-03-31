import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

import { AdminProvider } from '../components/admin/AdminContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../components/Toast';
import EditModeToggle from '../components/admin/EditModeToggle';
import JammiToast from '../components/ui/JammiToast';

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
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&family=Cormorant+SC:wght@300;400;500;600;700&family=Playfair+Display:wght@400..900&family=EB+Garamond:wght@400..800&family=Cinzel:wght@400..900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning className="font-sans antialiased min-h-screen flex flex-col bg-background-light text-[#1a150f]">
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
            </body>
        </html>
    );
}
