'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  Share2,
  Camera,
  Copy,
  ChevronUp,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Upload,
  Coins,
  Gem,
  Sparkle,
  Layers
} from 'lucide-react';

export function ProductDetailScreen() {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveTab,
    showToast
  } = useApp();

  const product = selectedProduct;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTabState, setActiveTabState] = useState<'details' | 'breakup'>('details');
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    metal: true,
    diamond: false,
    general: false
  });

  // Multiple image upload support
  const [customImages, setCustomImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) {
    return (
      <div className="p-8 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-sm font-semibold text-neutral-600">No jewellery selected</p>
        <button
          onClick={() => setActiveTab('categories')}
          className="mt-3 px-5 py-2 bg-[#8E5827] text-white rounded-full text-xs font-medium"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  // Combine default product images with any uploaded images
  const allImages = [
    ...(customImages.length > 0 ? customImages : product.images)
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        newUrls.push(url);
      });
      setCustomImages((prev) => [...prev, ...newUrls]);
      setActiveImageIdx(0);
      showToast(`Uploaded ${files.length} jewellery image${files.length > 1 ? 's' : ''}!`);
    }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* 1. Hero Image Section (Screenshot 5) */}
      <section className="relative px-4 pt-2">
        <div className="relative bg-white flex flex-col items-center justify-center min-h-[300px]">
          {/* Wishlist floating button top right */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 border border-neutral-200/80 flex items-center justify-center text-neutral-600 shadow-2xs hover:text-[#8E5827] active:scale-95 transition z-10"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 stroke-[1.7] ${
                isInWishlist(product.id) ? 'text-[#8E5827] fill-[#8E5827]' : ''
              }`}
            />
          </button>

          {/* Main Jewellery Photo */}
          <div className="w-full max-w-[280px] aspect-square flex items-center justify-center p-2">
            <img
              src={allImages[activeImageIdx] || allImages[0]}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Carousel Dots: Screenshot 5 shows active wine pill dot */}
          <div className="flex items-center space-x-1.5 mt-2">
            {allImages.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIdx(i)}
                className={`transition-all rounded-full ${
                  activeImageIdx === i
                    ? 'w-7 h-1.5 bg-[#8E5827]'
                    : 'w-1.5 h-1.5 bg-neutral-300'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Selector & Multi-Image Upload (Screenshot 5) */}
        <div className="flex items-center justify-start space-x-2.5 mt-3 px-1 overflow-x-auto hide-scrollbar">
          {allImages.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImageIdx(i)}
              className={`w-14 h-14 rounded-md p-1 bg-white transition shrink-0 flex items-center justify-center ${
                activeImageIdx === i
                  ? 'border-2 border-[#8E5827]'
                  : 'border border-neutral-200 opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Angle" className="w-full h-full object-contain" />
            </button>
          ))}

          {/* Multi-Image Upload Trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-md border border-dashed border-neutral-300 bg-[#FAF9F8] text-neutral-500 hover:text-neutral-800 hover:border-neutral-400 p-1 flex flex-col items-center justify-center shrink-0 transition"
            title="Upload multiple custom images"
          >
            <Upload className="w-4 h-4 stroke-[1.8]" />
            <span className="text-[8px] font-medium mt-1">Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Quick Actions Row: View Similar | Share */}
        <div className="flex items-center justify-between gap-2.5 mt-4">
          <button
            onClick={() => {
              setActiveTab('categories');
              showToast('Showing similar earrings');
            }}
            className="flex-1 py-2 px-3 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-800 flex items-center justify-center space-x-1.5 hover:bg-neutral-50 active:scale-98 transition shadow-2xs"
          >
            <Copy className="w-3.5 h-3.5 stroke-[1.8] text-neutral-600" />
            <span>View Similar</span>
          </button>

          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:text-[#8E5827] active:scale-95 transition shadow-2xs shrink-0"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>

        {/* Product Title, SKU, Price (Screenshot 5) */}
        <div className="mt-5 text-center">
          <h1 className="font-serif-luxury text-base sm:text-lg font-medium text-neutral-900 leading-snug">
            {product.name}
          </h1>

          <p className="text-[11px] text-neutral-400 font-mono tracking-wider mt-1.5 uppercase">
            SKU ID : {product.sku || '502995HTEAAA092JA303027'}
          </p>

          <div className="flex items-baseline justify-center space-x-3 mt-3">
            <span className="font-serif-luxury text-2xl font-bold text-neutral-950 tracking-tight">
              ₹ {product.price.toLocaleString('en-IN').replace(/,/g, ' ')}
            </span>
            <button
              onClick={() => {
                setActiveTabState('breakup');
                document.getElementById('jewellery-details-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-[#8E5827] hover:underline font-normal tracking-wide"
            >
              Price Breakup
            </button>
          </div>
        </div>
      </section>

      {/* 2. Offers Voucher Card (Screenshot 1) */}
      <section className="px-4 mt-6">
        <h2 className="font-serif-luxury text-base font-normal text-neutral-900 mb-2">
          Offers
        </h2>

        {/* Styled ticket / coupon voucher with notched arrow right edge */}
        <div className="relative bg-white border border-neutral-200/90 rounded-xl p-4 flex items-center shadow-2xs">
          <div className="w-9 h-9 flex items-center justify-center text-[#8E5827] shrink-0 mr-3">
            {/* Voucher ticket icon */}
            <div className="w-7 h-5 border border-dashed border-[#8E5827] rounded flex items-center justify-center text-[10px] font-bold">
              %
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs sm:text-[13px] font-bold text-neutral-900">
              Get flat ₹500/- off
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              on your first order | <strong className="text-neutral-900 font-bold">WELCOME500</strong>
            </p>
          </div>

          {/* Right chevron coupon arrow flag */}
          <div className="w-4 h-full flex items-center justify-center text-neutral-300">
            <span className="text-sm font-light">›</span>
          </div>
        </div>
      </section>

      {/* 3. Jewellery Details (Screenshot 1) */}
      <section id="jewellery-details-section" className="px-4 mt-8">
        <h2 className="font-serif-luxury text-xl font-normal text-center text-neutral-900 mb-4">
          Jewellery Details
        </h2>

        {/* Tab Toggle Switch: Product Details | Price Breakup */}
        <div className="max-w-[340px] mx-auto bg-white border border-neutral-200 rounded-full p-1 flex items-center mb-5">
          <button
            onClick={() => setActiveTabState('details')}
            className={`flex-1 py-2 text-center text-xs font-medium rounded-full transition-all ${
              activeTabState === 'details'
                ? 'bg-[#8E5827] text-white shadow-2xs'
                : 'text-neutral-700 hover:text-neutral-900'
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTabState('breakup')}
            className={`flex-1 py-2 text-center text-xs font-medium rounded-full transition-all ${
              activeTabState === 'breakup'
                ? 'bg-[#8E5827] text-white shadow-2xs'
                : 'text-neutral-700 hover:text-neutral-900'
            }`}
          >
            Price Breakup
          </button>
        </div>

        {/* Tab Content 1: Product Details (Accordions as in Screenshot 1) */}
        {activeTabState === 'details' && (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200/80 shadow-2xs">
            {/* Accordion 1: METAL DETAILS */}
            <div>
              <button
                onClick={() => toggleAccordion('metal')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left transition hover:bg-neutral-50/50"
              >
                <div className="flex items-center space-x-2 text-[#9E7B3B]">
                  {/* Gold ingots / bars icon */}
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#9E7B3B]">
                    METAL DETAILS
                  </span>
                </div>
                {openAccordions.metal ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              {openAccordions.metal && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-y-4 gap-x-6 text-left">
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.metalDetails.karatage}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Karatage</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.metalDetails.materialColour}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Material Colour</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.metalDetails.grossWeight}g
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Gross Weight</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.metalDetails.metalType}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Metal</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.metalDetails.height || '1.4 cm'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Earring Height</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.metalDetails.width || '0.58 cm'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Earring Width</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: DIAMOND DETAILS */}
            <div>
              <button
                onClick={() => toggleAccordion('diamond')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left transition hover:bg-neutral-50/50"
              >
                <div className="flex items-center space-x-2 text-[#9E7B3B]">
                  <Gem className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#9E7B3B]">
                    DIAMOND DETAILS
                  </span>
                </div>
                {openAccordions.diamond ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              {openAccordions.diamond && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-y-4 gap-x-6 text-left">
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.diamondDetails?.totalWeight || 0.149} ct
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Total Weight</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.diamondDetails?.clarity || 'VVS-EF'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Clarity</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.diamondDetails?.colour || 'E - F'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Colour</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.diamondDetails?.setting || 'Micro Prong'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Setting</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: GENERAL DETAILS */}
            <div>
              <button
                onClick={() => toggleAccordion('general')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left transition hover:bg-neutral-50/50"
              >
                <div className="flex items-center space-x-2 text-[#9E7B3B]">
                  <Sparkle className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#9E7B3B]">
                    GENERAL DETAILS
                  </span>
                </div>
                {openAccordions.general ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              {openAccordions.general && (
                <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-y-4 gap-x-6 text-left">
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.subCategory || 'Earrings'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Product Type</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.gender || 'Women'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Gender</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      {product.tags?.[0] || 'High Fine Jewellery'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Collection</span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 text-sm block">
                      Jaipur Atelier
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">Origin</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: Price Breakup */}
        {activeTabState === 'breakup' && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-3 text-xs shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 font-semibold uppercase tracking-wider text-neutral-900">
              <span>Component</span>
              <span>Rate / Value</span>
            </div>
            <div className="flex justify-between text-neutral-700">
              <span>Gold Component ({product.metalDetails.karatage}, {product.metalDetails.grossWeight}g)</span>
              <span className="font-mono font-medium">₹ {product.priceBreakup.goldValue.toLocaleString('en-IN')}</span>
            </div>
            {product.priceBreakup.diamondValue > 0 && (
              <div className="flex justify-between text-neutral-700">
                <span>Natural Certified Diamond</span>
                <span className="font-mono font-medium">₹ {product.priceBreakup.diamondValue.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-700">
              <span>Crafting & Making Charges</span>
              <span className="font-mono font-medium">₹ {product.priceBreakup.makingCharges.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-neutral-700">
              <span>GST (3%)</span>
              <span className="font-mono font-medium">₹ {product.priceBreakup.gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between font-serif-luxury text-sm font-bold text-neutral-950">
              <span className="text-[#8E5827]">Total Payable Value</span>
              <span className="text-[#8E5827] text-base">₹ {product.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </section>

      {/* 4. Floating Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-100 py-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="max-w-[440px] mx-auto">
          {/* Full-width curved button */}
          <button
            onClick={() => {
              addToCart(product, 1);
              showToast(`Added ${product.name} to Cart`);
            }}
            className="w-full py-3.5 bg-[#8E5827] hover:bg-[#76441B] text-white rounded-full font-normal text-[15px] flex items-center justify-center space-x-2 active:scale-98 transition shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            <span>Add To Cart</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
