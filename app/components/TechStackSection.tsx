"use client";

import React from "react";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
}

export default function TechStackSection() {
  const logos = [
    {
      name: "Next.js",
      category: "Frontend & SSR",
      svg: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="90" fill="currentColor" fillOpacity="0.1" />
          <path d="M149.508 157.52L69.141 54H54V126H67.5V69.957L138.832 161.425C142.607 160.297 146.182 158.986 149.508 157.52Z" fill="currentColor"/>
          <path d="M115.5 54H129V126H115.5V54Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "TypeScript",
      category: "Language",
      svg: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M1.125 0C.507 0 0 .507 0 1.125v21.75C0 23.493.507 24 1.125 24h21.75c.618 0 1.125-.507 1.125-1.125V1.125C24 .507 23.493 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.767-.26 4.956 4.956 0 0 0-.84-.141 5.9 5.9 0 0 0-.853-.056c-.52 0-.918.087-1.196.26-.277.174-.416.442-.416.804 0 .223.054.41.163.56.108.15.267.28.477.389.21.11.468.21.774.301.306.09.654.188 1.044.293.473.125.922.278 1.348.458.425.18.79.405 1.094.676.304.271.539.596.705.975.166.379.249.837.249 1.374 0 .654-.127 1.229-.381 1.725a3.958 3.958 0 0 1-1.077 1.304 5.753 5.753 0 0 1-1.688.857c-.676.205-1.442.308-2.298.308-.75 0-1.46-.067-2.13-.201a8.942 8.942 0 0 1-1.895-.623v-2.637c.725.438 1.444.757 2.158.957.714.2 1.411.3 2.091.3.52 0 .934-.085 1.242-.256.308-.171.462-.437.462-.797 0-.256-.062-.468-.186-.636a2.03 2.03 0 0 0-.505-.443 5.034 5.034 0 0 0-.814-.336c-.328-.106-.694-.218-1.099-.336-.487-.142-.947-.306-1.378-.492a3.86 3.86 0 0 1-1.095-.733c-.302-.3-.532-.656-.69-1.069-.158-.413-.237-.899-.237-1.458 0-.64.133-1.206.398-1.698.266-.492.645-.9 1.137-1.224a5.534 5.534 0 0 1 1.761-.758c.683-.178 1.45-.267 2.301-.267zm-8.814.152h3.293v1.895H11.53v10.155H8.784V11.797H5.974V9.902z"/>
        </svg>
      )
    },
    {
      name: "Python / AI",
      category: "ML & Data",
      svg: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M11.914 0C5.82 0 6.22 2.657 6.22 2.657L6.234 5.4H12.1v.834H3.882S0 5.776 0 11.904c0 6.13 3.398 5.922 3.398 5.922h2.029v-2.863s-.109-3.41 3.398-3.41h5.81s3.262.054 3.262-3.153V3.153S18.397 0 11.914 0zm-3.08 1.84c.57 0 1.034.463 1.034 1.034 0 .571-.464 1.035-1.035 1.035-.57 0-1.034-.464-1.034-1.035 0-.57.464-1.034 1.035-1.034zm3.252 6.76c5.992 0 5.688-2.657 5.688-2.657v-2.738H12.01v-.834h8.108S24 2.824 24 8.952c0 6.129-3.398 5.922-3.398 5.922h-2.029v2.863s.109 3.41-3.398 3.41h-5.81s-3.262-.054-3.262 3.153v5.405S5.603 24 12.086 24c6.094 0 5.69-2.657 5.69-2.657L17.762 18.6H11.9v-.834h8.217S24 18.224 24 12.096c0-6.13-3.398-5.922-3.398-5.922h-2.029V3.311s.109-3.41-3.398-3.41h-5.81s-3.262.054-3.262 3.153v5.405zm3.08 13.56c-.57 0-1.034-.464-1.034-1.034 0-.571.464-1.035 1.035-1.035.57 0 1.034.464 1.034 1.035 0 .57-.464 1.034-1.035 1.034z"/>
        </svg>
      )
    },
    {
      name: "AWS Cloud",
      category: "Infrastructure",
      svg: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M6.763 10.036c0-.237.192-.43.428-.43h1.834c.237 0 .43.193.43.43v5.334c.321-.497 1.066-1.121 2.217-1.121 2.062 0 3.328 1.499 3.328 3.652 0 2.298-1.42 3.676-3.376 3.676-1.196 0-1.921-.611-2.17-1.066v.816c0 .237-.193.43-.43.43H7.191a.43.43 0 01-.428-.43V10.036zm2.69 5.864c0 1.157.65 1.837 1.554 1.837.94 0 1.554-.693 1.554-1.837 0-1.131-.62-1.837-1.554-1.837-.927 0-1.554.706-1.554 1.837zM0 10.036c0-.237.193-.43.43-.43h1.834c.236 0 .429.193.429.43v8.948a.43.43 0 01-.43.43H.43a.43.43 0 01-.43-.43V10.036zm17.585 0c0-.237.192-.43.429-.43h1.833c.237 0 .43.193.43.43v8.948a.43.43 0 01-.43.43h-1.833a.43.43 0 01-.429-.43V10.036z"/>
        </svg>
      )
    },
    {
      name: "Firebase",
      category: "IoT & Realtime DB",
      svg: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M3.89 15.672L6.1 1.705a.72.72 0 011.312-.266l2.457 4.672-9.979 9.561zm16.593 1.564l-2.096-12.87a.72.72 0 00-1.258-.33l-13.486 13.2 7.744 4.36a1.92 1.92 0 001.81 0l7.286-4.36zM14.07 8.358l-2.072-3.957a.72.72 0 00-1.272 0L8.79 8.082l5.28 .276z"/>
        </svg>
      )
    },
    {
      name: "Docker",
      category: "DevOps & Containers",
      svg: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-2.257h2.118a.185.185 0 00.186-.186V6.748a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm0 2.257h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.257h2.118a.185.185 0 00.186-.186V6.748a.185.185 0 00-.186-.185H8.075a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm-2.954 0h2.118a.185.185 0 00.186-.186V6.748a.185.185 0 00-.186-.185H5.121a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm0 2.257h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186H5.121a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.118a.185.185 0 00.186-.185V9.006a.185.185 0 00-.186-.186H2.167a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM.07 12.874c.063.393.424 1.157 1.096 1.83 1.066 1.066 2.628 1.637 4.673 1.637 4.148 0 7.371-2.222 9.079-6.26.438.016.944-.067 1.344-.237 1.127-.478 1.956-1.579 2.235-2.981.049-.247-.078-.492-.317-.565-.238-.073-.487.051-.55.295-.213 1.07-.84 1.904-1.688 2.264-.477.202-1.067.247-1.686.13a.476.476 0 00-.518.293c-1.391 3.593-4.225 5.589-7.904 5.589-1.802 0-3.153-.497-4.043-1.387-.514-.514-.803-1.074-.881-1.393a.476.476 0 00-.465-.366H.538a.476.476 0 00-.468.516z"/>
        </svg>
      )
    }
  ];

  // Horizontal Tech List dengan efek hover yang dinamis (bg lime green #81ff28 + text black)
  const stackItems: TechItem[] = [
    {
      name: "NEXT.JS 15",
      category: "FRONTEND FRAMEWORK",
      description: "App Router, SSR, Server Actions & React Server Components",
      icon: (
        <span className="text-[10px] font-mono border border-current px-1.5 py-0.5 tracking-tighter">
          SSR/FE
        </span>
      )
    },
    {
      name: "REACT & TAILWIND",
      category: "UI ENGINE & DESIGN SYSTEM",
      description: "Modern Component Architecture, Framer Motion & Responsive Layouts",
      icon: (
        <span className="text-[10px] font-mono border border-current px-1.5 py-0.5 tracking-tighter">
          UI/UX
        </span>
      )
    },
    {
      name: "PYTHON & AI / ML",
      category: "PREDICTIVE ANALYTICS",
      description: "Feature Models, Toxicity Prediction (Tox21) & Credit Scoring",
      icon: (
        <span className="text-[10px] font-mono border border-current px-1.5 py-0.5 tracking-tighter">
          AI/ML
        </span>
      )
    },
    {
      name: "AWS SERVERLESS",
      category: "CLOUD ARCHITECTURE",
      description: "Full AWS Ecosystem, Lambda, S3, CloudFront & Scalable Backend",
      icon: (
        <span className="text-[10px] font-mono border border-current px-1.5 py-0.5 tracking-tighter">
          CLOUD
        </span>
      )
    },
    {
      name: "FIREBASE & IOT",
      category: "REALTIME & HARDWARE INTEGRATION",
      description: "Realtime Database, Sensor Sync, Admin Control & Task Storage",
      icon: (
        <span className="text-[10px] font-mono border border-current px-1.5 py-0.5 tracking-tighter">
          IOT
        </span>
      )
    },
    {
      name: "SYSTEM ARCHITECTURE",
      category: "ENGINEERING & OPTIMIZATION",
      description: "Backend Rate Limiting, API Security, Performance & Scalability",
      icon: (
        <span className="text-[10px] font-mono border border-current px-1.5 py-0.5 tracking-tighter">
          ARCH
        </span>
      )
    }
  ];

  return (
    <section className="w-full bg-[#0a0a0a] text-white font-figtree py-24 sm:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16 sm:space-y-24">
        
        {/* ══ HEADER SECTION ══ */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#81ff28]" />
            <span className="font-fragment text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#81ff28]">
              ENGINEERING &amp; CAPABILITIES
            </span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#d9d9d9]">
            TECH STACK
          </h2>

          <p className="font-fragment text-neutral-400 text-sm sm:text-base max-w-3xl uppercase tracking-wider leading-relaxed pt-2">
            TRANSFORMING COMPLEX SYSTEM LOGIC INTO RESILIENT DIGITAL EXPERIENCES ACROSS MODERN FRONTEND FRAMEWORKS, AWS CLOUD INFRASTRUCTURE, IOT INTEGRATIONS, AND PREDICTIVE AI MODELS.
          </p>
        </div>

        {/* ══ LOGO ROW GRID ══ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 border-y border-white/10 py-8 sm:py-12">
          {logos.map((logo, idx) => (
            <motion.div
              key={logo.name + idx}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center justify-center p-6 bg-[#111215] border border-white/10 hover:border-[#81ff28]/50 transition-all duration-300 group space-y-3"
            >
              <div className="text-neutral-400 group-hover:text-[#81ff28] transition-colors duration-300">
                {logo.svg}
              </div>
              <span className="font-figtree font-bold text-xs uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                {logo.name}
              </span>
              <span className="font-fragment text-[9px] uppercase tracking-widest text-neutral-500 group-hover:text-[#81ff28] transition-colors">
                {logo.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ══ HORIZONTAL INTERACTIVE TECH STACK LIST ══ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-figtree font-bold text-lg sm:text-xl uppercase tracking-wider text-white flex items-center gap-3">
              <span>CORE STACK ARCHITECTURE</span>
              <span className="text-[#81ff28] text-xs font-mono font-normal">// 06 SPECIFICATIONS</span>
            </h3>
            <span className="font-fragment text-xs text-neutral-500 uppercase tracking-widest hidden sm:inline-block">
              HOVER TO INSPECT CAPABILITY ↘
            </span>
          </div>

          {/* Horizontal Grid / Row list with hover text & background color swap animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stackItems.map((item, index) => (
              <div
                key={item.name + index}
                className="group relative bg-[#0e0f12] border border-white/10 p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:bg-[#81ff28] hover:border-[#81ff28] overflow-hidden"
              >
                {/* Number Accent */}
                <div className="flex items-center justify-between font-mono text-xs text-neutral-500 group-hover:text-black/60 transition-colors duration-300 pb-4">
                  <span>0{index + 1}</span>
                  <div className="group-hover:text-black transition-colors">
                    {item.icon}
                  </div>
                </div>

                {/* Tech Title & Category */}
                <div className="space-y-2 pt-2">
                  <span className="block font-fragment text-[10px] font-bold text-[#81ff28] group-hover:text-black/80 uppercase tracking-widest transition-colors duration-300">
                    {item.category}
                  </span>
                  <h4 className="font-figtree font-black text-xl sm:text-2xl text-white group-hover:text-black uppercase tracking-tight transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="font-figtree font-medium text-xs sm:text-sm text-neutral-400 group-hover:text-black/90 leading-relaxed uppercase tracking-wide transition-colors duration-300 pt-2">
                    {item.description}
                  </p>
                </div>

                {/* Hover Arrow Indicator */}
                <div className="pt-6 flex justify-end">
                  <span className="text-neutral-500 group-hover:text-black font-bold text-sm transition-all duration-300 transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
