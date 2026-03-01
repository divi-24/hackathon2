'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, Sparkles, ChevronDown, ChevronUp, X, Eye } from 'lucide-react';
import {
  GlassCard,
  GradientButton,
  GlowBadge,
  PageTransition,
} from '@/components/ui';
import { AILoader } from '@/components/ui/ShimmerLoader';

interface Candidate {
  rank: number;
  candidate_id: string;
  name: string;
  score: number;
  normalized_score: number;
  reasoning: Record<string, string>;
  target_job: string;
}

export default function RankingPage() {
  const [jdText, setJdText] = useState('');
  const [results, setResults] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleRank = async () => {
    if (!jdText.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd_text: jdText, top_k: 10 }),
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data.candidates);
        setHasSubmitted(true);
      }
    } catch (error) {
      console.error('Ranking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-accent-blue-light';
    if (score >= 0.4) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number): 'success' | 'info' | 'warning' | 'danger' => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'info';
    if (score >= 0.4) return 'warning';
    return 'danger';
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            <span className="gradient-text">Resume Ranking</span>
          </h1>
          <p className="text-base text-white/35">
            AI-powered candidate matching with explainable scoring
          </p>
        </motion.div>

        {/* Input */}
        <GlassCard delay={0.1} glowColor="purple">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-accent-purple/10">
              <Sparkles className="w-4 h-4 text-accent-purple" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/90">Job Description</h3>
              <p className="text-xs text-white/30">Paste the JD to match against your resume database</p>
            </div>
          </div>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Enter job requirements, skills, responsibilities..."
            rows={5}
            className="w-full mb-4 resize-none"
          />
          <GradientButton
            onClick={handleRank}
            isLoading={loading}
            disabled={loading || !jdText.trim()}
            size="lg"
          >
            <Trophy className="w-5 h-5" />
            {loading ? 'Analyzing...' : 'Rank Resumes'}
          </GradientButton>
        </GlassCard>

        {/* Loading */}
        {loading && <AILoader message="Running AI analysis on resume database..." />}

        {/* Results */}
        <AnimatePresence>
          {hasSubmitted && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard delay={0}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent-blue/10">
                      <Users className="w-4 h-4 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white/90">Ranking Results</h3>
                      <p className="text-xs text-white/30">{results.length} top candidates matched</p>
                    </div>
                  </div>
                  <GlowBadge variant="purple" pulse>AI Scored</GlowBadge>
                </div>

                {/* Results Table */}
                <div className="overflow-x-auto">
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Candidate ID</th>
                        <th>Name</th>
                        <th>Target Role</th>
                        <th>Match Score</th>
                        <th>Confidence</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((candidate, index) => (
                        <motion.tr
                          key={candidate.candidate_id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className="group"
                        >
                          <td>
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-blue/10 flex items-center justify-center text-sm font-bold text-white/80">
                              {candidate.rank}
                            </div>
                          </td>
                          <td>
                            <span className="font-mono text-sm text-accent-blue">{candidate.candidate_id}</span>
                          </td>
                          <td>
                            <span className="font-semibold text-white/80 cursor-pointer hover:text-white transition-colors" onClick={() => setSelectedCandidate(candidate)}>
                              {candidate.name}
                            </span>
                          </td>
                          <td>
                            <span className="text-white/40">{candidate.target_job}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${candidate.normalized_score * 100}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.06 }}
                                  className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue"
                                />
                              </div>
                              <span className={`text-sm font-bold ${getScoreColor(candidate.normalized_score)}`}>
                                {(candidate.normalized_score * 100).toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td>
                            <GlowBadge variant={getScoreBadge(candidate.normalized_score)} size="sm">
                              {candidate.normalized_score >= 0.8 ? 'High' : candidate.normalized_score >= 0.6 ? 'Medium' : 'Low'}
                            </GlowBadge>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setSelectedCandidate(candidate)} className="p-1 hover:bg-white/10 rounded transition-colors" title="View details">
                                <Eye className="w-4 h-4 text-white/40 hover:text-accent-purple" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SHAP Explanation Modal */}
        <AnimatePresence>
          {selectedCandidate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedCandidate(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25 }}
                className="glass-card p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedCandidate.name}</h3>
                    <p className="text-sm text-white/30">SHAP Explanation — AI Reasoning</p>
                  </div>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-white/40" />
                  </button>
                </div>

                {/* Score */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-accent-purple/10 to-accent-blue/5 border border-accent-purple/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Overall Match</span>
                    <span className="text-2xl font-bold text-white">
                      {(selectedCandidate.normalized_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedCandidate.normalized_score * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue"
                    />
                  </div>
                </div>

                {/* Reasoning Bars */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Feature Contributions</h4>
                  {Object.entries(selectedCandidate.reasoning).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white/60 capitalize">
                          {key.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-white/30">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && !hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Trophy className="w-16 h-16 text-white/10" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white/40 mb-2">Start Ranking</h3>
            <p className="text-sm text-white/20">Enter a job description to match against your resume database</p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
