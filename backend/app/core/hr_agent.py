"""Bridge between FastAPI and Python HR Agent."""

import sys
import os
from pathlib import Path

# Add parent directory to path to import hr_agent
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent))

from hr_agent.main import HRAgent

# Global singleton instance
_agent: HRAgent = None

def get_hr_agent() -> HRAgent:
    """Get or create the HR Agent singleton."""
    global _agent
    
    if _agent is None:
        _agent = HRAgent()
        # Load data from project root or environment
        project_root = Path(__file__).parent.parent.parent.parent
        
        resume_path = os.getenv("RESUME_CSV", str(project_root / "resume_dataset_1200.csv"))
        leave_path = os.getenv("LEAVE_EXCEL", str(project_root / "employee leave tracking data.xlsx"))
        
        # Ensure paths exist
        if not os.path.exists(resume_path):
            raise FileNotFoundError(f"Resume dataset not found at {resume_path}")
        if not os.path.exists(leave_path):
            raise FileNotFoundError(f"Leave data not found at {leave_path}")
        
        _agent.load_resume_data(resume_path)
        _agent.load_leave_data(leave_path)
    
    return _agent

def reset_agent():
    """Reset the agent (useful for testing)."""
    global _agent
    _agent = None
