import { Collections, Roles } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { COLECTION_USERS_URL, COLLECTION_URL } from "@/app/constants";

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
        url: `${COLECTION_USERS_URL}?collectionId=${collectionId}`,
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
        url: `${COLECTION_USERS_URL}?collectionId=${collectionId}`,
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
        url: `${COLECTION_USERS_URL}/role?collectionId=${collectionId}`,
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
