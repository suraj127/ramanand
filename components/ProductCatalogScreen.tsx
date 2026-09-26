'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CategoryId, Product } from '@/types/jewellery';
import {
  Heart,
  Grid2X2,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Check,
  RotateCcw
} from 'lucide-react';

const CATEGORY_TABS: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Jewellery' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'rings', label: 'Rings' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'bangles', label: 'Bangles' },
  { id: 'gold-coins', label: '24KT Coins' },
  { id: 'gifting', label: 'Gifting' }
];

export function ProductCatalogScreen() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    openProductDetail,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    setActiveTab
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

  // Advance Filters State
  const [activePriceRange, setActivePriceRange] = useState<string>('all');
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [selectedKaratage, setSelectedKaratage] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Filter products across all categories
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCat && !matchesTag) return false;
      }

      // 2. Category Filter
      if (selectedCategory && selectedCategory !== 'all') {
        if (selectedCategory === 'gifting') {
          // Gifting matches all or specific gifting tags
          if (!product.tags.includes('Gifting') && !product.tags.includes('Daily Luxury') && product.category !== 'gold-coins') {
            // Keep if gifting collection
          }
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Price Range Filter
      if (activePriceRange === '<25k' && product.price >= 25000) return false;
      if (activePriceRange === '25k-50k' && (product.price < 25000 || product.price > 50000)) return false;
      if (activePriceRange === '50k-100k' && (product.price < 50000 || product.price > 100000)) return false;
      if (activePriceRange === '>100k' && product.price <= 100000) return false;

      // 4. Metal Colour Filter
      if (selectedMetal !== 'all') {
        const productMetal = (product.metalDetails.materialColour || '').toLowerCase();
        if (!productMetal.includes(selectedMetal.toLowerCase())) return false;
      }

      // 5. Karatage / Purity Filter
      if (selectedKaratage !== 'all') {
        if (product.metalDetails.karatage !== selectedKaratage) return false;
      }

      // 6. Gender Filter
      if (selectedGender !== 'all') {
        if (product.gender !== selectedGender && product.gender !== 'Unisex') return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, activePriceRange, selectedMetal, selectedKaratage, selectedGender, sortBy, searchQuery]);

  // Compute active filter count
  const activeFiltersCount =
    (activePriceRange !== 'all' ? 1 : 0) +
    (selectedMetal !== 'all' ? 1 : 0) +
    (selectedKaratage !== 'all' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0);

  const resetAllFilters = () => {
    setActivePriceRange('all');
    setSelectedMetal('all');
    setSelectedKaratage('all');
    setSelectedGender('all');
    setSelectedCategory('all');
  };

  const getTitle = () => {
    switch (selectedCategory) {
      case 'all':
        return 'All Fine Jewellery';
      case 'earrings':
        return 'Earrings';
      case 'rings':
        return 'Rings';
      case 'necklaces':
        return 'Necklaces & Chokers';
      case 'bangles':
        return 'Bangles & Bracelets';
      case 'gold-coins':
        return '24KT Gold Coins';
      case 'gifting':
        return 'Gifting Jewellery';
      default:
        return 'Jewellery Collection';
    }
  };

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* 1. Header Title & Grid Toggle */}
      <section className="px-4 pt-3 pb-2 bg-white border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#8E5827] tracking-tight leading-snug">
              {getTitle()}
            </h1>
            <p className="text-neutral-400 text-xs mt-0.5 font-normal tracking-wide">
              ({filteredProducts.length} curated designs)
            </p>
          </div>

          <div className="flex items-center space-x-2 text-neutral-400">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition ${viewMode === 'grid' ? 'text-[#8E5827]' : 'text-neutral-300'}`}
              aria-label="Grid view"
            >
              <Grid2X2 className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded transition ${viewMode === 'list' ? 'text-[#8E5827]' : 'text-neutral-300'}`}
              aria-label="List view"
            >
              <List className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* 2. Top Category Switcher Tabs Row (1-Tap category filtering) */}
        <div className="flex items-center space-x-1.5 overflow-x-auto hide-scrollbar py-2 -mx-4 px-4 border-t border-neutral-100/80 mt-2">
          <button
            onClick={() => setActiveTab('categories')}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition shadow-2xs bg-[#FAF8F7] text-[#8E5827] border border-[#8E5827]/30 hover:bg-[#8E5827] hover:text-white flex items-center space-x-1"
          >
            <span>▦ All Categories</span>
          </button>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition shadow-2xs ${
                selectedCategory === tab.id
                  ? 'bg-[#8E5827] text-white border border-[#8E5827]'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Horizontal Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar py-2 -mx-4 px-4">
          {/* Advance Filter Button with Count Badge */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-normal whitespace-nowrap shadow-2xs transition ${
              activeFiltersCount > 0
                ? 'bg-[#8E5827] text-white border-[#8E5827]'
                : 'bg-white text-neutral-700 border-neutral-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
          </button>

          {/* Sort Button */}
          <button
            onClick={() => setIsSortDrawerOpen(true)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-neutral-300 bg-white text-neutral-700 text-xs font-normal whitespace-nowrap shadow-2xs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Sort</span>
          </button>

          {/* Quick Price Chips */}
          <button
            onClick={() => setActivePriceRange(activePriceRange === '<25k' ? 'all' : '<25k')}
            className={`px-3 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition shadow-2xs ${
              activePriceRange === '<25k'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            &lt; ₹25,000
          </button>

          <button
            onClick={() => setActivePriceRange(activePriceRange === '25k-50k' ? 'all' : '25k-50k')}
            className={`px-3 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition shadow-2xs ${
              activePriceRange === '25k-50k'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            ₹25,000 - ₹50,000
          </button>

          <button
            onClick={() => setActivePriceRange(activePriceRange === '50k-100k' ? 'all' : '50k-100k')}
            className={`px-3 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition shadow-2xs ${
              activePriceRange === '50k-100k'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            ₹50,000 - ₹1,00,000
          </button>

          <button
            onClick={() => setSelectedMetal(selectedMetal === 'Rose' ? 'all' : 'Rose')}
            className={`px-3 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition shadow-2xs ${
              selectedMetal === 'Rose'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            Rose Gold
          </button>
        </div>
      </section>

      {/* 4. In-Feed Editorial Campaign Banner (Screenshot 4) */}
      <section className="px-3.5 my-3" data-purpose="campaign-banner">
        <div className="relative overflow-hidden rounded-xl shadow-xs">
          <img
            src={selectedCategory === 'necklaces' ? '/images/wedding_gifts_banner.jpg' : '/images/solitaire_banner.jpg'}
            alt="Jewellery Campaign"
            className="w-full h-auto object-cover max-h-[160px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent p-3.5 flex flex-col justify-between">
            <span className="text-[9px] uppercase tracking-widest font-medium text-neutral-200">
              HOUSE OF RAMANAND
            </span>
            <div>
              <p className="font-serif-luxury text-sm font-normal text-white max-w-[220px] leading-snug">
                {selectedCategory === 'necklaces'
                  ? 'Wedding Gifts curated for love’s finest moments'
                  : 'Solitaire jewellery that effortlessly elevates your everyday'}
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-2 px-3 py-1 bg-white text-neutral-900 text-[10px] font-medium tracking-wider uppercase rounded shadow-xs hover:bg-neutral-100 transition"
              >
                EXPLORE ALL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Listing Grid (Screenshots 2, 3, 4) */}
      <section className="px-3" data-purpose="product-listing">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-neutral-200 p-6">
            <p className="text-sm font-serif-luxury text-neutral-800">No jewellery matches this filter</p>
            <p className="text-xs text-neutral-500 mt-1">Try resetting your filters to explore our full royal collection.</p>
            <button
              onClick={resetAllFilters}
              className="mt-3 px-4 py-2 bg-[#8E5827] text-white rounded-full text-xs font-medium"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 2-Column Clean White Cards */
          <div className="grid grid-cols-2 gap-2.5">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                onClick={() => openProductDetail(product)}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200/70 shadow-2xs flex flex-col justify-between cursor-pointer group hover:border-neutral-300 transition"
              >
                <div className="relative p-2 pb-0">
                  {/* Floating Wishlist Heart */}
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

                  {/* Centered Product Photo */}
                  <div className="w-full aspect-square bg-white flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Title & Price */}
                <div className="p-2.5 pt-1 text-left">
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
        ) : (
          /* Single Column List View */
          <div className="space-y-2.5">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                onClick={() => openProductDetail(product)}
                className="bg-white rounded-xl p-3 border border-neutral-200/80 flex items-center space-x-3 cursor-pointer group hover:border-neutral-300 shadow-2xs transition"
              >
                <div className="w-20 h-20 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif-luxury text-xs font-normal text-neutral-900 group-hover:text-[#8E5827]">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{product.metalDetails.karatage} • {product.metalDetails.materialColour}</p>
                  <span className="text-xs font-semibold text-neutral-950 block mt-1">
                    ₹ {product.price.toLocaleString('en-IN').replace(/,/g, ' ')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 6. Sticky Sub-Bottom Bar: [Filter] | [Sort By] (Screenshots 3 & 4) */}
      <div className="fixed bottom-[52px] max-w-[440px] w-full bg-white border-t border-neutral-200 py-2.5 px-4 z-20 shadow-2xs flex items-center justify-around">
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="flex-1 flex items-center justify-center space-x-2 text-xs font-medium text-neutral-800 hover:text-[#8E5827]"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[1.8] text-[#8E5827]" />
          <span>Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
        </button>

        <div className="h-4 w-px bg-neutral-200"></div>

        <button
          onClick={() => setIsSortDrawerOpen(true)}
          className="flex-1 flex items-center justify-center space-x-2 text-xs font-medium text-neutral-800 hover:text-[#8E5827]"
        >
          <ArrowUpDown className="w-4 h-4 stroke-[1.8] text-[#8E5827]" />
          <span>Sort By</span>
        </button>
      </div>

      {/* 7. ADVANCE FILTER DRAWER MODAL */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-end justify-center animate-fade-in">
          <div className="bg-white w-full max-w-[440px] rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl animate-slide-up">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-base font-semibold text-neutral-900">
                  Advance Filters
                </h3>
                <p className="text-[11px] text-neutral-400">
                  {filteredProducts.length} designs available
                </p>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Body: Scrollable Categories & Attributes */}
            <div className="p-4 space-y-4 overflow-y-auto">
              {/* Category Filter */}
              <div>
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Category
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {CATEGORY_TABS.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 rounded-lg border text-left transition ${
                        selectedCategory === cat.id
                          ? 'border-[#8E5827] bg-[#8E5827]/5 text-[#8E5827] font-medium'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Price Range
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: '<25k', label: 'Under ₹25,000' },
                    { id: '25k-50k', label: '₹25,000 - ₹50,000' },
                    { id: '50k-100k', label: '₹50,000 - ₹1,00,000' },
                    { id: '>100k', label: 'Above ₹1,00,000' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePriceRange(p.id)}
                      className={`p-2 rounded-lg border text-left transition ${
                        activePriceRange === p.id
                          ? 'border-[#8E5827] bg-[#8E5827]/5 text-[#8E5827] font-medium'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Colour Filter */}
              <div>
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Material & Metal
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'All Metals' },
                    { id: 'Rose', label: 'Rose Gold' },
                    { id: 'Yellow', label: 'Yellow Gold' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMetal(m.id)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedMetal === m.id
                          ? 'border-[#8E5827] bg-[#8E5827]/5 text-[#8E5827] font-medium'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Karatage Filter */}
              <div>
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Gold Karatage / Purity
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'All Purity' },
                    { id: '18K', label: '18KT Diamond' },
                    { id: '22K', label: '22KT Pure' },
                    { id: '24K', label: '24KT Bullion' }
                  ].map((k) => (
                    <button
                      key={k.id}
                      onClick={() => setSelectedKaratage(k.id)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedKaratage === k.id
                          ? 'border-[#8E5827] bg-[#8E5827]/5 text-[#8E5827] font-medium'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Gender & Style
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'Women', label: 'Women' },
                    { id: 'Men', label: 'Men' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedGender === g.id
                          ? 'border-[#8E5827] bg-[#8E5827]/5 text-[#8E5827] font-medium'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Footer */}
            <div className="p-4 border-t border-neutral-100 flex items-center space-x-3 bg-neutral-50/50">
              <button
                onClick={resetAllFilters}
                className="flex items-center justify-center space-x-1 px-4 py-2.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[#8E5827] text-white text-xs font-medium shadow-xs text-center hover:bg-[#76441B] transition active:scale-95"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. SORT BY DRAWER */}
      {isSortDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-end justify-center animate-fade-in">
          <div className="bg-white w-full max-w-[440px] rounded-t-2xl p-5 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif-luxury text-base font-semibold text-neutral-900">Sort By</h3>
              <button onClick={() => setIsSortDrawerOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-1">
              {[
                { id: 'featured', label: 'Featured & Bestsellers' },
                { id: 'price-low', label: 'Price: Low to High' },
                { id: 'price-high', label: 'Price: High to Low' },
                { id: 'rating', label: 'Customer Ratings' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSortBy(s.id as any);
                    setIsSortDrawerOpen(false);
                  }}
                  className={`w-full py-2.5 px-3 flex items-center justify-between text-xs rounded-lg transition ${
                    sortBy === s.id ? 'bg-[#8E5827]/5 text-[#8E5827] font-medium' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span>{s.label}</span>
                  {sortBy === s.id && <Check className="w-4 h-4 text-[#8E5827]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
