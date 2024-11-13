import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { ILike } from "@/types/like";
import { IUser } from "@/types/next-auth";
import { useQueryClient } from "@tanstack/react-query";

export const HandleLike = (id: number | undefined) => {
  const queryClient = useQueryClient();
  const { mutate: post } = usePost();
  const { data: user } = useGet<IUser>("/auth/profile");
  const { data: likes } = useGet<ILike[]>(`/likes/getStatusLike/${id}`);
  const handleClickLike = (
    track_id: number | undefined,
    comment_id: number,
    message: string
  ) => {
    const data = {
      track_id: track_id,
      user_id: user?.id,
      comment_id: comment_id,
    };
    post(
      { url: `/likes/${message}`, data },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            queryClient.invalidateQueries({
              queryKey: [`/likes/getCountLikeComment/${comment_id}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/likes/getStatusLikeComment/${comment_id}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/likes/getStatusLike/${track_id}`],
            });
            queryClient.invalidateQueries({
              queryKey: [`/likes/getCountLike/${track_id}`],
            });
          }
        },
      }
    );
  };

  const handleUnLike = (
    comment_id?: number | undefined,
    track_id?: number | undefined,
    message?: string
  ) => {
    const data = {
      track_id: track_id,
      comment_id: comment_id,
      user_id: user?.id,
    };

    post(
      { url: `/likes/${message}`, data },
      {
        onSuccess: (res) => {
          if (res.status === 201) {
            queryClient.invalidateQueries({
              queryKey: [`/likes/getCountLikeComment/${comment_id}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/likes/getStatusLikeComment/${comment_id}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/likes/getStatusLike/${track_id}`],
            });
            queryClient.invalidateQueries({
              queryKey: [`/likes/getCountLike/${track_id}`],
            });
          }
        },
      }
    );
  };

  const statusLike = likes?.some(
    (like) => like.user_id === user?.id && like.track_id === id
  );

  return { handleClickLike, handleUnLike, statusLike };
};
