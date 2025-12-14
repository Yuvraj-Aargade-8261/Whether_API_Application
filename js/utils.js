/**
 * Weather API Application - Utility Functions
 * Helper functions for common operations
 */

const Utils = {
    /**
     * Format temperature with unit
     * @param {number} temp - Temperature value
     * @param {string} unit - Unit type ('metric' or 'imperial')
     * @returns {string} Formatted temperature string
     */
    formatTemperature(temp, unit = 'metric') {
        if (temp === null || temp === undefined) return '--';
        const rounded = Math.round(temp);
        const unitSymbol = unit === 'metric' ? '°C' : '°F';
        return `${rounded}${unitSymbol}`;
    },

    /**
     * Format wind speed with unit
     * @param {number} speed - Wind speed in m/s or mph
     * @param {string} unit - Unit type
     * @returns {string} Formatted wind speed string
     */
    formatWindSpeed(speed, unit = 'metric') {
        if (speed === null || speed === undefined) return '--';
        const rounded = Math.round(speed);
        const unitText = unit === 'metric' ? 'km/h' : 'mph';
        return `${rounded} ${unitText}`;
    },

    /**
     * Format pressure
     * @param {number} pressure - Pressure in inHg (already converted by backend)
     * @returns {string} Formatted pressure string
     */
    formatPressure(pressure) {
        if (pressure === null || pressure === undefined || isNaN(pressure)) return '-- inHg';
        // Backend already rounds to 2 decimal places, but ensure it's a number
        const pressureNum = typeof pressure === 'number' ? pressure : parseFloat(pressure);
        if (isNaN(pressureNum)) return '-- inHg';
        return `${pressureNum.toFixed(2)} inHg`;
    },

    /**
     * Format visibility
     * @param {number} visibility - Visibility in meters
     * @returns {string} Formatted visibility string
     */
    formatVisibility(visibility) {
        if (visibility === null || visibility === undefined) return '--';
        const km = (visibility / 1000).toFixed(1);
        return `${km} km`;
    },

    /**
     * Format date
     * @param {Date|string|number} date - Date object, string, or timestamp
     * @param {object} options - Intl.DateTimeFormat options
     * @returns {string} Formatted date string
     */
    formatDate(date, options = {}) {
        if (!date) return '--';
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) return '--';

        const defaultOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options,
        };

        return dateObj.toLocaleDateString('en-US', defaultOptions);
    },

    /**
     * Format time
     * @param {Date|string|number} date - Date object, string, or timestamp
     * @returns {string} Formatted time string
     */
    formatTime(date) {
        if (!date) return '--';
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) return '--';
        return dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    },

    /**
     * Capitalize first letter of each word
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalize(str) {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Get weather icon URL
     * @param {string} iconCode - Weather icon code from API
     * @returns {string} Icon URL
     */
    getWeatherIcon(iconCode) {
        return CONFIG.WEATHER_ICONS[iconCode] || CONFIG.WEATHER_ICONS['01d'];
    },

    /**
     * Save to localStorage
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    /**
     * Load from localStorage
     * @param {string} key - Storage key
     * @param {any} defaultValue - Default value if key doesn't exist
     * @returns {any} Stored value or default
     */
    loadFromStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Clear localStorage key
     * @param {string} key - Storage key to clear
     */
    clearStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    },

    /**
     * Validate city name
     * @param {string} city - City name to validate
     * @returns {boolean} True if valid
     */
    validateCity(city) {
        if (!city || typeof city !== 'string') return false;
        const trimmed = city.trim();
        return trimmed.length > 0 && trimmed.length <= 100;
    },

    /**
     * Sanitize input
     * @param {string} input - Input to sanitize
     * @returns {string} Sanitized string
     */
    sanitizeInput(input) {
        if (!input || typeof input !== 'string') return '';
        return input.trim().replace(/[<>]/g, '');
    },

    /**
     * Get current timestamp
     * @returns {number} Current timestamp
     */
    getCurrentTimestamp() {
        return Date.now();
    },

    /**
     * Check if API key is set
     * @returns {boolean} Always true - API key is now handled by backend
     */
    hasApiKey() {
        return true; // API key is managed by Python backend
    },

    /**
     * Set API key - No longer needed, handled by backend
     * @param {string} key - API key (deprecated)
     */
    setApiKey(key) {
        // API key is now managed by the Python backend
        console.log('API key management moved to backend');
    },

    /**
     * Load API key from storage - No longer needed
     */
    loadApiKey() {
        // API key is now managed by the Python backend
        // No action needed
    },

    /**
     * Generate unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        if (num === null || num === undefined) return '--';
        return num.toLocaleString('en-US');
    },

    /**
     * Get UV index description
     * @param {number} uvIndex - UV index value
     * @returns {string} UV index description
     */
    getUvIndexDescription(uvIndex) {
        if (uvIndex === null || uvIndex === undefined) return '--';
        if (uvIndex <= 2) return 'Low';
        if (uvIndex <= 5) return 'Moderate';
        if (uvIndex <= 7) return 'High';
        if (uvIndex <= 10) return 'Very High';
        return 'Extreme';
    },
};

// Load API key on initialization
Utils.loadApiKey();

