import { NextRequest, NextResponse } from "next/server";
import { getSubSubCategoryById } from "@/app/lib/SubSubCategoryServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getSubSubCategoryById(req, res);
  },
};

export const { GET } = apiHandler;
