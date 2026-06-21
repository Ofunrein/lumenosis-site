"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

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
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), ""),
    [words],
  );

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const timeoutId = window.setTimeout(() => {
      setIndex((current) => (current === words.length - 1 ? 0 : current + 1));
    }, intervalMs);
    return () => window.clearTimeout(timeoutId);
  }, [words.length, intervalMs, reduce]);

  return (
    <span
      className={`relative inline-flex justify-center overflow-hidden text-center align-baseline ${className ?? ""}`}
      style={{ minWidth, minHeight: "1.16em" }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {longestWord}
      </span>
      {words.map((word, wordIndex) => (
        <motion.span
          key={word}
          className="absolute whitespace-nowrap font-semibold will-change-transform"
          initial={{ opacity: 0, y: -100 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 50 }}
          animate={
            reduce
              ? { y: 0, opacity: wordIndex === 0 ? 1 : 0 }
              : index === wordIndex
                ? { y: 0, opacity: 1 }
                : { y: index > wordIndex ? -150 : 150, opacity: 0 }
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
