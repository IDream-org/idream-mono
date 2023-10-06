import { NextRequest, NextResponse } from "next/server";
import {
  addCategoryItemPhoto,
  removeCategoryItemPhoto,
} from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryItemPhoto(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeCategoryItemPhoto(req);
  },
};

export const { PUT, DELETE } = apiHandler;
