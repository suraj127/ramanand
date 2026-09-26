'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Order } from '@/types/jewellery';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  FileText,
  X,
  MapPin,
  Lock,
  ArrowRight
} from 'lucide-react';

export function OrderHistoryScreen() {
  const { orders, setActiveTab, setSelectedCategory, showToast } = useApp();
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Confirmed':
      case 'Processing':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-neutral-50 text-neutral-800 border-neutral-200';
    }
  };

  const handleOpenTracking = (order: Order) => {
    setSelectedTrackingOrder(order);
  };

  const handleOpenInvoice = (order: Order) => {
    setSelectedInvoiceOrder(order);
  };

  return (
    <div className="pb-32 bg-white px-4 pt-4 min-h-[80vh] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h1 className="font-serif-luxury text-xl font-normal text-neutral-900 leading-tight">
            Order History & Tracking
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Insured door-to-door transit from our Jaipur atelier
          </p>
        </div>
      </div>

      {/* Orders List or Empty State */}
      {orders.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#8E5827]/20 flex items-center justify-center mx-auto text-[#8E5827]">
            <Package className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif-luxury text-lg font-medium text-neutral-900">
              No Orders Yet
            </h2>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Your placed orders and insured door-to-door transit tracking from our Jaipur atelier will appear here.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('collection');
            }}
            className="px-6 py-2.5 bg-[#8E5827] text-white text-xs font-medium rounded-full shadow-xs hover:bg-[#76441B] transition active:scale-95"
          >
            Explore Fine Jewellery
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl p-4 border border-neutral-200/90 shadow-2xs space-y-3"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start pb-2.5 border-b border-neutral-100 text-xs">
              <div>
                <span className="font-mono font-bold text-neutral-900 block">{order.id}</span>
                <span className="text-[10px] text-neutral-400">Ordered on {order.date}</span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Items List */}
            <div className="space-y-2.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs">
                  <div className="w-14 h-14 rounded-lg bg-[#FCFAF8] p-1 border border-neutral-100 shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif-luxury font-medium text-neutral-900 leading-tight">
                      {item.productName}
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Qty: {item.quantity} • Gross {item.selectedWeight}g
                    </p>
                    <p className="font-semibold text-neutral-900 mt-0.5 font-serif-luxury">
                      ₹ {item.price.toLocaleString('en-IN').replace(/,/g, ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Total and Actions */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-neutral-400 text-[10px] block">Total Amount</span>
                <span className="font-serif-luxury text-sm font-semibold text-neutral-900">
                  ₹ {order.totalAmount.toLocaleString('en-IN').replace(/,/g, ' ')}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenInvoice(order)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 text-[11px] font-medium text-neutral-700 hover:bg-neutral-50 transition flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Invoice</span>
                </button>
                <button
                  onClick={() => handleOpenTracking(order)}
                  className="px-3 py-1.5 rounded-lg bg-[#8E5827] text-white text-[11px] font-medium shadow-2xs hover:bg-[#76441B] transition flex items-center space-x-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

      {/* Shipment Tracking Drawer Modal */}
      {selectedTrackingOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in p-0 sm:p-4">
          <div className="w-full max-w-[440px] bg-white rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-4 space-y-4 shadow-xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#8E5827]/10 text-[#8E5827] flex items-center justify-center">
                  <Truck className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-base font-semibold text-neutral-900">
                    Insured Live Tracking
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Awb #{selectedTrackingOrder.trackingNumber || 'SEQL-HOR-77291JAIPUR'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrackingOrder(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Armored Courier Info */}
            <div className="bg-[#FAF9F7] rounded-xl p-3 border border-neutral-200/80 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Logistics Partner:</span>
                <span className="font-semibold text-neutral-900">Sequel Armored Logistics</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-bold text-[#8E5827]">{selectedTrackingOrder.estimatedDelivery || '28 Sep 2026'}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-neutral-200/60">
                <span className="text-neutral-500">Security Delivery PIN:</span>
                <span className="font-mono font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                  4892 (Share only with courier)
                </span>
              </div>
            </div>

            {/* Tracking Milestones */}
            <div className="py-2 pl-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
                Transit Milestones
              </span>

              <div className="relative border-l-2 border-[#8E5827] ml-3 space-y-5 pb-1">
                {/* Step 1 */}
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-[#8E5827] flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900">Order Confirmed & Hallmarked</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Assayed with BIS hallmark certificate at Jaipur Atelier.
                  </p>
                  <span className="text-[9px] text-neutral-400">26 Sep, 11:20 AM</span>
                </div>

                {/* Step 2 */}
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-[#8E5827] flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900">Tamper-Proof Box Sealed</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Sealed in barcode serial security pouch with insurance card.
                  </p>
                  <span className="text-[9px] text-neutral-400">26 Sep, 04:45 PM</span>
                </div>

                {/* Step 3 */}
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-[#8E5827] ring-4 ring-[#8E5827]/20 flex items-center justify-center text-white animate-pulse">
                    <Truck className="w-2.5 h-2.5" />
                  </div>
                  <h4 className="text-xs font-semibold text-[#8E5827]">In Insured Transit</h4>
                  <p className="text-[10px] text-neutral-600 mt-0.5">
                    Package departed Jaipur Air Hub via Armored Sequel Vault Transit.
                  </p>
                  <span className="text-[9px] text-[#8E5827] font-medium">In Transit</span>
                </div>

                {/* Step 4 */}
                <div className="relative pl-5">
                  <div className="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-neutral-200 border-2 border-white"></div>
                  <h4 className="text-xs font-medium text-neutral-400">Out for Insured Delivery</h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Delivery associate will verify 4-digit PIN prior to handover.
                  </p>
                  <span className="text-[9px] text-neutral-400">Expected 28 Sep</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedTrackingOrder(null)}
              className="w-full py-2.5 bg-neutral-100 text-neutral-800 rounded-xl text-xs font-medium hover:bg-neutral-200 transition"
            >
              Close Tracking
            </button>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-[400px] bg-white rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto border border-neutral-200 text-xs">
            <div className="flex justify-between items-start border-b border-neutral-100 pb-3">
              <div>
                <span className="font-serif-luxury text-sm font-semibold tracking-wider uppercase text-neutral-900">
                  House of Ramanand
                </span>
                <p className="text-[10px] text-neutral-400">Jaipur Since 1936 • GSTIN: 08AAACH1936R1Z9</p>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-neutral-500">
                <span>Tax Invoice No:</span>
                <span className="font-mono text-neutral-900 font-bold">INV-{selectedInvoiceOrder.id}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Date:</span>
                <span className="text-neutral-900">{selectedInvoiceOrder.date}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Payment Mode:</span>
                <span className="text-neutral-900">{selectedInvoiceOrder.paymentMethod} (Verified)</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="border-t border-b border-neutral-100 py-2.5 space-y-2">
              {selectedInvoiceOrder.items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <span className="font-medium text-neutral-900 block">{it.productName}</span>
                    <span className="text-[10px] text-neutral-400">HSN: 7113 • Gross Wt: {it.selectedWeight}g</span>
                  </div>
                  <span className="font-mono font-medium text-neutral-900">₹{it.price.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-1 text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono">₹{selectedInvoiceOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {selectedInvoiceOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Voucher Discount:</span>
                  <span className="font-mono">-₹{selectedInvoiceOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Statutory GST (3%):</span>
                <span className="font-mono">₹{selectedInvoiceOrder.taxGst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 pt-1.5 border-t border-neutral-100 text-sm">
                <span>Grand Total Paid:</span>
                <span className="font-serif-luxury text-[#8E5827]">₹{selectedInvoiceOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  showToast('Tax invoice PDF downloaded to your device!');
                  setSelectedInvoiceOrder(null);
                }}
                className="w-full py-2.5 bg-[#8E5827] text-white rounded-xl font-medium shadow-2xs hover:bg-[#76441B] transition"
              >
                Download PDF Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
