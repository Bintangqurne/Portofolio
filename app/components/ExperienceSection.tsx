"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ExperienceItem {
  id: string;
  code: string;
  title: string;
  company: string;
  period: string;
  activeIndex: number; // 0 to 4 for the 5 indicator bars
  description: React.ReactNode;
}

export default function ExperienceSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const tagRowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: tagRowRef,
    offset: ["start 95%", "start 50%"],
  });

  const rawScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleX = useSpring(rawScaleX, { stiffness: 90, damping: 22, restDelta: 0.001 });

  const experiences: ExperienceItem[] = [
    {
      id: "001",
      code: "EXP — I/PM",
      title: "PROJECT COORDINATOR & PM",
      company: "Technoscape Flagship Event (technoscape.id)",
      period: "Mar 2026 — Present",
      activeIndex: 0,
      description: (
        <>
          LED TECHNICAL COORDINATION FOR <span className="text-[#81ff28]">TECHNOSCAPE FLAGSHIP EVENT</span>. BRIDGED FRONTEND & BACKEND TEAMS, ALIGNED TECH STACK DECISIONS, AND DELIVERED <span className="text-[#81ff28]">HACKATHON & SEMINAR PLATFORMS</span> ON TIME.
        </>
      ),
    },
    {
      id: "002",
      code: "EXP — II/FS",
      title: "FULL-STACK DEVELOPER",
      company: "Hive Productivity Tool (hive.qurne.com)",
      period: "Mar 2026 — Present",
      activeIndex: 1,
      description: (
        <>
          BUILT <span className="text-[#81ff28]">HIVE COLLABORATIVE PRODUCTIVITY TOOL</span> WITH GOOGLE CALENDAR INTEGRATION. IMPLEMENTED AUTOMATED AVAILABILITY SCHEDULING, FILE MANAGEMENT, AND <span className="text-[#81ff28]">REAL-TIME TEAM WORKFLOWS</span>.
        </>
      ),
    },
    {
      id: "003",
      code: "EXP — III/RD",
      title: "MANAGER OF R&D DIVISION",
      company: "BNCC Malang (Bina Nusantara Computer Club)",
      period: "Nov 2025 — Present",
      activeIndex: 2,
      description: (
        <>
          MANAGED AND LED A TEAM OF <span className="text-[#81ff28]">6–10 R&D ENGINEERS</span> AT BNCC MALANG. OVERSEEING TECHNICAL PROJECT PLANNING, DIVISION ROADMAPS, AND <span className="text-[#81ff28]">STRUCTURED DEVELOPER WORKFLOWS</span>.
        </>
      ),
    },
    {
      id: "004",
      code: "EXP — IV/FE",
      title: "LEAD FRONTEND DEVELOPER",
      company: "BNCC Official Website Redesign (bncc.net)",
      period: "Jan 2026 — Feb 2026",
      activeIndex: 3,
      description: (
        <>
          ARCHITECTED COMPLETE REDESIGN OF THE <span className="text-[#81ff28]">OFFICIAL BNCC WEBSITE</span> FROM THE GROUND UP. DELIVERED HIGH-PERFORMANCE UI/UX, MODERN BRAND IDENTITY, AND <span className="text-[#81ff28]">ZERO-LATENCY RESPONSIVE INTERFACES</span>.
        </>
      ),
    },
    {
      id: "005",
      code: "EXP — V/CS",
      title: "CS & FULL-STACK IMMERSIVE",
      company: "BINUS University & Hacktiv8 Immersive",
      period: "2023 — Present",
      activeIndex: 4,
      description: (
        <>
          PURSUING COMPUTER SCIENCE AT <span className="text-[#81ff28]">BINUS UNIVERSITY</span> & GRADUATED HACKTIV8 FULL-STACK PROGRAM. SPECIALIZING IN <span className="text-[#81ff28]">NEXT.JS, TYPESCRIPT, GRAPHQL, REDIS & MICROSERVICES</span>.
        </>
      ),
    },
  ];

  return (
    <section className="relative z-50 w-full bg-[#050609] text-white py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t overflow-hidden font-figtree">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#81ff28]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Giant Title — full-bleed, scales fluidly with viewport (clamp), never overflows */}
      <div className="overflow-hidden mb-6 sm:mb-8">
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="font-extrabold tracking-tighter text-[#81ff28] uppercase leading-none font-fragment select-none whitespace-nowrap"
          style={{ fontSize: "clamp(56px, 15.5vw, 300px)" }}
        >
          EXPERIENCE
        </motion.h2>
      </div>

      <div className="w-full space-y-8 sm:space-y-12">
        {/* ── Top Header Block ── */}
        <div className="space-y-3 sm:space-y-4">
          {/* Subtitle — Directly underneath EXPERIENCE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-extrabold leading-[1.04] text-[#d9d9d9] tracking-tight font-fragment uppercase text-left w-full">
              THE ARCHIVE OF EVERYTHING<br />
              I CAN’T KEEP IN ONE PLACE.
            </h3>
          </motion.div>

          {/* Tag & Line Row */}
          <motion.div
            ref={tagRowRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 pt-3 mt-4 text-xs font-mono tracking-widest text-neutral-400 uppercase"
          >
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 bg-[#81ff28] inline-block shrink-0" />
              <span className="text-neutral-300 h-[13px]">EXPERIENCE STORAGE — 2022-2026</span>
            </div>
            <motion.div
              style={{ scaleX, originX: 0 }}
              className="hidden sm:block flex-1 h-[10px] bg-neutral-800 origin-left"
            />
            <span className="shrink-0 h-[13px]">ENGINEERING & ARCHITECTURE ARCHIVES</span>
          </motion.div>
        </div>

        {/* ── Editorial Vertical List ── */}
        <div className="w-full border-t border-white/10 mt-8 sm:mt-12">
          {experiences.map((exp, i) => (
            <ExperienceRowItem
              key={exp.id}
              exp={exp}
              index={i}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceRowItemProps {
  exp: ExperienceItem;
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

function ExperienceRowItem({ exp, index, hoveredId, setHoveredId }: ExperienceRowItemProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredId === exp.id;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 95%", "start 40%"],
  });

  const rawScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useSpring(rawScaleY, { stiffness: 90, damping: 22, restDelta: 0.001 });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHoveredId(exp.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="group relative border-b border-white/10 py-10 sm:py-14 transition-colors duration-500 hover:bg-white/[0.015]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Block (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
          {/* Top-Left: Code */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest text-neutral-400 group-hover:text-[#81ff28] transition-colors uppercase">
              {exp.code}
            </span>
          </div>

          {/* Middle: Title & Company */}
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white group-hover:text-[#81ff28] transition-colors font-fragment uppercase leading-[1.05]">
              {exp.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-neutral-400">
              {exp.company}
            </p>
          </div>

          {/* Bottom Row of Left Block: Serial Number (Bottom Left) & Arrow (Right) */}
          <div className="flex items-end justify-between pt-4">
            {/* Left: Indicator Bars & Serial Number (//001) */}
            <div className="space-y-3">
              {/* 5-State Indicator Bars (Vertically Stacked) */}
              <div className="flex flex-col gap-1 my-2">
                {[0, 1, 2, 3, 4].map((barIdx) => (
                  <div
                    key={barIdx}
                    className={`h-[2px] transition-all duration-300 ${
                      barIdx === exp.activeIndex
                        ? "bg-[#81ff28] w-6"
                        : isHovered && barIdx <= exp.activeIndex
                        ? "bg-[#81ff28]/50 w-5"
                        : "bg-neutral-800 w-4"
                    }`}
                  />
                ))}
              </div>
              <span className="block text-xs sm:text-sm font-mono text-neutral-400 group-hover:text-white transition-colors">
                //{exp.id}
              </span>
            </div>

            {/* Right: Arrow pointing right */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-500 group-hover:text-[#81ff28] group-hover:translate-x-2 transition-all duration-300 mb-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>

        {/* Center Thick Vertical Ruler Divider (Scroll Animated: scaleY from top to bottom) */}
        <div className="hidden lg:flex justify-center items-stretch px-2">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-2 sm:w-[8px] bg-neutral-800 transition-colors duration-500 rounded-none origin-top"
          />
        </div>

        {/* Right Block (col-span-6): Description in Bold Editorial Style */}
        <div className="lg:col-span-6 flex items-center pt-4 lg:pt-0">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase leading-snug tracking-tight text-neutral-200 group-hover:text-white transition-colors font-fragment">
            {exp.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}