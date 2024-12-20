/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import instance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import useAccessToken from "./useAccessToken";

type UsePostOption = { url: string; data: object };

export default function usePost() {
  const { data: cookie, isSuccess } = useAccessToken();
  return useMutation({
    mutationFn: ({ url, data }: UsePostOption) => {
      if (!cookie && !isSuccess) {
        throw new Error("Access token chưa sẵn sàng");
      }

      return instance
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        })
        .then((response) => {
          return response;
        });
    },
  });
}

export function usePatch() {
  return useMutation({
    mutationFn: ({ url, data }: { url: string; data?: object }) =>
      instance.patch(url, data).then((res) => res),
  });
}

export function useDelete() {
  const { data: cookie, isSuccess } = useAccessToken();
  return useMutation({
    mutationFn: (url: string) => {
      if (!cookie && !isSuccess) {
        throw new Error("Access token chưa sẵn sàng");
      }
      return instance
        .delete(url, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        })
        .then((res) => res);
    },
  });
}
