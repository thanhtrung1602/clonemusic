"use client";
// import Button from "@mui/material/Button";
// import { signIn } from "@/auth";
import useAccessToken from "@/hooks/useAccessToken";
import useGet from "@/hooks/useGet";
export default function Home() {
  const { data: track } = useGet("/tracks/findAllTrack?page=1&limit=10");
  const { data: accessToken } = useAccessToken();
  console.log("?????????????", accessToken);
  return (
    <div>
      <div>
        <h2>{accessToken}</h2>
      </div>
    </div>
  );
}
