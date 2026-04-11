
"use client";
import React, { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useFederationStore } from '../store/federationStore';
import AdminLoginModal from './admin/AdminLoginModal';
import LiveEditable from './admin/LiveEditable';

import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const { incrementFooterClick } = useFederationStore();

  const [adminClicks, setAdminClicks] = useState(0);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'editor' | 'admin'>('admin');
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    // Only allow secret clicks on specific pages
    if (pathname !== '/founders' && pathname !== '/federation') {
      return;
    }

    const newClicks = adminClicks + 1;
    setAdminClicks(newClicks);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    if (newClicks >= 3) {
      if (pathname === '/founders') {
        // Trigger Admin Login Modal for founders page
        setModalRole('admin');
        setIsAdminModalOpen(true);
      } else if (pathname === '/federation') {
        // Trigger Admin Login Modal for editor role
        setModalRole('editor');
        setIsAdminModalOpen(true);
      }
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
            <div className="flex flex-col items-start">
              <span className="text-[30px] font-black tracking-[0.28em] leading-none text-white">
                JAMMI
              </span>
              <span className="text-[8px] tracking-[0.42em] uppercase text-white/75 mt-1">
                Pharmaceuticals
              </span>
            </div>
          </div>
          <blockquote className="italic text-lg leading-relaxed opacity-95">
            {'"'}
            <LiveEditable cmsKey={{ page: 'footer', section: 'brand', content_key: 'quote' }} multiline>
              Medicine is not an experiment. It is a legacy. 128 years of proof that authentic healthcare belongs to the practitioners of India.
            </LiveEditable>
            {'"'}
          </blockquote>
          <div className="flex gap-4 pt-4">
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="https://www.facebook.com/thejammiayurveda/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="text-white group-hover:text-[var(--yellow)] w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="https://www.linkedin.com/company/jammi-pharmaceuticals?originalSubdomain=in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="text-white group-hover:text-[var(--yellow)] w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="https://www.instagram.com/thejammiayurveda/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="text-white group-hover:text-[var(--yellow)] w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors group" href="https://www.youtube.com/@voiceofjammi9500?si=2gfHHW8qN0DMrdTE" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="text-white group-hover:text-[var(--yellow)] w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-6">
          <h5 className="text-white/60 font-bold uppercase tracking-widest text-xs">NAVIGATION</h5>
          <ul className="space-y-4 text-base">
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'home' }}>Home</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/legacy"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'legacy' }}>Legacy</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/founders"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'founders' }}>Founders</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/shop"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'store' }}>Store</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/treatments"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'treatments' }}>Treatments</LiveEditable></Link></li>
            <li><Link className="hover:text-[var(--yellow)] transition-colors" href="/contact"><LiveEditable cmsKey={{ page: 'footer', section: 'links', content_key: 'contact' }}>Contact Us</LiveEditable></Link></li>
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
        <p className="normal-case tracking-normal font-normal">
          Developed by <a href="http://www.smartstart.biz" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[var(--yellow)] transition-colors">Smartstart</a>
        </p>
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
