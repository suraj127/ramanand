'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  Navigation
} from 'lucide-react';

interface Store {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  timings: string;
}

const SHOWROOMS: Store[] = [
  {
    id: 'store-jpr-chandpole',
    city: 'Jaipur',
    name: 'House of Ramanand — Flagship Heritage Atelier',
    address: 'B-68 1st Crossing, Godika Ka Rasta, Chandpole Bazar, Khazanewalo, Jaipur, Rajasthan 302001',
    phone: '+91 98290 81651',
    timings: '10:30 AM – 8:30 PM (Mon – Sun)'
  }
];

export function StoreLocatorScreen() {
  const { showToast } = useApp();
  const [selectedStore, setSelectedStore] = useState<Store>(SHOWROOMS[0]);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('2026-09-28');
  const [appointmentTime, setAppointmentTime] = useState('03:00 PM');
  const [booked, setBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setIsAppointmentModalOpen(false);
      showToast(`Appointment confirmed at ${selectedStore.name} for ${appointmentDate} at ${appointmentTime}!`);
    }, 1500);
  };

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Header */}
      <section className="px-4 pt-4 pb-3 border-b border-neutral-100 bg-white">
        <h1 className="font-serif-luxury text-xl font-normal text-neutral-900 leading-tight">
          Find a Showroom
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Experience royal Jaipur craftsmanship in person or book a private trial
        </p>
      </section>

      {/* Showroom Cards */}
      <div className="p-4 space-y-3.5">
        {SHOWROOMS.map((store) => (
          <article
            key={store.id}
            className={`p-4 rounded-xl border transition shadow-2xs ${
              selectedStore.id === store.id ? 'border-[#8E5827] bg-[#FAF8F7]' : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E5827] block">
                  {store.city} Showroom
                </span>
                <h2 className="font-serif-luxury text-sm font-semibold text-neutral-900 mt-0.5">
                  {store.name}
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                Open Today
              </span>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-neutral-600">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{store.timings}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="font-mono">{store.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedStore(store);
                  setIsAppointmentModalOpen(true);
                }}
                className="flex-1 py-2 px-3 bg-[#8E5827] hover:bg-[#76441B] text-white text-xs font-medium rounded-full shadow-2xs transition active:scale-95 text-center"
              >
                Book Appointment
              </button>
              <button
                onClick={() => showToast(`Opening Google Maps directions for ${store.name}`)}
                className="py-2 px-3 border border-neutral-300 hover:border-neutral-400 text-neutral-700 text-xs font-medium rounded-full transition flex items-center space-x-1"
              >
                <Navigation className="w-3 h-3 text-neutral-500" />
                <span>Directions</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-[360px] rounded-2xl p-5 shadow-2xl relative">
            <h3 className="font-serif-luxury text-base font-semibold text-neutral-900 text-center">
              Book Store Trial Appointment
            </h3>
            <p className="text-xs text-neutral-500 text-center mt-0.5">
              {selectedStore.name} ({selectedStore.city})
            </p>

            {booked ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-semibold text-neutral-900">Appointment Confirmed!</p>
                <p className="text-xs text-neutral-500 mt-1">We look forward to welcoming you.</p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="mt-4 space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-xl px-3 py-2 bg-neutral-50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full text-xs border border-neutral-300 rounded-xl px-3 py-2 bg-neutral-50"
                  >
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAppointmentModalOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#8E5827] text-white text-xs font-medium shadow-xs"
                  >
                    Confirm Booking
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
