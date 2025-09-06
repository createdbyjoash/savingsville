"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
