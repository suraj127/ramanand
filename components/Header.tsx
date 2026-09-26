'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Camera,
  Mic,
  Heart,
  ShoppingBag,
  Menu,
  ArrowLeft,
  Store
} from 'lucide-react';

export function Header() {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    wishlistIds,
    setIsVisualSearchOpen,
    searchQuery,
    setSearchQuery
  } = useApp();

  const isPDP = activeTab === 'product-detail';
  const isSubPage = [
    'product-detail',
    'cart',
    'checkout',
    'order-success',
    'contact',
    'policies',
    'orders',
    'gold-rate',
    'search',
    'order-tracking'
  ].includes(activeTab);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('search');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-2xs">

      {/* Main Top Bar */}
      <div className="px-4 py-2 flex items-center justify-between min-h-[46px]">
        {/* Left Side */}
        <div className="flex items-center">
          {isSubPage ? (
            <button
              onClick={() => setActiveTab('home')}
              className="p-1 -ml-1 text-[#8E5827] hover:opacity-80 transition active:scale-95"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2]" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('account')}
              className="p-1 -ml-1 text-neutral-800 hover:text-[#8E5827] transition active:scale-95"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5 stroke-[1.8]" />
            </button>
          )}
        </div>

        {/* Center: Brand Name in Premium Serif Font WITHOUT LOGO */}
        {!isPDP && (
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center justify-center cursor-pointer"
            aria-label="House of Ramanand Home"
          >
            <span className="font-serif-luxury text-[15px] sm:text-base font-semibold tracking-[0.16em] uppercase text-neutral-900 leading-tight">
              House of Ramanand
            </span>
          </button>
        )}

        {/* Right Icons: Matching screenshots */}
        <div className="flex items-center space-x-3.5 text-neutral-800">
          {/* If on PDP: Search icon is on the right */}
          {isPDP && (
            <button
              onClick={() => setActiveTab('search')}
              className="p-0.5 text-neutral-700 hover:text-[#8E5827] transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.7]" />
            </button>
          )}

          {/* Store Locator */}
          <button
            onClick={() => setActiveTab('contact')}
            className="p-0.5 text-neutral-700 hover:text-[#8E5827] transition"
            aria-label="Store Locator"
            title="Flagship Stores"
          >
            <Store className="w-5 h-5 stroke-[1.6]" />
          </button>

          {/* Shopping Bag with badge 1 */}
          <button
            onClick={() => setActiveTab('cart')}
            className="p-0.5 relative text-neutral-700 hover:text-[#8E5827] transition"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#4A4A4A] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount > 0 ? cartCount : 1}
            </span>
          </button>

          {/* Wishlist Heart */}
          <button
            onClick={() => setActiveTab('wishlist')}
            className="p-0.5 relative text-neutral-700 hover:text-[#8E5827] transition"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-5 h-5 stroke-[1.6] ${
                wishlistIds.length > 0 ? 'text-[#8E5827] fill-[#8E5827]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search Input Bar (Visible on browse/catalog/home pages, hidden on PDP) */}
      {!isPDP && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center bg-[#F7F7F8] border border-neutral-200/90 rounded-full px-3.5 py-2 transition focus-within:border-neutral-400 focus-within:bg-white shadow-2xs">
              <Search className="w-4 h-4 text-neutral-400 mr-2.5 shrink-0 stroke-[2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for jewellery on House of Ramanand"
                className="bg-transparent text-xs text-neutral-800 placeholder-neutral-400 w-full focus:outline-none border-none p-0 focus:ring-0 font-normal"
              />
              <div className="flex items-center space-x-2.5 text-neutral-500 ml-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsVisualSearchOpen(true)}
                  className="hover:text-neutral-800 active:scale-95"
                  title="Search by image or upload photos"
                >
                  <Camera className="w-4 h-4 stroke-[1.8]" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchQuery('Earrings')}
                  className="hover:text-neutral-800 active:scale-95"
                  title="Voice search"
                >
                  <Mic className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
