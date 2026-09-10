"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";
import { resolveAsset } from "@/lib/assetResolver";

const SWEETS = [
  {
    id: "jalebi",
    name: "Shahi Saffron Jilapi",
    bengali: "শাহী জাফরানি জিলাপি",
    image: "/assets/photos/img-jalebi.jpg",
    tag: "GHEE FRIED · CRISP SPIRAL",
    desc: "Intricately piped fermented batter deep-fried in pure cow ghee and plunged into warm saffron-cardamom syrup.",
  },
  {
    id: "gulab-jamun",
    name: "Chanar Gulab Jamun",
    bengali: "ছানার গুলাব জামুন",
    image: "/assets/photos/img-gulab-jamun.jpg",
    tag: "FRESH CHHANA · PISTACHIO",
    desc: "Silken indigenous chhana kneaded with crushed cardamom, slow-simmered in fragrant rose attar syrup.",
  },
  {
    id: "chomchom",
    name: "Porabari Chomchom",
    bengali: "পোড়াবাড়ির চমচম",
    image: "/assets/photos/img-poster.jpg",
    tag: "MAWA CRUST · CARAMELIZED",
    desc: "Dense, golden-brown milk sweet rolled in freshly grated dried mawa with an unctuous honeyed interior.",
  },
];

export default function SweetsGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = cardsTrackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scrub gallery on desktop
      if (window.innerWidth >= 768) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - track.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 40%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sweets"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Turmeric Gold Accent */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(217,164,65,0.12)] border border-[rgba(217,164,65,0.3)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D9A441]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D9A441] font-semibold">
              06 — OUR SWEETS · BENGAL CONFECTIONERY
            </span>
          </div>

          <h2 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-light text-[#D9A441] tracking-tight leading-[1.05]">
            Our Sweets.
          </h2>

          <p className="text-sm sm:text-base text-[#2B2320] font-inter font-light mt-4 leading-relaxed max-w-xl">
            After the rich savory spices of Chattogram’s feast, sweet indulgence is an ancestral ritual. Handcrafted chhana, clarified ghee, and pure cane sugars simmered into poetry.
          </p>
        </div>

        {/* Large Macro Confectionery Video Panel */}
        <div
          data-cursor="scrub"
          className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#F5F2EA] border border-[rgba(43,35,32,0.08)] mb-16"
        >
          <VideoScrubber
            videoSrc="/assets/videos/sweets-macro.mp4"
            fallbackImage="/assets/photos/img-jalebi.jpg"
            alt="Artisanal sweets macro cinematography in warm golden studio light"
            accentColor="#D9A441"
            label="SWEETS MACRO MOTION"
          />
        </div>

        {/* Horizontal Scrub Card Gallery */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={cardsTrackRef}
            className="flex flex-col md:flex-row gap-6 md:gap-8 will-change-transform"
          >
            {SWEETS.map((sweet) => (
              <div
                key={sweet.id}
                data-cursor="view"
                className="w-full md:w-[420px] shrink-0 bg-[#FAF8F5] border border-[rgba(43,35,32,0.1)] rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#EDE8DF]">
                  <Image
                    src={resolveAsset(sweet.image)}
                    alt={sweet.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[rgba(250,250,248,0.92)] px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase text-[#D9A441] font-semibold backdrop-blur-xs border border-[rgba(217,164,65,0.25)]">
                    {sweet.tag}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-fraunces text-2xl font-light text-[#2B2320]">
                    {sweet.name}
                  </h3>
                  <span className="font-mono text-xs text-[#96867F]">
                    {sweet.bengali}
                  </span>
                </div>

                <p className="text-xs text-[#61534E] font-inter font-light leading-relaxed mt-2">
                  {sweet.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
