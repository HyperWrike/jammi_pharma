"use client";

import React, { useState } from 'react';
import { MOCK_DOCTORS } from '../constants';
import LiveEditable from '../components/admin/LiveEditable';
import EditorImage from '../components/EditorImage';
import { useAdmin } from '../components/admin/AdminContext';
import { useCMSContent } from '../hooks/useCMSContent';
import { updateDocument } from '../lib/adminDb';
import { cmsApi } from '../lib/adminApi';

const DoctorHub: React.FC = () => {
  const { content, loading } = useCMSContent('doctor_hub');
  const { isEditMode, isAdmin } = useAdmin();
  const editorActive = isEditMode && isAdmin;

  // CMS Helper
  const CMS = ({ section = 'general', field, fallback, multiline, inputType }: any) => (
    <LiveEditable 
        cmsKey={{ page: 'doctor_hub', section, content_key: field }}
        multiline={multiline}
        inputType={inputType}
    >
        {content?.[section]?.[field] || fallback}
    </LiveEditable>
  );

  const CMSImage = ({ section = 'general', field, fallback, className }: any) => (
    <EditorImage
        src={content?.[section]?.[field] || fallback}
        alt={field}
        className={className}
        bucket="cms-images"
        folder="doctor-hub"
        editorActive={editorActive}
        onUpdate={async (url) => {
            try {
                await cmsApi.saveContent([{
                    page: 'doctor_hub',
                    section,
                    content_key: field,
                    content_value: url
                }]);
            } catch (err) {
                console.error("Failed to save image URL to CMS:", err);
            }
        }}
    />
  );
  return (
    <div className="max-w-[1280px] mx-auto w-full px-6 lg:px-10 py-10 mt-10">
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-xl shadow-sm border border-cream-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex flex-col gap-8 flex-1 justify-center z-10">
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold tracking-widest uppercase text-xs">
                <CMS section="hero" field="heroBadge" fallback="Ayurvedic Practitioner Network" />
              </span>
              <h1 className="text-forest text-4xl lg:text-6xl font-serif leading-tight">
                <CMS section="hero" field="heroTitle" multiline fallback={<>Learn from <br/><span className="text-primary">Ayurvedic Experts</span></>} />
              </h1>
              <p className="text-forest/60 text-lg max-w-[500px]">
                <CMS section="hero" field="heroDesc" multiline fallback="Join a thriving network of professionals dedicated to the ancient science of life. Share knowledge, research, and heritage." />
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20">
                <CMS section="hero" field="btnJoin" fallback="Join the Community" />
              </button>
              <button className="border border-primary text-primary font-bold py-3 px-8 rounded-xl hover:bg-primary/5 transition-all">
                <CMS section="hero" field="btnResearch" fallback="View Research Papers" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-[420px] shrink-0">
             <div className="relative w-full aspect-square bg-center bg-cover rounded-xl shadow-2xl overflow-hidden">
                <CMSImage 
                  section="hero"
                  field="heroImage" 
                  fallback="https://lh3.googleusercontent.com/aida-public/AB6AXuBVUd6Q4aMIeFpwyw2V44uy_ELANqNZOlB3jqigU6c4pPHKnGEw4EtoQ9cGje6pa6W4P73DPNwSks8u_EEKOKqs0RyAJ-nEaeQsrkxgQT2Kirr3a90T3JAOE9BSG2cigah1G4XMZKdTK8d6wx-99uExjljYp-vu6q_iA4duALdNfHcfnm0-WZYMOotHMHkOEM3D23bvRoqoUEz_8fXvkFZbAQCGZa89I02oHyTmvvtqfKpwBW4Ape0ThuNzTUZUPo-TqfjeknX-srU"
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-72 shrink-0">
          <div className="sticky top-28 space-y-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-serif">
              <span className="material-symbols-outlined text-primary">category</span>
              <CMS section="sidebar" field="knowledgeHubTitle" fallback="Knowledge Hub" />
            </h3>
            <ul className="space-y-2">
              {['Immunity', 'Skin & Hair Care', 'Digestive Health', 'Pediatrics'].map(hub => (
                <li key={hub}><a className="flex items-center justify-between p-3 rounded-lg hover:bg-white transition-all text-forest/60" href="#">{hub} <span className="material-symbols-outlined text-sm">chevron_right</span></a></li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 space-y-12">
          <section>
            <h2 className="text-2xl font-bold serif mb-8">
              <CMS section="experts" field="expertsTitle" fallback="Verified Experts" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_DOCTORS.map(doc => (
                <div key={doc.id} className="bg-white p-6 rounded-xl border border-cream-dark text-center flex flex-col items-center group hover:shadow-md transition-all">
                  <div className="relative mb-4">
                    <img src={doc.avatar} className="size-24 rounded-full border-4 border-white shadow-sm group-hover:scale-105 transition-transform" />
                    <div className="absolute bottom-0 right-0 bg-[#2D5A27] text-white size-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      <span className="material-symbols-outlined text-xs">verified</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{doc.name}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mt-1">{doc.specialty}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorHub;
