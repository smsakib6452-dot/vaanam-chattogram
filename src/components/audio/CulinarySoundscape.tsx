"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function CulinarySoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{
    noiseSource?: AudioBufferSourceNode;
    droneGain?: GainNode;
    oscillators: OscillatorNode[];
    lfo?: OscillatorNode;
    lfoGain?: GainNode;
  }>({
    oscillators: [],
  });

  // Soft welcoming singing bowl chime when sound turns ON
  const playWelcomeChime = (ctx: AudioContext, destination: AudioNode) => {
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm peaceful harmonic chime (330Hz E4 and 660Hz E5)
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(329.63, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);

      chimeGain.gain.setValueAtTime(0.18, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(chimeGain);
      chimeGain.connect(destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.1);
      osc2.stop(now + 3.1);
    } catch {
      // Safe skip
    }
  };

  // Start continuous, infinite ambient soundscape (audible on phones, laptops, and headphones)
  const startContinuousSoundscape = (ctx: AudioContext, masterGain: GainNode) => {
    const now = ctx.currentTime;
    const sampleRate = ctx.sampleRate;
    const bufferDuration = 4; // 4 seconds seamless loop
    const bufferSize = sampleRate * bufferDuration;

    // --- LAYER 1: WARM BENGAL HARMONIUM / TANPURA MEDITATION CHORD ---
    // Frequencies: A3 (220Hz), E4 (330Hz), A4 (440Hz), B3 (246.9Hz)
    // These frequencies are in the warm, audible sweet spot for all phone & laptop speakers.
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(750, now);
    droneFilter.Q.setValueAtTime(1.2, now);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.28, now);

    // Slow breathing LFO filter modulation (0.1Hz = 10s wave cycle)
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.1, now);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(180, now); // Sweeps filter frequency between 570Hz and 930Hz

    lfo.connect(lfoGain);
    lfoGain.connect(droneFilter.frequency);
    lfo.start(now);

    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    const chords = [
      { freq: 220.0, type: "sine" as OscillatorType, detune: 0 },
      { freq: 220.0, type: "sine" as OscillatorType, detune: 4 }, // Chorus warmth
      { freq: 329.63, type: "sine" as OscillatorType, detune: -2 }, // Warm fifth
      { freq: 440.0, type: "triangle" as OscillatorType, detune: 0 }, // Velvety harmonic
    ];

    const oscNodes: OscillatorNode[] = [];
    chords.forEach((note) => {
      const osc = ctx.createOscillator();
      osc.type = note.type;
      osc.frequency.setValueAtTime(note.freq, now);
      osc.detune.setValueAtTime(note.detune, now);
      osc.connect(droneFilter);
      osc.start(now);
      oscNodes.push(osc);
    });

    // --- LAYER 2: ORGANIC TEA SIMMER & COASTAL BREEZE (PINK NOISE) ---
    // Creates a soothing, gentle sizzle/simmer backdrop (like steaming tea in a clay cup)
    const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const channelData = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.07;
      b2 = 0.85 * b2 + white * 0.1;
      channelData[i] = (b0 + b1 + b2) * 0.15;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(950, now);
    noiseFilter.Q.setValueAtTime(1.0, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(now);

    activeNodesRef.current = {
      noiseSource,
      droneGain,
      oscillators: oscNodes,
      lfo,
      lfoGain,
    };
  };

  // Stop Soundscape Smoothly
  const stopContinuousSoundscape = () => {
    const nodes = activeNodesRef.current;
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
    activeNodesRef.current = { oscillators: [] };
  };

  // Toggle Soundscape on User Click
  const toggleSound = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (!masterGainRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;
      }

      const masterGain = masterGainRef.current;

      if (isPlaying) {
        // Fade out smoothly over 0.5s
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

        setTimeout(() => {
          stopContinuousSoundscape();
        }, 550);

        setIsPlaying(false);
      } else {
        // 1. Play immediate welcoming acoustic tone
        playWelcomeChime(ctx, masterGain);

        // 2. Start continuous, non-stop ambient soundscape
        stopContinuousSoundscape();
        startContinuousSoundscape(ctx, masterGain);

        // 3. Smoothly fade master volume in to an audible, soothing volume (0.4)
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 0.8);

        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Error toggling soundscape:", err);
    }
  };

  useEffect(() => {
    return () => {
      stopContinuousSoundscape();
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
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold select-none cursor-pointer group shadow-sm active:scale-95 ${
        isPlaying
          ? "border-[#E38A2C] bg-[rgba(250,250,248,0.98)] text-[#2B2320] ring-2 ring-[rgba(227,138,44,0.3)] shadow-[0_4px_14px_rgba(227,138,44,0.25)]"
          : "border-[rgba(43,35,32,0.14)] hover:border-[#2B2320] bg-[rgba(250,250,248,0.88)] backdrop-blur-md text-[#2B2320] hover:shadow-md"
      }`}
      aria-label={isPlaying ? "Mute coastal soundscape" : "Enable calming coastal soundscape"}
      title="Calming Coastal Ambience (Bay of Bengal Breeze & Warm Kettle Simmer)"
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

