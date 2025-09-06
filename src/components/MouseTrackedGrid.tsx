"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function MouseTrackedGrid() {
  const [mousePosition, setMousePosition] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    setIsTransitioning(false);
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      setIsTransitioning(true);
      rafRef.current = requestAnimationFrame(() => {
        const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
        const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
        setMousePosition({ x: centerX, y: centerY });
      });
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition]);

  // Calculate percentage position for mask
  const xPercent = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth) * 100 : 50;
  const yPercent = typeof window !== 'undefined' ? (mousePosition.y / window.innerHeight) * 100 : 50;

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, #000000 1px, transparent 1px),
          linear-gradient(to bottom, #000000 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
        WebkitMaskImage: `radial-gradient(ellipse 100% 100% at ${xPercent}% ${yPercent}%, #000 5%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.1) 35%, transparent 45%)`,
        maskImage: `radial-gradient(ellipse 100% 100% at ${xPercent}% ${yPercent}%, #000 5%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.4) 25%, rgba(0,0,0,0.1) 35%, transparent 45%)`,
        transition: isTransitioning ? "mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}
    />
  );
}
