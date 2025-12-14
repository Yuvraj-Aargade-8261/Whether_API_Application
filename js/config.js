/**
 * Weather API Application - Configuration
 * Contains all configuration constants and settings
 */

const CONFIG = {
    // API Configuration - Now using Python backend
    API: {
        BASE_URL: '', // Backend URL (same origin)
        CURRENT_WEATHER_ENDPOINT: '/api/weather/current',
        FORECAST_ENDPOINT: '/api/weather/forecast',
        API_KEY: '', // No longer needed - handled by backend
        TIMEOUT: 10000, // 10 seconds
    },

    // Units
    UNITS: {
        METRIC: 'metric',
        IMPERIAL: 'imperial',
    },

    // Default Settings
    DEFAULTS: {
        CITY: 'London',
        UNIT: 'metric',
        LANGUAGE: 'en',
    },

    // Storage Keys
    STORAGE: {
        HISTORY: 'weather_app_history',
        SETTINGS: 'weather_app_settings',
        LAST_CITY: 'weather_app_last_city',
    },

    // UI Configuration
    UI: {
        TOAST_DURATION: 3000, // 3 seconds
        DEBOUNCE_DELAY: 500, // 500ms for search input
        ANIMATION_DURATION: 300,
    },

    // Weather Icon Mapping
    WEATHER_ICONS: {
        '01d': 'https://openweathermap.org/img/wn/01d@2x.png', // clear sky day
        '01n': 'https://openweathermap.org/img/wn/01n@2x.png', // clear sky night
        '02d': 'https://openweathermap.org/img/wn/02d@2x.png', // few clouds day
        '02n': 'https://openweathermap.org/img/wn/02n@2x.png', // few clouds night
        '03d': 'https://openweathermap.org/img/wn/03d@2x.png', // scattered clouds
        '03n': 'https://openweathermap.org/img/wn/03n@2x.png',
        '04d': 'https://openweathermap.org/img/wn/04d@2x.png', // broken clouds
        '04n': 'https://openweathermap.org/img/wn/04n@2x.png',
        '09d': 'https://openweathermap.org/img/wn/09d@2x.png', // shower rain
        '09n': 'https://openweathermap.org/img/wn/09n@2x.png',
        '10d': 'https://openweathermap.org/img/wn/10d@2x.png', // rain day
        '10n': 'https://openweathermap.org/img/wn/10n@2x.png', // rain night
        '11d': 'https://openweathermap.org/img/wn/11d@2x.png', // thunderstorm
        '11n': 'https://openweathermap.org/img/wn/11n@2x.png',
        '13d': 'https://openweathermap.org/img/wn/13d@2x.png', // snow
        '13n': 'https://openweathermap.org/img/wn/13n@2x.png',
        '50d': 'https://openweathermap.org/img/wn/50d@2x.png', // mist
        '50n': 'https://openweathermap.org/img/wn/50n@2x.png',
    },

    // Error Messages
    ERRORS: {
        INVALID_CITY: 'City not found. Please check the spelling and try again.',
        NETWORK_ERROR: 'Network error. Please check your internet connection.',
        API_ERROR: 'Unable to fetch weather data. Please try again later.',
        INVALID_API_KEY: 'Invalid API key. Please check your configuration.',
        TIMEOUT: 'Request timed out. Please try again.',
        UNKNOWN: 'An unexpected error occurred. Please try again.',
    },

    // Success Messages
    SUCCESS: {
        DATA_LOADED: 'Weather data loaded successfully!',
        HISTORY_CLEARED: 'Search history cleared.',
    },
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

