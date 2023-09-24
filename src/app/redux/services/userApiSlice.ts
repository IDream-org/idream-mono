import { apiSlice } from "./apiSlice";
import { USER_URL } from "@/app/constants";

interface UploadUserImage {
  userId: string;
  imageURL: string;
}

interface UploadUserImageResponse {
  success: boolean;
  url: string;
}

const userApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["User"],
});

export const userApiSlice = userApiTag.injectEndpoints({
  endpoints: (builder) => ({
    uploadUserImage: builder.mutation<UploadUserImageResponse, UploadUserImage>(
      {
        query: ({ userId, imageURL }) => ({
          url: `${USER_URL}/image?userId=${userId}`,
          method: "PUT",
          body: {
            avatar: imageURL,
          },
        }),
      }
    ),
  }),
});

export const { useUploadUserImageMutation } = userApiSlice;
