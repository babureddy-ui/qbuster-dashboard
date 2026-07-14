"use client";

export default function PageHeader({ title, description }) {
  if (!title && !description) return null;

  return (
    <div>
      {title ? (
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
