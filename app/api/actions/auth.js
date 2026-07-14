import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import { handleApiError } from "@/api/utils/errors";

/** Client → content server auth calls (auth cookie set by content-server). */
export const authApi = {
  method: "POST",
  login: (data) =>
    apiClient(ENDPOINTS.login, {
      method: authApi.method,
      body: {
        username: (data.username || data.user_name || "").trim(),
        password: data.password,
      },
    }),
};

export function useLogin(options = {}) {
  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onError: (error) => handleApiError(error, "Login failed"),
    ...options,
  });
}
