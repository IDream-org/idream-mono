import { COLLECTIONS_URL } from "@/app/constants";
import { apiSlice } from "./apiSlice";
import { CategoryItems } from "@prisma/client";

interface GetCategoryItem {
  collectionId: string;
  categoryId: string;
  categoryItemId: string | null;
}

interface CreateCategoryItem {
  collectionId: string;
  categoryId: string;
  categoryItemId: string | null;
  item: Partial<CategoryItems>;
}

interface AddCategoryItemComment {
  collectionId: string;
  categoryItemId: string;
  comment: string;
}

interface ChangeCategoryItemFavorite {
  collectionId: string;
  categoryItemId: string;
  done: boolean;
}

interface DeleteCategoryItem {
  collectionId: string;
  categoryItemId: string;
}

const categoryItemApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["CategoryItems", "CategoryItem"],
});

export const categoryItemApiSlice = categoryItemApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryItems: builder.query<
      CategoryItems[],
      { collectionId: string; categoryId: string }
    >({
      query: ({ categoryId, collectionId }) => ({
        url: `${COLLECTIONS_URL}/categories/categoryItems?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "GET",
      }),
      providesTags: ["CategoryItems"],
    }),
    getCategoryItem: builder.query<CategoryItems, GetCategoryItem>({
      query: ({ collectionId, categoryId, categoryItemId }) => ({
        url: `${COLLECTIONS_URL}/categories/categoryItems/categoryItem?collectionId=${collectionId}&categoryId=${categoryId}${
          categoryItemId ? `&categoryItemId=${categoryItemId}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["CategoryItem"],
    }),
    createCategoryItem: builder.mutation<CategoryItems, CreateCategoryItem>({
      query: ({ item, collectionId, categoryId, categoryItemId }) => ({
        url: `${COLLECTIONS_URL}/categories/categoryItems/categoryItem?collectionId=${collectionId}&categoryId=${categoryId}${
          categoryItemId ? `&categoryItemId=${categoryItemId}` : ""
        }`,
        method: "POST",
        body: {
          ...item,
        },
      }),
      invalidatesTags: ["CategoryItems", "CategoryItem"],
    }),

    addCategoryItemComment: builder.mutation<
      CategoryItems,
      AddCategoryItemComment
    >({
      query: ({ collectionId, categoryItemId, comment }) => ({
        url: `${COLLECTIONS_URL}/categories/categoryItems/categoryItem/review?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "PUT",
        body: {
          comment,
        },
      }),
      invalidatesTags: ["CategoryItem"],
    }),
    changeCategoryItemFavorite: builder.mutation<
      CategoryItems,
      ChangeCategoryItemFavorite
    >({
      query: ({ collectionId, categoryItemId, done }) => ({
        url: `${COLLECTIONS_URL}/categories/categoryItems/categoryItem/done?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "PUT",
        body: {
          done,
        },
      }),
      invalidatesTags: ["CategoryItem", "CategoryItems"],
    }),
    deleteCategoryItem: builder.mutation<CategoryItems, DeleteCategoryItem>({
      query: ({ collectionId, categoryItemId }) => ({
        url: `${COLLECTIONS_URL}/categories/categoryItems/categoryItem?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CategoryItems"],
    }),
  }),
});

export const {
  useGetCategoryItemsQuery,
  useGetCategoryItemQuery,
  useCreateCategoryItemMutation,
  useAddCategoryItemCommentMutation,
  useChangeCategoryItemFavoriteMutation,
  useDeleteCategoryItemMutation,
} = categoryItemApiSlice;
