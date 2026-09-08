"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";
import { Sparkles, Info } from "lucide-react";

interface SpiceData {
  id: string;
  name: string;
  botanical: string;
  origin: string;
  potency: string;
  notes: string;
  color: string;
  sensory: { heat: number; aroma: number; wood: number; earth: number };
}

const SPICES: SpiceData[] = [
  {
    id: "radhuni",
    name: "Radhuni",
    botanical: "Trachyspermum roxburghianum",
    origin: "Bengal Estuaries",
    potency: "Citrus-Parsley Seed Aroma",
    notes: "The signature aromatic backbone of authentic Mezbani beef and Bengali whole-spice tempering.",
    color: "#A89F68",
    sensory: { heat: 4, aroma: 10, wood: 6, earth: 7 },
  },
  {
    id: "kalo-jeere",
    name: "Kalo Jeere",
    botanical: "Nigella sativa",
    origin: "Bengal River Plains",
    potency: "Peppery Herbaceous Crackle",
    notes: "Imparts an earthy crackle to singara pastry, tempered mustard oils, and delicate coastal gravies.",
    color: "#2B2320",
    sensory: { heat: 3, aroma: 8, wood: 5, earth: 9 },
  },
  {
    id: "shukno-morich",
    name: "Shukno Morich",
    botanical: "Capsicum annuum",
    origin: "Bogura Plains",
    potency: "Toasted Sun-Dried Heat",
    notes: "Dry-roasted on cast iron skillets before being crushed into bhortas or simmered into rich kala bhuna.",
    color: "#B44010",
    sensory: { heat: 9, aroma: 7, wood: 4, earth: 6 },
  },
  {
    id: "deshi-haldi",
    name: "Deshi Haldi",
    botanical: "Curcuma longa",
    origin: "Chittagong Hill Tracts",
    potency: "Golden Earthy Resonance",
    notes: "Stone-ground local rhizomes providing radiant color, gentle bitterness, and grounded warmth.",
    color: "#E5A93C",
    sensory: { heat: 2, aroma: 7, wood: 6, earth: 10 },
  },
  {
    id: "tej-pata",
    name: "Tej Pata",
    botanical: "Cinnamomum tamala",
    origin: "Sylhet & Eastern Hills",
    potency: "Herbal Clove & Sweet Wood",
    notes: "Essential aromatic leaf that slowly infuses chinigura rice, slow meat degchis, and festive broths.",
    color: "#6A7B54",
    sensory: { heat: 1, aroma: 9, wood: 8, earth: 5 },
  },
  {
    id: "gol-morich",
    name: "Gol Morich",
    botanical: "Piper nigrum",
    origin: "Bengal Trade Belts",
    potency: "Sharp Peppery Warmth",
    notes: "Coarsely crushed to balance the rich gelatinous depth of slow-simmered beef without cloying heat.",
    color: "#3A2E2B",
    sensory: { heat: 8, aroma: 8, wood: 7, earth: 4 },
  },
  {
    id: "elach",
    name: "Elach",
    botanical: "Elettaria cardamomum",
    origin: "Historic Trade Routes",
    potency: "Resinous Floral Sweetness",
    notes: "Bruised green pods lending bright, refreshing fragrance to royal polao and celebratory curries.",
    color: "#7A8B5B",
    sensory: { heat: 2, aroma: 10, wood: 4, earth: 3 },
  },
];

export default function IngredientsConstellation() {
  const [activeSpice, setActiveSpice] = useState<SpiceData>(SPICES[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="spices"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-24 sm:py-32 px-6 sm:px-12 border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[rgba(43,35,32,0.08)] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E]">
                04 — THE SPICE LANGUAGE
              </span>
            </div>
            <h3 className="font-fraunces text-4xl sm:text-6xl font-light text-[#2B2320] tracking-tight">
              The Spice Language.
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#61534E] font-inter max-w-sm mt-4 md:mt-0 leading-relaxed font-light">
            Seven ancestral spices of Bengal culinary lore, celebrated whole and unlocked through slow cooking and tempered heat.
          </p>
        </div>

        {/* Central Display: Visual Backdrop + Interactive Constellation Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Video 3 / Still Life Visual */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-[rgba(43,35,32,0.08)] bg-[#F4F1EA]">
            <VideoScrubber
              videoSrc="/videos/video-3 (2).mp4"
              fallbackImage="/images/IMAGE 03 — BANGLADESHI SPICE COMPOSITION.jpg"
              alt="Authentic Bangladeshi spices in geometric editorial composition"
              zoomIntensity={0.06}
            />

            {/* Botanical Focal Badges */}
            <div className="absolute top-4 left-4 p-3 bg-[rgba(250,250,248,0.96)] rounded-xl border border-[rgba(43,35,32,0.1)] flex items-center gap-2.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C86D3C]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#2B2320]">
                Active Focus: {activeSpice.name}
              </span>
            </div>
          </div>

          {/* Right: Selected Spice Dossier Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#FAF8F5] border border-[rgba(43,35,32,0.1)] rounded-2xl shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-4 mb-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C86D3C] font-semibold">
                  BOTANICAL DOSSIER
                </span>
                <span className="text-[10px] font-mono text-[#96867F]">
                  {activeSpice.origin}
                </span>
              </div>

              <h4 className="font-fraunces text-2xl sm:text-3xl font-light text-[#2B2320] mb-1">
                {activeSpice.name}
              </h4>
              <p className="text-xs font-mono italic text-[#61534E] mb-4">
                {activeSpice.botanical}
              </p>

              <div className="p-3 bg-white border border-[rgba(43,35,32,0.08)] rounded-xl mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#96867F] block mb-1">
                  Sensory Character
                </span>
                <span className="text-xs font-medium text-[#2B2320]">
                  {activeSpice.potency}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#61534E] font-inter font-light leading-relaxed mb-6">
                {activeSpice.notes}
              </p>

              {/* Sensory Radar Sliders */}
              <div className="space-y-3 pt-4 border-t border-[rgba(43,35,32,0.08)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#61534E] block">
                  Sensory Harmonic Profile
                </span>
                {Object.entries(activeSpice.sensory).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="capitalize font-mono text-[11px] text-[#61534E]">
                      {key}
                    </span>
                    <div className="w-36 h-1 bg-[rgba(43,35,32,0.1)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C86D3C] transition-all duration-300"
                        style={{ width: `${val * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Constellation Selector Pills */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {SPICES.map((spice) => {
            const isSelected = activeSpice.id === spice.id;
            return (
              <button
                key={spice.id}
                type="button"
                onClick={() => setActiveSpice(spice)}
                onMouseEnter={() => setActiveSpice(spice)}
                className={`p-3.5 text-left border rounded-xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-[#2B2320] bg-white shadow-md ring-1 ring-[#2B2320] -translate-y-1"
                    : "border-[rgba(43,35,32,0.1)] bg-[#FAF8F5] hover:border-[rgba(43,35,32,0.25)] hover:-translate-y-0.5"
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full mb-2"
                  style={{ backgroundColor: spice.color }}
                />
                <div className="text-xs font-medium text-[#2B2320] truncate">
                  {spice.name}
                </div>
                <div className="text-[10px] font-mono text-[#96867F] truncate mt-0.5">
                  {spice.botanical}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
