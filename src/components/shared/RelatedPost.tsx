import { useGetRelatedPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import GridPostList from "./GridPostList";
import Loader from "./Loader";

const RelatedPost = ({ userId }: { userId: string }) => {
  const { data: relatedPosts, isPending: isRelatedPostLoading } =
    useGetRelatedPosts(userId);

  const mRelatedPost = relatedPosts as Models.Document;

  if (!mRelatedPost) return <Loader />;

  return (
    <div className="flex flex-col">
      <hr className="border w-full border-dark-4/80 mb-5" />
      <h1 className="h2-semibold md:h1-bold text-left w-full mb-2">
        More Related Posts
      </h1>
      {isRelatedPostLoading && <Loader />}
      <GridPostList posts={mRelatedPost.documents} />
    </div>
  );
};

export default RelatedPost;
