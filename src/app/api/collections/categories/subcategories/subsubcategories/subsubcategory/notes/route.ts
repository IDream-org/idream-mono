import { NextRequest, NextResponse } from "next/server";
import {
  addSubSubCategoryNote,
  removeSubSubCategoryNote,
} from "@/app/lib/SubSubCategoryServices";

const apiHandler = {
  PUT: async (req: NextRequest, res: NextResponse) => {
    return await addSubSubCategoryNote(req, res);
  },
  DELETE: async (req: NextRequest) => {
    return await removeSubSubCategoryNote(req);
  },
};

export const { PUT, DELETE } = apiHandler;
