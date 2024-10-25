"use client";

import { Wrapper } from "@/components/Popper";
import useWaveForm from "@/components/waveform";
import useGet from "@/hooks/useGet";
import { FastAverageColor } from "fast-average-color";
import { useAppSelector } from "@/lib/hook";
import { ITrack } from "@/types/track";
import { Button } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";

export default function DetailPage() {
  const { slug } = useParams();
  const { data: track } = useGet<ITrack>(`/tracks/findOneSlug/${slug}`);
  const imgRef = useRef(null);
  const { isPlay } = useAppSelector((state) => state.action);
  const [bgColor, setBgColor] = useState("#ffffff");
  const { waveContainerRef, handlePlayPause, currentTime, duration } =
    useWaveForm({
      url: track?.sound,
      wc: "#000",
      pc: "#f50",
      h: 85,
      w: 800,
      bg: 1,
      br: 20,
      bw: 2,
    });

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
            setBgColor(color.hex); // Gán màu cho background
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
                <div className="flex w-[776px] gap-2 pb-[11rem] pl-[30px] pt-[30px] items-center">
                  <div className="">
                    <Button onClick={handlePlayPause}>
                      {isPlay ? (
                        <FaCirclePause className="h-[60px] w-[60px] text-[#f50] bg-white rounded-full" />
                      ) : (
                        <FaCirclePlay className="h-[60px] w-[60px] text-[#f50] bg-white rounded-full" />
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-full">
                      <span className="h-[36.8px] bg-[#000000cc] px-2 py-1 text-2xl text-[#fff]">
                        {track?.track_name}
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        {track?.users?.username}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-[30px] flex items-center">
                <div className="h-4 w-[26px] bg-black p-[2px] text-[10px] text-red-700">
                  <span>{formatTime(currentTime)}</span>
                </div>
                <div id="waveform" ref={waveContainerRef}></div>
                <div className="h-4 bg-black p-[2px] text-[10px] text-[#999]">
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
