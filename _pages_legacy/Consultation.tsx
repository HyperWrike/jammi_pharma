"use client";

import React, { useState, useEffect } from 'react';
import LiveEditable from '../components/admin/LiveEditable';
import { useCMSContent } from '../hooks/useCMSContent';

const Consultation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState('General Wellness');
  const [mode, setMode] = useState<'online' | 'offline'>('online');
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [selectedTime, setSelectedTime] = useState<string | null>('10:30 AM');

  const { content, loading } = useCMSContent('consultation');

  const specialties = ['General Wellness', 'Skin & Hair', 'Women\'s Health', 'Digestive Care', 'Joint & Muscle'];
  const dates = [12, 13, 14, 15, 16, 17, 18];
  const times = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'];

  const diffFeatures = [
    { icon: 'history_edu', title: '128-Year Clinical Heritage', desc: 'Formulas and protocols validated by time.', field: 'f1' },
    { icon: 'vital_signs', title: 'Nadi Pariksha (Pulse Diagnosis)', desc: 'Root-cause analysis for offline visits.', field: 'f2' },
    { icon: 'spa', title: 'Holistic Care Plans', desc: 'Diet, lifestyle, and therapeutic botanicals.', field: 'f3' }
  ];

  if (loading) return <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">Loading consultation...</div>;

  const CMS = ({ section, field, fallback, inputType = 'text', multiline = false, className = '' }: any) => (
    <LiveEditable cmsKey={{ page: 'consultation', section, content_key: field }} inputType={inputType} multiline={multiline} className={`inline-block ${className}`}>
        {content?.[section]?.[field] || fallback}
    </LiveEditable>
  );

  const CMSImage = ({ section, field, fallback, className = '' }: any) => (
    <LiveEditable cmsKey={{ page: 'consultation', section, content_key: field }} inputType="image" className={`absolute inset-0 w-full h-full object-cover ${className}`}>
        {content?.[section]?.[field] || fallback}
    </LiveEditable>
  );

  return (
    <div className="bg-background-light min-h-screen pt-24 pb-12 font-body">
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            <CMS section="hero" field="tagline" fallback="Vaidya Consultation" />
          </span>
          <h1 className="text-5xl font-extrabold text-secondary font-display mb-6">
            <CMS section="hero" field="title" fallback="Expert Ayurvedic Counsel" />
          </h1>
          <p className="text-lg text-slate-500">
            <CMS section="hero" field="description" multiline fallback="Experience personalized care from our master practitioners. With a legacy spanning 128 years, we blend traditional diagnosis with modern convenience." />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left info panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="w-full aspect-[4/3] rounded-3xl shadow-lg border border-primary/10 relative overflow-hidden group">
              <CMSImage section="hero" field="image_url" fallback="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop" />
              <div className="absolute inset-0 bg-secondary/20 mix-blend-multiply group-hover:bg-secondary/10 transition-colors duration-500 pointer-events-none"></div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-secondary mb-6 font-display">
                <CMS section="features" field="diffTitle" fallback="The Jammi Difference" />
              </h3>
              <ul className="space-y-6">
                {diffFeatures.map((item, i) => (
                  <li key={item.field} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-2xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-secondary">
                        <CMS section="features" field={`${item.field}Title`} fallback={item.title} />
                      </h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        <CMS section="features" field={`${item.field}Desc`} multiline fallback={item.desc} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking flow */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
              <h2 className="text-3xl font-bold text-secondary mb-10 flex items-center gap-3 font-display">
                <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
                <CMS section="booking" field="formTitle" fallback="Request Appointment" />
              </h2>

              {/* Booking Info Card (Brand Spec) */}
              <div className="bg-[var(--yellow)] text-[var(--purple)] rounded-2xl p-6 border border-[var(--purple)]/10 mb-10">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[34px] leading-none mt-0.5">
                    schedule
                  </span>
                  <div>
                    <div className="text-[14px] font-bold uppercase tracking-widest opacity-95">Available</div>
                    <div className="text-[18px] font-black leading-tight">1:20 PM – 6:00 PM</div>
                  </div>
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <div className="text-[14px] font-bold uppercase tracking-widest opacity-95">Consultation Fee</div>
                  <div className="text-[28px] font-black leading-none">₹200</div>
                </div>
              </div>

              {/* Consultation Mode Toggle */}
              <section className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  <CMS section="booking" field="modeLabel" fallback="Select Mode" />
                </h3>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl relative">
                  <button
                    onClick={() => setMode('online')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all z-10 ${mode === 'online' ? 'bg-white text-secondary shadow-md' : 'text-slate-500 hover:text-secondary'}`}
                  >
                    <span className="material-symbols-outlined text-lg">videocam</span> 
                    <CMS section="booking" field="modeOnline" fallback="Video Consult" />
                  </button>
                  <button
                    onClick={() => setMode('offline')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all z-10 ${mode === 'offline' ? 'bg-white text-secondary shadow-md' : 'text-slate-500 hover:text-secondary'}`}
                  >
                    <span className="material-symbols-outlined text-lg">storefront</span>
                    <CMS section="booking" field="modeOffline" fallback="Clinic Visit (Chennai)" />
                  </button>
                </div>
              </section>

              {/* Specialty Selection */}
              <section className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  <CMS section="booking" field="focusLabel" fallback="Health Focus" />
                </h3>
                <div className="flex flex-wrap gap-3">
                  {specialties.map(s => (
                    <button
                      key={s}
                      onClick={() => setSpecialty(s)}
                      className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${specialty === s ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              {/* Date & Time Selection */}
              <section className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  <CMS section="booking" field="dateTimeLabel" fallback="Date & Time" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Calendar Widget */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <button className="p-1 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                      <span className="font-bold text-secondary">
                        <CMS section="booking" field="monthLabel" fallback="November 2025" />
                      </span>
                      <button className="p-1 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="text-xs font-bold text-slate-400">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      <div className="h-10"></div><div className="h-10"></div>
                      {dates.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`h-10 w-full flex items-center justify-center rounded-xl text-sm font-bold transition-all ${selectedDate === d ? 'bg-secondary text-white shadow-md' : 'text-slate-700 hover:bg-slate-200'}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots Widget */}
                  <div className="flex flex-col">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex-1">
                      <h4 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">schedule</span> 
                        <CMS section="booking" field="slotsLabel" fallback="Available Slots" />
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {times.map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`py-3 text-sm font-bold rounded-xl border-2 transition-all ${selectedTime === t ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Action Bar */}
              <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">
                    <CMS section="booking" field="feeLabel" fallback="Consultation Fee" />
                  </p>
                  <p className="text-3xl font-black text-secondary tracking-tight">₹200</p>
                </div>
                <button className="w-full md:w-auto min-w-[240px] bg-secondary hover:bg-black text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                  <CMS section="booking" field="confirmBtn" fallback="Confirm Booking" />
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consultation;
