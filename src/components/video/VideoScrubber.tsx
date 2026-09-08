"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface VideoScrubberProps {
  videoSrc?: string;
  fallbackImage: string;
  alt: string;
  progress?: number; // Scroll progress [0, 1]
  priority?: boolean;
  className?: string;
  zoomIntensity?: number;
  label?: string;
  showSteam?: boolean;
}

export default function VideoScrubber({
  videoSrc,
  fallbackImage,
  alt,
  progress = 0,
  priority = false,
  className = "",
  zoomIntensity = 0.12,
  label = "60 FPS CINEMATIC MOTION",
}: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  // 1. Single-Active Video Manager: Only decode and play when visible in viewport
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInViewport(true);
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          setIsInViewport(false);
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        rootMargin: "100px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // 2. Manage video loaded state safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const onCanPlay = () => {
      setVideoLoaded(true);
      if (isInViewport) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onCanPlay);

    if (video.readyState >= 3) {
      setVideoLoaded(true);
      if (isInViewport) {
        video.play().catch(() => {});
      }
    }

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onCanPlay);
    };
  }, [videoSrc, isInViewport]);

  // 3. Play / Pause toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Hardware-accelerated camera zoom based on scroll progress
  const currentScale = 1.0 + Math.max(0, Math.min(progress, 1)) * zoomIntensity;
  const currentY = (Math.max(0, Math.min(progress, 1)) - 0.5) * -14;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resolvedVideoSrc = videoSrc
    ? videoSrc.startsWith("http")
      ? videoSrc
      : `${basePath}${videoSrc}`
    : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#FAFAF8] select-none ${className}`}
    >
      {/* 1. Real 1080p HD MP4 Video Element (Hardware-accelerated, zero stutter) */}
      {resolvedVideoSrc && (
        <video
          ref={videoRef}
          src={resolvedVideoSrc}
          playsInline
          muted
          loop
          preload={priority ? "auto" : "metadata"}
          disablePictureInPicture
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate3d(0, ${currentY}px, 0) scale(${currentScale})`,
            willChange: "transform",
            backfaceVisibility: "hidden",
            transformOrigin: "center center",
          }}
        />
      )}

      {/* 2. Fallback Base Image while video buffers */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
          videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          transform: `translate3d(0, ${currentY}px, 0) scale(${currentScale})`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <Image
          src={fallbackImage}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1920px"
          className="object-cover object-center"
          quality={95}
        />
      </div>

      {/* 3. Sleek Luxury Editorial Motion Pill */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] px-3 py-1.5 rounded-full shadow-md pointer-events-auto">
        <button
          type="button"
          onClick={togglePlay}
          className="w-6 h-6 rounded-full bg-[#2B2320] text-[#FAFAF8] flex items-center justify-center hover:bg-[#C86D3C] transition-colors cursor-pointer shadow-sm"
          title={isPlaying ? "Pause Motion" : "Resume 60fps Motion"}
          aria-label={isPlaying ? "Pause Motion" : "Resume 60fps Motion"}
        >
          {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 ml-0.5" />}
        </button>
        <div className="flex items-center gap-1.5 pr-1">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying ? "bg-emerald-600 animate-pulse" : "bg-[#96867F]"
            }`}
          />
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#61534E]">
            {isPlaying ? "60 FPS MOTION" : "PAUSED"}
          </span>
        </div>
      </div>
    </div>
  );
}
