"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const MODULES = ['dashboard', 'products', 'categories', 'orders', 'customers', 'coupons', 'shipping', 'reviews', 'cms', 'roles', 'bundles', 'federation'];
const ROLES = ['super_admin', 'manager', 'staff'];

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null); // To handle password changes

  const fetchData = async () => {
    setLoading(true);
    try {
      const [uRes, pRes] = await Promise.all([
        fetch('/api/admin/roles/users'),
        fetch('/api/admin/roles/permissions')
      ]);
      const [uData, pData] = await Promise.all([uRes.json(), pRes.json()]);
      setUsers(uData?.data || (Array.isArray(uData) ? uData : []));
      setPermissions(pData?.data || (Array.isArray(pData) ? pData : []));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePermissionChange = (role: string, module: string, field: string, value: boolean) => {
    const updated = [...permissions];
    const index = updated.findIndex(p => p.role === role && p.module === module);
    if (index > -1) {
      updated[index] = { ...updated[index], [field]: value };
    } else {
      updated.push({ role, module, [field]: value });
    }
    setPermissions(updated);
  };

  const savePermissions = async () => {
    try {
      await fetch('/api/admin/roles/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions })
      });
      alert('Permissions saved successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Access Control</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Manage administrative users and module permissions</p>
          </div>
          {activeTab === 'users' && (
             <button 
               onClick={() => setShowUserModal(true)}
               className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2"
             >
               <span className="material-symbols-outlined text-[18px]">person_add</span>
               Add Staff Member
             </button>
          )}
          {activeTab === 'permissions' && (
             <button 
               onClick={savePermissions}
               className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center gap-2"
             >
               <span className="material-symbols-outlined text-[18px]">save</span>
               Save Matrix
             </button>
          )}
        </div>

        <div className="flex border-b border-white/5">
           {['users', 'permissions'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-green-500' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab === 'users' ? 'Admin Users' : 'Permission Matrix'}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 shadow-[0_-4px_10px_rgba(34,197,94,0.5)]" />}
              </button>
           ))}
        </div>

        {loading ? (
           <div className="py-32 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-2 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
              <div className="mt-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">Sychronizing Matrix...</div>
           </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 font-medium">
             {activeTab === 'users' ? (
                <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                         <tr>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-4">Email</th>
                            <th className="py-4 px-4">Role</th>
                            <th className="py-4 px-4">Status</th>
                            <th className="py-4 px-4 text-right">Added</th>
                            <th className="py-4 px-4 text-center">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-white/5">
                         {users.map(user => (
                            <tr key={user.id} className="hover:bg-white/[0.02]">
                               <td className="py-4 px-6 font-bold text-white uppercase tracking-tight">{user.name}</td>
                               <td className="py-4 px-4 text-slate-400 font-mono text-xs">{user.email}</td>
                               <td className="py-4 px-4">
                                  <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[9px] font-black uppercase tracking-widest border border-green-500/10">
                                     {user.role}
                                  </span>
                               </td>
                               <td className="py-4 px-4">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                     user.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                  }`}>
                                     {user.status}
                                  </span>
                               </td>
                               <td className="py-4 px-4 text-right text-slate-500 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                               <td className="py-4 px-4 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                     <button 
                                        onClick={() => setEditingUser(user)}
                                        className="size-7 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition flex items-center justify-center border border-blue-500/20"
                                        title="Change Password"
                                     >
                                        <span className="material-symbols-outlined text-[14px]">key</span>
                                     </button>
                                     <button 
                                        onClick={async () => {
                                           if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                                              await fetch(`/api/admin/roles/users/${user.id}`, { method: 'DELETE' });
                                              fetchData();
                                           }
                                        }}
                                        className="size-7 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center border border-red-500/20"
                                        title="Delete User"
                                     >
                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                     </button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             ) : (
                <div className="bg-[#111118] border border-white/5 rounded-2xl shadow-xl overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="border-b border-white/5">
                            <th className="py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest sticky left-0 bg-[#111118] z-10 min-w-[150px]">Module</th>
                            {ROLES.map(role => (
                               <th key={role} colSpan={4} className="py-4 px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center border-l border-white/5">
                                  {role.replace('_', ' ')}
                               </th>
                            ))}
                         </tr>
                         <tr className="border-b border-white/5 bg-white/[0.01]">
                            <th className="sticky left-0 bg-[#111118] z-10"></th>
                            {ROLES.map(role => (
                               <React.Fragment key={role}>
                                  <th className="py-2 px-2 text-[8px] font-black text-slate-500 uppercase border-l border-white/5 text-center">View</th>
                                  <th className="py-2 px-2 text-[8px] font-black text-slate-500 uppercase text-center">Add</th>
                                  <th className="py-2 px-2 text-[8px] font-black text-slate-500 uppercase text-center">Edit</th>
                                  <th className="py-2 px-2 text-[8px] font-black text-slate-500 uppercase text-center">Del</th>
                               </React.Fragment>
                            ))}
                         </tr>
                      </thead>
                      <tbody>
                         {MODULES.map(module => (
                            <tr key={module} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                               <td className="py-4 px-6 text-[10px] font-black text-white uppercase tracking-widest sticky left-0 bg-[#111118] z-10 border-r border-white/5">
                                  {module}
                               </td>
                               {ROLES.map(role => {
                                  const perm = permissions.find(p => p.role === role && p.module === module) || {};
                                  return (
                                     <React.Fragment key={role}>
                                        {['can_view', 'can_create', 'can_edit', 'can_delete'].map(field => (
                                           <td key={field} className="py-4 px-2 text-center border-l border-white/[0.02]">
                                              <input 
                                                type="checkbox" 
                                                checked={perm[field] || false}
                                                onChange={(e) => handlePermissionChange(role, module, field, e.target.checked)}
                                                className="w-4 h-4 rounded-md border-white/10 bg-white/5 text-green-500 focus:ring-green-500/20 transition-all cursor-pointer"
                                              />
                                           </td>
                                        ))}
                                     </React.Fragment>
                                  )
                               })}
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             )}
          </div>
        )}

        {showUserModal && (
           <NewUserModal onClose={() => setShowUserModal(false)} onUpdate={fetchData} />
        )}
        {editingUser && (
           <PasswordResetModal user={editingUser} onClose={() => setEditingUser(null)} onUpdate={fetchData} />
        )}
      </div>
    </AdminLayout>
  );
}

function NewUserModal({ onClose, onUpdate }: any) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/admin/roles/users', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-[#111118] border border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
         <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight italic italic">Register Staff Member</h2>
         <div className="space-y-4 mb-8">
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
               <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all" placeholder="John Doe" />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
               <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all font-mono" placeholder="staff@jammipharma.com" />
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Assigned Role</label>
               <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-green-500/50 transition-all">
                  {ROLES.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
               </select>
            </div>
            <div>
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Initial Password</label>
               <input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-500/50 transition-all" placeholder="••••••••" />
            </div>
         </div>
         <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-grow py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition">Cancel</button>
            <button type="submit" disabled={saving} className="flex-grow py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 active:scale-95">
               {saving ? 'Registering...' : 'Provision Access'}
            </button>
         </div>
      </form>
    </div>
  );
}

function PasswordResetModal({ user, onClose, onUpdate }: any) {
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`/api/admin/roles/users/${user.id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ password }) 
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm bg-[#111118] border border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
         <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight italic">Reset Password</h2>
         <p className="text-xs text-slate-400 mb-6">Changing access for <strong>{user.name}</strong> ({user.email}).</p>
         
         <div className="mb-8">
             <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">New Password</label>
             <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-mono" placeholder="••••••••" />
         </div>

         <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-grow py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition">Cancel</button>
            <button type="submit" disabled={saving} className="flex-grow py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
               {saving ? 'Saving...' : 'Update credentials'}
            </button>
         </div>
      </form>
    </div>
  );
}
