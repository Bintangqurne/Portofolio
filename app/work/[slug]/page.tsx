import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FooterSection from "../../components/FooterSection";
import Navbar from "../../components/Navbar";
import { caseStudies, getCaseStudy } from "../caseStudies";
import WorkPageTransition from "../WorkPageTransition";
import ProjectCaseStudy from "./ProjectCaseStudy";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Bintang Qurne`,
    description: project.summary,
  };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#f2f1ed] font-figtree">
      <WorkPageTransition />
      <Navbar />
      <ProjectCaseStudy project={project} />
      <FooterSection />
    </div>
  );
}
