"use client";

import Link from "next/link";

const VARIANT_CLASS = {
  primary:
    "bg-qb-blue text-white hover:bg-qb-blue-hover border border-transparent",
  secondary:
    "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
  ghost:
    "border border-transparent text-qb-blue hover:bg-zinc-100 dark:hover:bg-zinc-900",
};

function HeaderButton({ button }) {
  const {
    label,
    onClick,
    href,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
  } = button;

  const classes = [
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {label}
    </button>
  );
}

/**
 * Reusable page title block.
 * @param {string} [title]
 * @param {string} [description]
 * @param {Array<{ label: string, onClick?: Function, href?: string, variant?: 'primary'|'secondary'|'ghost', disabled?: boolean, className?: string }>} [buttons]
 */
export default function PageHeader({ title, description, buttons = [] }) {
  if (!title && !description && buttons.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
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

      {buttons.length > 0 ? (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
          {buttons.map((button, index) => (
            <HeaderButton
              key={button.key || button.label || index}
              button={button}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
