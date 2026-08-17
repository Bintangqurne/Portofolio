"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Progress KHUSUS buat entrance (scale, headline, paragraf, mask foto):
  // 0 = section baru mulai keliatan (top section nyentuh 85% tinggi viewport dari atas),
  // 1 = section udah "settle" hampir penuh di layar (top section nyentuh 35% tinggi viewport).
  // Ini beda dari scrollYProgress di atas (yang rentangnya sepanjang seluruh section, dipakai buat imageY parallax).
  const { scrollYProgress: entranceProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 35%"],
  });

  const smoothEntrance = useSpring(entranceProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // Parallax: foto naik sedikit saat scroll (tetap pakai scrollYProgress, sepanjang section)
  const imageY = useTransform(smoothProgress, [0, 1], [20, -30]);
  // Headline masuk dari bawah — animasi simple (fade + slide), pakai smoothEntrance
  const headlineY = useTransform(smoothEntrance, [0, 1], [40, 0]);
  const headlineOpacity = useTransform(smoothEntrance, [0, 0.6], [0, 1]);
  // Paragraf bawah masuk sedikit terlambat — animasi simple (fade + slide)
  const paraY = useTransform(smoothEntrance, [0.2, 1], [50, 0]);
  const paraOpacity = useTransform(smoothEntrance, [0.2, 0.8], [0, 1]);

  // ── Scroll-linked scale transition ──
  // Seluruh KOMPONEN INTRO SECTION mulai jelas lebih kecil (0.75, biar kentara — analogi
  // 10x10 jadi 7.5x7.5), lalu membesar ke ukuran normal (1) pas smoothEntrance nyampe 1
  // (section udah settle kelihatan penuh) — dan ini SEKARANG nyambung sama momen section
  // benar-benar mulai kelihatan, bukan dari section masih di luar layar sama sekali.
  const containerScale = useTransform(smoothEntrance, [0, 1], [0.75, 1]);

  // ── Photo split-mask reveal ──
  // Progress reveal 0 -> 1 dipetakan dari smoothProgress [0, 0.4], sama seperti headline,
  // supaya animasinya jalan begitu section masuk viewport (termasuk saat refresh langsung terlihat).

  // Layer KIRI (nampilin sedikit lebih dari setengah kiri gambar): reveal dari ATAS ke BAWAH.
  // inset(top right bottom left) -> right dikunci 49% (bukan 50%) supaya overlap dikit ke kanan,
  // ini yang mencegah seam/garis tipis di batas tengah akibat sub-pixel rounding browser.
  // bottom dinamis 100% -> 0% supaya area kelihatan "tumbuh" dari atas turun ke bawah.
  const leftClipPath = useTransform(
    smoothProgress,
    [0, 0.4],
    ["inset(0% 49% 100% 0%)", "inset(0% 49% 0% 0%)"]
  );

  // Layer KANAN (nampilin sedikit lebih dari setengah kanan gambar): reveal dari BAWAH ke ATAS.
  // left dikunci 49% (bukan 50%) supaya overlap dikit ke kiri, mencegah seam yang sama.
  // top dinamis 100% -> 0% supaya area kelihatan "tumbuh" dari bawah naik ke atas.
  const rightClipPath = useTransform(
    smoothProgress,
    [0, 0.4],
    ["inset(100% 0% 0% 49%)", "inset(0% 0% 0% 49%)"]
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] text-white font-figtree overflow-hidden py-12 sm:py-16"
    >
      <motion.div
        style={{ scale: containerScale }}
        className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center"
      >

        {/* ══ TOP: Photo Left + Headline Right (Top Aligned) ══ */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 lg:gap-14">
          {/* Photo — split mask reveal: kiri dari atas, kanan dari bawah */}
          <div className="relative shrink-0 w-full md:w-[42%] max-w-md overflow-hidden self-start">
            <motion.div
              style={{ y: imageY, aspectRatio: "4 / 4.8" }}
              className="relative w-full"
            >
              {/* Layer KIRI — setengah kiri gambar, reveal dari atas */}
              <motion.div
                className="absolute inset-0"
                style={{ clipPath: leftClipPath, WebkitClipPath: leftClipPath }}
              >
                <Image
                  src="/images/tablet.png"
                  alt="Bintang — Full-Stack Developer"
                  fill
                  className="object-cover object-top grayscale contrast-110 rounded-sm"
                  priority
                />
              </motion.div>

              {/* Layer KANAN — setengah kanan gambar, reveal dari bawah */}
              <motion.div
                className="absolute inset-0"
                style={{ clipPath: rightClipPath, WebkitClipPath: rightClipPath }}
              >
                <Image
                  src="/images/tablet.png"
                  alt=""
                  fill
                  className="object-cover object-top grayscale contrast-110 rounded-sm"
                  priority
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Headline — Perfectly top-aligned with photo, fade + slide dari bawah (animasi simple) */}
          <motion.div
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="flex-1 pt-0 mt-0"
          >
            <h2
              className="font-figtree font-black text-[#d9d9d9] uppercase leading-[0.90] tracking-tight"
              style={{ fontSize: "clamp(30px, 5.2vw, 86px)", letterSpacing: "-0.03em" }}
            >
              CODE IS A<br />
              CONTROLLED<br />
              SYSTEM —<br />
              A PRACTICE<br />
              OF BUILDING<br />
              WHAT SCALE<br />
              DEMANDS.
            </h2>
          </motion.div>
        </div>

        {/* ══ BOTTOM: Paragraph Right Under Photo ══ */}
        <motion.div
          style={{ y: paraY, opacity: paraOpacity }}
          className="w-full pt-6 sm:pt-8 space-y-8 sm:space-y-10"
        >
          <p
            className="font-figtree font-black text-[#d9d9d9] uppercase leading-[0.93] tracking-tight max-w-6xl"
            style={{ fontSize: "clamp(22px, 4vw, 68px)", letterSpacing: "-0.03em" }}
          >
            I BUILD ACROSS FRONTEND, BACKEND, DATABASE & CLOUD TO ENGINEER
            THE SYSTEMS THAT MAKE PRODUCTS FEEL INEVITABLE.
          </p>

          {/* ── CTA Buttons: Resume + LinkedIn ── */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* View Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-figtree font-black text-sm uppercase tracking-widest border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Resume
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/bintangqurne"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-transparent text-white font-figtree font-black text-sm uppercase tracking-widest border-2 border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}