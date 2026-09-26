'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Home,
  Sparkles,
  LayoutGrid,
  Shield,
  Coins
} from 'lucide-react';

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-full sm:max-w-[440px] w-full bg-white/95 backdrop-blur-md border-t border-neutral-200/80 py-1.5 px-2 sm:px-4 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]"
      data-purpose="bottom-navigation-bar"
    >
      <div className="flex items-center justify-around">
        {/* Tab 1: Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'home'
              ? 'bg-[#8E5827] text-white px-4 py-1.5 rounded-xl shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 py-1 px-3'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Home</span>
        </button>

        {/* Tab 2: Digi Gold */}
        <button
          onClick={() => setActiveTab('digi-gold')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'digi-gold'
              ? 'bg-[#8E5827] text-white px-4 py-1.5 rounded-xl shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 py-1 px-3'
          }`}
        >
          <Coins className={`w-5 h-5 ${activeTab === 'digi-gold' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Digi Gold</span>
        </button>

        {/* Tab 3: Categories */}
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'categories' || activeTab === 'collection'
              ? 'bg-[#8E5827] text-white px-4 py-1.5 rounded-xl shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 py-1 px-3'
          }`}
        >
          <LayoutGrid className={`w-5 h-5 ${activeTab === 'categories' || activeTab === 'collection' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Categories</span>
        </button>

        {/* Tab 4: Gifting */}
        <button
          onClick={() => setActiveTab('gifting')}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === 'gifting'
              ? 'bg-[#8E5827] text-white px-4 py-1.5 rounded-xl shadow-xs'
              : 'text-neutral-500 hover:text-neutral-900 py-1 px-3'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'gifting' ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">Gifting</span>
        </button>
      </div>
    </nav>
  );
}
