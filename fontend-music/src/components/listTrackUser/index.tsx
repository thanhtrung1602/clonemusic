"use client";
import { useAudioPlayer } from "@/hooks/useWaveform";
import { ITrack } from "@/types/track";
import { IoHeart } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { IoLink } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";
import Image from "next/image";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setSlugProduct,
  setTogglePlaylist,
  setTrackId,
} from "@/lib/features/actionsSlice";
import { HandleLike } from "@/utils/handleLike";
import useGet from "@/hooks/useGet";

export default function ListTrack({ track }: { track: ITrack }) {
  const [trackPlayId, setTrackPlayId] = useState<number>(0);

  const dispatch = useDispatch();

  const { data: countLikes } = useGet<number>(
    `/likes/getCountLike/${track?.id}`
  );

  const {
    waveContainerRef,
    currentTime,
    duration,
    isPlaying,
    handlePlayPause,
  } = useAudioPlayer({
    waveColor: "#000000",
    progressColor: "#f50",
    height: 60,
    barGap: 1,
    barRadius: 20,
    barWidth: 2,
    url: track.sound,
    width: 645,
    idTrack: trackPlayId,
  });

  const { handleClickLike, handleUnLike, statusLike } = HandleLike(track?.id);

  return (
    <>
      <section className="flex items-center py-2.5">
        <div>
          <Image
            width={160}
            height={160}
            quality={100}
            src={`${track.image}`}
            alt={`${track.track_name}`}
          />
        </div>
        <div className="flex flex-col gap-4 pl-[15px]">
          <div className="flex w-full justify-between">
            <div className="flex w-[776px] gap-1 ">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setTrackPlayId(track.id);
                    dispatch(setTrackId(track.id));
                    dispatch(setCurrentTrack(track));
                    handlePlayPause();
                  }}
                >
                  {isPlaying ? (
                    <FaCirclePause className="h-[36px] w-[36px] text-[#f50] bg-white rounded-full" />
                  ) : (
                    <FaCirclePlay className="h-[36px] w-[36px] text-[#f50] bg-white rounded-full" />
                  )}
                </button>
              </div>
              <div className="flex flex-col">
                <div className="block">
                  <span className="h-[36.8px] w-full px-2 text-xs text-[#ccc]">
                    {track?.users?.username}
                  </span>
                </div>
                <div className="">
                  <span className="h-[36.8px] px-2 text-sm text-black">
                    {track?.track_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-[26px] bg-black p-[2px] text-[10px] text-red-700">
              <span>{currentTime}</span>
            </div>
            <div id="waveform" ref={waveContainerRef}></div>
            <div className="h-4 bg-black p-[2px] text-[10px] text-[#999]">
              <span>{duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            {statusLike ? (
              <button
                className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 text-[#f50]"
                onClick={() =>
                  handleUnLike(undefined, track?.id, "unLikeTrack")
                }
              >
                <IoHeart className="text-sm" />
                <span className="text-xs">{countLikes}</span>
              </button>
            ) : (
              <button
                className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 "
                onClick={() => handleClickLike(track?.id, 0, "sendLike")}
              >
                <IoHeart className="text-sm" />
                <span className="text-xs">{countLikes}</span>
              </button>
            )}

            <button className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 ">
              <BiRepost className="text-sm" />
              <span className="text-xs">36</span>
            </button>
            <button className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 ">
              <FaShareSquare className="text-sm" />
              <span className="text-xs">Share</span>
            </button>
            <button className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 ">
              <IoLink className="text-sm" />
              <span className="text-xs">Copy Link</span>
            </button>
            <button
              className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 "
              onClick={() => {
                dispatch(setTogglePlaylist());
                dispatch(setSlugProduct(track?.slug));
                dispatch(setTrackId(track?.id));
              }}
            >
              <RiPlayListAddLine className="text-sm" />
              <span className="text-xs">Add to Playlist</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
