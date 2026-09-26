'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  Grid2X2,
  List,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';

interface GiftProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  sku: string;
  category: string;
}

const GIFT_PRODUCTS: GiftProduct[] = [
  {
    id: 'gift-ring-01',
    name: 'Royal Blossom Diamond & Rose Gold Ring',
    price: 22400,
    image: '/images/diamond_ring.jpg',
    sku: '502995RNGAA092JA102',
    category: 'rings'
  },
  {
    id: 'gift-neck-01',
    name: 'Teardrop Solitaire Diamond Pendant Necklace',
    price: 38500,
    image: '/images/gold_necklace.jpg',
    sku: '502995NCKAA092JA204',
    category: 'necklaces'
  },
  {
    id: 'gift-coin-01',
    name: 'Lakshmi Royal 24KT Gold Coin (5 Grams)',
    price: 44250,
    image: '/images/gold_coin.jpg',
    sku: '502995GCNAA092JA505',
    category: 'gold-coins'
  },
  {
    id: 'gift-bangle-01',
    name: 'Handcrafted Heritage 22K Gold Filigree Bangle',
    price: 64200,
    image: '/images/gold_bangle.jpg',
    sku: '502995BNGAA092JA306',
    category: 'bangles'
  },
  {
    id: 'hor-ear-001',
    name: 'Stunning Rose Gold and Diamond Hoop Earrings',
    price: 54710,
    image: '/images/rose_gold_earrings.jpg',
    sku: '502995HTEAAA092JA303027',
    category: 'earrings'
  },
  {
    id: 'hor-ear-stud',
    name: 'Elegant Chic Diamond Stud Earrings',
    price: 67368,
    image: '/images/diamond_stud_earrings.jpg',
    sku: '502995ECDEAA092JA308821',
    category: 'earrings'
  }
];

export function GiftingScreen() {
  const {
    openProductDetail,
    toggleWishlist,
    isInWishlist,
    products
  } = useApp();

  const [activePriceRange, setActivePriceRange] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = GIFT_PRODUCTS.filter((p) => {
    if (activePriceRange === '<25k' && p.price >= 25000) return false;
    if (activePriceRange === '25k-50k' && (p.price < 25000 || p.price > 50000)) return false;
    if (activePriceRange === '>50k' && p.price <= 50000) return false;
    return true;
  });

  const handleCardClick = (gift: GiftProduct) => {
    const fullProduct = products.find((p) => p.id === gift.id) || {
      id: gift.id,
      sku: gift.sku,
      name: gift.name,
      category: gift.category as any,
      gender: 'Women',
      price: gift.price,
      originalPrice: gift.price + 3500,
      images: [gift.image, gift.image],
      description: 'An exemplary luxury gift from the House of Ramanand private atelier.',
      inStock: true,
      stockCount: 15,
      purityBadge: '18KT Hallmark',
      tags: ['Luxury Gifting', 'Heritage'],
      metalDetails: {
        karatage: '18K',
        materialColour: 'Rose Gold',
        grossWeight: 2.108,
        netGoldWeight: 2.078,
        metalType: 'Gold',
        purityScore: '18KT 750'
      },
      priceBreakup: {
        goldValue: Math.round(gift.price * 0.45),
        diamondValue: Math.round(gift.price * 0.35),
        makingCharges: Math.round(gift.price * 0.15),
        discount: 0,
        gst: Math.round(gift.price * 0.03),
        total: gift.price
      },
      rating: 4.9,
      reviewCount: 28
    };
    openProductDetail(fullProduct as any);
  };

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* 1. Category Header: Gifting Jewellery */}
      <section className="px-4 pt-3 pb-2 bg-white border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#8E5827] tracking-tight leading-snug">
              Gifting Jewellery
            </h1>
            <p className="text-neutral-400 text-xs mt-0.5 font-normal tracking-wide">
              (2542 results)
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

        {/* Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar py-2.5 -mx-4 px-4 mt-1">
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-neutral-300 bg-white text-neutral-700 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-neutral-300 bg-white text-neutral-700 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>
          <button
            onClick={() => setActivePriceRange(activePriceRange === '<25k' ? 'all' : '<25k')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition ${
              activePriceRange === '<25k'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            &lt; ₹25,000
          </button>
          <button
            onClick={() => setActivePriceRange(activePriceRange === '25k-50k' ? 'all' : '25k-50k')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition ${
              activePriceRange === '25k-50k'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            ₹25,000 - ₹50,000
          </button>
          <button
            onClick={() => setActivePriceRange(activePriceRange === '>50k' ? 'all' : '>50k')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-normal whitespace-nowrap transition ${
              activePriceRange === '>50k'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-300'
            }`}
          >
            &gt; ₹50,000
          </button>
        </div>
      </section>

      {/* 2. Editorial Campaign Banner (Screenshot 3: Wedding Gifts) */}
      <section className="px-3.5 my-3" data-purpose="wedding-gifts-banner">
        <div className="relative overflow-hidden rounded-xl shadow-xs">
          <img
            src="/images/wedding_gifts_banner.jpg"
            alt="Wedding Gifts Curated for Love's Finest Moments"
            className="w-full h-auto object-cover max-h-[160px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent p-3.5 flex flex-col justify-between">
            <span className="text-[9px] uppercase tracking-widest font-medium text-amber-200">
              HOUSE OF RAMANAND
            </span>
            <div>
              <h2 className="font-serif-luxury text-base font-normal text-white leading-tight">
                Wedding Gifts
              </h2>
              <p className="text-[11px] text-neutral-200 font-light mt-0.5 max-w-[200px]">
                Curated for Love’s Finest Moments
              </p>
              <button className="mt-2 px-3 py-1 bg-white text-neutral-900 text-[10px] font-medium tracking-wider uppercase rounded shadow-xs hover:bg-neutral-100 transition">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Cards Grid (Matching Screenshot 3) */}
      <section className="px-3">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-2.5">
            {filtered.map((item) => (
              <article
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-xl overflow-hidden border border-neutral-200/70 shadow-2xs flex flex-col justify-between cursor-pointer group hover:border-neutral-300 transition"
              >
                <div className="relative p-2 pb-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item.id);
                    }}
                    className="absolute top-2.5 right-2.5 z-10 p-1 text-neutral-400 hover:text-[#8E5827] transition active:scale-90"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.6] ${
                        isInWishlist(item.id) ? 'text-[#8E5827] fill-[#8E5827]' : ''
                      }`}
                    />
                  </button>

                  <div className="w-full aspect-square bg-white flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="p-2.5 pt-1 text-left">
                  <h3 className="font-serif-luxury text-xs font-normal text-neutral-900 leading-snug line-clamp-2 min-h-[32px] group-hover:text-[#8E5827]">
                    {item.name}
                  </h3>
                  <div className="mt-1">
                    <span className="text-xs font-semibold text-neutral-950 font-serif-luxury">
                      ₹ {item.price.toLocaleString('en-IN').replace(/,/g, ' ')}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((item) => (
              <article
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-xl p-3 border border-neutral-200/80 flex items-center space-x-3 cursor-pointer group hover:border-neutral-300 shadow-2xs transition"
              >
                <div className="w-20 h-20 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif-luxury text-xs font-normal text-neutral-900 group-hover:text-[#8E5827]">
                    {item.name}
                  </h3>
                  <span className="text-xs font-semibold text-neutral-950 block mt-1">
                    ₹ {item.price.toLocaleString('en-IN').replace(/,/g, ' ')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Sticky Sub-Bottom Bar: [Filter] | [Sort By] */}
      <div className="fixed bottom-[52px] max-w-[440px] w-full bg-white border-t border-neutral-200 py-2.5 px-4 z-20 shadow-2xs flex items-center justify-around">
        <button className="flex-1 flex items-center justify-center space-x-2 text-xs font-medium text-neutral-800 hover:text-[#8E5827]">
          <SlidersHorizontal className="w-4 h-4 stroke-[1.8] text-[#8E5827]" />
          <span>Filter</span>
        </button>

        <div className="h-4 w-px bg-neutral-200"></div>

        <button className="flex-1 flex items-center justify-center space-x-2 text-xs font-medium text-neutral-800 hover:text-[#8E5827]">
          <ArrowUpDown className="w-4 h-4 stroke-[1.8] text-[#8E5827]" />
          <span>Sort By</span>
        </button>
      </div>
    </div>
  );
}
