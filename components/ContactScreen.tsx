'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function ContactScreen() {
  const { showToast, openWhatsAppEnquiry } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'Bridal Consultation Appointment',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      showToast('Please provide your name and mobile number', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Your message has been submitted to House of Ramanand!');
  };

  return (
    <div className="pb-28 bg-[#FAF8F5] px-4 pt-3 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[9px] uppercase font-royal tracking-[0.25em] text-[#AA7A1E] font-bold">
          Royal Ateliers & Concierge
        </span>
        <h1 className="font-royal text-2xl font-bold text-[#8E5827] mt-0.5">
          Contact Us
        </h1>
        <p className="text-xs text-neutral-600 mt-1">
          Visit our heritage Jaipur showrooms or schedule a private virtual session.
        </p>
      </div>

      {/* Flagship Showroom */}
      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#8E5827]/10 text-[#8E5827] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-[#8E5827] bg-[#8E5827]/10 px-2 py-0.5 rounded">
                Flagship Heritage Boutique
              </span>
              <h3 className="font-serif-luxury text-sm font-semibold text-neutral-900 mt-1">
                House of Ramanand — Jaipur
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                B-68 1st Crossing, Godika Ka Rasta, Chandpole Bazar, Khazanewalo, Jaipur, Rajasthan 302001
              </p>
              <div className="mt-2.5 flex flex-wrap gap-3 text-xs text-neutral-700">
                <a href="tel:+919829081651" className="flex items-center space-x-1 font-semibold text-[#8E5827]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 98290 81651</span>
                </a>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>10:30 AM – 8:30 PM (All 7 Days)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Action */}
      <button
        onClick={() => openWhatsAppEnquiry()}
        className="w-full py-3.5 bg-[#EAF7EE] border border-[#25D366]/50 text-[#1F7A40] rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 shadow-xs hover:bg-[#DDF2E3] transition active:scale-98"
      >
        <MessageSquare className="w-4 h-4 text-[#25D366]" />
        <span>Instant WhatsApp Assistance with Specialist</span>
      </button>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs">
        <h3 className="font-royal text-sm font-bold text-neutral-900 mb-3">
          Send Us a Direct Enquiry
        </h3>

        {isSubmitted ? (
          <div className="py-6 text-center text-emerald-800 bg-emerald-50 rounded-xl p-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-royal text-sm font-bold">Enquiry Received</h4>
            <p className="text-xs text-neutral-600 mt-1">
              Our Jaipur senior concierge specialist will contact you within 2 business hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-4 py-1.5 bg-[#8E5827] text-white rounded-xl text-xs font-bold"
            >
              Send Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8E5827]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8E5827]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8E5827]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8E5827]"
              >
                <option>Bridal Consultation Appointment</option>
                <option>Old Gold Exchange Valuation</option>
                <option>Custom Diamond Setting Enquiry</option>
                <option>Digi Gold & Swarna Nidhi Query</option>
                <option>General Customer Support</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                Message
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share any specific design codes, diamond carat requirements, or preferred visiting dates..."
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8E5827]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8E5827] hover:bg-[#76441B] text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow transition flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
