"use client";
import { setPause, setPlaying } from "@/lib/features/actionsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

type Wave = {
  url: string | undefined;
  wc: string;
  pc: string;
  h: number;
  w: number;
  bg: number;
  br: number;
  bw: number;
};

export default function useWaveForm({ url, wc, pc, h, w, bg, br, bw }: Wave) {
  const waveContainerRef = useRef<HTMLDivElement | null>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const { isPlay } = useAppSelector((state) => state.action);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (url && waveContainerRef.current && !waveSurfer.current) {
      waveSurfer.current = WaveSurfer.create({
        container: waveContainerRef.current,
        waveColor: `${wc}`,
        progressColor: `${pc}`,
        dragToSeek: true,
        height: h,
        width: w,
        barGap: bg,
        barRadius: br,
        barWidth: bw,
      });

      waveSurfer.current.load(url);
    }

    return () => {
      if (waveSurfer.current) {
        waveSurfer.current.destroy();
        waveSurfer.current = null;
      }
    };
  }, [url, bg, pc, wc, h, w, bw, br]);

  useEffect(() => {
    if (waveSurfer.current) {
      if (isPlay) {
        waveSurfer.current.play();
      } else {
        waveSurfer.current.pause();
      }
    }
  }, [isPlay]);

  const handlePlayPause = () => {
    if (isPlay) {
      console.log("hahahahahahah", isPlay);
      dispatch(setPause());
    } else {
      dispatch(setPlaying());
    }
  };

  return {
    waveContainerRef,
    handlePlayPause,
  };
}
