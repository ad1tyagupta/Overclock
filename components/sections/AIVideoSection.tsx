'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
    {
        id: 1,
        title: "The Ultimate Driving Machine",
        category: "Automotive Commercial",
        thumbnail: "/images/thumbnails/BMW.png",
        youtubeId: "-sjrAcayRQQ" // ID from https://youtu.be/-sjrAcayRQQ
    }
    // Future videos can be added here
];

export default function AIVideoSection() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <section className="bg-black py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black pointer-events-none" />

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-orange-500 font-medium tracking-wide uppercase mb-4">
                            Cinematography
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-bold text-white">
                            AI in Motion
                        </h3>
                    </div>
                    <p className="text-neutral-400 max-w-md text-lg leading-relaxed text-right md:text-left">
                        Blending generative visuals with storytelling to create compelling narratives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <motion.div
                            key={video.id}
                            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-neutral-900"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedVideo(video.youtubeId)}
                        >
                            {/* Thumbnail */}
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                                    <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                            </div>

                            {/* Text Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-orange-500 text-xs font-bold tracking-wider mb-1 uppercase">
                                    {video.category}
                                </p>
                                <h4 className="text-white font-bold text-xl">
                                    {video.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}

                    {/* Placeholder for "More Coming Soon" if needed, 
                        or just leave it empty for now as requested. */}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">

                            <button
                                className="absolute top-4 right-4 z-50 text-white hover:text-orange-500 transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVideo(null);
                                }}
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
