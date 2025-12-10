#!/bin/bash
# Custom install script for Netlify that creates stubs AFTER npm install
# This works around VPN/firewall restrictions by using fallback components

set +e  # Don't exit on error

echo "Installing dependencies..."
npm install --legacy-peer-deps

# Create stub modules AFTER npm install (so npm doesn't remove them)
echo "Creating @phenom/react-ds stub modules with fallback components..."
mkdir -p node_modules/@phenom/react-ds

# Copy the fallback components file into the stub directory to avoid path issues
if [ -f "components/ui/fallbacks.tsx" ]; then
    cp components/ui/fallbacks.tsx node_modules/@phenom/react-ds/fallbacks.tsx
    echo "✓ Copied fallback components"
else
    echo "⚠️  Warning: components/ui/fallbacks.tsx not found"
fi

# Create stub modules that import from the local fallbacks file
cat > node_modules/@phenom/react-ds/package.json << 'EOF'
{
  "name": "@phenom/react-ds",
  "version": "0.7.0",
  "main": "index.js"
}
EOF

# Create stub files that import from the local fallbacks copy
cat > node_modules/@phenom/react-ds/button.tsx << 'EOF'
export { Button } from './fallbacks';
EOF

cat > node_modules/@phenom/react-ds/badge.tsx << 'EOF'
export { Badge } from './fallbacks';
EOF

cat > node_modules/@phenom/react-ds/card.tsx << 'EOF'
export { Card } from './fallbacks';
EOF

cat > node_modules/@phenom/react-ds/snackbar.tsx << 'EOF'
export { Snackbar } from './fallbacks';
export { toast } from './fallbacks';
EOF

# Create modal stub - import and re-export to preserve nested structure
# The nested components are attached in fallbacks.tsx, we just need to re-export
cat > node_modules/@phenom/react-ds/modal.tsx << 'EOF'
// Re-export Modal with all nested components preserved
export { Modal } from './fallbacks';
EOF

cat > node_modules/@phenom/react-ds/progressbar.tsx << 'EOF'
export { ProgressBar } from './fallbacks';
EOF

cat > node_modules/@phenom/react-ds/styles.js << 'EOF'
// Stub styles - no styles needed for fallback components
EOF

cat > node_modules/@phenom/react-ds/index.js << 'EOF'
// Main entry point
module.exports = require('./button');
EOF

# Note: Type declarations are in types/phenom-react-ds.d.ts
# We don't need a separate .d.ts file here since the types are already declared
# The modal.tsx file just needs to export the actual component with nested structure

# Create TypeScript declaration for Card nested components
cat > node_modules/@phenom/react-ds/card.d.ts << 'EOF'
import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title: string;
  description?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<CardHeaderProps>;
  Content: React.FC<CardContentProps>;
}

export const Card: CardComponent;
EOF

echo "✓ Stub modules created"
echo "✓ Dependencies ready"

