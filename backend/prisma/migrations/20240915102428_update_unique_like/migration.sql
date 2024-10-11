/*
  Warnings:

  - A unique constraint covering the columns `[track_id,user_id]` on the table `like_track` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "like_track_track_id_user_id_key" ON "like_track"("track_id", "user_id");
