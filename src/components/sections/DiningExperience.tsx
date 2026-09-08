"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

export default function DiningExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const gallery = galleryRef.current;
    if (!container || !gallery) return;

    const ctx = gsap.context(() => {
      // Parallax stagger for overlapping gallery images
      const cards = gallery.querySelectorAll(".gallery-card");
      cards.forEach((card, i) => {
        const speed = (i + 1) * 35;
        gsap.to(card, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="table"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Large Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(43,35,32,0.1)] bg-[#FAF8F5] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E]">
              07 — THE TABLE
            </span>
          </div>

          <h3 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-light text-[#2B2320] tracking-tight leading-[1.05] mb-6">
            The Table Reassembled.
          </h3>

          <p className="text-sm sm:text-base text-[#61534E] font-inter font-light max-w-xl mx-auto leading-relaxed">
            Individual elements converge into seasoned bell-metal platters, hand-spun Bengal jute, and warm coastal wood. The culmination of culinary gathering.
          </p>
        </div>

        {/* Centerpiece Dining Table Reveal */}
        <div className="relative aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#F4F1EA] border border-[rgba(43,35,32,0.08)] mb-20">
          <VideoScrubber
            videoSrc="/videos/video-6 (2).mp4"
            fallbackImage="/images/IMAGE 04 — BANGLADESHI EDITORIAL DINING.jpg"
            alt="Artisanal contemporary dining table setting in Chattogram"
            zoomIntensity={0.06}
          />
        </div>

        {/* Overlapping Editorial Gallery with Depth Parallax */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Card 1: Artisanal Kansha Metalware */}
          <div className="gallery-card md:col-span-4 bg-[#FAF8F5] border border-[rgba(43,35,32,0.1)] rounded-2xl p-5 shadow-md group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#EDE8E1]">
              <Image
                src="/images/IMAGE 01 — HERO.jpg"
                alt="Handcrafted Kansha brass dining ware"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86D3C] block mb-1">
              Atelier Craft 01
            </span>
            <h4 className="font-fraunces text-lg text-[#2B2320] font-light">
              Kansha Bell-Metal Vessels
            </h4>
            <p className="text-xs text-[#61534E] font-light mt-1.5 leading-relaxed">
              Traditional copper-tin bell metal crafted by Bengal artisans to preserve warmth and honor festive feasting.
            </p>
          </div>

          {/* Card 2: Handcrafted Dining Setting (Center, Shifted Down) */}
          <div className="gallery-card md:col-span-4 md:mt-12 bg-[#FAF8F5] border border-[rgba(43,35,32,0.1)] rounded-2xl p-5 shadow-md group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#EDE8E1]">
              <Image
                src="/images/IMAGE 04 — BANGLADESHI EDITORIAL DINING.jpg"
                alt="Coastal dining table setting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86D3C] block mb-1">
              Atelier Craft 02
            </span>
            <h4 className="font-fraunces text-lg text-[#2B2320] font-light">
              Coastal Teakwood & Jute
            </h4>
            <p className="text-xs text-[#61534E] font-light mt-1.5 leading-relaxed">
              Solid seasoned timber finished with natural beeswax, paired with organic hand-spun unbleached jute.
            </p>
          </div>

          {/* Card 3: Botanical Digestive Ritual */}
          <div className="gallery-card md:col-span-4 bg-[#FAF8F5] border border-[rgba(43,35,32,0.1)] rounded-2xl p-5 shadow-md group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#EDE8E1]">
              <Image
                src="/images/IMAGE 03 — BANGLADESHI SPICE COMPOSITION.jpg"
                alt="Aromatic coastal spices"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86D3C] block mb-1">
              Atelier Craft 03
            </span>
            <h4 className="font-fraunces text-lg text-[#2B2320] font-light">
              Ancestral Scent Ritual
            </h4>
            <p className="text-xs text-[#61534E] font-light mt-1.5 leading-relaxed">
              A concluding digestif pairing roasted mouri (sweet fennel), green cardamom, and fresh betel leaf essence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
