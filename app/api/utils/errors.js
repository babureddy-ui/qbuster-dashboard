import { ApiError } from "@/api/client";

/** Wrap an async queryFn so errors become ApiError with a clear message. */
export function withErrorHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
}

/** Normalize API / network errors for UI + React Query. */
export function handleApiError(error, fallbackMessage = "Something went wrong") {
  if (error instanceof ApiError) {
    return error;
  }

  const message =
    error?.message ||
    error?.data?.message ||
    fallbackMessage;

  const normalized = new ApiError(message, error?.status || 500);
  return normalized;
}
