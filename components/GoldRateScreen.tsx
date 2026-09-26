'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Coins,
  TrendingUp,
  ShieldCheck,
  Calculator,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface GoldRateData {
  purity: string;
  name: string;
  fineness: string;
  ratePerGram: number;
  changeToday: number;
  bestFor: string;
}

const LIVE_RATES: Record<string, GoldRateData[]> = {
  Jaipur: [
    { purity: '24KT', name: '24KT Pure Gold', fineness: '999.9 Purity', ratePerGram: 7842, changeToday: 35, bestFor: 'Investment & Bullion Coins' },
    { purity: '22KT', name: '22KT Standard Gold', fineness: '916 Hallmark', ratePerGram: 7188, changeToday: 32, bestFor: 'Traditional Handcrafted Jewellery' },
    { purity: '18KT', name: '18KT Fine Gold', fineness: '750 Hallmark', ratePerGram: 5882, changeToday: 26, bestFor: 'Solitaire & Diamond Jewellery' },
    { purity: '14KT', name: '14KT Modern Gold', fineness: '585 Hallmark', ratePerGram: 4575, changeToday: 20, bestFor: 'Everyday Minimalist Wear' },
  ],
  Delhi: [
    { purity: '24KT', name: '24KT Pure Gold', fineness: '999.9 Purity', ratePerGram: 7855, changeToday: 38, bestFor: 'Investment & Bullion Coins' },
    { purity: '22KT', name: '22KT Standard Gold', fineness: '916 Hallmark', ratePerGram: 7200, changeToday: 35, bestFor: 'Traditional Handcrafted Jewellery' },
    { purity: '18KT', name: '18KT Fine Gold', fineness: '750 Hallmark', ratePerGram: 5892, changeToday: 28, bestFor: 'Solitaire & Diamond Jewellery' },
    { purity: '14KT', name: '14KT Modern Gold', fineness: '585 Hallmark', ratePerGram: 4582, changeToday: 22, bestFor: 'Everyday Minimalist Wear' },
  ],
  Mumbai: [
    { purity: '24KT', name: '24KT Pure Gold', fineness: '999.9 Purity', ratePerGram: 7838, changeToday: 30, bestFor: 'Investment & Bullion Coins' },
    { purity: '22KT', name: '22KT Standard Gold', fineness: '916 Hallmark', ratePerGram: 7185, changeToday: 28, bestFor: 'Traditional Handcrafted Jewellery' },
    { purity: '18KT', name: '18KT Fine Gold', fineness: '750 Hallmark', ratePerGram: 5878, changeToday: 24, bestFor: 'Solitaire & Diamond Jewellery' },
    { purity: '14KT', name: '14KT Modern Gold', fineness: '585 Hallmark', ratePerGram: 4570, changeToday: 18, bestFor: 'Everyday Minimalist Wear' },
  ]
};

export function GoldRateScreen() {
  const { setActiveTab, setSelectedCategory } = useApp();
  const [selectedCity, setSelectedCity] = useState<'Jaipur' | 'Delhi' | 'Mumbai'>('Jaipur');
  const [calcPurity, setCalcPurity] = useState<'24KT' | '22KT' | '18KT'>('22KT');
  const [calcWeight, setCalcWeight] = useState<number>(10);

  const cityRates = LIVE_RATES[selectedCity];
  const activeRateObj = cityRates.find((r) => r.purity === calcPurity) || cityRates[1];
  const goldBaseValue = Math.round(activeRateObj.ratePerGram * calcWeight);
  const estimatedMaking = calcPurity === '24KT' ? 0 : Math.round(goldBaseValue * 0.12);
  const gst = Math.round((goldBaseValue + estimatedMaking) * 0.03);
  const totalEstimatedPrice = goldBaseValue + estimatedMaking + gst;

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Header */}
      <section className="px-4 pt-4 pb-3 border-b border-neutral-100 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                LIVE BULLION TICKER
              </span>
            </div>
            <h1 className="font-serif-luxury text-xl font-normal text-neutral-900 leading-tight mt-0.5">
              Today's Gold Rate
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 block">Market Status</span>
            <span className="text-xs font-semibold text-neutral-800 flex items-center justify-end space-x-1">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>10:30 AM IST</span>
            </span>
          </div>
        </div>

        {/* City Switcher */}
        <div className="mt-3 flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-[#8E5827]" />
          <span className="text-xs text-neutral-500">Select City:</span>
          <div className="flex space-x-1.5">
            {(['Jaipur', 'Delhi', 'Mumbai'] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 text-xs rounded-full transition ${
                  selectedCity === city
                    ? 'bg-[#8E5827] text-white font-medium shadow-2xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Rate Cards */}
      <div className="p-4 space-y-3">
        {cityRates.map((rate) => (
          <div
            key={rate.purity}
            className="p-3.5 rounded-xl border border-neutral-200/90 bg-white hover:border-[#8E5827] transition shadow-2xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8E5827]/10 text-[#8E5827] uppercase tracking-wider">
                    {rate.purity}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 font-medium">
                    {rate.fineness}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-sm font-semibold text-neutral-900 mt-1">
                  {rate.name}
                </h3>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  {rate.bestFor}
                </p>
              </div>

              <div className="text-right">
                <span className="text-base font-bold text-neutral-900 font-mono">
                  ₹{rate.ratePerGram.toLocaleString('en-IN')}<span className="text-xs font-normal text-neutral-500">/g</span>
                </span>
                <div className="flex items-center justify-end space-x-1 text-[11px] text-emerald-700 font-semibold mt-0.5">
                  <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                  <span>+₹{rate.changeToday} today</span>
                </div>
              </div>
            </div>

            {/* Quick Multipliers: 1g, 8g (Pavan), 10g (Tola), 100g */}
            <div className="mt-3 pt-2.5 border-t border-neutral-100 grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-neutral-50 p-1.5 rounded-lg">
                <span className="text-[10px] text-neutral-400 block">1 Gram</span>
                <span className="font-mono font-medium text-neutral-800 text-[11px]">
                  ₹{rate.ratePerGram.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-neutral-50 p-1.5 rounded-lg">
                <span className="text-[10px] text-neutral-400 block">8g (Pavan)</span>
                <span className="font-mono font-medium text-neutral-800 text-[11px]">
                  ₹{(rate.ratePerGram * 8).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-neutral-50 p-1.5 rounded-lg">
                <span className="text-[10px] text-neutral-400 block">10g (Tola)</span>
                <span className="font-mono font-medium text-neutral-800 text-[11px]">
                  ₹{(rate.ratePerGram * 10).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-neutral-50 p-1.5 rounded-lg">
                <span className="text-[10px] text-neutral-400 block">100g</span>
                <span className="font-mono font-medium text-neutral-800 text-[11px]">
                  ₹{(rate.ratePerGram * 100).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Silver Rate Card */}
        <div className="p-3.5 rounded-xl border border-neutral-200/90 bg-[#FAF9F7] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200/70 flex items-center justify-center text-neutral-700">
              <Coins className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                999 Fine Silver Bullion
              </span>
              <h4 className="font-serif-luxury text-sm font-semibold text-neutral-900">
                Pure Silver ({selectedCity})
              </h4>
              <p className="text-[10px] text-neutral-400">100% Certified Hallmarked</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-bold text-neutral-900 font-mono">
              ₹94.50<span className="text-xs font-normal text-neutral-500">/g</span>
            </span>
            <span className="text-[11px] text-neutral-500 block font-mono">
              ₹94,500 / 1 Kg
            </span>
          </div>
        </div>

        {/* Interactive Gold Jewellery Cost Calculator */}
        <div className="bg-white rounded-xl border border-neutral-200/90 p-4 shadow-2xs mt-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-neutral-100">
            <Calculator className="w-4 h-4 text-[#8E5827]" />
            <h3 className="font-serif-luxury text-sm font-semibold text-neutral-900">
              Live Jewellery Cost Estimator
            </h3>
          </div>

          <div className="mt-3 space-y-3">
            {/* Purity Selection */}
            <div>
              <label className="text-xs text-neutral-600 block mb-1">Select Karatage</label>
              <div className="grid grid-cols-3 gap-2">
                {(['24KT', '22KT', '18KT'] as const).map((pur) => (
                  <button
                    key={pur}
                    onClick={() => setCalcPurity(pur)}
                    className={`py-1.5 text-xs rounded-lg border font-medium transition ${
                      calcPurity === pur
                        ? 'border-[#8E5827] bg-[#8E5827] text-white shadow-2xs'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {pur} ({pur === '24KT' ? '999' : pur === '22KT' ? '916' : '750'})
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Selection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-neutral-600">Weight (Grams)</label>
                <span className="font-mono text-xs font-bold text-neutral-900">{calcWeight} g</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {[1, 5, 10, 20, 50].map((wt) => (
                  <button
                    key={wt}
                    onClick={() => setCalcWeight(wt)}
                    className={`py-1 text-xs rounded border transition ${
                      calcWeight === wt
                        ? 'border-[#8E5827] bg-[#8E5827]/10 text-[#8E5827] font-bold'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {wt}g
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full accent-[#8E5827] cursor-pointer"
              />
            </div>

            {/* Estimated Cost Breakdown */}
            <div className="bg-[#FAF9F7] rounded-xl p-3 border border-neutral-200/80 text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600">
                <span>Gold Value ({calcWeight}g @ ₹{activeRateObj.ratePerGram}/g):</span>
                <span className="font-mono font-medium">₹{goldBaseValue.toLocaleString('en-IN')}</span>
              </div>
              {calcPurity !== '24KT' && (
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Making Charges (~12%):</span>
                  <span className="font-mono font-medium">₹{estimatedMaking.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Statutory GST (3%):</span>
                <span className="font-mono font-medium">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between items-center">
                <span className="font-serif-luxury font-semibold text-neutral-900">
                  Total Estimated Amount:
                </span>
                <span className="font-serif-luxury text-base font-bold text-[#8E5827]">
                  ₹{totalEstimatedPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banners */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => setActiveTab('digi-gold')}
            className="w-full py-3 bg-[#8E5827] text-white rounded-xl text-xs font-medium tracking-wide uppercase shadow-2xs hover:bg-[#76441B] transition flex items-center justify-center space-x-2"
          >
            <Coins className="w-4 h-4" />
            <span>Buy 24KT Digi Gold at ₹{cityRates[0].ratePerGram}/g</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('collection');
            }}
            className="w-full py-3 bg-white text-neutral-800 border border-neutral-300 rounded-xl text-xs font-medium hover:bg-neutral-50 transition flex items-center justify-center space-x-1.5"
          >
            <span>Explore Fine Jewellery Collection</span>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
