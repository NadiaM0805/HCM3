#!/bin/bash
# Test build script to catch issues before deploying
# Run this locally: bash scripts/test-build.sh

set -e  # Exit on error

echo "🧪 Testing build locally before deployment..."
echo ""

# Clean previous build
echo "Cleaning previous build..."
rm -rf .next
rm -rf node_modules/@phenom

# Run the install script
echo "Running install script..."
bash scripts/netlify-install.sh

# Test the build
echo "Testing Next.js build..."
npm run build

echo ""
echo "✅ Build test passed! Ready to deploy."

