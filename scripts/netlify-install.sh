#!/bin/bash
# Custom install script for Netlify that continues even if @phenom/react-ds fails

echo "Installing dependencies..."

# Install dependencies, but continue even if optional ones fail
npm install --legacy-peer-deps 2>&1 | grep -v "@phenom/react-ds" || true

# If @phenom/react-ds failed to install, create stub modules
if [ ! -d "node_modules/@phenom/react-ds" ]; then
  echo "⚠ @phenom/react-ds not available, creating stub modules..."
  mkdir -p node_modules/@phenom/react-ds
  cat > node_modules/@phenom/react-ds/button.js << 'EOF'
module.exports = { Button: require('../../components/ui/fallbacks').Button };
EOF
  cat > node_modules/@phenom/react-ds/badge.js << 'EOF'
module.exports = { Badge: require('../../components/ui/fallbacks').Badge };
EOF
  cat > node_modules/@phenom/react-ds/card.js << 'EOF'
module.exports = { Card: require('../../components/ui/fallbacks').Card };
EOF
  cat > node_modules/@phenom/react-ds/snackbar.js << 'EOF'
const fallbacks = require('../../components/ui/fallbacks');
module.exports = { 
  Snackbar: fallbacks.Snackbar,
  toast: fallbacks.toast 
};
EOF
  cat > node_modules/@phenom/react-ds/styles.js << 'EOF'
// Stub styles file
EOF
fi

echo "✓ Dependencies ready"

