"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

const CHA_VARIETIES = [
  {
    id: "kulhad",
    name: "Matir Kulhad Cha",
    bengali: "মাটির পেয়ালা স্পেশাল চা",
    badge: "POROUS CLAY · CARDAMOM STEAM",
    desc: "Orthodox Sylhet garden leaves simmered with whole milk and bruised green cardamom, poured piping hot into clay cups.",
    statLabel: "BREW STYLE",
    statVal: "Simmered Pot",
  },
  {
    id: "malai",
    name: "Special Malai Cha",
    bengali: "গাঢ় মালাই চা",
    badge: "CLOTTED CREAM · THICK TEXTURE",
    desc: "Slow-steeped concentrated black tea topped with a generous ribbon of freshly clotted buffalo milk cream.",
    statLabel: "CREAM LAYER",
    statVal: "Fresh Malai",
  },
  {
    id: "lebu",
    name: "Lebu-Ada Rong Cha",
    bengali: "লেবু-আদা লাল চা",
    badge: "POST-MEZBANI DIGESTIVE",
    desc: "Robust black tea infused with freshly squeezed citrus lemon, crushed ginger root, and a touch of Himalayan pink salt.",
    statLabel: "DIGESTIVE AID",
    statVal: "Zesty & Light",
  },
  {
    id: "masala",
    name: "Shahi Masala Cha",
    bengali: "শাহী মসলা চা",
    badge: "WHOLE SPICE · CINNAMON & CLOVE",
    desc: "Warming decoction of star anise, Ceylon cinnamon, black pepper, and cloves balanced with sweetened milk.",
    statLabel: "AROMATIC INDEX",
    statVal: "5 Ancestral Spices",
  },
];

const COFFEE_VARIETIES = [
  {
    id: "chicory",
    name: "Coastal Dark Chicory Roast",
    bengali: "ডার্ক চিকোরি ফিল্টার কফি",
    badge: "DARK ROAST · COASTAL VIGOR",
    desc: "High-elevation Arabica beans drum-roasted with caramelized chicory root for a thick, velvety morning or evening cup.",
    statLabel: "ROAST LEVEL",
    statVal: "Dark Wood Drum",
  },
  {
    id: "brass",
    name: "Kansha Brass Drip Decoction",
    bengali: "কাঁসার পাত্রে ড্রিপ কফি",
    badge: "GRAVITATIONAL EXTRACTION",
    desc: "Slow gravity drip through double-chambered brass carafes, aerated into frothy warmth using traditional tumbler and davarah.",
    statLabel: "EXTRACTION",
    statVal: "85°C Precision",
  },
  {
    id: "cold",
    name: "Cold-Steeped Velvet Coffee",
    bengali: "কোল্ড ব্রু কফি",
    badge: "18-HOUR COLD EXTRACTION",
    desc: "Coarsely ground beans steeped cold for eighteen hours, finished with condensed milk and a whisper of green cardamom.",
    statLabel: "STEEP TIME",
    statVal: "18 Hours Cold",
  },
];

export default function BeveragesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Active Category: "cha" or "coffee"
  const [activeCategory, setActiveCategory] = useState<"cha" | "coffee">("cha");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (rightColRef.current) {
        const elements = rightColRef.current.querySelectorAll(".reveal-item");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="beverages"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Responsive Video Showcase (Switches between Cha and Coffee) */}
        <div ref={leftColRef} className="lg:col-span-6 order-2 lg:order-1">
          <div
            data-cursor="scrub"
            className="relative aspect-[4/5] sm:aspect-[1/1] max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#F5F2EB] border border-[rgba(43,35,32,0.08)]"
          >
            <div
              key={activeCategory}
              className="w-full h-full transition-opacity duration-500 ease-out"
            >
              {activeCategory === "cha" ? (
                <VideoScrubber
                  videoSrc="/assets/videos/hero-chai-pour.mp4"
                  fallbackImage="/assets/photos/img-cutting-chai.jpg"
                  alt="Steaming Matir Kulhad Cha poured in daylight"
                  accentColor="#6B3F1D"
                  label="MATIR KULHAD CHA POUR"
                />
              ) : (
                <VideoScrubber
                  videoSrc="/assets/videos/filter-coffee-pour.mp4"
                  fallbackImage="/assets/photos/img-filter-coffee.jpg"
                  alt="Artisanal slow-dripped filter coffee decoction poured into brass tumbler in daylight"
                  accentColor="#8A5A2B"
                  label="FILTER COFFEE DECOCTION"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Menu Options & Details */}
        <div ref={rightColRef} className="lg:col-span-6 order-1 lg:order-2 space-y-7">
          {/* Interactive Category Selector Pill */}
          <div className="reveal-item flex items-center gap-1.5 bg-[rgba(250,250,248,0.96)] backdrop-blur-md border border-[rgba(43,35,32,0.14)] p-1.5 rounded-full shadow-md w-fit">
            <button
              type="button"
              onClick={() => setActiveCategory("cha")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === "cha"
                  ? "bg-gradient-to-r from-[#6B3F1D] to-[#8A5A2B] text-[#FAFAF8] shadow-md -translate-y-0.5 ring-1 ring-white/25"
                  : "text-[#61534E] hover:text-[#6B3F1D] hover:bg-[rgba(107,63,29,0.08)]"
              }`}
            >
              <span>✦ Artisanal Cha (চা)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory("coffee")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === "coffee"
                  ? "bg-gradient-to-r from-[#8A5A2B] to-[#5C3A1E] text-[#FAFAF8] shadow-md -translate-y-0.5 ring-1 ring-white/25"
                  : "text-[#61534E] hover:text-[#8A5A2B] hover:bg-[rgba(138,90,43,0.08)]"
              }`}
            >
              <span>✦ Roasted Coffee (কফি)</span>
            </button>
          </div>

          {/* Display Heading */}
          <div className="reveal-item">
            {activeCategory === "cha" ? (
              <>
                <h2 className="font-fraunces text-4xl sm:text-6xl font-light text-[#6B3F1D] tracking-tight leading-[1.05]">
                  Boiled Slow. <br />
                  <span className="italic font-normal">Steeped in Clay.</span>
                </h2>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#61534E] mt-3">
                  Sylhet High-Grown Leaves · Whole Milk · Porous Clay Kulhad
                </p>
              </>
            ) : (
              <>
                <h2 className="font-fraunces text-4xl sm:text-6xl font-light text-[#8A5A2B] tracking-tight leading-[1.05]">
                  Slow-Dripped. <br />
                  <span className="italic font-normal">Coastal Roast.</span>
                </h2>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#61534E] mt-3">
                  Dark Chicory & Arabica · Kansha Brass Decoction · Est. 2026
                </p>
              </>
            )}
          </div>

          {/* Narrative Body */}
          <p className="reveal-item text-sm text-[#2B2320] font-inter font-light leading-relaxed">
            {activeCategory === "cha"
              ? "In Chattogram, tea is not just a drink—it is the heartbeat of long evening adda and the sacred conclusion to every heavy feast. Our tea leaves are hand-picked from organic garden flushes, simmered slow with bruised cardamom, and served steaming hot in earthen clay cups that impart a distinct rustic minerality."
              : "Crafted for those who crave bold, unhurried depth. Arabica beans roasted with dark caramelized chicory root, steeped through gravitational brass carafes, and frothed between tumbler and davarah to produce a thick, velvety head of aromatic crema."}
          </p>

          {/* List of Varieties */}
          <div className="reveal-item space-y-3 pt-2">
            {activeCategory === "cha"
              ? CHA_VARIETIES.map((item) => (
                  <div
                    key={item.id}
                    data-cursor="view"
                    className="bg-[rgba(250,250,248,0.95)] border border-[rgba(107,63,29,0.16)] p-4 rounded-2xl shadow-xs hover:border-[#6B3F1D] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-fraunces text-base font-semibold text-[#2B2320]">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[11px] text-[#96867F]">
                          {item.bengali}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#6B3F1D] font-semibold bg-[rgba(107,63,29,0.08)] px-2.5 py-0.5 rounded-full">
                        {item.statVal}
                      </span>
                    </div>
                    <p className="text-xs text-[#61534E] font-light mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))
              : COFFEE_VARIETIES.map((item) => (
                  <div
                    key={item.id}
                    data-cursor="view"
                    className="bg-[rgba(250,250,248,0.95)] border border-[rgba(138,90,43,0.16)] p-4 rounded-2xl shadow-xs hover:border-[#8A5A2B] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-fraunces text-base font-semibold text-[#2B2320]">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[11px] text-[#96867F]">
                          {item.bengali}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#8A5A2B] font-semibold bg-[rgba(138,90,43,0.08)] px-2.5 py-0.5 rounded-full">
                        {item.statVal}
                      </span>
                    </div>
                    <p className="text-xs text-[#61534E] font-light mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
