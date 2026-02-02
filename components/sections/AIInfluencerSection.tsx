'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const images = [
    { id: 1, src: '/images/ai-influencer/aditya-gupta-ai-influencer-casual.avif', alt: 'AI Influencer Casual' },
    { id: 2, src: '/images/ai-influencer/aditya-gupta-ai-influencer-urban.avif', alt: 'AI Influencer Urban' },
    { id: 3, src: '/images/ai-influencer/aditya-gupta-ai-influencer-professional.avif', alt: 'AI Influencer Professional' },
    { id: 4, src: '/images/ai-influencer/aditya-gupta-ai-influencer-futuristic.avif', alt: 'AI Influencer Futuristic' },
    { id: 5, src: '/images/ai-influencer/aditya-gupta-ai-influencer-artistic.avif', alt: 'AI Influencer Artistic' },
];

export default function AIInfluencerSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <section className="bg-neutral-900 py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-orange-500 font-medium tracking-wide uppercase mb-4">
                        Digital Persona
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Consistent Identity,<br /> Limitless Worlds
                    </h3>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Consistent on-brand persona for ads, user-generated style content, and storytelling, reusable across formats, scenes, and styles.
                    </p>
                </div>

                <div className="relative w-full max-w-5xl mx-auto h-[50vh] md:h-[500px] flex items-center justify-center">

                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full h-full rounded-2xl shadow-2xl overflow-hidden border border-white/10"
                        >
                            <Image
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 80vw"
                                className="object-cover pointer-events-none"
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 md:left-8 z-20 bg-black/50 hover:bg-orange-500/80 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group"
                        onClick={() => paginate(-1)}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        className="absolute right-4 md:right-8 z-20 bg-black/50 hover:bg-orange-500/80 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group"
                        onClick={() => paginate(1)}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const diff = index - currentIndex;
                                    setDirection(diff > 0 ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-orange-500 w-8'
                                    : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
