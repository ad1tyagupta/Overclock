import React from 'react';

export default function AboutMeSection() {
    return (
        <section className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 py-24 text-center z-20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    Behind the Project
                </h2>
                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                    I built Overclock as a fictional product to create something more convincing than a typical portfolio.
                    Most portfolios are just a digital version of a résumé, I wanted to demonstrate real marketing thinking and real AI execution.
                    So I built everything end-to-end: the product concept, color and packaging direction, product photography, video creatives, and the website itself.
                    I’ll keep adding more work here over time, AI ad concepts, AI influencer examples, and other experiments.
                </p>

                <div className="pt-8">
                    <p className="text-neutral-500 text-sm md:text-base mb-4">
                        This site and all its components were built entirely from scratch by Aditya Gupta
                    </p>
                    <a
                        href="https://www.linkedin.com/in/aditya-gupta-/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors duration-300 text-lg font-medium group"
                    >
                        My LinkedIn
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
