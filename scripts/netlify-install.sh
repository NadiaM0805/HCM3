#!/bin/bash
# Custom install script for Netlify that skips unreachable private registry

set +e  # Don't exit on error

echo "Installing dependencies (skipping optional @phenom/react-ds to avoid timeout)..."

# Create stub modules FIRST to prevent npm from trying to fetch the package
echo "Creating @phenom/react-ds stub modules..."
mkdir -p node_modules/@phenom/react-ds

# Get the project root (where package.json is)
PROJECT_ROOT=$(pwd)

# Create stub modules that re-export from fallbacks
cat > node_modules/@phenom/react-ds/package.json << 'EOF'
{
  "name": "@phenom/react-ds",
  "version": "0.7.0",
  "main": "index.js"
}
EOF

cat > node_modules/@phenom/react-ds/button.js << EOF
const path = require('path');
const fallbacks = require(path.join('${PROJECT_ROOT}', 'components', 'ui', 'fallbacks'));
module.exports = { Button: fallbacks.Button };
module.exports.Button = fallbacks.Button;
EOF

cat > node_modules/@phenom/react-ds/badge.js << EOF
const path = require('path');
const fallbacks = require(path.join('${PROJECT_ROOT}', 'components', 'ui', 'fallbacks'));
module.exports = { Badge: fallbacks.Badge };
module.exports.Badge = fallbacks.Badge;
EOF

cat > node_modules/@phenom/react-ds/card.js << EOF
const path = require('path');
const fallbacks = require(path.join('${PROJECT_ROOT}', 'components', 'ui', 'fallbacks'));
module.exports = { Card: fallbacks.Card };
module.exports.Card = fallbacks.Card;
EOF

cat > node_modules/@phenom/react-ds/snackbar.js << EOF
const path = require('path');
const fallbacks = require(path.join('${PROJECT_ROOT}', 'components', 'ui', 'fallbacks'));
module.exports = { 
  Snackbar: fallbacks.Snackbar,
  toast: fallbacks.toast 
};
module.exports.Snackbar = fallbacks.Snackbar;
module.exports.toast = fallbacks.toast;
EOF

cat > node_modules/@phenom/react-ds/modal.js << EOF
const path = require('path');
const fallbacks = require(path.join('${PROJECT_ROOT}', 'components', 'ui', 'fallbacks'));
module.exports = { Modal: fallbacks.Modal };
module.exports.Modal = fallbacks.Modal;
EOF

cat > node_modules/@phenom/react-ds/progressbar.js << EOF
const path = require('path');
const fallbacks = require(path.join('${PROJECT_ROOT}', 'components', 'ui', 'fallbacks'));
module.exports = { ProgressBar: fallbacks.ProgressBar };
module.exports.ProgressBar = fallbacks.ProgressBar;
EOF

cat > node_modules/@phenom/react-ds/styles.js << 'EOF'
// Stub styles - no styles needed for fallback components
EOF

cat > node_modules/@phenom/react-ds/index.js << EOF
// Main entry point
module.exports = require('./button');
EOF

echo "✓ Stub modules created"

# Now install dependencies, skipping optional ones to avoid timeout
echo "Installing other dependencies..."
npm install --legacy-peer-deps --no-optional

echo "✓ Dependencies ready"

