# Weather API Application - Python Backend Setup

## 🐍 Python Backend Integration

This project now uses **Python Flask** as the backend, with the frontend calling the Python API instead of directly accessing OpenWeatherMap.

## 📋 Project Structure

```
PyCharmMiscProject/
├── app.py                      # Flask application entry point
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (API key)
├── .gitignore                  # Git ignore rules
├── backend/                    # Backend package
│   ├── __init__.py
│   ├── weather_service.py      # OpenWeatherMap API integration
│   └── utils.py                # Utility functions
└── frontend/                   # Frontend files (unchanged)
    ├── index.html
    ├── css/
    ├── js/
    └── assets/
```

## 🚀 Quick Start

### 1. Install Python Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure API Key

The API key is already configured in `.env` file:
```
OPENWEATHER_API_KEY=6c693f3402e404265cfde9786cde3894
```

If you need to change it, edit the `.env` file.

### 3. Run the Application

```bash
python app.py
```

The server will start on `http://localhost:5000`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## 📡 API Endpoints

### Current Weather
```
GET /api/weather/current?city=London&unit=metric
```

**Parameters:**
- `city` (required): City name
- `unit` (optional): 'metric' or 'imperial' (default: 'metric')

**Response:**
```json
{
    "success": true,
    "data": {
        "city": "London",
        "country": "GB",
        "temperature": 15.5,
        "feelsLike": 14.2,
        "humidity": 65,
        "pressure": 1013,
        "visibility": 10000,
        "windSpeed": 3.5,
        "description": "clear sky",
        "icon": "01d",
        ...
    }
}
```

### Forecast
```
GET /api/weather/forecast?city=London&unit=metric
```

**Parameters:**
- `city` (required): City name
- `unit` (optional): 'metric' or 'imperial' (default: 'metric')

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "date": "2025-12-15T00:00:00",
            "temperature": 16.2,
            "description": "clear sky",
            "icon": "01d",
            ...
        },
        ...
    ]
}
```

### Health Check
```
GET /api/health
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# OpenWeatherMap API Key
OPENWEATHER_API_KEY=your_api_key_here

# Flask Configuration
FLASK_DEBUG=False
PORT=5000
```

### Flask Settings

Edit `app.py` to modify:
- Port number
- Debug mode
- CORS settings

## 🏗️ Backend Architecture

### `app.py`
- Flask application initialization
- Route definitions
- Error handling
- Serves frontend static files

### `backend/weather_service.py`
- `WeatherService` class
- OpenWeatherMap API integration
- Data parsing and formatting
- Error handling

### `backend/utils.py`
- Input validation
- Error handling utilities
- Data formatting functions

## 🔒 Security Features

- API key stored in `.env` (not in code)
- Input validation and sanitization
- Error handling
- CORS enabled for frontend
- No API key exposure to frontend

## 🧪 Testing

### Test API Endpoints

```bash
# Test current weather
curl "http://localhost:5000/api/weather/current?city=London&unit=metric"

# Test forecast
curl "http://localhost:5000/api/weather/forecast?city=London&unit=metric"

# Test health check
curl "http://localhost:5000/api/health"
```

### Test in Browser

1. Start the server: `python app.py`
2. Open browser: `http://localhost:5000`
3. Search for a city
4. Check browser console for any errors

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or app.py
PORT=5001
```

### Module Not Found
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

### API Key Errors
- Verify API key in `.env` file
- Check API key is valid at OpenWeatherMap
- Ensure `.env` file is in root directory

### CORS Errors
- CORS is enabled in `app.py`
- If issues persist, check Flask-CORS configuration

## 📦 Dependencies

- **Flask 3.0.0**: Web framework
- **flask-cors 4.0.0**: CORS support
- **requests 2.31.0**: HTTP library for API calls
- **python-dotenv 1.0.0**: Environment variable management

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production (using Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker (optional)
Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## 📝 Notes

- API key is stored in `.env` file (already configured)
- Frontend automatically uses backend API endpoints
- No changes needed to frontend code
- Backend handles all OpenWeatherMap API calls
- Frontend only communicates with Python backend

## 🔄 Migration from Direct API

The frontend has been updated to:
- Call `/api/weather/current` instead of OpenWeatherMap directly
- Call `/api/weather/forecast` instead of OpenWeatherMap directly
- No longer require API key in frontend
- All API key management handled by backend

---

**Built with Python Flask** 🐍

