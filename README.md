# Weather API Application

A complete Weather API Application project with a **Python Flask backend** and a modern, responsive frontend built with vanilla HTML, CSS, and JavaScript.

## 📋 Project Overview

This project consists of a beautiful, animated frontend for fetching and displaying weather data from the OpenWeatherMap API. The frontend is fully functional and can work standalone, with plans for Python backend integration.

## 🎯 Features

### Frontend Features
- ✨ **Modern UI Design**: Dark-themed interface with smooth animations
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- 🌤️ **Current Weather**: Real-time weather data for any city
- 📅 **5-Day Forecast**: Extended weather predictions
- 📜 **Search History**: Track recent searches with localStorage
- 🌡️ **Unit Toggle**: Switch between Celsius and Fahrenheit
- ⚡ **Smooth Animations**: Engaging user experience
- 🎨 **Beautiful Design**: Professional, polished interface
- ♿ **Accessible**: Keyboard navigation and screen reader support

## 📁 Project Structure

```
PyCharmMiscProject/
├── app.py                    # Flask application entry point
├── run.py                    # Simple runner script
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables (API key)
├── .gitignore               # Git ignore rules
├── backend/                  # Python backend package
│   ├── __init__.py
│   ├── weather_service.py   # OpenWeatherMap API integration
│   └── utils.py             # Utility functions
├── frontend/                 # Frontend application
│   ├── index.html           # Main HTML file
│   ├── css/                 # Stylesheets
│   │   ├── styles.css      # Main styles
│   │   ├── animations.css   # Animation definitions
│   │   └── responsive.css   # Responsive design
│   ├── js/                  # JavaScript modules
│   │   ├── config.js        # Configuration
│   │   ├── utils.js         # Utility functions
│   │   ├── api.js           # Backend API integration
│   │   ├── ui.js            # UI management
│   │   └── app.js           # Main application
│   ├── assets/              # Static assets
│   │   ├── images/         # Image files
│   │   ├── icons/          # Icon files
│   │   ├── fonts/          # Font files
│   │   └── data/           # Data files
│   ├── package.json         # NPM configuration (optional)
│   ├── README.md           # Frontend documentation
│   └── SETUP.md            # Quick setup guide
├── README.md                # This file (main documentation)
└── README_PYTHON.md         # Python backend documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)
- OpenWeatherMap API key (already configured: `6c693f3402e404265cfde9786cde3894`)

### Installation

1. **Create Virtual Environment (Recommended)**
   ```bash
   python -m venv venv
   
   # Windows:
   venv\Scripts\activate
   
   # macOS/Linux:
   source venv/bin/activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```
   
   Or use the runner script:
   ```bash
   python run.py
   ```

4. **Access the Application**
   - Open your browser
   - Navigate to `http://localhost:5000`
   - Start searching for cities!

### API Key Configuration

The API key is already configured in the `.env` file. If you need to change it:
1. Edit `.env` file
2. Update `OPENWEATHER_API_KEY` value
3. Restart the server

## 📖 Documentation

- **[Frontend README](frontend/README.md)**: Complete frontend documentation
- **[Quick Setup Guide](frontend/SETUP.md)**: 3-step setup instructions
- **[Assets README](frontend/assets/README.md)**: Asset organization guide

## 🛠️ Technology Stack

### Backend (Python)
- **Flask 3.0.0**: Web framework
- **flask-cors**: CORS support
- **requests**: HTTP library for API calls
- **python-dotenv**: Environment variable management

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, grid
- **Vanilla JavaScript**: No frameworks, pure JS
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins, Inter)

### API
- **OpenWeatherMap API**: Weather data source (accessed via Python backend)
- **RESTful API**: Python Flask endpoints

## 🎨 Design Features

- **Color Scheme**: Dark theme with vibrant accents
- **Typography**: Modern, readable fonts
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Breakpoints**: Mobile-first design
- **Accessibility**: WCAG compliant

## 📱 Responsive Design

- **Desktop**: > 1024px - Full feature set
- **Tablet**: 768px - 1024px - Optimized layout
- **Mobile**: < 768px - Touch-optimized
- **Small Mobile**: < 480px - Compact view

## 🔧 Configuration

### API Configuration
Edit `frontend/js/config.js` to modify:
- API endpoints
- Default settings
- Error messages
- UI constants

### Styling
Edit `frontend/css/styles.css` CSS variables:
```css
:root {
    --primary-color: #4A90E2;
    --bg-primary: #0A0E27;
    /* ... more variables */
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Search for valid city
- [ ] Search for invalid city (error handling)
- [ ] Toggle between Celsius/Fahrenheit
- [ ] View 5-day forecast
- [ ] Check search history
- [ ] Clear history
- [ ] Test on mobile device
- [ ] Test keyboard navigation
- [ ] Test with no internet connection

## 🚀 Deployment

### Static Hosting Options

1. **GitHub Pages**
   - Push to GitHub
   - Enable Pages in repository settings
   - Access via `username.github.io/repo-name`

2. **Netlify**
   - Drag & drop `frontend` folder
   - Or connect GitHub repo
   - Automatic deployments

3. **Vercel**
   - Import GitHub repository
   - Zero-config deployment
   - Free SSL included

4. **Traditional Hosting**
   - Upload via FTP
   - Ensure proper file permissions

## 🔒 Security Notes

- API keys stored in browser localStorage (not secure for production)
- For production: implement backend API key management
- Never commit API keys to version control
- Use environment variables in production

## 📝 Development Roadmap

### Current Status
- ✅ Frontend UI complete
- ✅ API integration complete
- ✅ Responsive design complete
- ✅ Animations implemented
- ✅ Error handling implemented
- ✅ Search history feature
- ✅ Unit conversion

### Future Enhancements
- [ ] Python backend integration
- [ ] Database for history storage
- [ ] User authentication
- [ ] Weather alerts
- [ ] Map integration
- [ ] Weather charts/graphs
- [ ] PWA support
- [ ] Offline mode

## 🤝 Contributing

This is a learning project. Feel free to:
- Fork the repository
- Submit issues
- Suggest improvements
- Create pull requests

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🆘 Troubleshooting

### Common Issues

**API Key Not Working**
- Verify key is correct
- Check rate limits (free tier: 60 calls/min)
- Ensure key is active

**Data Not Loading**
- Check internet connection
- Verify city name spelling
- Check browser console for errors

**Styling Issues**
- Clear browser cache
- Ensure all CSS files load
- Check for JavaScript errors

**CORS Errors**
- Use a local web server instead of file://
- Check API endpoint URLs

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console
3. Verify API key and network
4. Check documentation files

## 🎓 Learning Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

---

**Built with ❤️ for learning and development**

*Note: This is the frontend-only version. Backend Python implementation will be added separately.*

