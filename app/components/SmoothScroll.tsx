"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      lerp: 0.07,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    function scrollToCurrentHash() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      lenis.scrollTo(target, { duration: 1.35 });
    }

    function scrollToRequestedSection(event: Event) {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      if (!detail?.id) return;
      const target = document.getElementById(detail.id);
      if (!target) return;
      lenis.scrollTo(target, { duration: 1.45 });
    }

    let frameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);
    window.addEventListener("hashchange", scrollToCurrentHash);
    window.addEventListener("portfolio:scroll-to", scrollToRequestedSection);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", scrollToCurrentHash);
      window.removeEventListener("portfolio:scroll-to", scrollToRequestedSection);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Next.js keeps the previous scroll offset while the new page is still in view,
  // and Lenis keeps its own target, so every route change starts from the top.
  const isFirstRender = useRef(true);
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.location.hash) return;

    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;

    let nestedFrame = 0;
    const frame = requestAnimationFrame(() => {
      nestedFrame = requestAnimationFrame(() => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const target = document.getElementById(id);
        if (target) lenisRef.current?.scrollTo(target, { duration: 1.35 });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nestedFrame);
    };
  }, [pathname]);

  return <>{children}</>;
}
