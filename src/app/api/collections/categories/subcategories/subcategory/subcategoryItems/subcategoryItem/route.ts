import { NextRequest, NextResponse } from "next/server";
import { createSubCategoryItem } from "@/app/lib/CategoryItemsServices";

const apiHanlder = {
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createSubCategoryItem(req, res);
  },
};

export const { POST } = apiHanlder;
