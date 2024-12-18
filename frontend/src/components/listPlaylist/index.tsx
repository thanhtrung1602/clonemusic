"use client";
import { IPlaylistDetail } from "@/types/playlistDetail";
import { Wrapper } from "../Popper";
import { Button } from "@mui/material";
import { FaPlay } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { BsSoundwave } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { IoLink } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";
import useGet from "@/hooks/useGet";
import { IUser } from "@/types/next-auth";
import Image from "next/image";
import { HandleFollow } from "@/utils/handleFollow";
import { IPlaylist } from "@/types/playlist";

import ResultList from "./resultList";
// import { setCurrentTrack, setTrackId } from "@/lib/features/actionsSlice";

export default function ListPlaylists(props: {
  playlistDetails: IPlaylistDetail[] | undefined;
  playlist: IPlaylist | undefined;
}) {
  const { data: user } = useGet<IUser>("/auth/profile");
  const { handleClickFollow, handleUnFollow, statusFollow } = HandleFollow(
    props.playlist?.user_id
  );
  return (
    <section className="float-left border-r mt-5 border-[#f2f2f2] pr-[30px]">
      <article className="mb-5 border-b border-[#f2f2f2] pb-2">
        <Wrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button sx={buttonStyles(false)}>
                <FaShareSquare />
                <span>Share</span>
              </Button>
              <Button sx={buttonStyles(false)}>
                <IoLink className="h-4 w-4" />
                <span>Copy Link</span>
              </Button>
            </div>
            <ul className="flex items-center gap-3">
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <FaPlay />
                <span>{0}</span>
              </li>
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <IoHeart />
                <span>{0}</span>
              </li>
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <BiRepost className="h-4/6 w-4" />
                <span>{0}</span>
              </li>
            </ul>
          </div>
        </Wrapper>
      </article>

      <article className="flex gap-8">
        {user?.id === props?.playlist?.users?.id ? (
          <div className="flex w-[148px] flex-col gap-2">
            <Image
              height={1000}
              width={1000}
              className="h-[120px] w-[120px] rounded-full"
              src={`${
                props?.playlist?.users?.image ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }`}
              alt={`${props?.playlist?.users?.username}`}
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#333]">
                <h3>{props?.playlist?.users?.username}</h3>
              </div>
              <div className="flex items-center gap-3">
                <p className="flex items-center gap-1 text-xs text-[#999]">
                  <IoPeople />
                  <span>45.4k</span>
                </p>
                <p className="flex items-center gap-1 text-xs text-[#999]">
                  <BsSoundwave />
                  <span>18</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-[148px] flex-col gap-2">
            <Image
              height={110}
              width={110}
              className="h-[120px] w-[120px] rounded-full"
              src={`${
                props?.playlist?.users?.image ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }`}
              alt={`${props?.playlist?.users?.username}`}
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#333]">
                <h3>{props?.playlist?.users?.username}</h3>
              </div>
              <div className="flex items-center gap-3">
                <p className="flex items-center gap-1 text-xs text-[#999]">
                  <IoPeople />
                  <span>45.4k</span>
                </p>
                <p className="flex items-center gap-1 text-xs text-[#999]">
                  <BsSoundwave />
                  <span>18</span>
                </p>
              </div>
              {statusFollow ? (
                <button
                  className="text-[#ff4500] flex w-[86px] items-center py-[2px] gap-1 px-2 border border-[#ff4500] rounded-sm"
                  onClick={() => handleUnFollow()}
                >
                  <FaUserCheck className="w-4 h-4" />
                  <span className="text-xs">Following</span>
                </button>
              ) : (
                <button
                  className="border py-[2px] flex items-center border-black w-[75px] gap-1 text-sm rounded-sm px-2"
                  onClick={() => handleClickFollow()}
                >
                  <MdOutlinePersonAddAlt className="w-4 h-4" />
                  <span className="text-xs">Follow</span>
                </button>
              )}
            </div>
          </div>
        )}

        <section className="flex flex-col py-2.5 w-full">
          {props.playlistDetails?.map((detail, idx) => (
            <ResultList key={detail.id} index={idx} detail={detail} />
          ))}
        </section>
      </article>
    </section>
  );
}

const buttonStyles = (isLiked: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "6px 18px",
  height: "32px",
  textTransform: "none",
  color: isLiked ? "#ff4500" : "grey.700",
  bgcolor: "white",
  border: "1px solid",
  borderColor: "grey.200",
  borderRadius: 1,
  boxShadow: "none",
  "&:hover": {
    bgcolor: "grey.50",
    borderColor: "grey.200",
    boxShadow: "none",
  },
});
