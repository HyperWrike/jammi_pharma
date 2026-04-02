"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import FloatingCTA from '../../components/FloatingCTA';
import EditorBanner from '../../components/admin/EditorBanner';
import { useAdmin } from '../../components/admin/AdminContext';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { isAdmin, isEditMode } = useAdmin();
    const isLiveEditor = isAdmin && isEditMode;

    return (
        <>
            <EditorBanner />
            <Navbar />
            <main className={`${isLiveEditor ? 'pt-11' : ''} pb-20 md:pb-0`}>{children}</main>
            <Chatbot />
            <FloatingCTA />
            <Footer />
        </>
    );
}
