import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  setCurrentTime,
  setCurrentTrack,
  setDuration,
  setPause,
  setPlaying,
} from "@/lib/features/actionsSlice";
import WaveSurfer from "wavesurfer.js";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ITrack } from "@/types/track";

interface AudioPlayerOptions {
  waveColor?: string;
  progressColor?: string;
  height?: number;
  barGap?: number;
  barRadius?: number;
  barWidth?: number;
  url: string | undefined;
  width: number;
  idTrack: number | undefined;
  track: ITrack;
}

export function useAudioPlayer(options: AudioPlayerOptions) {
  const waveContainerRef = useRef<HTMLDivElement | null>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const { isPlay, isRepeat, trackId, currentTrack } = useAppSelector(
    (state) => state.action
  );
  const dispatch = useAppDispatch();
  const { duration, currentTime } = useSelector(
    (state: RootState) => state.action
  );

  const isReady = useRef(false);
  const [volume, setVolume] = useState(1);
  const [localCurrentTime, setLocalCurrentTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);

  // Initialize WaveSurfer instance for this specific track
  useEffect(() => {
    const handleReady = () => {
      if (waveSurfer.current) {
        const duration = waveSurfer.current.getDuration() ?? 0;
        setLocalDuration(duration);
        if (trackId === options.idTrack) {
          dispatch(setDuration(duration));
        }
        isReady.current = true;
      }
    };

    const handleAudioProcess = () => {
      if (waveSurfer.current) {
        const currentTime = waveSurfer.current.getCurrentTime() ?? 0;
        setLocalCurrentTime(currentTime);
        if (trackId === options.idTrack) {
          dispatch(setCurrentTime(currentTime));
        }
      }
    };

    const handleFinish = () => {
      if (waveSurfer.current) {
        if (isRepeat && trackId === options.idTrack) {
          waveSurfer.current.seekTo(0);
          waveSurfer.current.play();
          dispatch(setPlaying(options.idTrack));
        } else {
          waveSurfer.current.seekTo(0);
          if (trackId === options.idTrack) {
            dispatch(setPause());
          }
        }
      }
    };

    if (options.url && waveContainerRef.current && !waveSurfer.current) {
      waveSurfer.current = WaveSurfer.create({
        container: waveContainerRef.current,
        waveColor: options.waveColor,
        progressColor: options.progressColor,
        dragToSeek: true,
        height: options.height,
        width: options.width,
        barGap: options.barGap,
        barRadius: options.barRadius,
        barWidth: options.barWidth,
      });

      waveSurfer.current.load(options.url);
      waveSurfer.current.on("ready", handleReady);
      waveSurfer.current.on("audioprocess", handleAudioProcess);
      waveSurfer.current.on("finish", handleFinish);
    }

    return () => {
      if (waveSurfer.current && isReady.current) {
        waveSurfer.current.un("audioprocess", handleAudioProcess);
        try {
          waveSurfer.current.destroy();
        } catch (error) {
          console.error("Error during cleanup:", error);
        }
        waveSurfer.current = null;
        isReady.current = false;
      }
    };
  }, [
    options.url,
    dispatch,
    isRepeat,
    options.idTrack,
    trackId,
    options.barGap,
    options.barRadius,
    options.barWidth,
    options.height,
    options.progressColor,
    options.waveColor,
    options.width,
  ]);

  useEffect(() => {
    if ((options?.idTrack, options.url)) {
      waveSurfer.current?.load(options?.url);
    }
  }, [options.idTrack, options.url]);

  // Handle play/pause for this specific track
  useEffect(() => {
    if (waveSurfer.current) {
      if (isPlay && trackId === options.idTrack && options.track) {
        dispatch(setCurrentTrack(options.track));
        waveSurfer.current.play();
      } else {
        waveSurfer.current.pause();
      }
    }
  }, [isPlay, trackId, options.idTrack, options.track, dispatch]);

  const handlePlayPause = () => {
    if (waveSurfer.current) {
      if (trackId === options.idTrack) {
        if (isPlay) {
          dispatch(setPause());
        } else {
          dispatch(setPlaying(options.idTrack));
        }
      } else {
        dispatch(setPlaying(options.idTrack));
      }
    }
  };

  // Format time helper function
  const formatTime = (time: number) => {
    let min: number | string = Math.floor(time / 60);
    if (min < 10) {
      min = `${min}`;
    }
    let sec: string | number = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  const setVolumeTo = (value: number) => {
    setVolume(value);
    if (waveSurfer.current) {
      waveSurfer.current.setVolume(value);
    }
  };

  const muteVolume = () => {
    setVolumeTo(0);
  };

  const unmuteVolume = (value = 1) => {
    setVolumeTo(value);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (waveSurfer.current) {
      waveSurfer.current.setVolume(newVolume);
    }
  };

  useEffect(() => {
    const seekToTime = () => {
      if (
        waveSurfer.current &&
        currentTrack?.id === trackId &&
        options.url === currentTrack?.sound &&
        Number.isFinite(currentTime) &&
        Number.isFinite(duration) &&
        duration > 0
      ) {
        const waveSurferCurrentTime = waveSurfer.current?.getCurrentTime() ?? 0;
        const tolerance = 0.5; // 0.5 seconds tolerance
        if (Math.abs(currentTime - waveSurferCurrentTime) > tolerance) {
          waveSurfer.current?.seekTo(currentTime / duration);
        }
      }
    };

    seekToTime();
  }, [currentTime, duration, trackId, currentTrack, options]);

  const handleClickOnWaveform = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!waveSurfer.current && !waveContainerRef.current) return;
    if (currentTrack?.id === trackId && options.url === currentTrack?.sound) {
      const waveformRect = waveContainerRef.current.getBoundingClientRect();
      const clickX = event.clientX - waveformRect.left;
      const waveformWidth = waveformRect.width;
      const clickedTime = (clickX / waveformWidth) * duration;
      waveSurfer.current?.seekTo(clickedTime / duration);
      dispatch(setCurrentTime(clickedTime));
    }
  };

  return {
    waveContainerRef,
    handlePlayPause,
    currentTime:
      trackId === options.idTrack
        ? formatTime(currentTime)
        : formatTime(localCurrentTime),
    duration:
      trackId === options.idTrack
        ? formatTime(duration)
        : formatTime(localDuration),
    isPlaying: isPlay && trackId === options.idTrack,
    handleVolumeChange,
    volume,
    isRepeat,
    setVolume,
    muteVolume,
    unmuteVolume,
    handleClickOnWaveform,
  };
}
