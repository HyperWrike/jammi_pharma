"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('jammi_admin_token') || localStorage.getItem('jammi_bypass_token') || 'JAMMI_ADMIN_MASTER_KEY_2024';
    return { Authorization: `Bearer ${token}` };
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?status=${statusFilter}`, {
        headers: getAuthHeaders()
      });
      const json = await res.json();
      setReviews((json.data || []).map((r: any) => ({ ...r, id: r._id || r.id })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({ status: newStatus })
      });
      fetchReviews();
      setSelectedReview(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Product Reviews</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Moderate customer feedback and ratings</p>
          </div>
          <div className="flex bg-[#111118] border border-white/5 rounded-xl p-1">
             {['all', 'pending', 'approved', 'rejected'].map(s => (
                <button 
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    statusFilter === s ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s}
                </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-medium">
           {loading ? (
              Array(6).fill(0).map((_, i) => (
                 <div key={i} className="bg-[#111118] border border-white/5 rounded-3xl p-6 animate-pulse h-56"></div>
              ))
           ) : reviews.length > 0 ? reviews.map((review, idx) => (
              <div key={review.id || `${review.reviewer_name || 'review'}-${idx}`} className="bg-[#111118] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.02] transition flex flex-col group">
                 <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                       {Array(5).fill(0).map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-700'}`}>star</span>
                       ))}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                       review.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                       review.status === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                       {review.status}
                    </span>
                 </div>

                 <p className="text-sm text-slate-300 italic mb-4 line-clamp-3 leading-relaxed">"{review.review_text}"</p>
                 
                 <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                       <div className="text-xs font-bold text-white uppercase tracking-tight">{review.reviewer_name}</div>
                       <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest truncate max-w-[120px]">{review.products?.name}</div>
                    </div>
                    <button 
                      onClick={() => setSelectedReview(review)}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/5 transition"
                    >
                       <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                 </div>
              </div>
           )) : (
              <div className="col-span-full py-32 text-center text-slate-600 italic">No reviews found in this category.</div>
           )}
        </div>

        {selectedReview && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedReview(null)} />
             <div className="relative w-full max-w-lg bg-[#111118] border border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 p-2 border border-white/5 overflow-hidden">
                      <img src={selectedReview.products?.images?.[0] || '/placeholder.png'} className="w-full h-full object-cover rounded-lg" />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-white leading-tight uppercase truncate max-w-[200px]">{selectedReview.products?.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                         {Array(5).fill(0).map((_, i) => (
                            <span key={i} className={`material-symbols-outlined text-xs ${i < selectedReview.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-700'}`}>star</span>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/5 rounded-2xl mb-8">
                   <p className="text-slate-300 text-sm leading-relaxed italic italic">"{selectedReview.review_text}"</p>
                   <div className="mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">— {selectedReview.reviewer_name}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => updateStatus(selectedReview.id, 'rejected')}
                     className="py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-black uppercase tracking-widest transition border border-red-500/10"
                   >
                      Reject Review
                   </button>
                   <button 
                     onClick={() => updateStatus(selectedReview.id, 'approved')}
                     className="py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition shadow-lg shadow-green-500/20"
                   >
                      Approve Review
                   </button>
                </div>
             </div>
           </div>
        )}
      </div>
    </AdminLayout>
  );
}
