"use client";

import { useEffect, useState } from "react";

/**
 * Hook to safely handle hydration for components that may be affected by browser extensions.
 * Returns whether the component has mounted on the client side.
 */
export function useHydrationSafe() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

/**
 * Hook to create hydration-safe props for elements that may be modified by browser extensions.
 * Automatically adds suppressHydrationWarning for client-side rendering.
 */
export function useHydrationSafeProps<T extends Record<string, object>>(
  props: T
): T & { suppressHydrationWarning?: boolean } {
  const hasMounted = useHydrationSafe();

  return {
    ...props,
    suppressHydrationWarning: hasMounted,
  };
}

/**
 * Hook to handle browser extension modifications that might cause hydration mismatches.
 * Automatically normalizes common modifications made by extensions like Dark Reader.
 */
export function useExtensionSafe() {
  const [isExtensionSafe, setIsExtensionSafe] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    // Set up a timeout to allow browser extensions to initialize
    const timer = setTimeout(() => {
      setIsExtensionSafe(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return isExtensionSafe;
}
