"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContact = useMutation((api as any).contact?.submitContactRequest);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContact({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      toast.success('Your message has been sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Breadcrumb & Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A4B3A] mb-4">Contact Us</h1>
          <div className="text-sm font-medium text-gray-500 flex gap-2 items-center">
            <Link href="/" className="hover:text-[#F3A010] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-[#F3A010]">Contact Us</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1A4B3A] mb-2">Fill The Form</h2>
            <p className="text-gray-600 mb-8 text-[15px]">
              Getting in touch is easy! We would be happy to answer your questions
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1A4B3A] mb-2">Name*</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    placeholder="Your Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:ring-0 focus:border-[#F3A010] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A4B3A] mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Your Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:ring-0 focus:border-[#F3A010] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#1A4B3A] mb-2">Email*</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:ring-0 focus:border-[#F3A010] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A4B3A] mb-2">Phone Number*</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:ring-0 focus:border-[#F3A010] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A4B3A] mb-2">Message</label>
                <textarea 
                  name="message"
                  required
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-3 focus:ring-0 focus:border-[#F3A010] transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#1A4B3A] text-[#F3A010] font-bold px-8 py-3 rounded-none uppercase tracking-widest text-sm hover:bg-[#F3A010] hover:text-[#1A4B3A] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'SENDING...' : 'GET IN TOUCH'}
              </button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="bg-white p-10 shadow-xl self-start">
            <h2 className="text-xl font-bold text-[#1A4B3A] mb-8 pb-4 border-b border-gray-100">Jammi Pharmaceuticals Pvt. Ltd.</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#F3A010] text-3xl">location_on</span>
                <div>
                  <a href="https://maps.app.goo.gl/Fqxae6TeT1osSb5u9" target="_blank" rel="noopener noreferrer" className="text-gray-600 leading-relaxed font-medium hover:text-[#F3A010] transition-colors block">
                    Flat 2B, "Abhirami" New No. 14, Old No. 20,<br/>
                    Dr. Nair Road T. Nagar, Chennai – 600017
                  </a>
                  <a href="https://maps.app.goo.gl/Fqxae6TeT1osSb5u9" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#1A4B3A] mt-2 inline-block hover:underline">View on Google Maps</a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#F3A010] text-3xl">call</span>
                <div>
                  <p className="text-[#1A4B3A] font-bold text-[15px] mb-1">Call</p>
                  <a href="tel:+919043020764" className="block text-gray-600 hover:text-[#F3A010] transition-colors">+91 90 430 20764</a>
                  <a href="tel:+914424991439" className="block text-gray-600 hover:text-[#F3A010] transition-colors">+91 44 2499 1439</a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[#F3A010] text-3xl">mail</span>
                <div>
                  <p className="text-[#1A4B3A] font-bold text-[15px] mb-1">Email</p>
                  <a href="mailto:frontdesk@jammi.org" className="block text-gray-600 hover:text-[#F3A010] transition-colors">frontdesk@jammi.org</a>
                  <a href="mailto:info@jammi.org" className="block text-gray-600 hover:text-[#F3A010] transition-colors">info@jammi.org</a>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.85040660682!2d80.23727217594951!3d13.044577887277636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665beff5e807%3A0xc3f98c8c7d3eb81a!2sJammi%20Pharmaceuticals%20-%20Ayurvedic%20Clinic%20%26%20Pharmacy!5e0!3m2!1sen!2sin!4v1709825488417!5m2!1sen!2sin" 
                  width="100%" 
                  height="250" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jammi Pharmaceuticals Map Location"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
