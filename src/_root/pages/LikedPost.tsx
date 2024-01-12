import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";

const LikedPost = () => {
  const { data: currentUser, isPending } = useGetCurrentUser();

  if (isPending)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );

  return <GridPostList posts={currentUser?.liked} showStats={false} />;
};

export default LikedPost;
