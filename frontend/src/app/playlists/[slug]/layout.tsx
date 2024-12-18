"use client";
import React from "react";

export default function LayoutPlaylists({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex w-[1185.2px] items-center justify-center mt-11">
        {children}
      </div>
    </main>
  );
}
