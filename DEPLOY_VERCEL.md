# 🚀 Quick Vercel Deployment Guide

## Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- Git repository (GitHub/GitLab/Bitbucket)

## Quick Steps

### 1. Push to Git
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel

**Option A: Via Dashboard (Easiest)**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel auto-detects `vercel.json` - no configuration needed!
4. Add Environment Variable:
   - Name: `OPENWEATHER_API_KEY`
   - Value: `6c693f3402e404265cfde9786cde3894`
   - Environments: All (Production, Preview, Development)
5. Click **Deploy**
6. Wait ~2 minutes
7. Your app is live! 🎉

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add OPENWEATHER_API_KEY
# Enter: 6c693f3402e404265cfde9786cde3894

# Deploy to production
vercel --prod
```

## Project Structure
```
├── api/
│   └── index.py          # Serverless function (handles /api/*)
├── backend/              # Python backend modules
├── frontend/             # Static frontend files
├── vercel.json          # Vercel configuration
└── requirements.txt     # Python dependencies
```

## Environment Variables
- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

## After Deployment
- Your app will be at: `https://your-project-name.vercel.app`
- API endpoints work automatically
- Frontend is served from `/frontend/` directory
- All routes configured in `vercel.json`

## Troubleshooting
- **API not working?** Check environment variables in Vercel dashboard
- **Static files not loading?** Check `vercel.json` routes
- **Build errors?** Check Vercel function logs

---

**That's it! Your Weather App is now live on Vercel! 🌟**

