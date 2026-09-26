'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Smartphone, Monitor, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';

export function DeviceWrapper({ children }: { children: React.ReactNode }) {
  const { isMobileFrame, setIsMobileFrame, isAdminMode, setIsAdminMode, setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#0D0D0E] flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4 text-neutral-800 antialiased selection:bg-[#8E5827] selection:text-white">
      {/* Top Prototype Controls Banner for Client Review */}
      <div className="w-full max-w-[440px] mb-2 px-3 py-1.5 hidden sm:flex items-center justify-between bg-neutral-900/90 backdrop-blur-md rounded-2xl border border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-royal text-[11px] font-bold text-[#E8CA72]">
            HOUSE OF RAMANAND
          </span>
          <span className="text-[10px] text-neutral-500">• High-Fidelity Prototype</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="p-1 text-neutral-400 hover:text-white transition"
            title={isMobileFrame ? 'Switch to Full Width' : 'Switch to Mobile Frame'}
          >
            {isMobileFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Frame (440px max) or Responsive */}
      <div
        className={`w-full bg-[#FAF8F5] min-h-screen relative flex flex-col shadow-2xl overflow-x-hidden transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[440px] sm:rounded-[36px] sm:border sm:border-[#333336] sm:min-h-[890px]'
            : 'max-w-4xl rounded-2xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
