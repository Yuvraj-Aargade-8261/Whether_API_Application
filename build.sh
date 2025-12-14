#!/bin/bash
# Build script for Vercel - copies frontend to public directory
echo "Building for Vercel..."
if [ -d "frontend" ]; then
    echo "Copying frontend files to public directory..."
    mkdir -p public
    cp -r frontend/* public/
    echo "Build complete!"
else
    echo "Error: frontend directory not found"
    exit 1
fi

