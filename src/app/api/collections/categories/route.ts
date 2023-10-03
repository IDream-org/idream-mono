import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  deleteCtegoryById,
  getCategoriesByCollectionId,
} from "@/app/lib/CategoriesServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getCategoriesByCollectionId(req, res);
  },
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createCategory(req, res);
  },
  DELETE: async (req: NextRequest, res: NextResponse) => {
    return await deleteCtegoryById(req, res);
  },
};

export const { GET, POST, DELETE } = apiHandler;
