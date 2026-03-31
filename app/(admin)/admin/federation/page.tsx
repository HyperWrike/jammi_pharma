"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

function normalizeId(row: any) {
  return String(row?._id ?? row?.id ?? '');
}

type QueueFilter = 'pending' | 'accepted' | 'rejected' | 'all';

function postDisplayTitle(p: any) {
  const raw = p.content || p.body || '';
  const split = raw.indexOf('\n\n');
  if (p.title) return p.title;
  if (split > 0) return raw.slice(0, split).trim();
  return (raw.split('\n')[0] || '').trim() || raw.slice(0, 72) || 'Post';
}

function postDisplayBody(p: any) {
  const raw = p.content || p.body || '';
  const split = raw.indexOf('\n\n');
  if (p.title) return raw;
  if (split > 0) return raw.slice(split + 2).trim();
  return raw;
}

export default function FederationPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'doctors' | 'partners'>('posts');
  const [queueFilter, setQueueFilter] = useState<QueueFilter>('pending');
  const [posts, setPosts] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const authHeaders = (): HeadersInit => {
    if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
    const token =
      localStorage.getItem('jammi_admin_token') ||
      localStorage.getItem('jammi_bypass_token') ||
      'JAMMI_ADMIN_MASTER_KEY_2024';
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const opts = { headers: authHeaders() };
      const [postRes, partRes, docRes] = await Promise.all([
        fetch('/api/admin/federation/posts', opts),
        fetch('/api/admin/federation/partners', opts),
        fetch('/api/admin/federation/doctors', opts),
      ]);
      const [postJson, partJson, docJson] = await Promise.all([
        postRes.json(),
        partRes.json(),
        docRes.json(),
      ]);

      const rawPosts = postJson.data || [];
      setPosts(
        rawPosts.map((p: any) => ({
          ...p,
          id: normalizeId(p),
        }))
      );

      const rawPartners = partJson.data ?? (Array.isArray(partJson) ? partJson : []);
      setPartners(
        (Array.isArray(rawPartners) ? rawPartners : []).map((p: any) => ({
          ...p,
          id: normalizeId(p),
        }))
      );

      const rawDocs = docJson.data ?? (Array.isArray(docJson) ? docJson : []);
      setDoctors(
        (Array.isArray(rawDocs) ? rawDocs : []).map((d: any) => ({
          ...d,
          id: normalizeId(d),
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setQueueFilter('pending');
  }, [activeTab]);

  const updateStatus = async (
    type: 'posts' | 'partners' | 'doctors',
    id: string,
    status: string
  ) => {
    if (!id) return;
    try {
      const headers = authHeaders();
      if (type === 'doctors') {
        const verified = status === 'approved' || status === 'verified';
        await fetch(`/api/admin/federation/doctors/${id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ verified }),
        });
      } else {
        const path =
          type === 'posts'
            ? `/api/admin/federation/posts/${id}`
            : `/api/admin/federation/partners/${id}`;
        await fetch(path, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ status }),
        });
      }
      await fetchData();
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEntry = async (type: 'posts' | 'partners' | 'doctors', id: string) => {
    if (!id) return;
    if (!window.confirm('Delete this entry permanently?')) return;
    try {
      const headers = authHeaders();
      const path =
        type === 'posts'
          ? `/api/admin/federation/posts/${id}`
          : type === 'partners'
            ? `/api/admin/federation/partners/${id}`
            : `/api/admin/federation/doctors/${id}`;
      const res = await fetch(path, { method: 'DELETE', headers });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || res.statusText);
      }
      await fetchData();
      setSelectedItem(null);
    } catch (e) {
      console.error(e);
      window.alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const filteredPosts = useMemo(() => {
    if (queueFilter === 'all') return posts;
    const want = queueFilter;
    return posts.filter((p) => {
      const s = (p.status || 'pending').toLowerCase();
      if (want === 'pending') return s === 'pending';
      if (want === 'accepted') return s === 'approved';
      if (want === 'rejected') return s === 'rejected';
      return true;
    });
  }, [posts, queueFilter]);

  const filteredPartners = useMemo(() => {
    if (queueFilter === 'all') return partners;
    const want = queueFilter;
    return partners.filter((p) => {
      const s = (p.status || 'pending').toLowerCase();
      if (want === 'pending') return s === 'pending';
      if (want === 'accepted') return s === 'approved';
      if (want === 'rejected') return s === 'rejected';
      return true;
    });
  }, [partners, queueFilter]);

  const filteredDoctors = useMemo(() => {
    if (queueFilter === 'all') return doctors;
    if (queueFilter === 'pending') return doctors.filter((d) => !d.verified);
    if (queueFilter === 'accepted') return doctors.filter((d) => d.verified);
    if (queueFilter === 'rejected') return [];
    return doctors;
  }, [doctors, queueFilter]);

  const partnerName = (p: any) =>
    p?.full_name || p?.partner_name || p?.name || '—';

  const partnerDate = (p: any) => {
    const d = p?.created_at || p?.createdAt;
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return '—';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 font-medium">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight italic">
              Federation Hub
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Moderate discourse, doctor profiles, and partner inquiries
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
          <span className="text-slate-600">Queue:</span>
          {(['pending', 'accepted', 'rejected', 'all'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setQueueFilter(f)}
              className={`px-4 py-2 rounded-lg border transition ${
                queueFilter === f
                  ? 'border-green-500 text-green-400 bg-green-500/10'
                  : 'border-white/10 text-slate-500 hover:border-white/20'
              }`}
            >
              {f === 'pending'
                ? 'Pending'
                : f === 'accepted'
                  ? 'Accepted'
                  : f === 'rejected'
                    ? 'Rejected'
                    : 'All'}
            </button>
          ))}
        </div>

        <div className="flex border-b border-white/5 bg-[#111118] border-white/5 rounded-t-3xl overflow-hidden">
          {(['posts', 'doctors', 'partners'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab
                  ? 'text-green-500 bg-white/[0.02]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab === 'posts'
                ? 'Discourse'
                : tab === 'doctors'
                  ? 'Doctor Profiles'
                  : 'Partner With Us'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 shadow-[0_-4px_15px_rgba(34,197,94,0.6)]" />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center bg-[#111118] border border-white/5 rounded-2xl">
            <div className="w-10 h-10 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
            <div className="mt-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Loading federation data…
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            {activeTab === 'posts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, idx) => (
                    <div
                      key={post.id || `post-${idx}`}
                      className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition flex flex-col group border shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            post.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-500'
                              : post.status === 'approved'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          {post.status}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {new Date(post.created_at || post.timestamp || post.createdAt || 0).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white mb-2 leading-tight uppercase group-hover:text-green-500 transition-colors line-clamp-2">
                        {postDisplayTitle(post)}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-6 leading-relaxed italic pr-2">
                        &quot;
                        {postDisplayBody(post).substring(0, 150)}
                        …&quot;
                      </p>
                      <div className="mt-auto flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedItem({ ...post, type: 'posts' })
                          }
                          className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                        >
                          Review
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteEntry('posts', post.id)}
                          className="py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center text-slate-600 italic">
                    No discourse posts yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc, idx) => (
                    <div
                      key={doc.id || `doc-${idx}`}
                      className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition flex flex-col group border shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            doc.verified
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-amber-500/10 text-amber-500'
                          }`}
                        >
                          {doc.verified ? 'Verified' : 'Pending'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {doc.timestamp
                            ? new Date(doc.timestamp).toLocaleDateString()
                            : '—'}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white mb-2 leading-tight uppercase group-hover:text-green-500 transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-2 italic">{doc.specialty}</p>
                      <p className="text-xs text-slate-500 line-clamp-3 mb-6">{doc.bio}</p>
                      <div className="mt-auto flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedItem({ ...doc, type: 'doctors' })
                          }
                          className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                        >
                          Review
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteEntry('doctors', doc.id)}
                          className="py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center text-slate-600 italic">
                    No doctor applications yet.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'partners' && (
              <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                    <tr>
                      <th className="py-5 px-8">Applicant</th>
                      <th className="py-5 px-4 text-center">Submitted</th>
                      <th className="py-5 px-4 text-center">Status</th>
                      <th className="py-5 px-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                    {filteredPartners.length > 0 ? (
                      filteredPartners.map((partner, idx) => (
                        <tr
                          key={partner.id || `partner-${idx}`}
                          className="hover:bg-white/[0.02] transition"
                        >
                          <td className="py-5 px-8 font-black text-white uppercase tracking-tight">
                            {partnerName(partner)}
                          </td>
                          <td className="py-5 px-4 text-center text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                            {partnerDate(partner)}
                          </td>
                          <td className="py-5 px-4 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-block ${
                                partner.status === 'pending'
                                  ? 'bg-amber-500/10 text-amber-500'
                                  : partner.status === 'approved'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-red-500/10 text-red-500'
                              }`}
                            >
                              {partner.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedItem({ ...partner, type: 'partners' })
                                }
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition border border-white/5"
                              >
                                Manage
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteEntry('partners', partner.id)}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-32 text-center text-slate-600 italic font-medium tracking-tight"
                        >
                          No partner applications yet.
                        </td>
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
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedItem(null)}
              aria-hidden
            />
            <div className="relative w-full max-w-xl bg-gradient-to-br from-[#111118] to-black border border-white/15 rounded-[40px] shadow-3xl p-10 animate-in fade-in zoom-in-95 duration-500 overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">
                {selectedItem.type === 'posts'
                  ? 'Moderate Discourse'
                  : selectedItem.type === 'doctors'
                    ? 'Doctor profile'
                    : 'Partner inquiry'}
              </h2>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-8">
                Review and approve or reject
              </div>

              <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl mb-10 shadow-inner">
                {selectedItem.type === 'posts' && (
                  <>
                    <div className="text-sm font-black text-green-500 uppercase tracking-widest mb-4">
                      Post
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4 leading-tight italic">
                      {postDisplayTitle(selectedItem)}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed italic whitespace-pre-wrap">
                      {postDisplayBody(selectedItem) || 'No content'}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <span className="text-xs text-slate-500">
                        By: {selectedItem.poster_name || selectedItem.author}
                        {selectedItem.poster_designation || selectedItem.specialty
                          ? ` · ${selectedItem.poster_designation || selectedItem.specialty}`
                          : ''}
                      </span>
                    </div>
                  </>
                )}

                {selectedItem.type === 'doctors' && (
                  <>
                    <div className="text-sm font-black text-green-500 uppercase tracking-widest mb-4">
                      Applicant
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{selectedItem.name}</h3>
                    <p className="text-sm text-slate-400 mb-4 italic">{selectedItem.specialty}</p>
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedItem.bio || '—'}
                    </p>
                  </>
                )}

                {selectedItem.type === 'partners' && (
                  <>
                    <div className="text-sm font-black text-green-500 uppercase tracking-widest mb-4">
                      Partner With Us
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight uppercase underline decoration-green-500/30 underline-offset-8">
                      {partnerName(selectedItem)}
                    </h3>
                    <p className="mt-4 text-sm text-slate-400">
                      <span className="text-slate-500 text-[10px] uppercase tracking-widest block mb-1">
                        Organization
                      </span>
                      {selectedItem.organization || '—'}
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      <span className="text-slate-500 text-[10px] uppercase tracking-widest block mb-1">
                        Email
                      </span>
                      {selectedItem.email || '—'}
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      <span className="text-slate-500 text-[10px] uppercase tracking-widest block mb-1">
                        Phone
                      </span>
                      {selectedItem.phone || '—'}
                    </p>
                    <p className="mt-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {selectedItem.message || '—'}
                    </p>
                    <p className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      ID: {String(selectedItem.id).slice(0, 12).toUpperCase()}…
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedItem.type, selectedItem.id, 'rejected')
                  }
                  className="py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-red-500/20 active:scale-95 shadow-lg shadow-red-500/5"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(selectedItem.type, selectedItem.id, 'approved')
                  }
                  className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-green-500/30 active:scale-95 border border-green-400/20"
                >
                  Approve
                </button>
              </div>

              <button
                type="button"
                onClick={() => deleteEntry(selectedItem.type, selectedItem.id)}
                className="mt-4 w-full py-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10"
              >
                Delete permanently
              </button>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 text-slate-600 hover:text-white transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
