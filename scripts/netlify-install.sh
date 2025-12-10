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
cat > node_modules/@phenom/react-ds/modal.tsx << 'EOF'
import { Modal as FallbackModal } from './fallbacks';

// Re-export with nested structure preserved
export const Modal = FallbackModal;
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

# Create TypeScript declaration files for nested component structures
# This must match the actual structure in fallbacks.tsx
cat > node_modules/@phenom/react-ds/modal.d.ts << 'EOF'
import React from 'react';

export interface ModalProps {
  visible: boolean;
  onHide: () => void;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

// Declare the nested component structure to match fallbacks.tsx
declare const ModalComponent: React.FC<ModalProps> & {
  Header: React.FC<{ children: React.ReactNode }> & {
    Title: React.FC<{ children: React.ReactNode }>;
    CloseButton: React.FC<{ onClick?: () => void }>;
  };
  Content: React.FC<{ children: React.ReactNode }>;
};

export const Modal: typeof ModalComponent;
export type { ModalProps };
EOF

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

