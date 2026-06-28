type ThemeTransitionOptions = {
  nextTheme: "light" | "dark";
  origin?: HTMLElement | null;
  reduceMotion?: boolean;
  updateTheme: (theme: "light" | "dark") => void;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function runThemeTransition({
  nextTheme,
  origin,
  reduceMotion,
  updateTheme,
}: ThemeTransitionOptions) {
  if (typeof document === "undefined") {
    updateTheme(nextTheme);
    return;
  }

  const viewTransitionDocument = document as ViewTransitionDocument;
  if (reduceMotion || prefersReducedMotion() || !viewTransitionDocument.startViewTransition) {
    updateTheme(nextTheme);
    return;
  }

  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const root = document.documentElement;
  root.style.setProperty("--theme-transition-x", `${x}px`);
  root.style.setProperty("--theme-transition-y", `${y}px`);
  root.style.setProperty("--theme-transition-radius", `${Math.ceil(radius)}px`);
  root.dataset.themeTransition = nextTheme;

  const transition = viewTransitionDocument.startViewTransition(() => {
    updateTheme(nextTheme);
  });

  transition.finished.finally(() => {
    delete root.dataset.themeTransition;
  });
}
