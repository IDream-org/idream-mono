import { NextRequest, NextResponse } from "next/server";
import { getCategoryItemsByCategoryId } from "@/app/lib/CategoryItemsServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getCategoryItemsByCategoryId(req, res);
  },
};

export const { GET } = apiHandler;
