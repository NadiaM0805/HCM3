# Migration Prompt: Convert @phenom Packages to Custom Components

Copy this entire prompt and paste it into your other Cursor project:

---

**I need to migrate this project from `@phenom/react-ds` packages to custom components to avoid private registry dependency issues during deployment.**

## Task

1. **Find all `@phenom` usage:**
   - Search for all imports from `@phenom/react-ds/*`
   - List all components being used (Button, Badge, Card, Modal, etc.)
   - Identify all props and styling patterns

2. **Create custom components:**
   - Create a `components/design-system/` directory
   - For each `@phenom` component used, create a matching custom component
   - Match the exact API (props, nested components like `Card.Header`, `Modal.Header.Title`, etc.)
   - Match the visual styling using Tailwind CSS
   - Preserve all functionality (onClick handlers, disabled states, etc.)

3. **Replace all imports:**
   - Replace `@phenom/react-ds/button` → `@/components/design-system/Button`
   - Replace `@phenom/react-ds/badge` → `@/components/design-system/Badge`
   - Replace `@phenom/react-ds/card` → `@/components/design-system/Card`
   - Replace `@phenom/react-ds/modal` → `@/components/design-system/Modal`
   - Replace `@phenom/react-ds/snackbar` → `@/components/design-system/Snackbar`
   - Replace `@phenom/react-ds/progressbar` → `@/components/design-system/ProgressBar`
   - Replace any other `@phenom` imports

4. **Update package.json:**
   - Remove `@phenom/react-ds` from dependencies
   - Remove any `@phenom` registry configuration from `.npmrc` (if present)
   - Keep all other dependencies

5. **Test the migration:**
   - Ensure all components render correctly
   - Verify all props work as expected
   - Check that nested components (like `Card.Header`, `Modal.Header.Title`) work
   - Ensure styling matches the original design

## Component Requirements

### Button Component
- Props: `buttonType` ("primary" | "secondary" | "neutral"), `label`, `onClick`, `onFocus`, `onMouseEnter`, `size`, `fullWidth`, `disabled`, `type`, `className`
- Styling: Primary (purple #4d3ee0), Secondary (white with purple border), Neutral (gray)
- Hover states and disabled states

### Badge Component
- Props: `value`, `type` ("filled" | "success" | "grey" | "warning" | "error"), `size`
- Styling: Match the color scheme for each type

### Card Component
- Props: `children`, `className`
- Nested components: `Card.Header` (with `title`, `description` props), `Card.Content` (with `children`, `className` props)

### Modal Component
- Props: `visible`, `onHide`, `size` ("small" | "medium" | "large"), `children`
- Nested components: `Modal.Header`, `Modal.Header.Title`, `Modal.Header.CloseButton`, `Modal.Content`
- Backdrop overlay, centered positioning, size variants

### Snackbar/Toast
- Export `toast` object with methods: `success`, `error`, `info`, `warning`
- Export `Snackbar` component (can be a simple wrapper or use a library like `sonner`)

### ProgressBar Component
- Props: `value` (0-100), `max`, `className`, `showLabel`
- Visual progress bar with percentage

## Important Notes

- **Preserve exact API**: The custom components must have the same props and nested component structure as the original `@phenom` components
- **Match styling**: Use Tailwind CSS to match the visual appearance exactly
- **TypeScript**: Ensure all components are properly typed
- **Nested components**: Pay special attention to nested components like `Card.Header`, `Modal.Header.Title` - these must work exactly the same way

## Reference

You can reference the fallback components in this HCM3 project at `components/ui/fallbacks.tsx` for implementation examples, but adapt them to match the exact styling and behavior of the `@phenom` components in the target project.

---

**After migration, the project should build and deploy without needing access to the private `@phenom` registry.**

