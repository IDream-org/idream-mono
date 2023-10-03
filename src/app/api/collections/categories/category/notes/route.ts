import { NextRequest, NextResponse } from "next/server";
import { addCategoryNote } from "@/app/lib/CategoriesServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryNote(req, res);
  },
};

export const { PUT } = apiHandler;
