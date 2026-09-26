'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, ArrowLeft, RefreshCw, Truck, FileText, CheckCircle2, Award, Lock } from 'lucide-react';

export function PoliciesScreen() {
  const { activePolicyPage, setActivePolicyPage, setActiveTab } = useApp();

  return (
    <div className="pb-32 bg-white px-4 pt-4 space-y-4 min-h-[80vh]">
      {/* Title */}
      <div className="flex items-center space-x-2 pb-3 border-b border-neutral-100">
        <button
          onClick={() => setActiveTab('account')}
          className="p-1 -ml-1 text-[#8E5827] hover:opacity-80 transition"
          aria-label="Back to Account"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-xl font-normal text-neutral-900 leading-tight">
            Policies & Trust Charter
          </h1>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            House of Ramanand Jaipur Royal Guarantees Since 1936
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-1 text-xs">
        {[
          { key: 'refund', label: 'Returns & Exchange' },
          { key: 'certification', label: 'BIS & IGI Certification' },
          { key: 'shipping', label: 'Insured Transit' },
          { key: 'privacy', label: 'Privacy & Security' },
          { key: 'terms', label: 'Pricing Charter' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActivePolicyPage(tab.key)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-medium text-xs ${
              activePolicyPage === tab.key
                ? 'bg-[#8E5827] text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Policy Content Card */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200/90 shadow-2xs text-xs text-neutral-700 space-y-4 leading-relaxed">
        {activePolicyPage === 'refund' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#8E5827]">
              <RefreshCw className="w-5 h-5 stroke-[1.8]" />
              <h2 className="font-serif-luxury text-base font-semibold text-neutral-900">
                15-Day Return & Lifetime Exchange
              </h2>
            </div>
            <p>
              We want you to cherish every Ramanand jewel with complete peace of mind.
            </p>
            <div className="bg-[#FAF9F7] p-3 rounded-xl border border-neutral-200/80 space-y-2">
              <h3 className="font-semibold text-neutral-900">15-Day Zero Questions Return</h3>
              <p className="text-neutral-600">
                Return standard catalogue jewellery within 15 days in unworn condition with original tamper-proof security tags and certification card for a 100% full refund to your original payment method.
              </p>
            </div>
            <div className="bg-[#FAF9F7] p-3 rounded-xl border border-neutral-200/80 space-y-2">
              <h3 className="font-semibold text-neutral-900">Lifetime Exchange & Buyback</h3>
              <p className="text-neutral-600">
                Avail 100% gold weight value at prevailing market rate and 90% prevailing diamond value across all our flagship salons in Jaipur, Delhi, and Mumbai.
              </p>
            </div>
          </div>
        )}

        {activePolicyPage === 'certification' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#8E5827]">
              <Award className="w-5 h-5 stroke-[1.8]" />
              <h2 className="font-serif-luxury text-base font-semibold text-neutral-900">
                100% Hallmarked & Certified
              </h2>
            </div>
            <p>
              Every ornament leaving our Jaipur ateliers adheres to strict Government of India BIS Hallmarking regulations.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <span className="font-bold text-neutral-900 block">BIS Hallmark 750 / 916 / 999</span>
                <p className="text-neutral-600 mt-0.5">
                  Micro-laser engraved with the BIS logo, Karatage fineness, and unique 6-digit HUID code verifiable on the BIS Care app.
                </p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <span className="font-bold text-neutral-900 block">International Diamond Certification (IGI & GIA)</span>
                <p className="text-neutral-600 mt-0.5">
                  All solitaires and diamond jewels above 0.30 carat are independently certified by the International Gemological Institute (IGI) or GIA.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePolicyPage === 'shipping' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#8E5827]">
              <Truck className="w-5 h-5 stroke-[1.8]" />
              <h2 className="font-serif-luxury text-base font-semibold text-neutral-900">
                Complimentary Insured Shipping
              </h2>
            </div>
            <p>
              Your jewellery is 100% transit-insured from the moment it leaves our Jaipur vault until handed over to you in person.
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-neutral-600">
              <li><strong>Armored Courier:</strong> Transported exclusively via specialized high-security logistics (Sequel Logistics & BVC Security).</li>
              <li><strong>Tamper-Evident Packaging:</strong> Dispatched in sealed, numbered security pouches. Never accept an order with broken seals.</li>
              <li><strong>Secure Handover PIN:</strong> Delivery requires confirmation of a 4-digit secret OTP sent only to your verified mobile number.</li>
            </ul>
          </div>
        )}

        {activePolicyPage === 'privacy' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#8E5827]">
              <Lock className="w-5 h-5 stroke-[1.8]" />
              <h2 className="font-serif-luxury text-base font-semibold text-neutral-900">
                Patron Privacy & Data Discretion
              </h2>
            </div>
            <p>
              House of Ramanand (Estd. 1936, Jaipur) values the utmost confidentiality of our patrons. All transactions utilize 256-bit bank-grade SSL encryption. We never sell or share patron data with third-party advertising brokers.
            </p>
          </div>
        )}

        {activePolicyPage === 'terms' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#8E5827]">
              <FileText className="w-5 h-5 stroke-[1.8]" />
              <h2 className="font-serif-luxury text-base font-semibold text-neutral-900">
                Transparent Pricing Charter
              </h2>
            </div>
            <p>
              Our pricing is completely open and auditable. Every bill itemizes:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-neutral-600">
              <li>Net gold weight multiplied by today's live bullion rate</li>
              <li>Diamond and gemstone total carat weight and stone values</li>
              <li>Fair, competitive artisan crafting charges</li>
              <li>Statutory 3% Goods and Services Tax (GST)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
