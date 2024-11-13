/*
  Warnings:

  - A unique constraint covering the columns `[comment_id,user_id]` on the table `like_track` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "like_track" ADD COLUMN     "comment_id" INTEGER,
ALTER COLUMN "track_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "like_track_comment_id_user_id_key" ON "like_track"("comment_id", "user_id");

-- AddForeignKey
ALTER TABLE "like_track" ADD CONSTRAINT "fk_comment_like_track" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
