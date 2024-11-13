import { playlistImg } from "@/assets/images";
import useGet from "@/hooks/useGet";
import usePost, { useDelete } from "@/hooks/usePost";
import { RootState } from "@/lib/store";
import { IUser } from "@/types/next-auth";
import { IPlaylist } from "@/types/playlist";
import { IPlaylistDetail } from "@/types/playlistDetail";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";
import { BsSoundwave } from "react-icons/bs";
import { useSelector } from "react-redux";
function GetPlaylist({ playlist }: { playlist: IPlaylist }) {
  const { data: user } = useGet<IUser>("/auth/profile");
  const queryClient = useQueryClient();
  const trackId = useSelector((state: RootState) => state.action.trackId);
  const imageUrl = playlist.image
    ? playlist.image.startsWith("http")
      ? playlist.image
      : `/${playlist.image}`
    : playlistImg;

  const { mutate } = usePost();
  const { mutate: del } = useDelete();
  const { data: countTrackPlaylist } = useGet<number>(
    `/playlist-tracks/findAllCountPlaylistUser/${playlist.id}`
  );

  const { data: playlistDetails } = useGet<IPlaylistDetail[]>(
    `/playlist-tracks/findAll/${playlist.id}`
  );

  console.log("trackId", trackId);

  const handleAddPlaylist = (playlist_id: number) => {
    const data = {
      playlist_id: playlist_id,
      description: "",
      track_id: trackId,
    };

    mutate(
      { url: "/playlist-tracks/createPlaylistDetail", data },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            toast.success("đã thêm playlist");
            queryClient.invalidateQueries({
              queryKey: [
                `/playlist-tracks/findAllCountPlaylistUser/${playlist.id}`,
              ],
            });

            queryClient.invalidateQueries({
              queryKey: [`/playlist-tracks/findAll/${playlist.id}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/playlists/findAllPlaylistUser/${user?.id}`],
            });
          }
        },
      }
    );
  };

  const handleRemoveTrackInPlaylist = (playlistId: number) => {
    const idPlaylistTrack = playlistDetails?.find(
      (p) => p.playlist_id === playlistId && p.track_id === trackId
    );

    del(`/playlist-tracks/deletePlaylistTrack/${idPlaylistTrack?.id}`, {
      onSuccess: (res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({
            queryKey: [
              `/playlist-tracks/findAllCountPlaylistUser/${playlist.id}`,
            ],
          });

          queryClient.invalidateQueries({
            queryKey: [`/playlist-tracks/findAll/${playlist.id}`],
          });

          queryClient.invalidateQueries({
            queryKey: [`/playlists/findAllPlaylistUser/${user?.id}`],
          });
        }
      },
    });
  };

  const isTrackInPlaylist = playlistDetails?.some(
    (playlist) => playlist.track_id === trackId
  );
  return (
    <>
      <div
        className="flex items-center justify-between p-1 hover:bg-gray-50"
        key={playlist.id}
      >
        <div className="flex items-center gap-3">
          <Image
            width={50}
            height={50}
            src={imageUrl}
            alt=""
            className="w-[50px] h-[50px] rounded-sm object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {playlist.playlist_name}
            </span>
            <div className="flex items-center gap-1">
              <BsSoundwave />
              <span className="text-xs text-gray-500">
                {countTrackPlaylist}
              </span>
            </div>
          </div>
        </div>
        {isTrackInPlaylist ? (
          <button
            onClick={() => handleRemoveTrackInPlaylist(playlist.id)}
            className="px-3 py-1 text-sm text-[#ff4500] border border-gray-300 rounded"
          >
            Added
          </button>
        ) : (
          <button
            onClick={() => handleAddPlaylist(playlist.id)}
            className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded"
          >
            Add to Playlist
          </button>
        )}
      </div>
    </>
  );
}

export default GetPlaylist;
