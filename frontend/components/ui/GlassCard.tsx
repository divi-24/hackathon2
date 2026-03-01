'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
    animated?: boolean;
    glowColor?: 'purple' | 'blue' | 'cyan' | 'green' | 'none';
    delay?: number;
    padding?: string;
}

export const GlassCard = ({
    children,
    className,
    hoverable = true,
    animated = true,
    glowColor = 'none',
    delay = 0,
    padding = 'p-6',
}: GlassCardProps) => {
    const glowStyles = {
        purple: 'hover:shadow-glow-sm hover:border-accent-purple/20',
        blue: 'hover:shadow-glow-blue hover:border-accent-blue/20',
        cyan: 'hover:shadow-glow-cyan hover:border-accent-cyan/20',
        green: 'hover:shadow-glow-green hover:border-green-500/20',
        none: '',
    };

    return (
        <motion.div
            initial={animated ? { opacity: 0, y: 20 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
            className={clsx(
                'glass-card',
                padding,
                glowStyles[glowColor],
                className
            )}
        >
            {children}
        </motion.div>
    );
};
