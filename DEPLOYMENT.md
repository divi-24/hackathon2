# Deployment Guide

## Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variable:
   - `NEXT_PUBLIC_API_URL` → Your Render backend URL (e.g., `https://hr-agent-api.onrender.com`)
3. Vercel auto-deploys on push to main branch

## Backend (Render)

1. Connect your GitHub repository to Render
2. Create Web Service:
   - Environment: Python
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Set environment variables:
   - `FRONTEND_URL` → Your Vercel frontend URL
   - `DEBUG` → `false`
   - `PYTHON_VERSION` → `3.10.0`
4. Ensure CSV/XLSX files are in root directory

## Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Access at http://localhost:3000
