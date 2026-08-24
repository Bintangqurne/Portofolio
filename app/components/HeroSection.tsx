"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from "framer-motion";

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state untuk "BINTANG" dengan kursor kedap-kedip yang bergerak mengikuti huruf
  const textToType = "BINTANG";
  const [bintangTyped, setBintangTyped] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;
    let isDeleting = false;

    const typeLoop = () => {
      if (!isDeleting) {
        // Mode Ketik: tambah 1 huruf
        if (charIndex <= textToType.length) {
          setBintangTyped(textToType.slice(0, charIndex));
          charIndex++;
          timeoutId = setTimeout(typeLoop, 150); // Kecepatan ngetik: 150ms per huruf
        } else {
          // Selesai ngetik "BINTANG|", tahan selama 4.5 detik lalu hapus & ulang
          isDeleting = true;
          timeoutId = setTimeout(typeLoop, 4500);
        }
      } else {
        // Mode Hapus: kurangi 1 huruf
        if (charIndex >= 0) {
          setBintangTyped(textToType.slice(0, charIndex));
          charIndex--;
          timeoutId = setTimeout(typeLoop, 70); // Kecepatan hapus: 70ms per huruf
        } else {
          // Selesai hapus, mulai ngetik lagi setelah jeda 600ms
          isDeleting = false;
          charIndex = 0;
          timeoutId = setTimeout(typeLoop, 600);
        }
      }
    };

    // Jeda awal sebelum mulai ngetik pertama kali (2400ms agar menunggu animasi headline selesai sepenuhnya)
    timeoutId = setTimeout(typeLoop, 2400);

    return () => clearTimeout(timeoutId);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Smoothing layer: bikin scrollYProgress "mengalir" lambat, anggun & sinematik (stiffness: 80, damping: 30, mass: 1)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 1,
  });

  // Headline entrance & exit variants:
  // Initial entrance: Line 1 dari kiri (-100%), Line 2 dari kanan (100%), Line 3 dari kiri (-100%)
  // Terbungkus overflow-hidden agar ter-masking rapi di posisi aslinya
  const headlineVariants = {
    hidden: (i: number) => ({
      x: i === 1 ? "100%" : "-100%",
      y: 0,
      opacity: 0,
    }),
    visible: (i: number) => ({
      x: "0%",
      y: 0,
      opacity: 1,
      transition: { duration: 1.25, ease, delay: 0.3 + i * 0.18 },
    }),
    exit: (i: number) => {
      const offsets = [-24, -14, -6];
      return {
        x: "0%",
        y: offsets[i] ?? -10,
        opacity: 1,
        transition: { duration: 0.85, ease, delay: i * 0.06 },
      };
    },
  };

  // Typewriter variants untuk ROLE
  const roleTypewriterParent = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 2.4,
      },
    },
  };

  const charVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const authorY = useTransform(smoothProgress, [0, 1], [0, -480]);
  const kickerY = useTransform(smoothProgress, [0, 0.35], [0, -450]);
  const dividerY = useTransform(smoothProgress, [0, 1], [0, -500]);

  // Parallax bg & Watermark: "DEPLOY" raksasa sembunyi di bawah (y: 700) saat awal, meluncur naik ke area bawah saat scroll
  const heroBgPosY = useTransform(smoothProgress, [0, 1], ["50% 60%", "50% 40%"]);
  const watermarkY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [700, 480, 300, 0]);
  const watermarkScale = useTransform(smoothProgress, [0, 0.25, 1], [0.9, 0.95, 1.1]);

  // Track initial load agar delay 2.4s HANYA berlaku saat refresh pertama kali, bukan saat scroll up kembali
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Exit trigger umum (Headlines, Skills, Author line)
  const [exited, setExited] = useState(false);
  // Trigger KHUSUS untuk BIN, TA, NG: baru muncul kembali saat scroll mentok paling atas (v <= 0.002)
  const [bintangExited, setBintangExited] = useState(false);
  const [returningSkills, setReturningSkills] = useState(false);
  const prevVRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const isScrollingUp = v < prevVRef.current;
    prevVRef.current = v;

    // Trigger umum untuk headline, author, dan skills
    if (v > 0.005 && !isScrollingUp && !exited) {
      setReturningSkills(false);
      setExited(true);
    } else if ((isScrollingUp || v <= 0.005) && exited) {
      setReturningSkills(true);
      setExited(false);
    }

    // Trigger khusus KHUSUS untuk BIN, TA, NG:
    // Saat scroll DOWN: beri jeda buffer (v > 0.08) sebelum keluar.
    // Saat scroll UP: LANGSUNG tanpa jeda begitu mendekati area top (v <= 0.12).
    if (v > 0.08 && !isScrollingUp && !bintangExited) {
      setBintangExited(true);
    } else if (((isScrollingUp && v <= 0.12) || v <= 0.005) && bintangExited) {
      setBintangExited(false);
    }
  });

  // Easing sinematik yang sangat mulus dan anggun
  const ease = [0.25, 1, 0.5, 1] as const;

  const skills = [
    { text: "FULL-STACK ARCHITECTURE", exitDelay: 0 },
    { text: "SCALABLE BACKEND & API", exitDelay: 0.2 },
    { text: "MODERN FRONTEND UI", exitDelay: 0.4 },
    { text: "DATABASE & CLOUD", exitDelay: 0.6 },
    { text: "INTERACTIVE EXPERIENCES", exitDelay: 0.8 },
  ];
  const skillEntranceDelay = 2.4;
  const skillLineEntranceDelay = 0.22;
  const skillCharEntranceDelay = 0.025;

  // Skill list: refresh tetap staggered per huruf, scroll exit one-shot per baris.
  const skillVariants = {
    hidden: { x: 0, opacity: 1 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: returningSkills ? 0.65 : 0,
        ease: [0.45, 0, 0.2, 1] as const,
        delay: returningSkills ? i * 0.2 : 0,
      },
    }),
    exit: (i: number) => ({
      x: "-120%",
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.45, 0, 0.2, 1] as const,
        delay: skills[i]?.exitDelay ?? 0,
      },
    }),
  };

  const binLetters = ["B", "I", "N"];
  const taLetters = ["T", "A"];
  const ngLetters = ["N", "G"];

  return (
    <section ref={wrapperRef} className="relative h-[100svh] w-full overflow-hidden bg-[#050609] font-figtree text-white lg:h-screen">
      {/* Mobile editorial poster */}
      <div className="absolute inset-0 overflow-hidden lg:hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0"
        >
          <Image
            src="/images/aku.png"
            alt="Bintang Qurne"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[52%_center]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.58)_0%,rgba(0,0,0,.14)_34%,rgba(0,0,0,.2)_56%,rgba(0,0,0,.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.52),transparent_46%,rgba(0,0,0,.16))]" />
        <div className="hero-mobile-grain pointer-events-none absolute inset-0 opacity-[0.16]" />

        <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-[5.75rem]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease }}
            className="max-w-[96%]"
          >
            <p className="text-[clamp(41px,12.25vw,55px)] font-black uppercase leading-[0.86] tracking-[-0.072em] text-[#ff2a2a]">
              I build systems
            </p>
            <p className="text-[clamp(45px,13.55vw,61px)] font-black uppercase leading-[0.84] tracking-[-0.075em] text-white">
              to power what
            </p>
            <p className="text-[clamp(35px,10.2vw,46px)] font-black uppercase leading-[0.87] tracking-[-0.067em] text-white">
              users experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.62, ease }}
            className="mt-4 flex items-stretch gap-3"
          >
            <span className="w-1.5 bg-[#ff2a2a]" />
            <div>
              <p className="text-lg font-black uppercase leading-none tracking-[-0.04em] text-[#ff2a2a] min-[390px]:text-xl">Bintang Qurne</p>
              <p className="mt-1.5 font-ibm-mono text-[9.5px] font-medium uppercase tracking-[0.065em] text-white/85 min-[390px]:text-[10px]">Full-stack developer / software engineer</p>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-[55%] -translate-y-1/2 overflow-hidden px-3">
            <motion.p
              initial={{ x: "-105%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.05, delay: 0.48, ease }}
              className="whitespace-nowrap text-center text-[clamp(64px,20.8vw,100px)] font-black uppercase leading-[0.7] tracking-[-0.105em] text-[#ff2a2a]"
            >
              Bintang
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.82, ease }}
            className="mb-7 mt-auto grid grid-cols-[72px_1fr] items-start gap-4"
          >
            <div className="pb-0.5 font-ibm-mono text-[11px] font-bold uppercase leading-[1.3] tracking-[0.065em]">
              <p className="text-white/75">DEV/AK</p>
              <p className="text-xl font-black tracking-[-0.04em] text-[#ff2a2a]">2026</p>
            </div>
            <div className="border-l-[7px] border-[#ff2a2a] pl-3.5">
              {skills.map((skill) => (
                <p key={skill.text} className="font-ibm-mono text-xs font-bold uppercase leading-[1.48] tracking-[0.045em] text-white/95 min-[390px]:text-[13px]">
                  {skill.text}
                </p>
              ))}
            </div>
          </motion.div>

          <div className="mt-4 flex items-center justify-between border-t border-white/35 pt-3 font-ibm-mono text-[7px] uppercase tracking-[0.12em] text-white/60">
            <span>Jakarta · Indonesia</span>
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </div>

      <div className="hidden h-full lg:block">
      {/* ── Hero Background Image & Giant Watermark ("DEPLOY") ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url(/images/aku1.png)",
            backgroundPosition: heroBgPosY,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Giant Watermark Text ("DEPLOY") - Sembunyi di bawah saat awal, meluncur naik ke tengah (center-aligned) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <motion.span
            className="font-figtree font-black text-white/[0.05] uppercase tracking-tighter whitespace-nowrap"
            style={{
              fontSize: "clamp(90px, 18vw, 280px)",
              lineHeight: 0.8,
              y: watermarkY,
              scale: watermarkScale,
            }}
          >
            DEPLOY
          </motion.span>
        </div>
      </div>

      {/* ── Clipping Wrapper BIN (Hanya 50vw dari kiri layar) ── */}
      <div
        className="absolute left-0 top-0 h-full overflow-hidden pointer-events-none z-20"
        style={{ width: "50vw" }}
      >
        <div className="w-full h-full px-6 sm:px-12 pt-16 sm:pt-20 flex items-start">
          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{
              x: bintangExited ? "100vw" : 0,
              opacity: bintangExited ? 0 : 1,
            }}
            transition={{
              x: { duration: bintangExited ? 2.2 : 1.2, ease, delay: isInitialLoad ? 0.2 : 0 },
              opacity: bintangExited
                ? { duration: 1.6, delay: 0 }
                : { duration: 0.8, delay: isInitialLoad ? 0.2 : 0 },
            }}
            className="text-[#FF2A2A] font-figtree font-extrabold select-none shrink-0 ml-8 sm:ml-24 md:ml-36 flex"
            style={{
              fontSize: "clamp(130px, 23vw, 360px)",
              lineHeight: 0.75,
              letterSpacing: "-0.08em",
            }}
          >
            {binLetters.map((char, index) => (
              <span key={char + index} className="inline-block">
                {char}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Clipping Wrapper NG (Hanya 50vw dari kanan layar) ── */}
      <div
        className="absolute right-0 bottom-0 h-full overflow-hidden pointer-events-none z-20 flex justify-end items-end"
        style={{ width: "50vw" }}
      >
        <div className="w-full h-full px-6 sm:px-12 pb-2 sm:pb-4 flex justify-end items-end">
          <motion.div
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{
              x: bintangExited ? "-100vw" : 0,
              opacity: bintangExited ? 0 : 1,
            }}
            transition={{
              x: { duration: bintangExited ? 2.2 : 1.2, ease, delay: isInitialLoad ? 0.2 : 0 },
              opacity: bintangExited
                ? { duration: 1.6, delay: 0 }
                : { duration: 0.8, delay: isInitialLoad ? 0.2 : 0 },
            }}
            className="text-[#FF2A2A] font-figtree font-extrabold select-none shrink-0 pr-4 sm:pr-12 flex"
            style={{
              fontSize: "clamp(130px, 23vw, 360px)",
              lineHeight: 0.75,
              letterSpacing: "-0.08em",
            }}
          >
            {ngLetters.map((char, index) => (
              <span key={char + index} className="inline-block text-left">
                {char}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Content Container (Headlines, Author, TA, Skills) ── */}
      <div className="relative z-10 flex flex-col justify-between w-full h-full px-6 sm:px-12 pt-16 sm:pt-20 pb-2 sm:pb-4">
        {/* ══ ROW 1 ══ Space untuk BIN + Headlines */}
        <div className="flex justify-between items-start gap-4">
          {/* Spacer selebar area BIN agar layout tetap imbang dan sejajar sempurna */}
          <div className="invisible shrink-0 ml-8 sm:ml-24 md:ml-36 flex" style={{ fontSize: "clamp(130px, 23vw, 360px)", lineHeight: 0.75 }}>
            BIN
          </div>

          <div className="hidden lg:flex flex-1" />

          {/* Headlines & Author */}
          <div className="flex-shrink-0 flex flex-col gap-0 items-start pt-1">
            {/* 3 baris Headlines ini ter-masking (Entrance dari Kiri/Kanan & Exit Scroll) */}
            <div className="flex flex-col gap-0 items-start">
              <div className="overflow-hidden">
                <motion.span
                  custom={0}
                  variants={headlineVariants}
                  initial="hidden"
                  animate={exited ? "exit" : "visible"}
                  className="block font-figtree font-bold uppercase text-[#FF2A2A]"
                  style={{
                    fontSize: "clamp(34px, 4.5vw, 72px)",
                    letterSpacing: "-0.07em",
                    lineHeight: "100%",
                  }}
                >
                  I BUILD SYSTEMS
                </motion.span>
              </div>

              <div className="overflow-hidden">
                <motion.span
                  custom={1}
                  variants={headlineVariants}
                  initial="hidden"
                  animate={exited ? "exit" : "visible"}
                  className="block font-figtree font-bold uppercase text-white"
                  style={{
                    fontSize: "clamp(38px, 5.2vw, 82px)",
                    letterSpacing: "-0.07em",
                    lineHeight: "100%",
                  }}
                >
                  to power WHAT
                </motion.span>
              </div>

              <div className="overflow-hidden">
                <motion.span
                  custom={2}
                  variants={headlineVariants}
                  initial="hidden"
                  animate={exited ? "exit" : "visible"}
                  className="block font-figtree font-bold uppercase text-white"
                  style={{
                    fontSize: "clamp(26px, 3.8vw, 58px)",
                    letterSpacing: "-0.07em",
                    lineHeight: "100%",
                  }}
                >
                  USERS EXPERIENCE
                </motion.span>
              </div>
            </div>

            {/* Author (dengan animasi ketik typewriter pada BINTANG & ROLE) */}
            <div className="mt-0.5 sm:mt-1 flex items-center gap-3.5 sm:gap-4 w-full">
              {/* Clipping wrapper untuk komponen garis hijau lurus */}
              <div className="h-10 sm:h-11 overflow-hidden shrink-0">
                <motion.div
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease, delay: isInitialLoad ? 2.2 : 0 }}
                  style={{ y: authorY }}
                  className="w-1.5 sm:w-2 h-full bg-[#FF2A2A]"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="font-figtree font-extrabold text-lg sm:text-2xl text-[#FF2A2A] tracking-tight leading-tight flex items-center min-h-[32px]">
                  <span>{bintangTyped}</span>
                </div>
                <motion.div
                  variants={roleTypewriterParent}
                  initial="hidden"
                  animate="visible"
                  className="font-figtree font-bold text-xs sm:text-sm uppercase tracking-widest text-white/90 flex flex-wrap"
                >
                  {Array.from("FULL-STACK DEVELOPER / SOFTWARE ENGINEER").map((char, index) => (
                    <motion.span key={index} variants={charVariant}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ ROW 2 ══ Center TA */}
        <div className="relative z-10 flex justify-center items-center w-full py-0">
          {/* TA: Jeda 0.2s saat initial load, langsung tanpa delay saat scroll return */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: bintangExited ? 0 : 1,
              opacity: bintangExited ? 0 : 1,
            }}
            transition={{
              duration: bintangExited ? 2.2 : 1.0,
              ease,
              delay: isInitialLoad ? 0.25 : 0,
            }}
            className="text-[#FF2A2A] font-figtree font-extrabold select-none text-center flex"
            style={{
              fontSize: "clamp(130px, 23vw, 360px)",
              lineHeight: 0.75,
              letterSpacing: "-0.08em",
            }}
          >
            {taLetters.map((char, index) => (
              <motion.span
                key={char + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: bintangExited ? 0 : 1,
                  y: bintangExited ? 0 : 0,
                }}
                transition={{
                  duration: bintangExited ? 1.6 : 0.5,
                  delay: bintangExited ? index * 0.15 : (isInitialLoad ? 0.25 + index * 0.1 : index * 0.04),
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ══ ROW 3 ══ Kicker, Skills, Space untuk NG */}
        <div className="flex items-end justify-between gap-6">
          {/* Visual/Skills & IDX Kicker (Jarak lebih jauh dengan DEV/AK) */}
          <div className="flex items-start gap-12 sm:gap-16 mb-12 sm:mb-16 md:mb-20">
            {/* Kicker DEV/AK 2026 (Bergerak terus ke atas seiring scroll & animasi entrance awal) */}
            <div className="overflow-hidden shrink-0 pt-1 pb-1">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.25, ease, delay: 0.4 }}
                style={{ y: kickerY }}
                className="flex flex-col justify-start gap-1 font-figtree text-xs sm:text-sm uppercase tracking-wider"
              >
                <span className="text-white font-bold">DEV/AK</span>
                <span className="text-[#FF2A2A] font-extrabold text-base sm:text-lg">2026</span>
              </motion.div>
            </div>

            {/* Vertical Accent Bar & Skill List (Didekatkan ke komponen kirinya) */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              {/* Vertical Accent Bar Divider dalam Clipping Wrapper (Bergerak terus ke atas seiring scroll & entrance) */}
              <div className="hidden sm:block overflow-hidden shrink-0 self-stretch my-0.5">
                <motion.div
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 0.9 }}
                  transition={{ duration: 0.8, ease, delay: isInitialLoad ? 2.2 : 0 }}
                  style={{ y: dividerY }}
                  className="w-1.5 sm:w-2 h-full bg-[#FF2A2A]"
                />
              </div>

              {/* Skill List (Didekatkan rapat ke aksen bar hijau di kirinya) */}
              <div className="overflow-hidden min-w-[320px] sm:min-w-[440px] lg:min-w-[480px]">
                <div className="flex flex-col gap-2 sm:gap-2.5">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.text}
                      variants={skillVariants}
                      initial="hidden"
                      animate={exited ? "exit" : "visible"}
                      custom={i}
                      className="font-figtree text-xs sm:text-base font-bold uppercase tracking-widest text-[#d9d9d9] hover:text-[#FF2A2A] transition-colors cursor-pointer flex flex-nowrap whitespace-nowrap"
                    >
                      {Array.from(skill.text).map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.01,
                            delay:
                              skillEntranceDelay +
                              i * skillLineEntranceDelay +
                              index * skillCharEntranceDelay,
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-1" />

          {/* Spacer selebar area NG */}
          <div className="invisible shrink-0 pr-4 sm:pr-12 flex" style={{ fontSize: "clamp(130px, 23vw, 360px)", lineHeight: 0.75 }}>
            NG
          </div>
        </div>
      </div>
      </div>

      <style jsx global>{`
        .hero-mobile-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
        }
      `}</style>
    </section>
  );
}
