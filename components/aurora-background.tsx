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
          colorStops={["#cb6ce6", "#7c3aed", "#cb6ce6"]}
          blend={0.4}
          amplitude={1.0}
          speed={0.35}
        />
      </Suspense>
    </div>
  );
}
