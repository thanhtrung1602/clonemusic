"use client";

import instance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGet<T>(url: string) {
  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await instance.get<T>(url);
      return data;
    },
  });
}
