"""
Setup script for Weather API Application
Helps with initial setup and dependency installation
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is 3.8 or higher"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        print(f"   Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version.split()[0]}")
    return True

def create_env_file():
    """Create .env file if it doesn't exist"""
    if os.path.exists('.env'):
        print("✅ .env file already exists")
        return
    
    env_content = """# OpenWeatherMap API Key
OPENWEATHER_API_KEY=6c693f3402e404265cfde9786cde3894

# Flask Configuration
FLASK_DEBUG=False
PORT=5000
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    print("✅ Created .env file with API key")

def install_dependencies():
    """Install Python dependencies"""
    print("\n📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def main():
    """Main setup function"""
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║     Weather API Application - Setup Script                ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Create .env file
    create_env_file()
    
    # Install dependencies
    if not install_dependencies():
        print("\n⚠️  You can manually install dependencies with:")
        print("   pip install -r requirements.txt")
        sys.exit(1)
    
    print("""
    ✅ Setup complete!
    
    To run the application:
        python app.py
    
    Or use the runner:
        python run.py
    
    Then open http://localhost:5000 in your browser
    """)

if __name__ == '__main__':
    main()

