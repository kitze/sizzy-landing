"use client";

import { useEffect } from "react";

const LIGHT_THEME_COLOR = "#ffffff";
const DARK_THEME_COLOR = "#000000";

export function ThemeColorUpdater() {
  useEffect(() => {
    // Check if dark mode is enabled via CSS class on html element
    const isDark = document.documentElement.classList.contains("dark");
    const themeColor = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    } else {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      metaThemeColor.setAttribute("content", themeColor);
      document.head.appendChild(metaThemeColor);
    }

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      const newColor = isDarkNow ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
      metaThemeColor?.setAttribute("content", newColor);
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
