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
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isSubmittingJoin, setIsSubmittingJoin] = useState(false);
  const [joinVisitCount, setJoinVisitCount] = useState(1);
  const [joinForm, setJoinForm] = useState({
    name: '',
    occupation: '',
    specialty: '',
    email: '',
    phone: '',
    bio: '',
    consentMarketing: false,
    allowCookies: false,
  });
  const [joinPdf, setJoinPdf] = useState<File | null>(null);

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

  React.useEffect(() => {
    try {
      const key = 'jammi_doctor_join_visits';
      const previous = Number(localStorage.getItem(key) || 0);
      const next = previous + 1;
      localStorage.setItem(key, String(next));
      setJoinVisitCount(next);
    } catch {
      setJoinVisitCount(1);
    }
  }, []);

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinForm.name || !joinForm.specialty || !joinForm.email || !joinForm.phone) {
      alert('Please fill all required fields.');
      return;
    }

    if (!joinPdf) {
      alert('Please upload your PDF credentials.');
      return;
    }

    setIsSubmittingJoin(true);
    try {
      const formData = new FormData();
      formData.append('name', joinForm.name);
      formData.append('occupation', joinForm.occupation);
      formData.append('specialty', joinForm.specialty);
      formData.append('email', joinForm.email);
      formData.append('phone', joinForm.phone);
      formData.append('bio', joinForm.bio);
      formData.append('consentMarketing', String(joinForm.consentMarketing));
      formData.append('allowCookies', String(joinForm.allowCookies));
      formData.append('sourcePage', '/doctors');
      formData.append('visitCount', String(joinVisitCount));
      formData.append('resume', joinPdf);

      const res = await fetch('/api/doctor-application', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.error || 'Failed to submit doctor application');
      }

      alert('Application submitted successfully. Our team will review and contact you.');
      setIsJoinOpen(false);
      setJoinForm({
        name: '',
        occupation: '',
        specialty: '',
        email: '',
        phone: '',
        bio: '',
        consentMarketing: false,
        allowCookies: false,
      });
      setJoinPdf(null);
    } catch (err: any) {
      alert(err?.message || 'Failed to submit application');
    } finally {
      setIsSubmittingJoin(false);
    }
  };

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
              <button
                onClick={() => setIsJoinOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
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

      {isJoinOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-forest">Join as a Doctor</h3>
              <button onClick={() => setIsJoinOpen(false)} className="w-10 h-10 rounded-full hover:bg-slate-100">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border border-slate-300 rounded-lg px-4 py-3" placeholder="Name *" value={joinForm.name} onChange={(e) => setJoinForm((p) => ({ ...p, name: e.target.value }))} />
              <input className="border border-slate-300 rounded-lg px-4 py-3" placeholder="Occupation" value={joinForm.occupation} onChange={(e) => setJoinForm((p) => ({ ...p, occupation: e.target.value }))} />
              <input className="border border-slate-300 rounded-lg px-4 py-3" placeholder="Specialty *" value={joinForm.specialty} onChange={(e) => setJoinForm((p) => ({ ...p, specialty: e.target.value }))} />
              <input type="email" className="border border-slate-300 rounded-lg px-4 py-3" placeholder="Email *" value={joinForm.email} onChange={(e) => setJoinForm((p) => ({ ...p, email: e.target.value }))} />
              <input className="border border-slate-300 rounded-lg px-4 py-3 md:col-span-2" placeholder="Phone Number *" value={joinForm.phone} onChange={(e) => setJoinForm((p) => ({ ...p, phone: e.target.value }))} />
              <textarea className="border border-slate-300 rounded-lg px-4 py-3 md:col-span-2 min-h-[90px]" placeholder="Brief profile / notes" value={joinForm.bio} onChange={(e) => setJoinForm((p) => ({ ...p, bio: e.target.value }))} />

              <div className="md:col-span-2 border-2 border-dashed border-primary/40 rounded-xl p-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Credentials PDF *</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setJoinPdf(e.target.files?.[0] || null)}
                  className="w-full"
                />
                {joinPdf && <p className="text-xs text-slate-500 mt-2">Selected: {joinPdf.name}</p>}
              </div>

              <label className="md:col-span-2 flex items-start gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={joinForm.consentMarketing} onChange={(e) => setJoinForm((p) => ({ ...p, consentMarketing: e.target.checked }))} className="mt-1" />
                <span>I consent to receive emails and promotional communication.</span>
              </label>
              <label className="md:col-span-2 flex items-start gap-3 text-sm text-slate-700">
                <input type="checkbox" checked={joinForm.allowCookies} onChange={(e) => setJoinForm((p) => ({ ...p, allowCookies: e.target.checked }))} className="mt-1" />
                <span>I allow cookies for application tracking and experience improvements.</span>
              </label>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsJoinOpen(false)} className="px-5 py-3 rounded-lg border border-slate-300 font-semibold">Cancel</button>
                <button type="submit" disabled={isSubmittingJoin} className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:brightness-95 disabled:opacity-50">
                  {isSubmittingJoin ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorHub;
