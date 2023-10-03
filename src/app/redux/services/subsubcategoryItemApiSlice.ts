import { CategoryItems, ItemDesign } from "@prisma/client";
import { apiSlice } from "./apiSlice";
import {
  SUB_SUB_CATEGORY_ITEMS_URL,
  SUB_SUB_CATEGORY_ITEM_URL,
} from "@/app/constants";

const subsubcategoryItemApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: [""],
});

export const subsubcategoryItemApiSlice =
  subsubcategoryItemApiTag.injectEndpoints({
    endpoints: (builder) => ({
      getSubSubcategoryItem: builder.query<
        CategoryItems[],
        { subsubcategoryId: string; collectionId: string }
      >({
        query: ({ subsubcategoryId, collectionId }) => ({
          url: `${SUB_SUB_CATEGORY_ITEMS_URL}?collectionId=${collectionId}&subsubcategoryId=${subsubcategoryId}`,
          method: "GET",
        }),
        providesTags: ["SubSubcategoryItem"],
      }),

      createSubSubcategoryItem: builder.mutation<
        CategoryItems,
        {
          item: Partial<CategoryItems>;
          subcategoryId: string;
          subsubcategoryId: string;
          collectionId: string;
          categoryId: string;
          categoryItemId: string | null;
          itemDesign: ItemDesign;
        }
      >({
        query: ({
          item,
          subcategoryId,
          subsubcategoryId,
          collectionId,
          categoryId,
          categoryItemId,
          itemDesign,
        }) => ({
          url: `${SUB_SUB_CATEGORY_ITEM_URL}?collectionId=${collectionId}&categoryId=${categoryId}&subcategoryId=${subcategoryId}&subsubcategoryId=${subsubcategoryId}${
            categoryItemId ? `&categoryItemId=${categoryItemId}` : ""
          }`,
          method: "POST",
          body: {
            ...item,
            itemDesign,
          },
        }),
        invalidatesTags: ["CategoryItem", "SubSubcategoryItem"],
      }),
    }),
  });

export const {
  useGetSubSubcategoryItemQuery,
  useCreateSubSubcategoryItemMutation,
} = subsubcategoryItemApiSlice;
