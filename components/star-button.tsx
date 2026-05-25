"use client";
import React, { useRef, useEffect, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

function StarBackground({ color }: { color?: string }) {
  return (
    <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 40" fill="none">
      <g clipPath="url(#clip0)">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M56.1 3.96C56.46 3.96 56.76 4.26 56.76 4.62C56.76 4.98 56.46 5.28 56.1 5.28C55.74 5.28 55.44 4.98 55.44 4.62C55.44 4.26 55.74 3.96 56.1 3.96ZM40.26 17.16C40.62 17.16 40.92 17.46 40.92 17.82C40.92 18.18 40.62 18.48 40.26 18.48C39.9 18.48 39.6 18.18 39.6 17.82C39.6 17.46 39.9 17.16 40.26 17.16ZM74.58 5.28C74.94 5.28 75.24 5.58 75.24 5.94C75.24 6.3 74.94 6.6 74.58 6.6C74.22 6.6 73.92 6.3 73.92 5.94C73.92 5.58 74.22 5.28 74.58 5.28ZM21.66 33.52C22.02 33.52 22.32 33.82 22.32 34.18C22.32 34.54 22.02 34.84 21.66 34.84C21.3 34.84 21 34.54 21 34.18C21 33.82 21.3 33.52 21.66 33.52ZM7.5 32.2C7.86 32.2 8.16 32.5 8.16 32.86C8.16 33.22 7.86 33.52 7.5 33.52C7.14 33.52 6.84 33.22 6.84 32.86C6.84 32.5 7.14 32.2 7.5 32.2ZM60.34 27.34C60.7 27.34 61 27.64 61 28C61 28.36 60.7 28.66 60.34 28.66C59.98 28.66 59.68 28.36 59.68 28C59.68 27.64 59.98 27.34 60.34 27.34ZM85.66 24.34C86.02 24.34 86.32 24.64 86.32 25C86.32 25.36 86.02 25.66 85.66 25.66C85.3 25.66 85 25.36 85 25C85 24.64 85.3 24.34 85.66 24.34Z"
          fill={color || "currentColor"} />
      </g>
      <defs><clipPath id="clip0"><rect width="100" height="40" fill="white" /></clipPath></defs>
    </svg>
  );
}

interface StarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
}

export function StarButton({
  children, lightWidth = 110, duration = 3,
  lightColor = "#cb6ce6",
  backgroundColor = "currentColor",
  borderWidth = 1, className, ...props
}: StarButtonProps) {
  const pathRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const div = pathRef.current;
      div.style.setProperty('--path', `path('M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0')`);
    }
  }, []);

  return (
    <button
      style={{ '--duration': duration, '--light-width': `${lightWidth}px`, '--light-color': lightColor, '--border-width': `${borderWidth}px`, isolation: 'isolate' } as CSSProperties}
      ref={pathRef}
      className={cn("relative z-[3] overflow-hidden h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] text-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50 group/star-button", className)}
      {...props}
    >
      <div className="absolute aspect-square inset-0 animate-[star-btn_calc(var(--duration)*1s)_linear_infinite] bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)]"
        style={{ offsetPath: 'var(--path)', offsetDistance: '0%', width: 'var(--light-width)' } as CSSProperties} />
      <div className="absolute inset-0 z-[4] overflow-hidden rounded-[inherit] border-white/15"
        style={{ borderWidth: 'var(--border-width)' }} aria-hidden>
        <StarBackground color={backgroundColor} />
      </div>
      <span className="z-10 relative text-white">{children}</span>
    </button>
  );
}
