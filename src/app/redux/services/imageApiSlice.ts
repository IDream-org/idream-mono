import { apiSlice } from "./apiSlice";
import { UPLOAD_IMAGE_URL } from "@/app/constants";

interface UploadedFile {
  url: string;
}

const imageApiTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Image"],
});

export const imageApiSlice = imageApiTag.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadedFile, File>({
      query: (file: File) => {
        const body = new FormData();
        body.append("Content-Type", file.type);
        body.append("file", file);
        return {
          url: UPLOAD_IMAGE_URL,
          method: "POST",
          formData: true,
          body,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = imageApiSlice;
