'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { CategoryId, Product } from '@/types/jewellery';
import {
  Sparkles,
  ArrowRight,
  Heart,
  ChevronRight,
  Store,
  Coins,
  ShieldCheck,
  Gift,
  Diamond,
  Gem,
  CheckCircle2
} from 'lucide-react';

interface QuickCategory {
  id: CategoryId;
  name: string;
  image: string;
}

const QUICK_CATEGORIES: QuickCategory[] = [
  { id: 'earrings', name: 'Earrings', image: '/images/rose_gold_earrings.jpg' },
  { id: 'rings', name: 'Rings', image: '/images/diamond_ring.jpg' },
  { id: 'necklaces', name: 'Necklaces', image: '/images/gold_necklace.jpg' },
  { id: 'bangles', name: 'Bangles', image: '/images/gold_bangle.jpg' },
  { id: 'gold-coins', name: 'Gold Coins', image: '/images/gold_coin.jpg' },
  { id: 'gifting', name: 'Gifting', image: '/images/wedding_gifts_banner.jpg' }
];

// Flourish Divider matching Screenshot 2, 3, 4
function FlourishDivider() {
  return (
    <div className="flex items-center justify-center my-3.5 select-none">
      <div className="h-px bg-neutral-200 w-16"></div>
      <div className="mx-2.5 flex items-center text-[#8E5827]">
        <svg className="w-12 h-3 fill-current" viewBox="0 0 100 20">
          <path d="M50 0 C45 8, 35 10, 20 10 C35 10, 45 12, 50 20 C55 12, 65 10, 80 10 C65 10, 55 8, 50 0 Z" />
        </svg>
      </div>
      <div className="h-px bg-neutral-200 w-16"></div>
    </div>
  );
}

export function HomeScreen() {
  const {
    products,
    banners,
    setActiveTab,
    setSelectedCategory,
    openProductDetail,
    toggleWishlist,
    isInWishlist,
    digiGoldRate
  } = useApp();

  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const activeBanner = banners[currentBannerIdx] || banners[0];

  const handleCategorySelect = (catId: CategoryId) => {
    setSelectedCategory(catId);
    if (catId === 'gifting') {
      setActiveTab('gifting');
    } else {
      setActiveTab('collection');
    }
  };

  const featuredEarrings = products.filter((p) => p.category === 'earrings').slice(0, 4);

  return (
    <div className="space-y-6 pb-28 bg-white">
      {/* 1. Quick Category Circles with Real High-Res Photos */}
      <section className="pt-3 pb-1 bg-white border-b border-neutral-100" data-purpose="quick-categories">
        <div className="flex items-center space-x-3.5 overflow-x-auto hide-scrollbar px-4">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#FBF9F7] border border-neutral-200/90 shadow-2xs group-hover:scale-105 group-hover:border-[#8E5827] transition-all p-1 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-normal text-neutral-800 mt-1.5 group-hover:text-[#8E5827]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Premium Hero Campaign Banner Slider */}
      <section className="px-4" data-purpose="hero-banner">
        <div className="relative overflow-hidden rounded-2xl shadow-xs bg-neutral-900">
          <img
            src={activeBanner.image || '/images/royal_jaipur_heritage_banner.jpg'}
            alt={activeBanner.title}
            className="w-full h-[220px] sm:h-[240px] object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent p-5 flex flex-col justify-between">
            <span className="text-[9px] uppercase tracking-widest text-amber-200 font-semibold">
              {activeBanner.highlightText || 'HOUSE OF RAMANAND JAIPUR'}
            </span>

            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-normal text-white leading-tight">
                {activeBanner.title}
              </h2>
              <p className="text-xs text-neutral-200 font-light mt-1.5 max-w-[240px] line-clamp-2">
                {activeBanner.subtitle}
              </p>
              <button
                onClick={() => handleCategorySelect(activeBanner.targetCategory)}
                className="mt-3.5 px-4 py-1.5 bg-white text-neutral-950 text-[10px] font-medium tracking-wider uppercase rounded shadow-xs hover:bg-neutral-100 transition active:scale-95 flex items-center space-x-1.5"
              >
                <span>{activeBanner.ctaText || 'SHOP NOW'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-1.5 mt-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBannerIdx(i)}
                  className={`transition-all rounded-full ${
                    currentBannerIdx === i
                      ? 'w-6 h-1 bg-white'
                      : 'w-1.5 h-1 bg-white/40'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curated Earrings Showcase (Screenshot 2 preview) */}
      <section className="px-4 pt-1">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-serif-luxury text-base font-medium text-neutral-900">
              Curated Earrings
            </h2>
            <p className="text-[11px] text-neutral-400">
              Handcrafted in 18K & 22K gold with certified diamonds
            </p>
          </div>
          <button
            onClick={() => handleCategorySelect('earrings')}
            className="text-xs text-[#8E5827] hover:underline font-medium flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {featuredEarrings.map((product) => (
            <article
              key={product.id}
              onClick={() => openProductDetail(product)}
              className="bg-white rounded-xl overflow-hidden border border-neutral-200/70 shadow-2xs flex flex-col justify-between cursor-pointer group hover:border-neutral-300 transition"
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
      </section>

      {/* 5. NEW SECTION: "Shop by Gender" (Screenshot 2) */}
      <section className="px-4 pt-2" data-purpose="shop-by-gender">
        <div className="text-center">
          <h2 className="font-serif-luxury text-xl font-normal text-[#8E5827] leading-snug">
            Shop by Gender
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            First-class jewelry for first-class Men, Women & Children.
          </p>
          <FlourishDivider />
        </div>

        <div className="space-y-3 mt-2">
          {/* Top Row: Men & Kids */}
          <div className="grid grid-cols-2 gap-3">
            {/* Men */}
            <article
              onClick={() => {
                setSelectedCategory('rings');
                setActiveTab('collection');
              }}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs group cursor-pointer hover:border-[#8E5827] transition"
            >
              <div className="h-44 w-full overflow-hidden bg-neutral-900">
                <img
                  src="/images/gender_men.jpg"
                  alt="Men's Jewellery"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5 flex items-center justify-between bg-white">
                <span className="font-serif-luxury text-sm font-semibold text-neutral-900">Men</span>
                <span className="text-xs text-neutral-500 group-hover:text-[#8E5827] flex items-center">
                  Explore <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </article>

            {/* Kids */}
            <article
              onClick={() => {
                setSelectedCategory('earrings');
                setActiveTab('collection');
              }}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs group cursor-pointer hover:border-[#8E5827] transition"
            >
              <div className="h-44 w-full overflow-hidden bg-neutral-100">
                <img
                  src="/images/gender_kids.jpg"
                  alt="Kids Jewellery"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5 flex items-center justify-between bg-white">
                <span className="font-serif-luxury text-sm font-semibold text-neutral-900">Kids</span>
                <span className="text-xs text-neutral-500 group-hover:text-[#8E5827] flex items-center">
                  Explore <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </article>
          </div>

          {/* Bottom Full Width: Women */}
          <article
            onClick={() => {
              setSelectedCategory('necklaces');
              setActiveTab('collection');
            }}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs group cursor-pointer hover:border-[#8E5827] transition"
          >
            <div className="h-48 w-full overflow-hidden bg-neutral-100 relative">
              <img
                src="/images/gender_women.jpg"
                alt="Women's Fine Jewellery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 flex items-center justify-between bg-white">
              <span className="font-serif-luxury text-base font-semibold text-neutral-900">Women</span>
              <span className="text-xs text-neutral-500 group-hover:text-[#8E5827] flex items-center font-medium">
                Explore <ChevronRight className="w-4 h-4 ml-0.5" />
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* 6. NEW SECTION: "Shop the Look" (Screenshot 4 & 5) */}
      <section className="px-4 pt-2" data-purpose="shop-the-look">
        <div className="text-center">
          <h2 className="font-serif-luxury text-xl font-normal text-[#8E5827] leading-snug">
            Shop the Look
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Discover your timeless style and reveal your unique look!
          </p>
          <FlourishDivider />
          <div className="mt-1 mb-3">
            <span className="font-serif-luxury text-base font-medium text-neutral-800 tracking-wide">
              Classy
            </span>
          </div>
        </div>

        {/* 2 Editorial Portrait photos side-by-side */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl overflow-hidden aspect-[3/4] bg-neutral-100 shadow-2xs border border-neutral-200">
            <img
              src="/images/model_look_1.jpg"
              alt="Editorial look 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-[3/4] bg-neutral-100 shadow-2xs border border-neutral-200">
            <img
              src="/images/model_look_2.jpg"
              alt="Editorial look 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Items in the look horizontal scroll */}
        <div className="mt-4">
          <h3 className="font-serif-luxury text-sm font-semibold text-neutral-900 mb-2.5">
            Items in the look
          </h3>

          <div className="flex items-center space-x-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
            {/* Card 1 */}
            <article
              onClick={() => {
                if (products[2]) openProductDetail(products[2]);
              }}
              className="min-w-[190px] max-w-[190px] bg-white rounded-xl border border-neutral-200/90 p-2.5 shadow-2xs cursor-pointer group flex-shrink-0"
            >
              <div className="relative aspect-square bg-[#FCFAF8] rounded-lg p-2 overflow-hidden flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (products[2]) toggleWishlist(products[2].id);
                  }}
                  className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-[#8E5827]"
                >
                  <Heart className="w-3.5 h-3.5 stroke-[1.6]" />
                </button>
                <img
                  src="/images/gold_necklace.jpg"
                  alt="Diamond Pendant"
                  className="w-full h-full object-contain group-hover:scale-105 transition"
                />
              </div>
              <div className="mt-2">
                <h4 className="font-serif-luxury text-xs text-neutral-900 line-clamp-2 leading-snug">
                  Void Frame Diamond Pendant with Chain
                </h4>
                <p className="text-xs font-bold text-neutral-950 font-serif-luxury mt-1">
                  ₹ 37 246
                </p>
              </div>
            </article>

            {/* Card 2 */}
            <article
              onClick={() => {
                if (products[1]) openProductDetail(products[1]);
              }}
              className="min-w-[190px] max-w-[190px] bg-white rounded-xl border border-neutral-200/90 p-2.5 shadow-2xs cursor-pointer group flex-shrink-0"
            >
              <div className="relative aspect-square bg-[#FCFAF8] rounded-lg p-2 overflow-hidden flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (products[1]) toggleWishlist(products[1].id);
                  }}
                  className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-[#8E5827]"
                >
                  <Heart className="w-3.5 h-3.5 stroke-[1.6]" />
                </button>
                <img
                  src="/images/mesh_drop_earrings.jpg"
                  alt="Prism Star Diamond Pendant"
                  className="w-full h-full object-contain group-hover:scale-105 transition"
                />
              </div>
              <div className="mt-2">
                <h4 className="font-serif-luxury text-xs text-neutral-900 line-clamp-2 leading-snug">
                  Prism Star Diamond Pendant with Chain
                </h4>
                <div className="mt-1 flex items-center text-xs text-[#8E5827] font-medium">
                  <span>Explore the product</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article
              onClick={() => {
                if (products[0]) openProductDetail(products[0]);
              }}
              className="min-w-[190px] max-w-[190px] bg-white rounded-xl border border-neutral-200/90 p-2.5 shadow-2xs cursor-pointer group flex-shrink-0"
            >
              <div className="relative aspect-square bg-[#FCFAF8] rounded-lg p-2 overflow-hidden flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (products[0]) toggleWishlist(products[0].id);
                  }}
                  className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-[#8E5827]"
                >
                  <Heart className="w-3.5 h-3.5 stroke-[1.6]" />
                </button>
                <img
                  src="/images/rose_gold_earrings.jpg"
                  alt="Rose Gold Hoops"
                  className="w-full h-full object-contain group-hover:scale-105 transition"
                />
              </div>
              <div className="mt-2">
                <h4 className="font-serif-luxury text-xs text-neutral-900 line-clamp-2 leading-snug">
                  Stunning Rose Gold Hoop Earrings
                </h4>
                <p className="text-xs font-bold text-neutral-950 font-serif-luxury mt-1">
                  ₹ 54 710
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. NEW SECTION: "When It Rings True" (Screenshot 3 & 5) */}
      <section className="px-4 pt-2" data-purpose="when-it-rings-true">
        <div className="text-center">
          <h2 className="font-serif-luxury text-xl font-normal text-[#8E5827] leading-snug">
            When It Rings True
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            A Perfect Match For Your Perfect Match
          </p>
          <FlourishDivider />
        </div>

        {/* Engagement Rings Hero Card */}
        <div
          onClick={() => {
            setSelectedCategory('rings');
            setActiveTab('collection');
          }}
          className="bg-[#F8F4EE] rounded-2xl p-4 border border-[#E9DFD1] shadow-2xs cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E5827]">
                ENGAGEMENT RINGS
              </span>
              <h3 className="font-serif-luxury text-base font-semibold text-neutral-900">
                When It Rings True
              </h3>
              <p className="text-xs text-neutral-600 max-w-[180px]">
                Find the perfect ring for your perfect match!
              </p>
              <button className="mt-2 px-3 py-1 bg-[#8E5827] text-white text-[11px] font-medium rounded-full flex items-center space-x-1 shadow-2xs group-hover:bg-[#76441B] transition">
                <span>Explore Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="w-24 h-24 rounded-full bg-white p-2 border border-neutral-200/80 shadow-2xs flex items-center justify-center overflow-hidden">
              <img
                src="/images/couple_rings.jpg"
                alt="Couple Rings"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition"
              />
            </div>
          </div>
        </div>

        {/* 2-Column: Gold vs Diamond Ring options */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Gold Ring Card */}
          <div
            onClick={() => {
              setSelectedCategory('rings');
              setActiveTab('collection');
            }}
            className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200/90 text-center cursor-pointer group hover:border-[#8E5827] transition shadow-2xs relative"
          >
            {/* Corner Bracket accents */}
            <div className="w-full aspect-square flex items-center justify-center p-2 bg-white rounded-lg border border-neutral-100 overflow-hidden">
              <img
                src="/images/gold_ring_card.jpg"
                alt="Gold Ring"
                className="w-full h-full object-cover rounded-md group-hover:scale-105 transition"
              />
            </div>
            <span className="font-serif-luxury text-xs font-semibold text-neutral-900 mt-2 block group-hover:text-[#8E5827]">
              Gold
            </span>
          </div>

          {/* Diamond Ring Card */}
          <div
            onClick={() => {
              setSelectedCategory('rings');
              setActiveTab('collection');
            }}
            className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200/90 text-center cursor-pointer group hover:border-[#8E5827] transition shadow-2xs relative"
          >
            <div className="w-full aspect-square flex items-center justify-center p-2 bg-white rounded-lg border border-neutral-100">
              <img
                src="/images/solitaire_banner.jpg"
                alt="Diamond Ring"
                className="w-full h-full object-cover rounded-md group-hover:scale-105 transition"
              />
            </div>
            <span className="font-serif-luxury text-xs font-semibold text-neutral-900 mt-2 block group-hover:text-[#8E5827]">
              Diamond
            </span>
          </div>
        </div>
      </section>

      {/* 8. NEW SECTION: "Blessings That Shine in Silver & 24K Gold" (Screenshot 1) */}
      <section className="px-4 pt-1" data-purpose="blessings-silver">
        <div
          onClick={() => {
            setSelectedCategory('gold-coins');
            setActiveTab('collection');
          }}
          className="relative overflow-hidden rounded-2xl bg-[#4A2A0C] text-white p-5 cursor-pointer shadow-xs group min-h-[160px] flex flex-col justify-center"
        >
          <img
            src="/images/silver_blessings.jpg"
            alt="Silver Blessings"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200">
              SACRED ATELIER
            </span>
            <h3 className="font-serif-luxury text-xl font-normal text-white">
              Blessings That Shine in Silver
            </h3>
            <p className="text-xs text-neutral-200 max-w-[240px]">
              Bring home beautifully crafted pure 999 silver idols & auspicious 24KT gold coins.
            </p>
            <div className="pt-2">
              <button className="px-4 py-1.5 bg-white text-[#4A2A0C] text-xs font-medium uppercase tracking-wider rounded shadow-xs hover:bg-neutral-100 transition">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. NEW SECTION: "Royal Jaipur Bridal Collection" */}
      <section className="px-4 pt-1" data-purpose="bridal-collection">
        <div className="text-center">
          <h2 className="font-serif-luxury text-xl font-normal text-[#8E5827] leading-snug">
            The Royal Bridal Collection
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5 max-w-[280px] mx-auto">
            Imperial Jaipur trousseau handcrafted with uncut Polki diamonds, Zambian emeralds & 22KT gold.
          </p>
          <FlourishDivider />
        </div>

        {/* Hero Bridal Editorial Card */}
        <div
          onClick={() => {
            setSelectedCategory('necklaces');
            setActiveTab('collection');
          }}
          className="relative overflow-hidden rounded-2xl bg-neutral-950 text-white cursor-pointer group shadow-2xs"
        >
          <img
            src="/images/royal_jaipur_heritage_banner.jpg"
            alt="Royal Jaipur Bridal Jewellery"
            className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
            <span className="text-[9px] uppercase tracking-widest text-amber-200 font-semibold mb-1">
              HERITAGE ATELIER JAIPUR
            </span>
            <h3 className="font-serif-luxury text-lg font-normal text-white leading-tight">
              Padmavati Royal Polki Choker
            </h3>
            <p className="text-xs text-neutral-300 font-light mt-0.5 line-clamp-1">
              Hand-set uncut syndicate diamonds, natural pearls & carved Colombian emeralds.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs font-serif-luxury text-amber-200 font-semibold">
                Bespoke Bridal Craftsmanship
              </span>
              <button className="px-3.5 py-1.5 bg-[#8E5827] text-white text-[11px] font-medium uppercase tracking-wider rounded-full shadow-2xs hover:bg-[#76441B] transition flex items-center space-x-1">
                <span>View Collection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Bridal Curations Row */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
          <div
            onClick={() => {
              setSelectedCategory('necklaces');
              setActiveTab('collection');
            }}
            className="p-2 bg-[#FAF8F5] rounded-xl border border-neutral-200/90 cursor-pointer group hover:border-[#8E5827] transition shadow-2xs"
          >
            <div className="w-full aspect-square bg-white rounded-lg p-1 overflow-hidden flex items-center justify-center">
              <img
                src="/images/gold_necklace.jpg"
                alt="Bridal Chokers"
                className="w-full h-full object-contain group-hover:scale-105 transition"
              />
            </div>
            <span className="font-serif-luxury text-[11px] font-semibold text-neutral-900 mt-1.5 block group-hover:text-[#8E5827]">
              Royal Chokers
            </span>
          </div>

          <div
            onClick={() => {
              setSelectedCategory('bangles');
              setActiveTab('collection');
            }}
            className="p-2 bg-[#FAF8F5] rounded-xl border border-neutral-200/90 cursor-pointer group hover:border-[#8E5827] transition shadow-2xs"
          >
            <div className="w-full aspect-square bg-white rounded-lg p-1 overflow-hidden flex items-center justify-center">
              <img
                src="/images/gold_bangle.jpg"
                alt="Bridal Kadas"
                className="w-full h-full object-contain group-hover:scale-105 transition"
              />
            </div>
            <span className="font-serif-luxury text-[11px] font-semibold text-neutral-900 mt-1.5 block group-hover:text-[#8E5827]">
              Jadau Kadas
            </span>
          </div>

          <div
            onClick={() => {
              setSelectedCategory('rings');
              setActiveTab('collection');
            }}
            className="p-2 bg-[#FAF8F5] rounded-xl border border-neutral-200/90 cursor-pointer group hover:border-[#8E5827] transition shadow-2xs"
          >
            <div className="w-full aspect-square bg-white rounded-lg p-1 overflow-hidden flex items-center justify-center">
              <img
                src="/images/gold_ring_card.jpg"
                alt="Solitaire Bands"
                className="w-full h-full object-cover rounded-md group-hover:scale-105 transition"
              />
            </div>
            <span className="font-serif-luxury text-[11px] font-semibold text-neutral-900 mt-1.5 block group-hover:text-[#8E5827]">
              Solitaires
            </span>
          </div>
        </div>
      </section>

      {/* 10. Flagship Showroom in JAIPUR ONLY (Single exact address requested by user) */}
      <section className="px-4 pt-1 pb-3" data-purpose="jaipur-showrooms">
        <div
          onClick={() => setActiveTab('contact')}
          className="bg-white border border-neutral-200/90 rounded-2xl p-4 cursor-pointer hover:border-[#8E5827] shadow-2xs transition"
        >
          <div className="flex items-start space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#8E5827]/10 text-[#8E5827] flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#8E5827] bg-[#8E5827]/10 px-2 py-0.5 rounded">
                Flagship Atelier & Showroom
              </span>
              <h3 className="font-serif-luxury text-sm font-semibold text-neutral-900 mt-1">
                House of Ramanand — Jaipur
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                B-68 1st Crossing, Godika Ka Rasta, Chandpole Bazar, Khazanewalo, Jaipur, Rajasthan 302001
              </p>
              <div className="mt-2.5 flex items-center space-x-3 text-xs">
                <span className="font-bold text-[#8E5827]">
                  +91 98290 81651
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-500">
                  10:30 AM – 8:30 PM (All 7 Days)
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0 self-center" />
          </div>
        </div>
      </section>
    </div>
  );
}
