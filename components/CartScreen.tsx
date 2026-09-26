'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Trash2,
  BookmarkCheck,
  House,
  Percent,
  Lock,
  CreditCard,
  Building2,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Truck
} from 'lucide-react';

export function CartScreen() {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    toggleWishlist,
    cartTotal,
    cartCount,
    createOrder,
    setActiveTab,
    showToast,
    currentUser
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [couponCode, setCouponCode] = useState('WELCOME500');
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');

  // Address fields
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: '',
    line1: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isEditingAddress, setIsEditingAddress] = useState(true);

  // Payment Processing Simulation
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  const discountAmount = isCouponApplied ? 500 : 0;
  const gstAmount = Math.round((cartTotal - discountAmount) * 0.03);
  const grandTotal = Math.max(0, cartTotal - discountAmount + gstAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME500' || couponCode.toUpperCase() === 'ROYALVIP') {
      setIsCouponApplied(true);
      showToast('Coupon applied: ₹500 discount added!');
    } else {
      showToast('Invalid coupon code. Try WELCOME500', 'error');
    }
  };

  const handleProceedToPayment = () => {
    setIsProcessingPayment(true);

    // Simulate gateway delay
    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder = createOrder({
        shippingAddress: {
          line1: address.line1,
          city: address.city,
          state: address.state,
          pincode: address.pincode
        },
        paymentMethod: selectedPaymentMode === 'UPI' ? 'UPI' : selectedPaymentMode === 'Card' ? 'Credit/Debit Card' : 'Net Banking'
      });
      setConfirmedOrderId(newOrder.id);
      setIsOrderSuccess(true);
    }, 2200);
  };

  if (isOrderSuccess) {
    return (
      <div className="p-5 text-center bg-white min-h-[80vh] flex flex-col items-center justify-center animate-fade-in pb-28">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Payment Successful
        </span>
        <h2 className="text-2xl font-royal font-bold text-neutral-900 mt-2">
          ORDER CONFIRMED
        </h2>
        <p className="text-xs font-mono font-bold text-neutral-600 mt-1 bg-neutral-100 px-3 py-1 rounded-lg">
          Order ID: {confirmedOrderId || 'ORD-DEMO-10245'}
        </p>
        <p className="text-xs text-neutral-600 mt-3 max-w-[260px] leading-relaxed">
          Estimated delivery:{' '}
          <strong className="text-neutral-900">25–28 September</strong> to your Jaipur address with complimentary insured transit.
        </p>

        <div className="mt-8 space-y-2.5 w-full max-w-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className="w-full py-3.5 bg-[#8E5827] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#76441B] transition active:scale-98"
          >
            VIEW ORDER DETAILS
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className="w-full py-3 bg-neutral-100 text-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition active:scale-98"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center bg-white min-h-[70vh] flex flex-col items-center justify-center pb-28">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
          <Sparkles className="w-8 h-8 text-[#C8A03E]" />
        </div>
        <h2 className="font-royal text-lg font-bold text-neutral-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs">
          Discover our royal Jaipur jewellery archives and add your preferred ornaments.
        </p>
        <button
          onClick={() => setActiveTab('categories')}
          className="mt-5 px-6 py-2.5 bg-[#8E5827] text-white rounded-xl text-xs font-bold shadow hover:bg-[#76441B]"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-[#FAF8F5]">
      {/* Checkout Step Wizard Indicator (Matching photo_15) */}
      <div className="bg-white px-5 py-3 border-b border-[#EDE2D6] flex justify-between items-center text-xs">
        <button
          onClick={() => setCheckoutStep(1)}
          className={`flex items-center space-x-1.5 ${
            checkoutStep >= 1 ? 'text-[#8E5827] font-bold' : 'text-neutral-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              checkoutStep >= 1 ? 'bg-[#8E5827] text-white' : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            1
          </span>
          <span>Bag</span>
        </button>

        <div className={`h-px w-8 ${checkoutStep >= 2 ? 'bg-[#8E5827]' : 'bg-neutral-200'}`}></div>

        <button
          onClick={() => setCheckoutStep(2)}
          className={`flex items-center space-x-1.5 ${
            checkoutStep >= 2 ? 'text-[#8E5827] font-bold' : 'text-neutral-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              checkoutStep >= 2 ? 'bg-[#8E5827] text-white' : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            2
          </span>
          <span>Address</span>
        </button>

        <div className={`h-px w-8 ${checkoutStep >= 3 ? 'bg-[#8E5827]' : 'bg-neutral-200'}`}></div>

        <button
          onClick={() => setCheckoutStep(3)}
          className={`flex items-center space-x-1.5 ${
            checkoutStep === 3 ? 'text-[#8E5827] font-bold' : 'text-neutral-400'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              checkoutStep === 3 ? 'bg-[#8E5827] text-white' : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            3
          </span>
          <span>Payment</span>
        </button>
      </div>

      {/* STEP 1 & 2: SHIPPING ADDRESS CARD */}
      <div className="m-3.5 p-4 bg-white rounded-2xl border border-[#E9DFD4] shadow-xs">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
            <House className="w-4 h-4 text-[#8E5827]" />
            <span>Deliver to: {address.name}</span>
          </span>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-[11px] font-bold text-[#8E5827] hover:underline"
          >
            {isEditingAddress ? 'Save' : 'Change'}
          </button>
        </div>

        {isEditingAddress ? (
          <div className="space-y-2 pt-2 text-xs">
            <input
              type="text"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              placeholder="Full Name"
              className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg p-2 text-xs"
            />
            <input
              type="text"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              placeholder="Mobile Phone"
              className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg p-2 text-xs"
            />
            <input
              type="text"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              placeholder="Address Line 1"
              className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg p-2 text-xs"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg p-2 text-xs"
              />
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                placeholder="State"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg p-2 text-xs"
              />
              <input
                type="text"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                placeholder="PIN"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-lg p-2 text-xs"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-neutral-600 leading-relaxed">
            {address.line1}, {address.city}, {address.state} -{' '}
            <strong>{address.pincode}</strong>
            <br />
            Mobile: {address.phone}
          </p>
        )}

        <div className="mt-2.5 text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg inline-flex items-center space-x-1">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Complimentary Insured Delivery by 28 Sep</span>
        </div>
      </div>

      {/* CART ITEMS LIST (Matching photo_15) */}
      <div className="px-3.5 space-y-3">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="p-3.5 bg-white rounded-2xl border border-[#E9DFD4] shadow-xs flex space-x-3 relative"
          >
            {/* Image */}
            <div className="w-20 h-20 bg-[#FAF6F1] rounded-xl overflow-hidden shrink-0 border border-[#F0E5D8] flex items-center justify-center p-1">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pr-6">
              <h3 className="text-xs font-serif-luxury font-bold text-neutral-900 leading-tight">
                {item.product.name}
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {item.product.metalDetails.karatage} {item.product.metalDetails.materialColour} • Gross {item.selectedWeight}g
              </p>

              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-sm font-bold text-neutral-900 font-serif-luxury">
                  ₹ {item.selectedVariantPrice.toLocaleString('en-IN')}
                </span>
                {item.product.originalPrice > item.selectedVariantPrice && (
                  <span className="text-[10px] text-neutral-400 line-through">
                    ₹ {item.product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Quantity Counter */}
              <div className="mt-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-2 border border-neutral-300 rounded-lg px-2 py-0.5 bg-neutral-50 text-xs">
                  <button
                    onClick={() => updateCartQty(item.product.id, -1)}
                    className="text-neutral-500 hover:text-black font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-neutral-900 px-1">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQty(item.product.id, 1)}
                    className="text-neutral-500 hover:text-black font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    toggleWishlist(item.product.id);
                    removeFromCart(item.product.id);
                  }}
                  className="text-[11px] text-neutral-500 hover:text-[#8E5827] flex items-center space-x-1"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Move to Wishlist</span>
                </button>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-rose-600 transition"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* COUPON CODE BOX (Matching photo_15) */}
      <div className="m-3.5 p-3.5 bg-white rounded-2xl border border-[#E9DFD4] shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
            <Percent className="w-4 h-4" />
          </div>
          <div>
            {isCouponApplied ? (
              <>
                <div className="text-xs font-bold text-neutral-900">
                  {couponCode} Applied!
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">
                  You saved ₹500 on this royal order
                </div>
              </>
            ) : (
              <div>
                <div className="text-xs font-bold text-neutral-900">Have a Promo Code?</div>
                <div className="text-[10px] text-neutral-500">Apply WELCOME500 for ₹500 off</div>
              </div>
            )}
          </div>
        </div>

        {isCouponApplied ? (
          <button
            onClick={() => setIsCouponApplied(false)}
            className="text-xs font-bold text-rose-700 hover:underline"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => setIsCouponApplied(true)}
            className="text-xs font-bold text-[#8E5827] hover:underline"
          >
            Apply
          </button>
        )}
      </div>

      {/* ORDER SUMMARY (Matching photo_15) */}
      <div className="mx-3.5 mb-3.5 p-4 bg-white rounded-2xl border border-[#E9DFD4] shadow-xs space-y-2 text-xs">
        <div className="font-bold text-sm font-serif-luxury text-neutral-900 pb-2 border-b border-neutral-100">
          Order Summary
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal ({cartCount} Items)</span>
          <span className="font-medium">₹ {cartTotal.toLocaleString('en-IN')}</span>
        </div>
        {isCouponApplied && (
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>Coupon Discount ({couponCode})</span>
            <span>- ₹ {discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="flex justify-between text-neutral-600">
          <span>Insured Shipping & Packaging</span>
          <span className="text-emerald-700 font-bold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
            FREE
          </span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Applicable GST (3%)</span>
          <span className="font-medium">₹ {gstAmount.toLocaleString('en-IN')}</span>
        </div>
        <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-950">
          <span>Total Amount Payable</span>
          <span className="text-[#8E5827] font-serif-luxury text-base">
            ₹ {grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* PAYMENT MODE SELECTOR (Matching photo_15) */}
      <div className="mx-3.5 mb-6 p-4 bg-white rounded-2xl border border-[#E9DFD4] shadow-xs">
        <div className="text-xs font-bold text-neutral-900 mb-3 flex items-center space-x-1.5">
          <Lock className="w-4 h-4 text-[#8E5827]" />
          <span>Select Payment Mode (Simulated Demo Gateway)</span>
        </div>

        <div className="space-y-2 text-xs">
          {/* UPI Option */}
          <label
            onClick={() => setSelectedPaymentMode('UPI')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
              selectedPaymentMode === 'UPI'
                ? 'border-2 border-[#8E5827] bg-[#FDF9F7]'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPaymentMode === 'UPI'}
                onChange={() => setSelectedPaymentMode('UPI')}
                className="text-[#8E5827] focus:ring-[#8E5827]"
              />
              <div>
                <div className="font-bold text-neutral-900">UPI / QR (Google Pay, PhonePe, Paytm)</div>
                <div className="text-[10px] text-neutral-500">Instant approval with zero surcharge</div>
              </div>
            </div>
            <QrCode className="w-5 h-5 text-neutral-700" />
          </label>

          {/* Card Option */}
          <label
            onClick={() => setSelectedPaymentMode('Card')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
              selectedPaymentMode === 'Card'
                ? 'border-2 border-[#8E5827] bg-[#FDF9F7]'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPaymentMode === 'Card'}
                onChange={() => setSelectedPaymentMode('Card')}
                className="text-[#8E5827] focus:ring-[#8E5827]"
              />
              <div>
                <div className="font-bold text-neutral-900">Credit / Debit Card</div>
                <div className="text-[10px] text-neutral-500">Visa, Mastercard, RuPay, Amex</div>
              </div>
            </div>
            <CreditCard className="w-5 h-5 text-neutral-500" />
          </label>

          {/* Net Banking Option */}
          <label
            onClick={() => setSelectedPaymentMode('NetBanking')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
              selectedPaymentMode === 'NetBanking'
                ? 'border-2 border-[#8E5827] bg-[#FDF9F7]'
                : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                checked={selectedPaymentMode === 'NetBanking'}
                onChange={() => setSelectedPaymentMode('NetBanking')}
                className="text-[#8E5827] focus:ring-[#8E5827]"
              />
              <div>
                <div className="font-bold text-neutral-900">Net Banking</div>
                <div className="text-[10px] text-neutral-500">HDFC, ICICI, SBI, Axis & Indian banks</div>
              </div>
            </div>
            <Building2 className="w-5 h-5 text-neutral-500" />
          </label>
        </div>
      </div>

      {/* STICKY BOTTOM CHECKOUT FOOTER (Matching photo_15) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[440px] mx-auto bg-white/95 backdrop-blur-md border-t border-[#E8DFD5] px-4 py-3 z-40 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[10px] uppercase font-bold text-neutral-400">Total To Pay</div>
          <div className="text-lg font-bold font-serif-luxury text-[#8E5827]">
            ₹ {grandTotal.toLocaleString('en-IN')}
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          disabled={isProcessingPayment}
          className="py-3 px-3.5 sm:px-6 bg-[#8E5827] hover:bg-[#76441B] text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-98 flex items-center space-x-1.5 shrink-0"
        >
          <ShieldCheck className="w-4 h-4 text-[#E8CA72] shrink-0" />
          <span>Proceed to Pay</span>
        </button>
      </div>

      {/* PROCESSING MODAL SIMULATION */}
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 text-center shadow-2xl animate-fade-in">
            <div className="w-16 h-16 border-4 border-[#8E5827] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-base font-bold font-royal text-neutral-900">
              Processing Payment...
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Contacting House of Ramanand Secure Banking Gateway...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
