import { NextRequest, NextResponse } from "next/server";
import {
  addCategoryNote,
  removeCategoryNote,
} from "@/app/lib/CategoriesServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryNote(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeCategoryNote(req);
  },
};

export const { PUT, DELETE } = apiHandler;
