"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveAsset } from "@/lib/assetResolver";

const GALLERY_ITEMS = [
  {
    id: "samosa",
    caption: "CRUNCH",
    subtext: "Hand-rolled pastry & nigella seed fracture",
    image: "/assets/photos/img-samosa.jpg",
    accent: "#C23B22",
  },
  {
    id: "pani-puri",
    caption: "TANG",
    subtext: "Crisp puffed shell with tamarind mint broth",
    image: "/assets/photos/img-pani-puri.jpg",
    accent: "#5C8A3A",
  },
  {
    id: "spices",
    caption: "RADHUNI",
    subtext: "Stone-pounded coastal aromatics & bay leaves",
    image: "/assets/photos/img-spices-flatlay.jpg",
    accent: "#E38A2C",
  },
  {
    id: "tea",
    caption: "HARVEST",
    subtext: "High-grown orthodox tea leaves from Sylhet hills",
    image: "/assets/photos/img-tea-leaves.jpg",
    accent: "#6B3F1D",
  },
  {
    id: "chai",
    caption: "WARMTH",
    subtext: "Steaming cutting chai in rustic clay kulhad",
    image: "/assets/photos/img-cutting-chai.jpg",
    accent: "#8A5A2B",
  },
];

export default function TextureGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll gallery with buttery inertia
      if (window.innerWidth >= 768) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 500}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Parallax image shift within cards
        const images = track.querySelectorAll(".gallery-img");
        images.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.15, x: -20 },
            {
              scale: 1,
              x: 20,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full bg-[#FAFAF8] py-20 md:py-0 md:h-screen flex flex-col justify-center overflow-hidden border-t border-[rgba(43,35,32,0.06)]"
    >
      {/* Sticky Title Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[rgba(43,35,32,0.08)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E38A2C]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E] font-semibold">
                08 — SENSORY ARCHIVE · INGREDIENT & TEXTURE
              </span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-5xl font-light text-[#2B2320]">
              The Sensory Tapestry.
            </h2>
          </div>
          <p className="text-xs font-mono text-[#61534E] uppercase tracking-[0.2em]">
            Horizontal Scrub · Parallax Motion
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div
        data-cursor="scrub"
        className="w-full overflow-x-auto md:overflow-visible scrollbar-none px-6 sm:px-12"
      >
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 will-change-transform pb-6 md:pb-0"
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              data-cursor="view"
              className="w-[85vw] sm:w-[400px] md:w-[460px] shrink-0 bg-[#FAF8F5] border border-[rgba(43,35,32,0.1)] rounded-3xl p-5 shadow-lg group hover:shadow-2xl transition-all duration-500 relative overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#ECE7DE]">
                <div className="w-full h-full relative gallery-img overflow-hidden">
                  <Image
                    src={resolveAsset(item.image)}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 85vw, 460px"
                    className="object-cover"
                  />
                </div>

                {/* Dramatic Floating One-Word Caption */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none bg-gradient-to-t from-[rgba(43,35,32,0.65)] via-transparent to-transparent">
                  <span
                    className="self-start text-[9px] font-mono tracking-[0.25em] uppercase font-semibold px-3 py-1 rounded-full backdrop-blur-md bg-[rgba(250,250,248,0.92)] shadow-xs"
                    style={{ color: item.accent }}
                  >
                    TEXTURE {item.id.toUpperCase()}
                  </span>

                  <div>
                    <h3 className="font-fraunces text-5xl sm:text-6xl font-normal text-[#FAFAF8] tracking-tight leading-none drop-shadow-md">
                      {item.caption}
                    </h3>
                    <p className="text-xs text-[#FAFAF8] opacity-90 font-inter mt-1.5 drop-shadow-xs">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
