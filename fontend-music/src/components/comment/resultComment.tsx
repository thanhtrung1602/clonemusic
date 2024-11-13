import Link from "next/link";
import Tipfy from "@tippyjs/react";
import Image from "next/image";
import dayjs from "dayjs";
import { BsTrash } from "react-icons/bs";
import { IoHeart } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import React from "react";
import { IComment } from "@/types/comment";
import { useDelete } from "@/hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import useGet from "@/hooks/useGet";
import { IUser } from "@/types/next-auth";
import { ILike } from "@/types/like";
import { HandleLike } from "@/utils/handleLike";

export default function ResultComment({ cmt }: { cmt: IComment }) {
  const queryClient = useQueryClient();

  const { data: user } = useGet<IUser>("/auth/profile");
  const { mutate: del } = useDelete();

  const { data: countLikeComment } = useGet<number>(
    `/likes/getCountLikeComment/${cmt.id}`
  );
  const { data: likeComment } = useGet<ILike[]>(
    `/likes/getStatusLikeComment/${cmt.id}`
  );

  const handleRemoveComment = (id: number) => {
    del(`/comments/delComment/${id}`, {
      onSuccess: (res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({
            queryKey: [`/comments/findAllCommentByTrack/${id}`],
          });

          queryClient.invalidateQueries({
            queryKey: [`/comments/findAllCountCommentByTrack/${id}`],
          });
        }
      },
    });
  };

  const statusLikeComment = likeComment?.some(
    (like) => user?.id === like?.user_id && like?.comment_id === cmt.id
  );

  const { handleClickLike, handleUnLike } = HandleLike();

  return (
    <section className="flex w-full gap-3 pr-2.5 pt-5" key={cmt.id}>
      <Link href={"/profile/" + cmt.users.username}>
        <Tipfy
          theme="light"
          className="h-[200px] w-[150px] rounded shadow-custom"
          content={
            <div className="flex items-center justify-center">
              <div className="flex h-full flex-col items-center gap-3 p-2.5">
                <div>
                  <Image
                    height={80}
                    width={80}
                    className="h-20 w-20 rounded-full"
                    src={`${
                      cmt.users.image ||
                      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                    }`}
                    alt=""
                  />
                </div>
                <div>
                  <span className="text-sm text-[#333]">
                    {cmt.users.username}
                  </span>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-[4px] border border-[#e5e5e5] bg-[#f50] py-[2px] pl-[10px] pr-2 text-xs text-white"
                  >
                    {/* <img src={icon.userPlusW} alt="" /> */}
                    <span>Follow</span>
                  </button>
                </div>
              </div>
            </div>
          }
        >
          <div>
            <Image
              height={40}
              width={40}
              className="h-10 w-10 rounded-full"
              src={`${
                cmt.users.image ||
                "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
              }`}
              alt="avatar user"
            />
          </div>
        </Tipfy>
      </Link>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-1 text-sm text-black">
          <div className="flex items-center gap-4">
            <Link href={"/profile/" + cmt.users.id}>
              <span className="font-semibold">{cmt.users.username}</span>
            </Link>
            <span className="text-xs text-[#666]">
              {dayjs(cmt.created_at).fromNow()}
            </span>
          </div>
          <div className="mb-1 w-full">
            <p>{cmt.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Reply</span>
            {user?.id === cmt?.users?.id && (
              <button onClick={() => handleRemoveComment(cmt.id)}>
                <BsTrash className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        {statusLikeComment ? (
          <button
            className="flex flex-col items-center"
            onClick={() =>
              handleUnLike(cmt?.id, undefined, "unLikeTrackComment")
            }
          >
            <IoHeart className="text-[#f50]" />
            <span className="text-xs">{countLikeComment}</span>
          </button>
        ) : (
          <button
            className="flex flex-col items-center"
            onClick={() => handleClickLike(0, cmt?.id, "sendLikeComment")}
          >
            <IoHeartOutline />
            <span className="text-xs">{countLikeComment}</span>
          </button>
        )}
      </div>
    </section>
  );
}
