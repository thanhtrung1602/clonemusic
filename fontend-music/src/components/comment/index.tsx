"use client";
import React, {FormEvent, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import Image from "next/image";
import {FaCommentAlt} from "react-icons/fa";
import {FaPlay} from "react-icons/fa6";
import {IoHeart} from "react-icons/io5";
import {IoHeartOutline} from "react-icons/io5";
import {MdAudiotrack} from "react-icons/md";
import {BsTrash} from "react-icons/bs";
import {IoPeople} from "react-icons/io5";
import {BiRepost} from "react-icons/bi";
import {Wrapper} from "../Popper";
import {Button} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import Tipfy from "@tippyjs/react";
import {IoIosSend} from "react-icons/io";
import {ITrack} from "@/types/track";
import useGet from "@/hooks/useGet";
import {useParams} from "next/navigation";
import {IUser} from "@/types/next-auth";
import {IComment} from "@/types/comment";
import usePost, {useDelete} from "@/hooks/usePost";

export default function Comment() {
    const queryClient = useQueryClient();
    const {data: user} = useGet<IUser>("/auth/profile");
    const {slug} = useParams();
    dayjs.extend(relativeTime);
    const [comment, setComment] = useState<string>("");
    const {mutate: post} = usePost();
    const {mutate: del} = useDelete();
    const {data: track} = useGet<ITrack>(`/tracks/findOneSlug/${slug}`);
    const paragraphs: string[] | undefined = track?.description
        ? track?.description.split("\n")
        : undefined;
    const {data: comments} = useGet<IComment[]>(`/comments/findAllCommentByTrack/${track?.id}`);

    const handleSubmitComment = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            title: comment,
            user_id: user?.userId,
            track_id: track?.id,
        };

        post({url: "/comments/sendComment", data: data}, {
            onSuccess: (res) => {
                if (res.status === 201) {
                    setComment(" ")
                    queryClient.invalidateQueries({
                        queryKey: [`/comments/findAllCommentByTrack/${track?.id}`],
                    }).then(r => r);
                }

            }
        });
    };

    const handleRemoveComment = (id: number) => {
        del(`/comments/delComment/${id}`, {
            onSuccess: (res) => {
                if (res.status === 200) {
                    queryClient.invalidateQueries({
                        queryKey: [`/comments/findAllCommentByTrack/${track?.id}`],
                    }).then(r => r);
                }
            },
        });
    };

    console.log({
        user: user?.userId === track?.users?.id,
        trackId: track?.users?.id,
        userId: user?.userId,
    });

    return (
        <section className="float-left border-r mt-5 border-[#f2f2f2] pr-[30px]">
            <article className="mb-[10px] flex">
                <div>
                    <Image
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                        src={
                            user?.image ||
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
                                    <IoIosSend className="h-6 w-6"/>
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
                            <Button>like</Button>

                            <Button
                                className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                                <span>Share</span>
                            </Button>
                            <Button
                                className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                                <span>Repost</span>
                            </Button>
                            <Button
                                className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                                <span>Copy Link</span>
                            </Button>
                            <Button
                                className="flex items-center gap-2 rounded border border-[#e5e5e5] py-[2px] pl-[10px] pr-3 text-sm text-[#333]">
                                <span>Add to Playlist</span>
                            </Button>
                        </div>
                        <ul className="flex items-center gap-3">
                            <li className="flex items-center gap-1 text-xs text-[#999]">
                                <FaPlay/>
                                <span>{0}</span>
                            </li>
                            <li className="flex items-center gap-1 text-xs text-[#999]">
                                <IoHeart/>
                                <span>{0}</span>
                            </li>
                            <li className="flex items-center gap-1 text-xs text-[#999]">
                                <BiRepost/>
                                <span>{0}</span>
                            </li>
                        </ul>
                    </div>
                </Wrapper>
            </article>

            <article className="flex gap-8">
                {user?.userId === track?.users?.id ? (
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
                                    {/* <img className="h-3 w-4" src={icon.follow} alt="" /> */}
                                    <span>45.4k</span>
                                </p>
                                <p className="flex items-center gap-1 text-xs text-[#999]">
                                    {/* <img className="h-3 w-4" src={icon.track} alt="" /> */}
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
                                    <IoPeople/>
                                    <span>45.4k</span>
                                </p>
                                <p className="flex items-center gap-1 text-xs text-[#999]">
                                    <MdAudiotrack/>
                                    <span>18</span>
                                </p>
                            </div>
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
                                <h3 className="flex items-center gap-1">
                                    <FaCommentAlt className="w-4 h-4 text-[#999999]"/>
                                    {/*    length comment*/}
                                </h3>
                                <div
                                    className="flex h-8 w-[182px] items-center gap-2 rounded border border-[#f50] pl-[10px] text-sm text-[#f50]">
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
                            <span className="font-semibold">
                              {cmt.users.username}
                            </span>
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
                                                    {user?.userId === cmt?.users?.id && (
                                                        <button onClick={() => handleRemoveComment(cmt.id)}>
                                                            <BsTrash className="w-4 h-4"/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <IoHeartOutline/>
                                                <span className="text-xs">0</span>
                                            </div>
                                        </div>
                                    </section>
                                ))}
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
