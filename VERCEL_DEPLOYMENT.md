# 🚀 Vercel Deployment Guide

This guide will help you deploy your Weather API Application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed (optional, for CLI deployment)
3. Git repository (recommended)

## Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

## Step 2: Set Up Environment Variables

You need to add your OpenWeatherMap API key to Vercel:

### Via Vercel Dashboard:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add:
   - **Name**: `OPENWEATHER_API_KEY`
   - **Value**: `6c693f3402e404265cfde9786cde3894`
   - **Environment**: Production, Preview, Development (select all)

### Via CLI:
```bash
vercel env add OPENWEATHER_API_KEY
# Enter your API key when prompted
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**
   - Framework Preset: Other
   - Root Directory: `.` (root)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: (leave empty)

4. **Add Environment Variables**
   - Add `OPENWEATHER_API_KEY` as mentioned in Step 2

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Option B: Deploy via CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No**
   - Project name? (press Enter for default)
   - Directory? (press Enter for current directory)
   - Override settings? **No**

4. **Add Environment Variables**
   ```bash
   vercel env add OPENWEATHER_API_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 4: Update Frontend API Configuration (If Needed)

The frontend is already configured to work with relative API paths. However, if you need to use a different API endpoint, update `frontend/js/config.js`:

```javascript
API: {
    BASE_URL: '', // Empty for same domain, or use your Vercel URL
    ENDPOINTS: {
        CURRENT: '/api/weather/current',
        FORECAST: '/api/weather/forecast',
        HEALTH: '/api/health'
    }
}
```

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL (provided after deployment)
2. Test the weather search functionality
3. Check the browser console for any errors

## Project Structure for Vercel

```
.
├── api/
│   └── index.py          # Serverless function handler
├── backend/
│   ├── __init__.py
│   ├── utils.py
│   └── weather_service.py
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
├── vercel.json           # Vercel configuration
├── requirements.txt      # Python dependencies
└── .env                  # Local only (not deployed)
```

## Important Notes

1. **Environment Variables**: Never commit `.env` file. Always use Vercel's environment variables.

2. **API Routes**: All API routes are handled by the serverless function in `api/index.py`.

3. **Static Files**: Frontend files are served from the `frontend/` directory.

4. **Cold Starts**: Serverless functions may have cold starts. The first request might be slower.

5. **Rate Limits**: Be aware of Vercel's rate limits for serverless functions.

## Troubleshooting

### API Not Working
- Check environment variables are set correctly
- Verify API key is valid
- Check Vercel function logs

### Static Files Not Loading
- Ensure `vercel.json` routes are correct
- Check file paths in HTML/CSS/JS

### Build Errors
- Check Python version (Vercel uses Python 3.9 by default)
- Verify all dependencies in `requirements.txt`
- Check Vercel build logs

## Support

For issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Check function logs in Vercel dashboard
- Verify environment variables are set

---

**Happy Deploying! 🎉**

