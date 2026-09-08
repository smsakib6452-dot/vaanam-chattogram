"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

import { assetPath } from "@/lib/assets";

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
  const [shouldPreload, setShouldPreload] = useState<boolean>(priority);

  const isInViewportRef = useRef<boolean>(false);
  isInViewportRef.current = isInViewport;

  // 1. Two-Stage Observer: Preload early (900px ahead) + Play only when on-screen
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // A. Early Proximity Buffer Observer (Starts network buffering 900px before reaching screen)
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldPreload(true);
          if (video && video.preload !== "auto") {
            video.preload = "auto";
            video.load();
          }
        }
      },
      { rootMargin: "900px 0px", threshold: 0 }
    );

    // B. Active Viewport Observer (Starts 60fps playback strictly when in view)
    const activeObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInViewport(true);
          // Only play if video has enough buffer, otherwise buffer handler will play it
          if (video && video.readyState >= 3) {
            video.play().catch(() => {});
            setIsPlaying(true);
          }
        } else {
          setIsInViewport(false);
          video.pause();
          setIsPlaying(false);
        }
      },
      { rootMargin: "20px 0px", threshold: 0.05 }
    );

    preloadObserver.observe(container);
    activeObserver.observe(container);

    return () => {
      preloadObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  // 2. Robust Video Buffer Readiness (Prevents 1-frame stutter on public internet)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const checkAndActivate = () => {
      if (!video) return;

      // Ensure we have future frames buffered (at least 0.8s ahead or canplaythrough)
      const hasBufferedAhead =
        video.buffered.length > 0 &&
        (video.buffered.end(0) - video.currentTime >= 0.8 ||
          video.buffered.end(0) >= (video.duration || 10) * 0.75);

      if (video.readyState >= 3 || hasBufferedAhead) {
        setVideoLoaded(true);
        if (isInViewportRef.current) {
          video.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    };

    const onCanPlayThrough = () => {
      setVideoLoaded(true);
      if (isInViewportRef.current) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    const onPlaying = () => {
      setVideoLoaded(true);
      setIsPlaying(true);
    };

    const onWaiting = () => {
      // Buffer catch-up: gently wait for next chunk without freezing UI
      if (video && video.readyState < 3) {
        // let the buffer accumulate
      }
    };

    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.addEventListener("canplay", checkAndActivate);
    video.addEventListener("progress", checkAndActivate);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);

    if (video.readyState >= 3) {
      checkAndActivate();
    }

    return () => {
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("canplay", checkAndActivate);
      video.removeEventListener("progress", checkAndActivate);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
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

  const resolvedVideoSrc = videoSrc ? assetPath(videoSrc) : undefined;
  const resolvedFallbackImage = assetPath(fallbackImage);

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
          autoPlay
          playsInline
          muted
          loop
          preload={priority || shouldPreload ? "auto" : "none"}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: `translate3d(0, ${currentY}px, 0) scale(${currentScale})`,
            willChange: "transform",
            backfaceVisibility: "hidden",
            transformOrigin: "center center",
            contain: "paint",
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
          src={resolvedFallbackImage}
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
