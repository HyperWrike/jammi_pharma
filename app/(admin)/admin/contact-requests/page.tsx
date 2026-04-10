"use client";

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import toast from 'react-hot-toast';

export default function ContactRequestsPage() {
  const requests = useQuery((api as any).contact?.getContactRequests) || undefined;
  const updateStatus = useMutation((api as any).contact?.updateContactRequestStatus);
  const [filter, setFilter] = useState('all');

  if (requests === undefined) {
    return (
      <div className="p-8 pb-32 animate-pulse">
        <div className="h-10 bg-[#22c55e]/10 w-64 rounded-xl mb-8"></div>
        <div className="space-y-4">
          <div className="h-24 bg-[#1e293b]/50 rounded-2xl w-full"></div>
          <div className="h-24 bg-[#1e293b]/50 rounded-2xl w-full"></div>
        </div>
      </div>
    );
  }

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const handleStatusChange = async (targetId: any, newStatus: string) => {
    try {
      await updateStatus({ id: targetId, status: newStatus });
      toast.success(`Marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Contact Requests
          </h1>
          <p className="text-[#94a3b8] mt-2 text-sm max-w-2xl">
            Manage inquiries submitted by users through the Contact Us page.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {['all', 'new', 'read', 'replied'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === s 
                  ? 'bg-[#22c55e] text-[#0a0a0f] shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'bg-[#1e293b] text-white hover:bg-[#334155]'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredRequests.length === 0 ? (
          <div className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-[#94a3b8]/30 mb-4 block">mail</span>
            <h3 className="text-xl font-bold text-white mb-2">No Requests Found</h3>
            <p className="text-[#94a3b8]">You've caught up on all contact requests!</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req._id} className="bg-[#111118] border border-[#22c55e]/10 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6">
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{req.first_name} {req.last_name}</h3>
                    <p className="text-[#94a3b8] text-sm mt-1">{new Date(req.created_at || '').toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    req.status === 'new' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    req.status === 'read' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-[#1e293b] px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#22c55e] text-[18px]">mail</span>
                    <a href={`mailto:${req.email}`} className="text-white hover:text-[#22c55e] transition-colors">{req.email}</a>
                  </div>
                  <div className="bg-[#1e293b] px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#22c55e] text-[18px]">call</span>
                    <a href={`tel:${req.phone}`} className="text-white hover:text-[#22c55e] transition-colors">{req.phone}</a>
                  </div>
                </div>

                <div className="bg-[#0a0a0f] p-4 rounded-xl border border-white/5">
                  <p className="text-[#f1f5f9] whitespace-pre-wrap leading-relaxed">{req.message}</p>
                </div>
              </div>

              <div className="w-full md:w-48 flex flex-col gap-3 justify-center md:border-l md:border-white/10 md:pl-6">
                <p className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider mb-1 text-center md:text-left">Change Status</p>
                {['new', 'read', 'replied'].map((s) => (
                  <button
                    key={s}
                    disabled={req.status === s}
                    onClick={() => handleStatusChange(req._id, s)}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-bold uppercase tracking-wider transition-all border ${
                      req.status === s 
                        ? 'opacity-50 cursor-not-allowed border-transparent bg-white/5 text-[#94a3b8]'
                        : 'border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e] hover:text-[#0a0a0f]'
                    }`}
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
