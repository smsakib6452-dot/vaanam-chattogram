"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Award } from "lucide-react";

interface ReservationSectionProps {
  onOpenReservation: () => void;
}

export default function ReservationSection({ onOpenReservation }: ReservationSectionProps) {
  const [quickDate, setQuickDate] = useState<string>("2026-09-18");
  const [quickGuests, setQuickGuests] = useState<number>(2);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenReservation();
  };

  return (
    <footer
      id="reservation"
      className="relative w-full bg-[#FAFAF8] pt-32 pb-20 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.08)]"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Editorial Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(43,35,32,0.1)] bg-[#FAF8F5] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#C86D3C]" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#61534E]">
            08 — Reserve Your Table • Contemporary Coastal Dining
          </span>
        </div>

        {/* Large Typography with Generous Whitespace */}
        <h2 className="font-fraunces text-5xl sm:text-7xl lg:text-8xl font-light text-[#2B2320] tracking-tight leading-[0.98] mb-8">
          Your Table by the <br />
          <span className="italic font-normal">Bay of Bengal.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#61534E] font-inter font-light max-w-xl mx-auto leading-relaxed mb-14">
          Reservations open thirty days in advance. A seated exploration of Chattogram's coastal culinary memory, slow-braised feasts, and fragrant river deltas.
        </p>

        {/* Minimal Quick Booking Form */}
        <form
          onSubmit={handleQuickSubmit}
          className="max-w-2xl mx-auto bg-[#FAF8F5] border border-[rgba(43,35,32,0.12)] p-3 sm:p-4 rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-20"
        >
          {/* Guests */}
          <div className="w-full sm:w-1/3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[rgba(43,35,32,0.1)] text-left">
            <label className="text-[9px] font-mono uppercase tracking-widest text-[#96867F] block">
              Party
            </label>
            <select
              value={quickGuests}
              onChange={(e) => setQuickGuests(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-medium text-[#2B2320] focus:outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="w-full sm:w-1/3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[rgba(43,35,32,0.1)] text-left">
            <label className="text-[9px] font-mono uppercase tracking-widest text-[#96867F] block">
              Seating Date
            </label>
            <input
              type="date"
              value={quickDate}
              onChange={(e) => setQuickDate(e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-[#2B2320] focus:outline-none cursor-pointer"
            />
          </div>

          {/* Submit */}
          <div className="w-full sm:w-auto p-1">
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#2B2320] text-[#FAFAF8] text-xs font-medium uppercase tracking-widest hover:bg-[#C86D3C] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md"
            >
              <span>Book Table</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Editorial Colophon & Locations */}
        <div className="pt-16 border-t border-[rgba(43,35,32,0.08)] grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs font-inter">
          <div>
            <span className="font-fraunces text-xl text-[#2B2320] font-light block mb-2">
              VAANAM
            </span>
            <p className="text-[11px] text-[#61534E] leading-relaxed">
              Contemporary Coastal Dining & Chattogram Culinary Heritage.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#96867F] block mb-2">
              Location
            </span>
            <p className="text-[#2B2320] leading-snug">
              Chattogram, Bangladesh
              <br />
              Coastal Table
            </p>
            <p className="text-[#96867F] text-[11px] mt-1 font-mono">reservations@vaanam-chattogram.com</p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#96867F] block mb-2">
              Service Hours
            </span>
            <p className="text-[#2B2320] leading-snug">
              Tuesday – Sunday
              <br />
              Lunch: 12:30 – 15:30
              <br />
              Dinner: 19:00 – 22:30
            </p>
            <p className="text-[#96867F] text-[11px] mt-1 font-mono">Mondays Closed</p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#96867F] block mb-2">
              Curated Menus
            </span>
            <p className="text-[#2B2320] leading-snug">
              The Mezbani Table
              <br />
              The Coastal Harvest
            </p>
            <p className="text-[#96867F] text-[11px] mt-1 font-mono">Dietary preferences catered</p>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="mt-16 pt-8 border-t border-[rgba(43,35,32,0.06)] flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#96867F]">
          <span>© MMXXVI VAANAM. CHATTOGRAM, BANGLADESH. ALL RIGHTS RESERVED.</span>
          <span className="mt-2 sm:mt-0">CURATED CULINARY EDITORIAL EXPERIENCE</span>
        </div>
      </div>
    </footer>
  );
}
