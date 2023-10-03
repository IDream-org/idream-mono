import { NextRequest, NextResponse } from "next/server";
import { getSubCategoryById } from "@/app/lib/SubCategoryServices";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getSubCategoryById(req, res);
  },
};

export const { GET } = apiHandler;
