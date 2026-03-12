"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/presentation/components/ui/button";

type ThemeMode = "system" | "light" | "dark";

const THEME_KEY = "pwa-template-theme";

function applyTheme(mode: ThemeMode): void {
  const html = document.documentElement;

  if (mode === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.dataset.theme = prefersDark ? "dark" : "light";
    return;
  }

  html.dataset.theme = mode;
}

export function ThemeSwitcher() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const initial = saved ?? "system";
    setThemeMode(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ((localStorage.getItem(THEME_KEY) as ThemeMode | null) === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const handleChange = (mode: ThemeMode) => {
    localStorage.setItem(THEME_KEY, mode);
    setThemeMode(mode);
    applyTheme(mode);
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-2">
      <Button variant={themeMode === "light" ? "default" : "outline"} size="sm" onClick={() => handleChange("light")}>
        <Sun className="mr-1 h-4 w-4" /> Clar
      </Button>
      <Button variant={themeMode === "dark" ? "default" : "outline"} size="sm" onClick={() => handleChange("dark")}>
        <Moon className="mr-1 h-4 w-4" /> Fosc
      </Button>
      <Button variant={themeMode === "system" ? "default" : "outline"} size="sm" onClick={() => handleChange("system")}>
        <Monitor className="mr-1 h-4 w-4" /> Sistema
      </Button>
    </div>
  );
}
