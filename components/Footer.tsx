
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
    <footer className="bg-[var(--purple)] text-white py-12 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer group select-none" onClick={handleLogoClick}>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[30px] font-black tracking-[0.28em] leading-none text-white">
              JAMMI
            </span>
            <span className="text-[8px] tracking-[0.42em] uppercase text-white/75 mt-1">
              Pharmaceuticals
            </span>
          </div>
        </div>

        {/* Contact Link */}
        <div className="mt-4">
          <Link href="/contact" className="hover:text-[var(--yellow)] transition-colors font-bold tracking-widest uppercase text-sm">
            Contact Us
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 text-white/70 flex flex-col sm:flex-row items-center justify-center gap-4 text-[10px] sm:text-xs tracking-widest uppercase font-bold text-center">
          <p className="cursor-pointer select-none hover:text-[var(--yellow)] transition-colors" onClick={incrementFooterClick}>© 2025 JAMMI PHARMACEUTICALS.</p>
          <p className="normal-case tracking-normal font-normal">
            Developed by <a href="http://www.smartstart.biz" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[var(--yellow)] transition-colors">Smartstart</a>
          </p>
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
