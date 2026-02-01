'use client';

import React, { useState } from 'react';
import ScrollSequenceBackground from '../sequence/ScrollSequenceBackground';

export default function UnifiedSection() {
    const TOTAL_FRAMES = 576;
    const FOLDER = '/assets/merged_sequence';
    const [currentFrame, setCurrentFrame] = useState(1);

    // Thresholds
    // Total 384 frames.
    // Seq 1 (Hero): 0-192
    // Seq 2 (Rest): 193-384

    // Distribute frames roughly evenly for the last 4 sections (192 frames / 4 = 48 frames each)
    const showHero = currentFrame < 190;
    const showCamera = currentFrame >= 193 && currentFrame < 240;
    const showScreen = currentFrame >= 240 && currentFrame < 290;
    const showUsbc = currentFrame >= 290 && currentFrame < 340;
    const showCpu = currentFrame >= 340 && currentFrame < 385;
    const showSection3 = currentFrame >= 385;

    return (
        <section className="relative h-[900vh] bg-black">
            {/* Background Container - sticky so it stays in view while we scroll the tall section */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ top: 0 }}>
                <ScrollSequenceBackground
                    totalFrames={TOTAL_FRAMES}
                    folder={FOLDER}
                    onFrameChange={setCurrentFrame}
                />

                {/* Overlay Content Container */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none w-full h-full">

                    {/* Hero Content */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${showHero ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {/* Top 1/3: OVERCLOCK */}
                        <div className="absolute top-[20%]">
                            <h2 className="text-orange-500 font-medium text-4xl md:text-6xl tracking-wide uppercase">
                                OVERCLOCK
                            </h2>
                        </div>

                        {/* Center: ENERGY */}
                        <div className="absolute top-1/2 transform -translate-y-1/2">
                            <h1 className="text-[6rem] md:text-[9rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-700 leading-none tracking-tighter mix-blend-overlay opacity-90 text-center">
                                UNLOCK<br />ENERGY
                            </h1>
                        </div>

                    </div>

                    {/* Camera Content -> Ingredients */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${showCamera ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="text-center transform translate-y-10">
                            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl text-center px-4 leading-tight">
                                More than just sugar, it's optimism in a can
                            </h2>
                        </div>
                    </div>

                    {/* Screen Content -> Clarity */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${showScreen ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="text-center">
                            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl text-center px-4 leading-tight">
                                Make Excel fear you
                            </h2>
                        </div>
                    </div>

                    {/* USBC Content -> Power */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${showUsbc ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="text-center">
                            {/* Empty as requested */}
                        </div>
                    </div>

                    {/* CPU Content -> Performance */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${showCpu ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="text-center">
                            {/* Empty as requested */}
                        </div>
                    </div>

                    {/* Section 3 Content -> Additional Features */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${showSection3 ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="text-center leading-tight">
                            <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl text-center px-4 leading-tight">
                                Energy, with a sense of humor
                            </h2>
                            <p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto mt-8 font-mono">
                                *results may vary, deadlines won't
                            </p>
                        </div>
                    </div>

                    {/* Watermark Cover - Black Box - Adjusted to cover absolute corner and increased size */}
                    <div className="absolute bottom-0 right-0 w-48 h-12 bg-black z-50 pointer-events-none" />

                </div>
            </div>
        </section>
    );
}
