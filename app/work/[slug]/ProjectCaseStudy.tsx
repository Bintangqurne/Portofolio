"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { CaseStudyProject } from "../caseStudies";

const ease = [0.22, 1, 0.36, 1] as const;

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

function Label({ children }: { children: ReactNode }) {
  return <p className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] opacity-50 sm:text-[10px]">({children})</p>;
}

export default function ProjectCaseStudy({ project }: { project: CaseStudyProject }) {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: pageProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const progress = useSpring(pageProgress, { stiffness: 95, damping: 28, mass: 0.35 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, -85]);
  const heroOpacity = useTransform(heroProgress, [0, 0.76], [1, 0]);
  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "end 0.22"],
  });
  const statementY = useTransform(statementProgress, [0, 0.8], [90, 0]);
  const statementOpacity = useTransform(statementProgress, [0, 0.68], [0.15, 1]);

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-[#f2f1ed] text-black selection:bg-[#ff2a2a] selection:text-black">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-[#ff2a2a]"
        style={{ scaleX: reduceMotion ? 1 : progress }}
      />

      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-5 pb-16 pt-28 text-white sm:px-10 lg:px-16"
      >
        <motion.div className="absolute -inset-x-8 -inset-y-24" style={{ y: reduceMotion ? 0 : heroImageY }}>
          <Image src={project.cover} alt="" fill priority sizes="100vw" className="object-cover object-center grayscale contrast-[1.1]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.48),rgba(0,0,0,.18)_42%,rgba(0,0,0,.78))]" />
        <div className="absolute inset-0 bg-[#ff2a2a]/10 mix-blend-color" />
        <div className="case-grain pointer-events-none absolute inset-0 opacity-30" />

        <motion.div
          className="relative z-10 flex w-full max-w-[1600px] flex-col items-center text-center"
          style={{ y: reduceMotion ? 0 : heroCopyY, opacity: reduceMotion ? 1 : heroOpacity }}
        >
          <div className="flex items-center gap-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px]">
            <span className="text-[#ff2a2a]">{project.code}</span>
            <span className="h-px w-12 bg-white/50" />
            <span>{project.category}</span>
          </div>
          <div className="mt-8 overflow-hidden pb-5">
            <motion.h1
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.2, ease }}
              className="max-w-[1500px] font-figtree text-[clamp(5rem,15vw,18rem)] font-black uppercase leading-[0.69] tracking-[-0.105em]"
            >
              {project.title}
            </motion.h1>
          </div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-5 max-w-2xl text-[clamp(17px,1.45vw,25px)] font-bold uppercase leading-[1.03] tracking-[-0.04em]"
          >
            {project.summary}
          </motion.p>
        </motion.div>

        <span className="absolute bottom-5 left-5 z-10 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/60 sm:left-10 lg:left-16">Product case study</span>
        <span className="absolute bottom-5 right-5 z-10 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/60 sm:right-10 lg:right-16">Scroll to read ↓</span>
      </section>

      <section className="px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Label>Overview</Label>
          <Reveal className="mt-10 grid gap-12 border-b border-black/25 pb-20 lg:grid-cols-[1.3fr_.7fr] lg:gap-20">
            <h2 className="max-w-5xl text-[clamp(48px,7.1vw,126px)] font-black uppercase leading-[0.79] tracking-[-0.075em]">{project.overviewHeadline}</h2>
            <p className="max-w-xl self-end text-base font-semibold leading-[1.3] tracking-[-0.025em] text-black/65 sm:text-lg">{project.overviewBody}</p>
          </Reveal>
          <div className="grid border-b border-black/25 sm:grid-cols-2 lg:grid-cols-4">
            {project.facts.map(([label, value], index) => (
              <Reveal key={label} delay={index * 0.05} className="border-b border-black/20 py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <p className="font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-black/40">{label}</p>
                <p className="mt-3 max-w-[270px] text-sm font-extrabold uppercase leading-[1.05] tracking-[-0.025em]">{value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section ref={statementRef} className="relative flex min-h-[90svh] items-center overflow-hidden bg-[#090909] px-5 py-28 text-white sm:px-10 lg:px-16">
        <div className="case-dark-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="case-grain pointer-events-none absolute inset-0 opacity-35" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <Label>Introduction</Label>
          <motion.p
            style={{ y: reduceMotion ? 0 : statementY, opacity: reduceMotion ? 1 : statementOpacity }}
            className="ml-auto mt-12 max-w-[1300px] text-[clamp(38px,6vw,106px)] font-black uppercase leading-[0.84] tracking-[-0.068em]"
          >
            {project.statement}
          </motion.p>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Label>Problem</Label>
          <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h2 className="max-w-5xl text-[clamp(46px,6.7vw,118px)] font-black uppercase leading-[0.79] tracking-[-0.072em]">{project.problemHeadline}</h2>
            <p className="max-w-xl text-base font-semibold leading-[1.28] tracking-[-0.025em] text-black/62 sm:text-lg">{project.problemBody}</p>
          </Reveal>
          <div className="mt-20 grid border-y border-black lg:grid-cols-3">
            {project.problems.map((problem, index) => (
              <motion.article
                key={problem.title}
                initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { backgroundColor: "#ff2a2a", y: -8 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.07, ease }}
                className="min-h-[320px] border-b border-black p-6 lg:min-h-[390px] lg:border-b-0 lg:border-r lg:last:border-r-0 lg:p-8"
              >
                <p className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-black/45">0{index + 1}</p>
                <h3 className="mt-16 text-[clamp(28px,2.4vw,46px)] font-black uppercase leading-[0.86] tracking-[-0.055em]">{problem.title}</h3>
                <p className="mt-7 max-w-sm text-sm font-semibold leading-[1.25] tracking-[-0.02em] text-black/65">{problem.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f1ed] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div className="flex flex-col lg:sticky lg:top-28 lg:h-[calc(100svh-9rem)]">
            <Label>Approach</Label>
            <Reveal className="mt-10">
              <h2 className="text-[clamp(40px,4.8vw,82px)] font-black uppercase leading-[0.82] tracking-[-0.066em]">{project.approachHeadline}</h2>
              <p className="mt-8 max-w-lg text-base font-semibold leading-[1.28] tracking-[-0.025em] text-black/62">{project.approachBody}</p>
            </Reveal>
            <div className="mt-14 border-t border-black/25">
              {project.approachSteps.map((step, index) => (
                <Reveal key={step} delay={index * 0.045} className="flex items-center justify-between border-b border-black/25 py-4">
                  <span className="text-sm font-extrabold uppercase tracking-[-0.025em]">{step}</span>
                  <span className="font-ibm-mono text-[8px] text-black/40">0{index + 1}</span>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="relative min-h-[64svh] overflow-hidden border border-black/15 bg-white shadow-[0_28px_80px_rgba(0,0,0,.12)] lg:min-h-[88svh]">
            <Image src={project.screenshot} alt={`${project.title} interface`} fill sizes="(max-width: 1023px) 100vw, 64vw" className="object-cover object-left-top" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
          </Reveal>
        </div>
      </section>

      <section className="bg-[#ff2a2a] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Label>Solution</Label>
          <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h2 className="max-w-5xl text-[clamp(50px,7.8vw,138px)] font-black uppercase leading-[0.76] tracking-[-0.08em]">{project.solutionHeadline}</h2>
            <p className="max-w-xl text-base font-bold leading-[1.25] tracking-[-0.025em] text-black/70 sm:text-lg">{project.solutionBody}</p>
          </Reveal>
          <div className="mt-20 grid border-y border-black md:grid-cols-2 lg:grid-cols-3">
            {project.features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { backgroundColor: "#050505", color: "#fff" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.045, ease }}
                className="min-h-[270px] border-b border-black p-6 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:min-h-[320px] lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <p className="font-ibm-mono text-[9px] tracking-[0.12em] opacity-45">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-12 text-[clamp(25px,2.1vw,39px)] font-black uppercase leading-[0.9] tracking-[-0.052em]">{feature.title}</h3>
                <p className="mt-6 max-w-sm text-sm font-semibold leading-[1.25] tracking-[-0.02em] opacity-65">{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090909] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Label>Outcome</Label>
          <Reveal className="mt-10">
            <h2 className="max-w-[1400px] text-[clamp(44px,6.9vw,122px)] font-black uppercase leading-[0.79] tracking-[-0.074em]">{project.outcomeHeadline}</h2>
          </Reveal>
          <Reveal className="mt-20 overflow-hidden border border-white/15 bg-white/5 p-2 sm:p-4">
            <div className="relative aspect-[1920/893] min-h-[330px] overflow-hidden">
              <Image src={project.screenshot} alt={`Final ${project.title} interface`} fill sizes="100vw" className="object-cover object-left-top" />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-2">
            {project.outcomeBody.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.07} className={index === 1 ? "lg:justify-self-end" : ""}>
                <p className="max-w-xl text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/62">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <Label>Explore</Label>
          <div className="mt-12 grid overflow-hidden border border-black lg:grid-cols-[1fr_auto]">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group bg-white p-7 transition-colors duration-500 hover:bg-[#ff2a2a] focus-visible:bg-[#ff2a2a] focus-visible:outline-none sm:p-10 lg:p-14"
            >
              <p className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Now that you know the context</p>
              <div className="mt-5 flex items-end justify-between gap-6">
                <h2 className="text-[clamp(46px,6.8vw,120px)] font-black uppercase leading-[0.77] tracking-[-0.078em]">View live project</h2>
                <span className="text-4xl transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl">↗</span>
              </div>
            </a>
            <Link href="/work" className="flex min-h-32 items-center justify-center border-t border-black bg-black px-10 font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#ff2a2a] hover:text-black lg:min-h-0 lg:border-l lg:border-t-0">
              All work
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .case-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
        }
        .case-dark-grid {
          background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
        }
      `}</style>
    </main>
  );
}
