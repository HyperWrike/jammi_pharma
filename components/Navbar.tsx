"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LiveEditable from './admin/LiveEditable';
import { useCart } from '../hooks/useCart';
import { useAdmin } from './admin/AdminContext';

const CALENDAR_URL = 'https://calendar.app.google/5419JTZTaMw3PBYE6';

const NAV_LINKS = [
  { label: 'Legacy', href: '/legacy' },
  { label: 'Founders', href: '/founders' },
  { label: 'Store', href: '/shop' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Insights', href: '/journal' },
  { label: 'Federation', href: '/federation' },
  { label: 'Contact Us', href: '/contact' },
];

const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const { isAdmin, isEditMode } = useAdmin();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [bouncing, setBouncing] = useState(false);
  const prevCount = useRef(cartCount);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const offlinePhoneNumber = '+91 90430 20764';

  const openConsultModal = () => {
    setIsConsultModalOpen(true);
  };

  const closeConsultModal = () => {
    setIsConsultModalOpen(false);
  };

  const handleOnlineConsult = () => {
    window.open(CALENDAR_URL, '_blank', 'noopener,noreferrer');
    closeConsultModal();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const syncWishlistCount = () => {
      try {
        const raw = localStorage.getItem('jammi_wishlist');
        const parsed = raw ? JSON.parse(raw) : [];
        setWishlistCount(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setWishlistCount(0);
      }
    };

    syncWishlistCount();
    window.addEventListener('storage', syncWishlistCount);
    window.addEventListener('focus', syncWishlistCount);
    return () => {
      window.removeEventListener('storage', syncWishlistCount);
      window.removeEventListener('focus', syncWishlistCount);
    };
  }, []);

  useEffect(() => {
    if (mounted && cartCount > prevCount.current) {
      setBouncing(true);
      const t = setTimeout(() => setBouncing(false), 500);
      return () => clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount, mounted]);

  useEffect(() => {
    if (!openDropdown) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-jammi-navroot="true"]')) return;
      setOpenDropdown(null);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full bg-[var(--purple)] border-b border-black/10 transition-[top] duration-200"
        style={isAdmin && isEditMode ? { top: 'var(--jammi-editor-banner-height, 0px)' } : undefined}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo - Left */}
          <Link
            href="/"
            className="flex flex-col flex-shrink-0 mr-2 lg:mr-8 xl:mr-16 group relative items-start justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="inline-flex items-center justify-center rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
              <img
                src="/images/Finalized Logo.png"
                alt="Jammi Pharmaceuticals"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </span>
          </Link>

          {/* Navigation - Center/Stretch */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-4 xl:gap-8" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="jammi-navlink whitespace-nowrap inline-flex items-center gap-2 flex-shrink-0 text-[13px] xl:text-[14px]">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center justify-end flex-shrink-0 gap-2 sm:gap-3 lg:gap-4 ml-auto">
            <button
              type="button"
              onClick={openConsultModal}
              className="hidden lg:flex justify-center items-center h-[38px] px-6 rounded-full font-bold text-xs xl:text-sm tracking-widest uppercase bg-[var(--yellow)] text-[var(--purple)] hover:brightness-95 transition-colors whitespace-nowrap"
            >
              CONSULT NOW
            </button>

            <Link
              href="/account/orders"
              className="hidden lg:inline-flex items-center h-[38px] rounded-full border border-white/20 bg-white/10 px-5 text-xs xl:text-sm font-bold text-white transition-colors hover:bg-white/15 whitespace-nowrap"
            >
              My Orders
            </Link>

            <Link
              href="/shop"
              className="p-1 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full transition-all relative text-white/95 hover:bg-white/10 group"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[25px] transition-transform inline-block group-hover:scale-110">favorite</span>
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-[11px] flex justify-center items-center rounded-full font-bold shadow-sm border border-white transition-all">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/checkout"
              className="p-1 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full transition-all relative text-white/95 hover:bg-white/10 group"
              aria-label="Cart"
            >
              <span
                className={`material-symbols-outlined text-[26px] transition-transform inline-block ${
                  bouncing ? 'cart-bounce' : 'group-hover:scale-110'
                }`}
              >
                shopping_cart
              </span>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[11px] flex justify-center items-center rounded-full font-bold shadow-sm border border-white transition-all">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-1 min-w-[38px] min-h-[38px] flex items-center justify-center rounded-full transition-colors text-white/95 hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[28px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart bounce keyframe */}
      <style>{`
        @keyframes cartBounce {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.35); }
          70%  { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .cart-bounce { animation: cartBounce 0.45s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-300 transform ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col h-full pt-28 pb-10 px-6 max-w-5xl mx-auto">
          <div className="text-[13px] font-bold tracking-widest text-[var(--purple)] mb-6 uppercase">Menu</div>

          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((l) => (
              <div key={l.label} className="space-y-3">
                <Link
                  href={l.href}
                  className="text-[17px] font-bold text-[var(--purple)] uppercase hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <Link
              href="/shop"
              className="flex justify-center w-full border-2 border-[var(--purple)] text-[var(--purple)] px-6 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[var(--purple)] hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              WISHLIST
            </Link>

            <Link
              href="/account/orders"
              className="flex justify-center w-full border-2 border-[var(--purple)] text-[var(--purple)] px-6 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[var(--purple)] hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              MY ORDERS
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultModal();
              }}
              className="flex justify-center w-full bg-[var(--yellow)] text-[var(--purple)] px-6 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:brightness-95 transition-colors shadow-lg"
            >
              CONSULT EXPERT VAIDYAS
            </button>
          </div>
        </div>
      </div>

      {isConsultModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label="Choose consultation mode">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl font-black text-[var(--purple)] tracking-tight">Choose Consultation Mode</h3>
              <p className="text-sm text-slate-600 mt-2">Select online booking or contact us directly for an offline consultation.</p>
            </div>

            <div className="p-6 space-y-4">
              <button
                type="button"
                onClick={handleOnlineConsult}
                className="w-full rounded-xl bg-[var(--purple)] text-white py-3.5 font-bold tracking-wide hover:brightness-95 transition-colors"
              >
                Online Consultation
              </button>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Offline Consultation</p>
                <p className="text-base font-bold text-slate-800 mt-1">Contact this number: {offlinePhoneNumber}</p>
                <a
                  href="tel:+919043020764"
                  className="inline-flex mt-3 rounded-lg border border-[var(--purple)] text-[var(--purple)] px-4 py-2 font-bold text-sm hover:bg-[var(--purple)] hover:text-white transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={closeConsultModal}
                className="w-full rounded-xl border border-slate-300 text-slate-700 py-3 font-semibold hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
