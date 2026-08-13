import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import ImageGallerySection from "./components/ImageGallerySection";
import TechStackSection from "./components/TechStackSection";
import ExperienceSection from "./components/ExperienceSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex flex-col font-figtree selection:bg-white selection:text-black">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <ImageGallerySection />
      {/* Card-stacking: TechStack (sticky base) → Experience slides up over it → Footer slides over Experience */}
      <div className="relative">
        {/* Slot 1: TechStack — sticky, stays pinned while Experience scrolls over */}
        <div className="sticky top-0 z-10">
          <TechStackSection />
        </div>
        {/* Slot 2: Experience — relative, natural scroll slides it up over TechStack */}
        <div className="relative z-20">
          <ExperienceSection />
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
