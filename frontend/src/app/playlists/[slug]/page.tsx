"use client";

import { Wrapper } from "@/components/Popper";
import useGet from "@/hooks/useGet";
import { IPlaylist } from "@/types/playlist";
import { FastAverageColor } from "fast-average-color";
import { IPlaylistDetail } from "@/types/playlistDetail";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "@/hooks/useWaveform";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, setTrackId } from "@/lib/features/actionsSlice";
import ListPlaylists from "@/components/listPlaylist";
import { RootState } from "@/lib/store";

export default function PlaylistsPage() {
  const { slug } = useParams();
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const [formattedTime, setFormattedTime] = useState("");
  dayjs.extend(relativeTime);
  const [bgColor, setBgColor] = useState("#ffffff");
  const { data: playlist } = useGet<IPlaylist>(
    `/playlists/findAllPlaylistBySlug/${slug}`
  );

  const { data: playlistDetails } = useGet<IPlaylistDetail[]>(
    `/playlist-tracks/findAll/${playlist?.id}`
  );
  const indPlaylist = useSelector(
    (state: RootState) => state.action.indPlaylist
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
    waveColor: "#000",
    progressColor: "#f50",
    height: 75,
    barGap: 1,
    barRadius: 20,
    barWidth: 2,
    url: playlistDetails?.[indPlaylist]?.tracks?.sound,
    width: 750,
    idTrack: playlistDetails?.[indPlaylist]?.tracks?.id,
  });

  useEffect(() => {
    muteVolume();
  }, [muteVolume]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && playlistDetails?.[indPlaylist]?.tracks?.image) {
      const fac = new FastAverageColor();

      const image = document.createElement("img") as HTMLImageElement;
      image.crossOrigin = "Anonymous";
      image.src = playlistDetails?.[indPlaylist]?.tracks?.image;

      image.onload = () => {
        fac
          .getColorAsync(image)
          .then((color) => {
            setBgColor(color.hex);
          })
          .catch((e) => {
            console.error(e);
          });
      };

      image.onerror = (e) => {
        console.error("Image loading error:", e);
      };
    }
  }, [playlistDetails, indPlaylist]);

  useEffect(() => {
    if (playlistDetails?.[indPlaylist]?.tracks?.created_at) {
      setFormattedTime(
        dayjs(playlistDetails?.[indPlaylist]?.tracks?.created_at).fromNow()
      );
    }
  }, [playlistDetails, indPlaylist]);

  return (
    <div className="flex flex-col">
      <div className="h-[380px] border">
        <Wrapper>
          <div
            className="flex h-full flex-row-reverse justify-between"
            style={{ backgroundColor: bgColor }}
          >
            <div className="mx-[18px] my-[18px]">
              <Image
                ref={imgRef}
                width={1000}
                height={1000}
                className="flex w-[340px] h-[340px] items-center justify-center object-fill"
                src={`${
                  playlistDetails?.[indPlaylist]?.tracks?.image ||
                  playlistDetails?.[indPlaylist]?.tracks?.users?.image ||
                  `https://th.bing.com/th/id/OIP.9SB1WaK0z5zoHfL_eTs5lQHaE7?w=580&h=386&rs=1&pid=ImgDetMain`
                }`}
                alt={`${playlistDetails?.[indPlaylist]?.tracks?.track_name}`}
              />
            </div>

            <div>
              <div className="flex w-full justify-between">
                <div className="flex w-[776px] gap-1 pb-[9rem] pl-[20px] pt-[30px]">
                  <div className="">
                    <Button
                      onClick={() => {
                        dispatch(setTrackId(playlistDetails?.[0]?.tracks?.id));
                        dispatch(setCurrentTrack(playlistDetails?.[0]?.tracks));
                        handlePlayPause();
                      }}
                    >
                      {isPlaying ? (
                        <FaCirclePause className="h-[60px] w-[60px] text-[#f50] bg-white rounded-full" />
                      ) : (
                        <FaCirclePlay className="h-[60px] w-[60px] text-[#f50] bg-white rounded-full" />
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="max-w-[527px]">
                      <span className="h-[36.8px] bg-[#000000cc] px-2 py-1 text-2xl text-[#fff]">
                        {playlist?.playlist_name}
                      </span>
                    </div>
                    <div className="block">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        {playlist?.users.username}
                      </span>
                    </div>
                  </div>
                  <div className="text-white">
                    <span>{formattedTime}</span>
                  </div>
                </div>
              </div>
              <div className="ml-[30px] flex items-center">
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
            </div>
          </div>
        </Wrapper>
      </div>
      <ListPlaylists playlistDetails={playlistDetails} playlist={playlist} />
    </div>
  );
}
