"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LiveEditable from './admin/LiveEditable';
import { useCart } from '../hooks/useCart';

const NAV_DROPDOWNS = [
  {
    label: 'Wellness',
    items: [
      'Immunity',
      'Fatty Liver',
      'Digestion',
      'IBS',
      'Pre-Diabetes',
      'Obesity',
      'Aches & Pains',
      'Heart Health',
      'Kidney/Gall Bladder Stones',
      'Male & Female Sexual Wellness',
      'Stress',
      'Thyroid Related',
    ],
  },
  {
    label: 'Skin and Hair Care',
    items: ['Acne/Pimples', 'Skin Complexion', 'Lip and Oral Care', 'Skin Dullness', 'Hair Fall', 'Dandruff'],
  },
  {
    label: 'Therapeutics/Cures',
    items: [
      'Liver Diseases',
      'Prostate Disorders',
      'Viral Fevers',
      'Asthma/Wheezing',
      'Anaemia – Ayurin',
      'Coughs and Colds',
      'Weakened Immunity',
      'Gynaecological Health',
      'Gut-health Disorders',
      'Psoriasis/Eczema',
      'Diabetes',
    ],
  },
];

const Navbar: React.FC = () => {
  const { cartCount } = useCart();

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

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[var(--purple)] border-b border-black/10">
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
            {NAV_DROPDOWNS.map((dd) => (
              <div
                key={dd.label}
                data-jammi-navroot="true"
                className="relative"
                onMouseEnter={() => setOpenDropdown(dd.label)}
                onMouseLeave={() => setOpenDropdown((prev) => (prev === dd.label ? null : prev))}
              >
                <button
                  type="button"
                  className="jammi-navlink inline-flex items-center gap-2"
                  aria-haspopup="menu"
                  aria-expanded={openDropdown === dd.label}
                  onFocus={() => setOpenDropdown(dd.label)}
                >
                  {dd.label} <span aria-hidden className="text-[12px]">▾</span>
                </button>

                <div
                  role="menu"
                  aria-label={`${dd.label} menu`}
                  className={`absolute left-0 top-[68px] min-w-[320px] transform transition-all origin-top ${
                    openDropdown === dd.label ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                  } jammi-dropdown-menu p-3`}
                >
                  {dd.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      role="menuitem"
                      className="jammi-dropdown-item block hover:bg-[var(--yellow)]"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/consultation"
              className="hidden lg:flex bg-[var(--yellow)] text-[var(--purple)] px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:brightness-95 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
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
            {NAV_DROPDOWNS.map((dd) => (
              <div key={dd.label} className="space-y-3">
                <div className="text-[17px] font-bold text-[var(--purple)] uppercase">{dd.label}</div>
                <div className="flex flex-col gap-2">
                  {dd.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="jammi-dropdown-item block w-fit bg-transparent hover:bg-[var(--yellow)] transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  ))}
                </div>
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
