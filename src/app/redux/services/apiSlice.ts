import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/app/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery,
  tagTypes: ["CategoryItem", "SubcategoryItem", "SubSubcategoryItem"],
  endpoints: (builder) => ({}),
});
