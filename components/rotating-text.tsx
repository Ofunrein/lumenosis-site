"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const activeWord = words[index] ?? words[0] ?? "";

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current === words.length - 1 ? 0 : current + 1));
    }, intervalMs);
    return () => window.clearInterval(intervalId);
  }, [words.length, intervalMs, reduce]);

  return (
    <span
      className={`relative inline-grid max-w-full justify-items-start overflow-hidden align-baseline ${className ?? ""}`}
      style={{ minWidth, minHeight: "1.16em", maxWidth: "100%" }}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="invisible col-start-1 row-start-1 max-w-full whitespace-nowrap px-1 font-semibold"
        aria-hidden="true"
      >
        {longestWord}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={activeWord}
          className="col-start-1 row-start-1 max-w-full whitespace-nowrap px-1 font-semibold will-change-transform"
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.36em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, y: 0 } : { opacity: 0, y: "-0.36em" }}
          transition={reduce ? { duration: 0 } : { duration: 0.34, ease: "easeOut" }}
        >
          {activeWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
