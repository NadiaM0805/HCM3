#!/bin/bash
# Custom install script for Netlify that creates stubs AFTER npm install

set +e  # Don't exit on error

echo "Installing dependencies..."
npm install --legacy-peer-deps

# Create stub modules AFTER npm install (so npm doesn't remove them)
echo "Creating @phenom/react-ds stub modules..."
mkdir -p node_modules/@phenom/react-ds

# Create stub modules that re-export from fallbacks using static paths
cat > node_modules/@phenom/react-ds/package.json << 'EOF'
{
  "name": "@phenom/react-ds",
  "version": "0.7.0",
  "main": "index.js"
}
EOF

# Create TypeScript stub files that Next.js can compile
# Use absolute path from project root to avoid case-sensitivity issues
PROJECT_ROOT=$(pwd)

# Create stub files using correct relative path (3 levels up from node_modules/@phenom/react-ds/)
cat > node_modules/@phenom/react-ds/button.tsx << 'EOF'
export { Button } from '../../../components/ui/fallbacks';
EOF

cat > node_modules/@phenom/react-ds/badge.tsx << 'EOF'
export { Badge } from '../../../components/ui/fallbacks';
EOF

cat > node_modules/@phenom/react-ds/card.tsx << 'EOF'
export { Card } from '../../../components/ui/fallbacks';
EOF

cat > node_modules/@phenom/react-ds/snackbar.tsx << 'EOF'
export { Snackbar, toast } from '../../../components/ui/fallbacks';
EOF

cat > node_modules/@phenom/react-ds/modal.tsx << 'EOF'
export { Modal } from '../../../components/ui/fallbacks';
EOF

cat > node_modules/@phenom/react-ds/progressbar.tsx << 'EOF'
export { ProgressBar } from '../../../components/ui/fallbacks';
EOF

cat > node_modules/@phenom/react-ds/styles.js << 'EOF'
// Stub styles - no styles needed for fallback components
EOF

cat > node_modules/@phenom/react-ds/index.js << EOF
// Main entry point
module.exports = require('./button');
EOF

echo "✓ Stub modules created"
echo "✓ Dependencies ready"

