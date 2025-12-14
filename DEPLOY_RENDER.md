# 🚀 Deploy to Render - Step by Step Guide

Render is an excellent alternative to Vercel with great Python support and a free tier!

## Option 1: Deploy via Render Dashboard (Easiest)

### Step 1: Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub (free account)
3. Connect your GitHub account

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your repository:
   - Repository: `Yuvraj-Aargade-8261/Whether_API_Application`
   - Or paste: `https://github.com/Yuvraj-Aargade-8261/Whether_API_Application`

### Step 3: Configure Service
- **Name**: `weather-api-app` (or any name)
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`
- **Root Directory**: `.` (leave empty)

### Step 4: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**:
- `OPENWEATHER_API_KEY` = `6c693f3402e404265cfde9786cde3894`
- `FLASK_ENV` = `production`
- `PORT` = `10000`

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. Your app will be live at: `https://weather-api-app.onrender.com`

### Step 6: Update Frontend API URLs (If Needed)
The frontend should work automatically since it uses relative paths!

---

## Option 2: Deploy via Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy
```

---

## Free Tier Limits
- ✅ Free tier available
- ✅ 750 hours/month (enough for always-on)
- ✅ Automatic SSL
- ✅ Custom domains
- ⚠️ Sleeps after 15 min inactivity (free tier)
- ⚠️ Cold starts may take 30-60 seconds

---

## Troubleshooting
- **Build fails?** Check that `requirements.txt` includes `gunicorn`
- **App not loading?** Check environment variables
- **Static files not serving?** Flask should serve them automatically
- **Slow first load?** Normal on free tier (cold start)

---

**Your app will be live at: `https://your-app-name.onrender.com`** 🎉

