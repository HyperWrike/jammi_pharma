
"use client";
import React, { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFederationStore } from '../store/federationStore';
import AdminLoginModal from './admin/AdminLoginModal';
import LiveEditable from './admin/LiveEditable';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const { incrementFooterClick } = useFederationStore();

  const [adminClicks, setAdminClicks] = useState(0);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'editor' | 'admin'>('admin');
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    // SYSTEM ONE: CMS Login via Federation (3 taps)
    // SYSTEM TWO: Admin Panel via Founders (3 taps)
    // Other pages (e.g. Home) can stay at 5 or be disabled as per user's earlier logic, 
    // but the spec specifically highlights Federation and Founders.
    
    const threshold = (pathname === '/federation' || pathname === '/founders') ? 3 : (pathname === '/' ? 5 : null);
    
    // Also allow product pages to trigger CMS editor (matching existing behavior but restricted to 3 taps)
    const isProductPage = pathname?.startsWith('/product/');
    const finalThreshold = isProductPage ? 3 : threshold;

    if (finalThreshold === null) return;

    const newClicks = adminClicks + 1;
    setAdminClicks(newClicks);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newClicks >= finalThreshold) {
      // Determine mode: CMS Content Editor for Federation and Products, Admin Panel for Founders
      const mode = (pathname === '/founders') ? 'admin' : 'editor';
      setModalRole(mode);
      setIsAdminModalOpen(true);
      setAdminClicks(0);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        setAdminClicks(0);
      }, 2000);
    }
  };

  return (
    <footer className="bg-[var(--purple)] text-white py-16 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

        {/* Column 1: Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 cursor-pointer group select-none" onClick={handleLogoClick}>
            <h4 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--yellow)]">JAMMI</h4>
          </div>
          <blockquote className="italic text-lg leading-relaxed opacity-95">
            "<LiveEditable cmsKey={{ page: 'footer', section: 'brand', content_key: 'quote' }} multiline>Medicine is not an experiment. It is a legacy. 128 years of proof that authentic healthcare belongs to the practitioners of India.</LiveEditable>"
          </blockquote>
          <div className="flex gap-4 pt-4">
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="#" aria-label="Facebook">
              <span className="font-bold text-white group-hover:text-[var(--yellow)]">f</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="#" aria-label="Instagram">
              <span className="font-bold text-white group-hover:text-[var(--yellow)]">in</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="#" aria-label="LinkedIn">
              <span className="font-bold text-white group-hover:text-[var(--yellow)]">li</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="#" aria-label="YouTube">
              <span className="font-bold text-white group-hover:text-[var(--yellow)]">yt</span>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-6">
          <h5 className="text-white/60 font-bold uppercase tracking-widest text-xs">NAVIGATION</h5>
          <ul className="space-y-4 text-base">
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/heritage"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'heritage' }}>Heritage</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/founders"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'founders' }}>Founders</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/shop"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'pharmacy' }}>Pharmacy</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/partners"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'partner' }}>Partner With Us (NEW)</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/federation"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'federation' }}>Federation</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/journal"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'journal' }}>Journal</LiveEditable></Link></li>
          </ul>
        </div>

        {/* Column 3: The Fortress */}
        <div className="space-y-6">
          <h5 className="text-white/60 font-bold uppercase tracking-widest text-xs">THE FORTRESS</h5>
          <div className="space-y-2">
            <p className="font-bold leading-relaxed">
              <LiveEditable cmsKey={{ page: 'footer', section: 'fortress', content_key: 'address' }} multiline>ABHIRAMI 2B, DR. NAIR ROAD,<br />
              T. NAGAR, CHENNAI - 600 017</LiveEditable>
            </p>
            <p className="pt-2 hover:text-[var(--yellow)] transition-colors cursor-pointer"><LiveEditable cmsKey={{ page: 'footer', section: 'fortress', content_key: 'phone' }}>+91 90430 20764</LiveEditable></p>
            <p className="hover:text-[var(--yellow)] transition-colors cursor-pointer"><LiveEditable cmsKey={{ page: 'footer', section: 'fortress', content_key: 'email' }}>frontdesk@jammi.org</LiveEditable></p>
          </div>
        </div>

      </div>

      {/* Prominent legacy line */}
      <div className="mt-12 text-center max-w-6xl mx-auto px-6">
        <div className="text-[22px] sm:text-[26px] font-black text-[var(--yellow)] tracking-tight">
          Legacy of 127+ years. Trusted since 1897.
        </div>
        <div className="mx-auto mt-3 w-[260px] h-[3px] bg-[var(--yellow)] rounded-full" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-white/70 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs tracking-widest uppercase font-bold">
        <p className="cursor-pointer select-none hover:text-[var(--yellow)] transition-colors" onClick={incrementFooterClick}>© 2025 JAMMI PHARMACEUTICALS. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a className="hover:text-[var(--yellow)] transition-colors" href="#">Quality Protocols</a>
          <span className="hidden sm:inline">|</span>
          <a className="hover:text-[var(--yellow)] transition-colors" href="#">Legal Charter</a>
          <span className="hidden sm:inline">|</span>
          <a className="hover:text-[var(--yellow)] transition-colors" href="#">Wholesale Policy</a>
        </div>
      </div>
      <AdminLoginModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
        roleToGrant={modalRole}
      />
    </footer>
  );
};

export default Footer;
