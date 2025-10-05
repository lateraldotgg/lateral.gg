"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconWrapperProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon;
  className?: string;
}

/**
 * IconWrapper component that renders icons with hydration mismatch protection.
 * This prevents hydration errors caused by browser extensions that modify SVG elements.
 */
export function IconWrapper({
  icon: Icon,
  className,
  suppressHydrationWarning = true,
  ...props
}: IconWrapperProps) {
  return (
    <Icon
      className={cn(className)}
      suppressHydrationWarning={suppressHydrationWarning}
      {...props}
    />
  );
}
