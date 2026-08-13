import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import ImageGallerySection from "./components/ImageGallerySection";
import TechStackSection from "./components/TechStackSection";
import ExperienceSection from "./components/ExperienceSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex flex-col font-figtree selection:bg-white selection:text-black">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <ImageGallerySection />
      <TechStackSection />
      <ExperienceSection />
    </main>
  );
}
