import { NextRequest, NextResponse } from "next/server";
import { getSubCategoryBySubCategoryId } from "@/app/lib/SubCategoryServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getSubCategoryBySubCategoryId(req, res);
  },
};
export const { GET } = apiHandler;
