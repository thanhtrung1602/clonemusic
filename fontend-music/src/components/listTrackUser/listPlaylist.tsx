import useGet from "@/hooks/useGet";
import { useAudioPlayer } from "@/hooks/useWaveform";
import { IPlaylist } from "@/types/playlist";
import { IPlaylistDetail } from "@/types/playlistDetail";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { setCurrentTrack, setTrackId } from "@/lib/features/actionsSlice";

export default function ListPlaylists({ playlist }: { playlist: IPlaylist }) {
  const [trackPlayId, setTrackPlayId] = useState<number | undefined>(0);
  const dispatch = useDispatch();
  const { data: playlistDetails } = useGet<IPlaylistDetail[]>(
    `/playlist-tracks/findAll/${playlist.id}`
  );
  const [indexTrackList, setIndexTrackList] = useState<number>(0);

  console.log("ind: ", indexTrackList);

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
    url: playlistDetails?.[indexTrackList].tracks.sound,
    width: 645,
    idTrack: trackPlayId,
  });

  console.log(playlistDetails);

  return (
    <section className="flex items-center py-2.5">
      <div>
        <Image
          width={160}
          height={160}
          quality={100}
          src={`${playlist.image}`}
          alt={`${playlist.playlist_name}`}
        />
      </div>
      <div className="flex flex-col gap-4 pl-[15px]">
        <div className="flex w-full justify-between">
          <div className="flex w-[776px] gap-1 ">
            <div className="flex items-center">
              <button
                onClick={() => {
                  setTrackPlayId(playlistDetails?.[indexTrackList].tracks.id);
                  dispatch(
                    setTrackId(playlistDetails?.[indexTrackList].tracks.id)
                  );
                  dispatch(
                    setCurrentTrack(playlistDetails?.[indexTrackList].tracks)
                  );
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
                  {playlist.users.username}
                </span>
              </div>
              <div className="">
                <span className="h-[36.8px] px-2 text-sm text-black">
                  {playlist.playlist_name}
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
        <div>
          {playlistDetails?.map((detail, idx) => (
            <div
              className="flex w-full items-center gap-1 border p-0.5 cursor-pointer hover:bg-[#f2f2f2]"
              key={detail.id}
              onClick={() => setIndexTrackList(idx)}
            >
              <div className="mr-[5px] mt-[5px] pl-1">
                <Image
                  height={20}
                  width={20}
                  className="h-5 w-5"
                  src={detail?.tracks?.image}
                  alt={`${detail?.tracks?.track_name}`}
                  priority
                />
              </div>
              <div className="text-xs text-black">
                <span>{idx + 1}</span>
              </div>
              <div className="flex items-center ">
                <span className="mr-[3px] text-xs text-[#ccc]">
                  {detail?.tracks?.users?.username} -
                </span>
                <span className="text-xs text-black">
                  {detail?.tracks?.track_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
