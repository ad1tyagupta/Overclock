'use client';

import React from 'react';

export default function Navbar() {
    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent backdrop-blur-sm transition-all duration-300">



        </nav>
    );
}
