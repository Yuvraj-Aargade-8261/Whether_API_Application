"""
Weather API Application - Flask Backend
Main application entry point
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from backend.weather_service import WeatherService
from backend.utils import validate_city, handle_error

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='frontend', static_url_path='')
CORS(app)  # Enable CORS for frontend

# Configuration
API_KEY = os.getenv('OPENWEATHER_API_KEY', '6c693f3402e404265cfde9786cde3894')
if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY not found in environment variables")

# Initialize weather service
weather_service = WeatherService(API_KEY)


@app.route('/')
def index():
    """Serve the main frontend page"""
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from frontend directory"""
    return app.send_static_file(path)


@app.route('/api/weather/current', methods=['GET'])
def get_current_weather():
    """
    Get current weather for a city
    Query parameters:
        - city: City name (required)
        - unit: 'metric' or 'imperial' (optional, default: 'metric')
    """
    try:
        city = request.args.get('city', '').strip()
        unit = request.args.get('unit', 'metric').strip().lower()
        
        # Validate input
        if not city:
            return jsonify({
                'success': False,
                'error': 'City parameter is required'
            }), 400
        
        if not validate_city(city):
            return jsonify({
                'success': False,
                'error': 'Invalid city name'
            }), 400
        
        if unit not in ['metric', 'imperial']:
            unit = 'metric'
        
        # Get weather data
        weather_data = weather_service.get_current_weather(city, unit)
        
        return jsonify({
            'success': True,
            'data': weather_data
        })
        
    except Exception as e:
        return handle_error(e)


@app.route('/api/weather/forecast', methods=['GET'])
def get_forecast():
    """
    Get 5-day forecast for a city
    Query parameters:
        - city: City name (required)
        - unit: 'metric' or 'imperial' (optional, default: 'metric')
    """
    try:
        city = request.args.get('city', '').strip()
        unit = request.args.get('unit', 'metric').strip().lower()
        
        # Validate input
        if not city:
            return jsonify({
                'success': False,
                'error': 'City parameter is required'
            }), 400
        
        if not validate_city(city):
            return jsonify({
                'success': False,
                'error': 'Invalid city name'
            }), 400
        
        if unit not in ['metric', 'imperial']:
            unit = 'metric'
        
        # Get forecast data
        forecast_data = weather_service.get_forecast(city, unit)
        
        return jsonify({
            'success': True,
            'data': forecast_data
        })
        
    except Exception as e:
        return handle_error(e)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Weather API Application',
        'version': '1.0.0'
    })


if __name__ == '__main__':
    # Run the Flask app
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"""
    ╔══════════════════════════════════════════════════════════╗
    ║     Weather API Application - Flask Backend              ║
    ║     Running on http://localhost:{port}                      ║
    ║     API Key: {'*' * (len(API_KEY) - 4) + API_KEY[-4:]}                    ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    app.run(host='0.0.0.0', port=port, debug=debug)

