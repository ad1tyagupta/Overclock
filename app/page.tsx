import Navbar from "../components/Navbar";
import UnifiedSection from "../components/sections/UnifiedSection";
import AIInfluencerSection from "../components/sections/AIInfluencerSection";
import AIProductSection from "../components/sections/AIProductSection";
import AIVideoSection from "../components/sections/AIVideoSection";
import AboutMeSection from "../components/sections/AboutMeSection";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 w-full text-center z-[60] pt-2 pointer-events-none">
        <span className="text-orange-500 text-[10px] tracking-widest uppercase opacity-80 font-medium">
          Fictional product. Real marketing + AI portfolio by Aditya Gupta
        </span>
      </div>
      <Navbar />
      <main className="bg-black">
        <UnifiedSection />
        <AIInfluencerSection />
        <AIProductSection />
        <AIVideoSection />
        <AboutMeSection />
      </main>
    </>
  );
}

