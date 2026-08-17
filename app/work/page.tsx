"use client";

import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-between font-figtree selection:bg-black selection:text-white">
      <Navbar />

      {/* ══ FULLSCREEN HERO IMAGE (100VH / FULL LAPTOP SCREEN) ══ */}
      <section className="relative w-full h-screen overflow-hidden bg-black select-none">
        {/* Background Image */}
        <Image
          src="/images/desktop.png"
          alt="Desktop Hero Fullscreen"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

        {/* Hero Content Overlay (Customized Wording for Bintang Qurne) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20 text-white max-w-6xl space-y-6 sm:space-y-8">
          
          {/* Main Headline */}
          <h1 className="font-figtree font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-white">
            Archive <span className="text-white/60 font-light italic font-serif">of</span> Engineering <br className="hidden sm:inline" />
            &amp; Creative Works —
          </h1>

          {/* Subtitle */}
          <p className="font-figtree text-sm sm:text-lg lg:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
            Explore a curated collection of full-stack web applications, machine learning architectures, and high-performance digital systems built by Bintang Qurne.
          </p>

          {/* Masked Up-Exit and Down-Reappear Arrow Animation */}
          <div className="pt-2 flex items-center justify-start">
            <div className="relative h-7 w-7 overflow-hidden flex items-center justify-center">
              <motion.svg
                className="w-5 h-5 text-neutral-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={{
                  y: [0, -30, -30, 0],
                  opacity: [1, 0, 1, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  times: [0, 0.4, 0.42, 1],
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </motion.svg>
            </div>
          </div>

        </div>
      </section>

      {/* ══ FOOTER SECTION ══ */}
      <FooterSection />
    </main>
  );
}
