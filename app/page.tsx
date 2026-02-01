import Navbar from "../components/Navbar";
import UnifiedSection from "../components/sections/UnifiedSection";
import AIInfluencerSection from "../components/sections/AIInfluencerSection";
import AIVideoSection from "../components/sections/AIVideoSection";
import AboutMeSection from "../components/sections/AboutMeSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <UnifiedSection />
        <AIInfluencerSection />
        <AIVideoSection />
        <AboutMeSection />
      </main>
    </>
  );
}

