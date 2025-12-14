/**
 * Weather API Application - API Integration
 * Handles all API calls to OpenWeatherMap
 */

const WeatherAPI = {
    /**
     * Build API URL - Now uses Python backend
     * @param {string} endpoint - API endpoint
     * @param {object} params - Query parameters
     * @returns {string} Complete API URL
     */
    buildUrl(endpoint, params = {}) {
        // Use backend endpoint (relative URL)
        const baseUrl = endpoint;
        const queryParams = new URLSearchParams(params);
        return `${baseUrl}?${queryParams.toString()}`;
    },

    /**
     * Make API request
     * @param {string} url - API URL
     * @returns {Promise<Response>} Fetch response
     */
    async makeRequest(url) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                },
            });

            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(CONFIG.ERRORS.TIMEOUT);
            }
            throw error;
        }
    },

    /**
     * Get current weather for a city - Now uses Python backend
     * @param {string} city - City name
     * @param {string} unit - Unit type ('metric' or 'imperial')
     * @returns {Promise<object>} Weather data
     */
    async getCurrentWeather(city, unit = 'metric') {
        if (!Utils.validateCity(city)) {
            throw new Error(CONFIG.ERRORS.INVALID_CITY);
        }

        const url = this.buildUrl(CONFIG.API.CURRENT_WEATHER_ENDPOINT, {
            city: city,
            unit: unit,
        });

        try {
            const response = await this.makeRequest(url);
            
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Backend server not running. Please start the Flask server with: python app.py');
            }
            
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || CONFIG.ERRORS.API_ERROR);
            }

            return this.parseCurrentWeatherData(data.data);
        } catch (error) {
            if (error.message.includes('Backend server not running')) {
                throw error;
            } else if (error.message === CONFIG.ERRORS.TIMEOUT) {
                throw error;
            } else if (error.message === CONFIG.ERRORS.INVALID_CITY) {
                throw error;
            } else if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error(CONFIG.ERRORS.NETWORK_ERROR);
            } else if (error.message.includes('JSON')) {
                throw new Error('Backend server not running. Please start Flask with: python app.py and access via http://localhost:5000');
            } else {
                throw new Error(error.message || CONFIG.ERRORS.UNKNOWN);
            }
        }
    },

    /**
     * Get 5-day forecast for a city - Now uses Python backend
     * @param {string} city - City name
     * @param {string} unit - Unit type ('metric' or 'imperial')
     * @returns {Promise<Array>} Forecast data array
     */
    async getForecast(city, unit = 'metric') {
        if (!Utils.validateCity(city)) {
            throw new Error(CONFIG.ERRORS.INVALID_CITY);
        }

        const url = this.buildUrl(CONFIG.API.FORECAST_ENDPOINT, {
            city: city,
            unit: unit,
        });

        try {
            const response = await this.makeRequest(url);
            
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Backend server not running. Please start the Flask server with: python app.py');
            }
            
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || CONFIG.ERRORS.API_ERROR);
            }

            return this.parseForecastData(data.data);
        } catch (error) {
            if (error.message.includes('Backend server not running')) {
                throw error;
            } else if (error.message === CONFIG.ERRORS.TIMEOUT) {
                throw error;
            } else if (error.message === CONFIG.ERRORS.INVALID_CITY) {
                throw error;
            } else if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error(CONFIG.ERRORS.NETWORK_ERROR);
            } else if (error.message.includes('JSON')) {
                throw new Error('Backend server not running. Please start Flask with: python app.py and access via http://localhost:5000');
            } else {
                throw new Error(error.message || CONFIG.ERRORS.UNKNOWN);
            }
        }
    },

    /**
     * Parse current weather data from API response
     * Backend already parses the data, so we just format dates
     * @param {object} data - Parsed API response from backend
     * @returns {object} Weather data
     */
    parseCurrentWeatherData(data) {
        return {
            city: data.city || '',
            country: data.country || '',
            temperature: data.temperature,
            feelsLike: data.feelsLike,
            humidity: data.humidity,
            pressure: data.pressure,
            visibility: data.visibility,
            windSpeed: data.windSpeed,
            windDirection: data.windDirection,
            description: data.description || '',
            main: data.main || '',
            icon: data.icon || '01d',
            sunrise: data.sunrise ? new Date(data.sunrise) : null,
            sunset: data.sunset ? new Date(data.sunset) : null,
            timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
            coord: data.coord || {},
        };
    },

    /**
     * Parse forecast data from API response
     * Backend already parses the data, so we just format dates
     * @param {Array} data - Parsed forecast array from backend
     * @returns {Array} Forecast data array
     */
    parseForecastData(data) {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        // Backend already processes the data, just format dates
        return data.map(day => ({
            date: day.date ? new Date(day.date) : new Date(),
            temperature: day.temperature,
            description: day.description || '',
            icon: day.icon || '01d',
            main: day.main || '',
            items: day.items || [],
        }));
    },
};

