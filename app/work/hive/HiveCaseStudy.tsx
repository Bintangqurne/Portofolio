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

const ease = [0.22, 1, 0.36, 1] as const;

const projectFacts = [
  ["Type", "Collaborative productivity platform"],
  ["Role", "Full-stack engineering"],
  ["Focus", "Scheduling · tasks · team operations"],
  ["Status", "Live product"],
];

const problems = [
  {
    title: "Fragmented state",
    body: "Schedules, tasks, meetings, and files often live in separate tools. The team has to rebuild the project context every time it changes tabs.",
  },
  {
    title: "Scheduling friction",
    body: "Finding a shared meeting window becomes a repetitive conversation when individual availability and the team calendar are disconnected.",
  },
  {
    title: "Low visibility",
    body: "Without one operational view, ownership and urgency become difficult to read. Work exists, but momentum is hard to see.",
  },
];

const features = [
  ["01", "Team workspaces", "A shared operating space with members, project state, and team-level access."],
  ["02", "Smart scheduling", "Availability-aware scheduling connected to calendar activity and meeting planning."],
  ["03", "Tasks & priorities", "A clearer view of active, urgent, completed, and recently updated work."],
  ["04", "Meetings", "Upcoming meeting context, attendees, timing, and access links stay close to the work."],
  ["05", "Files & inbox", "Team files and incoming activity are collected instead of scattered across channels."],
  ["06", "Live team signals", "Realtime workflow updates and a leaderboard make shared progress easier to read."],
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-current/50 sm:text-[10px]">
      ({children})
    </p>
  );
}

export default function HiveCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(pageProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.35,
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], [0, 150]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, -85]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.78], [1, 0]);

  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.82", "end 0.2"],
  });
  const statementY = useTransform(statementProgress, [0, 0.8], [90, 0]);
  const statementOpacity = useTransform(statementProgress, [0, 0.68], [0.16, 1]);

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
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0a0a0a] px-5 pb-16 pt-28 text-white sm:px-10 lg:px-16"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -inset-x-8 -inset-y-24"
          style={{ y: reduceMotion ? 0 : heroImageY }}
        >
          <Image
            src="/images/projects/covers/Hive.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.08]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.38),rgba(0,0,0,.18)_42%,rgba(0,0,0,.72))]" />
        <div className="absolute inset-0 bg-[#968aff]/15 mix-blend-color" />
        <div className="hive-grain pointer-events-none absolute inset-0 opacity-30" />

        <motion.div
          className="relative z-10 flex w-full max-w-[1600px] flex-col items-center text-center"
          style={{
            y: reduceMotion ? 0 : heroCopyY,
            opacity: reduceMotion ? 1 : heroCopyOpacity,
          }}
        >
          <div className="flex items-center gap-3 font-ibm-mono text-[9px] uppercase tracking-[0.12em] sm:text-[10px]">
            <span className="text-[#ff2a2a]">PRJ—02</span>
            <span className="h-px w-12 bg-white/50" />
            <span>Collaborative workspace</span>
          </div>

          <div className="mt-8 overflow-hidden">
            <motion.h1
              initial={reduceMotion ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.2, ease }}
              className="font-figtree text-[clamp(7rem,21vw,24rem)] font-black uppercase leading-[0.67] tracking-[-0.11em]"
            >
              Hive
            </motion.h1>
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-9 max-w-xl text-[clamp(18px,1.5vw,26px)] font-bold uppercase leading-[1.02] tracking-[-0.04em]"
          >
            One focused workspace for schedules, tasks, meetings, files, and shared team momentum.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-5 left-5 z-10 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/65 sm:left-10 sm:text-[9px] lg:left-16">
          Product case study
        </div>
        <div className="absolute bottom-5 right-5 z-10 text-right font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/65 sm:right-10 sm:text-[9px] lg:right-16">
          Scroll to read ↓
        </div>
      </section>

      <section className="bg-[#f2f1ed] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel>Overview</SectionLabel>
          <Reveal className="mt-10 grid gap-12 border-b border-black/25 pb-20 lg:grid-cols-[1.35fr_.65fr] lg:gap-20">
            <h2 className="max-w-5xl text-[clamp(50px,7.4vw,132px)] font-black uppercase leading-[0.79] tracking-[-0.075em]">
              Team coordination should not require five disconnected tools.
            </h2>
            <div className="flex flex-col justify-end">
              <p className="max-w-lg text-base font-semibold leading-[1.3] tracking-[-0.025em] text-black/68 sm:text-lg">
                Hive is a full-stack productivity platform designed around a simple idea: the team should be able to understand what is happening, what comes next, and where everything lives from one shared workspace.
              </p>
            </div>
          </Reveal>

          <div className="grid border-b border-black/25 sm:grid-cols-2 lg:grid-cols-4">
            {projectFacts.map(([label, value], index) => (
              <Reveal
                key={label}
                delay={index * 0.055}
                className="border-b border-black/20 py-7 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <p className="font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-black/40">{label}</p>
                <p className="mt-3 max-w-[260px] text-sm font-extrabold uppercase leading-[1.05] tracking-[-0.025em]">{value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={statementRef}
        className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#0a0a0a] px-5 py-28 text-white sm:px-10 lg:px-16"
      >
        <div className="hive-dark-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="hive-grain pointer-events-none absolute inset-0 opacity-35" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <SectionLabel>Introduction</SectionLabel>
          <motion.p
            style={{
              y: reduceMotion ? 0 : statementY,
              opacity: reduceMotion ? 1 : statementOpacity,
            }}
            className="ml-auto mt-12 max-w-[1250px] text-[clamp(40px,6.4vw,112px)] font-black uppercase leading-[0.84] tracking-[-0.068em]"
          >
            Hive brings schedules, tasks, meetings, files, and team signals into one shared operating space.
          </motion.p>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel>Problem</SectionLabel>
          <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h2 className="max-w-5xl text-[clamp(48px,7vw,124px)] font-black uppercase leading-[0.79] tracking-[-0.072em]">
              The problem was not a lack of tools. It was the gap between them.
            </h2>
            <p className="max-w-xl text-base font-semibold leading-[1.28] tracking-[-0.025em] text-black/62 sm:text-lg">
              Teams already have calendars, chat, task lists, meeting links, and file storage. The friction appears when those pieces stop reflecting the same reality.
            </p>
          </Reveal>

          <div className="mt-20 grid border-y border-black lg:grid-cols-3">
            {problems.map((problem, index) => (
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
            <SectionLabel>Approach</SectionLabel>
            <Reveal className="mt-10">
              <h2 className="text-[clamp(42px,5vw,86px)] font-black uppercase leading-[0.82] tracking-[-0.068em]">
                Start with the team&apos;s day, not a list of features.
              </h2>
              <p className="mt-8 max-w-lg text-base font-semibold leading-[1.28] tracking-[-0.025em] text-black/62">
                The interface was organized around recurring team decisions: check the day, understand priorities, schedule the next conversation, and move the work forward.
              </p>
            </Reveal>

            <div className="mt-14 border-t border-black/25">
              {["Map the shared workflow", "Reduce context switching", "Keep activity visible", "Design for fast scanning"].map((item, index) => (
                <Reveal key={item} delay={index * 0.045} className="flex items-center justify-between border-b border-black/25 py-4">
                  <span className="text-sm font-extrabold uppercase tracking-[-0.025em]">{item}</span>
                  <span className="font-ibm-mono text-[8px] text-black/40">0{index + 1}</span>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="relative min-h-[64svh] overflow-hidden border border-black/15 bg-white shadow-[0_28px_80px_rgba(0,0,0,.12)] lg:min-h-[88svh]">
            <Image
              src="/images/projects/hive.png"
              alt="Hive team dashboard showing schedules, tasks, meetings, and leaderboard"
              fill
              sizes="(max-width: 1023px) 100vw, 64vw"
              className="object-cover object-left-top"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
          </Reveal>
        </div>
      </section>

      <section className="bg-[#ff2a2a] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel>Solution</SectionLabel>
          <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h2 className="max-w-5xl text-[clamp(52px,8.2vw,146px)] font-black uppercase leading-[0.75] tracking-[-0.082em]">
              One workspace. A clearer operating loop.
            </h2>
            <p className="max-w-xl text-base font-bold leading-[1.25] tracking-[-0.025em] text-black/70 sm:text-lg">
              Hive combines the operational pieces without making the dashboard feel dense. Each module answers one immediate team question and feeds the same shared context.
            </p>
          </Reveal>

          <div className="mt-20 grid border-y border-black md:grid-cols-2 lg:grid-cols-3">
            {features.map(([number, title, body], index) => (
              <motion.article
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { backgroundColor: "#050505", color: "#ffffff" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.045, ease }}
                className="group min-h-[270px] border-b border-black p-6 md:border-r md:[&:nth-child(2n)]:border-r-0 lg:min-h-[320px] lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <p className="font-ibm-mono text-[9px] tracking-[0.12em] opacity-45">{number}</p>
                <h3 className="mt-12 text-[clamp(25px,2.1vw,39px)] font-black uppercase leading-[0.9] tracking-[-0.052em]">{title}</h3>
                <p className="mt-6 max-w-sm text-sm font-semibold leading-[1.25] tracking-[-0.02em] opacity-65">{body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel>Outcome</SectionLabel>
          <Reveal className="mt-10">
            <h2 className="max-w-[1380px] text-[clamp(46px,7.2vw,128px)] font-black uppercase leading-[0.79] tracking-[-0.075em]">
              The result is a product where team activity can be understood before it has to be explained.
            </h2>
          </Reveal>

          <Reveal className="mt-20 overflow-hidden border border-white/15 bg-white/5 p-2 sm:p-4">
            <div className="relative aspect-[1920/893] min-h-[330px] overflow-hidden">
              <Image
                src="/images/projects/hive.png"
                alt="Final Hive collaborative workspace dashboard"
                fill
                sizes="100vw"
                className="object-cover object-left-top"
              />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-2">
            <Reveal>
              <p className="max-w-xl text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/62">
                The project brought interface design, authentication, team permissions, external calendar integration, file workflows, and realtime product state into one end-to-end build.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:justify-self-end">
              <p className="max-w-xl text-base font-semibold leading-[1.3] tracking-[-0.02em] text-white/62">
                More than a dashboard, Hive became an exercise in shaping a complex system into a calm, readable daily tool.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel>Explore</SectionLabel>
          <div className="mt-12 grid overflow-hidden border border-black lg:grid-cols-[1fr_auto]">
            <a
              href="https://hive.qurne.com"
              target="_blank"
              rel="noreferrer"
              className="group bg-white p-7 transition-colors duration-500 hover:bg-[#ff2a2a] focus-visible:bg-[#ff2a2a] focus-visible:outline-none sm:p-10 lg:p-14"
            >
              <p className="font-ibm-mono text-[9px] uppercase tracking-[0.12em] text-black/45">Now that you know the context</p>
              <div className="mt-5 flex items-end justify-between gap-6">
                <h2 className="text-[clamp(48px,7vw,124px)] font-black uppercase leading-[0.77] tracking-[-0.078em]">View live project</h2>
                <span className="text-4xl transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl">↗</span>
              </div>
            </a>
            <Link
              href="/work"
              className="flex min-h-32 items-center justify-center border-t border-black bg-black px-10 font-ibm-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#ff2a2a] hover:text-black lg:min-h-0 lg:border-l lg:border-t-0"
            >
              All work
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .hive-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
        }
        .hive-dark-grid {
          background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
        }
      `}</style>
    </main>
  );
}
