"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import GlobalAudio from ".";

export default function GlobalAudioWrapper() {
  const currentTrack = useSelector(
    (state: RootState) => state.action.currentTrack
  );

  if (!currentTrack) return null;

  return <GlobalAudio />;
}
