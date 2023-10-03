import { NextRequest, NextResponse } from "next/server";
import { createSubSubCategoryItem } from "@/app/lib/CategoryItemsServices";

const apiHanlder = {
  POST: async (req: NextRequest, res: NextResponse) => {
    return await createSubSubCategoryItem(req, res);
  },
};

export const { POST } = apiHanlder;
