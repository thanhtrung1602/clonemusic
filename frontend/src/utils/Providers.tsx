"use client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useRef, useState } from "react";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const [queryClient] = useState(() => new QueryClient());
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
