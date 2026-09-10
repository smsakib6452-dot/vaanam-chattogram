"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<"default" | "interactive" | "media">("default");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices with desktop width
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Anchor exactly at center (so size changes never shift the cursor off-center)
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Hardware-accelerated ultra-smooth GSAP quickTo setters
    // Dot follows instantaneously (0.04s) for razor-sharp precision
    const dotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" });

    // Outer ring follows with buttery smooth inertia (0.28s)
    const ringX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

    let lastTargetCheck = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Instant 120Hz update
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      // Throttled element inspection for 60-120fps performance
      const now = performance.now();
      if (now - lastTargetCheck > 50) {
        lastTargetCheck = now;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const isMedia = target.closest("[data-cursor='scrub'], [data-cursor='view'], video");
        const isInteractive = target.closest("button, a, input, select, textarea, [role='button'], .cursor-pointer");

        if (isMedia) {
          setHoverType("media");
        } else if (isInteractive) {
          setHoverType("interactive");
        } else {
          setHoverType("default");
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768)
  ) {
    return null;
  }

  return (
    <>
      {/* 1. Precision Center Dot (0ms lag, always pinpointed) */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[99999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          hoverType === "media"
            ? "w-2 h-2 bg-[#E38A2C] shadow-[0_0_8px_rgba(227,138,44,0.8)]"
            : hoverType === "interactive"
            ? "w-1.5 h-1.5 bg-[#C23B22]"
            : "w-2 h-2 bg-[#2B2320]"
        }`}
        style={{
          willChange: "transform",
        }}
      />

      {/* 2. Buttery Smooth Outer Inertia Ring (No obstructive text, pure cinematic elegance) */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`hidden md:flex fixed top-0 left-0 pointer-events-none z-[99998] items-center justify-center rounded-full ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          hoverType === "media"
            ? "w-12 h-12 border border-[rgba(227,138,44,0.65)] bg-[rgba(250,250,248,0.18)] backdrop-blur-xs shadow-md scale-100"
            : hoverType === "interactive"
            ? "w-10 h-10 border border-[#2B2320] bg-[rgba(43,35,32,0.06)] scale-100"
            : "w-7 h-7 border border-[rgba(43,35,32,0.25)] scale-90"
        }`}
        style={{
          willChange: "transform",
          transition:
            "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
}
