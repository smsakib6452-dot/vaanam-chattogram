"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices with desktop width
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animFrameId: number;

    let lastHoverCheck = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const now = performance.now();
      if (now - lastHoverCheck > 60) {
        lastHoverCheck = now;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const scrubEl = target.closest("[data-cursor='scrub']");
        const viewEl = target.closest("[data-cursor='view']");
        const interactiveEl = target.closest("button, a, input, select, [role='button']");

        if (scrubEl) {
          setCursorText("SCRUB");
          setIsHovered(true);
        } else if (viewEl) {
          setCursorText("VIEW");
          setIsHovered(true);
        } else if (interactiveEl) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Smooth lerp for ring follower
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animFrameId);
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
      {/* Central pinpoint */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`hidden md:block fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#2B2320] pointer-events-none z-[99999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-0" : "scale-100"}`}
        style={{ willChange: "transform" }}
      />

      {/* Smooth outer follower with context badge */}
      <div
        ref={cursorRingRef}
        aria-hidden="true"
        className={`hidden md:flex fixed top-0 left-0 pointer-events-none z-[99998] -ml-5 -mt-5 items-center justify-center transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          cursorText
            ? "w-16 h-16 bg-[#2B2320] text-[#FAFAF8] rounded-full scale-100 shadow-xl"
            : isHovered
            ? "w-12 h-12 border border-[#2B2320] bg-[rgba(43,35,32,0.06)] rounded-full scale-100"
            : "w-10 h-10 border border-[rgba(43,35,32,0.25)] rounded-full scale-75"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="text-[9px] font-medium tracking-widest uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
