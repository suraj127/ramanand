'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  Send,
  Headphones,
  Sparkles,
  PhoneCall,
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function FloatingChat() {
  const { isLiveChatOpen, setIsLiveChatOpen, openWhatsAppEnquiry } = useApp();
  const [messages, setMessages] = useState<{ sender: 'agent' | 'user'; text: string; time: string }[]>([
    {
      sender: 'agent',
      text: 'Namaste! Welcome to House of Ramanand Jaipur (Est. 1936). How may our royal jewellery concierge assist you today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'Check 24KT Digi Gold rates',
    'Old gold exchange value',
    'Custom bridal jewellery appointment',
    'Track my order status'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text,
      time: 'Now'
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    // Simulate Agent response
    setTimeout(() => {
      let reply = 'Thank you for reaching out to House of Ramanand. Our senior jewellery specialist in Jaipur is reviewing your query.';
      if (text.toLowerCase().includes('gold rate') || text.toLowerCase().includes('digi')) {
        reply = 'Our live 24KT 999.9 pure gold rate is ₹7,842/g (+3% GST). You can accumulate directly in your Digi Locker with 100% Brink\'s vault security.';
      } else if (text.toLowerCase().includes('exchange') || text.toLowerCase().includes('old gold')) {
        reply = 'We offer 100% full market value for your 22k/18k old gold with 0% loss when upgrading to our 2026 royal collections!';
      } else if (text.toLowerCase().includes('appointment') || text.toLowerCase().includes('bridal')) {
        reply = 'We would be delighted to host you at our Jaipur flagship boutique at C-Scheme or arrange a private virtual video consultation.';
      } else if (text.toLowerCase().includes('order') || text.toLowerCase().includes('track')) {
        reply = 'Your demo order ORD-DEMO-10245 is currently confirmed and scheduled for complimentary insured dispatch.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: 'Now'
        }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Vertical Tab on Right */}
      {!isLiveChatOpen && (
        <aside className="fixed right-0 top-1/2 -translate-y-6 z-40" data-purpose="live-chat-floater">
          <button
            onClick={() => setIsLiveChatOpen(true)}
            className="bg-[#7B1824] hover:bg-[#76441B] text-[#E8CA72] text-[11px] font-bold tracking-widest px-1.5 py-3 rounded-l-lg shadow-xl uppercase flex items-center justify-center border-l-2 border-y border-[#E8CA72]/50 transition active:scale-95"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            title="House of Ramanand Live Concierge"
          >
            Live Chat
          </button>
        </aside>
      )}

      {/* Live Chat Modal Drawer */}
      {isLiveChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in">
          <div className="bg-white w-full max-w-[380px] h-[540px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#D4AF37]/30">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#76441B] via-[#8E5827] to-[#450B12] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#8E5827] flex items-center justify-center font-royal font-bold text-xs shadow-inner">
                  RJ
                </div>
                <div>
                  <h3 className="font-royal text-sm font-bold text-[#E8CA72] leading-tight">
                    Royal Jaipur Concierge
                  </h3>
                  <div className="flex items-center space-x-1.5 text-[10px] text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Online • Specialist Available</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsLiveChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-[#FAF8F5] px-3 py-2 border-b border-neutral-200 flex items-center justify-between text-[11px]">
              <button
                onClick={() => openWhatsAppEnquiry()}
                className="text-[#1F7A40] font-semibold flex items-center space-x-1 hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Switch to WhatsApp</span>
              </button>
              <span className="text-neutral-400">|</span>
              <span className="text-[#8C6615] font-medium flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A03E]" />
                <span>Since 1936 Jaipur</span>
              </span>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FCFAF8] text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-[#8E5827] text-white rounded-br-xs'
                        : 'bg-white border border-[#EBE3D8] text-neutral-800 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-neutral-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {/* Quick Suggestion Chips */}
              <div className="pt-2">
                <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1.5">
                  Frequently Asked
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-[11px] bg-white border border-[#DECFC0] hover:border-[#8E5827] text-neutral-700 px-2.5 py-1 rounded-full text-left transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-neutral-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-full px-3.5 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#8E5827]"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full bg-[#8E5827] hover:bg-[#76441B] text-white flex items-center justify-center shrink-0 shadow-sm transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
