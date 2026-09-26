'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CategoryId } from '@/types/jewellery';
import { ChevronRight, Sparkles, ArrowRight, SlidersHorizontal, Diamond } from 'lucide-react';

interface CategoryCard {
  id: CategoryId;
  name: string;
  subtitle: string;
  image: string;
  itemCount: number;
  subcategories: string[];
}

const CATEGORIES_LIST: CategoryCard[] = [
  {
    id: 'earrings',
    name: 'Earrings',
    subtitle: 'Studs, Hoops, Drops & Dangles',
    image: '/images/rose_gold_earrings.jpg',
    itemCount: 12276,
    subcategories: ['Studs', 'Hoops', 'Drops', 'Sui Dhaga']
  },
  {
    id: 'rings',
    name: 'Rings',
    subtitle: 'Solitaires, Cocktail & Bands',
    image: '/images/diamond_ring.jpg',
    itemCount: 4890,
    subcategories: ['Solitaires', 'Cocktail', 'Couple Bands', 'Daily Wear']
  },
  {
    id: 'necklaces',
    name: 'Necklaces & Chokers',
    subtitle: 'Royal Chokers, Pendants & Chains',
    image: '/images/gold_necklace.jpg',
    itemCount: 3420,
    subcategories: ['Bridal Chokers', 'Mangalsutras', 'Pendants', 'Chains']
  },
  {
    id: 'bangles',
    name: 'Bangles & Bracelets',
    subtitle: 'Kadas, Tennis & Heritage Bangles',
    image: '/images/gold_bangle.jpg',
    itemCount: 2650,
    subcategories: ['Gold Kadas', 'Diamond Tennis', 'Broad Bangles', 'Cuffs']
  },
  {
    id: 'gold-coins',
    name: '24KT Gold Coins',
    subtitle: '999.9 Purity Investment Bullion',
    image: '/images/gold_coin.jpg',
    itemCount: 120,
    subcategories: ['1 Gram', '2 Grams', '5 Grams', '10 Grams', '50 Grams']
  },
  {
    id: 'gifting',
    name: 'Luxury Gifting',
    subtitle: 'Curated for Love’s Finest Moments',
    image: '/images/wedding_gifts_banner.jpg',
    itemCount: 2542,
    subcategories: ['Under ₹25K', 'Wedding Gifts', 'Anniversary', 'First Salary']
  }
];

export function CategoriesDirectoryScreen() {
  const { setSelectedCategory, setActiveTab } = useApp();

  const handleSelectCategory = (catId: CategoryId) => {
    if (catId === 'gifting') {
      setActiveTab('gifting');
    } else {
      setSelectedCategory(catId);
      setActiveTab('collection');
    }
  };

  const handleBrowseAll = () => {
    setSelectedCategory('all');
    setActiveTab('collection');
  };

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Top Header with Switcher */}
      <section className="px-4 pt-4 pb-3 border-b border-neutral-100 bg-white">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h1 className="font-serif-luxury text-xl font-normal text-neutral-900 leading-tight">
              Categories
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Explore royal Jaipur handcrafted jewellery collections
            </p>
          </div>
        </div>

        {/* View Switcher: Categories vs Browse All */}
        <div className="flex bg-neutral-100 p-1 rounded-xl">
          <button
            className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-white text-neutral-900 shadow-2xs transition"
          >
            Explore Categories
          </button>
          <button
            onClick={handleBrowseAll}
            className="flex-1 py-1.5 text-xs font-medium rounded-lg text-neutral-600 hover:text-neutral-900 transition flex items-center justify-center space-x-1"
          >
            <span>All Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Solitaire Campaign Promo Card */}
      <section className="px-4 pt-3.5">
        <div
          onClick={() => {
            setSelectedCategory('rings');
            setActiveTab('collection');
          }}
          className="relative overflow-hidden rounded-xl bg-neutral-900 text-white p-4 cursor-pointer group shadow-2xs"
        >
          <img
            src="/images/solitaire_banner.jpg"
            alt="Solitaire Collection"
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10">
            <span className="text-[9px] uppercase tracking-widest text-amber-200 font-semibold block mb-0.5">
              ATELIER SPOTLIGHT
            </span>
            <h2 className="font-serif-luxury text-base font-normal text-white">
              Solitaire & Diamond Jewels
            </h2>
            <p className="text-[11px] text-neutral-300 mt-0.5 max-w-[220px]">
              Certified natural diamonds set in 18KT rose and white gold
            </p>
            <div className="mt-2.5 flex items-center space-x-1 text-xs text-amber-200 font-medium">
              <span>View Solitaires</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Categories Grid with Real Photos & Subcategories */}
      <section className="p-4 grid grid-cols-2 gap-3">
        {CATEGORIES_LIST.map((cat) => (
          <article
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className="bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-2xs hover:border-[#8E5827] cursor-pointer transition group flex flex-col justify-between"
          >
            {/* Real Product Image Frame */}
            <div className="w-full aspect-square bg-[#FCFAF8] p-3.5 flex items-center justify-center overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Category Info */}
            <div className="p-3 pt-1.5 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-[#8E5827]">
                  {cat.name}
                </h3>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#8E5827]" />
              </div>
              <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                {cat.subtitle}
              </p>
              <span className="text-[10px] text-[#8E5827] font-medium block mt-1">
                {cat.itemCount.toLocaleString('en-IN')} Designs
              </span>

              {/* Quick Subcategory Pills */}
              <div className="mt-2 pt-2 border-t border-neutral-100 flex flex-wrap gap-1">
                {cat.subcategories.slice(0, 2).map((sub) => (
                  <span
                    key={sub}
                    className="px-1.5 py-0.5 bg-neutral-100 text-[9px] text-neutral-600 rounded group-hover:bg-[#8E5827]/10 group-hover:text-[#8E5827] transition"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom Sticky Action: View Full Collection */}
      <section className="px-4 pt-1">
        <button
          onClick={handleBrowseAll}
          className="w-full py-3 bg-[#8E5827] text-white rounded-xl text-xs font-medium uppercase tracking-wider shadow-2xs hover:bg-[#76441B] transition flex items-center justify-center space-x-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Browse All Jewellery with Advance Filters</span>
        </button>
      </section>
    </div>
  );
}
