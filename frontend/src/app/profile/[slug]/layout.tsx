"use client";
import ListTrack from "@/components/listTrackUser";
import ListPlaylists from "@/components/listTrackUser/listPlaylist";
import Playlist from "@/components/playlist";
import EditProfile from "@/components/profile/editProfile";
import useGet from "@/hooks/useGet";
import { RootState } from "@/lib/store";
import { IPlaylist } from "@/types/playlist";
import { ITrack } from "@/types/track";
import { IUser } from "@/types/user";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function LayoutDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams();
  const { hiddenOnPlaylist, hiddenOnEdit } = useSelector(
    (state: RootState) => state.action
  );

  const { data: getOneUser } = useGet<IUser>(`/users/getUser/${slug}`);

  const { data: tracks } = useGet<ITrack[]>(
    `/tracks/findAllTrackByUsername/${slug}`
  );

  const { data: playlists } = useGet<IPlaylist[]>(
    `/playlists/findAllPlaylistUser/${getOneUser?.id}`
  );
  return (
    <>
      <main className="flex w-full items-center justify-center">
        <div className="flex flex-col">
          {hiddenOnPlaylist && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
              <Playlist />
            </div>
          )}

          {hiddenOnEdit && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
              <EditProfile />
            </div>
          )}
          <div className="flex w-[1185.2px] items-center justify-center mt-11">
            {children}
          </div>
          {tracks?.map((track) => (
            <ListTrack track={track} key={track.id} />
          ))}
          {playlists?.map((playlist) => (
            <ListPlaylists playlist={playlist} key={playlist.id} />
          ))}
        </div>
      </main>
    </>
  );
}
