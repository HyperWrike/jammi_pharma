"use client";

import React from 'react';
import Link from 'next/link';

export default function TreatmentsPage() {
  const treatments = [
    { name: 'Skin Care', query: 'skin-care' },
    { name: 'Immunity', query: 'immunity' },
    { name: 'Wellness/Lifestyle', query: 'wellness' },
    { name: 'Internal Bleeding', query: 'internal-bleeding' },
    { name: 'Geriatric', query: 'geriatric' },
    { name: 'Pediatric', query: 'pediatric' },
    { name: 'Respiratory', query: 'respiratory' },
    { name: 'Supportive Therapy', query: 'supportive-therapy' },
    { name: 'Migraines', query: 'migraines' },
    { name: 'Kidney', query: 'kidney' },
    { name: 'Digestion', query: 'digestion' },
    { name: 'Women’s Health', query: 'womens-health' },
    { name: 'Pain Management', query: 'pain-management' },
    { name: 'Hepatic (Liver)', query: 'liver' }
  ];

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Breadcrumb & Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B3A] mb-4">Treatments</h1>
          <div className="text-sm font-medium text-gray-500 flex gap-2 items-center mb-8">
            <Link href="/" className="hover:text-[#F3A010] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#F3A010]">Treatments</span>
          </div>
          
          <div className="text-gray-700 leading-relaxed max-w-4xl space-y-6">
            <p className="text-[17px]">
              We are traditional in our approach to treating diseases and healing people. We do not deviate from the original ayurvedic methods of preparations and follow strictly the original texts and age-old ayurvedic formulations that have been handed down to us by our founder, late Dr. Jammi Venkataramanayya. Because of our background in scientific research, our medicines are formulated to suit the modern lifestyle without deviating from the actual principles of Ayurveda.
            </p>
            <p className="text-[17px]">
              Though we are known for over 100 years as specialists in curing liver related problems, we have the expertise in treating diseases from head to toe from Pediatric to Geriatric. We are 100% Ayurvedic with zero side-effects. Over the last 120 years we have cured hundreds of thousands of patients from many debilitating illnesses and restored them to the pink of health. Diseases are a result of physical, mental, emotional, genetic and environmental factors and restoring the balance is a fine art that has been perfected over generations in our clinic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Treatments List */}
          <div>
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1A4B3A]">Treatments at Jammi</h2>
              <a 
                href="https://calendar.app.google/5419JTZTaMw3PBYE6" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#1A4B3A] text-white font-bold px-6 py-2.5 rounded hover:bg-[#F3A010] hover:text-[#1A4B3A] transition-colors text-sm tracking-wide uppercase"
              >
                Book an Appointment
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {treatments.map((t, idx) => (
                <Link 
                  key={idx} 
                  href={`/shop?category=${t.query}`}
                  className="flex items-center gap-3 text-lg font-bold text-[#1A4B3A] hover:text-[#F3A010] transition-colors p-3 hover:bg-white rounded shadow-sm border border-transparent hover:border-gray-100 group"
                >
                  <span className="w-2 h-2 bg-[#F3A010] rounded-full group-hover:scale-150 transition-transform"></span>
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="bg-white p-10 shadow-xl self-start">
            <h2 className="text-xl font-bold text-[#1A4B3A] mb-8 pb-4 border-b border-gray-100">Jammi Pharmaceuticals Pvt. Ltd.</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#F3A010] text-3xl">location_on</span>
                <div>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    “Abhirami” 2B, Old No. 20, New No.14,<br/>
                    Dr.Nair Road, T.Nagar, Chennai - 600 017
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#F3A010] text-3xl">call</span>
                <div>
                  <p className="text-[#1A4B3A] font-bold text-[15px] mb-1">Call</p>
                  <a href="tel:+919043020764" className="block text-gray-600 hover:text-[#F3A010] transition-colors">+91 90 430 20764</a>
                  <a href="tel:+914424991439" className="block text-gray-600 hover:text-[#F3A010] transition-colors">+91 44 2499 1439</a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#F3A010] text-3xl">mail</span>
                <div>
                  <p className="text-[#1A4B3A] font-bold text-[15px] mb-1">Email</p>
                  <a href="mailto:frontdesk@jammi.org" className="block text-gray-600 hover:text-[#F3A010] transition-colors">frontdesk@jammi.org</a>
                  <a href="mailto:info@jammi.org" className="block text-gray-600 hover:text-[#F3A010] transition-colors">info@jammi.org</a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[#1A4B3A] font-bold text-[15px] mb-3">Quicklinks</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Link href="/" className="text-gray-600 hover:text-[#F3A010] transition-colors">Home</Link>
                  <Link href="/legacy" className="text-gray-600 hover:text-[#F3A010] transition-colors">About Us</Link>
                  <Link href="/treatments" className="text-gray-600 hover:text-[#F3A010] transition-colors">Treatments</Link>
                  <Link href="/blog" className="text-gray-600 hover:text-[#F3A010] transition-colors">Blogs</Link>
                  <Link href="/contact" className="text-gray-600 hover:text-[#F3A010] transition-colors">Contact Us</Link>
                  <Link href="/shop" className="text-gray-600 hover:text-[#F3A010] transition-colors">Shop</Link>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a href="https://www.facebook.com/thejammiayurveda/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#F3A010]">Facebook</a>
                <a href="https://www.instagram.com/thejammiayurveda/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#F3A010]">Instagram</a>
                <a href="https://www.linkedin.com/company/jammi-pharmaceuticals" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#F3A010]">LinkedIn</a>
                <a href="https://youtube.com/@voiceofjammi9500" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#F3A010]">YouTube</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
