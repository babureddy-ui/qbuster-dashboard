import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import { withErrorHandler } from "@/api/utils/errors";

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
