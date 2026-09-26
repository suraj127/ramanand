'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export function WishlistScreen() {
  const {
    wishlistIds,
    products,
    toggleWishlist,
    addToCart,
    openProductDetail,
    setActiveTab,
    setSelectedCategory
  } = useApp();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="pb-32 bg-white px-4 pt-4 min-h-[75vh]">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h1 className="font-serif-luxury text-xl font-normal text-neutral-900 leading-tight">
            My Wishlist
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            {wishlistProducts.length} saved jewellery pieces
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={() => {
              wishlistProducts.forEach((p) => addToCart(p));
            }}
            className="text-xs font-medium text-[#8E5827] hover:underline"
          >
            Move All To Cart
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 mt-5 p-6 shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="font-serif-luxury text-base font-medium text-neutral-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
            Save your cherished designs from the House of Ramanand collections to review later.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('collection');
            }}
            className="mt-5 px-6 py-2.5 bg-[#8E5827] text-white rounded-full text-xs font-medium shadow-2xs hover:bg-[#76441B] transition active:scale-95"
          >
            Explore Jewellery Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {wishlistProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-neutral-200/90 shadow-2xs flex flex-col justify-between group hover:border-[#8E5827] transition"
            >
              <div className="relative p-2 pb-0">
                {/* Delete Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 text-neutral-500 hover:text-[#8E5827] shadow-xs"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Metal Badge */}
                <span className="absolute top-3 left-3 z-10 px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[9px] font-medium tracking-wider uppercase border border-neutral-200">
                  {product.metalDetails?.karatage || '18KT'}
                </span>

                {/* Image */}
                <div
                  onClick={() => openProductDetail(product)}
                  className="w-full aspect-square rounded-lg bg-[#FCFAF8] flex items-center justify-center p-3 cursor-pointer overflow-hidden"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>
              </div>

              <div className="p-3 pt-2">
                <h3
                  onClick={() => openProductDetail(product)}
                  className="font-serif-luxury text-xs font-normal text-neutral-900 leading-snug line-clamp-2 min-h-[32px] cursor-pointer group-hover:text-[#8E5827]"
                >
                  {product.name}
                </h3>
                <div className="mt-1">
                  <span className="text-xs font-semibold text-neutral-950 font-serif-luxury">
                    ₹ {product.price.toLocaleString('en-IN').replace(/,/g, ' ')}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-2.5 w-full py-2 text-[11px] font-medium tracking-wide text-white bg-[#8E5827] rounded-lg hover:bg-[#76441B] transition active:scale-98 shadow-2xs flex items-center justify-center space-x-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move To Cart</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
