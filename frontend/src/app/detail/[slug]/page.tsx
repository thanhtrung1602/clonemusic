"use client";

import { Wrapper } from "@/components/Popper";
import useGet from "@/hooks/useGet";
import { FastAverageColor } from "fast-average-color";
import relativeTime from "dayjs/plugin/relativeTime";
import { ITrack } from "@/types/track";
import { Button } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import dayjs from "dayjs";
import { useAudioPlayer } from "@/hooks/useWaveform";
import { useDispatch } from "react-redux";
import { setCurrentTrack, setTrackId } from "@/lib/features/actionsSlice";

export default function DetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const [formattedTime, setFormattedTime] = useState("");
  const { data: track } = useGet<ITrack | undefined>(
    `/tracks/findOneSlug/${slug}`
  );

  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    dispatch(setCurrentTrack(track));
  }, [dispatch, track]);

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
    url: track?.sound,
    width: 750,
    idTrack: track?.id,
  });

  useEffect(() => {
    muteVolume();
  }, [muteVolume]);

  // Add error handling for the track
  useEffect(() => {
    if (track?.sound) {
      // You might want to add some UI feedback here
      "Loading track:", track.sound);
    }
  }, [track]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && track?.image) {
      const fac = new FastAverageColor();

      const image = document.createElement("img") as HTMLImageElement;
      image.crossOrigin = "Anonymous";
      image.src = track.image;

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
  }, [track]);

  useEffect(() => {
    if (track?.created_at) {
      setFormattedTime(dayjs(track?.created_at).fromNow());
    }
  }, [track]);

  return (
    <>
      <div className="h-[380px] border">
        <Wrapper>
          <div
            className="flex h-full flex-row-reverse justify-between"
            style={{ backgroundColor: bgColor }}
          >
            <div className="mx-[18px] my-[18px]">
              <Image
                ref={imgRef}
                width={540}
                height={540}
                className="flex w-[340px] h-[340px] items-center justify-center object-fill"
                src={`${
                  track?.image ||
                  track?.users?.image ||
                  `https://th.bing.com/th/id/OIP.9SB1WaK0z5zoHfL_eTs5lQHaE7?w=580&h=386&rs=1&pid=ImgDetMain`
                }`}
                alt={`${track?.track_name}`}
              />
            </div>

            <div>
              <div className="flex w-full justify-between">
                <div className="flex w-[776px] gap-1 pb-[9rem] pl-[20px] pt-[30px]">
                  <div className="">
                    <Button
                      onClick={() => {
                        dispatch(setTrackId(track?.id));
                        dispatch(setCurrentTrack(track));
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
                        {track?.track_name}
                      </span>
                    </div>
                    <div className="block">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        {track?.users?.username}
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
    </>
  );
}
