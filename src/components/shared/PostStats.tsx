import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutation";
import { checkIsLiked } from "@/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import Loader from "./Loader";

type PostsStatsProps = {
  post?: Models.Document | unknown;
  userId: string;
};

const PostStats = ({ post, userId }: PostsStatsProps) => {
  const { data: currentUser } = useGetCurrentUser();

  const currentPost = post as Models.Document;

  const likesList = currentPost.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeletingSaved } =
    useDeleteSavePost();

  const { toast } = useToast();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLikes = newLikes.includes(userId);

    if (hasLikes) {
      setLikes(false);
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({
      postId: currentPost.$id,
      likesArray: newLikes,
    });
  };

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === currentPost.$id
  );

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    } else {
      savePost({
        postId: currentPost.$id,
        userId: userId,
      });
      setIsSaved(true);
      toast({
        title: "Post saved!",
      });
    }
  };

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const containerStyles = location.pathname.startsWith("/profile") && "w-full";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}
    >
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="Liked"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={`${
              isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
            }`}
            alt="Liked"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
