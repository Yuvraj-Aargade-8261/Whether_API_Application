/**
 * Weather API Application - UI Management
 * Handles all UI updates and interactions
 */

const UI = {
    // DOM Elements
    elements: {
        cityInput: null,
        searchBtn: null,
        unitBtns: null,
        navBtns: null,
        currentView: null,
        forecastView: null,
        historyView: null,
        weatherContent: null,
        loadingSpinner: null,
        errorMessage: null,
        toast: null,
        forecastGrid: null,
        historyList: null,
        clearHistoryBtn: null,
    },

    // Current state
    state: {
        currentUnit: 'metric',
        currentView: 'current',
        currentWeatherData: null,
        forecastData: null,
    },

    /**
     * Initialize UI elements
     */
    init() {
        this.elements.cityInput = document.getElementById('cityInput');
        this.elements.searchBtn = document.getElementById('searchBtn');
        this.elements.unitBtns = document.querySelectorAll('.unit-btn');
        this.elements.navBtns = document.querySelectorAll('.nav-btn');
        this.elements.currentView = document.getElementById('currentView');
        this.elements.forecastView = document.getElementById('forecastView');
        this.elements.historyView = document.getElementById('historyView');
        this.elements.weatherContent = document.getElementById('weatherContent');
        this.elements.loadingSpinner = document.getElementById('loadingSpinner');
        this.elements.errorMessage = document.getElementById('errorMessage');
        this.elements.toast = document.getElementById('toast');
        this.elements.forecastGrid = document.getElementById('forecastGrid');
        this.elements.historyList = document.getElementById('historyList');
        this.elements.clearHistoryBtn = document.getElementById('clearHistoryBtn');

        // Load saved unit preference
        const savedUnit = Utils.loadFromStorage(CONFIG.STORAGE.SETTINGS, {})?.unit;
        if (savedUnit) {
            this.state.currentUnit = savedUnit;
            this.updateUnitButtons();
        }

        // Load last city
        const lastCity = Utils.loadFromStorage(CONFIG.STORAGE.LAST_CITY);
        if (lastCity) {
            this.elements.cityInput.value = lastCity;
        }
    },

    /**
     * Show loading state
     */
    showLoading() {
        this.elements.loadingSpinner.style.display = 'flex';
        this.elements.weatherContent.style.display = 'none';
        this.elements.errorMessage.style.display = 'none';
    },

    /**
     * Hide loading state
     */
    hideLoading() {
        this.elements.loadingSpinner.style.display = 'none';
    },

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.elements.errorMessage.style.display = 'flex';
        this.elements.weatherContent.style.display = 'none';
        this.elements.loadingSpinner.style.display = 'none';
        document.getElementById('errorText').textContent = message;
    },

    /**
     * Display current weather data
     * @param {object} data - Weather data
     * @param {string} unit - Unit type
     */
    displayCurrentWeather(data, unit) {
        this.state.currentWeatherData = data;
        this.state.currentUnit = unit;

        // Update location info
        document.getElementById('cityName').textContent = data.city || '--';
        document.getElementById('countryName').textContent = data.country || '--';
        document.getElementById('currentDate').textContent = Utils.formatDate(new Date());

        // Update weather icon
        const iconUrl = Utils.getWeatherIcon(data.icon);
        const iconElement = document.getElementById('weatherIcon');
        iconElement.src = iconUrl;
        iconElement.alt = data.description || 'Weather icon';

        // Update temperature
        const tempElement = document.getElementById('temperature');
        tempElement.textContent = Math.round(data.temperature) || '--';
        
        const tempUnit = document.querySelector('.temp-unit');
        tempUnit.textContent = unit === 'metric' ? '°C' : '°F';

        // Update description
        document.getElementById('weatherDescription').textContent = 
            Utils.capitalize(data.description) || '--';

        // Update details
        document.getElementById('humidity').textContent = 
            data.humidity ? `${data.humidity}%` : '--%';
        document.getElementById('windSpeed').textContent = 
            Utils.formatWindSpeed(data.windSpeed, unit);
        document.getElementById('pressure').textContent = 
            Utils.formatPressure(data.pressure);
        document.getElementById('visibility').textContent = 
            Utils.formatVisibility(data.visibility);
        document.getElementById('feelsLike').textContent = 
            Utils.formatTemperature(data.feelsLike, unit);
        document.getElementById('uvIndex').textContent = 
            data.uvIndex !== undefined ? data.uvIndex : '--';

        // Show content
        this.elements.weatherContent.style.display = 'block';
        this.elements.loadingSpinner.style.display = 'none';
        this.elements.errorMessage.style.display = 'none';
    },

    /**
     * Display forecast data
     * @param {Array} forecastData - Forecast data array
     * @param {string} unit - Unit type
     */
    displayForecast(forecastData, unit) {
        this.state.forecastData = forecastData;
        this.elements.forecastGrid.innerHTML = '';

        if (!forecastData || forecastData.length === 0) {
            this.elements.forecastGrid.innerHTML = 
                '<p style="text-align: center; color: var(--text-muted); grid-column: 1 / -1;">No forecast data available.</p>';
            return;
        }

        forecastData.forEach((day, index) => {
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.style.animationDelay = `${index * 0.1}s`;

            const iconUrl = Utils.getWeatherIcon(day.icon);
            const tempUnit = unit === 'metric' ? '°C' : '°F';

            card.innerHTML = `
                <div class="forecast-date">${Utils.formatDate(day.date, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <img src="${iconUrl}" alt="${day.description}" class="forecast-icon">
                <div class="forecast-temp">${Math.round(day.temperature) || '--'}${tempUnit}</div>
                <div class="forecast-desc">${Utils.capitalize(day.description)}</div>
            `;

            this.elements.forecastGrid.appendChild(card);
        });
    },

    /**
     * Display search history
     * @param {Array} history - History array
     */
    displayHistory(history) {
        this.elements.historyList.innerHTML = '';
        const emptyHistory = document.getElementById('emptyHistory');

        if (!history || history.length === 0) {
            emptyHistory.style.display = 'block';
            return;
        }

        emptyHistory.style.display = 'none';

        history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.style.animationDelay = `${index * 0.1}s`;

            const tempUnit = item.unit === 'metric' ? '°C' : '°F';
            const temp = Math.round(item.temperature) || '--';

            historyItem.innerHTML = `
                <div class="history-item-content">
                    <div class="history-item-info">
                        <div class="history-item-city">${item.city}, ${item.country}</div>
                        <div class="history-item-time">${Utils.formatTime(item.timestamp)}</div>
                    </div>
                </div>
                <div class="history-item-temp">${temp}${tempUnit}</div>
            `;

            // Add click handler to search again
            historyItem.addEventListener('click', () => {
                this.elements.cityInput.value = item.city;
                App.searchWeather(item.city);
            });

            this.elements.historyList.appendChild(historyItem);
        });
    },

    /**
     * Switch view
     * @param {string} viewName - View name ('current', 'forecast', 'history')
     */
    switchView(viewName) {
        this.state.currentView = viewName;

        // Hide all views
        this.elements.currentView.classList.remove('active');
        this.elements.forecastView.classList.remove('active');
        this.elements.historyView.classList.remove('active');

        // Show selected view
        if (viewName === 'current') {
            this.elements.currentView.classList.add('active');
        } else if (viewName === 'forecast') {
            this.elements.forecastView.classList.add('active');
            // Load forecast if we have a city
            const city = this.elements.cityInput.value.trim();
            if (city && this.state.currentWeatherData) {
                App.loadForecast(city);
            }
        } else if (viewName === 'history') {
            this.elements.historyView.classList.add('active');
            App.loadHistory();
        }

        // Update nav buttons
        this.elements.navBtns.forEach(btn => {
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    /**
     * Update unit buttons
     */
    updateUnitButtons() {
        this.elements.unitBtns.forEach(btn => {
            if (btn.dataset.unit === this.state.currentUnit) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    /**
     * Show toast notification
     * @param {string} message - Toast message
     * @param {string} type - Toast type ('success', 'error', 'warning')
     */
    showToast(message, type = 'success') {
        const toast = this.elements.toast;
        const messageElement = toast.querySelector('.toast-message');
        
        toast.className = `toast ${type}`;
        messageElement.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, CONFIG.UI.TOAST_DURATION);
    },

    /**
     * Add to search history
     * @param {object} weatherData - Weather data to save
     */
    addToHistory(weatherData) {
        const history = Utils.loadFromStorage(CONFIG.STORAGE.HISTORY, []);
        
        // Add new entry
        const historyEntry = {
            id: Utils.generateId(),
            city: weatherData.city,
            country: weatherData.country,
            temperature: weatherData.temperature,
            description: weatherData.description,
            unit: this.state.currentUnit,
            timestamp: new Date().toISOString(),
        };

        // Remove duplicate entries for same city
        const filteredHistory = history.filter(
            item => !(item.city === historyEntry.city && item.country === historyEntry.country)
        );

        // Add to beginning and limit to 20 entries
        filteredHistory.unshift(historyEntry);
        const limitedHistory = filteredHistory.slice(0, 20);

        Utils.saveToStorage(CONFIG.STORAGE.HISTORY, limitedHistory);
    },

    /**
     * Clear search history
     */
    clearHistory() {
        Utils.clearStorage(CONFIG.STORAGE.HISTORY);
        this.displayHistory([]);
        this.showToast(CONFIG.SUCCESS.HISTORY_CLEARED, 'success');
    },

    /**
     * Save settings
     */
    saveSettings() {
        const settings = {
            unit: this.state.currentUnit,
        };
        Utils.saveToStorage(CONFIG.STORAGE.SETTINGS, settings);
    },
};

