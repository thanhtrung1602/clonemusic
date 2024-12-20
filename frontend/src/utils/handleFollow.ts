import usePost from "@/hooks/usePost";
import useGet from "@/hooks/useGet";
import { IUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { IFollow } from "@/types/follow";

export const HandleFollow = (followed: number | undefined) => {
  const queryClient = useQueryClient();
  const { mutate: post } = usePost();
  const { data: user } = useGet<IUser>("/auth/profile");
  const { data: follows } = useGet<IFollow[]>(
    `/follows/getStatusFollow/${followed}`
  );

  const handleClickFollow = () => {
    const data = {
      follower_id: followed,
      following_id: user?.id,
    };

    post(
      { url: "/follows/followed", data },
      {
        onSuccess: (res) => {
          console.log("this is response", res);
          if (res.status === 201) {
            queryClient.invalidateQueries({
              queryKey: [`/follows/getStatusFollow/${followed}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/follows/getCountFollowing/${followed}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/follows/getCountFollowed/${followed}`],
            });
          }
        },
      }
    );
  };

  const handleUnFollow = () => {
    const data = {
      follower_id: followed,
      following_id: user?.id,
    };

    post(
      { url: "/follows/unFollow", data },
      {
        onSuccess: (res) => {
          console.log("this is response", res);
          if (res.status === 201) {
            queryClient.invalidateQueries({
              queryKey: [`/follows/getStatusFollow/${followed}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/follows/getCountFollowing/${followed}`],
            });

            queryClient.invalidateQueries({
              queryKey: [`/follows/getCountFollowed/${followed}`],
            });
          }
        },
      }
    );
  };

  const statusFollow = follows?.some(
    (follow) =>
      follow.follower_id === followed && follow.following_id === user?.id
  );

  return { handleClickFollow, handleUnFollow, statusFollow };
};
