import { Collections } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { COLLECTIONS_URL } from "@/app/constants";

interface CreateCollection {
  title: string;
  imageURL: string;
}

const collectionsApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Collections"],
});

export const collectionsApiSlice = collectionsApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<Collections[], {}>({
      query: () => ({
        url: COLLECTIONS_URL,
      }),
      providesTags: ["Collections"],
    }),
    createCollection: builder.mutation<Collections, CreateCollection>({
      query: ({ title, imageURL }) => ({
        url: COLLECTIONS_URL,
        method: "POST",
        body: {
          title,
          image: imageURL,
        },
      }),
      invalidatesTags: ["Collections", "AllCategoryItems"],
    }),
    deleteCollection: builder.mutation<Collections, { collectionId: string }>({
      query: ({ collectionId }) => ({
        url: `${COLLECTIONS_URL}?collectionId=${collectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collections", "AllCategoryItems"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
} = collectionsApiSlice;
