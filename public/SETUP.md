# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Get Your API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account (no credit card required)
3. Navigate to API keys section
4. Copy your API key

### Step 2: Run the Application

**Option A: Simple File Opening**
- Double-click `index.html` to open in your browser
- Enter your API key when prompted

**Option B: Local Server (Recommended)**
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```
Then visit `http://localhost:8000`

### Step 3: Start Using
1. Enter a city name (e.g., "London", "New York", "Tokyo")
2. Press Enter or click search
3. Explore current weather, forecast, and history tabs

## ✅ That's It!

You're ready to use the Weather API Application frontend.

## 📝 Notes

- API key is stored in browser localStorage
- No backend required for frontend-only usage
- Works offline for UI, but needs internet for weather data
- Free API tier: 60 calls/minute, 1,000,000 calls/month

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Verify API key is correct
- Check browser console for errors
- Ensure internet connection is active

