import EditButton from "@/components/shared/EditButton";
import FollowButton from "@/components/shared/FollowButton";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { profileTabMenus } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetCurrentUser,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { LikedPost } from ".";

const Profile = () => {
  const { user } = useUserContext();
  const { data: currentUser } = useGetCurrentUser();
  const { pathname } = useLocation();
  const { data: posts } = useGetUserPosts(currentUser?.$id);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const mPosts = posts as Models.Document;

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <img
          src={user.imageUrl}
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full"
        />
        <div>
          <h2 className="h2-bold">{user.name}</h2>
          <p className="small-regular text-light-3">@{user.username}</p>
          <div className="flex gap-10 mt-5">
            <div id="post">
              <p className="text-primary-500 body-medium">273</p>
              <p className="body-regular">Posts</p>
            </div>
            <div id="followers">
              <p className="text-primary-500 body-medium">147</p>
              <p className="body-regular">Followers</p>
            </div>
            <div id="following">
              <p className="text-primary-500 body-medium">151</p>
              <p className="body-regular">Following</p>
            </div>
          </div>
          <p className="mt-5">{user.bio}</p>
        </div>
        {currentUser?.$id === user.id ? <EditButton /> : <FollowButton />}
      </div>

      <div className="max-w-5xl flex w-full justify-between items-center">
        <div className="flex">
          {profileTabMenus.map((item, index) => (
            <div
              className={`${
                pathname === item.generateUrl(user.id) &&
                "bg-dark-4 border border-dark-4"
              } ${item.position === "s" ? "rounded-s-md" : "rounded-e-md"}`}
              key={index}
            >
              <Link to={item.generateUrl(user.id)} className="flex gap-2 p-3">
                <img src={item.img} alt="Posts" width={20} height={20} />
                <p className="small-medium">{item.label}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="Filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Content */}
      <Routes>
        <Route
          index
          element={
            <GridPostList
              posts={mPosts.documents}
              showStats={false}
              showUser={false}
            />
          }
        />
        {currentUser?.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPost />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
