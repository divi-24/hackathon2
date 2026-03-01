'use client';

import React from 'react';

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Animated Grid */}
            <div className="absolute inset-0 animated-grid opacity-40" />

            {/* Floating Blobs */}
            <div
                className="blob animate-blob-1"
                style={{
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                    top: '-10%',
                    right: '-5%',
                }}
            />
            <div
                className="blob animate-blob-2"
                style={{
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
                    bottom: '-15%',
                    left: '-10%',
                }}
            />
            <div
                className="blob animate-blob-3"
                style={{
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                    top: '40%',
                    left: '50%',
                }}
            />

            {/* Particle Dots */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-float"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            background: 'rgba(168, 85, 247, 0.3)',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${Math.random() * 4 + 4}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
