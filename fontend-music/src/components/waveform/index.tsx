"use client";
import { setCurrentTime, setDuration, setPause, setPlaying } from "@/lib/features/actionsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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
  const {duration, currentTime} = useSelector((state: RootState) => state.action)
  useEffect(() => {

    const handleReady = () => {
      if (waveSurfer.current) {
        const duration = waveSurfer.current.getDuration() ?? 0;
        dispatch(setDuration(duration));
      }
    }

    const handleAudioProcess = () => {
      if (waveSurfer.current) {
        const currentTime = waveSurfer.current.getCurrentTime() ?? 0;
        dispatch(setCurrentTime(currentTime));
        localStorage.setItem("currentTime", String(currentTime));
      }
    };

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
      waveSurfer.current.on("ready", handleReady);
      waveSurfer.current.on("audioprocess", handleAudioProcess);
    }

    return () => {
      if (waveSurfer.current) {
        waveSurfer.current.un("audioprocess", handleAudioProcess);
        waveSurfer.current.destroy();
        waveSurfer.current = null;
      }
    };
  }, [url, bg, pc, wc, h, w, bw, br, setCurrentTime, setDuration, dispatch]);

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

  useEffect(() => {
    const seekToTime = () => {
      if (waveSurfer.current) {
        const waveSurferCurrentTime =
          waveSurfer.current.getCurrentTime() ?? 0;
        const tolerance = 0.5; // 0.5 seconds tolerance
        if (Math.abs(currentTime - waveSurferCurrentTime) > tolerance) {
          waveSurfer.current.seekTo(currentTime / duration);
        }
      }
    };

    seekToTime();
  }, [currentTime, duration]);

  return {
    waveContainerRef,
    handlePlayPause,
    currentTime,
    duration
  };
}
