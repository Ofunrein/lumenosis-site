"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function RotatingText({
  words,
  intervalMs = 2500,
  minWidth = "8ch",
  className,
}: {
  words: readonly string[];
  intervalMs?: number;
  minWidth?: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs, reduce]);

  return (
    <span
      className={`relative inline-block align-baseline ${className ?? ""}`}
      style={{ minWidth, perspective: "700px" }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, rotateX: -72, y: 12 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 72, y: -12 }}
          transition={{ duration: reduce ? 0 : 0.34, ease: "easeOut" }}
          className="inline-block origin-[50%_70%] will-change-transform"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
