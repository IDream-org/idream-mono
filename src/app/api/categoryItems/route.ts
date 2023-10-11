import { NextRequest, NextResponse } from "next/server";
import { getAllCategoryItems } from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getAllCategoryItems(req, res);
  },
};

export const { GET } = apiHandler;
