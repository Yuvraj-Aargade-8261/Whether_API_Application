# 🚀 How to Start the Server

## ⚠️ Important: You MUST run the Flask server!

The application requires the **Python Flask backend** to be running. You cannot just open the HTML file directly.

## ✅ Correct Way to Run:

### Step 1: Open Terminal/Command Prompt
Navigate to the project directory:
```bash
cd C:\Users\yuvra\PyCharmMiscProject
```

### Step 2: Install Dependencies (if not done)
```bash
pip install -r requirements.txt
```

### Step 3: Start Flask Server
```bash
python app.py
```

You should see:
```
╔══════════════════════════════════════════════════════════╗
║     Weather API Application - Flask Backend              ║
║     Running on http://localhost:5000                      ║
╚══════════════════════════════════════════════════════════╝
```

### Step 4: Open in Browser
**IMPORTANT:** Use this URL:
```
http://localhost:5000
```

**NOT** the PyCharm preview URL (port 63342)

## ❌ Common Mistakes:

1. **Opening HTML file directly** - Won't work, needs Flask backend
2. **Using PyCharm preview** (port 63342) - Won't work, no API endpoints
3. **Not running Flask server** - API calls will fail

## 🔧 If You See JSON Errors:

If you see errors like:
- "Unexpected token '<', "<!doctype "... is not valid JSON"
- "Backend server not running"

**Solution:** Make sure Flask is running on port 5000 and access via `http://localhost:5000`

## 📝 Quick Checklist:

- [ ] Flask server is running (`python app.py`)
- [ ] Server shows "Running on http://localhost:5000"
- [ ] Browser URL is `http://localhost:5000` (not 63342)
- [ ] No errors in terminal

---

**Remember:** Always start Flask first, then open `http://localhost:5000` in your browser!

