"use client";

import { usePathname } from "next/navigation";
import { pageRoutes } from "@/pages/routes";

function titleCaseSegment(segment) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function titleFromPath(pathname) {
  const routeKey = pathname?.replace(/^\//, "") || "";
  const match = pageRoutes.find((r) => r.route === routeKey);

  if (match?.name && !routeKey.includes("/")) {
    return match.name;
  }

  const segments = routeKey.split("/").filter(Boolean);
  if (segments.length === 0) return "Dashboard";

  return segments.map(titleCaseSegment).join(" / ");
}

export default function Header({ userName }) {
  const pathname = usePathname();
  const title = titleFromPath(pathname);

  return (
    <header className="fixed top-0 right-0 left-56 z-30 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {userName ? (
          <>
            Signed in as{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {userName}
            </span>
          </>
        ) : null}
      </p>
    </header>
  );
}
