"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AntdThemeProvider from "@/components/ui/AntdThemeProvider";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 0,
        staleTime: 60 * 1000,
        gcTime: 30 * 60 * 1000,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

export default function ApiProvider({ children, initialIsDark = false }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AntdThemeProvider initialIsDark={initialIsDark}>
        {children}
      </AntdThemeProvider>
    </QueryClientProvider>
  );
}
