import { getCategoryById } from "@/app/lib/CategoriesServices";
import { NextRequest, NextResponse } from "next/server";

const apiHandler = {
  GET: async (req: NextRequest, res: NextResponse) => {
    return await getCategoryById(req, res);
  },
};

export const { GET } = apiHandler;
