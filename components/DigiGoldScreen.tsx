'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { DIGI_GOLD_FAQS } from '@/lib/mock-data';
import {
  Coins,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Lock,
  Sparkles,
  ShoppingBag,
  RefreshCw,
  Gift,
  CheckCircle2,
  X
} from 'lucide-react';

export function DigiGoldScreen() {
  const {
    digiGoldBalanceGrams,
    digiGoldRate,
    buyDigiGold,
    sellDigiGold,
    redeemDigiGold,
    showToast,
    setActiveTab
  } = useApp();

  const [subTab, setSubTab] = useState<'buy' | 'sell' | 'redeem'>('buy');
  const [amountRupees, setAmountRupees] = useState<number>(1000);
  const [weightGrams, setWeightGrams] = useState<number>(
    parseFloat((1000 / digiGoldRate).toFixed(4))
  );
  const [sellGrams, setSellGrams] = useState<number>(0.1);
  const [faqCategory, setFaqCategory] = useState<string>('Buy Gold');
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastBoughtGrams, setLastBoughtGrams] = useState<number>(0);

  // Countdown timer simulation for live price quote
  const [timeLeft, setTimeLeft] = useState<number>(298); // 4:58

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAmountChange = (val: number) => {
    setAmountRupees(val);
    setWeightGrams(parseFloat((val / digiGoldRate).toFixed(4)));
  };

  const handleWeightChange = (grams: number) => {
    setWeightGrams(grams);
    setAmountRupees(Math.round(grams * digiGoldRate));
  };

  const executeBuy = () => {
    const success = buyDigiGold(amountRupees);
    if (success) {
      setLastBoughtGrams(weightGrams);
      setIsBuyModalOpen(false);
      setIsSuccessModalOpen(true);
    }
  };

  const executeSell = () => {
    sellDigiGold(sellGrams);
  };

  const executeRedeem = () => {
    redeemDigiGold(sellGrams);
  };

  const filteredFaqs = DIGI_GOLD_FAQS.filter((f) => f.category === faqCategory);

  return (
    <div className="pb-24 bg-[#FAF8F5]">
      {/* Sub Navigation Bar: Buy | Sell | Redeem on deep dark header (Matching photo_1 & photo_13) */}
      <nav aria-label="Digi Gold Sub Navigation" className="bg-[#050505] py-3 px-4 shadow-sm sticky top-[72px] z-30">
        <div className="flex items-center justify-around">
          {/* Buy Tab */}
          <button
            onClick={() => setSubTab('buy')}
            className={`flex items-center space-x-2 transition ${
              subTab === 'buy' ? 'text-[#E8CA72] font-bold' : 'text-[#C8A03E]/70 hover:text-[#E8CA72]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="text-sm tracking-wide">Buy</span>
          </button>

          <div className="w-px h-5 bg-white/15"></div>

          {/* Sell Tab */}
          <button
            onClick={() => setSubTab('sell')}
            className={`flex items-center space-x-2 transition ${
              subTab === 'sell' ? 'text-[#E8CA72] font-bold' : 'text-[#C8A03E]/70 hover:text-[#E8CA72]'
            }`}
          >
            <Coins className="w-4 h-4 stroke-[2]" />
            <span className="text-sm font-medium tracking-wide">Sell</span>
          </button>

          <div className="w-px h-5 bg-white/15"></div>

          {/* Redeem Tab */}
          <button
            onClick={() => setSubTab('redeem')}
            className={`flex items-center space-x-2 transition ${
              subTab === 'redeem' ? 'text-[#E8CA72] font-bold' : 'text-[#C8A03E]/70 hover:text-[#E8CA72]'
            }`}
          >
            <Gift className="w-4 h-4 stroke-[2]" />
            <span className="text-sm font-medium tracking-wide">Redeem</span>
          </button>
        </div>
      </nav>

      <main className="px-3.5 pt-3.5 space-y-3.5">
        {/* Digi Locker Balance Card (Matching photo_1 & photo_13) */}
        <section
          className="luxury-card-bg text-white rounded-2xl p-4 shadow-md border border-neutral-800 relative overflow-hidden"
          data-purpose="digi-locker-balance-card"
        >
          <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none">
            <Sparkles className="w-32 h-32 text-[#C8A03E]" />
          </div>

          <h2 className="text-xs font-medium text-neutral-300 tracking-wide text-center">
            Total Gold / Digi Locker Balance
          </h2>

          <div className="mt-3 flex items-center justify-between">
            {/* Gold Bullion Stack Illustration */}
            <div className="w-16 shrink-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8C6615] via-[#ECC876] to-[#FAF0CD] flex items-center justify-center shadow-lg border border-[#FFE7A3]/50">
                <Coins className="w-7 h-7 text-neutral-900" />
              </div>
            </div>

            {/* Balance Details */}
            <div className="flex-1 pl-3 text-right">
              <p className="text-xs sm:text-sm font-semibold text-[#ECC876] leading-tight">
                Ramanand Gold Balance:{' '}
                <span className="text-white font-bold font-royal text-sm sm:text-base">
                  {digiGoldBalanceGrams} Grams
                </span>
              </p>
              <p className="text-[11px] text-[#ECC876]/80 mt-1 leading-tight">
                Other Channel Gold Balance: <span className="text-neutral-300 font-bold">0.0 Grams</span>
              </p>
            </div>
          </div>

          {/* Live 24KT Buy Rate Footer */}
          <div className="mt-3 pt-2.5 border-t border-neutral-700/60 flex items-center justify-between text-[10px] text-neutral-300">
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live 24KT (999) Buy Rate:</span>
              <span className="font-bold text-[#E8CA72]">₹{digiGoldRate.toLocaleString('en-IN')}/g</span>
              <span className="text-neutral-400">(+3% GST)</span>
            </div>
            <span className="text-neutral-400 font-mono font-bold">{formatTimer(timeLeft)}</span>
          </div>
        </section>

        {/* Promotional Savings Banner (Matching photo_1 & photo_13) */}
        <section
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#171718] via-[#242428] to-[#121213] text-white p-4 border border-neutral-800 shadow-md"
          data-purpose="promo-savings-banner"
        >
          <div className="flex items-center justify-between">
            <div className="max-w-[62%] z-10">
              <h3 className="font-royal text-sm font-bold text-[#F5E5C0] leading-snug tracking-wide">
                Safe & Trustworthy savings in gold
              </h3>
              <p className="text-[11px] text-neutral-300 mt-1">
                Accumulate 24KT Pure Gold starting at ₹100
              </p>
              <button
                onClick={() => setSubTab('buy')}
                className="inline-flex items-center space-x-1 text-xs font-bold text-[#ECC876] hover:text-white mt-2.5 transition"
              >
                <span>Buy Digital Gold Now</span>
                <span>→</span>
              </button>
            </div>

            <div className="relative w-24 h-16 flex items-center justify-end">
              <ShieldCheck className="w-16 h-16 text-[#C8A03E]/30" />
            </div>
          </div>
        </section>

        {/* SUB-VIEW 1: BUY DIGITAL GOLD CALCULATOR */}
        {subTab === 'buy' && (
          <section className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200/80" id="quick-buy">
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                  Instant Accumulation
                </h3>
                <p className="font-royal text-base font-bold text-[#8E5827]">
                  Buy Pure 24KT Gold
                </p>
              </div>
              <span className="bg-[#FAF3E0] text-[#8C6615] text-[10px] font-bold px-2 py-0.5 rounded border border-[#E8CA72]">
                99.9% Hallmark Pure
              </span>
            </div>

            {/* Quick Amount Chips */}
            <div className="mt-3">
              <p className="text-[11px] font-medium text-neutral-500 mb-1.5">
                Select Popular Amount / Weight:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[500, 1000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountChange(amt)}
                    className={`py-1.5 px-2 text-xs font-bold rounded-xl transition active:scale-95 ${
                      amountRupees === amt
                        ? 'bg-[#FAF7F2] border border-[#C8A03E] text-[#8E5827] shadow-xs'
                        : 'bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-[#8E5827]'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleWeightChange(1.0)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-xl transition active:scale-95 ${
                    weightGrams === 1.0
                      ? 'bg-[#FAF7F2] border border-[#C8A03E] text-[#8E5827] shadow-xs'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-[#8E5827]'
                  }`}
                >
                  1.0 Gram
                </button>
                <button
                  type="button"
                  onClick={() => handleWeightChange(5.0)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-xl transition active:scale-95 ${
                    weightGrams === 5.0
                      ? 'bg-[#FAF7F2] border border-[#C8A03E] text-[#8E5827] shadow-xs'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-700 hover:border-[#8E5827]'
                  }`}
                >
                  5.0 Grams
                </button>
              </div>
            </div>

            {/* Bidirectional Converter Input */}
            <div className="mt-3.5 space-y-2">
              <div className="relative">
                <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                  Amount in Rupees (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-neutral-600 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={amountRupees || ''}
                    onChange={(e) => handleAmountChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF9F6] border border-neutral-300 rounded-xl pl-8 pr-3 py-2 text-sm font-bold text-neutral-900 focus:ring-1 focus:ring-[#C8A03E] focus:border-[#C8A03E]"
                  />
                </div>
              </div>

              <div className="text-center text-neutral-400 text-xs py-0.5">
                <span>⇄</span>
              </div>

              <div className="relative">
                <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                  Weight in Grams (g)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.0001"
                    value={weightGrams || ''}
                    onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#FAF9F6] border border-neutral-300 rounded-xl px-3 py-2 text-sm font-bold text-neutral-900 focus:ring-1 focus:ring-[#C8A03E] focus:border-[#C8A03E]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-[11px] font-bold text-[#8C6615]">
                    24K 999 Pure
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buy Button */}
            <button
              onClick={() => setIsBuyModalOpen(true)}
              className="w-full mt-4 bg-gradient-to-r from-[#7B1824] to-[#591019] hover:from-[#65121c] hover:to-[#450b12] text-white py-3 rounded-xl text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-lg transition active:scale-98 flex items-center justify-center space-x-2"
            >
              <span>Proceed to Buy Gold (₹{amountRupees.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        )}

        {/* SUB-VIEW 2: SELL DIGITAL GOLD */}
        {subTab === 'sell' && (
          <section className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200/80">
            <h3 className="font-royal text-base font-bold text-[#8E5827] mb-2">
              Sell Digi Gold Balance
            </h3>
            <p className="text-xs text-neutral-600 mb-4">
              Current Available Balance:{' '}
              <strong className="text-neutral-900">{digiGoldBalanceGrams} Grams</strong> (Live Sell Rate: ₹
              {(digiGoldRate * 0.98).toFixed(0)}/g)
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                  Weight to Sell (Grams)
                </label>
                <input
                  type="number"
                  step="0.01"
                  max={digiGoldBalanceGrams}
                  value={sellGrams}
                  onChange={(e) => setSellGrams(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#FAF9F6] border border-neutral-300 rounded-xl px-3 py-2 text-sm font-bold text-neutral-900"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Payout:</span>
                  <span className="font-bold text-[#8E5827] font-serif-luxury text-sm">
                    ₹{Math.round(sellGrams * digiGoldRate * 0.98).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Payout transferred immediately via instant UPI / IMPS.
                </p>
              </div>

              <button
                onClick={executeSell}
                disabled={digiGoldBalanceGrams <= 0}
                className="w-full py-3 bg-[#8E5827] text-white font-bold text-xs uppercase rounded-xl tracking-wider disabled:opacity-50 transition"
              >
                Sell Now & Withdraw
              </button>
            </div>
          </section>
        )}

        {/* SUB-VIEW 3: REDEEM DIGITAL GOLD */}
        {subTab === 'redeem' && (
          <section className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200/80">
            <h3 className="font-royal text-base font-bold text-[#8E5827] mb-2">
              Redeem for Physical Jewellery
            </h3>
            <p className="text-xs text-neutral-600 mb-3">
              Convert your accumulated Digi Gold balance into 24K pure bullion coins or 22K bridal ornaments across House of Ramanand.
            </p>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/50 mb-3 text-xs">
              <span className="font-bold text-neutral-900 block mb-1">100% Full Value Conversion</span>
              <p className="text-neutral-600">
                Your current balance of <strong>{digiGoldBalanceGrams}g</strong> is worth approx.{' '}
                <strong className="text-[#8E5827]">
                  ₹{Math.round(digiGoldBalanceGrams * digiGoldRate).toLocaleString('en-IN')}
                </strong>
              </p>
            </div>

            <button
              onClick={() => {
                executeRedeem();
                setActiveTab('categories');
              }}
              className="w-full py-3 bg-neutral-900 text-[#E8CA72] font-bold text-xs uppercase rounded-xl tracking-wider shadow hover:bg-neutral-800 transition"
            >
              Select Jewellery to Redeem Against
            </button>
          </section>
        )}

        {/* FAQ Section (Faithfully matching photo_1 & photo_13) */}
        <section className="pt-2" data-purpose="faq-section">
          <h2 className="text-lg font-bold text-neutral-900 font-royal">FAQ&apos;s</h2>

          {/* Category Tabs */}
          <div className="flex items-center space-x-5 border-b border-neutral-200 mt-2 pb-2 text-sm overflow-x-auto hide-scrollbar">
            {['Buy Gold', 'Exchange', 'Sell Gold', 'Custody'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`font-semibold shrink-0 relative transition ${
                  faqCategory === cat
                    ? 'text-[#C8A03E]'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {cat}
                {faqCategory === cat && (
                  <span className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-[#C8A03E]"></span>
                )}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="mt-3 divide-y divide-neutral-200 text-neutral-800">
            {filteredFaqs.map((faq, index) => (
              <details key={index} className="group py-3.5" open={index === 0}>
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-[13px] font-semibold text-neutral-900 pr-3 leading-snug">
                    {faq.question}
                  </span>
                  <span className="text-neutral-500 group-open:rotate-180 transition-transform shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </summary>
                <div className="mt-2.5 text-xs text-neutral-600 leading-relaxed pl-0.5">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Trust Badges Footer */}
        <section className="pt-4 pb-6 text-center border-t border-neutral-200/60" data-purpose="trust-badges">
          <div className="flex items-center justify-center space-x-6 text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A03E] mr-1" />
              100% Insured Brinks
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A03E] mr-1" />
              IDBI Trustee Backed
            </span>
          </div>
        </section>
      </main>

      {/* Simulated Buy Modal */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-fade-in text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-[#8C6615] flex items-center justify-center mx-auto mb-3">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-royal text-base font-bold text-neutral-900">
              Confirm 24KT Gold Purchase
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              You are purchasing <strong>{weightGrams}g</strong> 999.9 pure digital gold for{' '}
              <strong className="text-neutral-900">₹{amountRupees.toLocaleString('en-IN')}</strong>.
            </p>

            <div className="my-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">Gold Value:</span>
                <span className="font-bold">₹{amountRupees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">GST (3% included):</span>
                <span className="font-bold">₹{Math.round(amountRupees * 0.03)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Vault Custody:</span>
                <span className="font-bold text-emerald-600 uppercase">FREE (Brink&apos;s)</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={executeBuy}
                className="w-full py-3 bg-[#8E5827] text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow hover:bg-[#76441B]"
              >
                Simulate Payment & Credit Locker
              </button>
              <button
                onClick={() => setIsBuyModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl text-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Transaction Successful
            </span>
            <h3 className="font-royal text-lg font-bold text-neutral-900 mt-2">
              Digi Locker Credited!
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              <strong>{lastBoughtGrams} Grams</strong> of 24 Karat 99.9% Pure Gold has been deposited in your House of Ramanand Digi Locker.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono mt-2">
              Certicard Ref: BRINKS-RJ-749201
            </p>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-6 w-full py-3 bg-[#8E5827] text-white font-bold text-xs rounded-xl shadow hover:bg-[#76441B]"
            >
              View Updated Locker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
