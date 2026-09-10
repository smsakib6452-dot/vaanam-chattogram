"use client";

import React, { useEffect, useState } from "react";
import CulinarySoundscape from "@/components/audio/CulinarySoundscape";
import { Menu, X, ArrowRight, Phone, MapPin } from "lucide-react";

interface EditorialNavProps {
  onOpenReservation: () => void;
}

const NAV_LINKS = [
  { href: "#hero", num: "01", label: "Origin & Prelude" },
  { href: "#beverages", num: "02", label: "Artisanal Cha & Coffee" },
  { href: "#serve", num: "03", label: "The Assembled Feast" },
  { href: "#singara", num: "04", label: "Exploded Singara" },
  { href: "#sauces", num: "05", label: "Kasundi & Relishes" },
  { href: "#sweets", num: "06", label: "Bengal Sweets" },
  { href: "#drinks", num: "07", label: "Cold Coastal Fusions" },
  { href: "#gallery", num: "08", label: "Sensory Archive" },
  { href: "#reservation", num: "09", label: "Reserve Table" },
];

export default function EditorialNav({ onOpenReservation }: EditorialNavProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [timeChattogram, setTimeChattogram] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

          {/* Desktop Narrative Section Links inside Frosted Pill */}
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
              className="btn-luxury-primary px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap gap-1.5 shadow-md group"
            >
              <span>Reserve Table</span>
              <span className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-transform text-xs">→</span>
            </button>

            {/* Mobile Navigation Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-2.5 rounded-full border border-[rgba(43,35,32,0.14)] bg-[rgba(250,250,248,0.95)] backdrop-blur-md text-[#2B2320] hover:bg-[#2B2320] hover:text-[#FAFAF8] hover:border-[#2B2320] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Editorial Mobile Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 pt-24 bg-[rgba(250,250,248,0.98)] backdrop-blur-2xl ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-6"
        }`}
      >
        {/* Drawer Header Info */}
        <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#61534E]">
            <span className="w-2 h-2 rounded-full bg-[#E38A2C] animate-pulse" />
            <span>Chattogram BST: {timeChattogram || "12:00:00"}</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#96867F]">
            EST. 2026
          </span>
        </div>

        {/* Narrative Chapter Links */}
        <nav className="my-auto py-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[55vh] scrollbar-none">
          {NAV_LINKS.map((link, idx) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleMobileNavClick(link.href)}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[rgba(43,35,32,0.04)] transition-all text-left group cursor-pointer"
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#C86D3C] font-semibold">
                  {link.num}
                </span>
                <span className="font-fraunces text-2xl sm:text-3xl font-light text-[#2B2320] group-hover:text-[#C23B22] transition-colors">
                  {link.label}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#96867F] group-hover:translate-x-1 group-hover:text-[#C23B22] transition-all" />
            </button>
          ))}
        </nav>

        {/* Drawer Bottom Actions & Contacts */}
        <div className="pt-4 border-t border-[rgba(43,35,32,0.08)] space-y-4">
          <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-[#61534E]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C23B22]" />
              <span>GEC Circle, CTG</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Phone className="w-3.5 h-3.5 text-[#C23B22]" />
              <span>+880 1819-VAANAM</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenReservation();
            }}
            className="btn-luxury-primary w-full py-4 text-xs font-semibold uppercase tracking-widest shadow-xl group"
          >
            <span>Reserve A Table</span>
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform font-mono">→</span>
          </button>
        </div>
      </div>

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

