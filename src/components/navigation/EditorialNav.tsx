"use client";

import React, { useEffect, useState } from "react";
import CulinarySoundscape from "@/components/audio/CulinarySoundscape";

interface EditorialNavProps {
  onOpenReservation: () => void;
}

export default function EditorialNav({ onOpenReservation }: EditorialNavProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [timeChattogram, setTimeChattogram] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeChattogram(new Intl.DateTimeFormat("en-GB", options).format(new Date()));
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(clockInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-10 py-3 sm:py-4 ${
          scrolled
            ? "bg-[rgba(250,250,248,0.96)] backdrop-blur-md border-b border-[rgba(43,35,32,0.08)] shadow-md"
            : "bg-gradient-to-b from-[rgba(250,250,248,0.94)] via-[rgba(250,250,248,0.65)] to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Mark: VAANAM in Frosted Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#hero"
              className="flex flex-col group text-left cursor-pointer select-none bg-[rgba(250,250,248,0.92)] backdrop-blur-md px-4 py-1.5 rounded-2xl border border-[rgba(43,35,32,0.1)] shadow-sm hover:border-[#6B3F1D] transition-all"
            >
              <span className="font-fraunces text-2xl sm:text-3xl font-light tracking-tight text-[#2B2320] leading-none group-hover:text-[#C23B22] transition-colors">
                VAANAM
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#61534E] mt-0.5 sm:mt-1 font-semibold">
                Chattogram • Feasts & Artisanal Cha
              </span>
            </a>
          </div>

          {/* Narrative Section Links inside Frosted Pill (Strictly Single-Line with whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#2B2320] bg-[rgba(250,250,248,0.92)] backdrop-blur-md px-5 py-2 rounded-full border border-[rgba(43,35,32,0.1)] shadow-sm">
            <a href="#beverages" className="editorial-link whitespace-nowrap hover:text-[#6B3F1D] transition-colors">
              <span className="text-[#96867F] font-mono text-[9px] mr-1 font-normal">02 /</span>Cha & Coffee
            </a>
            <a href="#serve" className="editorial-link whitespace-nowrap hover:text-[#E38A2C] transition-colors">
              <span className="text-[#96867F] font-mono text-[9px] mr-1 font-normal">03 /</span>Feast
            </a>
            <a href="#singara" className="editorial-link whitespace-nowrap hover:text-[#C23B22] transition-colors">
              <span className="text-[#96867F] font-mono text-[9px] mr-1 font-normal">04 /</span>Singara
            </a>
            <a href="#sauces" className="editorial-link whitespace-nowrap hover:text-[#C86D3C] transition-colors">
              <span className="text-[#96867F] font-mono text-[9px] mr-1 font-normal">05 /</span>Kasundi
            </a>
            <a href="#sweets" className="editorial-link whitespace-nowrap hover:text-[#D9A441] transition-colors">
              <span className="text-[#96867F] font-mono text-[9px] mr-1 font-normal">06 /</span>Sweets
            </a>
            <a href="#drinks" className="editorial-link whitespace-nowrap hover:text-[#5C8A3A] transition-colors">
              <span className="text-[#96867F] font-mono text-[9px] mr-1 font-normal">07 /</span>Cold Drinks
            </a>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <CulinarySoundscape />

            <button
              type="button"
              onClick={onOpenReservation}
              className="px-4 sm:px-5 py-2 rounded-full bg-[#C23B22] text-[#FAFAF8] text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold hover:bg-[#2B2320] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </header>

      {/* Repositioned Chattogram Live Clock: Discreet, Elegant Floating Bottom-Left Pill */}
      <div
        suppressHydrationWarning
        className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[rgba(250,250,248,0.95)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] shadow-lg text-[10px] font-mono text-[#61534E] select-none pointer-events-auto"
      >
        <span className="w-2 h-2 rounded-full bg-[#E38A2C] animate-pulse" />
        <span className="font-semibold text-[#2B2320]">CHATTOGRAM</span>
        <span className="text-[#96867F]">·</span>
        <span suppressHydrationWarning>{timeChattogram || "12:00:00"} BST</span>
      </div>
    </>
  );
}
