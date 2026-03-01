'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  CheckCircle,
  TrendingUp,
  Zap,
  Calendar,
  ArrowRight,
  Activity,
  Shield,
  Brain,
} from 'lucide-react';
import {
  GlassCard,
  AnimatedCounter,
  GlowBadge,
  PageTransition,
  ShimmerLoader,
  GradientButton,
} from '@/components/ui';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_resumes: 0,
    ranked_today: 0,
    approved_leaves: 0,
    scheduled_interviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        total_resumes: 1200,
        ranked_today: 47,
        approved_leaves: 15,
        scheduled_interviews: 23,
      });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 pt-4">
        <div className="skeleton h-12 w-96 mb-4" />
        <div className="skeleton h-5 w-64 mb-8" />
        <ShimmerLoader count={4} variant="card" />
      </div>
    );
  }

  const kpiCards = [
    {
      label: 'Total Resumes',
      value: stats.total_resumes,
      icon: Users,
      change: '+12%',
      trend: 'up' as const,
      glow: 'purple' as const,
      gradient: 'from-accent-purple/20 to-accent-blue/5',
    },
    {
      label: 'Ranked Today',
      value: stats.ranked_today,
      icon: BarChart3,
      change: '+8%',
      trend: 'up' as const,
      glow: 'blue' as const,
      gradient: 'from-accent-blue/20 to-accent-cyan/5',
    },
    {
      label: 'Approved Leaves',
      value: stats.approved_leaves,
      icon: CheckCircle,
      change: '+3%',
      trend: 'up' as const,
      glow: 'green' as const,
      gradient: 'from-green-500/20 to-emerald-500/5',
    },
    {
      label: 'Interviews Scheduled',
      value: stats.scheduled_interviews,
      icon: Calendar,
      change: '+5%',
      trend: 'up' as const,
      glow: 'cyan' as const,
      gradient: 'from-accent-cyan/20 to-accent-blue/5',
    },
  ];

  const quickActions = [
    { title: 'Rank Resumes', desc: 'AI-powered resume matching', href: '/ranking', icon: Users },
    { title: 'Process Leave', desc: 'Automated leave decisions', href: '/leave', icon: Calendar },
    { title: 'Schedule Interview', desc: 'Smart slot allocation', href: '/scheduling', icon: Zap },
    { title: 'View Pipeline', desc: 'Candidate state tracking', href: '/pipeline', icon: TrendingUp },
  ];

  const recentActivity = [
    { action: 'Ranked 47 resumes for Senior Dev role', time: '2 hours ago', type: 'ranking' },
    { action: 'Approved 5 leave requests automatically', time: '4 hours ago', type: 'leave' },
    { action: 'Scheduled 8 candidate interviews', time: '6 hours ago', type: 'schedule' },
    { action: 'Pipeline: 3 candidates moved to offer stage', time: 'Yesterday', type: 'pipeline' },
    { action: 'Generated personalized interview questions', time: 'Yesterday', type: 'ai' },
  ];

  return (
    <PageTransition>
      <div className="space-y-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative pt-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
              <span className="gradient-text">Deterministic AI</span>
              <br />
              <span className="text-white/90">Governance for HR</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl leading-relaxed">
              Automated resume ranking, intelligent leave management, and predictive scheduling — all powered by explainable AI.
            </p>
          </motion.div>

          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-[400px] h-[300px] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <GlassCard
                key={kpi.label}
                glowColor={kpi.glow}
                delay={i * 0.1}
                className="group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${kpi.gradient}`}
                  >
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <GlowBadge variant="success" size="sm">
                    {kpi.change}
                  </GlowBadge>
                </div>
                <div className="space-y-1">
                  <AnimatedCounter
                    value={kpi.value}
                    className="text-3xl font-bold text-white"
                    duration={1500 + i * 200}
                  />
                  <p className="text-sm text-white/35 font-medium">{kpi.label}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <GlassCard delay={0.3} className="lg:col-span-2" padding="p-0">
            <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-purple/10">
                  <Zap className="w-4 h-4 text-accent-purple" />
                </div>
                <h3 className="text-base font-semibold text-white/90">Quick Actions</h3>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link key={i} href={action.href} className="no-underline">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      whileHover={{ y: -2, background: 'rgba(255,255,255,0.05)' }}
                      className="p-4 rounded-xl transition-all duration-200 cursor-pointer group"
                      style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent-purple/10 transition-colors">
                          <Icon className="w-4 h-4 text-white/50 group-hover:text-accent-purple transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-white/80 group-hover:text-white transition-colors">
                            {action.title}
                          </p>
                          <p className="text-xs text-white/30 mt-0.5">{action.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-all group-hover:translate-x-1" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </GlassCard>

          {/* System Status */}
          <GlassCard delay={0.4} padding="p-0">
            <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="text-base font-semibold text-white/90">System Status</h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {[
                { name: 'API Server', status: 'Operational', color: 'bg-green-400' },
                { name: 'ML Pipeline', status: 'Active', color: 'bg-green-400' },
                { name: 'Database', status: 'Connected', color: 'bg-green-400' },
                { name: 'AI Agents', status: 'Running', color: 'bg-accent-purple' },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${service.color} pulse-dot`} />
                    <span className="text-sm text-white/60 font-medium">{service.name}</span>
                  </div>
                  <span className="text-xs text-white/30">{service.status}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <GlassCard delay={0.5} padding="p-0">
          <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-blue/10">
                  <Activity className="w-4 h-4 text-accent-blue" />
                </div>
                <h3 className="text-base font-semibold text-white/90">Recent Activity</h3>
              </div>
              <GlowBadge variant="purple" pulse size="sm">Live</GlowBadge>
            </div>
          </div>
          <div className="p-4 space-y-1">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.06 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple/50" />
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                    {item.action}
                  </span>
                </div>
                <span className="text-xs text-white/20 font-medium whitespace-nowrap ml-4">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
