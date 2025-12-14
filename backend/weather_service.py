"""
Weather API Application - Weather Service
Handles all interactions with OpenWeatherMap API
"""

import requests
from datetime import datetime
from typing import Dict, List, Optional, Any
from backend.utils import convert_pressure_to_inhg


class WeatherService:
    """Service class for fetching weather data from OpenWeatherMap API"""
    
    BASE_URL = 'https://api.openweathermap.org/data/2.5'
    TIMEOUT = 10  # seconds
    
    def __init__(self, api_key: str):
        """
        Initialize WeatherService
        
        Args:
            api_key: OpenWeatherMap API key
        """
        if not api_key:
            raise ValueError("API key is required")
        self.api_key = api_key
    
    def _make_request(self, endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make HTTP request to OpenWeatherMap API
        
        Args:
            endpoint: API endpoint (e.g., '/weather', '/forecast')
            params: Query parameters
            
        Returns:
            JSON response as dictionary
            
        Raises:
            Exception: If request fails
        """
        url = f"{self.BASE_URL}{endpoint}"
        params['appid'] = self.api_key
        
        try:
            response = requests.get(url, params=params, timeout=self.TIMEOUT)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.Timeout:
            raise Exception("Request timed out. Please try again.")
        except requests.exceptions.ConnectionError:
            raise Exception("Network error. Please check your internet connection.")
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                raise Exception("City not found. Please check the spelling and try again.")
            elif e.response.status_code == 401:
                raise Exception("Invalid API key. Please check your configuration.")
            else:
                error_data = e.response.json() if e.response.content else {}
                raise Exception(error_data.get('message', 'Unable to fetch weather data. Please try again later.'))
        except Exception as e:
            raise Exception(f"An unexpected error occurred: {str(e)}")
    
    def get_current_weather(self, city: str, unit: str = 'metric') -> Dict[str, Any]:
        """
        Get current weather for a city
        
        Args:
            city: City name
            unit: Unit type ('metric' or 'imperial')
            
        Returns:
            Parsed weather data dictionary
        """
        params = {
            'q': city,
            'units': unit,
            'lang': 'en'
        }
        
        data = self._make_request('/weather', params)
        return self._parse_current_weather(data)
    
    def get_forecast(self, city: str, unit: str = 'metric') -> List[Dict[str, Any]]:
        """
        Get 5-day forecast for a city
        
        Args:
            city: City name
            unit: Unit type ('metric' or 'imperial')
            
        Returns:
            List of forecast data dictionaries
        """
        params = {
            'q': city,
            'units': unit,
            'lang': 'en'
        }
        
        data = self._make_request('/forecast', params)
        return self._parse_forecast(data)
    
    def _parse_current_weather(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parse current weather data from API response
        
        Args:
            data: Raw API response
            
        Returns:
            Parsed weather data
        """
        return {
            'city': data.get('name', ''),
            'country': data.get('sys', {}).get('country', ''),
            'temperature': data.get('main', {}).get('temp'),
            'feelsLike': data.get('main', {}).get('feels_like'),
            'humidity': data.get('main', {}).get('humidity'),
            'pressure': convert_pressure_to_inhg(data.get('main', {}).get('pressure')),
            'visibility': data.get('visibility'),
            'windSpeed': data.get('wind', {}).get('speed'),
            'windDirection': data.get('wind', {}).get('deg'),
            'description': data.get('weather', [{}])[0].get('description', ''),
            'main': data.get('weather', [{}])[0].get('main', ''),
            'icon': data.get('weather', [{}])[0].get('icon', '01d'),
            'sunrise': datetime.fromtimestamp(data.get('sys', {}).get('sunrise', 0)) if data.get('sys', {}).get('sunrise') else None,
            'sunset': datetime.fromtimestamp(data.get('sys', {}).get('sunset', 0)) if data.get('sys', {}).get('sunset') else None,
            'timestamp': datetime.now().isoformat(),
            'coord': {
                'lat': data.get('coord', {}).get('lat'),
                'lon': data.get('coord', {}).get('lon'),
            },
        }
    
    def _parse_forecast(self, data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Parse forecast data from API response
        
        Args:
            data: Raw API response
            
        Returns:
            List of parsed forecast data
        """
        if not data.get('list') or not isinstance(data.get('list'), list):
            return []
        
        # Group forecasts by date
        forecasts_by_date = {}
        
        for item in data['list']:
            date = datetime.fromtimestamp(item.get('dt', 0))
            date_key = date.date().isoformat()
            
            if date_key not in forecasts_by_date:
                forecasts_by_date[date_key] = {
                    'date': date.isoformat(),
                    'items': [],
                }
            
            forecasts_by_date[date_key]['items'].append({
                'time': date.isoformat(),
                'temperature': item.get('main', {}).get('temp'),
                'feelsLike': item.get('main', {}).get('feels_like'),
                'humidity': item.get('main', {}).get('humidity'),
                'pressure': convert_pressure_to_inhg(item.get('main', {}).get('pressure')),
                'windSpeed': item.get('wind', {}).get('speed'),
                'description': item.get('weather', [{}])[0].get('description', ''),
                'icon': item.get('weather', [{}])[0].get('icon', '01d'),
                'main': item.get('weather', [{}])[0].get('main', ''),
            })
        
        # Convert to array and get daily averages
        forecast_array = []
        for date_key, day_data in list(forecasts_by_date.items())[:5]:  # Limit to 5 days
            items = day_data['items']
            temps = [item['temperature'] for item in items if item.get('temperature') is not None]
            avg_temp = sum(temps) / len(temps) if temps else None
            
            # Get most common weather condition for the day
            main_weather = items[0].get('main', '') if items else ''
            icon = items[0].get('icon', '01d') if items else '01d'
            description = items[0].get('description', '') if items else ''
            
            forecast_array.append({
                'date': day_data['date'],
                'temperature': avg_temp,
                'description': description,
                'icon': icon,
                'main': main_weather,
                'items': items,
            })
        
        return forecast_array

