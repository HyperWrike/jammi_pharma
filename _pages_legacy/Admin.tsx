"use client";

import React, { useState, useEffect } from 'react';
import { useFederationStore } from '../store/federationStore';
import clsx from 'clsx';

type AdminView = 
  | 'ecommerce-dashboard' | 'ecommerce-inventory' | 'ecommerce-categories' | 'ecommerce-orders' | 'ecommerce-customers'
  | 'federation-posts' | 'federation-doctors' 
  | 'partnership-requests'
  | 'addProduct-1' | 'addProduct-2' | 'addProduct-3';

const Admin: React.FC = () => {
  const { 
    posts, approvePost, rejectPost, 
    doctorProfiles, verifyDoctor, 
    partnerRequests, verifyPartner,
    customers,
    products: storeProducts, addProduct, updateProduct, deleteProduct,
    isAdminLoggedIn 
  } = useFederationStore();

  const [view, setView] = useState<AdminView>('ecommerce-dashboard');
  const [expandedSection, setExpandedSection] = useState<'ecommerce' | 'federation' | 'partnership'>('ecommerce');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [newProductCategory, setNewProductCategory] = useState<string>('');

  const categories = Array.from(new Set(storeProducts.map(p => p.category)));

  const navItems = [
    {
      id: 'ecommerce',
      label: 'Ecommerce',
      icon: 'shopping_cart',
      subItems: [
        { id: 'ecommerce-dashboard', label: 'Dashboard', icon: 'dashboard' },
        { id: 'ecommerce-categories', label: 'Product Categories', icon: 'category' },
        { id: 'ecommerce-orders', label: 'Orders', icon: 'receipt_long' },
        { id: 'ecommerce-customers', label: 'Customers', icon: 'group' },
      ]
    },
    {
      id: 'federation',
      label: 'Federation Community',
      icon: 'group',
      subItems: [
        { id: 'federation-posts', label: 'Post Moderation', icon: 'rate_review' },
        { id: 'federation-doctors', label: 'Doctor Profiles', icon: 'person_add' },
      ]
    },
    {
      id: 'partnership',
      label: 'Partnership',
      icon: 'handshake',
      subItems: [
        { id: 'partnership-requests', label: 'Partner Requests', icon: 'contact_mail' },
      ]
    }
  ];

  const renderSidebar = () => (
    <aside className="w-72 bg-[#1A1A18] flex flex-col shrink-0 text-white fixed h-full z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
          <span className="material-symbols-outlined text-white font-bold">medical_services</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-sm font-bold leading-tight">Jammi Pharma</h1>
          <p className="text-[#9c8649] text-[10px] uppercase tracking-widest font-semibold">Admin Panel</p>
        </div>
      </div>
      <div className="px-4 py-6 border-b border-white/5 space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 px-2">Select System</p>
        <div className="flex bg-[#0D0907] p-1.5 rounded-2xl gap-1">
          {[
            { id: 'ecommerce', icon: 'shopping_bag', label: 'Store' },
            { id: 'federation', icon: 'hub', label: 'Community' },
            { id: 'partnership', icon: 'handshake', label: 'Partners' }
          ].map((sys) => (
            <button
              key={sys.id}
              onClick={() => {
                setExpandedSection(sys.id as any);
                const firstSubItem = navItems.find(s => s.id === sys.id)?.subItems[0].id as AdminView;
                setView(firstSubItem);
              }}
              title={sys.label}
              className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all gap-1 ${expandedSection === sys.id ? 'bg-primary text-[#1A1A18] font-bold shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined text-lg">{sys.icon}</span>
              <span className="text-[8px] uppercase font-black tracking-widest">{sys.label}</span>
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <div className="space-y-6">
          {navItems.filter(s => s.id === expandedSection).map((section) => (
            <div key={section.id} className="space-y-4">
              <div className="px-3 flex items-center justify-between group">
                 <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">{section.label} Options</p>
                 <div className="h-px bg-white/10 flex-1 ml-4"></div>
              </div>
              <div className="space-y-1">
                {section.subItems.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setView(item.id as AdminView)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${view === item.id ? 'bg-white/10 text-white font-bold ring-1 ring-white/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <span className={`material-symbols-outlined text-[20px] ${view === item.id ? 'text-primary' : 'text-gray-500'}`}>{item.icon}</span>
                    <p className="text-sm tracking-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 bg-[#0D0907]/50 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 p-3">
          <div className="size-10 rounded-xl bg-cover bg-center border border-white/10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGeb8UZcjdtSm_9wGKab0wTNuadguL8XkKSvfilD4WSYfrO_bxu_78mvdSi4EWVQMszfSeGSF3poUYqrZ_vhxbYMy4OMRajcFfOjPIfK5pPc115K28TXJYcYK2XMD_5qvWUzD_TYmlq-1zw9tE8HFvot5UYmruAhHK_hDgwEh61Injj_BzKJ1yw6EyFlLKP-MFwjO5W2GozRC-1rP7MU6UVCU9hhHb25S5Vd3hzKEQJXZZ2hNK1w_c2Cx4AUn03JMKM04rJWBmpq0')"}}></div>
          <div className="flex-1 overflow-hidden">
            <p className="text-white text-xs font-bold truncate">Alex Jammi</p>
            <p className="text-gray-500 text-[10px] font-medium tracking-wide">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );

  const renderDashboard = () => (
    <div className="flex-1 flex flex-col min-h-screen bg-background-light">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h2 className="serif text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center gap-4">
          <button className="size-10 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"><span className="material-symbols-outlined">notifications</span></button>
          <button className="size-10 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"><span className="material-symbols-outlined">settings</span></button>
        </div>
      </header>
      <main className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Orders Today', val: '128', trend: '+12%', up: true },
            { label: 'Revenue', val: '₹1,24,500', trend: '-5%', up: false },
            { label: 'New Doctors', val: '12', trend: '+8%', up: true },
            { label: 'Active Articles', val: '45', trend: '+2%', up: true }
          ].map(kpi => (
            <div key={kpi.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
              <p className="text-gray-500 text-sm font-medium">{kpi.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-dark-ink text-3xl font-bold">{kpi.val}</p>
                <span className={`${kpi.up ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'} text-xs font-bold px-2 py-1 rounded-full flex items-center gap-0.5`}>
                  <span className="material-symbols-outlined text-[14px]">{kpi.up ? 'trending_up' : 'trending_down'}</span> {kpi.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-dark-ink font-bold text-lg mb-6">7-Day Revenue</h3>
            <div className="h-64 w-full bg-background-light/30 rounded-lg flex items-center justify-center relative">
              <svg className="w-full h-full p-4" viewBox="0 0 400 100">
                <path d="M0 80 Q 50 20, 100 70 T 200 40 T 300 80 T 400 30" fill="none" stroke="#d58a30" strokeWidth="3" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <h3 className="text-dark-ink font-bold text-lg">Order Status</h3>
            <div className="flex-1 flex items-center justify-center relative">
              <div className="size-44 rounded-full border-[16px] border-gray-100 relative">
                <div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-r-transparent rotate-45"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold leading-none">542</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Total</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-primary"></span><p className="text-xs font-semibold">Shipped</p></div>
              <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-amber-500"></span><p className="text-xs font-semibold">Delivered</p></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );


  const renderCategories = () => {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background-light">
        <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex flex-col gap-1">
             <h2 className="serif text-2xl font-bold text-secondary">Product Categories</h2>
             <p className="text-xs text-slate-400 font-medium">Manage and organize your pharmaceutical catalog.</p>
          </div>
          <button 
            onClick={() => {
              setNewProductCategory('');
              setView('addProduct-1');
            }}
            className="bg-primary text-[#1A1A18] px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-105 transition-all"
          >
            Create New Category
          </button>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => {
              const categoryProducts = storeProducts.filter(p => p.category === cat);
              return (
                <div key={cat} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group flex flex-col gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <span className="material-symbols-outlined text-8xl font-black">category</span>
                  </div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="size-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-black text-xl">
                      {idx + 1}
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => deleteProduct(cat)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors" title="Delete Category (Logic placeholder)">
                         <span className="material-symbols-outlined">delete</span>
                       </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-display font-black text-secondary group-hover:text-primary transition-colors">{cat}</h3>
                    <p className="text-slate-500 text-sm font-medium">{categoryProducts.length} Products in this group</p>
                  </div>

                  {/* Enhanced: Product List Preview */}
                  <div className="space-y-3 relative z-10 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {categoryProducts.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group/item hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                           <div className="size-8 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center">
                              {p.image ? (
                                <img src={p.image} alt={p.name} className="size-full object-cover" />
                              ) : (
                                <span className="material-symbols-outlined text-slate-300 text-sm">image</span>
                              )}
                           </div>
                           <div className="flex flex-col">
                             <span className="text-xs font-bold text-secondary line-clamp-1">{p.name}</span>
                             <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">{p.sku}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={clsx(
                             "size-2 rounded-full",
                             p.status === 'In Stock' ? 'bg-green-500' : p.status === 'Low Stock' ? 'bg-amber-500' : 'bg-red-500'
                           )}></span>
                           <button className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-primary transition-all">
                             <span className="material-symbols-outlined text-[16px]">edit</span>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
 
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                    <button 
                      onClick={() => {
                        setNewProductCategory(cat);
                        setView('addProduct-1');
                      }}
                      className="flex-1 py-3 bg-primary text-[#1A1A18] font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      Add Product
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </main>
      </div>
    );
  };

  const renderModeration = () => {
    const pendingPosts = posts.filter(p => p.status === 'pending');
    
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background-light">
        <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h2 className="serif text-2xl font-bold">Federation Council</h2>
          <div className="flex items-center gap-4">
            <div className="px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100 flex items-center gap-2">
              <span className="size-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">{pendingPosts.length} PENDING DISCOURES</span>
            </div>
          </div>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 gap-6">
            {pendingPosts.length > 0 ? (
              pendingPosts.map(post => (
                <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{post.category}</span>
                        <h3 className="serif text-2xl font-bold text-secondary">{post.title}</h3>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{post.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {post.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-secondary">{post.author}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{post.specialty}</p>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3 italic">"{post.content}"</p>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                      <button 
                        onClick={() => rejectPost(post.id)}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
                      >
                        REJECT
                      </button>
                      <button 
                        onClick={() => approvePost(post.id)}
                        className="px-8 py-2.5 rounded-xl bg-primary text-[#1A1A18] font-bold text-sm hover:brightness-105 shadow-lg shadow-primary/20 transition-all"
                      >
                        APPROVE DISCOURSE
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="size-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-3xl text-slate-300">task_alt</span>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-1">Queue Clear</h3>
                <p className="text-slate-400 text-sm">All community discourses have been peer-reviewed.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  const renderDoctorProfiles = () => {
    const pendingDoctors = doctorProfiles.filter(d => !d.verified);
    const verifiedDoctors = doctorProfiles.filter(d => d.verified);

    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background-light">
        <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h2 className="serif text-2xl font-bold">Doctor Credentials</h2>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full space-y-12">
          {/* Pending Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-secondary uppercase tracking-widest">Awaiting Verification</h3>
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full">{pendingDoctors.length}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingDoctors.map(doc => (
                <div key={doc.id} className="bg-white p-6 rounded-2xl border border-primary/30 shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                        {doc.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-secondary leading-tight">{doc.name}</h4>
                        <p className="text-xs text-primary font-bold uppercase tracking-wider">{doc.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 italic">"{doc.bio}"</p>
                  <button 
                    onClick={() => verifyDoctor(doc.id)}
                    className="w-full py-3 bg-primary text-[#1A1A18] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-105 transition-all"
                  >
                    Verify Credentials
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Verified Section */}
          <section className="space-y-6">
            <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Active Practitioners</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {verifiedDoctors.map(doc => (
                <div key={doc.id} className="bg-white/60 p-5 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                    {doc.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary truncate">{doc.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.specialty}</p>
                  </div>
                  <span className="material-symbols-outlined text-green-500 text-sm ml-auto">verified</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  };

  const renderPartners = () => {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background-light">
        <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h2 className="serif text-2xl font-bold">Partnership Inquiries</h2>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Clinic/Practice</th>
                  <th className="px-8 py-5">Representative</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {partnerRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <p className="font-bold text-secondary">{req.clinicName}</p>
                      <p className="text-xs text-slate-400">{req.email}</p>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium">{req.name}</td>
                    <td className="px-8 py-5 text-sm text-slate-500">{req.location}</td>
                    <td className="px-8 py-5">
                      <span className={clsx(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        req.status === 'verified' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      )}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      {req.status === 'pending' && (
                        <button 
                          onClick={() => verifyPartner(req.id)}
                          className="px-4 py-1.5 border border-primary text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  };

  const renderCustomers = () => {
    const mockCustomers = [
      { id: 'customer-1', name: 'Srinivasan R.', email: 'srini@example.com', orders: 12, spent: '₹14,500' },
      { id: 'customer-2', name: 'Ananya Iyer', email: 'ananya@example.com', orders: 5, spent: '₹8,400' },
      { id: 'customer-3', name: 'Rahul Krishnan', email: 'rahul@example.com', orders: 2, spent: '₹3,200' },
    ];

    return (
      <div className="flex-1 flex flex-col min-h-screen bg-background-light">
        <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h2 className="serif text-2xl font-bold">Customer Loyalty</h2>
        </header>

        <main className="p-10 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Customer ID</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Contact</th>
                  <th className="px-8 py-5">Orders</th>
                  <th className="px-8 py-5 text-right">Lifetime Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {customers.length > 0 ? (
                  customers.map((cust, index) => (
                    <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <span className="font-mono text-xs font-bold bg-slate-100 px-3 py-1 rounded-md text-slate-600">
                          {cust.customerId || `customer-${index + 1}`}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-secondary">{cust.name || 'Anonymous'}</td>
                      <td className="px-8 py-5 text-sm text-slate-500">{cust.email}</td>
                      <td className="px-8 py-5 text-sm font-bold">{cust.orders || 0}</td>
                      <td className="px-8 py-5 text-right font-bold text-primary">{cust.spent || '₹0'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 italic">
                      No registered customers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  };

  const renderAddProductStep1 = () => (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">Step 1 of 3: Basic Info</p>
          <p className="text-primary font-bold text-sm">33% Complete</p>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width: '33%'}}></div></div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
        <h2 className="text-2xl font-bold mb-6">1. Basic Information</h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2"><label className="font-bold text-sm">Product Name</label><input className="w-full px-4 py-3 rounded-lg bg-background-light border-slate-200 focus:ring-primary focus:border-primary outline-none" placeholder="e.g. Ashwagandha Gold Tablets" /></div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm">Category</label>
            <select 
              className="w-full px-4 py-3 rounded-lg bg-background-light border-slate-200 focus:ring-primary focus:border-primary outline-none"
              defaultValue={newProductCategory}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="NEW">Add New Category...</option>
            </select>
          </div>
          <div className="flex flex-col gap-2"><label className="font-bold text-sm">Short Description</label><input className="w-full px-4 py-3 rounded-lg bg-background-light border-slate-200 focus:ring-primary focus:border-primary outline-none" placeholder="Brief 1-sentence summary" /></div>
        </div>
        <div className="flex justify-between pt-8 border-t border-gray-50">
          <button onClick={() => setView('ecommerce-inventory')} className="px-6 py-2.5 rounded-lg border border-slate-200 font-bold hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={() => setView('addProduct-2')} className="bg-primary text-[#1A1A18] px-10 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-105 transition-all">Save & Continue</button>
        </div>
      </div>
    </div>
  );

  const renderAddProductStep2 = () => (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">Step 2 of 3: Media & Ingredients</p>
          <p className="text-primary font-bold text-sm">66% Complete</p>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width: '66%'}}></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold">Product Photography</h3>
          <div className="aspect-[16/15] rounded-xl border-2 border-dashed border-slate-200 bg-background-light flex flex-col items-center justify-center text-center p-8 group cursor-pointer hover:border-primary transition-all">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
            <p className="font-bold">Click or drag to upload</p>
            <p className="text-xs text-slate-400 mt-2">PNG, JPG or WEBP (Max. 5MB)</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold">Key Ingredients</h3>
          <div className="space-y-3">
             {['Tulsi (Holy Basil)', 'Ashwagandha', 'Saffron'].map(ing => (
               <div key={ing} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <div className="flex items-center gap-3"><span className="material-symbols-outlined text-amber-600">eco</span><span className="font-bold text-sm">{ing}</span></div>
                 <button className="text-slate-400 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
               </div>
             ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-8">
        <button onClick={() => setView('addProduct-1')} className="flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg border border-slate-200"><span className="material-symbols-outlined">arrow_back</span> Back</button>
        <button onClick={() => setView('addProduct-3')} className="bg-primary text-[#1A1A18] px-10 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Continue to Pricing</button>
      </div>
    </div>
  );

  const renderAddProductStep3 = () => (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold">Step 3 of 3: Inventory & Pricing</p>
          <p className="text-primary font-bold text-sm">100% Complete</p>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width: '100%'}}></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <h3 className="font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">payments</span> Pricing</h3>
          <div className="space-y-4">
            <div><label className="block text-xs font-bold mb-1.5 uppercase opacity-60">Regular Price (INR)</label><input className="w-full bg-background-light rounded-lg border-none px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="₹0.00" type="number" /></div>
            <div><label className="block text-xs font-bold mb-1.5 uppercase opacity-60">SKU Code</label><input className="w-full bg-background-light rounded-lg border-none px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="JAM-AYU-001" /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <h3 className="font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">search_check</span> SEO Preview</h3>
          <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 space-y-2">
            <p className="text-blue-600 font-bold truncate">Jammi's New Product | 100% Natural</p>
            <p className="text-amber-700 text-xs">www.jammipharma.com/products/new</p>
            <p className="text-slate-500 text-xs line-clamp-2">Experience 125 years of heritage with our latest Ayurvedic formulation...</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-8 border-t border-slate-100">
        <button onClick={() => setView('addProduct-2')} className="flex items-center gap-2 font-bold px-6 py-2.5 rounded-lg border border-slate-200"><span className="material-symbols-outlined">arrow_back</span> Back</button>
        <div className="flex gap-4">
          <button onClick={() => { alert('Draft Saved'); setView('ecommerce-inventory'); }} className="px-6 py-2.5 rounded-lg font-bold text-gray-500 hover:bg-slate-100">Save as Draft</button>
          <button onClick={() => { alert('Product Published Successfully!'); setView('ecommerce-inventory'); }} className="bg-primary text-[#1A1A18] px-12 py-3 rounded-xl font-black shadow-lg shadow-primary/30">Publish Product</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background-light overflow-hidden">
      {renderSidebar()}
      <div className="flex-1 ml-72 flex flex-col overflow-y-auto">
        {view === 'ecommerce-dashboard' && renderDashboard()}
        {view === 'ecommerce-categories' && renderCategories()}
        {view === 'ecommerce-customers' && renderCustomers()}
        {view === 'federation-posts' && renderModeration()}
        {view === 'federation-doctors' && renderDoctorProfiles()}
        {view === 'partnership-requests' && renderPartners()}
        {view === 'addProduct-1' && renderAddProductStep1()}
        {view === 'addProduct-2' && renderAddProductStep2()}
        {view === 'addProduct-3' && renderAddProductStep3()}
        
        {/* Placeholder for missing views */}
        {view === 'ecommerce-orders' && (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-primary font-bold">receipt_long</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-secondary mb-2">Orders Module</h2>
            <p className="text-slate-500 max-w-md">The order management system is being integrated with our logistics partner.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
