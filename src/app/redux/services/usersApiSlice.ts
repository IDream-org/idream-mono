import { USERS_URL } from "@/app/constants";
import { apiSlice } from "./apiSlice";
import { Users } from "@prisma/client";

const usersApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Users"],
});

export const usersApiSlice = usersApiTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<Users[], {}>({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
