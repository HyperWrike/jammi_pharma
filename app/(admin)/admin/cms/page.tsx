"use client";

import React, { useState, useEffect } from 'react';

const CMS_TABS = [
  { id: 'pages', label: 'Pages Content', icon: 'article' },
  { id: 'banners', label: 'Hero Banners', icon: 'view_carousel' },
  { id: 'blogs', label: 'Journal / Blogs', icon: 'edit_note' },
  { id: 'announcements', label: 'Announcements', icon: 'campaign' }
];

const PAGES_LIST = [
  'home', 'shop', 'federation', 'founders', 'legacy', 'consultation', 'partners'
];

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState('pages');
  const [selectedPage, setSelectedPage] = useState('home');
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPageContent = async (page: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/cms/content?page=${page}`);
      const data = await res.json();
      setContent(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'pages') {
      fetchPageContent(selectedPage);
    }
  }, [activeTab, selectedPage]);

  return (
    
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Content Management</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Control your brand voice and imagery</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 gap-8 overflow-x-auto custom-scrollbar no-scrollbar">
          {CMS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-xs font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-green-500' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                {tab.label}
              </div>
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 shadow-[0_-4px_10px_rgba(34,197,94,0.5)]" />}
            </button>
          ))}
        </div>

        {activeTab === 'pages' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
             {/* Page Selector */}
             <div className="flex flex-wrap gap-2">
                {PAGES_LIST.map(p => (
                   <button 
                     key={p} 
                     onClick={() => setSelectedPage(p)}
                     className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                       selectedPage === p ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                     }`}
                   >
                     {p}
                   </button>
                ))}
             </div>

             <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full text-left">
                   <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <tr>
                         <th className="py-4 px-6">Section / Key</th>
                         <th className="py-4 px-4 w-1/2">Content Preview</th>
                         <th className="py-4 px-4">Type</th>
                         <th className="py-4 px-4 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-white/5 font-medium">
                      {loading ? (
                         <tr>
                            <td colSpan={4} className="py-20 text-center">
                               <div className="w-8 h-8 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto" />
                               <div className="mt-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">Hydrating strings...</div>
                            </td>
                         </tr>
                      ) : content.length > 0 ? content.map((item) => (
                         <tr key={item.id} className="hover:bg-white/[0.02] transition group">
                            <td className="py-4 px-6">
                               <div className="text-[10px] text-green-500 font-bold uppercase tracking-tight">{item.section}</div>
                               <div className="font-bold text-slate-200 mt-0.5">{item.content_key}</div>
                            </td>
                            <td className="py-4 px-4">
                               {item.content_type === 'image' ? (
                                  <div className="w-20 h-12 rounded-lg bg-white/5 border border-white/5 overflow-hidden">
                                     <img src={item.content_value} alt="" className="w-full h-full object-cover" />
                                  </div>
                               ) : (
                                  <div className="text-slate-400 line-clamp-2 italic text-xs max-w-md">"{item.content_value}"</div>
                               )}
                            </td>
                            <td className="py-4 px-4">
                               <span className="px-2 py-1 bg-white/5 rounded text-[9px] font-black uppercase tracking-widest text-slate-500">{item.content_type || 'text'}</span>
                            </td>
                            <td className="py-4 px-4 text-right">
                               <button className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-green-500 transition">Edit Entry</button>
                            </td>
                         </tr>
                      )) : (
                         <tr>
                            <td colSpan={4} className="py-20 text-center text-slate-500 italic">No strings found. Use live editor on site to populate.</td>
                         </tr>
                      )}
                   </tbody>
                </table>
             </div>
             
             <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl flex items-center gap-4">
                <span className="material-symbols-outlined text-green-500 text-3xl">lightbulb</span>
                <div>
                   <div className="text-sm font-bold text-white mb-0.5">Pro Tip: Use the Live Site Content Editor!</div>
                   <p className="text-xs text-slate-400">Navigate to the public page and click the Jammi Logo in the footer 3 times to unlock on-page editing. It's much faster than this dashboard!</p>
                </div>
             </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'pages' && (
           <div className="py-32 text-center text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-3 opacity-20">construction</span>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Section Under Construction</div>
           </div>
        )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    
  );
}
