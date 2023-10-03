import { NextRequest, NextResponse } from "next/server";
import { addSubCategoryNote } from "@/app/lib/SubCategoryServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addSubCategoryNote(req, res);
  },
};

export const { PUT } = apiHandler;
