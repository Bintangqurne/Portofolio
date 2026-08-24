"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function WorkHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 27,
    mass: 0.45,
  });

  const archiveX = useTransform(smoothProgress, [0, 0.62], ["0%", "-7%"]);
  const creativeX = useTransform(smoothProgress, [0, 0.62], ["0%", "7%"]);
  const descriptionY = useTransform(smoothProgress, [0, 0.62], [0, 28]);
  const imageY = useTransform(smoothProgress, [0, 0.75], ["0%", "3%"]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full select-none overflow-hidden bg-black"
    >
      <motion.div
        className="absolute -inset-y-[8%] inset-x-0"
        style={{ y: reduceMotion ? "0%" : imageY }}
      >
        <Image
          src="/images/desktop.png"
          alt="Desktop workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-12 text-white sm:px-12 sm:pb-20 lg:px-20 lg:pb-20">
        <div className="w-full max-w-[1500px]">
          <h1 className="font-figtree text-[clamp(2.55rem,6.2vw,7.6rem)] font-black leading-[0.93] tracking-[-0.065em] text-white">
            <div className="overflow-hidden py-1">
              <motion.div
                className="w-max"
                initial={reduceMotion ? false : { x: "-105%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 1.15, delay: 0.38, ease: [0.25, 1, 0.5, 1] }}
              >
                <motion.span
                  className="block w-max whitespace-nowrap"
                  style={{ x: reduceMotion ? 0 : archiveX }}
                >
                  Archive <span className="font-serif font-light italic text-white/60">of</span>{" "}
                  Engineering
                </motion.span>
              </motion.div>
            </div>

            <div className="overflow-hidden py-1">
              <motion.div
                className="w-max"
                initial={reduceMotion ? false : { x: "105%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 1.15, delay: 0.48, ease: [0.25, 1, 0.5, 1] }}
              >
                <motion.span
                  className="block w-max whitespace-nowrap"
                  style={{ x: reduceMotion ? 0 : creativeX }}
                >
                  &amp; Creative Works —
                </motion.span>
              </motion.div>
            </div>
          </h1>

          <div className="mt-5 max-w-2xl sm:mt-7">
            <motion.div
              initial={reduceMotion ? false : { y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.62, ease: [0.25, 1, 0.5, 1] }}
            >
              <motion.p
                className="font-figtree text-sm font-normal leading-relaxed text-neutral-300 sm:text-lg lg:text-xl"
                style={{ y: reduceMotion ? 0 : descriptionY }}
              >
                Explore a curated collection of full-stack web applications, machine learning
                architectures, and high-performance digital systems built by Bintang Qurne.
              </motion.p>
            </motion.div>
          </div>
          {/* Scroll arrow intentionally hidden. */}
        </div>
      </div>
    </section>
  );
}
