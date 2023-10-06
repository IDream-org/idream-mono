import { apiSlice } from "./apiSlice";
import { CategoryItems, ItemDesign } from "@prisma/client";
import { CATEGORY_ITEMS_URL, CATEGORY_ITEM_URL } from "@/app/constants";

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
  itemDesign: ItemDesign;
}

interface AddCategoryItemComment {
  collectionId: string;
  categoryItemId: string;
  comment: string;
}

interface AddCategoryItemPhoto {
  collectionId: string;
  categoryItemId: string;
  image: string;
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
  addTagTypes: ["CategoryItems"],
});

export const categoryItemApiSlice = categoryItemApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryItems: builder.query<
      CategoryItems[],
      { collectionId: string; categoryId: string }
    >({
      query: ({ categoryId, collectionId }) => ({
        url: `${CATEGORY_ITEMS_URL}?collectionId=${collectionId}&categoryId=${categoryId}`,
        method: "GET",
      }),
      providesTags: ["CategoryItems"],
    }),
    getCategoryItem: builder.query<CategoryItems, GetCategoryItem>({
      query: ({ collectionId, categoryId, categoryItemId }) => ({
        url: `${CATEGORY_ITEM_URL}?collectionId=${collectionId}&categoryId=${categoryId}${
          categoryItemId ? `&categoryItemId=${categoryItemId}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["CategoryItem"],
    }),
    createCategoryItem: builder.mutation<CategoryItems, CreateCategoryItem>({
      query: ({
        item,
        collectionId,
        categoryId,
        categoryItemId,
        itemDesign,
      }) => ({
        url: `${CATEGORY_ITEM_URL}?collectionId=${collectionId}&categoryId=${categoryId}${
          categoryItemId ? `&categoryItemId=${categoryItemId}` : ""
        }`,
        method: "POST",
        body: {
          ...item,
          itemDesign,
        },
      }),
      invalidatesTags: ["CategoryItems", "CategoryItem"],
    }),

    addCategoryItemComment: builder.mutation<
      CategoryItems,
      AddCategoryItemComment
    >({
      query: ({ collectionId, categoryItemId, comment }) => ({
        url: `${CATEGORY_ITEM_URL}/review?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "PUT",
        body: {
          comment,
        },
      }),
      invalidatesTags: ["CategoryItem"],
    }),
    removeCategoryItemComment: builder.mutation<
      CategoryItems,
      {
        collectionId: string;
        categoryItemId: string;
        commentId: string;
      }
    >({
      query: ({ collectionId, categoryItemId, commentId }) => ({
        url: `${CATEGORY_ITEM_URL}/review?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "DELETE",
        body: {
          commentId,
        },
      }),
      invalidatesTags: ["CategoryItem"],
    }),
    addCategoryItemNote: builder.mutation<
      CategoryItems,
      AddCategoryItemComment
    >({
      query: ({ collectionId, categoryItemId, comment }) => ({
        url: `${CATEGORY_ITEM_URL}/notes?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "PUT",
        body: {
          comment,
        },
      }),
      invalidatesTags: ["CategoryItem"],
    }),
    removeCategoryItemNote: builder.mutation<
      CategoryItems,
      {
        collectionId: string;
        categoryItemId: string;
        noteId: string;
      }
    >({
      query: ({ collectionId, categoryItemId, noteId }) => ({
        url: `${CATEGORY_ITEM_URL}/notes?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "DELETE",
        body: {
          noteId,
        },
      }),
      invalidatesTags: ["CategoryItem"],
    }),
    addCategoryItemPhoto: builder.mutation<CategoryItems, AddCategoryItemPhoto>(
      {
        query: ({ collectionId, categoryItemId, image }) => ({
          url: `${CATEGORY_ITEM_URL}/photos?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
          method: "PUT",
          body: {
            image,
          },
        }),
        invalidatesTags: ["CategoryItem"],
      }
    ),
    removeCategoryItemPhoto: builder.mutation<
      CategoryItems,
      {
        collectionId: string;
        categoryItemId: string;
        photoId: string;
      }
    >({
      query: ({ collectionId, categoryItemId, photoId }) => ({
        url: `${CATEGORY_ITEM_URL}/photos?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "DELETE",
        body: {
          photoId,
        },
      }),
      invalidatesTags: ["CategoryItem"],
    }),
    changeCategoryItemFavorite: builder.mutation<
      CategoryItems,
      ChangeCategoryItemFavorite
    >({
      query: ({ collectionId, categoryItemId, done }) => ({
        url: `${CATEGORY_ITEM_URL}/done?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "PUT",
        body: {
          done,
        },
      }),
      invalidatesTags: [
        "CategoryItem",
        "CategoryItems",
        "CategoryItem",
        "SubcategoryItem",
        "SubSubcategoryItem",
      ],
    }),
    deleteCategoryItem: builder.mutation<CategoryItems, DeleteCategoryItem>({
      query: ({ collectionId, categoryItemId }) => ({
        url: `${CATEGORY_ITEM_URL}?collectionId=${collectionId}&categoryItemId=${categoryItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "CategoryItems",
        "SubcategoryItem",
        "SubSubcategoryItem",
      ],
    }),
  }),
});

export const {
  useGetCategoryItemsQuery,
  useGetCategoryItemQuery,
  useCreateCategoryItemMutation,
  useAddCategoryItemCommentMutation,
  useAddCategoryItemNoteMutation,
  useRemoveCategoryItemCommentMutation,
  useRemoveCategoryItemNoteMutation,
  useAddCategoryItemPhotoMutation,
  useRemoveCategoryItemPhotoMutation,
  useChangeCategoryItemFavoriteMutation,
  useDeleteCategoryItemMutation,
} = categoryItemApiSlice;
