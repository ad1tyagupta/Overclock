'use client';

import React from 'react';
import { motion } from 'framer-motion';

const products = [
    {
        id: 1,
        src: '/images/ai-product/1.png',
        alt: 'AI Product Variant 1',
        flavor: 'Original'
    },
    {
        id: 2,
        src: '/images/ai-product/2.png',
        alt: 'AI Product Variant 2',
        flavor: 'Berry Blast'
    },
    {
        id: 3,
        src: '/images/ai-product/3.png',
        alt: 'AI Product Variant 3',
        flavor: 'Citrus Zest'
    }
];

export default function AIProductSection() {
    return (
        <section className="bg-neutral-900 py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-orange-500 font-medium tracking-wide uppercase mb-4">
                        Commercial Imagery
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Product Reimagined
                    </h3>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Generative AI enabling rapid iteration of product visuals in various contexts and styles.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={product.src}
                                alt={product.alt}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
