import { NextRequest, NextResponse } from "next/server";
import { getSubSubCategoryBySubSubCategoryId } from "@/app/lib/SubSubCategoryServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getSubSubCategoryBySubSubCategoryId(req, res);
  },
};

export const { GET } = apiHandler;
