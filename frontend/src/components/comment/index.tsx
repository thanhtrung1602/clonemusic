"use client";
import React, { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FaCommentAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { BsSoundwave } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { IoLink } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa6";
import { RiPlayListAddLine } from "react-icons/ri";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoIosSend } from "react-icons/io";
import { FaShareSquare } from "react-icons/fa";
import { Wrapper } from "../Popper";
import { ITrack } from "@/types/track";
import useGet from "@/hooks/useGet";
import { useParams } from "next/navigation";
import { IUser } from "@/types/user";
import { IComment } from "@/types/comment";
import usePost from "@/hooks/usePost";
import ResultComment from "@/components/comment/resultComment";
import { HandleFollow } from "@/utils/handleFollow";
import { HandleLike } from "@/utils/handleLike";
import { useDispatch } from "react-redux";
import {
  setSlugProduct,
  setTogglePlaylist,
  setTrackId,
} from "@/lib/features/actionsSlice";

export default function Comment() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data: user } = useGet<IUser>("/auth/profile");
  const { data: getOneUser } = useGet<IUser>(`/users/getUserId/${user?.id}`);
  const { slug } = useParams();
  dayjs.extend(relativeTime);
  const [comment, setComment] = useState<string>("");

  const { mutate: post } = usePost();

  const { data: track } = useGet<ITrack>(`/tracks/findOneSlug/${slug}`);
  const paragraphs: string[] | undefined = track?.description
    ? track?.description.split("\n")
    : undefined;
  const { data: comments } = useGet<IComment[]>(
    `/comments/findAllCommentByTrack/${track?.id}`
  );
  const { data: countComments } = useGet<number | undefined>(
    `/comments/findAllCountCommentByTrack/${track?.id}`
  );
  const { data: countLikes } = useGet<number>(
    `/likes/getCountLike/${track?.id}`
  );

  const { handleClickFollow, handleUnFollow, statusFollow } = HandleFollow(
    track?.users.id
  );

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title: comment,
      user_id: user?.id,
      track_id: track?.id,
    };

    post(
      { url: "/comments/sendComment", data: data },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            setComment("");
            queryClient.invalidateQueries({
              queryKey: [`/comments/findAllCommentByTrack/${track?.id}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/comments/findAllCountCommentByTrack/${track?.id}`],
            });
          }
        },
      }
    );
  };

  const { handleClickLike, handleUnLike, statusLike } = HandleLike(track?.id);

  return (
    <section className="float-left border-r mt-5 border-[#f2f2f2] pr-[30px]">
      <article className="mb-[10px] flex">
        <div>
          <Image
            width={1000}
            height={1000}
            className="h-10 w-10 rounded-full"
            src={
              getOneUser?.image ||
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            }
            alt=""
          />
        </div>
        <div className="ml-2">
          <form onSubmit={handleSubmitComment}>
            <div className="flex">
              <input
                className="h-10 w-[714px] rounded-3xl border-none bg-[#f3f3f3] pl-4 pr-9 text-sm font-normal outline-none"
                type="text"
                name=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id=""
                placeholder="Write a comment"
              />
              <div className="ml-4">
                <Button
                  className="relative h-10 w-10 rounded-full border border-[#cbcaca] bg-white"
                  type="submit"
                >
                  <IoIosSend className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </article>

      <article className="mb-5 border-b border-[#f2f2f2] pb-2">
        <Wrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {statusLike ? (
                <Button
                  onClick={() =>
                    handleUnLike(undefined, track?.id, "unLikeTrack")
                  }
                  sx={buttonStyles(true)}
                >
                  <IoHeart />
                  <span>like</span>
                </Button>
              ) : (
                <Button
                  onClick={() => handleClickLike(track?.id, 0, "sendLike")}
                  sx={buttonStyles(false)}
                >
                  <IoHeart />
                  <span>like</span>
                </Button>
              )}

              <Button sx={buttonStyles(false)}>
                <FaShareSquare />
                <span>Share</span>
              </Button>
              <Button sx={buttonStyles(false)}>
                <BiRepost className="h-5 w-5" />
                <span>Repost</span>
              </Button>
              <Button sx={buttonStyles(false)}>
                <IoLink className="h-4 w-4" />
                <span>Copy Link</span>
              </Button>
              <Button
                sx={buttonStyles(false)}
                onClick={() => {
                  dispatch(setTogglePlaylist());
                  dispatch(setSlugProduct(track?.slug));
                  dispatch(setTrackId(track?.id));
                }}
              >
                <RiPlayListAddLine className="h-5 w-5" />
                <span>Add to Playlist</span>
              </Button>
            </div>
            <ul className="flex items-center gap-3">
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <FaPlay />
                <span>{0}</span>
              </li>
              <li className="flex items-center gap-1 text-xs text-[#999]">
                <IoHeart />
                <span>{countLikes}</span>
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
        {user?.id === track?.users?.id ? (
          <div className="flex w-[148px] flex-col gap-2">
            <Image
              height={110}
              width={110}
              className="h-[120px] w-[120px] rounded-full"
              src={`${
                track?.users?.image ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }`}
              alt={`${track?.users.username}`}
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#333]">
                <h3>{track?.users?.username}</h3>
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
                track?.users?.image ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }`}
              alt={`${track?.users.username}`}
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm text-[#333]">
                <h3>{track?.users?.username}</h3>
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
        <div className="w-full">
          <div className="mb-6 line-clamp-5">
            {paragraphs
              ? paragraphs.map((paragraph, index) => (
                  <p className="my-2" key={index}>
                    {paragraph}
                  </p>
                ))
              : null}
          </div>
          <div>
            <div className="border-b border-[#f2f2f2] pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <FaCommentAlt className="w-4 h-4 text-[#999999]" />
                  <span>{countComments} comment</span>
                </div>
                <div className="flex h-8 w-[182px] items-center gap-2 rounded border border-[#f50] pl-[10px] text-sm text-[#f50]">
                  <span>Sorted by:</span>
                  <select className="outline-none" name="" id="">
                    <option value="">Newest</option>
                    <option value="">Oldest</option>
                    <option value="">TrackTime</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              {comments &&
                comments?.map((cmt: IComment) => (
                  <ResultComment cmt={cmt} key={cmt.id} />
                ))}
            </div>
          </div>
        </div>
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
