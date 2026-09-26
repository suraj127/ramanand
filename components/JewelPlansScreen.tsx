'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JEWEL_PLANS } from '@/lib/mock-data';
import {
  BookmarkCheck,
  Gift,
  Coins,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function JewelPlansScreen() {
  const { showToast, setActiveTab } = useApp();
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [isEnrolledModal, setIsEnrolledModal] = useState(false);
  const [enrolledPlan, setEnrolledPlan] = useState('');

  // 11 Months calculation
  const totalCustomerDeposit = monthlyAmount * 11;
  const brandBonusGift = monthlyAmount * 1.0; // 1 full month bonus
  const totalMaturityValue = totalCustomerDeposit + brandBonusGift;

  const handleEnroll = (planName: string) => {
    setEnrolledPlan(planName);
    setIsEnrolledModal(true);
    showToast(`Successfully enrolled in ${planName}!`);
  };

  return (
    <div className="pb-28 bg-[#FAF8F5] px-4 pt-3 space-y-4">
      {/* Title */}
      <div className="text-center">
        <span className="text-[9px] uppercase font-royal tracking-[0.25em] text-[#AA7A1E] font-bold">
          Royal Accumulation Schemes
        </span>
        <h1 className="font-royal text-2xl font-bold text-[#8E5827] mt-0.5">
          Jewellery Savings Plans
        </h1>
        <p className="text-xs text-neutral-600 mt-1">
          Plan ahead for weddings, festivals & milestones with House of Ramanand bonuses.
        </p>
      </div>

      {/* Featured Swarna Nidhi 11+1 Scheme Card */}
      <section className="luxury-card-bg text-white rounded-3xl p-5 border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[#E8CA72] text-[#450B12] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-royal">
            Most Popular Scheme
          </span>
          <span className="text-xs font-mono font-bold text-[#E8CA72]">11 + 1 Scheme</span>
        </div>

        <h2 className="font-royal text-xl font-bold text-[#FAF0CD] leading-snug">
          Swarna Nidhi Royal Plan
        </h2>
        <p className="text-xs text-neutral-300 mt-1">
          Pay for 11 months. The 12th month instalment is fully gifted by House of Ramanand!
        </p>

        {/* Benefits list */}
        <div className="my-4 space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-[#E8CA72] shrink-0" />
            <span>100% 12th Month Bonus gifted by Ramanand</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-[#E8CA72] shrink-0" />
            <span>Special 0% Making Charges Voucher on final redemption</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-200">
            <CheckCircle2 className="w-4 h-4 text-[#E8CA72] shrink-0" />
            <span>Redeem against certified Gold, Diamond, or Polki Ornaments</span>
          </div>
        </div>

        <button
          onClick={() => handleEnroll('Swarna Nidhi 11+1 Royal Plan')}
          className="w-full py-3 bg-gradient-to-r from-[#DFBA54] to-[#AA7A1E] text-neutral-950 font-bold text-xs uppercase rounded-xl tracking-wider shadow-lg hover:brightness-110 transition active:scale-98"
        >
          Enroll in Swarna Nidhi Scheme
        </button>
      </section>

      {/* Interactive Savings Calculator */}
      <section className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-xs">
        <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-neutral-100">
          <Calculator className="w-4 h-4 text-[#8E5827]" />
          <h3 className="font-royal text-sm font-bold text-neutral-900">
            Maturity Benefit Calculator
          </h3>
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-600 block mb-2">
            Select Monthly Instalment:
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[2000, 5000, 10000, 25000].map((amt) => (
              <button
                key={amt}
                onClick={() => setMonthlyAmount(amt)}
                className={`py-2 text-xs font-bold rounded-xl border transition ${
                  monthlyAmount === amt
                    ? 'bg-[#8E5827] text-white border-[#8E5827]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-[#8E5827]'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          {/* Calculator Output Breakdown */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#ECE3D4] space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Your 11 Months Contribution:</span>
              <span className="font-bold text-neutral-900">
                ₹{totalCustomerDeposit.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-[#1F7A40] font-semibold">
              <span>House of Ramanand Gift (1 Month):</span>
              <span>+ ₹{brandBonusGift.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex justify-between font-serif-luxury text-sm font-bold text-[#8E5827]">
              <span>Total Jewellery Redemption Value:</span>
              <span className="text-base">₹{totalMaturityValue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {isEnrolledModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Enrolment Successful
            </span>
            <h3 className="font-royal text-lg font-bold text-neutral-900 mt-2">
              Welcome to {enrolledPlan}
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Your first instalment of ₹{monthlyAmount.toLocaleString('en-IN')} is scheduled. You will receive digital passbook updates.
            </p>
            <p className="text-[11px] text-neutral-400 font-mono mt-2">
              Account No: RJ-SCH-884209
            </p>

            <button
              onClick={() => setIsEnrolledModal(false)}
              className="mt-6 w-full py-3 bg-[#8E5827] text-white rounded-xl text-xs font-bold shadow hover:bg-[#76441B]"
            >
              Continue Exploring Jewellery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
