import { NextRequest, NextResponse } from "next/server";
import {
  addCategoryItemComment,
  removeCategoryItemComment,
} from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryItemComment(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await removeCategoryItemComment(req, res);
  },
};

export const { PUT, DELETE } = apiHandler;
