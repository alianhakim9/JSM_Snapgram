import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";

const Saved = () => {
  const { user: currentUser } = useUserContext();
  const { data: posts } = useGetSavedPosts(currentUser.id);

  const mPosts = posts as Models.Document[];

  if (!mPosts) {
    return (
      <div className="flex w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="saved-container">
      <GridPostList posts={mPosts} />
    </div>
  );
};

export default Saved;
