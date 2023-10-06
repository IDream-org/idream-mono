import { NextRequest, NextResponse } from "next/server";
import {
  addCategoryItemNote,
  removeCategoryItemNote,
} from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryItemNote(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeCategoryItemNote(req);
  },
};

export const { PUT, DELETE } = apiHandler;
