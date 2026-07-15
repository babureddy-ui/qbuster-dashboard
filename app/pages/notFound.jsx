import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-full min-h-[60vh] flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          404
        </h1>
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Page not found
        </h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          This page could not be found. Use the sidebar to open an available
          section, or go back to the dashboard.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-qb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-qb-blue-hover"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
