/**
 * Weather API Application - Main Application Logic
 * Coordinates all components and handles user interactions
 */

const App = {
    /**
     * Initialize the application
     */
    async init() {
        // Initialize UI
        UI.init();

        // Check if backend is running
        await this.checkBackend();

        // Setup event listeners
        this.setupEventListeners();

        // Check for API key (no longer needed, but kept for compatibility)
        this.checkApiKey();

        // Load history on init
        App.loadHistory();

        console.log('Weather API Application initialized');
    },

    /**
     * Check if backend server is running
     */
    async checkBackend() {
        try {
            const response = await fetch('/api/health', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Backend not available');
            }
            
            const data = await response.json();
            if (data.status === 'healthy') {
                console.log('✅ Backend server is running');
                return true;
            }
        } catch (error) {
            const errorMsg = `
⚠️ Backend Server Not Running!

Please start the Flask server:
1. Open terminal in project directory
2. Run: python app.py
3. Then access: http://localhost:5000

Current URL appears to be using PyCharm preview (port 63342).
The app requires Flask backend on port 5000.
            `;
            console.error(errorMsg);
            UI.showError('Backend server not running. Please start Flask with: python app.py and access via http://localhost:5000');
            UI.showToast('Backend server not running. Start Flask server first!', 'error');
            return false;
        }
    },

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Search button click
        UI.elements.searchBtn.addEventListener('click', () => {
            this.handleSearch();
        });

        // Enter key in input
        UI.elements.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Unit toggle buttons
        UI.elements.unitBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const unit = btn.dataset.unit;
                UI.state.currentUnit = unit;
                UI.updateUnitButtons();
                UI.saveSettings();

                // If we have current weather data, reload with new unit
                if (UI.state.currentWeatherData) {
                    const city = UI.elements.cityInput.value.trim();
                    if (city) {
                        this.searchWeather(city);
                    }
                }
            });
        });

        // Navigation buttons
        UI.elements.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                UI.switchView(view);
            });
        });

        // Clear history button
        if (UI.elements.clearHistoryBtn) {
            UI.elements.clearHistoryBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all search history?')) {
                    UI.clearHistory();
                }
            });
        }

        // Debounced search input (optional - for live search)
        const debouncedSearch = Utils.debounce(() => {
            // Could implement live search here if needed
        }, CONFIG.UI.DEBOUNCE_DELAY);
    },

    /**
     * Handle search action
     */
    handleSearch() {
        const city = UI.elements.cityInput.value.trim();
        
        if (!city) {
            UI.showToast('Please enter a city name', 'warning');
            UI.elements.cityInput.focus();
            return;
        }

        if (!Utils.validateCity(city)) {
            UI.showToast('Invalid city name', 'error');
            return;
        }

        this.searchWeather(city);
    },

    /**
     * Search weather for a city
     * @param {string} city - City name
     */
    async searchWeather(city) {
        const sanitizedCity = Utils.sanitizeInput(city);
        
        if (!sanitizedCity) {
            UI.showToast('Please enter a valid city name', 'warning');
            return;
        }

        // Update input
        UI.elements.cityInput.value = sanitizedCity;

        // Show loading
        UI.showLoading();
        UI.switchView('current');

        try {
            // Fetch current weather from backend
            const weatherData = await WeatherAPI.getCurrentWeather(
                sanitizedCity,
                UI.state.currentUnit
            );

            // Display weather
            UI.displayCurrentWeather(weatherData, UI.state.currentUnit);

            // Add to history
            UI.addToHistory(weatherData);

            // Save last city
            Utils.saveToStorage(CONFIG.STORAGE.LAST_CITY, sanitizedCity);

            // Show success toast
            UI.showToast(CONFIG.SUCCESS.DATA_LOADED, 'success');

        } catch (error) {
            console.error('Error fetching weather:', error);
            UI.showError(error.message || CONFIG.ERRORS.UNKNOWN);
            UI.showToast(error.message || CONFIG.ERRORS.UNKNOWN, 'error');
        }
    },

    /**
     * Load forecast for current city
     * @param {string} city - City name
     */
    async loadForecast(city) {
        if (!city) {
            city = UI.elements.cityInput.value.trim();
        }

        if (!city) {
            UI.showToast('Please search for a city first', 'warning');
            return;
        }

        try {
            const forecastData = await WeatherAPI.getForecast(city, UI.state.currentUnit);
            UI.displayForecast(forecastData, UI.state.currentUnit);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            UI.elements.forecastGrid.innerHTML = 
                `<p style="text-align: center; color: var(--error-color);">${error.message}</p>`;
        }
    },

    /**
     * Load and display search history
     */
    loadHistory() {
        const history = Utils.loadFromStorage(CONFIG.STORAGE.HISTORY, []);
        UI.displayHistory(history);
    },

    /**
     * Check if API key is configured
     * No longer needed - API key is handled by backend
     */
    checkApiKey() {
        // API key is now handled by the Python backend
        // No need to check or prompt for API key
        console.log('API key is managed by the backend server');
    },

    /**
     * Set API key programmatically
     * @param {string} apiKey - API key
     */
    setApiKey(apiKey) {
        Utils.setApiKey(apiKey);
        UI.showToast('API key updated successfully!', 'success');
    },
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for global access
window.App = App;
window.UI = UI;
window.WeatherAPI = WeatherAPI;
window.Utils = Utils;
window.CONFIG = CONFIG;

