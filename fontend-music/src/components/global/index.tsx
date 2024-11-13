"use client";

import { useAudioPlayer } from "@/hooks/useWaveform";
import { IoIosSkipBackward } from "react-icons/io";
import { IoIosSkipForward } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";
import { LuRepeat1 } from "react-icons/lu";
import { LuRepeat } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setIsRepeat } from "@/lib/features/actionsSlice";
import { HandleLike } from "@/utils/handleLike";
import Link from "next/link";

export default function GlobalAudio() {
  const currentTrack = useSelector(
    (state: RootState) => state.action.currentTrack
  );

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const {
    waveContainerRef,
    handlePlayPause,
    volume,
    isRepeat,
    handleVolumeChange,
    setVolume,
    currentTime,
    duration,
    isPlaying,
  } = useAudioPlayer({
    waveColor: "#cccccc",
    progressColor: "#f50",
    height: 1,
    url: currentTrack?.sound,
    width: 512,
    idTrack: currentTrack?.id,
  });

  const { handleClickLike, handleUnLike, statusLike } = HandleLike(
    currentTrack?.id
  );

  return (
    <div className="fixed bottom-0 z-50 flex h-12 w-full items-center justify-center border-t border-[#cecece] bg-[#f2f2f2] mt-3">
      <div className="mt-3 flex w-[1519.2px] items-center justify-center gap-9 leading-3">
        <div className="flex items-center gap-5">
          <button>
            <IoIosSkipBackward />
          </button>
          <button onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button>
            <IoIosSkipForward />
          </button>

          <button onClick={() => dispatch(setIsRepeat())}>
            {isRepeat ? <LuRepeat1 /> : <LuRepeat />}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-[26px] p-[2px] text-[10px] text-[#ff5500]">
            <span className="w-5">{currentTime}</span>
          </div>
          <div
            id="waveform"
            className="cursor-pointer"
            ref={waveContainerRef}
          ></div>
          <div className="h-4 p-[2px] text-[10px] text-[#ff5500]">
            <span>{duration}</span>
          </div>
        </div>
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className="flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer"
            onClick={() => setVolume(0)}
          >
            {volume === 0 ? (
              <HiSpeakerXMark className="w-4 h-4 text-gray-700" />
            ) : (
              <HiSpeakerWave className="w-4 h-4 text-gray-700" />
            )}
          </button>
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-4 h-24 flex items-center justify-center transform transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-0.5 h-full bg-gray-200 rounded-full">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="absolute w-24 h-0.5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 origin-center -rotate-90 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-blue-600"
                style={{
                  background: `linear-gradient(to right, #ff6b00 0%, #ff6b00 ${
                    volume * 100
                  }%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/detail/${currentTrack?.slug}`}>
            <div className="flex w-[300px] items-center gap-2">
              <div>
                <Image
                  height={30}
                  width={40}
                  className="h-[30px] w-[30px]"
                  src={`${
                    currentTrack?.image ||
                    "https://cdn2.iconfinder.com/data/icons/essential-set-04/64/music-note-streamline-512.png"
                  }`}
                  alt=""
                />
              </div>
              <div className="flex flex-col text-[#333]">
                <span className="text-xs">{currentTrack?.users?.username}</span>
                <span className="text-xs">{currentTrack?.track_name}</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {statusLike ? (
              <button
                className="text-[#f50]"
                onClick={() =>
                  handleUnLike(undefined, currentTrack?.id, "unLikeTrack")
                }
              >
                <IoHeart />
              </button>
            ) : (
              <button
                onClick={() => handleClickLike(currentTrack?.id, 0, "sendLike")}
              >
                <IoHeart />
              </button>
            )}

            <button>
              <FaUserPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
