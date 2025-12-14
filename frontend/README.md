# Weather API Application - Frontend

A modern, responsive, and animated web frontend for the Weather API Application. Built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **Modern UI Design**: Beautiful, dark-themed interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Weather Data**: Fetch current weather and 5-day forecasts
- **Search History**: Track your recent searches with local storage
- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **Error Handling**: Graceful error messages and loading states
- **Animations**: Smooth transitions and interactive elements
- **Accessibility**: Keyboard navigation and screen reader support

## 📁 Project Structure

```
frontend/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Main stylesheet
│   ├── animations.css  # Animation definitions
│   └── responsive.css  # Responsive design rules
├── js/
│   ├── config.js       # Configuration and constants
│   ├── utils.js        # Utility functions
│   ├── api.js          # API integration logic
│   ├── ui.js           # UI management
│   └── app.js          # Main application logic
├── assets/
│   ├── images/         # Image files
│   ├── icons/          # Icon files
│   └── fonts/            # Font files
└── README.md           # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone or download the project**
   ```bash
   cd frontend
   ```

2. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

3. **Set API Key**
   - When you first open the application, you'll be prompted to enter your API key
   - The key will be stored in your browser's localStorage
   - Alternatively, you can set it programmatically using `App.setApiKey('your-key')` in the browser console

4. **Run the Application**
   
   **Option 1: Direct File Opening**
   - Simply open `index.html` in your web browser
   - Note: Some browsers may restrict API calls when opening files directly
   
   **Option 2: Local Web Server (Recommended)**
   
   Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   Using Node.js (with http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```
   
   Then open `http://localhost:8000` in your browser

## 📖 Usage

1. **Enter a City Name**
   - Type the name of any city in the search box
   - Press Enter or click the search button

2. **View Current Weather**
   - The main view shows current weather conditions
   - Includes temperature, humidity, wind speed, pressure, and more

3. **View 5-Day Forecast**
   - Click the "Forecast" tab to see 5-day weather predictions
   - Each day shows average temperature and conditions

4. **View Search History**
   - Click the "History" tab to see your recent searches
   - Click any history item to search again
   - Clear history with the "Clear History" button

5. **Toggle Units**
   - Use the °C/°F buttons to switch between metric and imperial units

## 🎨 Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #4A90E2;
    --bg-primary: #0A0E27;
    /* ... more variables */
}
```

### Animations

Modify animation timings and effects in `css/animations.css`.

### API Configuration

Update API settings in `js/config.js`:

```javascript
const CONFIG = {
    API: {
        BASE_URL: 'https://api.openweathermap.org/data/2.5',
        // ... more settings
    }
}
```

## 🔧 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🐛 Troubleshooting

### API Key Issues
- Make sure your API key is valid and active
- Check that you haven't exceeded the free tier rate limits
- Verify the key is correctly stored in localStorage

### Network Errors
- Check your internet connection
- Verify CORS settings if using a local server
- Some browsers block mixed content (HTTP/HTTPS)

### Styling Issues
- Clear browser cache
- Ensure all CSS files are loaded
- Check browser console for errors

### Data Not Loading
- Verify API key is set
- Check browser console for error messages
- Ensure city name is spelled correctly

## 🔒 Security Notes

- API keys are stored in browser localStorage (not secure for production)
- For production, implement proper backend API key management
- Never commit API keys to version control
- Use environment variables or secure storage in production

## 📝 Development

### Adding New Features

1. **New UI Component**: Add HTML in `index.html`, styles in `css/styles.css`
2. **New Functionality**: Add logic in appropriate JS file or create new module
3. **New Animation**: Define in `css/animations.css`

### Code Structure

- **config.js**: All constants and configuration
- **utils.js**: Reusable utility functions
- **api.js**: API communication logic
- **ui.js**: DOM manipulation and UI updates
- **app.js**: Application orchestration and event handling

## 🚀 Deployment

### Static Hosting Options

1. **GitHub Pages**
   - Push to GitHub repository
   - Enable GitHub Pages in settings
   - Access via `username.github.io/repo-name`

2. **Netlify**
   - Drag and drop the `frontend` folder
   - Or connect GitHub repository
   - Automatic deployments on push

3. **Vercel**
   - Import GitHub repository
   - Automatic deployments
   - Free SSL certificate

4. **Traditional Web Hosting**
   - Upload all files via FTP
   - Ensure proper file permissions
   - Configure web server if needed

## 📄 License

This project is part of the Weather API Application tutorial.

## 🤝 Contributing

This is a learning project. Feel free to fork, modify, and enhance!

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review browser console for errors
- Verify API key and network connectivity

---

**Note**: This is the frontend-only version. The backend Python implementation is separate and should be integrated for production use.

