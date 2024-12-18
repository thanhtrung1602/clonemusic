import { setSlugProduct, setTogglePlaylist } from "@/lib/features/actionsSlice";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { ITrack } from "@/types/track";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { IUser } from "@/types/next-auth";

function CreatePlaylist() {
  const { data: user } = useGet<IUser>("/auth/profile");
  const dispatch = useDispatch();
  const slugProduct = useSelector(
    (state: RootState) => state.action.slugProduct
  );
  const { mutate } = usePost();
  const [title, setTitle] = useState<string>("");
  const { data: track } = useGet<ITrack>(`/tracks/findOneSlug/${slugProduct}`);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      playlist_name: title,
      image: track?.image,
      user_id: user?.id,
    };

    mutate(
      { url: "/playlists/addPlaylist", data },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            const data = {
              track_id: track?.id,
              description: "",
              playlist_id: res.data.id,
            };

            mutate(
              { url: "/playlist-tracks/createPlaylistDetail", data },
              {
                onSuccess: (res) => {
                  if (res.status === 201) {
                    toast.success("Bạn đã tạo playlist");
                    dispatch(setTogglePlaylist());
                  }
                },
              }
            );
          }
        },
      }
    );
  };
  return (
    <>
      <div className="pt-[25px]">
        <form onSubmit={handleSubmitForm}>
          <div className="flex flex-col">
            <label className="text-xs text-[#333]" htmlFor="idPlaylist">
              Playlist title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="my-2 rounded border border-[#ccc] px-2 py-[2px] outline-none"
              type="text"
              name=""
              id="idPlaylist"
            />
          </div>
          <div className="mt-2 flex items-center justify-end">
            <button className="rounded border border-[#f50] bg-[#f50] py-0.5 pl-2.5 pr-3 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8 border">
        {track && (
          <div className="flex items-center justify-between border-b pb-1 pl-[5px]">
            <div className="flex w-full items-center">
              <div className="mr-[5px] mt-[5px]">
                <Image
                  height={1000}
                  width={1000}
                  className="h-5 w-5"
                  src={track?.image}
                  alt={`${track.track_name}`}
                  priority
                />
              </div>
              <div className="mt-[5px] flex items-center text-xs text-[#f50]">
                <span className="mr-[3px]">{track.users.username} -</span>
                <span>{track.track_name}</span>
              </div>
            </div>
            <button
              className="mr-[5px] mt-[5px]"
              onClick={() => dispatch(setSlugProduct(""))}
            >
              <IoClose className="opacity-50" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CreatePlaylist;
