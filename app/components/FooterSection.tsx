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

  const email = "bintangqurne@gmail.com";
  const phone = "+62 812-3456-7890";

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
        <div className="w-full px-6 sm:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-stretch font-mono text-xs sm:text-sm">
          
          {/* Col 1: Phone & Email (Left side) */}
          <div className="h-full md:col-span-5 md:border-l-[8px] border-black pl-2 md:pl-3 lg:pl-3 space-y-4 flex flex-col justify-start" data-framer-name="Phone & Email">
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
          <div className="h-full md:col-span-4 md:border-l-[8px] border-black pl-2 md:pl-3 lg:pl-4 space-y-0.5 flex flex-col justify-start" data-framer-name="Menu">
            <RollLink href="#hero">HOME</RollLink>
            <RollLink href="#gallery">WORK</RollLink>
            <RollLink href="#intro">ABOUT</RollLink>
            <RollLink href="#tech-stack">THOUGHTS</RollLink>
            <RollLink href="#experience">CONTACT</RollLink>
          </div>

          {/* Col 3: Social Channels (Pushed Far Right, Text Roll Effect, NO left divider) */}
          <div className="h-full md:col-span-3 space-y-0.5 flex flex-col justify-start md:pl-4 lg:pl-8" data-framer-name="Social">
            <RollLink href="https://github.com" external>GITHUB</RollLink>
            <RollLink href="https://youtube.com" external>YOUTUBE</RollLink>
            <RollLink href="https://instagram.com" external>INSTAGRAM</RollLink>
            <RollLink href="https://linkedin.com" external>LINKEDIN</RollLink>
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

      {/* ══ BOTTOM COPYRIGHT BAR (3-COLUMN CENTERED GRID) ══ */}
      <div className="border-t border-black py-4 px-6 sm:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 font-mono text-[12px] uppercase text-black/90 font-semibold">
        {/* Left: Copyright Notice */}
        <div className="justify-self-center sm:justify-self-start text-center sm:text-left">
          © 2026 BINTANG QURNE. ALL RIGHTS RESERVED.
        </div>

        {/* Center: Scroll to top button */}
        <div className="justify-self-center flex justify-center">
          <button
            onClick={scrollToTop}
            className="text-xl sm:text-2xl font-bold text-black hover:text-white transition-colors duration-200 cursor-pointer p-2 select-none"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        </div>

        {/* Right: Custom Credit / Status */}
        <div className="justify-self-center sm:justify-self-end text-center sm:text-right flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>DESIGNED & DEVELOPED BY BINTANG</span>
        </div>
      </div>

    </footer>
  );
}