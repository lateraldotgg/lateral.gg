"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

export default function CursorGradient() {
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

  return (
    <div
      className="absolute z-0"
      style={{
        top: "-50vh",
        left: "-50vw",
        width: "200vw",
        height: "200vh",
        background: "radial-gradient(circle at 50% 50%, #8B0000 0%, #4B0000 20%, #2B0000 40%, #000000 100%)",
        transform: `translate(${mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2}px, ${mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2}px)`,
        transition: isTransitioning ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}
    />
  );
}
