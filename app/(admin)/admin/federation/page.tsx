"use client";

import React, { useState, useEffect } from 'react';

export default function FederationPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postRes, partRes] = await Promise.all([
        fetch('/api/admin/federation/posts'),
        fetch('/api/admin/federation/partners')
      ]);
      const [postData, partData] = await Promise.all([postRes.json(), partRes.json()]);
      setPosts(postData || []);
      setPartners(partData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (type: 'posts' | 'partners', id: string, status: string) => {
    try {
      await fetch(`/api/admin/federation/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
      <div className="space-y-6 font-medium">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight italic italic">Federation Hub</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 uppercase">Moderate community presence and partnership initiatives</p>
          </div>
        </div>

        <div className="flex border-b border-white/5 bg-[#111118] border-white/5 rounded-t-3xl overflow-hidden">
           {['posts', 'partners'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-green-500 bg-white/[0.02]' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab === 'posts' ? 'Community Feed' : 'Partner Inquiries'}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 shadow-[0_-4px_15px_rgba(34,197,94,0.6)]" />}
              </button>
           ))}
        </div>

        {loading ? (
           <div className="py-40 flex flex-col items-center justify-center bg-[#111118] border border-white/5 rounded-2xl">
              <div className="w-10 h-10 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
              <div className="mt-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Hydrating Federation Data...</div>
           </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
             {activeTab === 'posts' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {posts.length > 0 ? posts.map(post => (
                      <div key={post.id} className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition flex flex-col group border shadow-xl">
                         <div className="flex items-center justify-between mb-4">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               post.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                               post.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                               {post.status}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                         </div>
                         <h3 className="text-xl font-black text-white mb-2 leading-tight uppercase group-hover:text-green-500 transition-colors line-clamp-2">{post.title}</h3>
                         <p className="text-xs text-slate-400 line-clamp-3 mb-6 leading-relaxed italic pr-2">"{post.body.substring(0, 150)}..."</p>
                         <button 
                           onClick={() => setSelectedItem({ ...post, type: 'posts' })}
                           className="mt-auto py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                         >
                            Review Post
                         </button>
                      </div>
                   )) : (
                      <div className="col-span-full py-32 text-center text-slate-600 italic">No community posts detected.</div>
                   )}
                </div>
             ) : (
                <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                         <tr>
                            <th className="py-5 px-8">Potential Partner</th>
                            <th className="py-5 px-4 text-center">Inquiry Date</th>
                            <th className="py-5 px-4 text-center">Current Status</th>
                            <th className="py-5 px-8 text-right">Administrative Actions</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-white/5">
                         {partners.length > 0 ? partners.map(partner => (
                            <tr key={partner.id} className="hover:bg-white/[0.02] transition">
                               <td className="py-5 px-8 font-black text-white uppercase tracking-tight">{partner.partner_name}</td>
                               <td className="py-5 px-4 text-center text-slate-400 font-bold text-[10px] uppercase tracking-widest">{new Date(partner.created_at).toLocaleDateString()}</td>
                               <td className="py-5 px-4 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-block ${
                                     partner.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                                     partner.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                  }`}>
                                     {partner.status}
                                  </span>
                               </td>
                               <td className="py-5 px-8 text-right">
                                  <button 
                                    onClick={() => setSelectedItem({ ...partner, type: 'partners' })}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                                  >
                                     Manage
                                  </button>
                               </td>
                            </tr>
                         )) : (
                            <tr>
                               <td colSpan={4} className="py-32 text-center text-slate-600 italic font-medium tracking-tight">Zero partnership requests on file.</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>
             )}
          </div>
        )}

        {selectedItem && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedItem(null)} />
             <div className="relative w-full max-w-xl bg-gradient-to-br from-[#111118] to-black border border-white/15 rounded-[40px] shadow-3xl p-10 animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
                
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic italic italic italic">
                   {selectedItem.type === 'posts' ? 'Moderate Community Voice' : 'Establish Partnership'}
                </h2>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-8">Verification Workflow Beta v1.2</div>
                
                <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl mb-10 shadow-inner">
                   {selectedItem.type === 'posts' ? (
                      <>
                         <div className="text-sm font-black text-green-500 uppercase tracking-widest mb-4">Post Content</div>
                         <h3 className="text-lg font-bold text-white mb-4 leading-tight italic">{selectedItem.title}</h3>
                         <p className="text-slate-400 text-sm leading-relaxed italic italic">"{selectedItem.body}"</p>
                      </>
                   ) : (
                      <>
                         <div className="text-sm font-black text-green-500 uppercase tracking-widest mb-4">Partner Prospect</div>
                         <h3 className="text-xl font-black text-white leading-tight uppercase underline decoration-green-500/30 underline-offset-8">{selectedItem.partner_name}</h3>
                         <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">Application ID: {selectedItem.id.substring(0, 12).toUpperCase()}</p>
                      </>
                   )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => updateStatus(selectedItem.type, selectedItem.id, 'rejected')}
                     className="py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-red-500/20 active:scale-95 shadow-lg shadow-red-500/5"
                   >
                      Reject Entry
                   </button>
                   <button 
                     onClick={() => updateStatus(selectedItem.type, selectedItem.id, 'approved')}
                     className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-green-500/30 active:scale-95 border border-green-400/20"
                   >
                      Approve Entry
                   </button>
                </div>
                
                <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 p-2 text-slate-600 hover:text-white transition-colors">
                   <span className="material-symbols-outlined">close</span>
                </button>
             </div>
           </div>
        )}
      </div>
    
  );
}
