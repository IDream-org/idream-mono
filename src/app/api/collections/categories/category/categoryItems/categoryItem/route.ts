import { NextRequest, NextResponse } from "next/server";
import {
  createCategoryItem,
  deleteCategoryItem,
  getCategoryItemsById,
} from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getCategoryItemsById(req, res);
  },
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createCategoryItem(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await deleteCategoryItem(req, res);
  },
};

export const { GET, POST, DELETE } = apiHandler;
