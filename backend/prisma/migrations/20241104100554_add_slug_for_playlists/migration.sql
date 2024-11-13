/*
  Warnings:

  - Added the required column `slug` to the `playlists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "playlists" ADD COLUMN     "slug" VARCHAR(250) NOT NULL;
