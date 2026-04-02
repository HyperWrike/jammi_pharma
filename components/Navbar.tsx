"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LiveEditable from './admin/LiveEditable';
import { useCart } from '../hooks/useCart';
import { useAdmin } from './admin/AdminContext';

const NAV_LINKS = [
  { label: 'Legacy', href: '/legacy' },
  { label: 'Founders', href: '/founders' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Federation', href: '/federation' },
];

const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const { isAdmin, isEditMode } = useAdmin();
  const isLiveEditor = isAdmin && isEditMode;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const prevCount = useRef(cartCount);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
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
      <header className={`fixed z-50 w-full bg-[var(--purple)] border-b border-black/10 ${isLiveEditor ? 'top-11' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-10 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex flex-col items-center justify-center group relative"
            onClick={() => setMobileMenuOpen(false)}
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-none text-white">
              <LiveEditable cmsKey={{ page: 'navbar', section: 'brand', content_key: 'name' }}>JAMMI</LiveEditable>
            </h1>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-white/95 mt-0.5">
              <LiveEditable cmsKey={{ page: 'navbar', section: 'brand', content_key: 'subtitle' }}>SINCE 1897</LiveEditable>
            </span>
            <div className="w-full h-0.5 bg-[var(--yellow)] mt-1 transition-transform origin-left scale-x-100 group-hover:scale-x-110" />
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="jammi-navlink inline-flex items-center gap-2">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/consultation"
              className="btn btn-primary hidden lg:flex"
            >
              CONSULT NOW
            </Link>

            <Link
              href="/checkout"
              className="p-2 rounded-full transition-all relative text-white/95 hover:bg-white/10 group"
              aria-label="Cart"
            >
              <span
                className={`material-symbols-outlined text-[28px] transition-transform inline-block ${
                  bouncing ? 'cart-bounce' : 'group-hover:scale-110'
                }`}
              >
                shopping_cart
              </span>
              {mounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[11px] flex justify-center items-center rounded-full font-bold shadow-sm border border-white transition-all">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="p-2 rounded-full transition-colors text-white/95 hover:bg-white/10 hidden sm:block" aria-label="Account">
              <span className="material-symbols-outlined text-[28px]">account_circle</span>
            </button>

            <button
              className="lg:hidden p-2 rounded-full transition-colors text-white/95 hover:bg-white/10"
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
              href="/consultation"
              className="flex justify-center w-full bg-[var(--yellow)] text-[var(--purple)] px-6 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:brightness-95 transition-colors shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONSULT EXPERT VAIDYAS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
