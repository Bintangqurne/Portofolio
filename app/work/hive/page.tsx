import type { Metadata } from "next";
import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";
import HiveCaseStudy from "./HiveCaseStudy";
import WorkPageTransition from "../WorkPageTransition";

export const metadata: Metadata = {
  title: "Hive — Bintang Qurne",
  description:
    "A case study of Hive, a collaborative productivity workspace for schedules, tasks, meetings, files, and realtime team workflows.",
};

export default function HiveWorkPage() {
  return (
    <div className="min-h-screen bg-[#f2f1ed] font-figtree">
      <WorkPageTransition />
      <Navbar />
      <HiveCaseStudy />
      <FooterSection />
    </div>
  );
}
