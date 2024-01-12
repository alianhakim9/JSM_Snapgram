import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import RelatedPost from "@/components/shared/RelatedPost";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/utils";
import { Models } from "appwrite";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const mPost = post as Models.Document;

  const { mutateAsync: deletedPost, isPending: isDeletedPost } =
    useDeletePost();

  const { toast } = useToast();

  const { user } = useUserContext();

  const navigate = useNavigate();

  if (!mPost) return <Loader />;

  if (isDeletedPost) return <Loader />;

  const handleDeletePost = async () => {
    try {
      const deletePost = await deletedPost({
        postId: mPost.$id,
        imageId: mPost.imageId,
      });
      if (!deletePost) {
        toast({
          title: "Please try again.",
        });
      }
      return navigate("/explore");
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete",
      });
    }
  };

  return (
    <div className="w-full container">
      <div className="post_details-container">
        {isPending ? (
          <Loader />
        ) : (
          <div className="post_details-card">
            <img
              src={mPost?.imageUrl}
              alt="Creator"
              className="post_details-img"
            />
            <div className="post_details-info">
              <div className="flex-between w-full">
                <Link
                  to={`/posts/${mPost?.creator.$id}`}
                  className="flex gap-3 items-center"
                >
                  <img
                    src={
                      mPost?.creator.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
                  />

                  <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">
                      {mPost?.creator.name}
                    </p>
                    <div className="flex-center gap-2 text-light-3">
                      <p className="subtle-semibold lg:small-regular">
                        {multiFormatDateString(mPost?.$createdAt)}
                      </p>
                      -
                      <p className="subtle-semibold lg:small-regular">
                        {mPost?.location}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex-center">
                  <Link
                    to={`/update-post/${mPost?.$id}`}
                    className={`${user?.id !== mPost?.creator.$id && "hidden"}`}
                  >
                    <img
                      src={"/assets/icons/edit.svg"}
                      alt="Edit"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className={`${
                      user?.id !== mPost?.creator.$id && "hidden"
                    } ghost_details-delete-btn`}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="Delete"
                      width={24}
                      height={24}
                    />
                  </Button>
                </div>
              </div>
              <hr className="border w-full border-dark-4/80" />
              <div className="flex flex-col flex-1 w-full small-medium lg:base-medium">
                <p>{mPost?.caption}</p>
                <ul className="flex gap-1 mt-2">
                  {mPost?.tags.map((tag: string) => (
                    <li key={tag} className="text-light-3">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
            </div>
          </div>
        )}
        <RelatedPost userId={mPost.creator.$id} />
      </div>
    </div>
  );
};

export default PostDetails;
