"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, Suspense, lazy } from "react";

const Aurora = lazy(() => import("./aurora"));

export function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div className="aurora-canvas">
      <Suspense fallback={null}>
        <Aurora
          colorStops={["#6366f1", "#cb6ce6", "#ec4899"]}
          blend={0.75}
          amplitude={1.55}
          speed={0.28}
        />
      </Suspense>
    </div>
  );
}
