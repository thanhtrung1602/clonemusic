"use client";

import { Wrapper } from "@/components/Popper";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";
import useGet from "@/hooks/useGet";
import { IUser } from "@/types/user";
import Image from "next/image";
import { GrEdit } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setHiddenOnEdit } from "@/lib/features/actionsSlice";

export default function ProfilePage() {
  const { slug } = useParams();
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [activeTab, setActiveTab] = useState("all");
  const { data: user } = useGet<IUser>(`/users/getUser/${slug}`);
  const dispatch = useDispatch();

  useEffect(() => {
    const img = imgRef.current;
    if (img && user?.image) {
      const fac = new FastAverageColor();

      const image = document.createElement("img") as HTMLImageElement;
      image.crossOrigin = "Anonymous";
      image.src = user.image;

      image.onload = () => {
        fac
          .getColorAsync(image)
          .then((color) => {
            setBgColor(color.hex);
          })
          .catch((e) => {
            console.error(e);
          });
      };

      image.onerror = (e) => {
        console.error("Image loading error:", e);
      };
    }
  }, [user]);

  const tabs = [
    { id: "all", label: "All" },
    { id: "tracks", label: "Tracks" },
    { id: "playlists", label: "Playlists" },
    { id: "reposts", label: "Reposts" },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="h-[260px] w-full">
        <Wrapper>
          <div
            className="h-full w-full p-[30px]"
            style={{ backgroundColor: bgColor }}
          >
            <div className="flex gap-6">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                <Image
                  ref={imgRef}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  src={
                    user?.image ||
                    "https://th.bing.com/th/id/OIP.9SB1WaK0z5zoHfL_eTs5lQHaE7?w=580&h=386&rs=1&pid=ImgDetMain"
                  }
                  alt={user?.username || "Profile picture"}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="inline-block">
                  <span className="bg-profile bg-opacity-80 text-white px-2 py-1 text-2xl">
                    {user?.username}
                  </span>
                </div>
                {user?.firstName || user?.lastName ? (
                  <div className="inline-block">
                    <span className="bg-profile bg-opacity-80 text-[#ccc] px-2 py-1 text-base">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                ) : null}

                {user?.city || user?.country ? (
                  <div className="inline-block">
                    <span className="bg-profile bg-opacity-80 text-[#ccc] px-2 py-1 text-base">
                      {user?.city}, {user?.country}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      <div className="flex justify-between items-center border-t border-b border-gray-200 px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 relative ${
                activeTab === tab.id
                  ? "text-orange-500"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button className="text-gray-800 hover:text-gray-600 py-2">
            Share
          </button>
          <button
            className="text-gray-800 text-sm hover:text-gray-600 py-[2px] flex items-center gap-1 border"
            onClick={() => dispatch(setHiddenOnEdit())}
          >
            <GrEdit />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
