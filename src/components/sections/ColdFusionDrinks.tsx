"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";
import { resolveAsset } from "@/lib/assetResolver";
import { Droplet, Sparkles, Snowflake } from "lucide-react";

export default function ColdFusionDrinks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(".drink-reveal");
      gsap.fromTo(
        items,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drinks"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Tagline */}
        <div className="drink-reveal text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F1EA] border border-[rgba(43,35,32,0.1)] mb-4">
            <Snowflake className="w-3.5 h-3.5 text-[#5C8A3A]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E] font-semibold">
              06 — COLD & REFRESHING FUSIONS
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-6xl font-light text-[#2B2320] tracking-tight">
            Cold & Coastal Fusions.
          </h2>
          <p className="text-xs sm:text-sm text-[#61534E] font-inter mt-3 leading-relaxed">
            The ideal counterpoint after intense savory dining. Chilled probiotics, vibrant fruits, and artisanal botanical blends.
          </p>
        </div>

        {/* Center Split Cinemagraph / Video Panel */}
        <div className="drink-reveal relative aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#F5F2EB] border border-[rgba(43,35,32,0.08)] mb-16">
          <VideoScrubber
            videoSrc="/assets/videos/lassi-matcha-pour.mp4"
            fallbackImage="/assets/photos/img-mango-lassi.jpg"
            alt="Cold poured Mango Lassi and layered Matcha Chai Fusion in daylight"
            accentColor="#F2994A"
            label="COLD INFUSION POUR"
          />
        </div>

        {/* Side-by-Side Split Cards: Mango Lassi & Matcha Chai */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Mango Lassi (Mango Orange #F2994A) */}
          <div className="drink-reveal bg-[#FAF8F5] border border-[rgba(242,153,74,0.3)] rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#F9F5EC]">
              <Image
                src={resolveAsset("/assets/photos/img-mango-lassi.jpg")}
                alt="Chilled Mango Dahi Lassi with saffron and slivered almonds"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[rgba(250,250,248,0.92)] px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase text-[#F2994A] font-semibold backdrop-blur-xs border border-[rgba(242,153,74,0.3)]">
                CHILLED · PROBIOTIC DAHI
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F2994A]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F2994A] font-semibold">
                SEASONAL REFRESHER
              </span>
            </div>

            <h3 className="font-fraunces text-3xl sm:text-4xl font-light text-[#F2994A] tracking-tight mb-3">
              MANGO DAHI LASSI
            </h3>

            <p className="text-xs sm:text-sm text-[#2B2320] font-inter font-light leading-relaxed">
              Cultured whole-milk dahi stone-churned with naturally sweet Rajshahi mango pulp, scented with crushed cardamom seeds and garnished with golden saffron threads.
            </p>

            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[rgba(43,35,32,0.08)] text-[11px] font-mono text-[#61534E]">
              <span>SERVED AT 4°C</span>
              <span>•</span>
              <span>DIGESTION AID</span>
              <span>•</span>
              <span>NO ADDED SUGAR</span>
            </div>
          </div>

          {/* Card 2: Matcha Chai Fusion (Matcha Green #5C8A3A) */}
          <div className="drink-reveal bg-[#FAF8F5] border border-[rgba(92,138,58,0.3)] rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 group">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#F3F7EC]">
              <Image
                src={resolveAsset("/assets/photos/img-matcha-latte.jpg")}
                alt="Iced Matcha Chai Fusion layered with milk and tea extract"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-[rgba(250,250,248,0.92)] px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase text-[#5C8A3A] font-semibold backdrop-blur-xs border border-[rgba(92,138,58,0.3)]">
                BOTANICAL FUSION · ICED
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#5C8A3A]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5C8A3A] font-semibold">
                EASTERN BOTANICAL CRAFT
              </span>
            </div>

            <h3 className="font-fraunces text-3xl sm:text-4xl font-light text-[#5C8A3A] tracking-tight mb-3">
              MATCHA CHAI FUSION
            </h3>

            <p className="text-xs sm:text-sm text-[#2B2320] font-inter font-light leading-relaxed">
              Ceremonial-grade Japanese green matcha whisked cold and layered over concentrated Sylhet orthodox black tea extract, topped with velvety evaporated milk foam.
            </p>

            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[rgba(43,35,32,0.08)] text-[11px] font-mono text-[#61534E]">
              <span>SERVED ICED</span>
              <span>•</span>
              <span>ANTIOXIDANT RICH</span>
              <span>•</span>
              <span>SUBTLE FLORAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
