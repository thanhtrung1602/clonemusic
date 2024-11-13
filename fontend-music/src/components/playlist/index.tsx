import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import useGet from "@/hooks/useGet";
import { setTogglePlaylist } from "@/lib/features/actionsSlice";
import { useDispatch } from "react-redux";
import CreatePlaylist from "./createPlaylist";
import GetPlaylist from "./getPlaylist";
import { IUser } from "@/types/next-auth";
import { IPlaylist } from "@/types/playlist";

const Playlist = () => {
  const [activeTab, setActiveTab] = useState("add");
  const dispatch = useDispatch();

  const { data: user } = useGet<IUser>("/auth/profile");
  const { data: playlists } = useGet<IPlaylist[]>(
    `/playlists/findAllPlaylistUser/${user?.id}`
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("add")}
              className={`text-lg font-medium ${
                activeTab === "add"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600"
              }`}
            >
              Add to playlist
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`text-lg font-medium ${
                activeTab === "create"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-600"
              }`}
            >
              Create a playlist
            </button>
          </div>
          <button
            onClick={() => dispatch(setTogglePlaylist())}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {activeTab === "add" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Filter playlists"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="space-y-3">
              {playlists?.map((playlist) => (
                <GetPlaylist key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="mt-4">
            <CreatePlaylist />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
