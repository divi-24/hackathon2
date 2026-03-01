'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  Users,
  Clipboard,
  Calendar,
  Phone,
  Trophy,
  TrendingUp,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: <Clipboard className="w-8 h-8" />,
    title: 'Upload Job Description',
    description: 'Start by uploading the job description to rank candidates automatically.',
    details: [
      'Paste or upload the job description (JD)',
      'System analyzes required skills and experience',
      'Automatic ranking against all resumes',
      'Get top 10 best-fit candidates'
    ],
    color: 'bg-blue-500'
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8" />,
    title: 'Screen & Select Candidates',
    description: 'Review ranked candidates and move qualified ones to next stage.',
    details: [
      'Review candidate profiles and scores',
      'Click "Move to Screened" for qualified candidates',
      'System validates resume quality',
      'Transition: applied → screened'
    ],
    color: 'bg-purple-500'
  },
  {
    id: 3,
    icon: <Calendar className="w-8 h-8" />,
    title: 'Schedule Interviews',
    description: 'Schedule interviews with conflict detection and auto-confirmation.',
    details: [
      'Select candidate and interviewer',
      'Choose date and time from available slots',
      'System checks for scheduling conflicts',
      'Transition: screened → interview_scheduled'
    ],
    color: 'bg-green-500'
  },
  {
    id: 4,
    icon: <Phone className="w-8 h-8" />,
    title: 'Conduct Interview',
    description: 'Interview the candidate and record completion in system.',
    details: [
      'Conduct interview with candidate',
      'Mark as "Interview Completed"',
      'System records timestamp',
      'Transition: interview_scheduled → interviewed'
    ],
    color: 'bg-yellow-500'
  },
  {
    id: 5,
    icon: <Trophy className="w-8 h-8" />,
    title: 'Submit Interview Result',
    description: 'Decide to select or reject - system auto-generates questions for selected candidates.',
    details: [
      'Choose "Selected" or "Rejected"',
      'Provide decision reason',
      'If Selected: System generates technical & behavioral questions',
      'If Rejected: Shows red badge, no further transitions allowed'
    ],
    color: 'bg-red-500'
  },
  {
    id: 6,
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Extend & Accept Offer',
    description: 'Complete the final stages of the hiring process.',
    details: [
      'For selected candidates: Create and extend offer',
      'Candidate reviews and accepts offer',
      'System transitions: offer_extended → offer_accepted',
      'Ready for final hiring'
    ],
    color: 'bg-indigo-500'
  },
  {
    id: 7,
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Hire & Onboard',
    description: 'Complete the hiring process and transition to hired status.',
    details: [
      'Final onboarding steps',
      'Mark candidate as "Hired"',
      'Transition to terminal state: hired',
      'No further transitions allowed'
    ],
    color: 'bg-emerald-500'
  },
  {
    id: 8,
    icon: <Download className="w-8 h-8" />,
    title: 'Export Results',
    description: 'Download complete hiring pipeline data and decision history.',
    details: [
      'Access /export endpoint',
      'Get rankings, leave decisions, schedules',
      'Full pipeline history with timestamps',
      'JSON format for integration'
    ],
    color: 'bg-orange-500'
  }
];

const policyFeatures = [
  {
    title: 'Leave Policy Compliance',
    icon: <Clipboard className="w-6 h-6" />,
    items: [
      'Automatic leave balance validation',
      'Leave type eligibility checks',
      'Date overlap conflict detection',
      'Policy evidence documentation'
    ]
  },
  {
    title: 'State Machine Enforcement',
    icon: <TrendingUp className="w-6 h-6" />,
    items: [
      'Strict state transition validation',
      'No skipping pipeline stages',
      'Terminal states (hired/rejected) cannot revert',
      'Full transition history logging'
    ]
  },
  {
    title: 'Data Integrity',
    icon: <CheckCircle className="w-6 h-6" />,
    items: [
      'Deterministic processing',
      'JSON schema validation',
      'Error handling with codes',
      'Timestamp for all operations'
    ]
  }
];

interface ExpandedState {
  [key: number]: boolean;
}

export default function GuidePage() {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const toggleExpand = (id: number) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">HR Agent System Guide</h1>
          <p className="text-lg text-blue-100">
            Complete step-by-step guide for using the AI HR Agent system
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pipeline Flow */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Hiring Pipeline Flow
          </h2>

          {/* State Diagram */}
          <div className="bg-slate-700 rounded-lg p-8 mb-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-max gap-2">
              {['applied', 'screened', 'interview_scheduled', 'interviewed', 'offer_extended', 'offer_accepted', 'hired'].map((state, idx, arr) => (
                <React.Fragment key={state}>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-semibold text-sm text-center px-2">
                      {state.replace('_', '\n')}
                    </div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="flex-none">
                      <div className="text-2xl text-gray-400">→</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="flex-none ml-4">
                <div className="text-xl text-red-400 font-bold">Rejection allowed from any state</div>
              </div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div
                  onClick={() => toggleExpand(step.id)}
                  className="p-6 cursor-pointer hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${step.color} text-white p-3 rounded-lg flex-shrink-0`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-400">Step {step.id}</span>
                        </div>
                        <h3 className="text-lg font-bold mt-1">{step.title}</h3>
                        <p className="text-sm text-gray-300 mt-2">{step.description}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {expanded[step.id] ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                {expanded[step.id] && (
                  <div className="border-t border-slate-600 bg-slate-800 p-6">
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-200">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policyFeatures.map((feature, idx) => (
              <div key={idx} className="bg-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-sm text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Important Rules */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Important Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-900 bg-opacity-30 border-l-4 border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-red-400">❌ What NOT to do</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• Skip pipeline stages (e.g., go directly from screened to hired)</li>
                <li>• Try to modify hired or rejected candidates</li>
                <li>• Submit interview result twice for same candidate</li>
                <li>• Use invalid decision values (only 'selected' or 'rejected')</li>
              </ul>
            </div>

            <div className="bg-green-900 bg-opacity-30 border-l-4 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-green-400">✅ Best Practices</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• Always provide a reason for decisions</li>
                <li>• Review candidate scores before screening</li>
                <li>• Schedule interviews only for screened candidates</li>
                <li>• Export results regularly for backup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Integration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Interview Result Decision
          </h2>

          <div className="bg-slate-700 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Selected Flow */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-green-400">When SELECTED</h3>
                <div className="bg-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">1.</span>
                    <span className="text-sm">Candidate state moves to: <code className="bg-slate-900 px-2 py-1 rounded">offer_extended</code></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">2.</span>
                    <span className="text-sm">System automatically generates interview questions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">3.</span>
                    <span className="text-sm">Frontend shows technical & behavioral questions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">4.</span>
                    <span className="text-sm">Green badge indicates successful decision</span>
                  </div>
                </div>
              </div>

              {/* Rejected Flow */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-red-400">When REJECTED</h3>
                <div className="bg-slate-800 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">1.</span>
                    <span className="text-sm">Candidate state moves to: <code className="bg-slate-900 px-2 py-1 rounded">rejected</code></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">2.</span>
                    <span className="text-sm">No interview questions are generated</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">3.</span>
                    <span className="text-sm">Rejection reason is displayed and stored</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">4.</span>
                    <span className="text-sm">Red badge shown - no further transitions allowed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example Flow */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Complete Example Flow
          </h2>

          <div className="bg-slate-700 rounded-lg p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <p className="font-bold">Upload Job Description for "Senior Backend Developer"</p>
                  <p className="text-sm text-gray-300 mt-1">System ranks 1200 candidates against the JD</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <p className="font-bold">Select top 3 candidates → Move to "Screened"</p>
                  <p className="text-sm text-gray-300 mt-1">Candidate state: applied → screened</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <p className="font-bold">Schedule interviews for the 3 candidates</p>
                  <p className="text-sm text-gray-300 mt-1">Candidate state: screened → interview_scheduled</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <p className="font-bold">Conduct interviews and mark as completed</p>
                  <p className="text-sm text-gray-300 mt-1">Candidate state: interview_scheduled → interviewed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <p className="font-bold">Submit interview results</p>
                  <ul className="text-sm text-gray-300 mt-1 space-y-1 ml-4">
                    <li>• Candidate A: SELECTED → offer_extended + questions generated</li>
                    <li>• Candidate B: REJECTED → rejected + no questions</li>
                    <li>• Candidate C: SELECTED → offer_extended + questions generated</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">6</div>
                <div>
                  <p className="font-bold">Extend offers to Candidates A & C</p>
                  <p className="text-sm text-gray-300 mt-1">Candidate state: offer_extended → offer_accepted</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">7</div>
                <div>
                  <p className="font-bold">Mark as hired</p>
                  <p className="text-sm text-gray-300 mt-1">Candidate state: offer_accepted → hired (terminal)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-blue-100 mb-6">
              For detailed API documentation, visit the <code className="bg-blue-700 px-2 py-1 rounded">/docs</code> endpoint.
            </p>
            <ul className="space-y-2 text-blue-100">
              <li>📧 Questions about the system? Check the API documentation</li>
              <li>🔍 State validation issues? Review the pipeline diagram above</li>
              <li>📊 Data export? Use the Export Results button on dashboard</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
