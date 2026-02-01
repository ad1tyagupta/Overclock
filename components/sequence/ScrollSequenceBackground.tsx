'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface ScrollSequenceBackgroundProps {
    totalFrames: number;
    folder: string;
    onFrameChange?: (frame: number) => void;
}

export default function ScrollSequenceBackground({
    totalFrames,
    folder,
    onFrameChange,
}: ScrollSequenceBackgroundProps) {
    const [loaded, setLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [activeSlot, setActiveSlot] = useState(0); // 0 or 1
    const [frameIndex, setFrameIndex] = useState(1);

    // We keep track of the current pair of images being displayed
    // Ideally, slot 0 and slot 1 hold the current and previous frame or just two buffers.
    // Strategy:
    // When frame changes to X:
    //   Identify which slot is currently "active" (visible).
    //   Update the OTHER slot (inactive) with the new frame URL.
    //   Fade OTHER in (opacity 1), fade ACTIVE out (opacity 0).
    //   Swap activeSlot reference.

    // However, simplified approach for React:
    // We can just render specific frames based on state.
    // But to crossfade, we need the "previous" frame to stay while "current" fades in?
    // User asked for "TWO stacked images crossfading (opacity 1->0 and 0->1)".
    // This implies we are constantly crossfading between two specific buffers.
    // If scrubbing fast, we might skip frames.
    // "Whenever the computed frame changes... Set inactive slot src... Swap activeSlot".

    const [slot0, setSlot0] = useState<number>(1);
    const [slot1, setSlot1] = useState<number>(1);
    const [opacity0, setOpacity0] = useState(1);
    // opacity1 is implicitly 1 - opacity0? Or controlled separately? 
    // User said "Set inactive opacity to 1 and active to 0".
    // Let's explicitly control opacities.
    const [opacity1, setOpacity1] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const frameUrl = (i: number) => {
        // Clamp i
        const safeI = Math.max(1, Math.min(i, totalFrames));
        return `${folder}/frame_${String(safeI).padStart(4, '0')}.webp`;
    };

    // Preload
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        const onLoad = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
            if (loadedCount === totalFrames) {
                setLoaded(true);
            }
        };

        // Start preloading
        for (let i = 1; i <= totalFrames; i++) {
            const img = new window.Image();
            img.src = frameUrl(i);
            img.onload = onLoad;
            img.onerror = onLoad; // Count errors as loaded to avoid blocking
            images.push(img);
        }

        return () => {
            // cleanup if needed (cancelling requests is hard)
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalFrames, folder]);

    // Scroll Logic
    useEffect(() => {
        if (!loaded) return;

        const handleScroll = () => {
            const section = containerRef.current?.parentElement?.parentElement; // The Unified Section (grandparent)
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Progress starts when Section top is at viewport top (0).
            // Progress ends when Section bottom is at viewport bottom (rect.height - viewportHeight).
            // Current scroll relative to section start:
            // When rect.top is 0, progress = 0.
            // When rect.top is -(rect.height - viewportHeight), progress = 1.

            const scrollDistance = rect.height - viewportHeight;
            let progress = -rect.top / scrollDistance;
            progress = Math.max(0, Math.min(1, progress));

            const newFrame = 1 + Math.floor(progress * (totalFrames - 1));

            setFrameIndex((prev) => {
                if (prev !== newFrame) {
                    return newFrame;
                }
                return prev;
            });
        };

        let rAF = 0;
        const onScroll = () => {
            cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll);
        onScroll(); // initial calc

        return () => window.removeEventListener('scroll', onScroll);
    }, [loaded, totalFrames]);

    // Handle slot swapping when frameIndex changes
    useEffect(() => {
        if (onFrameChange) {
            onFrameChange(frameIndex);
        }

        if (activeSlot === 0) {
            // Currently slot 0 is active (opacity 1).
            // We want to show new frame. 
            // Put new frame in slot 1.
            setSlot1(frameIndex);
            // Fade slot 1 IN, slot 0 OUT.
            setOpacity1(1);
            setOpacity0(0);
            setActiveSlot(1);
        } else {
            // Slot 1 is active.
            setSlot0(frameIndex);
            setOpacity0(1);
            setOpacity1(0);
            setActiveSlot(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameIndex]);
    // Note: changing frameIndex triggers this. activeSlot flips. 
    // This results in valid swap.

    // Scroll Lock during loading
    useEffect(() => {
        if (!loaded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [loaded]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
            {/* Loading Overlay */}
            {!loaded && (
                <div className="absolute inset-0 z-50 h-full w-full flex flex-col items-center justify-center bg-black text-white">
                    <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-blue-500 transition-all duration-100 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <p className="font-mono text-sm">{loadProgress}% Loading Frames...</p>
                </div>
            )}

            {/* Slots */}
            {/* We use unoptimized to match the preloaded raw URLs */}
            <div
                className="absolute inset-0 h-full w-full transition-opacity duration-200 ease-linear"
                style={{ opacity: opacity0 }}
            >
                <Image
                    src={frameUrl(slot0)}
                    alt="background"
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                />
            </div>
            <div
                className="absolute inset-0 h-full w-full transition-opacity duration-200 ease-linear"
                style={{ opacity: opacity1 }}
            >
                <Image
                    src={frameUrl(slot1)}
                    alt="background"
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
}
