'use client';

import React from 'react';
import ScrollSequenceBackground from '../sequence/ScrollSequenceBackground';

export default function HomeSection() {
    // Total frames 192 as discovered
    const TOTAL_FRAMES = 192;
    const FOLDER = '/assets/sequence1';

    return (
        <section id="home" className="relative h-screen overflow-hidden bg-black">
            {/* 
        Note: The prompt says "Progress starts when the Home section top hits the top of viewport"
        and "Progress ends when the Home section bottom hits the top of viewport".
        If the section is h-screen, it scrolls out of view immediately as you scroll down.
        Usually for a scroll sequence, we pin the section or make it tall.
        The prompts says: "The Home section controls the sequence while it is in view."
        "Progress ends when ... (i.e., user has scrolled one full section height)."
        
        If I make it `h-screen`, the moment it leaves the view, it's done. 
        But if it's normal scroll (non-sticky), it just scrolls up.
        The prompt implies a standard scroll flow where the background animates AS it scrolls up out of view.
        
        Wait, "Sticky transparent navbar... Full-viewport Home hero...".
        Usually parallax means the background stays fixed? 
        The prompt says "Background = scroll-driven... behind everything".
        It doesn't explicitly say "fixed position". It says "absolute inset-0" in the constraints.
        If it's absolute inset-0 in a scrolling section, it moves WITH the section.
        But parallax usually implies relative movement.
        However, the prompt says "Maps scroll progress to frame index".
        If the section scrolls up, the background scrolls up with it?
        Usually "parallax product landing page" implies the background is fixed.
        
        Let's assume `Sticky` behavior for the background or Fixed?
        "Background fills section (absolute inset-0)."
        If I want it to be fixed *visually* while the section scrolls, I should use `fixed inset-0` or `sticky`.
        BUT, the prompt specifically asked for "Home hero layout... <section ... className='relative h-screen ...'> ... Background fills section (absolute inset-0)".
        This implies the background is inside the section.
        If the section scrolls away, the background goes with it.
        But the ANIMATION plays as you scroll.
        So as you scroll down (and the hero moves up), the frames update.
        This creates a dynamic effect even if it's not "sticky pinned".
        I will stick to the prompts instructions: "absolute inset-0".
        
        Wait, "h-screen" means 100vh.
        If I scroll 1px, the top is at -1px.
        Structure:
        <HomeSection> (h-screen)
          <Background> (absolute)
          <Content> (centered)
        </HomeSection>
        <NextSection>
        
        This works.
      */}

            <ScrollSequenceBackground totalFrames={TOTAL_FRAMES} folder={FOLDER} />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
                {/* Top 1/3 Center: iPhone 17 */}
                <div className="absolute top-[20%]" style={{ /* approx top 1/3 */ }}>
                    <h2 className="text-orange-500 font-medium text-xl md:text-2xl tracking-wide uppercase">
                        Overclock
                    </h2>
                </div>

                {/* Center: PRO */}
                <div className="absolute top-1/2 transform -translate-y-1/2">
                    <h1 className="text-[12rem] md:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-700 leading-none tracking-tighter mix-blend-overlay opacity-90">
                        PRO
                    </h1>
                </div>

                {/* Bottom 1/3 Center: Buy Button */}
                <div className="absolute bottom-[20%] pointer-events-auto">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30">
                        Buy
                    </button>
                </div>
            </div>
        </section>
    );
}
