import { NextRequest, NextResponse } from "next/server";
import { updateCategoryItemToDone } from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await updateCategoryItemToDone(req, res);
  },
};

export const { PUT } = apiHandler;
