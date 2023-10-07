import { apiSlice } from "./apiSlice";
import { Categories } from "@prisma/client";
import {
  COLLECTIONS_CATEGORIES_URL,
  COLLECTIONS_CATEGORY_URL,
} from "@/app/constants";

interface CreateCategory {
  collectionId: string;
  title: string;
  imageURL: string;
}

interface DeleteCategory {
  collectionId: string;
  categoryId: string;
}

interface AddCategoryComment {
  collectionId: string;
  categoryId: string;
  comment: string;
}

interface AddCategoryPhoto {
  collectionId: string;
  categoryId: string;
  image: string;
}

const categoriesApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Categories", "Category"],
});

export const categoriesApiSlice = categoriesApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Categories[], { collectionId: string }>({
      query: ({ collectionId }) => ({
        url: `${COLLECTIONS_CATEGORIES_URL}?collectionId=${collectionId}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getCategory: builder.query<
      Categories,
      { collectionId: string; categoryId: string }
    >({
      query: ({ collectionId, categoryId }) => ({
        url: `${COLLECTIONS_CATEGORY_URL}?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<Categories, CreateCategory>({
      query: ({ collectionId, title, imageURL }) => ({
        url: `${COLLECTIONS_CATEGORIES_URL}?collectionId=${collectionId}`,
        method: "POST",
        body: {
          title,
          image: imageURL,
        },
      }),
      invalidatesTags: ["Categories"],
    }),
    addCategoryNote: builder.mutation<Categories, AddCategoryComment>({
      query: ({ collectionId, categoryId, comment }) => ({
        url: `${COLLECTIONS_CATEGORY_URL}/notes?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "PUT",
        body: {
          comment,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    removeCategoryNote: builder.mutation<
      Categories,
      {
        collectionId: string;
        categoryId: string;
        noteId: string;
      }
    >({
      query: ({ collectionId, categoryId, noteId }) => ({
        url: `${COLLECTIONS_CATEGORY_URL}/notes?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "DELETE",
        body: {
          noteId,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    addCategoryPhoto: builder.mutation<Categories, AddCategoryPhoto>({
      query: ({ collectionId, categoryId, image }) => ({
        url: `${COLLECTIONS_CATEGORY_URL}/photos?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "PUT",
        body: {
          image,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    removeCategoryPhoto: builder.mutation<
      Categories,
      {
        collectionId: string;
        categoryId: string;
        photoId: string;
      }
    >({
      query: ({ collectionId, categoryId, photoId }) => ({
        url: `${COLLECTIONS_CATEGORY_URL}/photos?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "DELETE",
        body: {
          photoId,
        },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<Categories, DeleteCategory>({
      query: ({ collectionId, categoryId }) => ({
        url: `${COLLECTIONS_CATEGORIES_URL}?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useAddCategoryNoteMutation,
  useRemoveCategoryNoteMutation,
  useAddCategoryPhotoMutation,
  useRemoveCategoryPhotoMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
