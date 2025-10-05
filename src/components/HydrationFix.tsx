"use client";

import { useEffect } from "react";

/**
 * HydrationFix component that applies global fixes for hydration mismatches
 * caused by browser extensions. This should be added to the root layout.
 */
export function HydrationFix() {
  useEffect(() => {
    // Function to normalize DOM modifications made by browser extensions
    const normalizeExtensionModifications = () => {
      // Handle Dark Reader modifications
      const darkReaderElements = document.querySelectorAll(
        '[data-darkreader-inline-stroke], [style*="--darkreader-inline-stroke"]'
      );

      darkReaderElements.forEach((element) => {
        if (element instanceof SVGElement) {
          // Ensure consistent stroke handling
          element.style.setProperty("stroke", "currentColor", "important");
        }
      });

      // Handle other common browser extension modifications
      const svgElements = document.querySelectorAll("svg[data-slot]");
      svgElements.forEach((svg) => {
        if (svg instanceof SVGElement) {
          // Ensure consistent display behavior
          svg.style.setProperty("display", "inline-block");
          svg.style.setProperty("vertical-align", "middle");
        }
      });
    };

    // Apply fixes immediately
    normalizeExtensionModifications();

    // Set up a MutationObserver to handle dynamic modifications
    const observer = new MutationObserver((mutations) => {
      let shouldNormalize = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const target = mutation.target as Element;
          if (
            target.hasAttribute("data-darkreader-inline-stroke") ||
            target.getAttribute("style")?.includes("--darkreader-inline-stroke")
          ) {
            shouldNormalize = true;
          }
        }
      });

      if (shouldNormalize) {
        normalizeExtensionModifications();
      }
    });

    // Start observing
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "data-darkreader-inline-stroke"],
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything
  return null;
}
