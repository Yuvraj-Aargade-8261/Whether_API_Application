#!/usr/bin/env python3
"""
Build script for Vercel - copies frontend to public directory
"""
import os
import shutil
from pathlib import Path

def main():
    frontend_dir = Path("frontend")
    public_dir = Path("public")
    
    if not frontend_dir.exists():
        print("Error: frontend directory not found")
        return 1
    
    # Create public directory
    if public_dir.exists():
        shutil.rmtree(public_dir)
    public_dir.mkdir(parents=True, exist_ok=True)
    
    # Copy all files from frontend to public
    for item in frontend_dir.iterdir():
        dest = public_dir / item.name
        if item.is_dir():
            shutil.copytree(item, dest)
        else:
            shutil.copy2(item, dest)
    
    print("Build complete! Frontend files copied to public/")
    return 0

if __name__ == "__main__":
    exit(main())

