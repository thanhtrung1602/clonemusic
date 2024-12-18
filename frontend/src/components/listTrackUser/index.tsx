"use client";
import { useAudioPlayer } from "@/hooks/useWaveform";
import { ITrack } from "@/types/track";
import { IoHeart } from "react-icons/io5";
import { IoLink } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";
import Image from "next/image";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {
  setCurrentTrack,
  setSlugProduct,
  setTogglePlaylist,
  setTrackId,
} from "@/lib/features/actionsSlice";
import { HandleLike } from "@/utils/handleLike";
import useGet from "@/hooks/useGet";
import { useDelete } from "@/hooks/usePost";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function ListTrack({ track }: { track: ITrack }) {
  const queryClient = useQueryClient();
  const [trackPlayId, setTrackPlayId] = useState<number>(0);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const { mutate } = useDelete();
  const { data: countLikes } = useGet<number>(
    `/likes/getCountLike/${track?.id}`
  );

  const {
    waveContainerRef,
    currentTime,
    duration,
    isPlaying,
    handlePlayPause,
    muteVolume,
    handleClickOnWaveform,
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

  useEffect(() => {
    muteVolume();
  }, [muteVolume]);

  const handleDeleteTrack = (id: number) => {
    mutate(`/tracks/delTrack/${id}`, {
      onSuccess: (res) => {
        if (res.status === 200) {
          `Deleted track: ${track.track_name}`);
          toast.success("Delete successfully!");
          setShowPopup(false);
          queryClient.invalidateQueries({
            queryKey: [
              `/tracks/findAllTrackByUsername/${track.users.username}`,
            ],
          });
        }
      },
    });
  };

  const { handleClickLike, handleUnLike, statusLike } = HandleLike(track?.id);

  return (
    <>
      <section className="flex items-center py-2.5">
        <div>
          <Image
            width={1000}
            height={1000}
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
            <div
              id="waveform"
              onClick={handleClickOnWaveform}
              ref={waveContainerRef}
            ></div>
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
              <FaShareSquare className="text-sm" />
              <span className="text-xs">Share</span>
            </button>
            <button className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2">
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
            <button
              className="h-[24px] rounded-sm border flex items-center gap-1 py-0.5 px-2 "
              onClick={() => setShowPopup(true)}
            >
              <FaTrash className="text-sm" />
              <span className="text-xs">Delete Track</span>
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <p className="text-center">
                Are you sure you want to delete? This action cannot be undone.
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteTrack(track.id)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
