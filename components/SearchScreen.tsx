'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Camera,
  Mic,
  X,
  TrendingUp,
  Heart,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CategoryId } from '@/types/jewellery';

const TRENDING_SEARCHES = [
  'Rose Gold Hoops',
  'Solitaire Diamond Ring',
  'Mesh Drop Earrings',
  'Gold Kada Bangles',
  'Bridal Choker',
  '24KT Gold Coin 10g',
  'Gifts Under 25K',
  'Daily Wear Studs'
];

export function SearchScreen() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    openProductDetail,
    setSelectedCategory,
    setActiveTab,
    toggleWishlist,
    isInWishlist,
    setIsVisualSearchOpen
  } = useApp();

  const [activePriceFilter, setActivePriceFilter] = useState<string>('all');

  // Filtered live results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      const matchText =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q));

      if (!matchText) return false;

      if (activePriceFilter === '<25k' && p.price >= 25000) return false;
      if (activePriceFilter === '25k-50k' && (p.price < 25000 || p.price > 50000)) return false;
      if (activePriceFilter === '>50k' && p.price <= 50000) return false;

      return true;
    });
  }, [products, searchQuery, activePriceFilter]);

  const handleSelectTrending = (term: string) => {
    setSearchQuery(term);
  };

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('collection');
  };

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Search Input Bar */}
      <section className="px-4 pt-3 pb-3 border-b border-neutral-100 bg-white sticky top-0 z-10">
        <div className="relative flex items-center bg-[#F7F7F8] border border-neutral-200/90 rounded-full px-3.5 py-2 focus-within:border-neutral-400 focus-within:bg-white shadow-2xs transition">
          <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0 stroke-[2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search earrings, rings, diamonds, gold coins..."
            autoFocus
            className="bg-transparent text-xs text-neutral-900 placeholder-neutral-400 w-full focus:outline-none border-none p-0 focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="flex items-center space-x-2 text-neutral-500 pl-1 border-l border-neutral-200">
            <button
              onClick={() => setIsVisualSearchOpen(true)}
              className="hover:text-neutral-900"
              title="Visual Search"
            >
              <Camera className="w-4 h-4 stroke-[1.8]" />
            </button>
            <button
              onClick={() => setSearchQuery('Diamond')}
              className="hover:text-neutral-900"
              title="Voice Search"
            >
              <Mic className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Price quick pills when searching */}
        {searchQuery.trim() && (
          <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar pt-2.5">
            {[
              { id: 'all', label: 'All Prices' },
              { id: '<25k', label: '< ₹25,000' },
              { id: '25k-50k', label: '₹25,000 - ₹50,000' },
              { id: '>50k', label: '> ₹50,000' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActivePriceFilter(f.id)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition ${
                  activePriceFilter === f.id
                    ? 'bg-[#8E5827] text-white font-medium shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Content Area */}
      {!searchQuery.trim() ? (
        <div className="p-4 space-y-6">
          {/* Trending Searches */}
          <div>
            <div className="flex items-center space-x-1.5 text-neutral-500 mb-2.5">
              <TrendingUp className="w-4 h-4 text-[#8E5827]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                Trending Searches
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSelectTrending(term)}
                  className="px-3 py-1.5 rounded-full border border-neutral-200/90 text-xs text-neutral-700 bg-white hover:border-[#8E5827] hover:text-[#8E5827] transition shadow-2xs flex items-center space-x-1.5"
                >
                  <Search className="w-3 h-3 text-neutral-400" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-2.5">
              Popular Categories
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'earrings' as CategoryId, name: 'Earrings', count: '12 276 Designs', img: '/images/rose_gold_earrings.jpg' },
                { id: 'rings' as CategoryId, name: 'Rings', count: '4 890 Designs', img: '/images/diamond_ring.jpg' },
                { id: 'necklaces' as CategoryId, name: 'Necklaces', count: '3 420 Designs', img: '/images/gold_necklace.jpg' },
                { id: 'bangles' as CategoryId, name: 'Bangles', count: '2 650 Designs', img: '/images/gold_bangle.jpg' },
              ].map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="p-2.5 rounded-xl border border-neutral-200/80 flex items-center space-x-2.5 cursor-pointer hover:border-[#8E5827] transition shadow-2xs group"
                >
                  <div className="w-11 h-11 rounded-lg bg-neutral-50 p-1 flex items-center justify-center shrink-0">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain group-hover:scale-105 transition" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xs font-semibold text-neutral-900 group-hover:text-[#8E5827]">
                      {cat.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400 block">{cat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gifting Banner Shortcut */}
          <div
            onClick={() => setActiveTab('gifting')}
            className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white cursor-pointer shadow-2xs flex items-center justify-between"
          >
            <div>
              <span className="text-[9px] uppercase tracking-widest text-amber-200 font-semibold block">
                SPECIAL CURATION
              </span>
              <h4 className="font-serif-luxury text-sm font-normal text-white mt-0.5">
                Luxury Jewellery Gifting
              </h4>
              <p className="text-[11px] text-neutral-300">Under ₹25,000 & Wedding Gifts</p>
            </div>
            <ChevronRight className="w-5 h-5 text-amber-200" />
          </div>
        </div>
      ) : (
        /* Results Grid */
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 text-xs text-neutral-500">
            <span>
              Showing <strong className="text-neutral-900">{searchResults.length}</strong> results for "{searchQuery}"
            </span>
            {searchResults.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('collection');
                }}
                className="text-[#8E5827] font-medium flex items-center space-x-0.5 hover:underline"
              >
                <span>View with Filters</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Search className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="font-serif-luxury text-base font-semibold text-neutral-900">
                No matching jewellery found
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                Try searching for 'earrings', 'rings', 'necklaces', 'bangles', or 'gold coins'
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-neutral-100 text-neutral-800 rounded-full text-xs font-medium hover:bg-neutral-200 transition"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {searchResults.map((product) => (
                <article
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-200/80 shadow-2xs flex flex-col justify-between cursor-pointer group hover:border-[#8E5827] transition"
                >
                  <div className="relative p-2 pb-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2.5 right-2.5 z-10 p-1 text-neutral-400 hover:text-[#8E5827] transition active:scale-90"
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 stroke-[1.6] ${
                          isInWishlist(product.id) ? 'text-[#8E5827] fill-[#8E5827]' : ''
                        }`}
                      />
                    </button>

                    <div className="w-full aspect-square bg-[#FCFAF8] flex items-center justify-center p-2 overflow-hidden rounded-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 pt-1.5 text-left">
                    <h3 className="font-serif-luxury text-xs font-normal text-neutral-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-[#8E5827]">
                      {product.name}
                    </h3>
                    <div className="mt-1">
                      <span className="text-xs font-semibold text-neutral-950 font-serif-luxury">
                        ₹ {product.price.toLocaleString('en-IN').replace(/,/g, ' ')}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
