import React from 'react';
import Hero from '../../../components/federation/Hero';
import Mandate from '../../../components/federation/Mandate';
import TrustedBy from '../../../components/federation/TrustedBy';
import Benefits from '../../../components/federation/Benefits';
import Forum from '../../../components/federation/Forum';
import Partner from '../../../components/federation/Partner';
import ClosingQuote from '../../../components/federation/ClosingQuote';
import AdminBar from '../../../components/federation/AdminBar';
import SanctumModal from '../../../components/federation/SanctumModal';

export default function FederationPage() {
    return (
        <main className="w-full bg-[#FAF8F2] overflow-hidden">
            <AdminBar />
            <SanctumModal />
            <Hero />
            <Mandate />
            <TrustedBy />
            <Benefits />
            <Forum />
            <Partner />
            <ClosingQuote />
        </main>
    );
}
