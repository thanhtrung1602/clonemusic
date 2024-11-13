/*
  Warnings:

  - A unique constraint covering the columns `[playlist_id,track_id]` on the table `playlist_track` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "playlist_track_playlist_id_track_id_key" ON "playlist_track"("playlist_id", "track_id");
