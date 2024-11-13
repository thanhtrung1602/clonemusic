"use client";

import { setCookie } from "@/lib/features/userSlice";
import instance from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export default function useAccessToken() {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["/auth/getAccessToken"],
    queryFn: async () => {
      const { data } = await instance.get("/auth/getAccessToken");
      dispatch(setCookie(data));
      return data;
    },
  });
}
