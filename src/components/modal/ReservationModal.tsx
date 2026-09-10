"use client";

import React, { useState, useEffect } from "react";
import { X, Check, Calendar, Users, Clock } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>("2026-09-18");
  const [seating, setSeating] = useState<string>("19:30 — Evening Coastal Seating");
  const [experience, setExperience] = useState<string>("The Mezbani Table");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-[rgba(43,35,32,0.6)] backdrop-blur-md transition-all duration-300"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAFAF8] text-[#2B2320] rounded-none sm:rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto"
        style={{
          boxShadow: "0 30px 60px -12px rgba(43, 35, 32, 0.25)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close reservation modal"
          className="absolute top-6 right-6 p-2.5 rounded-full border border-[rgba(43,35,32,0.14)] bg-white/80 hover:border-[#2B2320] hover:bg-[#2B2320] hover:text-[#FAFAF8] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "form" ? (
          <div>
            {/* Header */}
            <div className="border-b border-[rgba(43,35,32,0.08)] pb-6 mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#C86D3C] block mb-2 font-semibold">
                Private Dining & Table Reservation
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-light tracking-tight text-[#2B2320]">
                Reserve Your Coastal Table
              </h2>
              <p className="text-xs text-[#61534E] mt-2 font-inter leading-relaxed">
                Experience our contemporary Chattogram coastal tasting table. Intimate seating limited to ensure attentive hospitality.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Menu Tier */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#61534E] block mb-2.5">
                  1. Select Culinary Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: "The Mezbani Table",
                      tag: "Signature Heritage Feast",
                      desc: "Slow-simmered beef, aromatic chinigura polao, and roasted spices.",
                    },
                    {
                      title: "The Coastal Harvest",
                      tag: "Bay & River Estuary Tasting",
                      desc: "Shorshe ilish, coastal bhortas, smoked relishes, and short grains.",
                    },
                  ].map((exp) => (
                    <button
                      key={exp.title}
                      type="button"
                      onClick={() => setExperience(exp.title)}
                      className={`p-4 text-left border rounded-2xl transition-all duration-300 cursor-pointer ${
                        experience === exp.title
                          ? "border-[#C23B22] bg-[rgba(194,59,34,0.04)] ring-2 ring-[#C23B22]/20 shadow-sm -translate-y-0.5"
                          : "border-[rgba(43,35,32,0.12)] bg-white/70 hover:border-[rgba(43,35,32,0.25)] hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold text-[#2B2320]">{exp.title}</div>
                        <span className={`w-2 h-2 rounded-full ${experience === exp.title ? 'bg-[#C23B22]' : 'bg-[rgba(43,35,32,0.2)]'}`} />
                      </div>
                      <div className="text-[10px] text-[#C86D3C] font-mono mt-1 font-semibold">{exp.tag}</div>
                      <div className="text-[11px] font-inter text-[#61534E] mt-2 leading-snug">{exp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Guests, Seating */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#61534E] flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C86D3C]" /> Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[rgba(43,35,32,0.14)] rounded-lg text-xs font-inter focus:outline-none focus:border-[#2B2320]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#61534E] flex items-center gap-1.5 mb-2">
                    <Users className="w-3.5 h-3.5 text-[#C86D3C]" /> Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-white border border-[rgba(43,35,32,0.14)] rounded-lg text-xs font-inter focus:outline-none focus:border-[#2B2320]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#61534E] flex items-center gap-1.5 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#C86D3C]" /> Seating
                  </label>
                  <select
                    value={seating}
                    onChange={(e) => setSeating(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[rgba(43,35,32,0.14)] rounded-lg text-xs font-inter focus:outline-none focus:border-[#2B2320]"
                  >
                    <option value="12:30 — Midday Coastal Gathering">12:30 — Midday Gathering</option>
                    <option value="19:30 — Evening Coastal Seating">19:30 — Evening Seating</option>
                    <option value="20:45 — Late Table & Slow Simmer">20:45 — Late Table</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#61534E] block mb-1.5">
                    Lead Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Guest Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[rgba(43,35,32,0.14)] rounded-lg text-xs font-inter focus:outline-none focus:border-[#2B2320]"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#61534E] block mb-1.5">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[rgba(43,35,32,0.14)] rounded-lg text-xs font-inter focus:outline-none focus:border-[#2B2320]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-[0.15em] font-mono text-[#61534E] block mb-1.5">
                  Dietary Preferences & Special Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="Allergies, anniversary celebrations, or spice preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[rgba(43,35,32,0.14)] rounded-lg text-xs font-inter focus:outline-none focus:border-[#2B2320] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between border-t border-[rgba(43,35,32,0.08)]">
                <span className="text-[11px] font-mono text-[#96867F]">
                  Advance reservation confirmation
                </span>
                <button
                  type="submit"
                  className="btn-luxury-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest shadow-xl group"
                >
                  <span>Confirm Table Reservation</span>
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform font-mono">→</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="text-center py-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FAFAF8] border-2 border-[#C86D3C] text-[#C86D3C] flex items-center justify-center mb-6 shadow-sm">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#C86D3C] block mb-2 font-semibold">
              Reservation Confirmed
            </span>

            <h3 className="font-fraunces text-3xl font-light text-[#2B2320] mb-3">
              We Await Your Presence, {formData.name || "Esteemed Guest"}
            </h3>

            <p className="text-xs text-[#61534E] max-w-md mx-auto leading-relaxed mb-6">
              A private reservation confirmation and dining dossier have been dispatched to{" "}
              <span className="font-medium text-[#2B2320]">{formData.email || "your email"}</span>.
            </p>

            <div className="bg-[#FAF8F5] border border-[rgba(43,35,32,0.08)] rounded-2xl p-6 max-w-md mx-auto text-left mb-8 space-y-2 text-xs font-mono shadow-sm">
              <div className="flex justify-between text-[#61534E]">
                <span>Experience:</span>
                <span className="text-[#2B2320] text-right font-medium">{experience}</span>
              </div>
              <div className="flex justify-between text-[#61534E]">
                <span>Seating:</span>
                <span className="text-[#2B2320]">{seating}</span>
              </div>
              <div className="flex justify-between text-[#61534E]">
                <span>Guests:</span>
                <span className="text-[#2B2320]">{guests} Persons</span>
              </div>
              <div className="flex justify-between text-[#61534E]">
                <span>Date:</span>
                <span className="text-[#2B2320]">{date}</span>
              </div>
              <div className="flex justify-between text-[#61534E] pt-2 border-t border-[rgba(43,35,32,0.08)]">
                <span>Confirmation Code:</span>
                <span className="text-[#C86D3C] font-semibold">VN-CTG-2026</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="btn-luxury-secondary px-9 py-3.5 text-xs font-semibold uppercase tracking-widest shadow-md"
            >
              Return to Table Exploration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
