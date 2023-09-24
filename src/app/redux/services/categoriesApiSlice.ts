import { COLLECTIONS_URL } from "@/app/constants";
import { apiSlice } from "./apiSlice";
import { Categories } from "@prisma/client";

interface CreateCategory {
  collectionId: string;
  title: string;
  imageURL: string;
}

interface DeleteCategory {
  collectionId: string;
  categoryId: string;
}

const categoriesApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Category"],
});

export const categoriesApiSlice = categoriesApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Categories[], { collectionId: string }>({
      query: ({ collectionId }) => ({
        url: `${COLLECTIONS_URL}/categories?collectionId=${collectionId}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<Categories, CreateCategory>({
      query: ({ collectionId, title, imageURL }) => ({
        url: `${COLLECTIONS_URL}/categories?collectionId=${collectionId}`,
        method: "POST",
        body: {
          title,
          image: imageURL,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<Categories, DeleteCategory>({
      query: ({ collectionId, categoryId }) => ({
        url: `${COLLECTIONS_URL}/categories?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
