'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  MessageSquare,
  Camera,
  X,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

export function Modals() {
  const {
    isWhatsAppModalOpen,
    setIsWhatsAppModalOpen,
    whatsAppProduct,
    isVisualSearchOpen,
    setIsVisualSearchOpen,
    toast,
    showToast,
    openProductDetail,
    products
  } = useApp();

  const [customMsg, setCustomMsg] = useState('');

  const defaultMsg = whatsAppProduct
    ? `Hi, I am interested in this House of Ramanand jewellery piece: "${whatsAppProduct.name}" (SKU: ${whatsAppProduct.sku}, ₹${whatsAppProduct.price.toLocaleString('en-IN')}). Please share more details and arrange private viewing.`
    : 'Hi, I am interested in House of Ramanand handcrafted Jaipur jewellery. Please share more details.';

  const handleSendWhatsApp = () => {
    showToast('WhatsApp enquiry sent to Jaipur Flagship Specialist!');
    setIsWhatsAppModalOpen(false);
  };

  const handleSimulateVisualCapture = () => {
    showToast('Visual Search match found: Rose Gold & Diamond Hoops');
    setIsVisualSearchOpen(false);
    if (products[0]) {
      openProductDetail(products[0]);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#111111]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border border-[#D4AF37]/40 text-xs animate-fade-in max-w-[90vw]">
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-medium truncate">{toast.message}</span>
        </div>
      )}

      {/* WhatsApp Enquiry Modal */}
      {isWhatsAppModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF7EE] text-[#25D366] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-royal text-sm font-bold text-neutral-900">
                    WhatsApp Enquiry
                  </h3>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    House of Ramanand Jaipur Concierge
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Product mini card if selected */}
            {whatsAppProduct && (
              <div className="my-3 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#ECE3D4] flex items-center space-x-2.5 text-xs">
                <img
                  src={whatsAppProduct.images[0]}
                  alt={whatsAppProduct.name}
                  className="w-12 h-12 object-contain rounded-lg bg-white p-0.5 border"
                />
                <div>
                  <h4 className="font-bold text-neutral-900 line-clamp-1">{whatsAppProduct.name}</h4>
                  <span className="text-[#8E5827] font-bold font-serif-luxury">
                    ₹{whatsAppProduct.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            {/* Prefilled message box */}
            <div className="space-y-1.5 text-xs">
              <label className="text-[10px] uppercase font-bold text-neutral-400 block">
                Pre-filled Message:
              </label>
              <textarea
                rows={4}
                value={customMsg || defaultMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-neutral-300 rounded-xl p-2.5 text-xs text-neutral-800 focus:outline-none focus:border-[#25D366]"
              ></textarea>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow-md transition flex items-center justify-center space-x-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </button>
              <p className="text-[10px] text-center text-neutral-400">
                Direct encrypted chat with our certified gemologist in Jaipur.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visual Search Simulation Modal */}
      {isVisualSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-[#D4AF37]/40 w-full max-w-sm rounded-3xl p-5 shadow-2xl text-white text-center animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
              <span className="font-royal text-xs font-bold text-[#E8CA72]">
                Visual Camera AI Match
              </span>
              <button
                onClick={() => setIsVisualSearchOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Viewfinder Target */}
            <div className="relative my-6 w-48 h-48 mx-auto border-2 border-dashed border-[#D4AF37] rounded-3xl flex items-center justify-center overflow-hidden bg-neutral-800/60 shadow-inner">
              <Camera className="w-12 h-12 text-[#E8CA72] animate-pulse" />
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#E8CA72] to-transparent animate-bounce"></div>
            </div>

            <h4 className="font-royal text-sm font-bold text-[#FAF0CD]">
              Point at any Jewellery or Diamond
            </h4>
            <p className="text-xs text-neutral-400 mt-1 max-w-[240px] mx-auto">
              Identify similar Jaipur heritage settings, carat estimates, and metal karatage instantly.
            </p>

            <div className="mt-5 space-y-2">
              <button
                onClick={handleSimulateVisualCapture}
                className="w-full py-3 bg-gradient-to-r from-[#DFBA54] to-[#AA7A1E] text-neutral-950 font-bold text-xs uppercase rounded-xl tracking-wider shadow-lg active:scale-98"
              >
                Capture & Match Design
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
