"use client";
import ListTrackGenre from "@/components/listTrackGenre";
import useGet from "@/hooks/useGet";
import { IGenre } from "@/types/genre";
import React from "react";

const MusicAlbumLayout = () => {
  const { data: genres } = useGet<IGenre[]>("/genre/findAll");

  return (
    <main className="container mx-auto px-4 mt-12">
      {genres?.map((genre) => (
        <div key={genre.id} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {genre.title}
          </h2>
          <ListTrackGenre genreId={genre.id} />
        </div>
      ))}
    </main>
  );
};

export default MusicAlbumLayout;
