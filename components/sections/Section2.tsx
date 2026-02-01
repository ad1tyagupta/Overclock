'use client';

import React from 'react';
import ScrollSequenceBackground from '../sequence/ScrollSequenceBackground';

export default function Section2() {
    const TOTAL_FRAMES = 192;
    const FOLDER = '/assets/sequence2';

    return (
        <section id="camera" className="relative h-screen overflow-hidden bg-black">
            <ScrollSequenceBackground totalFrames={TOTAL_FRAMES} folder={FOLDER} />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Camera System
                    </h2>
                    <p className="text-xl text-neutral-300 max-w-lg mx-auto">
                        Pro-grade lenses. Cinema-quality capture.
                    </p>
                </div>
            </div>
        </section>
    );
}
