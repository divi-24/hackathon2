# Deployment Checklist

## Pre-Deployment

- [ ] All tests passing: `pytest tests/ -v`
- [ ] No hardcoded localhost URLs in code
- [ ] Environment variables properly configured
- [ ] CSV/XLSX data files committed to repo

## Vercel Frontend Deployment

1. [ ] Connect GitHub repo to Vercel
2. [ ] Set `NEXT_PUBLIC_API_URL` environment variable to Render backend URL
3. [ ] Configure custom domain (if needed)
4. [ ] Test health endpoint after deployment

## Render Backend Deployment

1. [ ] Create new Web Service on Render
2. [ ] Connect GitHub repository
3. [ ] Set environment variables:
   - [ ] `FRONTEND_URL` = Your Vercel frontend URL
   - [ ] `DEBUG` = `false`
   - [ ] `PYTHON_VERSION` = `3.10.0`
4. [ ] Build Command: `pip install -r backend/requirements.txt`
5. [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. [ ] Add health check path: `/health`
7. [ ] Wait for deployment to complete
8. [ ] Test `/health` endpoint

## Post-Deployment Testing

1. [ ] Frontend loads at Vercel URL
2. [ ] `/api/health` returns 200 from backend
3. [ ] CORS headers present in API responses
4. [ ] Resume ranking endpoint works: POST `/api/rank`
5. [ ] No 404 on static assets
6. [ ] Environment variables applied correctly

## Monitoring

- [ ] Monitor Render logs for errors
- [ ] Check Vercel analytics
- [ ] Set up error tracking (Sentry optional)
