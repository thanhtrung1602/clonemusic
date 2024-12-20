"use client";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { IUser } from "@/types/user";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCamera } from "react-icons/io5";
type Genre = {
  id: number;
  title: string;
};
export default function PostPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [track_name, setTrack_name] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [sound, setSound] = useState<File | null>(null);
  const [genre_id, setGenreId] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const { data: user } = useGet<IUser>("/auth/profile");
  const { mutate } = usePost();

  const { data: genres } = useGet<Genre[]>("/genre/findAll");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmitPostTrack = () => {
    if (image && sound && user?.id) {
      const formData = new FormData();
      formData.append("track_name", track_name);
      formData.append("image", image);
      formData.append("sound", sound);
      formData.append("user_id", user?.id.toString());
      formData.append("genre_id", genre_id.toString());
      mutate(
        { url: "/tracks/createTrack/", data: formData },
        {
          onSuccess: (res) => {
            if (res.status === 201) {
              toast.success("upload track successfully!");
              setTrack_name("");
              setDescription("");
              setImagePreview(null);
              setImage(null);
              setSound(null);
            }
          },
        }
      );
    }
  };

  return (
    <section className="flex items-center justify-center mt-12">
      <article className="flex w-[800px] gap-6 border px-6 py-7 rounded-xl">
        <div className="relative h-[260px] w-[260px] bg-gradient-to-r rounded-lg from-[#87CEEB] to-[#4682B4]">
          {imagePreview ? (
            <Image
              height={1000}
              width={1000}
              src={imagePreview}
              alt="Uploaded preview"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : null}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button className="relative flex w-[140px] cursor-pointer items-center gap-1 rounded-lg border bg-[#ffffffcc] py-1.5 pl-3 pr-3.5 text-sm text-[#333]">
              <IoCamera className="w-5 h-5" />
              <span className="text-[14px]">Upload image</span>
            </button>
            <input
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleImageUpload}
              type="file"
              accept="image/jpeg,image/pjpeg,image/gif,image/png"
            />
          </div>
        </div>
        <div className="w-[470px]">
          <div className="mb-5 flex flex-col gap-2.5">
            <label className="text-xs text-[#333]" htmlFor="idSound">
              Permalink *
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              type="file"
              accept="audio/mp3"
              name=""
              onChange={(e) => setSound(e.target?.files[0])}
              id="idSound"
            />
          </div>
          <div className="my-5 flex w-full flex-col gap-2.5">
            <label className="text-xs text-[#333]" htmlFor="idTitle">
              Title *
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Name your track"
              value={track_name}
              onChange={(e) => setTrack_name(e.target.value)}
              id="idTitle"
              type="text"
            />
          </div>
          <div className="my-5 flex w-full flex-col gap-2.5">
            <label className="text-xs text-[#333]" htmlFor="idTitle">
              Genre
            </label>
            <select
              className="h-9 w-[230px] rounded-lg border px-3 py-2 text-sm text-[#333] outline-none"
              name=""
              id=""
              onChange={(e) => setGenreId(Number(e.target.value))}
            >
              <option value="">none</option>
              {genres?.map((genre) => (
                <option value={genre.id} key={genre.id}>
                  {genre.title}
                </option>
              ))}
            </select>
          </div>
          <div className="my-5 flex w-full flex-col gap-2.5">
            <label className="text-xs text-[#333]" htmlFor="idAdditionalTags ">
              Additional tags
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Add tags to describe the genre and mood of your track"
              id="idAdditionalTags "
              type="text"
            />
          </div>
          <div className="my-5 flex w-full flex-col gap-2.5">
            <label className="text-xs text-[#333]" htmlFor="idDescription ">
              Description
            </label>
            <textarea
              name=""
              className="h-[130px] w-full resize-none rounded-lg border px-3 py-2 text-sm"
              placeholder="Describe your track"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id=""
            ></textarea>
          </div>
          <div className="my-5 flex w-full flex-col gap-2.5">
            <label className="text-xs text-[#333]" htmlFor="idDescription ">
              Caption
            </label>
            <textarea
              name=""
              className="h-[85px] w-full resize-none rounded-lg border px-3 py-2 text-sm"
              placeholder="Add a caption to your post (optional)"
              id=""
            ></textarea>
          </div>
          <div className="flex items-center justify-end pt-6">
            <button className="mr-2.5 rounded-lg border bg-white py-1.5 px-3 text-[#333] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f50]">
              Cancel
            </button>
            <button
              className="rounded-lg border bg-[#f50] py-1.5 px-3 text-white hover:bg-[#d94700] focus:outline-none focus:ring-2 focus:ring-[#f50]"
              onClick={handleSubmitPostTrack}
            >
              Save
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
