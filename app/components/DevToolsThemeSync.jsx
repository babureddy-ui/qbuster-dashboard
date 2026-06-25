"use client";

import { useEffect } from "react";

function applyThemeFromPortal(portal) {
  const html = document.documentElement;

  if (portal.classList.contains("dark")) {
    html.classList.add("dark");
    html.classList.remove("light");
    return;
  }

  if (portal.classList.contains("light")) {
    html.classList.add("light");
    html.classList.remove("dark");
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  html.classList.toggle("dark", prefersDark);
  html.classList.toggle("light", !prefersDark);
}

function applySystemTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", prefersDark);
  document.documentElement.classList.toggle("light", !prefersDark);
}

export default function DevToolsThemeSync() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      applySystemTheme();
      return;
    }

    let observer;

    const attach = () => {
      const portal = document.querySelector("nextjs-portal");
      if (!portal) {
        return false;
      }

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
        if (attach()) {
          clearInterval(interval);
        }
      }, 200);

      return () => {
        clearInterval(interval);
        observer?.disconnect();
      };
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      const portal = document.querySelector("nextjs-portal");
      if (portal && !portal.classList.contains("light") && !portal.classList.contains("dark")) {
        applyThemeFromPortal(portal);
      }
    };
    media.addEventListener("change", onSystemChange);

    return () => {
      observer?.disconnect();
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  return null;
}
