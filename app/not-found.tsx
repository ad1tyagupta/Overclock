'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 tracking-tighter mb-4 animate-pulse">
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-neutral-400 uppercase tracking-widest">
                System Malfunction
            </h2>
            <p className="text-neutral-500 max-w-md text-center mb-12">
                The page you are looking for has been disconnected from the simulation.
            </p>

            <Link
                href="/"
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded transition-transform hover:scale-105 hover:bg-orange-500 hover:text-white"
            >
                Reboot System
            </Link>
        </div>
    );
}
