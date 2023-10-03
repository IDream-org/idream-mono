import { NextRequest, NextResponse } from "next/server";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategoryByCategoryId,
} from "@/app/lib/SubCategoryServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getSubCategoryByCategoryId(req, res);
  },
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createSubCategory(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await deleteSubCategory(req, res);
  },
};

export const { GET, POST, DELETE } = apiHandler;
