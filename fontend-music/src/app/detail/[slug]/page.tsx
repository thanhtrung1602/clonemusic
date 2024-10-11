"use client";

import useWaveForm from "@/components/waveform";
import useGet from "@/hooks/useGet";
import { useAppSelector } from "@/lib/hook";
import { ITrack } from "@/types/track";
import { Button } from "@mui/material";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const { slug } = useParams();
  const { data: track } = useGet<ITrack>(`/tracks/findOneSlug/${slug}`);
  const { isPlay } = useAppSelector((state) => state.action);
  console.log(track);
  const { waveContainerRef, handlePlayPause } = useWaveForm({
    url: track?.sound,
    wc: "#000",
    pc: "#f50",
    h: 85,
    w: 800,
    bg: 1,
    br: 20,
    bw: 2,
  });
  return (
    <>
      <div id="waveform" ref={waveContainerRef}></div>
      <Button onClick={handlePlayPause}>{isPlay ? "Pause" : "Play"}</Button>
    </>
  );
}
