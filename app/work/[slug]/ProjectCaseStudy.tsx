"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { CaseStudyProject, ProjectLink } from "../caseStudies";

const ease = [0.22, 1, 0.36, 1] as const;

const chapters = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
] as const;

type Tone = "dark" | "light" | "red";

// Sizes a display title so its longest word always fits the available width.
function fluidTitle(text: string, widthVw: number, maxVw: number, minPx: number, maxPx: number) {
  const longest = Math.max(...text.split(" ").map((word) => word.length));
  const vw = Math.min(maxVw, widthVw / (longest * 0.62));
  return `clamp(${minPx}px, ${vw.toFixed(2)}vw, ${maxPx}px)`;
}

function scrollToSection(id: string) {
  window.dispatchEvent(new CustomEvent("portfolio:scroll-to", { detail: { id } }));
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.82, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ label, index, tone = "dark" }: { label: string; index?: number; tone?: Tone }) {
  const reduceMotion = useReducedMotion();
  const text = tone === "dark" ? "text-white/50" : "text-black/55";
  const line = tone === "dark" ? "bg-white/20" : "bg-black/25";
  const accent = tone === "red" ? "text-black" : "text-[#ff2a2a]";

  return (
    <div className={`flex items-center gap-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px] ${text}`}>
      {index ? <span className={accent}>{String(index).padStart(2, "0")}</span> : null}
      <span>({label})</span>
      <motion.span
        aria-hidden="true"
        className={`h-px flex-1 origin-left ${line}`}
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease }}
      />
      {index ? <span>{String(index).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span> : null}
    </div>
  );
}

function BrowserFrame({ src, alt, url, sizes, priority = false }: { src: string; alt: string; url: string; sizes: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden border border-white/15 bg-[#111] shadow-[0_40px_120px_rgba(0,0,0,.55)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
          ))}
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 font-ibm-mono text-[8px] tracking-[0.06em] text-white/55 sm:text-[9px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff2a2a]" />
          <span className="truncate">{url}</span>
        </div>
        <span className="w-[34px] sm:w-[42px]" />
      </div>
      <div className="relative aspect-[1920/893]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-left-top" />
      </div>
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  );
}

function StatementWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="mt-12 max-w-[1400px] text-[clamp(34px,5.6vw,100px)] font-black uppercase leading-[0.86] tracking-[-0.066em] sm:mt-16"
    >
      {reduceMotion
        ? text
        : words.map((word, index) => (
            <Word key={`${word}-${index}`} progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
              {word}
            </Word>
          ))}
    </p>
  );
}

function ProcessStep({ step, index, total, progress }: { step: string; index: number; total: number; progress: MotionValue<number> }) {
  const reduceMotion = useReducedMotion();
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease }}
      className="group relative flex min-h-[220px] flex-col justify-between bg-[#0a0a0a] p-6 pt-8 transition-colors duration-500 hover:bg-[#111] lg:min-h-[300px] lg:p-8 lg:pt-10"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-white/10" />
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-[#ff2a2a]"
        style={{ scaleX: reduceMotion ? 1 : fill }}
      />
      <div className="flex items-center justify-between font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
        <span>Step</span>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-10">
        <p className="font-fragment text-[clamp(56px,5.5vw,104px)] leading-[0.8] tracking-[-0.08em] text-white/15 transition-colors duration-500 group-hover:text-[#ff2a2a]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-5 text-[clamp(22px,1.8vw,32px)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#dedede]">{step}</h3>
      </div>
    </motion.li>
  );
}

function ChapterRail() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = chapters.findIndex((chapter) => chapter.id === entry.target.id);
          setActive((current) => (entry.isIntersecting ? index : current === index ? -1 : current));
        }
      },
      { rootMargin: "-49% 0px -50% 0px" },
    );

    for (const chapter of chapters) {
      const node = document.getElementById(chapter.id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Case study chapters"
      className={`fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-end gap-2.5 text-white mix-blend-difference transition-opacity duration-500 xl:flex ${
        active < 0 ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          type="button"
          onClick={() => scrollToSection(chapter.id)}
          className="group flex items-center gap-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em]"
        >
          <span className="translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-80">
            {chapter.label}
          </span>
          <span className={`transition-opacity duration-300 ${index === active ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`h-px bg-current transition-all duration-500 ${index === active ? "w-10" : "w-4 opacity-40"}`} />
        </button>
      ))}
    </nav>
  );
}

export default function ProjectCaseStudy({ project, nextProject }: { project: CaseStudyProject; nextProject: ProjectLink }) {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: pageProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const progress = useSpring(pageProgress, { stiffness: 95, damping: 28, mass: 0.35 });

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const coverY = useTransform(heroProgress, [0, 1], ["-4%", "10%"]);
  const coverAccent = useTransform(heroProgress, [0, 0.6], [0.12, 1]);

  const { scrollYProgress: stepsProgress } = useScroll({ target: stepsRef, offset: ["start 0.85", "end 0.55"] });

  const { scrollYProgress: outcomeProgress } = useScroll({ target: outcomeRef, offset: ["start end", "start 0.3"] });
  const outcomeScale = useTransform(outcomeProgress, [0, 1], [0.86, 1]);

  const status = project.facts.find(([label]) => label === "Status")?.[1] ?? "Case study";
  const liveHost = new URL(project.liveUrl).host;
  const titleWords = project.title.split(" ");

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-[#050609] text-white selection:bg-[#ff2a2a] selection:text-black">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-[#ff2a2a]"
        style={{ scaleX: reduceMotion ? 1 : progress }}
      />
      <ChapterRail />

      {/* ══ HERO ══ */}
      <section ref={heroRef} id="hero" className="relative overflow-hidden px-5 pb-12 pt-24 sm:px-10 sm:pt-28 lg:px-16 lg:pb-16">
        <div className="case-dark-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#ff2a2a]/[0.07] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1600px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex items-center justify-between gap-4 border-b border-white/15 pb-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/60 sm:text-[10px]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 text-[#ff2a2a]">{project.code}</span>
              <span className="h-px w-6 shrink-0 bg-white/40 sm:w-12" />
              <span className="truncate">{project.category}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff2a2a]" />
              <span>{status}</span>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-end lg:gap-14">
            <h1
              aria-label={project.title}
              className="font-black uppercase leading-[0.8] tracking-[-0.085em] text-[#ff2a2a]"
              style={{ fontSize: fluidTitle(project.title, 86, 17, 40, 280) }}
            >
              {titleWords.map((word, index) => (
                <span key={`${word}-${index}`} aria-hidden="true" className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    className="block"
                    initial={reduceMotion ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.05, delay: 0.4 + index * 0.12, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.75, ease }}
              className="lg:pb-3"
            >
              <p className="border-l-[7px] border-[#ff2a2a] pl-4 text-[clamp(17px,1.35vw,23px)] font-bold uppercase leading-[1.04] tracking-[-0.04em] text-white/85">
                {project.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 bg-[#ff2a2a] px-3 py-2 text-base font-black uppercase leading-none tracking-[-0.04em] text-black transition-colors duration-300 hover:bg-white"
                >
                  Visit live
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => scrollToSection("overview")}
                  className="border border-white/25 px-3 py-2 font-ibm-mono text-[10px] uppercase tracking-[0.1em] text-white/70 transition-colors duration-300 hover:border-[#ff2a2a] hover:text-[#ff2a2a]"
                >
                  Read the case ↓
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { clipPath: "inset(14% 6% 0% 6%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            transition={{ duration: 1.25, delay: 0.55, ease }}
            className="case-cover relative mt-10 aspect-[4/5] overflow-hidden bg-[#0a0a0a] sm:aspect-[16/10] lg:mt-14 lg:aspect-[16/7]"
          >
            <motion.div className="absolute inset-x-0 -inset-y-[12%]" style={{ y: reduceMotion ? 0 : coverY }}>
              <Image src={project.cover} alt="" fill priority sizes="(max-width: 1600px) 100vw, 1600px" className="object-cover object-center grayscale contrast-[1.08]" />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.1)_40%,rgba(0,0,0,.7)_100%)]" />
            <div className="case-scanlines pointer-events-none absolute inset-0 opacity-20" />
            <div className="absolute left-4 top-4 border-l border-t border-white/55 px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/60">
              Cover
            </div>
            <div className="absolute bottom-4 right-4 h-12 w-12 border-b border-r border-white/55" />
            <p className="absolute bottom-5 left-4 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/60 sm:left-5">
              {project.code} — {project.title}
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#ff2a2a]"
              style={{ scaleX: reduceMotion ? 1 : coverAccent }}
            />
          </motion.div>

          <dl className="grid grid-cols-2 gap-px border-y border-white/15 bg-white/15 lg:grid-cols-4">
            {project.facts.map(([label, value]) => (
              <div key={label} className="bg-[#050609] py-5 pr-4 [&:nth-child(even)]:pl-4 lg:px-5 lg:first:pl-0 lg:[&:nth-child(even)]:pl-5">
                <dt className="font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/40 sm:text-[9px]">{label}</dt>
                <dd className="mt-2 text-sm font-extrabold uppercase leading-[1.05] tracking-[-0.025em] text-white/85 sm:text-base">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ 01 OVERVIEW ══ */}
      <section id="overview" className="bg-[#0a0a0a] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index={1} label="Overview" />
          <Reveal className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,.6fr)] lg:items-end lg:gap-20">
            <h2 className="text-[clamp(40px,5.8vw,108px)] font-black uppercase leading-[0.84] tracking-[-0.068em] text-[#dedede]">
              {project.overviewHeadline}
            </h2>
            <p className="max-w-xl border-l-[7px] border-[#ff2a2a] pl-4 text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/60 sm:text-lg">
              {project.overviewBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ INTRODUCTION STATEMENT ══ */}
      <section className="relative overflow-hidden bg-[#ff2a2a] px-5 py-24 text-black sm:px-10 sm:py-28 lg:px-16 lg:py-40">
        <div className="relative z-10 mx-auto max-w-[1600px]">
          <SectionHead label="Introduction" tone="red" />
          <StatementWords text={project.statement} />
          <div className="mt-14 flex items-center justify-between gap-4 border-t-2 border-black pt-3 font-ibm-mono text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px]">
            <span>— {project.title}</span>
            <span>{project.code}</span>
          </div>
        </div>
      </section>

      {/* ══ 02 PROBLEM ══ */}
      <section id="problem" className="bg-[#050609] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index={2} label="Problem" />
          <Reveal className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] lg:items-end lg:gap-20">
            <h2 className="text-[clamp(38px,5.4vw,100px)] font-black uppercase leading-[0.84] tracking-[-0.066em] text-[#dedede]">
              {project.problemHeadline}
            </h2>
            <p className="max-w-xl text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/55 sm:text-lg">{project.problemBody}</p>
          </Reveal>

          <div className="mt-16 border-b border-white/15 lg:mt-24">
            {project.problems.map((problem, index) => (
              <Reveal key={problem.title} delay={index * 0.06}>
                <article className="group relative grid gap-4 border-t border-white/15 py-8 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-x-6 lg:grid-cols-[160px_minmax(0,1fr)_minmax(0,1fr)] lg:items-baseline lg:gap-10 lg:py-11">
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-[3px] w-full origin-left scale-x-0 bg-[#ff2a2a] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                  />
                  <p className="font-fragment text-[clamp(40px,4vw,72px)] leading-none tracking-[-0.08em] text-white/20 transition-colors duration-500 group-hover:text-[#ff2a2a]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-[clamp(28px,3vw,54px)] font-black uppercase leading-[0.88] tracking-[-0.058em] text-[#dedede] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2">
                    {problem.title}
                  </h3>
                  <p className="max-w-md text-sm font-semibold leading-[1.3] tracking-[-0.015em] text-white/55 sm:col-start-2 sm:text-base lg:col-start-auto">
                    {problem.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 03 APPROACH ══ */}
      <section id="approach" className="bg-[#0a0a0a] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index={3} label="Approach" />
          <Reveal className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] lg:items-end lg:gap-20">
            <h2 className="text-[clamp(36px,4.8vw,88px)] font-black uppercase leading-[0.86] tracking-[-0.066em] text-[#dedede]">
              {project.approachHeadline}
            </h2>
            <p className="max-w-xl border-l-[7px] border-[#ff2a2a] pl-4 text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/60 sm:text-lg">
              {project.approachBody}
            </p>
          </Reveal>

          <div className="mt-16 flex items-center justify-between gap-4 font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/40 sm:text-[10px] lg:mt-24">
            <span>Process</span>
            <span>{String(project.approachSteps.length).padStart(2, "0")} steps</span>
          </div>
          <ol ref={stepsRef} className="mt-3 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {project.approachSteps.map((step, index) => (
              <ProcessStep key={step} step={step} index={index} total={project.approachSteps.length} progress={stepsProgress} />
            ))}
          </ol>
        </div>
      </section>

      {/* ══ 04 SOLUTION ══ */}
      <section id="solution" className="bg-[#e8e6e1] px-5 py-24 text-black sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index={4} label="Solution" tone="light" />
          <Reveal className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] lg:items-end lg:gap-20">
            <h2 className="text-[clamp(40px,6vw,112px)] font-black uppercase leading-[0.82] tracking-[-0.07em]">{project.solutionHeadline}</h2>
            <p className="max-w-xl border-l-[7px] border-[#ff2a2a] pl-4 text-base font-semibold leading-[1.3] tracking-[-0.02em] text-black/65 sm:text-lg">
              {project.solutionBody}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px border border-black bg-black sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {project.features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease }}
                className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden bg-[#e8e6e1] p-6 transition-colors duration-500 hover:bg-[#0a0a0a] hover:text-white lg:min-h-[300px] lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#ff2a2a] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between font-ibm-mono text-[9px] tracking-[0.12em] opacity-50">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="transition-transform duration-500 group-hover:rotate-45">+</span>
                </div>
                <div className="mt-12">
                  <h3 className="text-[clamp(25px,2.1vw,38px)] font-black uppercase leading-[0.9] tracking-[-0.052em] transition-colors duration-500 group-hover:text-[#ff2a2a]">
                    {feature.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-sm font-semibold leading-[1.3] tracking-[-0.015em] opacity-65">{feature.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 05 OUTCOME ══ */}
      <section id="outcome" className="bg-[#050609] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead index={5} label="Outcome" />
          <Reveal className="mt-12 lg:mt-16">
            <h2 className="max-w-[1400px] text-[clamp(40px,6.2vw,116px)] font-black uppercase leading-[0.83] tracking-[-0.07em] text-[#dedede]">
              {project.outcomeHeadline}
            </h2>
          </Reveal>
          <motion.div ref={outcomeRef} style={{ scale: reduceMotion ? 1 : outcomeScale }} className="mt-16 origin-top lg:mt-24">
            <BrowserFrame src={project.screenshot} alt={`Final ${project.title} interface`} url={liveHost} sizes="(max-width: 1600px) 100vw, 1600px" />
          </motion.div>
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 lg:grid-cols-2 lg:gap-20">
            {project.outcomeBody.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.07}>
                <div className="flex gap-4">
                  <span className="font-ibm-mono text-[9px] tracking-[0.12em] text-[#ff2a2a]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="max-w-xl text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/60 sm:text-lg">{paragraph}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPLORE / NEXT PROJECT ══ */}
      <section className="bg-[#0a0a0a] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <SectionHead label="Explore" />

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 flex items-end justify-between gap-6 border-b border-white/15 pb-8 focus-visible:outline-none"
          >
            <div>
              <p className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/45">Now that you know the context</p>
              <span className="mt-4 block h-[0.8em] overflow-hidden text-[clamp(48px,9vw,170px)] font-black uppercase leading-[0.8] tracking-[-0.08em]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2">
                  <span className="block h-[0.8em] text-[#dedede]">View live</span>
                  <span className="block h-[0.8em] text-[#ff2a2a]">View live</span>
                </span>
              </span>
            </div>
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 text-2xl transition-all duration-500 group-hover:rotate-45 group-hover:border-[#ff2a2a] group-hover:bg-[#ff2a2a] group-hover:text-black sm:h-24 sm:w-24 sm:text-4xl"
            >
              ↗
            </span>
          </a>

          <Link href={nextProject.href} className="group mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(300px,38%)] lg:items-end lg:gap-14">
            <div>
              <div className="flex items-center gap-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/45 sm:text-[10px]">
                <span className="text-[#ff2a2a]">{nextProject.code}</span>
                <span>(Next project)</span>
              </div>
              <h2
                className="mt-5 font-black uppercase leading-[0.8] tracking-[-0.085em] text-[#dedede] transition-colors duration-500 group-hover:text-[#ff2a2a]"
                style={{ fontSize: fluidTitle(nextProject.title, 52, 11, 40, 210) }}
              >
                {nextProject.title}
              </h2>
              <p className="mt-5 flex items-center gap-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/55 sm:text-[10px]">
                {nextProject.category}
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
              <Image
                src={nextProject.cover}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 38vw"
                className="scale-105 object-cover grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:grayscale-0"
              />
              <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-[#ff2a2a] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            </div>
          </Link>

          <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/15 pt-4 font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-white/55 sm:text-[10px]">
            <Link href="/work" className="transition-colors hover:text-[#ff2a2a]">← All work</Link>
            <button type="button" onClick={() => scrollToSection("hero")} className="transition-colors hover:text-[#ff2a2a]">
              Back to top ↑
            </button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .case-dark-grid {
          background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(to bottom, black, transparent 70%);
        }
        .case-scanlines {
          background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(255,255,255,.16) 3px, rgba(255,255,255,.16) 4px);
          mix-blend-mode: overlay;
        }
        .case-cover img {
          transition: filter 900ms cubic-bezier(.22,1,.36,1);
        }
        .case-cover:hover img {
          filter: grayscale(0) contrast(1.02);
        }
        @media (prefers-reduced-motion: reduce) {
          .case-cover img {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
