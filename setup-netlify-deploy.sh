#!/bin/bash

# Netlify Deployment Setup Script
# Run this script in your project root to set up Netlify deployment
# This handles @phenom packages and VPN requirements

set -e

echo "🚀 Setting up Netlify deployment..."

# Check if .npmrc exists
if [ ! -f ".npmrc" ]; then
    echo "⚠️  Warning: .npmrc not found. If you use @phenom packages, you'll need to create one."
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Check if @phenom packages are used
HAS_PHENOM_PACKAGES=false
if grep -q "@phenom" package.json 2>/dev/null; then
    HAS_PHENOM_PACKAGES=true
    echo "📦 Detected @phenom packages - will set up authentication"
fi

# 1. Create netlify.toml
echo "📝 Creating netlify.toml..."
cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF

# 2. Install Netlify Next.js plugin
echo "📦 Installing @netlify/plugin-nextjs..."
npm install --save-dev @netlify/plugin-nextjs

# 3. Create build script for handling .npmrc if Phenom packages are used
if [ "$HAS_PHENOM_PACKAGES" = true ]; then
    echo "🔐 Creating build script for @phenom authentication..."
    
    # Extract auth token from .npmrc if it exists
    AUTH_TOKEN=""
    if [ -f ".npmrc" ]; then
        AUTH_TOKEN=$(grep -oP '(?<=//pie-nexus.phenompro.com/repository/:_auth=")[^"]*' .npmrc 2>/dev/null || echo "")
    fi
    
    # Create netlify-build.sh
    cat > netlify-build.sh << 'SCRIPTEOF'
#!/bin/bash
set -e

# Create .npmrc for Netlify build
echo "legacy-peer-deps=true" > .npmrc
echo "@phenom:registry=https://pie-nexus.phenompro.com/repository/pie-npm-group" >> .npmrc

# Use environment variable if available, otherwise try to extract from git
if [ -n "$NPM_REGISTRY_AUTH" ]; then
    echo "//pie-nexus.phenompro.com/repository/:_auth=\"$NPM_REGISTRY_AUTH\"" >> .npmrc
    echo "✅ Using NPM_REGISTRY_AUTH environment variable"
else
    echo "⚠️  Warning: NPM_REGISTRY_AUTH not set. Build may fail if @phenom packages are required."
fi

# Add FontAwesome registry if needed
if grep -q "@fortawesome\|@awesome" package.json 2>/dev/null; then
    echo "@fortawesome:registry=https://npm.fontawesome.com/" >> .npmrc
    echo "@awesome.me:registry=https://npm.fontawesome.com/" >> .npmrc
    if [ -n "$FONTAWESOME_TOKEN" ]; then
        echo "//npm.fontawesome.com/:_authToken=$FONTAWESOME_TOKEN" >> .npmrc
    fi
fi

echo "loglevel=verbose" >> .npmrc
echo "timeout=60000" >> .npmrc

# Install dependencies and build
npm install
npm run build
SCRIPTEOF

    chmod +x netlify-build.sh
    
    # Update netlify.toml to use the build script
    cat > netlify.toml << EOF
[build]
  command = "bash netlify-build.sh"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF

    echo ""
    echo "✅ Build script created: netlify-build.sh"
    echo ""
    echo "📋 NEXT STEPS - Add these environment variables in Netlify:"
    echo ""
    if [ -n "$AUTH_TOKEN" ]; then
        echo "   1. Go to: Netlify Dashboard → Your Site → Site Settings → Environment Variables"
        echo "   2. Add variable:"
        echo "      Name:  NPM_REGISTRY_AUTH"
        echo "      Value: $AUTH_TOKEN"
    else
        echo "   1. Go to: Netlify Dashboard → Your Site → Site Settings → Environment Variables"
        echo "   2. Add variable:"
        echo "      Name:  NPM_REGISTRY_AUTH"
        echo "      Value: (get this from your .npmrc file, line with //pie-nexus.phenompro.com/repository/:_auth)"
    fi
    
    if grep -q "@fortawesome\|@awesome" package.json 2>/dev/null; then
        echo ""
        echo "   3. If using FontAwesome, also add:"
        echo "      Name:  FONTAWESOME_TOKEN"
        echo "      Value: (get from .npmrc, line with //npm.fontawesome.com/:_authToken)"
    fi
    echo ""
else
    echo "✅ No @phenom packages detected - standard deployment setup complete"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Files created:"
echo "   - netlify.toml"
if [ "$HAS_PHENOM_PACKAGES" = true ]; then
    echo "   - netlify-build.sh"
fi
echo ""
echo "🔗 Next: Connect your GitHub repo to Netlify and deploy!"
echo "   Netlify will automatically detect the netlify.toml configuration."
