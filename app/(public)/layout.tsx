import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import FloatingCTA from '../../components/FloatingCTA';
import EditorBanner from '../../components/admin/EditorBanner';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <EditorBanner />
            <Navbar />
            {children}
            <Chatbot />
            <FloatingCTA />
            <Footer />
        </>
    );
}
