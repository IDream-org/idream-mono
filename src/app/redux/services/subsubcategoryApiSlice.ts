import { CategoryItems, SubSubCategory } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { SUB_SUB_CATEGORIES_URL, SUB_SUB_CATEGORY_URL } from "@/app/constants";

interface AddSubSubCategoryComment {
  collectionId: string;
  subsubcategoryId: string;
  comment: string;
}

interface AddSubSubCategoryPhoto {
  collectionId: string;
  subsubcategoryId: string;
  image: string;
}

const subsubcategoryApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["SubSubCategories", "SubSubCategory"],
});

export const subcategoryApiSlice = subsubcategoryApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getSubSubCategories: builder.query<
      CategoryItems[],
      {
        subCategoryId: string;
        collectionId: string;
      }
    >({
      query: ({ subCategoryId, collectionId }) => ({
        url: `${SUB_SUB_CATEGORIES_URL}?collectionId=${collectionId}&subsubcategoryId=${subCategoryId}`,
        method: "GET",
      }),
      providesTags: ["SubSubCategories"],
    }),
    getSubSubCategory: builder.query<
      CategoryItems,
      {
        subsubcategoryId: string;
        collectionId: string;
      }
    >({
      query: ({ subsubcategoryId, collectionId }) => ({
        url: `${SUB_SUB_CATEGORY_URL}?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
        method: "GET",
      }),
      providesTags: ["SubSubCategory"],
    }),
    createSubSubCategory: builder.mutation<
      SubSubCategory,
      {
        subCategoryId: string;
        collectionId: string;
        title: string;
        imageURL: string;
      }
    >({
      query: ({ subCategoryId, collectionId, title, imageURL }) => ({
        url: `${SUB_SUB_CATEGORIES_URL}?collectionId=${collectionId}&subsubcategoryId=${subCategoryId}`,
        method: "POST",
        body: {
          title,
          image: imageURL,
        },
      }),
      invalidatesTags: ["SubSubCategories"],
    }),
    addSubSubCategoryNote: builder.mutation<
      SubSubCategory,
      AddSubSubCategoryComment
    >({
      query: ({ collectionId, subsubcategoryId, comment }) => ({
        url: `${SUB_SUB_CATEGORY_URL}/notes?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
        method: "PUT",
        body: {
          comment,
        },
      }),
      invalidatesTags: ["SubSubCategory"],
    }),
    removeSubSubCategoryNote: builder.mutation<
      SubSubCategory,
      {
        collectionId: string;
        subsubcategoryId: string;
        noteId: string;
      }
    >({
      query: ({ collectionId, subsubcategoryId, noteId }) => ({
        url: `${SUB_SUB_CATEGORY_URL}/notes?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
        method: "DELETE",
        body: {
          noteId,
        },
      }),
      invalidatesTags: ["SubSubCategory"],
    }),
    addSubSubCategoryPhoto: builder.mutation<
      SubSubCategory,
      AddSubSubCategoryPhoto
    >({
      query: ({ collectionId, subsubcategoryId, image }) => ({
        url: `${SUB_SUB_CATEGORY_URL}/photos?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
        method: "PUT",
        body: {
          image,
        },
      }),
      invalidatesTags: ["SubSubCategory"],
    }),
    removeSubSubCategoryPhoto: builder.mutation<
      SubSubCategory,
      {
        collectionId: string;
        subsubcategoryId: string;
        photoId: string;
      }
    >({
      query: ({ collectionId, subsubcategoryId, photoId }) => ({
        url: `${SUB_SUB_CATEGORY_URL}/photos?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
        method: "DELETE",
        body: {
          photoId,
        },
      }),
      invalidatesTags: ["SubSubCategory"],
    }),
    deleteSubSubCategory: builder.mutation<
      SubSubCategory,
      { collectionId: string; subsubcategoryId: string }
    >({
      query: ({ collectionId, subsubcategoryId }) => ({
        url: `${SUB_SUB_CATEGORIES_URL}?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubSubCategories"],
    }),
  }),
});

export const {
  useGetSubSubCategoriesQuery,
  useGetSubSubCategoryQuery,
  useCreateSubSubCategoryMutation,
  useAddSubSubCategoryNoteMutation,
  useRemoveSubSubCategoryNoteMutation,
  useAddSubSubCategoryPhotoMutation,
  useRemoveSubSubCategoryPhotoMutation,
  useDeleteSubSubCategoryMutation,
} = subcategoryApiSlice;
