import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document | unknown;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  const mSearchedPosts = searchedPosts as Models.Document;
  if (isSearchFetching) return <Loader />;

  if (mSearchedPosts && mSearchedPosts.documents.length > 0) {
    return <GridPostList posts={mSearchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  );
};

export default SearchResults;
