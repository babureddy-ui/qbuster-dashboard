"use client";

import { ConfigProvider, theme } from "antd";
import { useLayoutEffect, useState } from "react";

function getIsDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function AntdThemeProvider({
  children,
  initialIsDark = false,
}) {
  const [isDark, setIsDark] = useState(initialIsDark);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const dark = getIsDark();
    setIsDark(dark);
    setReady(true);

    const observer = new MutationObserver(() => {
      setIsDark(getIsDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Avoid painting Ant Design in the wrong theme (white flash / broken table styles).
  if (!ready) {
    return (
      <div
        className="min-h-full flex-1 bg-zinc-50 dark:bg-black"
        aria-busy="true"
      />
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2a6ab4",
          borderRadius: 8,
          colorBgContainer: isDark ? "#09090b" : "#ffffff",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
