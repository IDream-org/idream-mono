import { Collections, Roles } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { COLLECTION_URL } from "@/app/constants";

const collectionApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Collection"],
});

export const collectionApiSlice = collectionApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getCollection: builder.query<Collections, { collectionId: string }>({
      query: ({ collectionId }) => ({
        url: `${COLLECTION_URL}?collectionId=${collectionId}`,
      }),
      providesTags: ["Collection"],
    }),
    addUser: builder.mutation<
      Collections,
      {
        collectionId: string;
        user: { user: string; role: string; userId: string };
      }
    >({
      query: ({ collectionId, user }) => ({
        url: `${COLLECTION_URL}/users?collectionId=${collectionId}`,
        method: "PUT",
        body: {
          user,
        },
      }),
      invalidatesTags: ["Collection"],
    }),
    removeUser: builder.mutation<
      Collections,
      {
        collectionId: string;
        userId: string;
      }
    >({
      query: ({ collectionId, userId }) => ({
        url: `${COLLECTION_URL}/users?collectionId=${collectionId}`,
        method: "DELETE",
        body: {
          userId,
        },
      }),
      invalidatesTags: ["Collection"],
    }),
    editUserRole: builder.mutation<
      Collections,
      {
        collectionId: string;
        userId: string;
        userRole: Roles;
      }
    >({
      query: ({ collectionId, userId, userRole }) => ({
        url: `${COLLECTION_URL}/users/role?collectionId=${collectionId}`,
        method: "PUT",
        body: {
          userId,
          userRole,
        },
      }),
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useGetCollectionQuery,
  useAddUserMutation,
  useRemoveUserMutation,
  useEditUserRoleMutation,
} = collectionApiSlice;
