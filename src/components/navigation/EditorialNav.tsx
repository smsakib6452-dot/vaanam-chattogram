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
      setScrolled(window.scrollY > 50);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-12 py-3.5 sm:py-6 ${
        scrolled
          ? "bg-[rgba(250,250,248,0.92)] backdrop-blur-md border-b border-[rgba(43,35,32,0.06)] py-3 sm:py-4 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Mark */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#hero"
            className="flex flex-col group text-left cursor-pointer select-none"
          >
            <span className="font-fraunces text-xl sm:text-3xl font-light tracking-tight text-[#2B2320] leading-none group-hover:text-[#C86D3C] transition-colors">
              VAANAM
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#61534E] mt-0.5 sm:mt-1">
              Chattogram • Coastal Table
            </span>
          </a>

          {/* Chattogram Live Clock */}
          <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-[rgba(43,35,32,0.1)] text-[11px] font-mono text-[#61534E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C] animate-pulse" />
            <span>CHATTOGRAM {timeChattogram || "12:00:00"} BST</span>
          </div>
        </div>

        {/* Narrative Section Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#61534E]">
          <a href="#story" className="editorial-link hover:text-[#2B2320] transition-colors">
            02 / Story
          </a>
          <a href="#singara" className="editorial-link hover:text-[#2B2320] transition-colors">
            03 / Singara
          </a>
          <a href="#spices" className="editorial-link hover:text-[#2B2320] transition-colors">
            04 / Spices
          </a>
          <a href="#alchemy" className="editorial-link hover:text-[#2B2320] transition-colors">
            05 / Alchemy
          </a>
          <a href="#table" className="editorial-link hover:text-[#2B2320] transition-colors">
            07 / Table
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <CulinarySoundscape />

          <button
            type="button"
            onClick={onOpenReservation}
            className="px-3.5 sm:px-5 py-2 rounded-full bg-[#2B2320] text-[#FAFAF8] text-[10px] sm:text-[11px] uppercase tracking-widest font-medium hover:bg-[#C86D3C] transition-all duration-300 shadow-sm cursor-pointer"
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
}
