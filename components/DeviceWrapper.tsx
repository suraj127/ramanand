'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Smartphone, Monitor, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';

export function DeviceWrapper({ children }: { children: React.ReactNode }) {
  const { isMobileFrame, setIsMobileFrame } = useApp();

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex flex-col items-center justify-start py-0 sm:py-6 px-0 sm:px-4 text-neutral-800 antialiased selection:bg-[#8E5827] selection:text-white">
      {/* Responsive View Toggle for Desktop Screen Testing */}
      <div className="w-full max-w-[440px] mb-2 px-3 py-1 hidden sm:flex items-center justify-end text-xs text-neutral-500">
        <button
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          className="p-1 rounded hover:bg-neutral-200/60 text-neutral-600 transition flex items-center space-x-1"
          title={isMobileFrame ? 'Switch to Full Width' : 'Switch to Mobile Frame'}
        >
          {isMobileFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Wide View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Mobile View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: 100% full width on mobile/APK, max-w-[440px] or max-w-4xl on desktop */}
      <div
        className={`w-full bg-[#FAF8F5] min-h-screen relative flex flex-col overflow-x-hidden transition-all duration-300 ${
          isMobileFrame
            ? 'sm:max-w-[440px] sm:rounded-[32px] sm:shadow-2xl sm:border sm:border-neutral-200/80 sm:min-h-[890px]'
            : 'max-w-4xl rounded-2xl shadow-xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
