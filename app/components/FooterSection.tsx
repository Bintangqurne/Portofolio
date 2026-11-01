"use client";

import React, { useState } from "react";

function RollLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group relative block overflow-hidden h-[1.35em] font-bold text-base sm:text-lg lg:text-xl tracking-tight text-black"
    >
      <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
        <span className="block h-[1.35em] flex items-center leading-none text-black">{children}</span>
        <span className="block h-[1.35em] flex items-center leading-none text-black">{children}</span>
      </div>
    </a>
  );
}

export default function FooterSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "bintangqurne07@gmail.com";
  const phone = "085850901520";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-30 w-full bg-[#FF2A2A] text-black font-figtree overflow-hidden select-none">
      
      {/* ══ GIANT NAME HEADLINE ("Bintang Qurne") — plain fluid text, no SVG/foreignObject clipping issues ══ */}
      <div className="w-full py-2 overflow-hidden flex justify-center items-center">
        <p
          className="font-fragment font-black uppercase text-black text-center whitespace-nowrap select-none w-full"
          style={{
            fontSize: "clamp(56px, 13.5vw, 480px)",
            letterSpacing: "-0.08em",
            lineHeight: "0.85em",
            margin: 0,
          }}
        >
          Bintang Qurne
        </p>
      </div>

      {/* ══ MIDDLE CONTENT GRID ══ */}
      <div className="border-t-2 border-b-2 border-black my-1 py-3 sm:py-4 w-full" data-framer-name="Content">
        <div className="grid w-full grid-cols-2 items-stretch gap-x-5 gap-y-8 px-6 font-mono text-xs sm:px-12 sm:text-sm md:grid-cols-12 lg:gap-12 lg:px-16">
          
          {/* Col 1: Phone & Email (Left side) */}
          <div className="col-span-2 flex h-full flex-col justify-start space-y-4 border-l-[7px] border-black pl-3 md:col-span-5 md:border-l-[8px] lg:pl-3" data-framer-name="Phone & Email">
            <div>
              <button
                onClick={handleCopyPhone}
                className="block text-lg sm:text-2xl lg:text-3xl font-bold font-figtree tracking-tight text-black hover:opacity-80 transition-opacity text-left whitespace-nowrap"
              >
                {copiedPhone ? "Phone copied!" : phone}
              </button>
            </div>
            <div>
              <button
                onClick={handleCopyEmail}
                className="block text-lg sm:text-2xl lg:text-3xl font-bold font-figtree tracking-tight text-black hover:opacity-80 transition-opacity text-left break-all lg:break-normal"
              >
                {copiedEmail ? "Email copied!" : email}
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Menu (Pushed Right with Text Roll Effect) */}
          <div className="col-span-1 flex h-full flex-col justify-start space-y-0.5 border-l-[7px] border-black pl-3 md:col-span-4 md:border-l-[8px] lg:pl-4" data-framer-name="Menu">
            <RollLink href="/">HOME</RollLink>
            <RollLink href="/work">WORK</RollLink>
            <RollLink href="/#about-me">ABOUT</RollLink>
            <RollLink href="/contact">CONTACT</RollLink>
          </div>

          {/* Col 3: Social Channels (Pushed Far Right, Text Roll Effect, NO left divider) */}
          <div className="col-span-1 flex h-full flex-col justify-start space-y-0.5 pl-1 md:col-span-3 md:pl-4 lg:pl-8" data-framer-name="Social">
            <RollLink href="https://github.com/bintangqurne" external>GITHUB</RollLink>
            <RollLink href="https://youtube.com/@bintangqurne" external>YOUTUBE</RollLink>
            <RollLink href="https://instagram.com/bintangqurne" external>INSTAGRAM</RollLink>
            <RollLink href="https://www.linkedin.com/in/ayatullah-bintang-qurne-19a0992ba/" external>LINKEDIN</RollLink>
          </div>

        </div>
      </div>

      {/* ══ GIANT TEXT "BINTANG" — plain fluid text, no SVG/foreignObject clipping issues ══ */}
      <div className="w-full py-2 overflow-hidden flex justify-center items-center">
        <p
          className="font-fragment font-black uppercase text-black text-center whitespace-nowrap select-none w-full"
          style={{
            fontSize: "clamp(95px, 25.5vw, 900px)",
            letterSpacing: "-0.09em",
            lineHeight: "0.8em",
            margin: 0,
            transform: "translateX(-1.5%)",
          }}
        >
          BINTANG
        </p>
      </div>

      {/* ══ BOTTOM COPYRIGHT BAR (VERY COMPACT VERTICAL SPACING) ══ */}
      <div className="relative grid grid-cols-1 items-center gap-2 border-t border-black px-6 py-3 pr-16 font-mono text-[10px] font-semibold uppercase text-black/90 sm:grid-cols-3 sm:px-12 sm:py-2 sm:pr-12 sm:text-[12px] lg:px-16">
        {/* Left: Copyright Notice */}
        <div className="justify-self-start text-left">
          © 2026 BINTANG QURNE. ALL RIGHTS RESERVED.
        </div>

        {/* Custom Credit / Status */}
        <div className="flex items-center justify-self-start gap-2 text-left sm:col-start-3 sm:row-start-1 sm:justify-self-end sm:text-right">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>DESIGNED & DEVELOPED BY BINTANG</span>
        </div>

        {/* Scroll to top button — anchored at the footer's bottom-right on mobile. */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-2 right-5 cursor-pointer p-2 text-2xl font-bold text-black transition-colors duration-200 hover:text-white sm:static sm:col-start-2 sm:row-start-1 sm:justify-self-center sm:text-3xl"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>

    </footer>
  );
}
