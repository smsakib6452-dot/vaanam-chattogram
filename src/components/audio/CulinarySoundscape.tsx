"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function CulinarySoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientNodesRef = useRef<{
    noiseSource?: AudioBufferSourceNode;
    oscillators?: OscillatorNode[];
    lfo?: OscillatorNode;
    interval?: NodeJS.Timeout;
  }>({});

  // 1. Instant Pleasant Bell / Singing Bowl Chime
  const playChime = (ctx: AudioContext, baseFreq: number = 528, isExit: boolean = false) => {
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      if (isExit) {
        // Soft descending exit tone
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, now + 0.6);
        osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + 0.6);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.65);
        osc2.stop(now + 0.65);
      } else {
        // Clear, resonant solfeggio entrance chime (528 Hz - Solfeggio clarity)
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc2.frequency.setValueAtTime(baseFreq * 2, now); // Octave harmonic

        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.25);
        osc2.stop(now + 1.25);
      }
    } catch (e) {
      console.warn("Chime playback error:", e);
    }
  };

  // 2. Start Continuous Culinary Ambient Soundscape
  const startAmbientLoop = (ctx: AudioContext, masterGain: GainNode) => {
    const now = ctx.currentTime;
    const cleanupNodes: {
      noiseSource?: AudioBufferSourceNode;
      oscillators: OscillatorNode[];
      lfo?: OscillatorNode;
      interval?: NodeJS.Timeout;
    } = {
      oscillators: [],
    };

    // A. Sizzling Tadka / Simmering Tea Kettle Texture (Filtered Pink/Bandpass Noise)
    // Between 1000Hz and 3400Hz - highly audible on laptop/phone speakers
    const sampleRate = ctx.sampleRate;
    const bufferSize = sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.06;
      b1 = 0.96 * b1 + white * 0.08;
      b2 = 0.86 * b2 + white * 0.12;
      output[i] = (b0 + b1 + b2) * 0.18;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1800, now);
    noiseFilter.Q.setValueAtTime(1.4, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22, now);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(now);
    cleanupNodes.noiseSource = noiseSource;

    // B. Warm Ambient Bengal Harmonium / Tanpura Drone (Acoustic resonance: 220Hz & 330Hz)
    const frequencies = [220, 330, 440];
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, now);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(850, now);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    // Slow breathing LFO tremolo (0.18 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.18, now);
    lfoGain.gain.setValueAtTime(0.04, now);
    lfo.connect(lfoGain);
    lfoGain.connect(droneGain.gain);
    lfo.start(now);
    cleanupNodes.lfo = lfo;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq + (idx === 1 ? 0.5 : 0), now); // Subtle natural beating
      osc.connect(droneFilter);
      osc.start(now);
      cleanupNodes.oscillators.push(osc);
    });

    // C. Micro Tadka Pops & Mustard Seed Crackles (Occasional gentle authentic clicks)
    cleanupNodes.interval = setInterval(() => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      try {
        const clickCtx = audioCtxRef.current;
        const clickNow = clickCtx.currentTime;
        const clickOsc = clickCtx.createOscillator();
        const clickGain = clickCtx.createGain();

        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(1200 + Math.random() * 1600, clickNow);

        clickGain.gain.setValueAtTime(0.08, clickNow);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, clickNow + 0.04);

        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start(clickNow);
        clickOsc.stop(clickNow + 0.045);
      } catch {
        // Safe skip
      }
    }, 450);

    ambientNodesRef.current = cleanupNodes;
  };

  // 3. Stop Continuous Ambient Soundscape
  const stopAmbientLoop = () => {
    const nodes = ambientNodesRef.current;
    if (nodes.interval) clearInterval(nodes.interval);
    if (nodes.noiseSource) {
      try {
        nodes.noiseSource.stop();
        nodes.noiseSource.disconnect();
      } catch {}
    }
    if (nodes.oscillators) {
      nodes.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
    }
    if (nodes.lfo) {
      try {
        nodes.lfo.stop();
        nodes.lfo.disconnect();
      } catch {}
    }
    ambientNodesRef.current = {};
  };

  // 4. Toggle Sound Handler (Direct User Gesture)
  const toggleSound = async () => {
    try {
      // Synchronously instantiate AudioContext on user gesture
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;

      // Resume context if browser suspended it
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Create master gain if missing
      if (!masterGainRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;
      }

      const gain = masterGainRef.current;

      if (isPlaying) {
        // Turn OFF
        playChime(ctx, 396, true);
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

        setTimeout(() => {
          stopAmbientLoop();
        }, 500);

        setIsPlaying(false);
      } else {
        // Turn ON
        // 1. Play immediate crystal-clear feedback chime so user instantly hears sound
        playChime(ctx, 528, false);

        // 2. Start rich ambient simmer & harmonic drone
        stopAmbientLoop();
        startAmbientLoop(ctx, gain);

        // 3. Smoothly ramp master gain to clear audible volume (0.35)
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.6);

        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Error toggling culinary soundscape:", err);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientLoop();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold select-none cursor-pointer group shadow-sm ${
        isPlaying
          ? "border-[#E38A2C] bg-[rgba(250,250,248,0.98)] text-[#2B2320] ring-2 ring-[rgba(227,138,44,0.25)]"
          : "border-[rgba(43,35,32,0.14)] hover:border-[#2B2320] bg-[rgba(250,250,248,0.85)] backdrop-blur-sm text-[#2B2320]"
      }`}
      aria-label={isPlaying ? "Mute culinary soundscape" : "Enable culinary acoustic soundscape"}
      title="Ambient Culinary Acoustic Soundscape (528Hz Solfeggio & Bengal Tadka Simmer)"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E38A2C] opacity-80" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? "bg-[#E38A2C]" : "bg-[rgba(43,35,32,0.3)]"
          }`}
        />
      </span>
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#E38A2C] animate-pulse" />
          <span className="whitespace-nowrap text-[#E38A2C]">Sound: On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#61534E] opacity-70 group-hover:opacity-100" />
          <span className="whitespace-nowrap text-[#61534E]">Sound: Off</span>
        </>
      )}
    </button>
  );
}
