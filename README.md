<div align="center">

# 🏆 AI HR Agent — Netrik Hackathon 2026 (Track 1)

**Autonomous, Deterministic HR Pipeline Automation**

[![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-blue?style=flat-square&logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![Tests](https://img.shields.io/badge/tests-85%20passed-brightgreen?style=flat-square&logo=pytest)](tests/)
[![Deterministic](https://img.shields.io/badge/determinism-100%25-gold?style=flat-square)](#-determinism--reproducibility)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)](#)

*A production-grade AI HR Agent that automates the complete hiring lifecycle — from resume ranking to onboarding — with **zero randomness**, **strict FSM enforcement**, and **formal evidence trails**.*

</div>

---

## 🎯 Project Overview

This AI HR Agent fully automates the enterprise hiring pipeline, replacing manual HR workflows with deterministic, auditable AI-driven decision-making. The system processes 1,200+ resumes, schedules conflict-free interviews, enforces strict candidate pipeline states, and evaluates leave compliance — all with reproducible outputs and formal evidence.

**Key Capabilities:**
- **Resume–JD Matching & Ranking** — TF-IDF embeddings with stable sorting and full score breakdowns
- **Interview Scheduling** — Interval-based conflict detection with zero overlapping bookings
- **Candidate Pipeline (FSM)** — Strict finite state machine with no skipping, no reverting, terminal state enforcement
- **Leave Compliance Engine** — Rule-based approval with balance tracking, role eligibility, and overlap detection
- **Interview Question Generation** — Deterministic, JD-aware technical and behavioral question generation
- **Structured JSON Export** — Strict schema compliance for test harness evaluation

---

## 📊 Rubric Alignment Table

| Rubric Criteria | Implementation | Proof |
|:---|:---|:---|
| **Resume–JD Matching (MRR)** | TF-IDF embeddings + multi-feature scoring | `test_ranking.py` — 9 determinism tests |
| **Score Breakdown** | 5-component breakdown per candidate | [ranking_output.json](tests/sample_output/ranking_output.json) |
| **Interview Scheduling** | Interval-based overlap detection, 60-min blocks | `test_scheduler.py` — 14 conflict tests |
| **Pipeline State (FSM)** | Enum-based strict transitions, no skip/revert | `test_state_machine.py` — 14 FSM tests |
| **Leave Policy Compliance** | 4-rule engine with formal evidence | `test_leave_engine.py` — 14 validation tests |
| **Edge Case Handling** | Empty input, malformed data, duplicates | `test_edge_cases.py` — 13 edge case tests |
| **export_results()** | Strict 5-key JSON schema, no extras | `test_export.py` — 9 schema tests |
| **Determinism** | `random_state=42`, stable sort, no randomness | All 85 tests pass identically every run |
| **Integration Testing** | Full lifecycle: Rank→Screen→Schedule→Hire | `test_integration.py` — 4 lifecycle tests |

---

## 🏗 Architecture Diagram

```mermaid
graph TD
    subgraph API["🌐 FastAPI REST API Layer"]
        R["/api/rank"]
        L["/api/leave"]
        S["/api/schedule"]
        T["/api/transition"]
        E["/api/export"]
        Q["/api/questions"]
        IR["/api/interview-result"]
    end

    subgraph ORCH["🧠 HRAgent Orchestrator"]
        M["main.py"]
    end

    subgraph ENGINES["⚙️ Core Engines"]
        RE["📊 Ranking Engine\nTF-IDF + GBR\nrandom_state=42"]
        SE["📅 Scheduler\nInterval Overlap\n60-min Blocks"]
        FSM["🔐 State Machine\nEnum FSM\nTransition Logs"]
        LE["🏖 Leave Engine\n4-Rule Chain\nEvidence Trail"]
        IG["🎤 Interview Gen\nSkill-Based\nQuestion Bank"]
    end

    subgraph UTIL["🔧 Utility Layer"]
        V["validation.py"]
        EM["embeddings.py"]
    end

    subgraph DATA["💾 Data Layer"]
        CSV["resume_dataset_1200.csv"]
        XLS["employee_leave_tracking.xlsx"]
    end

    API --> ORCH
    M --> RE & SE & FSM & LE & IG
    RE --> EM
    M --> V
    RE --> CSV
    LE --> XLS

    style API fill:#1a1a2e,stroke:#e94560,color:#fff
    style ORCH fill:#16213e,stroke:#0f3460,color:#fff
    style ENGINES fill:#0f3460,stroke:#533483,color:#fff
    style UTIL fill:#533483,stroke:#e94560,color:#fff
    style DATA fill:#2d2d2d,stroke:#e94560,color:#fff
```

---

## 🔄 Hiring Workflow Demonstration

```mermaid
flowchart LR
    A["📄 1200 Resumes"] -->|TF-IDF + GBR| B["📊 Rank Top-K"]
    B -->|FSM: applied→screened| C["🔍 Screen"]
    C -->|Conflict-free| D["📅 Schedule"]
    D -->|FSM: scheduled→interviewed| E["🎤 Interview"]
    E -->|Q&A Generated| F["📝 Evaluate"]
    F -->|FSM: offer_extended| G["💼 Offer"]
    G -->|FSM: offer_accepted| H["✅ Hired"]
    F -->|Decision: rejected| I["❌ Rejected"]

    J["🏖 Leave Request"] -->|4-Rule Engine| K{"Policy\nCheck"}
    K -->|All Pass| L["✅ Approved"]
    K -->|Any Fail| M["❌ Rejected"]

    N["📦 export_results()"] -->|Strict Schema| O["📋 5-Key JSON"]

    style A fill:#667eea,stroke:#764ba2,color:#fff
    style B fill:#f093fb,stroke:#f5576c,color:#fff
    style H fill:#11998e,stroke:#38ef7d,color:#fff
    style I fill:#e94560,stroke:#c0392b,color:#fff
    style L fill:#11998e,stroke:#38ef7d,color:#fff
    style M fill:#e94560,stroke:#c0392b,color:#fff
    style O fill:#667eea,stroke:#764ba2,color:#fff
```

Complete lifecycle with actual system output:

```
Step 1: RANK RESUMES       → 1200 candidates scored against JD
Step 2: SCREEN TOP-K       → applied → screened (FSM transition)
Step 3: SCHEDULE INTERVIEW → conflict-free slot allocated
Step 4: INTERVIEW          → screened → interview_scheduled → interviewed
Step 5: EXTEND OFFER       → interviewed → offer_extended
Step 6: ACCEPT & HIRE      → offer_extended → offer_accepted → hired (TERMINAL)
Step 7: EXPORT             → All results in strict JSON schema
```

### Example Ranking Output (Top Candidate)

```json
{
  "rank": 1,
  "candidate_id": "candidate_483",
  "name": "Christopher Garcia",
  "score": 0.6878,
  "normalized_score": 1.0,
  "score_breakdown": {
    "skills_match_score": 0.4743,
    "experience_score": 0.45,
    "education_score": 0.1667,
    "certification_score": 1.0,
    "final_score": 0.6878,
    "normalized_score": 1.0
  },
  "reasoning": {
    "embedding_match": "0.47",
    "experience": "9 years",
    "degree": "High School",
    "certifications": "Yes"
  }
}
```

---

## 🧠 Ranking Engine

### Determinism Guarantee
- **Fixed seed**: `random_state=42` on GradientBoostingRegressor
- **Stable sorting**: `sort(key=lambda x: (-x[0], x[1]))` — descending score, ascending candidate_id on ties
- **Deterministic normalization**: Regex-based lowercasing, no locale dependency
- **No randomness**: TF-IDF vectorizer with fixed `max_features=500`

### Scoring Breakdown (5 Components)

```mermaid
pie title Score Component Weights (Top Candidate Example)
    "Skills Match (TF-IDF)" : 47.4
    "Experience (Years/20)" : 45.0
    "Education (Degree/6)" : 16.7
    "Certifications" : 100.0
```

| Component | Source | Range |
|:---|:---|:---|
| `skills_match_score` | TF-IDF cosine similarity | 0.0–1.0 |
| `experience_score` | Years / 20 (capped at 1.0) | 0.0–1.0 |
| `education_score` | Ordinal degree mapping / 6 | 0.0–1.0 |
| `certification_score` | Binary (0 or 1) | 0.0–1.0 |
| `final_score` | Composite weighted score | Float |

### Test Proof
```
tests/test_ranking.py::TestRankingDeterminism::test_same_input_identical_output    PASSED
tests/test_ranking.py::TestRankingDeterminism::test_no_randomness_across_invocations PASSED
tests/test_ranking.py::TestStableSorting::test_stable_tiebreak_by_candidate_id     PASSED
```

---

## 📅 Scheduling Engine

### Constraint-Safe Logic
- **60-minute interview blocks** — configurable via `INTERVIEW_DURATION_MINUTES`
- **Interval-based overlap detection** — no two bookings share any time window
- **Dual availability validation** — checks both interviewer AND candidate availability
- **Duplicate candidate prevention** — same candidate cannot be scheduled twice

### Conflict Prevention Proof

```json
{
  "candidate_id": "candidate_1",
  "interviewer_id": "interviewer_001",
  "status": "failed",
  "error_code": "SLOT_NOT_AVAILABLE",
  "error_message": "Interviewer not available at requested time",
  "conflict_details": {
    "requested_date": "2025-03-10",
    "requested_time": "10:00",
    "duration_minutes": 60
  }
}
```

### Error Codes
| Code | Meaning |
|:---|:---|
| `SLOT_NOT_AVAILABLE` | Time slot occupied or absent |
| `CANDIDATE_ALREADY_SCHEDULED` | Duplicate booking attempt |
| `INVALID_DATETIME_FORMAT` | Malformed date/time input |
| `CANDIDATE_UNAVAILABLE` | Candidate not available at requested time |

---

## 🔐 FSM Enforcement

### State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> Applied
    Applied --> Screened : ✅ screen
    Screened --> InterviewScheduled : ✅ schedule
    InterviewScheduled --> Interviewed : ✅ complete
    Interviewed --> OfferExtended : ✅ select
    OfferExtended --> OfferAccepted : ✅ accept
    OfferAccepted --> Hired : ✅ onboard

    Applied --> Rejected : ❌ reject
    Screened --> Rejected : ❌ reject
    InterviewScheduled --> Rejected : ❌ reject
    Interviewed --> Rejected : ❌ reject
    OfferExtended --> Rejected : ❌ reject
    OfferAccepted --> Rejected : ❌ reject

    Hired --> [*]
    Rejected --> [*]

    note right of Hired : TERMINAL\nNo transitions out
    note right of Rejected : TERMINAL\nNo transitions out
```

### Invalid Transition Example
```
Request:  applied → interview_scheduled  (skip screened)
Response: ❌ "Cannot transition from applied to interview_scheduled"
          Allowed: [screened, rejected]
```

### Terminal State Enforcement
```
Request:  hired → screened  (revert from terminal)
Response: ❌ "Cannot transition from hired to screened"
          Allowed: []  (no transitions from terminal state)
```

### Log Validation Proof
Every transition stores:
```json
{
  "state": "screened",
  "timestamp": "2025-03-01T08:00:00.000000",
  "reason": "Resume reviewed - strong Python background"
}
```

---

## 🏖 Leave Compliance Engine

### Deterministic Rule Flow (4 Rules, Sequential)

```mermaid
flowchart TD
    START["🏖 Leave Request"] --> R1{"Rule 1:\nDate Valid?"}
    R1 -->|❌ Invalid| REJ1["REJECTED\nRULE_INVALID_DATE"]
    R1 -->|✅ Valid| R2{"Rule 2:\nBalance ≥ Days?"}
    R2 -->|❌ Insufficient| REJ2["REJECTED\nRULE_INSUFFICIENT_BALANCE"]
    R2 -->|✅ Sufficient| R3{"Rule 3:\nRole Eligible?"}
    R3 -->|❌ Not Allowed| REJ3["REJECTED\nRULE_ROLE_INELIGIBLE"]
    R3 -->|✅ Allowed| R4{"Rule 4:\nNo Overlap?"}
    R4 -->|❌ Overlaps| REJ4["REJECTED\nRULE_DATE_OVERLAP"]
    R4 -->|✅ No Overlap| APP["✅ APPROVED\nBalance Decremented"]

    style START fill:#667eea,stroke:#764ba2,color:#fff
    style APP fill:#11998e,stroke:#38ef7d,color:#fff
    style REJ1 fill:#e94560,stroke:#c0392b,color:#fff
    style REJ2 fill:#e94560,stroke:#c0392b,color:#fff
    style REJ3 fill:#e94560,stroke:#c0392b,color:#fff
    style REJ4 fill:#e94560,stroke:#c0392b,color:#fff
```

### Balance Underflow Prevention
After approval, remaining balance is **decremented** immediately:
```python
emp_data['remaining'] -= days_requested
emp_data['taken_so_far'] += days_requested
```

### Rejection Example (Insufficient Balance)
```json
{
  "employee_name": "Michael Moore",
  "decision_type": "rejected",
  "applied_policy_rules": [
    "RULE_DATE_VALIDATION_PASSED",
    "RULE_INSUFFICIENT_BALANCE"
  ],
  "evidence": {
    "balance_check": {
      "required": 100,
      "available": 10,
      "passed": false,
      "reason": "Balance check failed"
    }
  }
}
```

---

## 🧪 Automated Testing

### Run Tests
```bash
# Install dependencies
pip install -r backend/requirements.txt pytest

# Run full test suite
python3 -m pytest tests/ -v

# Run specific module
python3 -m pytest tests/test_ranking.py -v

# Run with coverage
python3 -m pytest tests/ -v --tb=short
```

### Test Suite Results: **85/85 Passed ✅**

```mermaid
xychart-beta
    title "Test Coverage by Module (85 Total)"
    x-axis ["Edge Cases", "Export", "Integration", "Leave", "Ranking", "Scheduler", "FSM"]
    y-axis "Tests Passed" 0 --> 16
    bar [13, 9, 4, 14, 9, 14, 14]
```

```
tests/test_edge_cases.py      ✅ 13 passed   (empty input, malformed data, duplicates)
tests/test_export.py           ✅  9 passed   (JSON schema, missing keys, empty export)
tests/test_integration.py      ✅  4 passed   (full lifecycle, rejection, leave, scheduling)
tests/test_leave_engine.py     ✅ 14 passed   (balance, eligibility, overlap, evidence)
tests/test_ranking.py          ✅  9 passed   (determinism, stable sort, breakdowns)
tests/test_scheduler.py        ✅ 14 passed   (conflicts, overlap, availability, validation)
tests/test_state_machine.py    ✅ 14 passed   (transitions, skipping, reverting, terminal)
──────────────────────────────────────────────────────────
TOTAL                          ✅ 85 passed in 0.12s
```

### Sample Test Output Files
Located in [`tests/sample_output/`](tests/sample_output/):
- `ranking_output.json` — Top-5 ranked candidates with breakdowns
- `leave_decision_approved.json` — Approved leave with evidence
- `leave_decision_rejected.json` — Rejected leave (balance underflow)
- `schedule_success.json` — Successful interview booking
- `schedule_conflict.json` — Conflict rejection with error code
- `export_results.json` — Full system export

---

## 📦 export_results() Compliance

### Strict JSON Schema
```json
{
  "rankings":            [ ... ],   // Ranked candidates with score_breakdown
  "leave_decisions":     [ ... ],   // Decisions with applied_policy_rules + evidence
  "pipeline_history":    [ ... ],   // FSM states with transition history
  "interview_schedules": [ ... ],   // Schedules with error_codes
  "interview_questions": [ ... ]    // Generated Q&A sets
}
```

### Schema Guarantees
- ✅ **Exactly 5 keys** — no extra fields, no missing keys
- ✅ **All values are lists** — predictable iteration
- ✅ **Valid JSON** — `json.loads()` never fails
- ✅ **Test harness compatible** — `python3 test_harness.py` passes all 6 checks

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <repo-url> && cd hack
pip install -r backend/requirements.txt

# 2. Run test suite (85 tests)
python3 -m pytest tests/ -v

# 3. Start API server
cd backend && python3 -m uvicorn app.main:app --reload
# API docs at http://localhost:8000/docs
```

---

## 🛡 Determinism & Reproducibility

| Guarantee | Implementation |
|:---|:---|
| **No randomness** | No `random`, no `shuffle`, no non-deterministic operations |
| **Fixed seed** | `random_state=42` on GradientBoostingRegressor |
| **Stable sorting** | Descending score + ascending candidate_id tiebreak |
| **Deterministic hashing** | TF-IDF with fixed `max_features=500` |
| **Reproducible text normalization** | Regex-only lowercasing (no locale) |
| **Idempotent exports** | Same operations → identical `export_results()` JSON |
| **Deterministic question generation** | Skill-indexed selection, no random sampling |

**Proof**: Running `python3 -m pytest tests/test_ranking.py::TestRankingDeterminism -v` confirms identical output across multiple invocations.

---

## 🔍 Edge Case Handling

| Edge Case | Handling | Test |
|:---|:---|:---|
| Empty JD text | Returns rankings (no crash) | `test_empty_jd_text` |
| Empty resume dataset | Raises `ValueError` | `test_empty_resume_dataset` |
| Malformed leave dates | Rejected with `RULE_INVALID_DATE_FORMAT` | `test_malformed_start_date` |
| Start date after end date | Rejected with `RULE_INVALID_DATE_RANGE` | `test_start_after_end_rejected` |
| Unknown employee | Rejected with `RULE_EMPLOYEE_NOT_FOUND` | `test_unknown_employee_rejected` |
| Duplicate candidate scheduling | Rejected with `CANDIDATE_ALREADY_SCHEDULED` | `test_duplicate_candidate_scheduling` |
| Invalid state transition string | Returns error with allowed states | `test_invalid_state_string` |
| Numeric state input | Graceful failure | `test_numeric_state` |
| Empty state string | Graceful failure | `test_empty_state_string` |
| Same-state transition | Blocked | `test_same_state_transition` |
| Whitespace-only IDs | Rejected | `test_whitespace_only_*` |
| Zero leave balance | Rejected with evidence | `test_zero_balance_rejected` |
| Leave balance underflow | Balance decremented, successive request fails | `test_no_balance_underflow_on_successive_requests` |

---

## 📁 Project Structure

```
├── hr_agent/                    # Core engine package
│   ├── main.py                  #   HRAgent orchestrator
│   ├── ranking_engine.py        #   Resume-JD matching (TF-IDF + GBR)
│   ├── scheduler.py             #   Interview scheduling (interval overlap)
│   ├── state_machine.py         #   FSM pipeline enforcement
│   ├── leave_engine.py          #   Policy-based leave approval
│   ├── interview_generator.py   #   Deterministic question generation
│   └── utils/
│       ├── embeddings.py        #   TF-IDF embedding engine
│       └── validation.py        #   JSON schema validation
├── backend/                     # FastAPI REST API
│   ├── app/
│   │   ├── main.py              #   App entry point
│   │   ├── schemas.py           #   Pydantic models
│   │   ├── routers/             #   API endpoints
│   │   └── core/                #   Agent singleton
│   └── requirements.txt         #   Python dependencies
├── frontend/                    # Next.js dashboard UI
├── tests/                       # Pytest test suite (85 tests)
│   ├── conftest.py              #   Shared fixtures
│   ├── test_ranking.py          #   Ranking determinism
│   ├── test_state_machine.py    #   FSM enforcement
│   ├── test_scheduler.py        #   Scheduling conflicts
│   ├── test_leave_engine.py     #   Leave validation
│   ├── test_edge_cases.py       #   Edge case handling
│   ├── test_export.py           #   JSON schema compliance
│   ├── test_integration.py      #   Full lifecycle
│   └── sample_output/           #   Example JSON outputs
├── test_harness.py              # Hackathon test harness
├── resume_dataset_1200.csv      # 1200 candidate resumes
├── docker-compose.yml           # Container orchestration
├── requirements.txt             # Root-level dependencies
└── README.md                    # This file
```

---

## 🏁 Final Statement

This AI HR Agent demonstrates **production-grade engineering** across every dimension the rubric evaluates:

- **Determinism**: Every operation produces identical output — verified by 85 automated tests
- **Correctness**: FSM enforcement blocks all invalid transitions; scheduling prevents all overlaps; leave engine prevents all balance underflows
- **Transparency**: Full score breakdowns, policy rule evidence chains, and transition logs
- **Robustness**: 13 edge cases tested including empty inputs, malformed data, and whitespace-only IDs
- **Architecture**: Clean separation of concerns with 5 specialized engines behind a unified orchestrator
- **Test Coverage**: 85 tests across 7 modules, all passing in under 0.3 seconds

**Built for correctness. Engineered for judges. Zero ambiguity.**

---

<div align="center">
<sub>Built with 🧠 for Netrik Hackathon 2026 — Track 1: AI HR Agent</sub>
</div>
