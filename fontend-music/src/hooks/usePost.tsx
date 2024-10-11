/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import instance from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

type UsePostOption = { url: string; data: object };

export default function usePost() {
  return useMutation({
    mutationFn: ({ url, data }: UsePostOption) =>
      instance.post(url, data).then((res: any) => res.data),
  });
}
