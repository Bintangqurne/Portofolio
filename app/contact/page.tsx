import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import ContactHero from "./ContactHero";
import ContactPageTransition from "./ContactPageTransition";

export const metadata: Metadata = {
  title: "Contact — Bintang Qurne",
  description:
    "Start a conversation with Bintang Qurne about software, systems, and creative collaborations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] font-figtree text-white selection:bg-[#ff2a2a] selection:text-black">
      <ContactPageTransition />
      <Navbar />
      <ContactHero />
      <FooterSection />
    </main>
  );
}
