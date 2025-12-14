"""
Vercel Serverless Function for Weather API Application
Handles all API routes for the weather application
"""

import json
import os
import sys
from urllib.parse import parse_qs

# Add parent directory to path to import backend modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.weather_service import WeatherService
from backend.utils import validate_city, handle_error

# Configuration
API_KEY = os.getenv('OPENWEATHER_API_KEY', '6c693f3402e404265cfde9786cde3894')
if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY not found in environment variables")

# Initialize weather service
weather_service = WeatherService(API_KEY)


def get_query_params(query_string):
    """Parse query string into dictionary"""
    if not query_string:
        return {}
    return {k: v[0] if len(v) == 1 else v for k, v in parse_qs(query_string).items()}


def create_response(body, status_code=200, headers=None):
    """Create Vercel response"""
    default_headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    if headers:
        default_headers.update(headers)
    
    return {
        'statusCode': status_code,
        'headers': default_headers,
        'body': json.dumps(body) if isinstance(body, dict) else body
    }


def handler(request):
    """Vercel serverless function handler"""
    # Vercel passes request as dict
    # Handle both 'path' and 'url' formats
    path = request.get('path', '') or (request.get('url', '').split('?')[0] if request.get('url') else '')
    method = request.get('method', 'GET') or request.get('httpMethod', 'GET')
    query_string = request.get('queryStringParameters', {}) or {}
    
    # Parse query string from URL if needed
    if not query_string and '?' in request.get('url', ''):
        from urllib.parse import urlparse, parse_qs
        parsed = urlparse(request.get('url', ''))
        query_string = {k: v[0] if len(v) == 1 else v for k, v in parse_qs(parsed.query).items()}
    
    # Handle OPTIONS for CORS
    if method == 'OPTIONS':
        return create_response({}, 200)
    
    # Route handling - Vercel routes /api/* to this function
    # So path might be '/api/weather/current' or just '/weather/current'
    route_path = path.replace('/api', '') if path.startswith('/api') else path
    
    if route_path == '/weather/current' or route_path.endswith('/weather/current') or path.endswith('/api/weather/current'):
        city = query_string.get('city', '').strip()
        unit = query_string.get('unit', 'metric').strip().lower()
        
        if not city:
            return create_response({
                'success': False,
                'error': 'City parameter is required'
            }, 400)
        
        if not validate_city(city):
            return create_response({
                'success': False,
                'error': 'Invalid city name'
            }, 400)
        
        if unit not in ['metric', 'imperial']:
            unit = 'metric'
        
        try:
            weather_data = weather_service.get_current_weather(city, unit)
            return create_response({
                'success': True,
                'data': weather_data
            })
        except Exception as e:
            # handle_error returns (Flask response, status_code)
            try:
                flask_response, status_code = handle_error(e)
                # Extract JSON from Flask response
                if hasattr(flask_response, 'get_json'):
                    error_data = flask_response.get_json()
                else:
                    error_data = {'success': False, 'error': str(e)}
                return create_response(error_data, status_code)
            except Exception as err:
                return create_response({
                    'success': False,
                    'error': str(e)
                }, 500)
    
    elif route_path == '/weather/forecast' or route_path.endswith('/weather/forecast'):
        city = query_string.get('city', '').strip()
        unit = query_string.get('unit', 'metric').strip().lower()
        
        if not city:
            return create_response({
                'success': False,
                'error': 'City parameter is required'
            }, 400)
        
        if not validate_city(city):
            return create_response({
                'success': False,
                'error': 'Invalid city name'
            }, 400)
        
        if unit not in ['metric', 'imperial']:
            unit = 'metric'
        
        try:
            forecast_data = weather_service.get_forecast(city, unit)
            return create_response({
                'success': True,
                'data': forecast_data
            })
        except Exception as e:
            # handle_error returns (Flask response, status_code)
            try:
                flask_response, status_code = handle_error(e)
                # Extract JSON from Flask response
                if hasattr(flask_response, 'get_json'):
                    error_data = flask_response.get_json()
                else:
                    error_data = {'success': False, 'error': str(e)}
                return create_response(error_data, status_code)
            except Exception as err:
                return create_response({
                    'success': False,
                    'error': str(e)
                }, 500)
    
    elif route_path == '/health' or route_path.endswith('/health'):
        return create_response({
            'status': 'healthy',
            'service': 'Weather API Application',
            'version': '1.0.0'
        })
    
    else:
        return create_response({
            'success': False,
            'error': 'Endpoint not found'
        }, 404)

