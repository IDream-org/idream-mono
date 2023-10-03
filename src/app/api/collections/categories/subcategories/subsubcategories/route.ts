import { NextRequest, NextResponse } from "next/server";
import {
  createSubSubCategory,
  deleteSubSubCategory,
  getSubSubCategory,
} from "@/app/lib/SubSubCategoryServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getSubSubCategory(req, res);
  },
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createSubSubCategory(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await deleteSubSubCategory(req, res);
  },
};

export const { GET, POST, DELETE } = apiHandler;
