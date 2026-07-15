"use client";

import { useEffect } from "react";
import { applyTheme, resolveTheme, THEME_STORAGE_KEY } from "@/lib/theme";

function applyThemeFromPortal(portal) {
  if (portal.classList.contains("dark")) {
    applyTheme("dark");
    return;
  }

  if (portal.classList.contains("light")) {
    applyTheme("light");
    return;
  }

  // Portal has no explicit theme yet — keep the stored/boot theme.
  applyTheme(resolveTheme());
}

export default function DevToolsThemeSync() {
  useEffect(() => {
    applyTheme(resolveTheme());

    if (process.env.NODE_ENV !== "development") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onSystemChange = () => {
        if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(media.matches ? "dark" : "light");
        }
      };
      media.addEventListener("change", onSystemChange);
      return () => media.removeEventListener("change", onSystemChange);
    }

    let observer;

    const attach = () => {
      const portal = document.querySelector("nextjs-portal");
      if (!portal) return false;

      applyThemeFromPortal(portal);
      observer = new MutationObserver(() => applyThemeFromPortal(portal));
      observer.observe(portal, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return true;
    };

    if (!attach()) {
      const interval = setInterval(() => {
        if (attach()) clearInterval(interval);
      }, 200);

      return () => {
        clearInterval(interval);
        observer?.disconnect();
      };
    }

    return () => observer?.disconnect();
  }, []);

  return null;
}
