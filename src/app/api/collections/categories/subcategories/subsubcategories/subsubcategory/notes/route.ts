import { NextRequest, NextResponse } from "next/server";
import { addSubSubCategoryNote } from "@/app/lib/SubSubCategoryServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    console.log("TRIGGER");
    return await addSubSubCategoryNote(req, res);
  },
};

export const { PUT } = apiHandler;
