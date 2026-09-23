"use client";

import { useState } from "react";
import Link from "next/link";

// ---------- Module 1: Solar System ----------
const PLANETS = [
  { name: "Mercury", color: "#94a3b8", size: 6, orbit: 52, speed: "12s", fact: "Closest to the Sun. One year here is just 88 Earth days." },
  { name: "Venus", color: "#e59d77", size: 9, orbit: 78, speed: "18s", fact: "Hottest planet — thick clouds trap heat. It spins backwards!" },
  { name: "Earth", color: "#3b82f6", size: 10, orbit: 106, speed: "26s", fact: "Our home — the only known planet with life and liquid-water oceans." },
  { name: "Mars", color: "#e27d56", size: 8, orbit: 132, speed: "36s", fact: "The Red Planet — rusty dust, Olympus Mons, and a 687-day year." },
];

// ---------- Module 2: Water Cycle ----------
const STAGES = [
  { key: "evaporation", label: "Evaporation", text: "The Sun heats rivers, lakes and oceans — water rises as invisible vapour." },
  { key: "condensation", label: "Condensation", text: "High up, vapour cools and squeezes into tiny droplets — clouds are born." },
  { key: "precipitation", label: "Precipitation", text: "Droplets grow heavy and fall back as rain, snow or hail." },
  { key: "collection", label: "Collection", text: "Water gathers in rivers and seas — and the cycle begins again." },
] as const;

// ---------- Module 3: Mughal Timeline ----------
const MUGHALS = [
  { name: "Babur", reign: "1526–1530", fact: "Won Panipat with gunpowder and founded the Mughal Empire." },
  { name: "Humayun", reign: "1530–40, 1555–56", fact: "Lost the throne to Sher Shah Suri, then won it back." },
  { name: "Akbar", reign: "1556–1605", fact: "The Great — Din-i-Ilahi, Fatehpur Sikri, widest tolerance." },
  { name: "Jahangir", reign: "1605–1627", fact: "Nur Jahan's era — miniature painting at its peak." },
  { name: "Shah Jahan", reign: "1628–1658", fact: "The builder — Taj Mahal, Red Fort and Jama Masjid." },
  { name: "Aurangzeb", reign: "1658–1707", fact: "Widest empire, longest reign — then rapid decline." },
];

export default function VisualLearningPage() {
  const [planet, setPlanet] = useState(2);
  const [stage, setStage] = useState<(typeof STAGES)[number]["key"]>("evaporation");
  const [ruler, setRuler] = useState(2);

  const active = (key: string) =>
    stage === key ? "#e27d56" : "#cbd5e1";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
          Learn by seeing
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Interactive Learning
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Interactive diagrams for tricky Static GK topics. Tap, play and
          remember — then test yourself with quizzes.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            ["#solar", "🪐 Solar System"],
            ["#water", "💧 Water Cycle"],
            ["#mughals", "👑 Mughal Timeline"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-500"
            >
              {label}
            </a>
          ))}
        </div>

        {/* ---------- Solar System ---------- */}
        <section id="solar" className="mt-10 scroll-mt-20">
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="bg-slate-950 p-6 text-white sm:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-300">
                Ref: Universe &amp; Earth • Tap a planet
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">Solar System</h2>
              <svg viewBox="0 0 400 400" className="mx-auto mt-2 w-full max-w-md">
                {/* sun glow + sun */}
                <circle cx="200" cy="200" r="34" fill="#e27d56" opacity="0.25" className="animate-pulse-soft" style={{ transformOrigin: "200px 200px" }} />
                <circle cx="200" cy="200" r="22" fill="#f5b942" />
                <circle cx="200" cy="200" r="22" fill="url(#sunglow)" />
                <defs>
                  <radialGradient id="sunglow">
                    <stop offset="0%" stopColor="#ffe9b0" />
                    <stop offset="70%" stopColor="#f5b942" />
                    <stop offset="100%" stopColor="#e27d56" />
                  </radialGradient>
                </defs>
                {PLANETS.map((p, i) => (
                  <g key={p.name}>
                    <circle cx="200" cy="200" r={p.orbit} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 5" />
                    <g className="animate-orbit cursor-pointer" style={{ transformOrigin: "200px 200px", animationDuration: p.speed }} onClick={() => setPlanet(i)}>
                      <circle cx={200 + p.orbit} cy="200" r={p.size + (planet === i ? 3 : 0)} fill={p.color} stroke={planet === i ? "#fff" : "none"} strokeWidth="2" />
                    </g>
                  </g>
                ))}
              </svg>
              <div className="mx-auto max-w-md rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="font-bold text-brand-300">{PLANETS[planet].name}</p>
                <p className="mt-1 text-sm text-slate-200">{PLANETS[planet].fact}</p>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {PLANETS.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setPlanet(i)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${planet === i ? "bg-brand-500 text-white" : "bg-white/10 text-slate-200 hover:bg-white/20"}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between bg-white p-4 sm:px-6">
              <p className="text-xs text-slate-500">GK • Universe &amp; Earth</p>
              <Link href="/quiz/GK-019" className="rounded-full bg-brand-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-brand-600">
                Practice quiz →
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Water Cycle ---------- */}
        <section id="water" className="mt-8 scroll-mt-20">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-50 to-white">
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-500">
                Ref: Rivers &amp; Climate • Pick a stage
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">Water Cycle</h2>
              <svg viewBox="0 0 400 260" className="mx-auto mt-2 w-full max-w-lg">
                {/* sun with rotating rays */}
                <g className="animate-orbit" style={{ transformOrigin: "60px 55px", animationDuration: "24s" }}>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const a = (i * Math.PI) / 4;
                    return (
                      <line key={i} x1={60 + Math.cos(a) * 26} y1={55 + Math.sin(a) * 26} x2={60 + Math.cos(a) * 34} y2={55 + Math.sin(a) * 34} stroke="#f5b942" strokeWidth="3" strokeLinecap="round" />
                    );
                  })}
                </g>
                <circle cx="60" cy="55" r="18" fill="#f5b942" />
                {/* mountain + sea */}
                <path d="M150 190 L230 90 L310 190 Z" fill="#cbd5e1" />
                <path d="M230 90 L262 130 L230 130 L205 130 Z" fill="#fff" />
                <rect x="0" y="190" width="400" height="70" fill="#bae6fd" />
                <path d="M0 190 Q 50 182 100 190 T 200 190 T 300 190 T 400 190 L400 260 L0 260 Z" fill="#7dd3fc" opacity="0.6" />
                {/* cloud */}
                <g fill="#fff" stroke="#cbd5e1" strokeWidth="2">
                  <ellipse cx="250" cy="80" rx="42" ry="24" />
                  <ellipse cx="222" cy="88" rx="24" ry="16" />
                  <ellipse cx="278" cy="88" rx="26" ry="17" />
                </g>
                {/* evaporation arrow */}
                <path d="M120 180 C 130 140 150 120 175 105" fill="none" stroke={active("evaporation")} strokeWidth={stage === "evaporation" ? 3.5 : 2.5} className="animate-dash" strokeLinecap="round" />
                {/* condensation arrow */}
                <path d="M200 78 C 215 74 228 74 238 76" fill="none" stroke={active("condensation")} strokeWidth={stage === "condensation" ? 3.5 : 2.5} className="animate-dash" strokeLinecap="round" />
                {/* rain */}
                {[235, 252, 269].map((x, i) => (
                  <line key={x} x1={x} y1="104" x2={x} y2="116" stroke={stage === "precipitation" ? "#0284c7" : "#bae6fd"} strokeWidth="3" strokeLinecap="round" className="animate-drop" style={{ animationDelay: `${i * 0.45}s` }} />
                ))}
                {/* collection arrow */}
                <path d="M300 200 C 340 200 360 210 372 226" fill="none" stroke={active("collection")} strokeWidth={stage === "collection" ? 3.5 : 2.5} className="animate-dash" strokeLinecap="round" />
              </svg>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStage(s.key)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${stage === s.key ? "bg-brand-500 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:text-brand-500"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="mx-auto mt-3 max-w-lg text-center text-sm text-slate-600">
                {STAGES.find((s) => s.key === stage)?.text}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4 sm:px-6">
              <p className="text-xs text-slate-500">GK • Rivers &amp; Climate</p>
              <Link href="/quiz/GK-016" className="rounded-full bg-brand-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-brand-600">
                Practice quiz →
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Mughal Timeline ---------- */}
        <section id="mughals" className="mt-8 scroll-mt-20">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand-500">
                Ref: Mughal Empire • Tap a ruler
              </p>
              <h2 className="mt-1 text-2xl font-extrabold">Mughal Timeline</h2>
              <div className="relative mt-6">
                <div className="absolute left-0 right-0 top-[13px] h-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{ width: `${((ruler + 1) / MUGHALS.length) * 100}%` }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {MUGHALS.map((m, i) => (
                    <button
                      key={m.name}
                      onClick={() => setRuler(i)}
                      className="group flex flex-col items-center gap-2"
                      title={m.name}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${i <= ruler ? "border-brand-500 bg-brand-500 text-white" : "border-slate-200 bg-white text-slate-400 group-hover:border-brand-300"} ${i === ruler ? "scale-125 shadow-lg shadow-brand-500/30" : ""}`}
                      >
                        {i + 1}
                      </span>
                      <span className={`hidden text-[11px] font-bold sm:block ${i === ruler ? "text-brand-500" : "text-slate-500"}`}>
                        {m.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-xl font-extrabold">{MUGHALS[ruler].name}</h3>
                  <p className="font-mono text-xs font-bold text-brand-500">{MUGHALS[ruler].reign}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{MUGHALS[ruler].fact}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setRuler((r) => Math.max(0, r - 1))}
                    disabled={ruler === 0}
                    className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold transition hover:border-brand-500 hover:text-brand-500 disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setRuler((r) => Math.min(MUGHALS.length - 1, r + 1))}
                    disabled={ruler === MUGHALS.length - 1}
                    className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-bold transition hover:border-brand-500 hover:text-brand-500 disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4 sm:px-6">
              <p className="text-xs text-slate-500">GK • Mughal Empire</p>
              <Link href="/quiz/GK-008" className="rounded-full bg-brand-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-brand-600">
                Practice quiz →
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p className="font-bold text-slate-900">
            <span className="font-logo font-normal">Static<span className="text-brand-500">GK.com</span></span>
            <span className="ml-2 font-normal text-slate-500">
              Practice Lucent&apos;s GK, one quiz at a time.
            </span>
          </p>
          <p>© 2026 StaticGK.com</p>
        </footer>
      </main>
    </div>
  );
}
