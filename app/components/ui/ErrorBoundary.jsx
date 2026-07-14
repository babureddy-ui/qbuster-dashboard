"use client";

import { Component } from "react";

export function ErrorAlert({
  message,
  fallbackMessage = "Something went wrong",
}) {
  if (!message) return null;

  return (
    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
      {message || fallbackMessage}
    </p>
  );
}

function resolveMessage(error, fallbackMessage) {
  if (!error) return null;
  if (typeof error === "string") return error || fallbackMessage;
  return error.message || fallbackMessage;
}

/**
 * Reusable error gate for pages:
 * - Pass `error` for API / async failures
 * - Also catches unexpected React render crashes
 */
export default class ErrorBoundary extends Component {
  state = { crashError: null };

  static getDerivedStateFromError(error) {
    return { crashError: error };
  }

  componentDidCatch(error) {
    console.error("Page error:", error);
  }

  render() {
    const {
      error,
      fallbackMessage = "Something went wrong",
      children,
    } = this.props;

    const message = resolveMessage(
      error ?? this.state.crashError,
      fallbackMessage
    );

    if (message) {
      return <ErrorAlert message={message} fallbackMessage={fallbackMessage} />;
    }

    return children;
  }
}
