import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Models } from "appwrite";
import {
  createPost,
  createUserAccount,
  deletePost,
  deleteSavePost,
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getRecentPost,
  getRelatedPosts,
  getUserById,
  getUserPosts,
  likePost,
  savePost,
  searchPost,
  signInAccount,
  signOutAcount,
  updatePost,
  updateUser,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAcount,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPost = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPost,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data: Models.Document | unknown) => {
      const mData = data as Models.Document;
      const id = mData.$id;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER, id],
      });
    },
  });
};

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: (data: Models.Document | unknown) => {
      const mData = data as Models.Document;
      const id = mData.$id;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER, id],
      });
    },
  });
};

export const useDeleteSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavePost(savedRecordId),
    onSuccess: (data: Models.Document | unknown) => {
      const mData = data as Models.Document;
      const id = mData.$id;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER, id],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId, // cache only post with new post id
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data: Models.Document | unknown) => {
      const mData = data as Models.Document;
      const id = mData.$id;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage: Models.Document | unknown) => {
      const mLastpage = lastPage as Models.Document;
      if (mLastpage && mLastpage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = mLastpage.documents[mLastpage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: undefined,
  });
};

export const useSearchPost = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPost(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetRelatedPosts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getRelatedPosts(userId),
    enabled: !!userId,
  });
};

export const useGetUserPosts = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};

export const useGetUserById = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data: Models.Document | unknown) => {
      const mData = data as Models.Document;
      const id = mData.$id;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER, id],
      });
    },
  });
};
