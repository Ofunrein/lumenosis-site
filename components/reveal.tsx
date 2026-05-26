"use client";

import type { ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({ children, variant, delay, duration, className }: RevealProps) {
  void variant;
  void delay;
  void duration;

  return <div className={className}>{children}</div>;
}
