"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type Project = {
  code: string;
  title: string;
  category: string;
  description: string;
  role: string;
  tools: string;
  image: string;
  href: string;
  imageBackground: string;
};

const projects: Project[] = [
  {
    code: "PRJ—01",
    title: "CREDIT\nGUARD",
    category: "AI CREDIT INTELLIGENCE",
    description:
      "An explainable credit-risk platform that turns complex financial signals into clearer, faster decisions.",
    role: "FULL-STACK & ML",
    tools: "NEXT.JS · FEATURE MODELS · AI",
    image: "/images/projects/covers/Credit-Guard.jpeg",
    href: "/work/credit-guard",
    imageBackground: "#E7E7E5",
  },
  {
    code: "PRJ—02",
    title: "HIVE",
    category: "COLLABORATIVE WORKSPACE",
    description:
      "A focused digital workspace built to help teams coordinate, communicate, and keep shared work moving.",
    role: "FULL-STACK ENGINEERING",
    tools: "AWS · REAL-TIME COLLABORATION",
    image: "/images/projects/covers/Hive.jpeg",
    href: "/work/hive",
    imageBackground: "#E7E7E5",
  },
  {
    code: "PRJ—03",
    title: "HOLY\nBIN",
    category: "CONNECTED WASTE SYSTEM",
    description:
      "An IoT-assisted waste system that recognizes material types and makes collection activity easier to track.",
    role: "IOT & PRODUCT SYSTEM",
    tools: "SENSORS · FIREBASE · WEB APP",
    image: "/images/projects/covers/HolyBin.jpeg",
    href: "/work/holy-bin",
    imageBackground: "#0A0A0A",
  },
  {
    code: "PRJ—04",
    title: "TOX21",
    category: "PREDICTIVE TOXICOLOGY",
    description:
      "A machine-learning study for exploring molecular toxicity through approachable, visual predictions.",
    role: "MACHINE LEARNING",
    tools: "PREDICTIVE ANALYSIS · DATA VISUALIZATION",
    image: "/images/projects/covers/Tox21.jpeg",
    href: "/work/tox21",
    imageBackground: "#E7E7E5",
  },
  {
    code: "PRJ—05",
    title: "TECHNO\nSCAPE",
    category: "EVENT PLATFORM",
    description:
      "A high-traffic competition platform shaped around resilient architecture, reliable access, and a fast participant journey.",
    role: "PM & SYSTEM ARCHITECT",
    tools: "FRONTEND · BACKEND · RATE LIMITING",
    image: "/images/projects/covers/technoscape.png",
    href: "/work/technoscape",
    imageBackground: "#090909",
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const mediaFrame = useRef<number | null>(null);
  const pendingPanX = useRef(0);
  const pendingPanY = useRef(0);
  const pendingTooltipX = useRef(20);
  const pendingTooltipY = useRef(20);
  const mediaElement = useRef<HTMLAnchorElement | null>(null);
  const isExternal = project.href.startsWith("http");

  useEffect(() => {
    return () => {
      if (mediaFrame.current !== null) cancelAnimationFrame(mediaFrame.current);
    };
  }, []);

  function handleMediaPointerMove(event: ReactPointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || typeof window === "undefined") return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const pointerRatio = Math.max(0, Math.min(1, localX / Math.max(bounds.width, 1)));
    const pointerRatioY = Math.max(0, Math.min(1, localY / Math.max(bounds.height, 1)));
    const tooltipWidth = Math.min(300, Math.max(bounds.width - 32, 180));
    pendingPanX.current = (0.5 - pointerRatio) * 12;
    pendingPanY.current = (0.5 - pointerRatioY) * 10;
    pendingTooltipX.current = Math.max(
      16,
      Math.min(bounds.width - tooltipWidth - 16, localX + 18),
    );
    pendingTooltipY.current = Math.max(16, Math.min(bounds.height - 132, localY + 18));
    mediaElement.current = target;

    if (mediaFrame.current !== null) return;
    mediaFrame.current = requestAnimationFrame(() => {
      mediaElement.current?.style.setProperty("--project-pan-x", `${pendingPanX.current}px`);
      mediaElement.current?.style.setProperty("--project-pan-y", `${pendingPanY.current}px`);
      mediaElement.current?.style.setProperty("--project-tooltip-x", `${pendingTooltipX.current}px`);
      mediaElement.current?.style.setProperty("--project-tooltip-y", `${pendingTooltipY.current}px`);
      mediaFrame.current = null;
    });
  }

  function handleMediaPointerLeave(event: ReactPointerEvent<HTMLAnchorElement>) {
    if (mediaFrame.current !== null) {
      cancelAnimationFrame(mediaFrame.current);
      mediaFrame.current = null;
    }
    event.currentTarget.style.setProperty("--project-pan-x", "0px");
    event.currentTarget.style.setProperty("--project-pan-y", "0px");
  }

  return (
    <article
      className="group/project grid border-t border-black/20 bg-[#f1f1ef] lg:min-h-[clamp(620px,72svh,760px)] lg:grid-cols-2"
      aria-labelledby={`project-title-${index}`}
    >
      <Link
        href={project.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        aria-label={`Read the ${project.title.replace("\n", " ")} case study`}
        className="group/copy relative grid min-h-[520px] overflow-hidden bg-[#f1f1ef] text-black no-underline transition-colors duration-500 hover:bg-[#ff2a2a] focus-visible:bg-[#ff2a2a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-inset focus-visible:outline-black lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_5rem]"
      >
        <div className="flex min-h-[520px] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:min-h-0 lg:px-10 lg:py-9 xl:px-12 xl:py-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: revealEase }}
          >
            <div className="flex items-center justify-between gap-6 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-black/55 sm:text-xs">
              <span>(Project)</span>
              <span>{project.code}</span>
            </div>

            <h2
              id={`project-title-${index}`}
              className="mt-12 whitespace-pre-line font-figtree text-[clamp(4rem,5.3vw,7rem)] font-black uppercase leading-[0.78] tracking-[-0.085em] text-black lg:mt-8"
            >
              {project.title}
            </h2>

            <p className="mt-8 max-w-xl font-figtree text-base font-bold uppercase leading-[1.15] tracking-[-0.025em] text-black sm:text-xl lg:mt-6 lg:text-[clamp(0.9rem,1.05vw,1.15rem)]">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.08, ease: revealEase }}
            className="mt-12 flex items-end gap-8 lg:mt-8"
          >
            <div className="border-l-[8px] border-black pl-3 font-figtree text-xs font-semibold uppercase leading-[1.2] tracking-[-0.02em] sm:text-sm">
              <p>{project.role}</p>
              <p>{project.tools}</p>
              <p className="mt-3 font-mono text-[10px] font-normal tracking-normal text-black/55 sm:text-xs">
                {project.category}
              </p>
            </div>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="hidden border-r border-black/15 transition-colors duration-500 lg:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 10px, rgba(0,0,0,0.18) 10px, rgba(0,0,0,0.18) 11px)",
          }}
        />
      </Link>

      <Link
        href={project.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="group/media relative block min-h-[52svh] overflow-hidden focus-visible:outline focus-visible:outline-4 focus-visible:outline-inset focus-visible:outline-black sm:min-h-[60svh] lg:min-h-0"
        aria-label={`Read the ${project.title.replace("\n", " ")} case study`}
        style={{
          backgroundColor: project.imageBackground,
          "--project-pan-x": "0px",
          "--project-pan-y": "0px",
          "--project-tooltip-x": "20px",
          "--project-tooltip-y": "20px",
        } as CSSProperties}
        onPointerMove={handleMediaPointerMove}
        onPointerLeave={handleMediaPointerLeave}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: revealEase }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={`${project.title.replace("\n", " ")} project interface`}
            fill
            sizes="(max-width: 1023px) 100vw, 49vw"
            className="object-cover grayscale contrast-[1.04] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [will-change:transform]"
            style={{
              transform:
                "translate3d(var(--project-pan-x, 0px), var(--project-pan-y, 0px), 0) scale(1.03)",
            }}
          />
        </motion.div>

        <div
          className="pointer-events-none absolute z-10 w-[min(300px,calc(100%_-_32px))] translate-y-2 bg-transparent text-white opacity-0 mix-blend-difference transition-[left,top,opacity,transform] duration-200 ease-out group-hover/media:translate-y-0 group-hover/media:opacity-100"
          style={{
            left: "var(--project-tooltip-x, 20px)",
            top: "var(--project-tooltip-y, 20px)",
          }}
        >
          <div className="h-[4.5em] overflow-hidden font-figtree text-sm font-bold uppercase leading-[1.12] tracking-[-0.03em] sm:text-base">
            <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/media:-translate-y-1/2">
              <p className="flex h-[4.5em] shrink-0 items-start">{project.description}</p>
              <p aria-hidden="true" className="flex h-[4.5em] shrink-0 items-start">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function ProjectArchiveSection() {
  return (
    <section id="project-archive" className="relative w-full bg-[#f1f1ef] text-black">
      <header className="flex items-center justify-between border-t border-black border-b border-black/20 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.08em] sm:px-10 sm:text-xs lg:px-12 xl:px-16">
        <span>Selected projects</span>
        <span>{String(projects.length).padStart(2, "0")} works · Scroll to explore</span>
      </header>

      {projects.map((project, index) => (
        <ProjectRow key={project.code} project={project} index={index} />
      ))}
    </section>
  );
}
