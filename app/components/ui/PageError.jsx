"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ErrorBoundary, { ErrorAlert } from "@/components/ui/ErrorBoundary";

const PageErrorContext = createContext(null);

export function PageErrorProvider({ children }) {
  const [error, setErrorState] = useState(null);
  const setError = useCallback((next) => {
    setErrorState(next);
  }, []);
  const value = useMemo(() => ({ error, setError }), [error, setError]);

  return (
    <PageErrorContext.Provider value={value}>
      {children}
    </PageErrorContext.Provider>
  );
}

/** Report an API/async error to the shared page shell. */
export function usePageError(error, fallbackMessage = "Something went wrong") {
  const ctx = useContext(PageErrorContext);
  const setError = ctx?.setError;

  useEffect(() => {
    if (!setError) return undefined;

    if (error) {
      const message =
        typeof error === "string"
          ? error
          : error.message || fallbackMessage;
      setError(message);
    } else {
      setError(null);
    }

    return () => setError(null);
  }, [setError, error, fallbackMessage]);
}

/**
 * Shared page error UI + crash boundary.
 * Keeps children mounted when an API error is shown so queries are not remounted/refetched.
 */
export function PageBody({ children }) {
  const ctx = useContext(PageErrorContext);
  const error = ctx?.error;

  return (
    <>
      {error ? <ErrorAlert message={error} /> : null}
      <div className={error ? "hidden" : undefined}>
        <ErrorBoundary fallbackMessage="Something went wrong on this page.">
          {children}
        </ErrorBoundary>
      </div>
    </>
  );
}
