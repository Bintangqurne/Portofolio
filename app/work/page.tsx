"use client";

import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import ProjectArchiveSection from "./ProjectArchiveSection";
import WorkHero from "./WorkHero";
import WorkPageTransition from "./WorkPageTransition";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-between font-figtree selection:bg-black selection:text-white">
      <WorkPageTransition />
      <Navbar />

      <WorkHero />

      {/* ══ EDITORIAL PROJECT ARCHIVE ══ */}
      <ProjectArchiveSection />

      {/* ══ FOOTER SECTION ══ */}
      <FooterSection />
    </main>
  );
}
