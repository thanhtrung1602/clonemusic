import Comment from "@/components/comment";
import Header from "@/components/header";
import React from "react";

export default function layoutDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex w-full items-center justify-center">
        <div className="flex flex-col">
          <div className="flex w-[1185.2px] items-center justify-center mt-11">
            {children}
          </div>
          <Comment />
        </div>
      </main>
    </>
  );
}
