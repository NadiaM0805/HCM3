#!/bin/bash
# Custom install script for Netlify that continues even if @phenom/react-ds fails

set +e  # Don't exit on error

echo "Installing dependencies..."

# Try to install all dependencies
npm install --legacy-peer-deps

# Check if @phenom/react-ds was installed
if [ ! -d "node_modules/@phenom/react-ds" ]; then
  echo "⚠ @phenom/react-ds not available (private registry unreachable)"
  echo "  Creating stub modules to prevent import errors..."
  
  # Create stub directory structure
  mkdir -p node_modules/@phenom/react-ds
  
  # Get the project root (where package.json is)
  PROJECT_ROOT=$(pwd)
  
  # Create stub modules that re-export from fallbacks
  # Use absolute paths to avoid module resolution issues
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

  echo "✓ Stub modules created"
else
  echo "✓ @phenom/react-ds installed successfully"
fi

echo "✓ Dependencies ready"

