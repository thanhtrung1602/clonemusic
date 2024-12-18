import { setIndPlaylist } from "@/lib/features/actionsSlice";
import { IPlaylistDetail } from "@/types/playlistDetail";
import Image from "next/image";
import { useDispatch } from "react-redux";
export default function ResultList({
  detail,
  index,
  key,
}: {
  detail: IPlaylistDetail;
  index: number;
  key: number;
}) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex w-full items-center gap-2 border-b p-0.5 cursor-pointer hover:bg-[#f2f2f2]"
      key={key}
      onClick={() => dispatch(setIndPlaylist(index))}
    >
      <div className="mr-[5px] mt-[5px] pl-1">
        <Image
          height={1000}
          width={1000}
          className="h-[30px] w-[30px] object-cover"
          src={detail?.tracks?.image}
          alt={`${detail?.tracks?.track_name}`}
          priority
        />
      </div>
      <div className="text-xs text-black">
        <span>{index + 1}</span>
      </div>
      <div className="flex items-center ">
        <span className="mr-[3px] text-sm text-[#ccc]">
          {detail?.tracks?.users?.username} -
        </span>
        <span className="text-sm text-black">{detail?.tracks?.track_name}</span>
      </div>
    </div>
  );
}
