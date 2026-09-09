"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import EditorialPreloader from "@/components/loader/EditorialPreloader";
import CustomCursor from "@/components/cursor/CustomCursor";
import EditorialNav from "@/components/navigation/EditorialNav";
import ReservationModal from "@/components/modal/ReservationModal";

import HeroSection from "@/components/sections/HeroSection";
import BeveragesShowcase from "@/components/sections/BeveragesShowcase";
import WhatWeServe from "@/components/sections/WhatWeServe";
import ExplodedSamosa from "@/components/sections/ExplodedSamosa";
import SignatureSauces from "@/components/sections/SignatureSauces";
import SweetsGallery from "@/components/sections/SweetsGallery";
import ColdFusionDrinks from "@/components/sections/ColdFusionDrinks";
import TextureGallery from "@/components/sections/TextureGallery";
import ReservationSection from "@/components/sections/ReservationSection";

export default function Home() {
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // On touch devices or mobile screens, use native GPU scrolling for lag-free performance
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches);

    if (isTouchOrMobile) {
      return;
    }

    // Initialize Lenis smooth scroll for buttery desktop inertia
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-[#FAFAF8] text-[#2B2320] min-h-screen selection:bg-[#2B2320] selection:text-[#FAFAF8]">
      {/* 2-3% Subtle Grain Noise Overlay across canvas */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 1. Editorial Preloader (< 1.5s with staggered letter reveal) */}
      <EditorialPreloader onComplete={() => setIsPreloaded(true)} />

      {/* 2. Magnetic Custom Cursor with Context Badges */}
      <CustomCursor />

      {/* 3. Editorial Navigation Header */}
      <EditorialNav onOpenReservation={() => setIsReservationOpen(true)} />

      {/* 4. Orchestrated Reel-Ready Narrative Flow */}
      <div
        className={`transition-opacity duration-700 ${
          isPreloaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* SECTION 01: Hero (Full-Viewport Single Focus: Feast -> Steaming Cha Crossfade) */}
        <HeroSection onOpenReservation={() => setIsReservationOpen(true)} />

        {/* SECTION 02: Artisanal Cha & Coastal Coffee Atelier */}
        <BeveragesShowcase />

        {/* SECTION 03: What We Serve (The Exploded Feast Banquet) */}
        <WhatWeServe />

        {/* SECTION 04: Street Food, Elevated (Exploded Singara 5-Layer Scrub) */}
        <ExplodedSamosa />

        {/* SECTION 05: Kasundi & The Ferment (Artisanal Spoons Condiment Pour) */}
        <SignatureSauces />

        {/* SECTION 06: Our Sweets (Bengal Confectionery & Horizontal Cards) */}
        <SweetsGallery />

        {/* SECTION 07: Cold & Coastal Fusion (Mango Dahi Lassi & Matcha Chai) */}
        <ColdFusionDrinks />

        {/* SECTION 08: Ingredient & Texture Gallery (GSAP Horizontal Parallax Scrub) */}
        <TextureGallery />

        {/* SECTION 09: Finale / Reserve Table CTA & Colophon */}
        <ReservationSection onOpenReservation={() => setIsReservationOpen(true)} />
      </div>

      {/* Private Table & Tea Salon Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </main>
  );
}
