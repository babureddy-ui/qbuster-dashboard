"use client";

import { Switch } from "antd";

export function createDefaultCommonSections() {
  return {
    awards_and_recognition: true,
    qb_business_potential: true,
    connect_with_us: true,
    request_callback: true,
    blogs_and_videos: true,
  };
}

function formatKeyLabel(key) {
  return key
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CommonSections({
  values,
  onChange,
  disabled = false,
  title = "Common sections",
}) {
  const sections = values && typeof values === "object"
    ? values
    : createDefaultCommonSections();

  function updateSections(nextSections) {
    onChange?.(nextSections);
  }

  function handleToggle(key, checked) {
    updateSections({ ...sections, [key]: checked });
  }

  const keys = Object.keys(sections);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[1.2rem] font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>

      <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        {keys.map((key) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-3 last:border-b-0 last:pb-0 dark:border-zinc-800"
          >
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {formatKeyLabel(key)}
            </span>
            <Switch
              checked={Boolean(sections[key])}
              onChange={(checked) => handleToggle(key, checked)}
              disabled={disabled}
            />
          </div>
        ))}

        {keys.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No keys added yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
