"""
Weather API Application - Utility Functions
Helper functions for validation and error handling
"""

from flask import jsonify
import re


def validate_city(city: str) -> bool:
    """
    Validate city name
    
    Args:
        city: City name to validate
        
    Returns:
        True if valid, False otherwise
    """
    if not city or not isinstance(city, str):
        return False
    
    city = city.strip()
    
    # Check length
    if len(city) == 0 or len(city) > 100:
        return False
    
    # Check for valid characters (letters, spaces, hyphens, apostrophes)
    if not re.match(r"^[a-zA-Z\s\-'\.]+$", city):
        return False
    
    return True


def sanitize_input(input_str: str) -> str:
    """
    Sanitize user input
    
    Args:
        input_str: Input string to sanitize
        
    Returns:
        Sanitized string
    """
    if not input_str or not isinstance(input_str, str):
        return ''
    
    # Remove HTML tags and trim
    sanitized = re.sub(r'<[^>]+>', '', input_str.strip())
    return sanitized


def handle_error(error: Exception) -> tuple:
    """
    Handle errors and return appropriate JSON response
    
    Args:
        error: Exception object
        
    Returns:
        Tuple of (JSON response, status code)
    """
    error_message = str(error)
    
    # Map common error messages
    if 'City not found' in error_message or '404' in error_message:
        return jsonify({
            'success': False,
            'error': 'City not found. Please check the spelling and try again.'
        }), 404
    
    elif 'Invalid API key' in error_message or '401' in error_message:
        return jsonify({
            'success': False,
            'error': 'Invalid API key. Please check your configuration.'
        }), 401
    
    elif 'Network error' in error_message or 'Connection' in error_message:
        return jsonify({
            'success': False,
            'error': 'Network error. Please check your internet connection.'
        }), 503
    
    elif 'timed out' in error_message.lower():
        return jsonify({
            'success': False,
            'error': 'Request timed out. Please try again.'
        }), 504
    
    else:
        return jsonify({
            'success': False,
            'error': error_message or 'An unexpected error occurred. Please try again.'
        }), 500


def format_temperature(temp: float, unit: str = 'metric') -> str:
    """
    Format temperature with unit
    
    Args:
        temp: Temperature value
        unit: Unit type ('metric' or 'imperial')
        
    Returns:
        Formatted temperature string
    """
    if temp is None:
        return '--'
    
    rounded = round(temp)
    unit_symbol = '°C' if unit == 'metric' else '°F'
    return f"{rounded}{unit_symbol}"


def format_wind_speed(speed: float, unit: str = 'metric') -> str:
    """
    Format wind speed with unit
    
    Args:
        speed: Wind speed value
        unit: Unit type ('metric' or 'imperial')
        
    Returns:
        Formatted wind speed string
    """
    if speed is None:
        return '--'
    
    rounded = round(speed)
    unit_text = 'km/h' if unit == 'metric' else 'mph'
    return f"{rounded} {unit_text}"


def convert_pressure_to_inhg(pressure_hpa: float) -> float:
    """
    Convert pressure from hPa to inHg
    
    Args:
        pressure_hpa: Pressure in hectopascals (hPa)
        
    Returns:
        Pressure in inches of mercury (inHg)
    """
    if pressure_hpa is None:
        return None
    
    # Conversion factor: 1 hPa = 0.0295299830714 inHg (precise)
    # Standard: 1 inHg = 33.8639 hPa, so 1 hPa = 1/33.8639 = 0.0295299830714
    # Using precise conversion for better accuracy
    return round(pressure_hpa * 0.0295299830714, 2)


def format_pressure(pressure_hpa: float) -> str:
    """
    Format pressure in inHg
    
    Args:
        pressure_hpa: Pressure in hectopascals
        
    Returns:
        Formatted pressure string in inHg
    """
    if pressure_hpa is None:
        return '--'
    
    pressure_inhg = convert_pressure_to_inhg(pressure_hpa)
    return f"{pressure_inhg:.2f} inHg"

