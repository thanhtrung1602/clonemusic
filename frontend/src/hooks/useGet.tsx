"use client";

import { useQuery } from "@tanstack/react-query";
import instance from "@/services/axios";
import useAccessToken from "./useAccessToken";

export default function useGet<T>(url: string) {
  const { data: cookie, isSuccess } = useAccessToken();

  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      if (!cookie && !isSuccess) {
        throw new Error("Access token chưa sẵn sàng");
      }
      const { data } = await instance.get<T>(url, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      return data;
    },
    enabled: !!cookie,
  });
}
