# Hydration Fix Solution

This document explains the global hydration fix solution implemented to handle hydration mismatches caused by browser extensions.

## Problem

Browser extensions like Dark Reader can modify DOM elements after the initial render, causing hydration mismatches between server and client rendering. This results in console errors and potential UI inconsistencies.

## Solution Overview

The solution consists of multiple layers of protection:

1. **Global CSS fixes** (`src/styles/hydration-fix.css`)
2. **HydrationFix component** (`src/components/HydrationFix.tsx`)
3. **IconWrapper component** (`src/components/ui/icon-wrapper.tsx`)
4. **ClientOnly wrapper** (`src/components/ClientOnly.tsx`)
5. **Utility hooks** (`src/hooks/useHydrationSafe.ts`)

## Implementation Details

### 1. Global CSS Fixes

The CSS file provides base-level fixes for common browser extension modifications:

```css
/* Reset Dark Reader modifications */
svg[data-darkreader-inline-stroke] {
  stroke: currentColor !important;
}

/* Prevent layout shifts */
*[data-slot] svg,
.lucide-icon {
  contain: layout style paint;
}
```

### 2. HydrationFix Component

This component runs globally and:

- Normalizes DOM modifications made by browser extensions
- Uses MutationObserver to handle dynamic modifications
- Ensures consistent styling across the application

### 3. IconWrapper Component

A specialized wrapper for SVG icons that automatically handles hydration mismatches:

```tsx
import { IconWrapper } from "@/components/ui/icon-wrapper";

<IconWrapper icon={ChevronDown} className="-me-1 ms-auto" />;
```

### 4. ClientOnly Wrapper

For components that should only render on the client side:

```tsx
import { ClientOnly } from "@/components/ClientOnly";

<ClientOnly fallback={<div>Loading...</div>}>
  <ComponentThatMightBreak />
</ClientOnly>;
```

### 5. Utility Hooks

Hooks for handling hydration-safe rendering:

```tsx
import {
  useHydrationSafe,
  useHydrationSafeProps,
} from "@/hooks/useHydrationSafe";

function MyComponent() {
  const hasMounted = useHydrationSafe();
  const safeProps = useHydrationSafeProps({ className: "my-class" });

  if (!hasMounted) return <div>Loading...</div>;

  return <div {...safeProps}>Content</div>;
}
```

## Usage Guidelines

### For New Components

1. **Use IconWrapper for all SVG icons** instead of direct Lucide icons
2. **Use ClientOnly for components** that might be affected by browser extensions
3. **Use utility hooks** for custom hydration-safe logic

### For Existing Components

1. **Replace direct icon usage** with IconWrapper
2. **Add ClientOnly wrapper** if hydration errors occur
3. **Use suppressHydrationWarning** only as a last resort

### Best Practices

1. **Always prefer IconWrapper** over direct SVG rendering
2. **Use ClientOnly sparingly** - only when necessary
3. **Test with browser extensions** enabled during development
4. **Monitor console for hydration errors** and fix them proactively

## Browser Extensions Supported

This solution specifically handles:

- **Dark Reader** - Color scheme modifications
- **Ad blockers** - Element modifications
- **Accessibility extensions** - ARIA attribute changes
- **General DOM manipulation extensions**

## Testing

To test the solution:

1. Install Dark Reader browser extension
2. Enable dark mode
3. Check browser console for hydration errors
4. Verify UI renders correctly

## Maintenance

- Monitor for new browser extensions that might cause issues
- Update CSS selectors as needed
- Add new utility functions as patterns emerge
- Keep documentation updated with new solutions
