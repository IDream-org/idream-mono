import { SubCategory } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { SUB_CATEGOIES_URL, SUB_CATEGOY_URL } from "@/app/constants";

interface AddSubCategoryComment {
  collectionId: string;
  subCategoryId: string;
  comment: string;
}

const subcategoryApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Subcategories", "Subcategory"],
});

export const subcategoryApiSlice = subcategoryApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategories: builder.query<
      SubCategory[],
      { collectionId: string; categoryId: string }
    >({
      query: ({ collectionId, categoryId }) => ({
        url: `${SUB_CATEGOIES_URL}?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Subcategories"],
    }),
    getSubcategory: builder.query<
      SubCategory,
      { collectionId: string; subcategoryId: string }
    >({
      query: ({ collectionId, subcategoryId }) => ({
        url: `${SUB_CATEGOY_URL}?collectionId=${collectionId}&subcategoryId=${subcategoryId}`,
        method: "GET",
      }),
      providesTags: ["Subcategory"],
    }),
    createSubcategory: builder.mutation<
      SubCategory,
      {
        categoryId: string;
        collectionId: string;
        title: string;
        imageURL: string;
      }
    >({
      query: ({ collectionId, categoryId, title, imageURL }) => ({
        url: `${SUB_CATEGOIES_URL}?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "POST",
        body: {
          title,
          image: imageURL,
        },
      }),
      invalidatesTags: ["Subcategories"],
    }),
    addSubCategoryNote: builder.mutation<SubCategory, AddSubCategoryComment>({
      query: ({ collectionId, subCategoryId, comment }) => ({
        url: `${SUB_CATEGOY_URL}/notes?collectionId=${collectionId}&subCategoryId=${subCategoryId}`,
        method: "PUT",
        body: {
          comment,
        },
      }),
      invalidatesTags: ["Subcategory"],
    }),
    removeSubCategoryNote: builder.mutation<
      SubCategory,
      {
        collectionId: string;
        subCategoryId: string;
        noteId: string;
      }
    >({
      query: ({ collectionId, subCategoryId, noteId }) => ({
        url: `${SUB_CATEGOY_URL}/notes?collectionId=${collectionId}&subCategoryId=${subCategoryId}`,
        method: "DELETE",
        body: {
          noteId,
        },
      }),
      invalidatesTags: ["Subcategory"],
    }),
    deleteSubCategory: builder.mutation<
      SubCategory,
      { collectionId: string; subCategoryId: string }
    >({
      query: ({ collectionId, subCategoryId }) => ({
        url: `${SUB_CATEGOIES_URL}?collectionId=${collectionId}&subCategoryId=${subCategoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategories"],
    }),
  }),
});

export const {
  useGetSubcategoriesQuery,
  useGetSubcategoryQuery,
  useCreateSubcategoryMutation,
  useAddSubCategoryNoteMutation,
  useRemoveSubCategoryNoteMutation,
  useDeleteSubCategoryMutation,
} = subcategoryApiSlice;
