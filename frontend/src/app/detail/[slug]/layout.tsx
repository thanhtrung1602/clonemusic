"use client";
import Comment from "@/components/comment";
import Playlist from "@/components/playlist";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

export default function LayoutDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  const hiddenOnPlaylist = useSelector(
    (state: RootState) => state.action.hiddenOnPlaylist
  );
  return (
    <>
      <main className="flex w-full items-center justify-center">
        <div className="flex flex-col">
          {hiddenOnPlaylist && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
              <Playlist />
            </div>
          )}

          <div className="flex w-[1185.2px] items-center justify-center mt-11">
            {children}
          </div>
          <Comment />
        </div>
      </main>
    </>
  );
}
