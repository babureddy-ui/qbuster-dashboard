"use client";

import { useEffect, useState } from "react";
import LogoutButton from "@/components/buttions/LogoutButton";
import { JSON_HEADERS } from "@/lib/jsonHeaders";

function ApiDataBlock({ title, data }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <pre className="max-h-96 overflow-auto rounded-lg bg-zinc-100 p-4 text-xs text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default function WelcomePage({ userName }) {
  const [page, setPage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      setError("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/pages", {
          headers: JSON_HEADERS,
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load page");
          return;
        }

        setPage(data.page);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPage();
  }, []);

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Welcome
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Hello,{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {userName}
            </span>
            . You have successfully logged in.
          </p>
        </div>

        {isLoading ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading page...</p>
        ) : error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
            {error}
          </p>
        ) : (
          <ApiDataBlock title="Page" data={page} />
        )}

        <LogoutButton />
      </div>
    </div>
  );
}
