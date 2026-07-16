import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import { handleApiError, withErrorHandler } from "@/api/utils/errors";

export const INDUSTRY_PAGES_KEYS = {
  all: ["industry-pages"],
  list: () => [...INDUSTRY_PAGES_KEYS.all, "list"],
};

/** Client → content server industry-pages calls */
export const industryPagesApi = {
  getList: () => apiClient(ENDPOINTS.industryPages, { method: "GET" }),
  create: (data) => apiClient(ENDPOINTS.createIndustryPage, { method: "POST", body: data }),
};

export function useIndustryPages(options = {}) {
  return useQuery({
    queryKey: INDUSTRY_PAGES_KEYS.list(),
    queryFn: withErrorHandler(async () => {
      const data = await industryPagesApi.getList();
      return data.data || [];
    }),
    retry: 0,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useCreateIndustryPage(options = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...rest } = options;

  return useMutation({
    mutationFn: (data) => industryPagesApi.create(data),
    ...rest,
    onError: (error, ...args) => {
      handleApiError(error, "Failed to create industry page");
      onError?.(error, ...args);
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: INDUSTRY_PAGES_KEYS.all });
      onSuccess?.(...args);
    },
  });
}
