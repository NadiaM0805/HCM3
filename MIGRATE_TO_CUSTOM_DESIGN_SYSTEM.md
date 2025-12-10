# Migration Guide: From @phenom Packages to Custom Components

This guide will help you migrate your project from `@phenom/react-ds` packages to custom components, eliminating the need for private registry access during deployment.

## Why Migrate?

- **Deployment Issues**: Private registries require VPN access and can cause build failures on platforms like Netlify/Vercel
- **Independence**: Custom components give you full control over styling and behavior
- **Easier Maintenance**: No dependency on external private packages

## Step-by-Step Migration

### Step 1: Audit Current Usage

First, identify all `@phenom` components being used:

```bash
# Find all imports
grep -r "@phenom/react-ds" --include="*.tsx" --include="*.ts" .

# List unique components
grep -r "@phenom/react-ds" --include="*.tsx" --include="*.ts" . | \
  grep -o "@phenom/react-ds/[^\"']*" | \
  sort -u
```

Common components:
- `@phenom/react-ds/button`
- `@phenom/react-ds/badge`
- `@phenom/react-ds/card`
- `@phenom/react-ds/modal`
- `@phenom/react-ds/snackbar`
- `@phenom/react-ds/progressbar`

### Step 2: Create Design System Directory

```bash
mkdir -p components/design-system
```

### Step 3: Create Custom Components

#### Button Component

Create `components/design-system/Button.tsx`:

```tsx
"use client";

import React from "react";

export interface ButtonProps {
  buttonType?: "primary" | "secondary" | "neutral";
  label: string;
  onClick?: () => void;
  onFocus?: () => void;
  onMouseEnter?: () => void;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  buttonType = "primary",
  label,
  onClick,
  onFocus,
  onMouseEnter,
  size = "medium",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const sizeClasses = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-6 py-3",
  };
  const typeClasses = {
    primary: "bg-[#4d3ee0] text-white hover:bg-[#3a2ea8]",
    secondary: "bg-white text-[#4d3ee0] border border-[#4d3ee0] hover:bg-[#f0f0ff]",
    neutral: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[buttonType]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {label}
    </button>
  );
}
```

#### Badge Component

Create `components/design-system/Badge.tsx`:

```tsx
"use client";

import React from "react";

export interface BadgeProps {
  value: string;
  type?: "filled" | "success" | "grey" | "warning" | "error";
  size?: "small" | "medium" | "large";
}

export function Badge({ value, type = "filled", size = "medium" }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full font-medium";
  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-2.5 py-1",
    large: "text-base px-3 py-1.5",
  };
  const typeClasses = {
    filled: "bg-[#4d3ee0] text-white",
    success: "bg-green-100 text-green-800",
    grey: "bg-gray-100 text-gray-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[type]}`}>
      {value}
    </span>
  );
}
```

#### Card Component (with nested components)

Create `components/design-system/Card.tsx`:

```tsx
"use client";

import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
    </div>
  );
};

Card.Content = function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
};
```

#### Modal Component (with nested components)

Create `components/design-system/Modal.tsx`:

```tsx
"use client";

import React from "react";

export interface ModalProps {
  visible: boolean;
  onHide: () => void;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const sizeMap = {
  small: "w-[400px]",
  medium: "w-[600px]",
  large: "w-[800px]",
};

const ModalContext = React.createContext<{ onHide: () => void }>({ onHide: () => {} });

export function Modal({ visible, onHide, size = "medium", children }: ModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onHide}>
      <div
        className={`${sizeMap[size]} max-w-[90vw] relative bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContext.Provider value={{ onHide }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>
  );
}

Modal.Header = function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 relative flex items-center justify-between">
      {children}
    </div>
  );
};

Modal.Header.Title = function ModalHeaderTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-xl font-semibold text-gray-900">{children}</div>;
};

Modal.Header.CloseButton = function ModalHeaderCloseButton({ onClick }: { onClick?: () => void }) {
  const { onHide } = React.useContext(ModalContext);
  const handleClick = onClick || onHide;
  
  return (
    <button
      onClick={handleClick}
      className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center"
      aria-label="Close"
    >
      ×
    </button>
  );
};

Modal.Content = function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 p-6 overflow-y-auto">{children}</div>;
};
```

#### Snackbar/Toast

Create `components/design-system/Snackbar.tsx`:

```tsx
"use client";

// Option 1: Simple console-based (for basic use)
export const toast = {
  success: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast success:", message);
    }
  },
  error: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast error:", message);
    }
  },
  info: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast info:", message);
    }
  },
  warning: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast warning:", message);
    }
  },
};

export function Snackbar() {
  return null;
}

// Option 2: Use sonner library (if you want actual toast notifications)
// import { toast as sonnerToast } from "sonner";
// export const toast = {
//   success: (message: string) => sonnerToast.success(message),
//   error: (message: string) => sonnerToast.error(message),
//   info: (message: string) => sonnerToast.info(message),
//   warning: (message: string) => sonnerToast.warning(message),
// };
// export { Toaster as Snackbar } from "sonner";
```

#### ProgressBar Component

Create `components/design-system/ProgressBar.tsx`:

```tsx
"use client";

import React from "react";

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className = "",
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-[#4d3ee0] h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-600 mt-1">{percentage.toFixed(1)}%</div>
      )}
    </div>
  );
}
```

### Step 4: Create Index File

Create `components/design-system/index.ts`:

```tsx
export { Button, type ButtonProps } from "./Button";
export { Badge, type BadgeProps } from "./Badge";
export { Card, type CardProps } from "./Card";
export { Modal, type ModalProps } from "./Modal";
export { Snackbar, toast } from "./Snackbar";
export { ProgressBar, type ProgressBarProps } from "./ProgressBar";
```

### Step 5: Replace All Imports

Use find and replace (or a script) to update all imports:

**Before:**
```tsx
import { Button } from "@phenom/react-ds/button";
import { Badge } from "@phenom/react-ds/badge";
import { Card } from "@phenom/react-ds/card";
import { Modal } from "@phenom/react-ds/modal";
import { toast } from "@phenom/react-ds/snackbar";
import { ProgressBar } from "@phenom/react-ds/progressbar";
```

**After:**
```tsx
import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";
import { Card } from "@/components/design-system/Card";
import { Modal } from "@/components/design-system/Modal";
import { toast } from "@/components/design-system/Snackbar";
import { ProgressBar } from "@/components/design-system/ProgressBar";
```

Or use the index file:
```tsx
import { Button, Badge, Card, Modal, toast, ProgressBar } from "@/components/design-system";
```

### Step 6: Update package.json

Remove `@phenom/react-ds` from dependencies:

```json
{
  "dependencies": {
    // Remove this line:
    // "@phenom/react-ds": "^0.7.0",
    
    // Keep all other dependencies
  }
}
```

### Step 7: Update .npmrc (if present)

Remove or comment out `@phenom` registry configuration:

```ini
# Remove or comment these lines:
# @phenom:registry=https://pie-nexus.phenompro.com/repository/pie-npm-group
# //pie-nexus.phenompro.com/repository/:_auth=${NPM_TOKEN}
```

### Step 8: Test the Migration

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Check for TypeScript errors:**
   ```bash
   npm run lint
   ```

3. **Test in development:**
   ```bash
   npm run dev
   ```

4. **Verify all components:**
   - Check that all buttons render correctly
   - Verify badges show the right colors
   - Test modals open and close
   - Ensure nested components work (`Card.Header`, `Modal.Header.Title`, etc.)
   - Test toast notifications

### Step 9: Customize Styling

Adjust the Tailwind classes in your custom components to match your exact design:

- **Colors**: Update hex codes to match your brand colors
- **Spacing**: Adjust padding and margins
- **Typography**: Match font sizes and weights
- **Shadows**: Adjust shadow styles
- **Borders**: Match border radius and colors

## Tips

1. **Preserve API**: Keep the exact same props and nested component structure
2. **Match Visuals**: Use browser dev tools to inspect original components and match styles
3. **Test Thoroughly**: Test all component variants and edge cases
4. **TypeScript**: Ensure all components are properly typed
5. **Accessibility**: Maintain accessibility features (ARIA labels, keyboard navigation)

## Troubleshooting

### Issue: Nested components not working

**Solution**: Ensure nested components are attached to the parent component function:
```tsx
Card.Header = function CardHeader(...) { ... };
```

### Issue: TypeScript errors on nested components

**Solution**: Add type declarations:
```tsx
export interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<CardHeaderProps>;
  Content: React.FC<CardContentProps>;
}
```

### Issue: Styling doesn't match

**Solution**: Use browser dev tools to inspect the original components and copy exact CSS values

## After Migration

Once migration is complete:
- ✅ No dependency on private registry
- ✅ Builds work on any platform (Netlify, Vercel, etc.)
- ✅ Full control over component styling and behavior
- ✅ Easier to customize and maintain

