import { CategoryItems, ItemDesign } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import { SUB_CATEGORY_ITEMS_URL, SUB_CATEGORY_ITEM_URL } from "@/app/constants";

const subcategoryItemApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: [""],
});

export const subcategoryItemApiSlice = subcategoryItemApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategoryItem: builder.query<
      CategoryItems[],
      { subcategoryId: string; collectionId: string }
    >({
      query: ({ subcategoryId, collectionId }) => ({
        url: `${SUB_CATEGORY_ITEMS_URL}?collectionId=${collectionId}&subcategoryId=${subcategoryId}`,
        method: "GET",
      }),
      providesTags: ["SubcategoryItem"],
    }),
    createSubcategoryItem: builder.mutation<
      CategoryItems,
      {
        item: Partial<CategoryItems>;
        subcategoryId: string;
        collectionId: string;
        categoryId: string;
        categoryItemId: string | null;
        itemDesign: ItemDesign;
      }
    >({
      query: ({
        item,
        subcategoryId,
        collectionId,
        categoryId,
        categoryItemId,
        itemDesign,
      }) => ({
        url: `${SUB_CATEGORY_ITEM_URL}?collectionId=${collectionId}&categoryId=${categoryId}&subcategoryId=${subcategoryId}${
          categoryItemId ? `&categoryItemId=${categoryItemId}` : ""
        }`,
        method: "POST",
        body: {
          ...item,
          itemDesign,
        },
      }),
      invalidatesTags: ["CategoryItem", "SubcategoryItem", "AllCategoryItems"],
    }),
  }),
});

export const { useGetSubcategoryItemQuery, useCreateSubcategoryItemMutation } =
  subcategoryItemApiSlice;
