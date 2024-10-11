-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "track_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(250) NOT NULL,
    "lastname" VARCHAR(250) NOT NULL,
    "city" VARCHAR(250) NOT NULL,
    "country" VARCHAR(250) NOT NULL,
    "socialnetwork" VARCHAR(250) NOT NULL,
    "bio" VARCHAR(250) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like_track" (
    "id" SERIAL NOT NULL,
    "track_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "like_track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist_track" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "date" TIMESTAMP(6),
    "playlist_id" INTEGER,
    "track_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlist_track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" SERIAL NOT NULL,
    "playlist_name" VARCHAR(250) NOT NULL,
    "image" VARCHAR(250) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" SERIAL NOT NULL,
    "track_name" VARCHAR(250) NOT NULL,
    "sound" VARCHAR(250) NOT NULL,
    "image" VARCHAR(250),
    "description" VARCHAR(250),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(250) NOT NULL,
    "image" VARCHAR(255),
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_comment_track_id" ON "comment"("track_id");

-- CreateIndex
CREATE INDEX "idx_comment_user_id" ON "comment"("user_id");

-- CreateIndex
CREATE INDEX "idx_follower_id" ON "follow"("follower_id");

-- CreateIndex
CREATE INDEX "idx_following_id" ON "follow"("following_id");

-- CreateIndex
CREATE INDEX "idx_user_info_user_id" ON "info"("user_id");

-- CreateIndex
CREATE INDEX "idx_like_track_track_id" ON "like_track"("track_id");

-- CreateIndex
CREATE INDEX "idx_like_track_user_id" ON "like_track"("user_id");

-- CreateIndex
CREATE INDEX "idx_playlist_track_playlist_id" ON "playlist_track"("playlist_id");

-- CreateIndex
CREATE INDEX "idx_playlist_track_track_id" ON "playlist_track"("track_id");

-- CreateIndex
CREATE INDEX "idx_playlists_user_id" ON "playlists"("user_id");

-- CreateIndex
CREATE INDEX "idx_genre_id" ON "genre"("id");

-- CreateIndex
CREATE INDEX "idx_tracks_user_id" ON "tracks"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_track_comment" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_user_comment" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "fk_follower" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "fk_following" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "info" ADD CONSTRAINT "fk_user_info" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "like_track" ADD CONSTRAINT "fk_track_like_track" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "like_track" ADD CONSTRAINT "fk_user_like_track" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist_track" ADD CONSTRAINT "fk_playlist" FOREIGN KEY ("playlist_id") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlist_track" ADD CONSTRAINT "fk_track_playlist" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "fk_user_playlists" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "fk_user_tracks" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "fk_genre_tracks" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
