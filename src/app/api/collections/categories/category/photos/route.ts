import {
  addCategoryPhoto,
  removeCategoryPhoto,
} from "@/app/lib/CategoriesServices";
import { NextRequest, NextResponse } from "next/server";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryPhoto(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeCategoryPhoto(req);
  },
};

export const { PUT, DELETE } = apiHandler;
