"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { label: "WORK", href: "/work" },
    { label: "GALLERY", href: "/gallery" },
    { label: "ABOUT", href: "/#about-me" },
    { label: "CONTACT", href: "/contact" },
  ];
  const mobileNavLinks = [{ label: "HOME", href: "/" }, ...navLinks];

  const ease = [0.25, 1, 0.5, 1] as const;

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function handleAboutClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);

    if (pathname !== "/") {
      router.push("/#about-me", { scroll: false });
      return;
    }

    window.history.pushState(null, "", "/#about-me");
    window.dispatchEvent(
      new CustomEvent("portfolio:scroll-to", {
        detail: { id: "about-me" },
      }),
    );
  }

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.2 }}
      className="pointer-events-none fixed top-0 z-[100] w-full bg-transparent lg:mix-blend-difference"
    >
      <div className="mobile-navbar-inner relative z-20 flex w-full items-center justify-between gap-2 px-5 py-4 pointer-events-auto sm:gap-5 sm:px-8">
        {/* Logo Lockup */}
        <Link
          href="/"
          className="inline-block transition-all duration-300 ease-out hover:scale-105 origin-left"
        >
          <div className="relative flex h-[36px] w-[116px] items-center justify-center sm:h-[38px] sm:w-[140px] lg:h-[45px] lg:w-[180px]">
            <Image
              src="/images/logo1.png"
              alt="Vertical Logo"
              width={180}
              height={45}
              priority
              className="object-contain w-full h-full"
            />
          </div>
        </Link>

        {/* Horizontal Menu Links */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              scroll={link.label === "ABOUT" ? false : undefined}
              onClick={link.label === "ABOUT" ? handleAboutClick : undefined}
              className="group relative block h-[24px] overflow-hidden font-figtree text-[8px] font-bold tracking-wide text-white antialiased min-[360px]:text-[9px] sm:text-xs lg:text-lg"
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2 will-change-transform transform-gpu">
                <span className="h-[24px] flex items-center text-white shrink-0">
                  {link.label}
                </span>
                <span className="h-[24px] flex items-center text-white shrink-0">
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff2a2a] lg:hidden"
        >
          <span className="relative block h-4 w-4">
            <span
              className={`absolute left-0 top-[4px] h-[2px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-[4px] left-0 h-[2px] w-4 bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-navigation-panel pointer-events-auto fixed inset-0 z-10 overflow-hidden bg-transparent px-5 text-white lg:hidden"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-black/72" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.28))]" />
            <div aria-hidden="true" className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-[#ff2a2a]/14 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col">
              <nav className="mt-2 flex flex-col items-end" aria-label="Mobile navigation">
                {mobileNavLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 42 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + index * 0.055, ease }}
                    className="overflow-hidden text-right"
                  >
                    <Link
                      href={link.href}
                      scroll={link.label === "ABOUT" ? false : undefined}
                      onClick={
                        link.label === "ABOUT"
                          ? handleAboutClick
                          : () => setMenuOpen(false)
                      }
                      className="group block py-0.5 text-[clamp(43px,13.5vw,64px)] font-black uppercase leading-[0.91] tracking-[-0.07em]"
                    >
                      <span className="transition-colors duration-300 group-hover:text-[#ff2a2a] group-focus-visible:text-[#ff2a2a]">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.48, ease }}
                className="ml-auto mt-5 h-[3px] w-[58%] origin-right bg-white"
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.58, ease }}
                className="mt-3 flex flex-col items-end gap-1 text-right text-base font-black uppercase leading-[1.05] tracking-[-0.035em]"
              >
                <a href="https://github.com/bintangqurne" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#ff2a2a]">GitHub</a>
                <a href="https://instagram.com/bintangqurne" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#ff2a2a]">Instagram</a>
                <a href="https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#ff2a2a]">LinkedIn</a>
              </motion.div>

              <div className="mt-auto grid grid-cols-2 gap-5 border-t border-white/25 pt-4 font-ibm-mono text-[8px] uppercase leading-[1.5] tracking-[0.1em] text-white/45">
                <p>Full-stack developer<br />Software engineer</p>
                <p className="text-right">Jakarta, Indonesia<br />Available for ideas</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1023px) {
          .mobile-navbar-inner {
            padding-top: max(1rem, env(safe-area-inset-top));
            padding-right: max(1.25rem, env(safe-area-inset-right));
            padding-left: max(1.25rem, env(safe-area-inset-left));
          }
          .mobile-navigation-panel {
            height: 100vh;
            padding-top: max(6rem, calc(env(safe-area-inset-top) + 5rem));
            padding-right: max(1.25rem, env(safe-area-inset-right));
            padding-bottom: max(1.75rem, env(safe-area-inset-bottom));
            padding-left: max(1.25rem, env(safe-area-inset-left));
          }
          @supports (height: 100dvh) {
            .mobile-navigation-panel {
              height: 100dvh;
            }
          }
        }
      `}</style>
    </motion.header>
  );
}
