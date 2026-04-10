"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useFederationStore } from '../../store/federationStore';
import clsx from 'clsx';
import { ForumPost } from '../../types/federation';

export default function Forum() {
    const { 
        posts, submitPost, upvotePost, isAdminLoggedIn, approvePost, rejectPost, submitComment,
        notifications, markNotificationRead, createDoctorProfile, doctorProfiles,
        currentUserProfile, userUID
    } = useFederationStore();
    
    // Post Form States
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState(currentUserProfile?.name || '');
    const [specialty, setSpecialty] = useState(currentUserProfile?.specialty || '');
    const [category, setCategory] = useState('Clinical Research');
    const [toast, setToast] = useState('');

    useEffect(() => {
        if (currentUserProfile) {
            setAuthor(currentUserProfile.name);
            setSpecialty(currentUserProfile.specialty);
        }
    }, [currentUserProfile]);

    // Expanded Post State
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
    
    // Comment Form State
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');

    // Doctor Profile State
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [docName, setDocName] = useState('');
    const [docSpecialty, setDocSpecialty] = useState('');
    const [docBio, setDocBio] = useState('');

    // Notifications State
    const [showNotifications, setShowNotifications] = useState(true);

    const handleDoctorJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!docName || !docSpecialty || !docBio) {
            setToast('Please fill in all fields');
            setTimeout(() => setToast(''), 3000);
            return;
        }
        try {
            const res = await fetch('/api/doctor-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: docName, specialty: docSpecialty, bio: docBio })
            });
            const json = await res.json();
            if (res.ok && json.success) {
                setShowJoinModal(false);
                setDocName('');
                setDocSpecialty('');
                setDocBio('');
                setToast('Profile created! You can now start posting.');
                setTimeout(() => setToast(''), 5000);
            } else {
                setToast(json.error || 'Failed to create profile');
                setTimeout(() => setToast(''), 5000);
            }
        } catch (error) {
            console.error('Doctor join error:', error);
            setToast('An error occurred. Please try again.');
            setTimeout(() => setToast(''), 5000);
        }
    };

    const { scrollYProgress } = useScroll();
    const backgroundColor = useTransform(
        scrollYProgress,
        [0.4, 0.6],
        ['#FAF8F2', '#FDF6E8']
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !author || !specialty) {
            setToast('Please fill in all fields');
            setTimeout(() => setToast(''), 3000);
            return;
        }
        try {
            const result = await submitPost({
                title,
                content,
                author,
                specialty,
                category,
            });
            if (result?.success) {
                setTitle('');
                setContent('');
                setAuthor('');
                setSpecialty('');
                setToast('Your post is under review. When verified, it will appear after approval.');
                setTimeout(() => setToast(''), 5000);
            } else {
                setToast((result as any)?.error || 'Failed to submit post');
                setTimeout(() => setToast(''), 5000);
            }
        } catch (error) {
            console.error('Submit post error:', error);
            setToast('An error occurred. Please try again.');
            setTimeout(() => setToast(''), 5000);
        }
    };

    const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
        e.preventDefault();
        if (!commentAuthor || !commentContent) return;
        submitComment(postId, { author: commentAuthor, content: commentContent });
        setCommentAuthor('');
        setCommentContent('');
    };

    return (
        <motion.section 
            className="w-full py-24 px-6 md:px-12 lg:px-24"
            style={{ backgroundColor }}
        >
            <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-4xl md:text-[64px] font-['Cormorant_SC',serif] text-[#C9A84C] mb-2 leading-none">
                        THE DISCOURSE
                    </h2>
                    <p className="font-['Cinzel',serif] tracking-widest text-[#9E8E7E] text-sm md:text-base">
                        PEER-REVIEWED FORUM · CURATED BY THE JAMMI ACADEMIC COUNCIL
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {!currentUserProfile ? (
                        <button 
                            onClick={() => setShowJoinModal(true)}
                            className="bg-[#C9A84C] text-white px-6 py-2 rounded-sm font-['Cinzel',serif] text-xs tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#C9A84C]/20"
                        >
                            JOIN AS A DOCTOR
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 bg-[#1C1411] text-white px-4 py-2 rounded-sm border border-[#C9A84C]/30">
                            <span className="material-symbols-outlined text-[#C9A84C]">verified_user</span>
                            <div className="flex flex-col">
                                <span className="font-['Cinzel',serif] text-[10px] tracking-widest leading-none mb-1">PRACTITIONER</span>
                                <span className="font-['Playfair_Display',serif] text-sm leading-none">{currentUserProfile.name}</span>
                            </div>
                        </div>
                    )}
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-[#C9A84C] border border-[#C9A84C]/30 rounded-full hover:bg-[#C9A84C]/10 transition-all"
                    >
                        <span className="material-symbols-outlined">notifications</span>
                        {notifications.filter(n => !n.isRead).length > 0 && (
                            <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>
                </div>
            </div>

            {/* Notifications Panel */}
            <AnimatePresence>
                {showNotifications && notifications.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="max-w-7xl mx-auto mb-12 bg-[#EDE5D8] border border-[#C9A84C]/30 overflow-hidden"
                    >
                        <div className="p-4 border-b border-[#C9A84C]/20 flex justify-between items-center">
                            <h4 className="font-['Cinzel',serif] text-xs tracking-widest text-[#1C1411]">COMMUNITY UDPATES</h4>
                            <button onClick={() => setShowNotifications(false)} className="text-[#9E8E7E] hover:text-[#1C1411]">✕</button>
                        </div>
                        <div className="max-h-48 overflow-y-auto divide-y divide-[#C9A84C]/10">
                            {notifications.map(notif => (
                                <div 
                                    key={notif.id} 
                                    className={clsx("p-4 flex justify-between items-center gap-4", !notif.isRead && "bg-white/30")}
                                    onClick={() => markNotificationRead(notif.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[#C9A84C] text-sm">
                                            {notif.type === 'new_post' ? 'article' : 'person_add'}
                                        </span>
                                        <p className="font-['EB_Garamond',serif] text-[#3a302a] text-sm">{notif.message}</p>
                                    </div>
                                    <span className="font-['DM_Mono',monospace] text-[10px] text-[#9E8E7E] uppercase">{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* 65% Left Feed */}
                <div className="flex-1 lg:w-[65%] flex flex-col gap-6">
                    <AnimatePresence>
                        {posts.map((post, i) => {
                            if (post.status === 'pending' && !isAdminLoggedIn) return null; // hide pending from public
                            
                            const isExpanded = expandedPostId === post.id;

                            return (
                                <motion.div 
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={clsx(
                                        "bg-[#F0EBE1] border border-[#D4B896] relative group overflow-hidden cursor-pointer",
                                        post.status === 'approved' ? 'border-l-[3px] border-l-[#C9A84C]' : 'border-l-[3px] border-l-[#C4A882]',
                                        isExpanded ? 'shadow-lg' : 'hover:shadow-md transition-shadow'
                                    )}
                                    // Expand/collapse logic (only allow expanding if approved or admin viewing)
                                    onClick={() => !isExpanded && setExpandedPostId(post.id)}
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="font-['DM_Mono',monospace] text-xs text-[#9E8E7E] tracking-wider uppercase">
                                                {post.category} · {post.timestamp}
                                            </div>
                                            <div className={clsx(
                                                "font-['Cinzel',serif] text-[10px] tracking-widest px-2 py-1 rounded-sm flex items-center gap-2",
                                                post.status === 'approved' ? "text-[#C9A84C] bg-[#C9A84C]/10" : "text-[#D4B896] bg-[#D4B896]/10"
                                            )}>
                                                {post.status === 'approved' ? '✦ COUNCIL APPROVED' : '⏳ AWAITING REVIEW'}
                                                {isExpanded && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setExpandedPostId(null); }}
                                                        className="text-slate-500 hover:text-slate-900 leading-none"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-['Playfair_Display',serif] text-[#1C1411] mb-2">
                                            {post.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-4 text-[#2C2420] font-['EB_Garamond',serif] italic">
                                            {post.author} 
                                            <span className="text-[#D4B896] not-italic text-sm">|</span> 
                                            <span className="font-['Cinzel',serif] text-xs not-italic">{post.specialty}</span>
                                        </div>

                                        {/* Preview / Full Content */}
                                        <div className="text-[#3a302a] font-['EB_Garamond',serif] text-lg leading-relaxed">
                                            {isExpanded ? (
                                                <div className="whitespace-pre-wrap">{post.content}</div>
                                            ) : (
                                                <div className="line-clamp-3 overflow-hidden text-[#5a4d46]">{post.content}</div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D4B896]/30">
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); upvotePost(post.id); }}
                                                    className="flex items-center gap-1 text-[#8B6914] hover:text-[#C9A84C] transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">history_edu</span>
                                                    <span className="font-['DM_Mono',monospace] text-xs">{post.upvotes}</span>
                                                </button>
                                                <button 
                                                    className="flex items-center gap-1 text-[#9E8E7E] hover:text-[#1C1411] transition-colors"
                                                    onClick={(e) => { if(!isExpanded) { e.stopPropagation(); setExpandedPostId(post.id); } }}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                                                    <span className="font-['DM_Mono',monospace] text-xs">{post.comments}</span>
                                                </button>
                                            </div>

                                            {/* Admin Actions */}
                                            {isAdminLoggedIn && post.status === 'pending' && (
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); approvePost(post.id); }}
                                                        className="px-3 py-1 border border-[#C9A84C] text-[#C9A84C] font-['Cinzel',serif] text-[10px] hover:bg-[#C9A84C] hover:text-white transition-colors"
                                                    >
                                                        APPROVE
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); rejectPost(post.id); }}
                                                        className="px-3 py-1 border border-[#D4B896] text-[#D4B896] font-['Cinzel',serif] text-[10px] hover:bg-[#D4B896] hover:text-white transition-colors"
                                                    >
                                                        REJECT
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Threaded Comments Section */}
                                    <AnimatePresence>
                                        {isExpanded && post.status === 'approved' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-[#EBE4D5] border-t border-[#D4B896] p-6 cursor-default"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <h4 className="font-['Cinzel',serif] text-[#1C1411] tracking-widest mb-6">Discourse Thread</h4>
                                                
                                                {/* Comments List */}
                                                <div className="space-y-4 mb-8">
                                                    {post.commentsList && post.commentsList.length > 0 ? (
                                                        post.commentsList.map(comment => (
                                                            <div key={comment.id} className="bg-[#FAF8F2] p-4 rounded-sm border-l-2 border-[#C9A84C]">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-['Playfair_Display',serif] font-bold text-[#1C1411]">{comment.author}</span>
                                                                    <span className="font-['DM_Mono',monospace] text-[10px] text-[#9E8E7E] uppercase">{comment.timestamp}</span>
                                                                </div>
                                                                <p className="font-['EB_Garamond',serif] text-[#3a302a] text-[15px]">{comment.content}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="font-['EB_Garamond',serif] text-[#9E8E7E] italic text-sm">No thoughts shared yet. Be the first to add to this discourse.</p>
                                                    )}
                                                </div>

                                                {/* Add Comment Form */}
                                                <div className="bg-[#FAF8F2] p-5 border border-[#D4B896]/30">
                                                    <h5 className="font-['Playfair_Display',serif] text-sm text-[#1C1411] mb-4">Contribute to the Discussion</h5>
                                                    <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex flex-col gap-4">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Your Name / Title" 
                                                            value={commentAuthor}
                                                            onChange={e => setCommentAuthor(e.target.value)}
                                                            className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-sm focus:outline-none placeholder:text-[#9E8E7E]/70"
                                                            required
                                                        />
                                                        <textarea 
                                                            placeholder="Your Insight..." 
                                                            value={commentContent}
                                                            onChange={e => setCommentContent(e.target.value)}
                                                            className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-sm focus:outline-none placeholder:text-[#9E8E7E]/70 resize-none h-16"
                                                            required
                                                        />
                                                        <button type="submit" className="self-end px-6 py-2 border border-[#C9A84C] text-[#C9A84C] font-['Cinzel',serif] text-[10px] tracking-widest hover:bg-[#C9A84C] hover:text-white transition-colors">
                                                            ADD INSIGHT
                                                        </button>
                                                    </form>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* 35% Right Sticky Sidebar */}
                <div className="w-full lg:w-[35%] lg:sticky top-24 self-start">
                    <div className="bg-[#EDE5D8] p-8 border-t-[3px] border-t-[double] border-t-[#C9A84C] relative">
                        <h3 className="text-3xl font-['Playfair_Display',serif] italic text-[#1C1411] mb-8">
                            Start a Discourse
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Title of Discourse" 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70"
                                    required
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Author Name" 
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70"
                                    required
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Specialty / Affiliation" 
                                    value={specialty}
                                    onChange={e => setSpecialty(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70"
                                    required
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group">
                                <select 
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none appearance-none cursor-pointer"
                                >
                                    <option value="Clinical Research">Clinical Research</option>
                                    <option value="Case Study">Case Study</option>
                                    <option value="Herbology">Herbology</option>
                                    <option value="Discussion">Discussion</option>
                                </select>
                                <span className="absolute right-0 top-1 pointer-events-none material-symbols-outlined text-[#8B6914]">expand_more</span>
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group mt-2">
                                <textarea 
                                    placeholder="Detailed Content..." 
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    className="w-full bg-transparent border border-[#9E8E7E]/50 p-3 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70 resize-none h-32"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-[#1C1411] text-[#C9A84C] font-['Cinzel',serif] tracking-widest py-4 mt-2 hover:bg-[#0D0907] transition-colors">
                                SUBMIT FOR COUNCIL REVIEW
                            </button>
                        </form>

                        {/* Toast */}
                        {toast && (
                            <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 border border-[#C9A84C] shadow-lg text-sm font-['Cinzel',serif] text-[#1C1411] animate-fade-in-up">
                                {toast}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Doctor Join Modal */}
            <AnimatePresence>
                {showJoinModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1C1411]/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#FAF8F2] w-full max-w-lg border border-[#C9A84C] p-10 overflow-hidden relative"
                        >
                            <button 
                                onClick={() => setShowJoinModal(false)}
                                className="absolute top-6 right-6 text-[#9E8E7E] hover:text-[#1C1411]"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <h3 className="text-3xl font-['Playfair_Display',serif] italic text-[#1C1411] mb-2">Create Doctor Profile</h3>
                            <p className="font-['Cinzel',serif] text-[10px] tracking-widest text-[#C9A84C] mb-8">VERIFIED PRACTITIONER ACCESS</p>

                            <form onSubmit={handleDoctorJoin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="font-['Cinzel',serif] text-[10px] tracking-widest text-[#9E8E7E]">FULL NAME & TITLES</label>
                                    <input 
                                        type="text" 
                                        placeholder="Dr. Alexander Jammi"
                                        value={docName}
                                        onChange={e => setDocName(e.target.value)}
                                        className="w-full bg-transparent border-b border-[#D4B896] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/40"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-['Cinzel',serif] text-[10px] tracking-widest text-[#9E8E7E]">SPECIALIZATION</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ayurvedic Internal Medicine"
                                        value={docSpecialty}
                                        onChange={e => setDocSpecialty(e.target.value)}
                                        className="w-full bg-transparent border-b border-[#D4B896] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/40"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-['Cinzel',serif] text-[10px] tracking-widest text-[#9E8E7E]">PROFESSIONAL BIOGRAPHY</label>
                                    <textarea 
                                        placeholder="Brief summary of expertise..."
                                        value={docBio}
                                        onChange={e => setDocBio(e.target.value)}
                                        className="w-full bg-transparent border border-[#D4B896]/50 p-3 text-[#1C1411] font-['EB_Garamond',serif] text-base focus:outline-none h-32 resize-none placeholder:text-[#9E8E7E]/40"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-[#1C1411] text-[#C9A84C] font-['Cinzel',serif] tracking-widest py-4 hover:bg-[#C9A84C] hover:text-white transition-all">
                                    ESTABLISH CREDENTIALS
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
