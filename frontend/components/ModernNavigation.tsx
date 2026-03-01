'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import {
  BarChart3,
  Users,
  Calendar,
  GitBranch,
  Zap,
  Brain,
  Menu,
  X,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import React, { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/ranking', label: 'Resume Ranking', icon: Users },
  { href: '/leave', label: 'Leave Manager', icon: Calendar },
  { href: '/pipeline', label: 'Pipeline', icon: GitBranch },
  { href: '/scheduling', label: 'Scheduler', icon: Sparkles },
  { href: '/autonomous', label: 'Autonomous', icon: Brain },
  { href: '/guide', label: 'How To Use', icon: BookOpen },
];

export const ModernNavigation = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="hidden md:flex fixed left-0 top-0 h-screen w-[260px] flex-col z-40"
        style={{
          background: 'rgba(11, 15, 25, 0.85)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Logo */}
        <div className="px-6 py-8">
          <Link href="/dashboard" className="flex items-center gap-3 no-underline">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">HR Agent</h1>
              <p className="text-[10px] text-white/30 font-medium tracking-wider uppercase">AI HR Platform</p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link href={item.href} className="no-underline">
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      'relative px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-200 group',
                      isActive
                        ? 'text-white'
                        : 'text-white/40 hover:text-white/70'
                    )}
                  >
                    {/* Active Background */}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveBackground"
                        className="absolute inset-0 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                          backgroundColor: 'rgba(168, 85, 247, 0.08)',
                          border: '1px solid rgba(168, 85, 247, 0.2)',
                        }}
                      />
                    )}

                    <Icon className="w-[18px] h-[18px] relative z-10" />
                    <span className="text-sm relative z-10">{item.label}</span>

                    {/* Active Glow Dot */}
                    {isActive && (
                      <motion.div
                        layoutId="navActiveDot"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent-purple shadow-glow-sm"
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-5 py-5"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
              <span className="text-xs font-bold text-white/60">AI</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/50 truncate">v2.0 • Production</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 p-2.5 rounded-xl z-50"
        style={{
          background: 'rgba(11, 15, 25, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[260px] z-50 flex flex-col"
              style={{
                background: 'rgba(11, 15, 25, 0.95)',
                backdropFilter: 'blur(40px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div className="px-6 py-20 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="no-underline"
                    >
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                          'px-4 py-3 rounded-xl font-medium flex items-center gap-3 transition-all',
                          isActive
                            ? 'bg-accent-purple/10 text-white border border-accent-purple/20'
                            : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
