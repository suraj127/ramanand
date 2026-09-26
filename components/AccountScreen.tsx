'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CategoryId } from '@/types/jewellery';
import {
  User,
  ChevronRight,
  Heart,
  ShoppingBag,
  Store,
  Phone,
  FileText,
  ShieldCheck,
  Sparkles,
  Coins,
  MapPin,
  LogIn
} from 'lucide-react';

export function AccountScreen() {
  const {
    setActiveTab,
    setSelectedCategory,
    showToast,
    digiGoldRate,
    setActivePolicyPage
  } = useApp();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  const handleShopBy = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('categories');
  };

  const handleOpenPolicy = (policyKey: string) => {
    setActivePolicyPage(policyKey);
    setActiveTab('policies');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
      showToast(`Verification OTP sent to +91 ${phoneNumber}`);
    } else {
      showToast('Please enter a valid 10-digit mobile number', 'error');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setUserLoggedIn(true);
    setUserPhone(phoneNumber);
    setIsLoginModalOpen(false);
    showToast('Successfully logged in!');
  };

  return (
    <div className="pb-28 bg-[#FAFAFA] min-h-screen">
      {/* 1. Header Bar: Text without logo in premium font */}
      <div className="bg-white border-b border-neutral-100 px-5 py-3 text-center">
        <h1 className="font-serif-luxury text-sm font-medium tracking-[0.18em] uppercase text-neutral-900">
          House of Ramanand
        </h1>
        <p className="text-[10px] text-neutral-400 font-normal tracking-wider mt-0.5">
          Account & Services
        </p>
      </div>

      {/* 2. Account / Login Banner */}
      <section className="bg-white p-5 border-b border-neutral-200/70 shadow-2xs">
        {userLoggedIn ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700">
                <User className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <p className="font-serif-luxury text-base font-semibold text-neutral-900">
                  +91 {userPhone}
                </p>
                <p className="text-xs text-neutral-400">Verified Member</p>
              </div>
            </div>
            <button
              onClick={() => {
                setUserLoggedIn(false);
                setUserPhone('');
                showToast('Logged out');
              }}
              className="text-xs text-neutral-500 hover:text-[#8E5827]"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-luxury text-base font-semibold text-neutral-900">
                Welcome
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Sign in to view orders, wishlist & addresses
              </p>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 bg-[#8E5827] hover:bg-[#76441B] text-white text-xs font-medium rounded-full shadow-2xs transition active:scale-95 flex items-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>
        )}

        {/* Quick Shortcut Buttons */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-neutral-100">
          <button
            onClick={() => setActiveTab('orders')}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-neutral-200/80 bg-white hover:bg-neutral-50 transition"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-700 mb-1" />
            <span className="text-[11px] font-medium text-neutral-800">My Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-neutral-200/80 bg-white hover:bg-neutral-50 transition"
          >
            <Heart className="w-4 h-4 text-neutral-700 mb-1" />
            <span className="text-[11px] font-medium text-neutral-800">Wishlist</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-neutral-200/80 bg-white hover:bg-neutral-50 transition"
          >
            <Store className="w-4 h-4 text-neutral-700 mb-1" />
            <span className="text-[11px] font-medium text-neutral-800">Stores</span>
          </button>
        </div>
      </section>

      {/* 3. Navigation Links List */}
      <nav className="p-4 space-y-3.5">
        {/* Categories Section */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1 block mb-1.5">
            Shop By Category
          </span>
          <div className="bg-white rounded-xl shadow-2xs border border-neutral-200/80 overflow-hidden divide-y divide-neutral-100">
            <button
              onClick={() => handleShopBy('earrings')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <span className="text-xs font-normal">Earrings</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleShopBy('rings')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <span className="text-xs font-normal">Rings</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleShopBy('necklaces')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <span className="text-xs font-normal">Necklaces</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleShopBy('gold-coins')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <span className="text-xs font-normal">24KT Gold Coins</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Services & Live Rates */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1 block mb-1.5">
            Services
          </span>
          <div className="bg-white rounded-xl shadow-2xs border border-neutral-200/80 overflow-hidden divide-y divide-neutral-100">
            <button
              onClick={() => setActiveTab('digi-gold')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-[#9E7B3B]" />
                <span className="text-xs font-normal">Digi Gold 24KT Live Rate</span>
              </div>
              <span className="text-xs text-neutral-600 font-mono font-medium">
                ₹{digiGoldRate}/g
              </span>
            </button>
            <button
              onClick={() => setActiveTab('gifting')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#8E5827]" />
                <span className="text-xs font-normal">Luxury Gifting & Vouchers</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Support & Policies */}
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1 block mb-1.5">
            Customer Care & Policies
          </span>
          <div className="bg-white rounded-xl shadow-2xs border border-neutral-200/80 overflow-hidden divide-y divide-neutral-100">
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <div className="flex items-center space-x-2">
                <Store className="w-4 h-4 text-neutral-500" />
                <span className="text-xs font-normal">Jaipur Flagship Atelier (Chandpole Bazar)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-800 hover:bg-neutral-50 transition"
            >
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-neutral-500" />
                <span className="text-xs font-normal">Contact Customer Service</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleOpenPolicy('privacy')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-700 hover:bg-neutral-50 transition text-left"
            >
              <span className="text-xs font-normal">Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleOpenPolicy('refund')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-700 hover:bg-neutral-50 transition text-left"
            >
              <span className="text-xs font-normal">Return & Refund Policy</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleOpenPolicy('shipping')}
              className="w-full flex items-center justify-between px-4 py-3 text-neutral-700 hover:bg-neutral-50 transition text-left"
            >
              <span className="text-xs font-normal">Insured Shipping Policy</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[360px] rounded-2xl p-6 shadow-2xl relative">
            <h3 className="font-serif-luxury text-base font-semibold text-neutral-900 text-center">
              Login or Register
            </h3>
            <p className="text-xs text-neutral-500 text-center mt-1">
              Enter your mobile number to receive a verification code
            </p>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="mt-4 space-y-3">
                <div className="flex items-center border border-neutral-300 rounded-xl px-3 py-2.5 bg-neutral-50 focus-within:bg-white focus-within:border-neutral-500">
                  <span className="text-xs font-medium text-neutral-600 mr-2">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-transparent text-xs focus:outline-none"
                    autoFocus
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLoginModalOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#8E5827] text-white text-xs font-medium shadow-xs"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-4 space-y-3">
                <div className="text-center">
                  <span className="text-xs text-neutral-600">OTP sent to +91 {phoneNumber}</span>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    defaultValue="123456"
                    className="mt-2 w-full text-center tracking-widest font-mono text-sm border border-neutral-300 rounded-xl py-2.5 bg-neutral-50 focus:bg-white focus:outline-none focus:border-neutral-500"
                    autoFocus
                  />
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="flex-1 py-2.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#8E5827] text-white text-xs font-medium shadow-xs"
                  >
                    Verify & Login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
