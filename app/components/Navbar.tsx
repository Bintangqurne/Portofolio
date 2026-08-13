"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const navLinks = [
    { label: "WORK", href: "./work" },
    { label: "ABOUT", href: "./#about-me" },
    { label: "THOUGHTS", href: "./thoughts" },
    { label: "CONTACT", href: "./contact" },
  ];

  const ease = [0.25, 1, 0.5, 1] as const;

  return (
    <motion.header
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.2 }}
      className="fixed top-0 z-[100] w-full bg-transparent pointer-events-none mix-blend-difference"
    >
      <div className="w-full flex items-center justify-between px-4 sm:px-8 py-4 pointer-events-auto">
        {/* Logo Lockup */}
        <Link
          href="/"
          className="inline-block transition-all duration-300 ease-out hover:scale-105 hover:opacity-90 origin-left"
        >
          <div className="relative w-[180px] h-[45px] flex items-center justify-center">
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
        <nav className="flex items-center gap-6 sm:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative block overflow-hidden h-[24px] font-figtree font-bold text-base sm:text-lg tracking-wide text-white"
            >
              <div className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                <span className="h-[24px] flex items-center text-white transition-colors">
                  {link.label}
                </span>
                <span className="h-[24px] flex items-center text-white/70">
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
