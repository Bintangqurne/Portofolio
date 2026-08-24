"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const capabilities = [
  "Full-stack products",
  "System architecture",
  "Cloud infrastructure",
  "Applied machine learning",
  "API & data systems",
  "Interactive experiences",
];

const socials = [
  { label: "GitHub", href: "https://github.com/bintangqurne", icon: "github" },
  { label: "Instagram", href: "https://instagram.com/bintangqurne", icon: "instagram" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/",
    icon: "linkedin",
  },
] as const;

function SocialIcon({ name }: { name: (typeof socials)[number]["icon"] }) {
  if (name === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
        <path d="M12 .7C5.65.7.5 5.85.5 12.2c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.96 10.96 0 0 1 12 6.21c.98 0 1.95.13 2.86.38 2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.42.36.78 1.06.78 2.14v3.18c0 .31.21.67.79.56a11.51 11.51 0 0 0 7.88-10.91C23.5 5.85 18.35.7 12 .7Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.45,
  });
  const gridY = useTransform(smoothProgress, [0, 1], [-70, 70]);
  const leftY = useTransform(smoothProgress, [0, 1], [55, -35]);
  const portraitY = useTransform(smoothProgress, [0, 1], [85, -85]);
  const portraitScale = useTransform(smoothProgress, [0.12, 0.5, 0.9], [1.08, 1, 0.96]);
  const rightY = useTransform(smoothProgress, [0, 1], [95, -55]);
  const accentX = useTransform(smoothProgress, [0.18, 0.72], [0.08, 1]);

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="about-root relative scroll-mt-0 overflow-hidden bg-[#050505] px-4 pb-12 pt-12 text-[#dedede] sm:px-8 sm:pb-16 sm:pt-20 lg:min-h-[100svh] lg:px-6 lg:pb-8 lg:pt-28 xl:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="about-progress absolute left-0 top-0 z-20 h-[3px] w-full origin-left bg-[#ff2a2a]"
        style={{ scaleX: reduceMotion ? 1 : smoothProgress }}
      />
      <motion.div
        aria-hidden="true"
        className="about-grid absolute -inset-y-20 inset-x-0 opacity-30"
        style={{ y: reduceMotion ? 0 : gridY }}
      />

      <div className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-ibm-mono text-[8px] uppercase tracking-[0.16em] text-white/35 [writing-mode:vertical-rl]">
          Profile
        </span>
        <div className="h-28 w-px overflow-hidden bg-white/15">
          <motion.div
            className="h-full w-full origin-top bg-[#ff2a2a]"
            style={{ scaleY: reduceMotion ? 1 : smoothProgress }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-16 lg:grid-cols-[31%_36%_33%] lg:gap-5 xl:gap-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="flex min-w-0 flex-col lg:min-h-[calc(100svh-9rem)]"
          style={{ y: reduceMotion ? 0 : leftY }}
        >
          <div>
            <div className="hidden overflow-hidden lg:block">
              <motion.h2
                initial={reduceMotion ? false : { y: "105%" }}
                whileInView={reduceMotion ? undefined : { y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.08, ease }}
                className="font-fragment text-[clamp(118px,14.5vw,284px)] font-black uppercase leading-[0.72] tracking-[-0.105em] text-[#dedede]"
              >
                I&apos;m
              </motion.h2>
            </div>

            <h3 className="mt-0 font-figtree text-[clamp(38px,3.6vw,70px)] font-black uppercase leading-[0.82] tracking-[-0.075em] text-[#ff2a2a] lg:mt-7">
              Bintang
              <br />
              Qurne
            </h3>

            <div className="mt-5 pt-3">
              <motion.div
                className="mb-3 h-[3px] origin-left bg-white/25"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.9, ease }}
              />
              <p className="font-ibm-mono text-[10px] uppercase leading-[1.35] tracking-[0.035em] text-white/65 sm:text-xs">
                Engineering across product, data, and cloud systems.
              </p>
            </div>

            <p className="mt-8 w-max -rotate-3 font-signature text-[clamp(38px,3vw,58px)] font-bold leading-none tracking-[-0.055em] text-white/80">
              Bintang Qurne
            </p>
            <p className="mt-1 font-ibm-mono text-[10px] uppercase tracking-[0.08em] text-white/50">
              Software Engineer · Jakarta, ID
            </p>
          </div>

          <motion.blockquote
            className="mt-16 max-w-[560px] border-l-4 border-[#ff2a2a] pl-4 lg:mt-auto"
            whileHover={reduceMotion ? undefined : { x: 10 }}
            transition={{ duration: 0.35, ease }}
          >
            <p className="text-[clamp(22px,1.75vw,34px)] font-bold leading-[1.02] tracking-[-0.045em] text-white/72">
              “Good systems feel simple because the complexity has been designed,
              not ignored.”
            </p>
            <footer className="mt-4 font-ibm-mono text-[9px] uppercase tracking-[0.08em] text-white/38">
              — A working principle
            </footer>
          </motion.blockquote>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 55 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="min-w-0"
          style={{ y: reduceMotion ? 0 : portraitY }}
        >
          <div className="about-portrait relative min-h-[520px] overflow-hidden bg-[#0a0a0a] lg:h-[65svh] lg:min-h-[520px] lg:max-h-[740px]">
            <motion.div className="absolute inset-0" style={{ scale: reduceMotion ? 1 : portraitScale }}>
              <Image
                src="/images/aku.png"
                alt="Bintang Qurne"
                fill
                sizes="(max-width: 1023px) 100vw, 36vw"
                className="object-cover object-[50%_34%] grayscale contrast-[1.08]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,.52)_100%)]" />
            <div className="about-scanlines pointer-events-none absolute inset-0 opacity-25" />
            <div className="absolute left-4 top-4 border-l border-t border-white/55 px-3 py-2 font-ibm-mono text-[8px] uppercase tracking-[0.12em] text-white/55">
              Portrait
            </div>
            <div className="absolute bottom-4 right-4 h-12 w-12 border-b border-r border-white/55" />
            <motion.div
              className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#ff2a2a]"
              style={{ scaleX: reduceMotion ? 1 : accentX }}
            />
          </div>

          <h3 className="mt-4 text-[clamp(32px,2.8vw,54px)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-[#dedede]">
            I build across product, systems, and intelligence.
          </h3>

          <p className="mt-5 max-w-2xl text-sm font-semibold leading-[1.08] tracking-[-0.025em] text-white/60 sm:text-base">
            Computer Science student at BINUS University and Hacktiv8 full-stack
            graduate. Most projects begin with a real constraint; I turn it into a
            clear system, then iterate until the whole experience holds together.
          </p>

          <div className="mt-7 pt-3">
            <motion.div
              className="mb-3 h-[3px] origin-left bg-white/25"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
            />
            <p className="font-ibm-mono text-[9px] uppercase tracking-[0.08em] text-white/40">
              Socials
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="about-social flex h-10 w-10 items-center justify-center border border-white/25 text-white hover:border-[#ff2a2a] focus-visible:border-[#ff2a2a] focus-visible:outline-none"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 50 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="flex min-w-0 flex-col lg:min-h-[calc(100svh-9rem)] lg:pl-5"
          style={{ y: reduceMotion ? 0 : rightY }}
        >
          <p className="max-w-[680px] text-[clamp(20px,1.65vw,31px)] font-bold uppercase leading-[1.02] tracking-[-0.045em] text-[#dedede]">
            I&apos;m a Jakarta-based software engineer. My practice moves between
            full-stack product development, cloud architecture, and applied machine
            learning. Some systems ship quickly; the best ones keep evolving.
          </p>

          <div className="mt-16 lg:mt-auto">
            <p className="font-ibm-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-white/42">
              Things I build
            </p>
            <ul className="mt-4 border-l-[8px] border-white/20 pl-4">
              {capabilities.map((capability, index) => (
                <motion.li
                  key={capability}
                  className="cursor-default py-0.5 text-[clamp(17px,1.2vw,23px)] font-extrabold uppercase leading-[1.02] tracking-[-0.035em] text-white/80"
                  initial={reduceMotion ? false : { opacity: 0, x: 28 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  whileHover={reduceMotion ? undefined : { x: 9, color: "#ff2a2a" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.055, ease }}
                >
                  {capability}
                </motion.li>
              ))}
            </ul>

            <Link
              href="/work"
              className="group mt-9 inline-flex items-center gap-3 bg-[#ff2a2a] px-2 py-1 text-xl font-black uppercase leading-none tracking-[-0.05em] text-black transition-colors duration-300 hover:bg-white sm:text-2xl"
            >
              View the work
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .about-grid {
          background-image: linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, transparent, black 14%, black 86%, transparent);
        }
        .about-scanlines {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 3px,
            rgba(255,255,255,.16) 3px,
            rgba(255,255,255,.16) 4px
          );
          mix-blend-mode: overlay;
        }
        .about-portrait img {
          transition: filter 700ms cubic-bezier(.22,1,.36,1), transform 900ms cubic-bezier(.22,1,.36,1);
        }
        .about-portrait:hover img {
          filter: grayscale(0) contrast(1.04);
          transform: scale(1.018);
        }
        .about-social {
          transition: color 250ms ease, border-color 250ms ease, transform 300ms cubic-bezier(.22,1,.36,1);
        }
        .about-social:hover,
        .about-social:focus-visible {
          color: #ff2a2a;
          transform: translateY(-3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .about-portrait img,
          .about-social {
            transition: none;
          }
          .about-social:hover,
          .about-social:focus-visible {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
