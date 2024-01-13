import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import {
  useGetRecentPost,
  useGetUsers,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPost();

  const { data: creators, isPending: isUserLoading } = useGetUsers(10);

  const mCreators = creators as Models.Document;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
          {isErrorPosts && (
            <p className="text-light-4 mt-10 text-center w-full">
              Something went wrong
            </p>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !mCreators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {mCreators?.documents.map((creator: Models.Document) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
