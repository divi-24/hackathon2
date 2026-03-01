'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface GlowBadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'danger' | 'warning' | 'info' | 'purple';
    pulse?: boolean;
    className?: string;
    size?: 'sm' | 'md';
}

export const GlowBadge = ({
    children,
    variant = 'info',
    pulse = false,
    className,
    size = 'md',
}: GlowBadgeProps) => {
    const variantClass = `glow-badge-${variant}`;
    const sizeClass = size === 'sm' ? 'text-[10px] px-2.5 py-0.5' : '';

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx('glow-badge', variantClass, sizeClass, className)}
        >
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span
                        className={clsx(
                            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                            variant === 'success' && 'bg-green-400',
                            variant === 'danger' && 'bg-red-400',
                            variant === 'warning' && 'bg-amber-400',
                            variant === 'info' && 'bg-blue-400',
                            variant === 'purple' && 'bg-purple-400'
                        )}
                    />
                    <span
                        className={clsx(
                            'relative inline-flex rounded-full h-2 w-2',
                            variant === 'success' && 'bg-green-400',
                            variant === 'danger' && 'bg-red-400',
                            variant === 'warning' && 'bg-amber-400',
                            variant === 'info' && 'bg-blue-400',
                            variant === 'purple' && 'bg-purple-400'
                        )}
                    />
                </span>
            )}
            {children}
        </motion.span>
    );
};
