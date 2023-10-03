import { NextRequest, NextResponse } from "next/server";
import { addCategoryItemComment } from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addCategoryItemComment(req, res);
  },
};

export const { PUT } = apiHandler;
