"""
Simple runner script for the Weather API Application
"""

import os
import sys

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

if __name__ == '__main__':
    from app import app
    
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"""
    ╔══════════════════════════════════════════════════════════╗
    ║     Weather API Application - Python Backend              ║
    ║     Running on http://localhost:{port}                      ║
    ║     Open http://localhost:{port} in your browser            ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    app.run(host='0.0.0.0', port=port, debug=debug)

