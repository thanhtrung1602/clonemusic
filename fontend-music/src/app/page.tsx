"use client";
// import Button from "@mui/material/Button";
// import { signIn } from "@/auth";
import Header from "@/components/header";
import useGet from "@/hooks/useGet";
export default function Home() {
  const { data: track } = useGet("/tracks/findAllTrack?page=1&limit=10");
  console.log(track);
  return (
    <div>
      <Header />
    </div>
  );
}
