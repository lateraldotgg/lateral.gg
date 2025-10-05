"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  suppressHydrationWarning?: boolean;
}

/**
 * ClientOnly component that renders children only on the client side.
 * This prevents hydration mismatches caused by browser extensions that modify the DOM.
 *
 * @param children - The content to render only on the client
 * @param fallback - Optional fallback content to show during SSR
 * @param suppressHydrationWarning - Whether to suppress hydration warnings for this element
 */
export function ClientOnly({
  children,
  fallback = null,
  suppressHydrationWarning = true,
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return (
    <div suppressHydrationWarning={suppressHydrationWarning}>{children}</div>
  );
}

/**
 * Hook to check if the component is mounted on the client side.
 * Useful for preventing hydration mismatches in custom hooks.
 */
export function useClientOnly() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
