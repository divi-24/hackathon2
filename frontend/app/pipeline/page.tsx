'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Search, ArrowRight, AlertTriangle, Clock, Zap, X } from 'lucide-react';
import { transitionCandidate, getCandidateState } from '../api/client';
import { GlassCard, GradientButton, GlowBadge, PageTransition } from '@/components/ui';

interface PipelineState {
  candidate_id: string;
  current_state: string;
  history: Array<{ state: string; timestamp: string; reason?: string }>;
}

const stages = ['applied', 'screened', 'interview_scheduled', 'interviewed', 'offer_extended', 'offer_accepted', 'hired'];
const cfg: Record<string, { label: string; color: string; icon: string }> = {
  applied: { label: 'Applied', color: 'bg-blue-400', icon: '📝' },
  screened: { label: 'Screened', color: 'bg-indigo-400', icon: '👀' },
  interview_scheduled: { label: 'Interview', color: 'bg-purple-400', icon: '📅' },
  interviewed: { label: 'Interviewed', color: 'bg-violet-400', icon: '🎤' },
  offer_extended: { label: 'Offer', color: 'bg-amber-400', icon: '💼' },
  offer_accepted: { label: 'Accepted', color: 'bg-emerald-400', icon: '✅' },
  hired: { label: 'Hired', color: 'bg-green-400', icon: '🎉' },
  rejected: { label: 'Rejected', color: 'bg-red-400', icon: '❌' },
};
const transitions: Record<string, string[]> = {
  applied: ['screened', 'rejected'], screened: ['interview_scheduled', 'rejected'],
  interview_scheduled: ['interviewed', 'rejected'], interviewed: ['offer_extended', 'rejected'],
  offer_extended: ['offer_accepted', 'rejected'], offer_accepted: ['hired', 'rejected'],
  hired: [], rejected: [],
};

export default function PipelinePage() {
  const [candidateId, setCandidateId] = useState('');
  const [state, setState] = useState<PipelineState | null>(null);
  const [sel, setSel] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [showInterviewResult, setShowInterviewResult] = useState(false);
  const [interviewDecision, setInterviewDecision] = useState('');
  const [interviewReason, setInterviewReason] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<{technical: string[], behavioral: string[]} | null>(null);

  async function handleGet(e: React.FormEvent) {
    e.preventDefault();
    if (!candidateId.trim()) { setError('Enter a candidate ID'); return; }
    setLoading(true); setError('');
    const r = await getCandidateState(candidateId);
    if (r.error) { setError(r.error); setState(null); }
    else if ((r.data as any)?.candidate_id) { setState(r.data as any); setSel(''); setReason(''); }
    else { setError('Not found'); setState(null); }
    setLoading(false);
  }

  async function handleTransition(e: React.FormEvent) {
    e.preventDefault();
    if (!sel) return;
    setLoading(true);
    const r = await transitionCandidate(candidateId, sel, reason);
    if (!r.error && (r.data as any)?.candidate_id) { setState(r.data as any); setSel(''); setReason(''); setError(''); }
    else { setError(r.error || 'Failed'); setShake(true); setTimeout(() => setShake(false), 500); }
    setLoading(false);
  }

  async function handleInterviewResult(e: React.FormEvent) {
    e.preventDefault();
    if (!interviewDecision || !interviewReason.trim()) return;
    setLoading(true);
    try {
      const r = await fetch('http://localhost:8000/api/interview-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_id: candidateId,
          decision: interviewDecision,
          reason: interviewReason
        })
      });
      const data = await r.json();
      if (r.ok && data.status === 'success') {
        setState(prev => prev ? {...prev, current_state: data.new_state} : null);
        if (interviewDecision === 'selected' && data.technical_questions) {
          setGeneratedQuestions({
            technical: data.technical_questions || [],
            behavioral: data.behavioral_questions || []
          });
        } else {
          setShowInterviewResult(false);
          setInterviewDecision('');
          setInterviewReason('');
        }
        setError('');
      } else {
        setError(data.message || 'Failed to submit interview result');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    }
    setLoading(false);
  }

  const avail = state ? transitions[state.current_state] || [] : [];
  const idx = state ? stages.indexOf(state.current_state) : -1;

  return (
    <PageTransition>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            <span className="gradient-text">Candidate Pipeline</span>
          </h1>
          <p className="text-base text-white/35">Track candidates through the hiring funnel</p>
        </motion.div>

        {state && state.current_state !== 'rejected' && (
          <GlassCard delay={0.1}>
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-accent-purple/10"><GitBranch className="w-4 h-4 text-accent-purple" /></div>
              <h3 className="text-sm font-semibold text-white/90">Pipeline Progress</h3>
            </div>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {stages.map((s, i) => {
                const c = cfg[s]; const active = state.current_state === s;
                const past = i < idx; const future = i > idx;
                return (
                  <div key={s} className="flex items-center flex-shrink-0">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-2">
                      <motion.div animate={active ? { scale: [1, 1.15, 1] } : {}} transition={active ? { duration: 2, repeat: Infinity } : {}}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${active ? 'bg-gradient-to-br from-accent-purple to-accent-blue shadow-glow-sm' : past ? 'bg-accent-purple/20' : 'bg-white/5'}`}>
                        {c.icon}
                      </motion.div>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${active ? 'text-white' : past ? 'text-white/40' : 'text-white/15'}`}>{c.label}</span>
                    </motion.div>
                    {i < stages.length - 1 && <div className={`w-8 lg:w-12 h-0.5 mx-1 rounded-full ${i < idx ? 'bg-accent-purple/30' : 'bg-white/5'}`} />}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        )}

        {state && state.current_state === 'rejected' && (
          <GlassCard delay={0.1} className="border-red-500/20">
            <div className="text-center py-4">
              <span className="text-4xl mb-3 block">❌</span>
              <h3 className="text-lg font-bold text-red-400">Candidate Rejected</h3>
              <p className="text-sm text-white/30 mt-1">Terminal state</p>
            </div>
          </GlassCard>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className={shake ? 'animate-shake' : ''}>
            <GlassCard delay={0.2} glowColor="purple">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-accent-blue/10"><Search className="w-4 h-4 text-accent-blue" /></div>
                <h3 className="text-sm font-semibold text-white/90">Candidate Lookup</h3>
              </div>
              <form onSubmit={handleGet} className="space-y-4 mb-6">
                <input type="text" value={candidateId} onChange={(e) => setCandidateId(e.target.value)} placeholder="e.g., candidate_5" />
                <GradientButton type="submit" isLoading={loading} fullWidth><Search className="w-4 h-4" />Load</GradientButton>
              </form>
              {state && avail.length > 0 && (
                <form onSubmit={handleTransition} className="space-y-4 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 className="text-xs font-medium text-white/30 uppercase tracking-wider">Transition</h4>
                  <select value={sel} onChange={(e) => setSel(e.target.value)}>
                    <option value="">Select next state...</option>
                    {avail.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ').toUpperCase()}</option>)}
                  </select>
                  <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (optional)" rows={2} />
                  <GradientButton type="submit" isLoading={loading} disabled={!sel} fullWidth><ArrowRight className="w-4 h-4" />Confirm</GradientButton>
                </form>
              )}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />{error}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          {state && (
            <div className="lg:col-span-2 space-y-6">
              <GlassCard delay={0.3}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-accent-cyan/10"><Zap className="w-4 h-4 text-accent-cyan" /></div>
                  <h3 className="text-sm font-semibold text-white/90">Current State</h3>
                </div>
                <div className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-accent-purple/10 to-accent-blue/5 border border-accent-purple/10">
                  <span className="text-4xl">{cfg[state.current_state]?.icon || '📍'}</span>
                  <div><p className="text-xs text-white/30 mb-1">Status</p><p className="text-2xl font-bold text-white capitalize">{state.current_state.replace(/_/g, ' ')}</p></div>
                  <div className="ml-auto">
                    <GlowBadge variant={state.current_state === 'rejected' ? 'danger' : state.current_state === 'hired' ? 'success' : 'purple'} pulse>
                      {state.current_state === 'rejected' ? 'Terminal' : state.current_state === 'hired' ? 'Complete' : 'Active'}
                    </GlowBadge>
                  </div>
                </div>
              </GlassCard>

              <GlassCard delay={0.4}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-white/5"><Clock className="w-4 h-4 text-white/40" /></div>
                  <h3 className="text-sm font-semibold text-white/90">Activity Timeline</h3>
                </div>
                {state.history.length === 0 ? <p className="text-sm text-white/20 py-6 text-center">No transitions yet</p> : (
                  <div className="space-y-1">
                    {state.history.map((entry, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                        className="flex gap-4 py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                        <div className="flex flex-col items-center">
                          <span className="text-xl">{cfg[entry.state]?.icon || '📍'}</span>
                          {i < state.history.length - 1 && <div className="w-px h-full bg-white/5 mt-2" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white/70 capitalize">{entry.state.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-white/20 mt-0.5">{new Date(entry.timestamp).toLocaleString()}</p>
                          {entry.reason && <p className="text-xs text-white/30 mt-1.5 p-2 rounded-lg bg-white/[0.02]">{entry.reason}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          )}
        </div>

        {!state && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity }}>
              <GitBranch className="w-16 h-16 text-white/10 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white/30 mb-2">Pipeline Visualization</h3>
            <p className="text-sm text-white/15">Enter a candidate ID to view their journey</p>
          </motion.div>
        )}

        {/* Interview Result Modal */}
        <AnimatePresence>
          {state && state.current_state === 'interviewed' && !showInterviewResult && !generatedQuestions && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed bottom-6 right-6 z-40">
              <motion.button initial={{scale: 0.8}} animate={{scale: 1}} onClick={() => setShowInterviewResult(true)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold hover:shadow-glow-sm transition-all">
                Submit Interview Result
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interview Result Form Modal */}
        <AnimatePresence>
          {showInterviewResult && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowInterviewResult(false)}>
              <motion.div initial={{opacity: 0, scale: 0.9, y: 30}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.9, y: 30}} transition={{type: 'spring', damping: 25}} className="glass-card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Interview Result</h3>
                  <button onClick={() => setShowInterviewResult(false)} className="p-1.5 rounded-lg hover:bg-white/5"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleInterviewResult} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Decision</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" value="selected" checked={interviewDecision === 'selected'} onChange={(e) => setInterviewDecision(e.target.value)} className="w-4 h-4" />
                        <span className="text-white/80">Selected</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" value="rejected" checked={interviewDecision === 'rejected'} onChange={(e) => setInterviewDecision(e.target.value)} className="w-4 h-4" />
                        <span className="text-white/80">Rejected</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">Reason / Feedback</label>
                    <textarea value={interviewReason} onChange={(e) => setInterviewReason(e.target.value)} placeholder="Explain the decision..." rows={3} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent-purple/50" />
                  </div>
                  {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowInterviewResult(false)} className="flex-1 px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-colors">Cancel</button>
                    <button type="submit" disabled={!interviewDecision || !interviewReason.trim() || loading} className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold disabled:opacity-50 hover:shadow-glow-sm transition-all">{loading ? 'Submitting...' : 'Submit'}</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated Questions Modal */}
        <AnimatePresence>
          {generatedQuestions && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {setGeneratedQuestions(null); setShowInterviewResult(false); setInterviewDecision(''); setInterviewReason('');}}>
              <motion.div initial={{opacity: 0, scale: 0.9, y: 30}} animate={{opacity: 1, scale: 1, y: 0}} exit={{opacity: 0, scale: 0.9, y: 30}} transition={{type: 'spring', damping: 25}} className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Interview Questions</h3>
                  <button onClick={() => {setGeneratedQuestions(null); setShowInterviewResult(false); setInterviewDecision(''); setInterviewReason('');}} className="p-1.5 rounded-lg hover:bg-white/5"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-accent-blue mb-3">Technical Questions</h4>
                    <div className="space-y-2">
                      {generatedQuestions.technical.map((q, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <p className="text-sm text-white/80"><span className="font-semibold text-accent-blue">{i+1}.</span> {q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-accent-purple mb-3">Behavioral Questions</h4>
                    <div className="space-y-2">
                      {generatedQuestions.behavioral.map((q, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <p className="text-sm text-white/80"><span className="font-semibold text-accent-purple">{i+1}.</span> {q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => {setGeneratedQuestions(null); setShowInterviewResult(false); setInterviewDecision(''); setInterviewReason('');}} className="mt-6 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold hover:shadow-glow-sm transition-all">Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
